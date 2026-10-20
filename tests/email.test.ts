import test from "node:test";
import assert from "node:assert/strict";
import { enquirySchema } from "../src/lib/validation";
import {
  generateReferenceId,
  sendEnquiryNotification,
  sendEnquirerAcknowledgement,
} from "../src/lib/email";
import {
  renderAdminNotification,
  renderEnquirerAcknowledgement,
  type EnquiryEmailData,
} from "../src/lib/email-templates";

const mutableEnv = process.env as Record<string, string | undefined>;

function setNodeEnv(value: string | undefined): void {
  if (value === undefined) {
    delete mutableEnv.NODE_ENV;
  } else {
    mutableEnv.NODE_ENV = value;
  }
}

const baseData: EnquiryEmailData = {
  referenceId: "AG-261020-K7Q2",
  fullName: "Ankit Sharma",
  email: "ankit@example.com",
  phoneNumber: "+91 80104 16869",
  serviceInterestedIn: "Business Strategy",
  query: "We are exploring a growth plan for a new vertical.",
  submittedAtKolkata: "Tuesday, 20 October 2026 at 10:30:00 am IST",
  submittedAtIso: "2026-10-20T05:00:00.000Z",
  ipAddress: "203.0.113.10",
  userAgent: "Mozilla/5.0 Test",
  source: "https://anvardglobal.com/contact",
};

test("email schema accepts a valid address and trims it", () => {
  const result = enquirySchema.safeParse({
    fullName: "Ankit Sharma",
    email: "  ankit@example.com  ",
    phoneNumber: "+91 80104 16869",
    serviceInterestedIn: "Business Strategy",
    query: "A sufficiently long business enquiry.",
    website: "",
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.email, "ankit@example.com");
  }
});

test("email schema rejects malformed and missing addresses", () => {
  const malformed = enquirySchema.safeParse({
    fullName: "Ankit Sharma",
    email: "ankit@",
    phoneNumber: "+91 80104 16869",
    serviceInterestedIn: "Business Strategy",
    query: "A sufficiently long business enquiry.",
    website: "",
  });

  assert.equal(malformed.success, false);

  const missing = enquirySchema.safeParse({
    fullName: "Ankit Sharma",
    phoneNumber: "+91 80104 16869",
    serviceInterestedIn: "Business Strategy",
    query: "A sufficiently long business enquiry.",
    website: "",
  });

  assert.equal(missing.success, false);
  if (!missing.success) {
    assert.equal(
      missing.error.flatten().fieldErrors.email?.[0],
      "Please enter your email address"
    );
  }
});

test("reference IDs use the AG-YYMMDD-XXXX format", () => {
  const first = generateReferenceId(new Date("2026-10-20T00:00:00Z"));
  const second = generateReferenceId(new Date("2026-10-20T00:00:00Z"));

  assert.match(first, /^AG-\d{6}-[A-HJ-NP-Z2-9]{4}$/);
  assert.ok(first.includes("261020"));
  assert.notEqual(first, second);
});

test("admin notification includes the reference, reply link, and escaped query", () => {
  const rendered = renderAdminNotification({
    ...baseData,
    query: "Growth plan <script>alert('x')</script> & expansion.",
  });

  assert.ok(rendered.subject.includes("AG-261020-K7Q2"));
  assert.ok(rendered.subject.includes("Ankit Sharma"));
  assert.ok(rendered.html.includes("AG-261020-K7Q2"));
  assert.ok(rendered.html.includes("mailto:ankit@example.com"));
  assert.ok(rendered.html.includes("tel:+918010416869"));
  assert.ok(rendered.html.includes("&lt;script&gt;"));
  assert.ok(!rendered.html.includes("<script>alert"));
  assert.ok(rendered.text.includes("Growth plan <script>"));
  assert.ok(rendered.text.includes("AG-261020-K7Q2"));
});

test("acknowledgement includes the reference but never echoes the full query", () => {
  const rendered = renderEnquirerAcknowledgement(baseData);

  assert.ok(rendered.subject.includes("AG-261020-K7Q2"));
  assert.ok(rendered.html.includes("AG-261020-K7Q2"));
  assert.ok(rendered.html.includes("one business day"));
  assert.ok(rendered.html.includes("/privacy-policy"));
  assert.ok(rendered.text.includes("AG-261020-K7Q2"));
  assert.ok(!rendered.html.includes(baseData.query));
  assert.ok(!rendered.text.includes(baseData.query));
});

test("development staging does not attempt a real send", async () => {
  const previousEnv = {
    NODE_ENV: process.env.NODE_ENV,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  };

  setNodeEnv("test");
  delete process.env.SMTP_HOST;
  delete process.env.SMTP_USER;
  delete process.env.SMTP_PASS;
  delete process.env.RESEND_API_KEY;

  try {
    const result = await sendEnquiryNotification({
      referenceId: baseData.referenceId,
      fullName: baseData.fullName,
      email: baseData.email,
      phoneNumber: baseData.phoneNumber,
      serviceInterestedIn: baseData.serviceInterestedIn,
      query: baseData.query,
      submittedAt: new Date(baseData.submittedAtIso),
    });

    assert.equal(result.success, true);
    assert.equal(result.mode, "development-staged");
  } finally {
    setNodeEnv(previousEnv.NODE_ENV);
    if (previousEnv.SMTP_HOST) process.env.SMTP_HOST = previousEnv.SMTP_HOST;
    if (previousEnv.SMTP_USER) process.env.SMTP_USER = previousEnv.SMTP_USER;
    if (previousEnv.SMTP_PASS) process.env.SMTP_PASS = previousEnv.SMTP_PASS;
    if (previousEnv.RESEND_API_KEY) {
      process.env.RESEND_API_KEY = previousEnv.RESEND_API_KEY;
    }
  }
});

test("production without credentials fails instead of silently staging", async () => {
  const previousNodeEnv = process.env.NODE_ENV;
  const previousSmtp = {
    host: process.env.SMTP_HOST,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  };
  const previousResend = process.env.RESEND_API_KEY;

  setNodeEnv("production");
  delete process.env.SMTP_HOST;
  delete process.env.SMTP_USER;
  delete process.env.SMTP_PASS;
  delete process.env.RESEND_API_KEY;

  try {
    const result = await sendEnquiryNotification({
      referenceId: baseData.referenceId,
      fullName: baseData.fullName,
      email: baseData.email,
      phoneNumber: baseData.phoneNumber,
      serviceInterestedIn: baseData.serviceInterestedIn,
      query: baseData.query,
      submittedAt: new Date(baseData.submittedAtIso),
    });

    assert.equal(result.success, false);
    assert.equal(result.errorCode, "ECONFIG");
  } finally {
    setNodeEnv(previousNodeEnv);
    if (previousSmtp.host) process.env.SMTP_HOST = previousSmtp.host;
    if (previousSmtp.user) process.env.SMTP_USER = previousSmtp.user;
    if (previousSmtp.pass) process.env.SMTP_PASS = previousSmtp.pass;
    if (previousResend) process.env.RESEND_API_KEY = previousResend;
  }
});

test("acknowledgements are skipped for the company's own address", async () => {
  const previousRecipient = process.env.EMAIL_TO;
  process.env.EMAIL_TO = "team@example.com";

  try {
    const result = await sendEnquirerAcknowledgement({
      referenceId: baseData.referenceId,
      fullName: baseData.fullName,
      email: "team@example.com",
      phoneNumber: baseData.phoneNumber,
      serviceInterestedIn: baseData.serviceInterestedIn,
      query: baseData.query,
      submittedAt: new Date(baseData.submittedAtIso),
    });

    assert.equal(result.success, true);
    assert.equal(result.skipped, true);
  } finally {
    if (previousRecipient) {
      process.env.EMAIL_TO = previousRecipient;
    } else {
      delete process.env.EMAIL_TO;
    }
  }
});
