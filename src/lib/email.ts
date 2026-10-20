import { randomInt } from "node:crypto";
import nodemailer from "nodemailer";
import { COMPANY } from "@/config/company";
import {
  renderAdminNotification,
  renderEnquirerAcknowledgement,
  type EnquiryEmailData,
} from "./email-templates";

export type EmailMode = "smtp" | "resend" | "development-staged";

export interface SendEnquiryParams {
  referenceId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  serviceInterestedIn: string;
  query: string;
  submittedAt: Date;
  ipAddress?: string;
  userAgent?: string;
  source?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  mode: EmailMode;
  error?: string;
  errorCode?: string;
  skipped?: boolean;
}

interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
}

interface MailPayload {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  headers?: Record<string, string>;
}

interface SmtpErrorLike {
  code?: string;
  response?: string;
  responseCode?: number;
  message?: string;
}

const REFERENCE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const TRANSIENT_SMTP_CODES = new Set([
  "ETIMEDOUT",
  "ESOCKET",
  "ECONNECTION",
  "ECONNRESET",
  "EDNS",
]);

let acknowledgementCount = 0;
let acknowledgementDate = "";

function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  // Google displays App Passwords in groups of four. Gmail accepts them with
  // or without spaces; normalising makes copy/paste reliable.
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "").trim();

  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT) || 465;
  return {
    host,
    port,
    secure: port === 465,
    user,
    pass,
  };
}

export function getEmailMode(): EmailMode {
  if (getSmtpConfig()) return "smtp";
  if (process.env.RESEND_API_KEY?.trim()) return "resend";
  return "development-staged";
}

export function isEmailConfigured(): boolean {
  return getEmailMode() !== "development-staged";
}

function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

function getFromSender(): string {
  return (
    process.env.EMAIL_FROM?.trim() ||
    `ANVARD GLOBAL Website <${COMPANY.email}>`
  );
}

function getRecipient(): string {
  return process.env.EMAIL_TO?.trim() || COMPANY.email;
}

function getMissingSmtpVariables(): string[] {
  return ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"].filter((key) => {
    const value = process.env[key]?.trim();
    if (key === "SMTP_PASS") {
      return !value?.replace(/\s+/g, "");
    }
    return !value;
  });
}

export function generateReferenceId(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const value = (type: string) =>
    parts.find((part) => part.type === type)?.value || "";

  const date = `${value("year")}${value("month")}${value("day")}`;
  let code = "";
  for (let i = 0; i < 4; i += 1) {
    code += REFERENCE_ALPHABET[randomInt(0, REFERENCE_ALPHABET.length)];
  }

  return `AG-${date}-${code}`;
}

function toTemplateData(params: SendEnquiryParams): EnquiryEmailData {
  const submittedAtKolkata = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "long",
  }).format(params.submittedAt);

  return {
    referenceId: params.referenceId,
    fullName: params.fullName,
    email: params.email,
    phoneNumber: params.phoneNumber,
    serviceInterestedIn: params.serviceInterestedIn,
    query: params.query,
    submittedAtKolkata,
    submittedAtIso: params.submittedAt.toISOString(),
    ipAddress: params.ipAddress,
    userAgent: params.userAgent,
    source: params.source,
  };
}

function maskEmail(email: string): string {
  const [localPart, domain] = email.split("@");
  if (!domain) return "***";
  return `${localPart.slice(0, 1)}***@${domain}`;
}

function logEvent(event: string, details: Record<string, unknown>): void {
  const payload = JSON.stringify({
    ts: new Date().toISOString(),
    event,
    ...details,
  });

  if (event.endsWith(".failed") || event === "email.config.missing") {
    console.error(`[Email] ${payload}`);
  } else {
    console.log(`[Email] ${payload}`);
  }
}

function logStaging(kind: string, data: EnquiryEmailData): void {
  if (isProduction()) return;

  console.log("--------------------------------------------------");
  console.log(`[ANVARD GLOBAL] ${kind.toUpperCase()} (DEV STAGING MODE)`);
  console.log(`Reference: ${data.referenceId}`);
  console.log(`Timestamp: ${data.submittedAtKolkata}`);
  console.log(`Client: ${data.fullName} <${data.email}> (${data.phoneNumber})`);
  console.log(`Service: ${data.serviceInterestedIn}`);
  if (kind === "admin notification") {
    console.log(`Query: ${data.query}`);
  }
  console.log(
    "Configure SMTP_HOST / SMTP_USER / SMTP_PASS in .env.local to dispatch live email."
  );
  console.log("--------------------------------------------------");
}

function asSmtpError(error: unknown): SmtpErrorLike {
  if (typeof error === "object" && error !== null) {
    return error as SmtpErrorLike;
  }
  return { message: String(error) };
}

function classifySmtpError(error: unknown): string {
  const smtpError = asSmtpError(error);
  const response = smtpError.response || "";

  if (
    smtpError.code === "EAUTH" ||
    smtpError.responseCode === 535 ||
    response.includes("535")
  ) {
    return "EAUTH";
  }

  if (
    /5\.4\.5/.test(response) ||
    /daily (user )?sending limit/i.test(response) ||
    /quota/i.test(response)
  ) {
    return "EQUOTA";
  }

  if (smtpError.code) return smtpError.code;
  return "ESMTP";
}

function getErrorMessage(error: unknown): string {
  return asSmtpError(error).message || "Failed to send email";
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function createSmtpTransport(config: SmtpConfig) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}

async function sendViaSmtp(
  config: SmtpConfig,
  payload: MailPayload
): Promise<SendEmailResult> {
  const transporter = createSmtpTransport(config);
  const message = {
    from: getFromSender(),
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
    replyTo: payload.replyTo,
    headers: payload.headers,
  };

  try {
    try {
      const info = await transporter.sendMail(message);
      return {
        success: true,
        messageId: info.messageId,
        mode: "smtp",
      };
    } catch (error) {
      const errorCode = classifySmtpError(error);
      if (!TRANSIENT_SMTP_CODES.has(errorCode)) throw error;

      logEvent("email.smtp.retry", { errorCode });
      await sleep(750);

      const info = await transporter.sendMail(message);
      return {
        success: true,
        messageId: info.messageId,
        mode: "smtp",
      };
    }
  } catch (error) {
    return {
      success: false,
      mode: "smtp",
      error: getErrorMessage(error),
      errorCode: classifySmtpError(error),
    };
  } finally {
    transporter.close();
  }
}

async function sendViaResend(payload: MailPayload): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return {
      success: false,
      mode: "resend",
      error: "Resend API key is not configured",
      errorCode: "ECONFIG",
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: getFromSender(),
        to: [payload.to],
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
        ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
      }),
    });

    const data = (await response.json().catch(() => ({}))) as {
      id?: string;
      message?: string;
    };

    if (!response.ok) {
      return {
        success: false,
        mode: "resend",
        error: data.message || `Resend API returned status ${response.status}`,
        errorCode: response.status === 401 ? "EAUTH" : "ERESEND",
      };
    }

    return {
      success: true,
      messageId: data.id,
      mode: "resend",
    };
  } catch (error) {
    return {
      success: false,
      mode: "resend",
      error: getErrorMessage(error),
      errorCode: "ERESEND",
    };
  }
}

async function deliver(payload: MailPayload): Promise<SendEmailResult> {
  const mode = getEmailMode();

  if (mode === "smtp") {
    return sendViaSmtp(getSmtpConfig() as SmtpConfig, payload);
  }

  if (mode === "resend") {
    return sendViaResend(payload);
  }

  if (isProduction()) {
    logEvent("email.config.missing", {
      missing: getMissingSmtpVariables(),
    });
    return {
      success: false,
      mode,
      error: "Email transport is not configured",
      errorCode: "ECONFIG",
    };
  }

  return {
    success: true,
    mode,
    messageId: `dev-${Date.now()}`,
  };
}

function logResult(
  prefix: "email.admin" | "email.ack",
  recipient: string,
  referenceId: string,
  result: SendEmailResult
): void {
  if (result.success) {
    logEvent(`${prefix}.sent`, {
      referenceId,
      mode: result.mode,
      messageId: result.messageId,
      recipient: maskEmail(recipient),
    });
    return;
  }

  logEvent(`${prefix}.failed`, {
    referenceId,
    mode: result.mode,
    errorCode: result.errorCode,
    error: result.error,
    recipient: maskEmail(recipient),
  });
}

export async function sendEnquiryNotification(
  params: SendEnquiryParams
): Promise<SendEmailResult> {
  const data = toTemplateData(params);
  const rendered = renderAdminNotification(data);

  const result = await deliver({
    to: getRecipient(),
    subject: rendered.subject,
    html: rendered.html,
    text: rendered.text,
    replyTo: data.email,
    headers: {
      "X-Entity-Ref-ID": data.referenceId,
    },
  });

  logResult("email.admin", getRecipient(), data.referenceId, result);

  if (result.success && result.mode === "development-staged") {
    logStaging("admin notification", data);
  }

  return result;
}

function consumeAcknowledgementQuota(): boolean {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  if (acknowledgementDate !== today) {
    acknowledgementDate = today;
    acknowledgementCount = 0;
  }

  const cap = Number(process.env.MAX_DAILY_ACKNOWLEDGEMENTS) || 200;
  if (acknowledgementCount >= cap) return false;

  acknowledgementCount += 1;
  return true;
}

export async function sendEnquirerAcknowledgement(
  params: SendEnquiryParams
): Promise<SendEmailResult> {
  const data = toTemplateData(params);

  const selfAddresses = [getRecipient(), process.env.SMTP_USER?.trim()]
    .filter((address): address is string => Boolean(address))
    .map((address) => address.toLowerCase());

  if (selfAddresses.includes(data.email.toLowerCase())) {
    logEvent("email.ack.skipped", {
      referenceId: data.referenceId,
      reason: "self-address",
    });
    return {
      success: true,
      mode: getEmailMode(),
      skipped: true,
    };
  }

  if (!consumeAcknowledgementQuota()) {
    const result: SendEmailResult = {
      success: false,
      mode: getEmailMode(),
      error: "Daily acknowledgement cap reached",
      errorCode: "EQUOTA_LOCAL",
    };
    logResult("email.ack", data.email, data.referenceId, result);
    return result;
  }

  const rendered = renderEnquirerAcknowledgement(data);

  const result = await deliver({
    to: data.email,
    subject: rendered.subject,
    html: rendered.html,
    text: rendered.text,
    replyTo: getRecipient(),
    headers: {
      "Auto-Submitted": "auto-replied",
      "X-Auto-Response-Suppress": "All",
    },
  });

  logResult("email.ack", data.email, data.referenceId, result);

  if (result.success && result.mode === "development-staged") {
    logStaging("enquirer acknowledgement", data);
  }

  return result;
}
