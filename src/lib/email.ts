import nodemailer from "nodemailer";
import { escapeHtml, sanitizeHeader } from "./utils";
import { COMPANY } from "@/config/company";

export interface SendEnquiryParams {
  fullName: string;
  phoneNumber: string;
  serviceInterestedIn: string;
  query: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  mode: "smtp" | "resend" | "development-staged";
  error?: string;
}

export async function sendEnquiryEmail(params: SendEnquiryParams): Promise<SendEmailResult> {
  const { fullName, phoneNumber, serviceInterestedIn, query } = params;

  // Format timestamp in Asia/Kolkata
  const now = new Date();
  const submittedAtKolkata = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "long",
  }).format(now);

  const cleanName = sanitizeHeader(fullName);
  const cleanPhone = sanitizeHeader(phoneNumber);
  const cleanService = sanitizeHeader(serviceInterestedIn);

  const subject = `New Website Enquiry | Anvard Global - ${cleanName}`;

  // Plaintext body
  const textContent = `
NEW BUSINESS ENQUIRY
========================================
Name: ${cleanName}
Phone: ${cleanPhone}
Service Interested In: ${cleanService}
Submitted At: ${submittedAtKolkata}
Source: Anvard Global Corporate Website
========================================

CLIENT QUERY:
${query}

========================================
Company: ${COMPANY.legalName}
CIN: ${COMPANY.cin}
Registered Office: ${COMPANY.address.full}
Director: ${COMPANY.director}
Official Email: ${COMPANY.email}
Phone: ${COMPANY.phone}
`.trim();

  // Premium HTML Email with Navy (#111C30) and Champagne Gold (#C7A66B) branding
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F2EC; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1D2633; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F4F2EC; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="100%" max-width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 20px rgba(17, 28, 48, 0.08); border: 1px solid #E7E4DE;">
          
          <!-- Header (Midnight Navy & Champagne Gold) -->
          <tr>
            <td style="background-color: #111C30; padding: 32px 30px; text-align: center; border-bottom: 3px solid #C7A66B;">
              <div style="color: #C7A66B; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600; margin-bottom: 8px;">
                ANVARD GLOBAL PRIVATE LIMITED
              </div>
              <h1 style="margin: 0; color: #FAF9F6; font-size: 22px; font-weight: 400; letter-spacing: 0.5px;">
                New Business Enquiry Received
              </h1>
              <div style="color: #A98B56; font-size: 12px; margin-top: 6px;">
                ${escapeHtml(submittedAtKolkata)}
              </div>
            </td>
          </tr>

          <!-- Summary Highlights -->
          <tr>
            <td style="padding: 30px 30px 20px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #FAF9F6; border: 1px solid #E7E4DE; border-radius: 4px;">
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #E7E4DE; width: 35%; color: #657080; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                    Client Name
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #E7E4DE; color: #111C30; font-size: 15px; font-weight: 600;">
                    ${escapeHtml(cleanName)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #E7E4DE; color: #657080; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                    Telephone
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #E7E4DE; color: #111C30; font-size: 15px; font-weight: 600;">
                    <a href="tel:${escapeHtml(cleanPhone.replace(/\s+/g, ""))}" style="color: #C7A66B; text-decoration: none; font-weight: 600;">
                      ${escapeHtml(cleanPhone)}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; color: #657080; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                    Focus Area
                  </td>
                  <td style="padding: 16px 20px; color: #111C30; font-size: 15px; font-weight: 600;">
                    <span style="background-color: rgba(199, 166, 107, 0.15); color: #8C7142; padding: 4px 10px; border-radius: 3px; font-size: 13px; font-weight: 600;">
                      ${escapeHtml(cleanService)}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 10px 30px 30px 30px;">
              <div style="font-size: 12px; font-weight: 700; color: #657080; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px;">
                Detailed Query / Requirements
              </div>
              <div style="background-color: #FFFFFF; border-left: 3px solid #C7A66B; padding: 18px 20px; background-color: #FAF9F6; font-size: 14px; line-height: 1.7; color: #1D2633; white-space: pre-wrap;">${escapeHtml(query)}</div>
            </td>
          </tr>

          <!-- Action Button -->
          <tr>
            <td style="padding: 0 30px 30px 30px; text-align: center;">
              <a href="tel:${escapeHtml(cleanPhone.replace(/\s+/g, ""))}" style="display: inline-block; background-color: #C7A66B; color: #111C30; text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 28px; border-radius: 3px; letter-spacing: 0.5px;">
                Call Enquirer Directly &rarr;
              </a>
            </td>
          </tr>

          <!-- Footer Information -->
          <tr>
            <td style="background-color: #111C30; padding: 24px 30px; color: #8E99A8; font-size: 11px; line-height: 1.6; border-top: 1px solid #1D2633; text-align: center;">
              <div style="color: #FAF9F6; font-weight: 600; margin-bottom: 4px;">
                ${COMPANY.legalName}
              </div>
              <div style="margin-bottom: 4px;">
                CIN: ${COMPANY.cin} &bull; Director: ${COMPANY.director}
              </div>
              <div style="margin-bottom: 8px;">
                ${COMPANY.address.full}
              </div>
              <div style="color: #657080;">
                Official Inquiries: <a href="mailto:${COMPANY.email}" style="color: #C7A66B; text-decoration: none;">${COMPANY.email}</a> &bull; Phone: ${COMPANY.phone}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  const recipient = process.env.EMAIL_TO || COMPANY.email;
  const fromSender = process.env.EMAIL_FROM || `Anvard Global Website <notifications@anvardglobal.com>`;

  // 1. Try Resend if RESEND_API_KEY is configured
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromSender,
          to: [recipient],
          subject: subject,
          html: htmlContent,
          text: textContent,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `Resend API returned status ${res.status}`);
      }

      const data = await res.json();
      return {
        success: true,
        messageId: data.id,
        mode: "resend",
      };
    } catch (err: any) {
      console.error("[Email Error - Resend]:", err);
      // Fallback to SMTP if also provided, or return error
    }
  }

  // 2. Try Nodemailer SMTP if SMTP host/user are configured
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number(process.env.SMTP_PORT) || 587;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: fromSender,
        to: recipient,
        subject: subject,
        text: textContent,
        html: htmlContent,
      });

      return {
        success: true,
        messageId: info.messageId,
        mode: "smtp",
      };
    } catch (err: any) {
      console.error("[Email Error - SMTP]:", err);
      return {
        success: false,
        mode: "smtp",
        error: err.message || "Failed to send email via SMTP server",
      };
    }
  }

  // 3. Development / Safe Local Fallback Mode
  // When running locally without third-party email credentials, record and display full details
  console.log("--------------------------------------------------");
  console.log("[ANVARD GLOBAL] ENQUIRY RECEIVED (DEV STAGING MODE)");
  console.log(`Timestamp: ${submittedAtKolkata}`);
  console.log(`Recipient: ${recipient}`);
  console.log(`Client: ${cleanName} (${cleanPhone})`);
  console.log(`Service: ${cleanService}`);
  console.log(`Query: ${query}`);
  console.log("To dispatch live emails, configure RESEND_API_KEY or SMTP credentials in .env.local.");
  console.log("--------------------------------------------------");

  return {
    success: true,
    messageId: `dev-${Date.now()}`,
    mode: "development-staged",
  };
}
