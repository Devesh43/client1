import { COMPANY } from "@/config/company";
import { escapeHtml, sanitizeHeader } from "./utils";

const COLORS = {
  navy: "#111C30",
  navyDeep: "#0A1120",
  charcoal: "#1D2633",
  gold: "#C7A66B",
  goldDark: "#8C7142",
  ivory: "#FAF9F6",
  ivoryWarm: "#F4F2EC",
  muted: "#657080",
  border: "#E7E4DE",
};

export interface EnquiryEmailData {
  referenceId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  serviceInterestedIn: string;
  query: string;
  submittedAtKolkata: string;
  submittedAtIso: string;
  ipAddress?: string;
  userAgent?: string;
  source?: string;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

interface ShellOptions {
  title: string;
  preheader: string;
  kicker: string;
  heading: string;
  subheading?: string;
  body: string;
}

function renderShell({
  title,
  preheader,
  kicker,
  heading,
  subheading,
  body,
}: ShellOptions): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.ivoryWarm};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:${COLORS.charcoal};-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${escapeHtml(preheader)}
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${COLORS.ivoryWarm};padding:40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background-color:#FFFFFF;border-radius:4px;overflow:hidden;border:1px solid ${COLORS.border};box-shadow:0 4px 20px rgba(17,28,48,0.08);">
          <tr>
            <td style="background-color:${COLORS.navy};padding:32px 30px;text-align:center;border-bottom:3px solid ${COLORS.gold};">
              <div style="color:${COLORS.gold};font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:600;margin-bottom:8px;">
                ${escapeHtml(kicker)}
              </div>
              <h1 style="margin:0;color:${COLORS.ivory};font-size:22px;font-weight:400;letter-spacing:0.5px;line-height:1.3;">
                ${escapeHtml(heading)}
              </h1>
              ${
                subheading
                  ? `<div style="color:#A98B56;font-size:12px;margin-top:8px;line-height:1.5;">${escapeHtml(subheading)}</div>`
                  : ""
              }
            </td>
          </tr>
          ${body}
          <tr>
            <td style="background-color:${COLORS.navy};padding:24px 30px;color:#8E99A8;font-size:11px;line-height:1.7;border-top:1px solid ${COLORS.charcoal};text-align:center;">
              <div style="color:${COLORS.ivory};font-weight:600;margin-bottom:4px;">
                ${escapeHtml(COMPANY.legalName)}
              </div>
              <div style="margin-bottom:4px;">
                CIN: ${escapeHtml(COMPANY.cin)} &bull; Director: ${escapeHtml(COMPANY.director)}
              </div>
              <div style="margin-bottom:8px;">
                ${escapeHtml(COMPANY.address.full)}
              </div>
              <div style="color:${COLORS.muted};">
                Official Inquiries:
                <a href="mailto:${escapeHtml(COMPANY.email)}" style="color:${COLORS.gold};text-decoration:none;">${escapeHtml(COMPANY.email)}</a>
                &bull; Phone: ${escapeHtml(COMPANY.phone)}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function detailRow(label: string, valueHtml: string, isLast = false): string {
  const border = isLast ? "" : `border-bottom:1px solid ${COLORS.border};`;
  return `<tr>
    <td style="padding:15px 20px;${border}width:34%;color:${COLORS.muted};font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">
      ${escapeHtml(label)}
    </td>
    <td style="padding:15px 20px;${border}color:${COLORS.navy};font-size:14px;font-weight:600;line-height:1.6;vertical-align:top;">
      ${valueHtml}
    </td>
  </tr>`;
}

function formatSource(source?: string): string {
  return sanitizeHeader(source || "Website enquiry form");
}

export function renderAdminNotification(data: EnquiryEmailData): RenderedEmail {
  const name = sanitizeHeader(data.fullName);
  const service = sanitizeHeader(data.serviceInterestedIn);
  const email = sanitizeHeader(data.email);
  const phone = sanitizeHeader(data.phoneNumber);
  const referenceId = sanitizeHeader(data.referenceId);
  const source = formatSource(data.source);

  const subject = `New Website Enquiry — ${name} (${service}) [${referenceId}]`;
  const replySubject = encodeURIComponent(
    `Re: Your enquiry to ANVARD GLOBAL [${referenceId}]`
  );
  const phoneTel = phone.replace(/[^\d+]/g, "");

  const body = `
    <tr>
      <td style="padding:30px 30px 22px 30px;">
        <p style="margin:0 0 16px 0;font-size:14px;line-height:1.7;color:${COLORS.charcoal};">
          A new business enquiry has been submitted through the corporate website.
        </p>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${COLORS.ivory};border:1px solid ${COLORS.border};border-radius:4px;">
          ${detailRow("Reference", `<span style="font-family:Consolas,Monaco,monospace;font-size:14px;letter-spacing:0.5px;">${escapeHtml(referenceId)}</span>`)}
          ${detailRow("Client Name", escapeHtml(name))}
          ${detailRow("Email", `<a href="mailto:${escapeHtml(email)}?subject=${replySubject}" style="color:${COLORS.goldDark};text-decoration:none;">${escapeHtml(email)}</a>`)}
          ${detailRow("Telephone", `<a href="tel:${escapeHtml(phoneTel)}" style="color:${COLORS.goldDark};text-decoration:none;">${escapeHtml(phone)}</a>`)}
          ${detailRow("Focus Area", escapeHtml(service))}
          ${detailRow("Submitted", escapeHtml(data.submittedAtKolkata), true)}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:0 30px 26px 30px;">
        <div style="font-size:11px;font-weight:700;color:${COLORS.muted};text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px;">
          Detailed Query / Requirements
        </div>
        <div style="background-color:${COLORS.ivory};border-left:3px solid ${COLORS.gold};padding:18px 20px;font-size:14px;line-height:1.7;color:${COLORS.charcoal};white-space:pre-wrap;">${escapeHtml(data.query)}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:0 30px 30px 30px;text-align:center;">
        <a href="mailto:${escapeHtml(email)}?subject=${replySubject}" style="display:inline-block;background-color:${COLORS.gold};color:${COLORS.navy};text-decoration:none;font-size:14px;font-weight:700;padding:12px 28px;border-radius:3px;letter-spacing:0.5px;">
          Reply to Enquirer &rarr;
        </a>
        <div style="margin-top:12px;font-size:12px;color:${COLORS.muted};">
          Or call <a href="tel:${escapeHtml(phoneTel)}" style="color:${COLORS.goldDark};text-decoration:none;font-weight:600;">${escapeHtml(phone)}</a>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:0 30px 30px 30px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid ${COLORS.border};">
          <tr>
            <td style="padding-top:14px;font-size:11px;line-height:1.7;color:${COLORS.muted};">
              <strong style="color:${COLORS.charcoal};">Internal metadata</strong><br>
              Source: ${escapeHtml(source)}<br>
              IP address: ${escapeHtml(data.ipAddress || "Not provided")}<br>
              User agent: ${escapeHtml(data.userAgent || "Not provided")}<br>
              Timestamp (ISO): ${escapeHtml(data.submittedAtIso)}
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  const html = renderShell({
    title: subject,
    preheader: `New enquiry from ${name} — ${service}. Reference ${referenceId}.`,
    kicker: COMPANY.legalName,
    heading: "New Business Enquiry Received",
    subheading: data.submittedAtKolkata,
    body,
  });

  const text = `
NEW BUSINESS ENQUIRY
========================================
Reference: ${referenceId}
Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Submitted: ${data.submittedAtKolkata}
Source: ${source}
========================================

CLIENT QUERY:
${data.query}

========================================
INTERNAL METADATA
IP address: ${data.ipAddress || "Not provided"}
User agent: ${data.userAgent || "Not provided"}
Timestamp (ISO): ${data.submittedAtIso}

${COMPANY.legalName}
CIN: ${COMPANY.cin}
Director: ${COMPANY.director}
Registered Office: ${COMPANY.address.full}
Official Email: ${COMPANY.email}
Phone: ${COMPANY.phone}
`.trim();

  return { subject, html, text };
}

export function renderEnquirerAcknowledgement(data: EnquiryEmailData): RenderedEmail {
  const name = sanitizeHeader(data.fullName);
  const firstName = name.split(/\s+/)[0] || "there";
  const service = sanitizeHeader(data.serviceInterestedIn);
  const referenceId = sanitizeHeader(data.referenceId);
  const responseSla = sanitizeHeader(
    process.env.ENQUIRY_RESPONSE_SLA || "one business day"
  );

  const subject = `We've received your enquiry — ANVARD GLOBAL (Ref: ${referenceId})`;
  const privacyUrl = `${COMPANY.siteUrl}/privacy-policy`;

  const body = `
    <tr>
      <td style="padding:32px 30px 8px 30px;">
        <p style="margin:0 0 14px 0;font-size:15px;line-height:1.8;color:${COLORS.navy};">
          Dear ${escapeHtml(firstName)},
        </p>
        <p style="margin:0 0 14px 0;font-size:14px;line-height:1.8;color:${COLORS.charcoal};">
          Thank you for contacting <strong>${escapeHtml(COMPANY.legalName)}</strong>. Your enquiry has been received and is being reviewed by our advisory team.
        </p>
        <p style="margin:0 0 20px 0;font-size:14px;line-height:1.8;color:${COLORS.charcoal};">
          Please keep the reference below for any follow-up correspondence.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:0 30px 24px 30px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${COLORS.ivory};border:1px solid ${COLORS.border};border-left:3px solid ${COLORS.gold};border-radius:4px;">
          <tr>
            <td style="padding:18px 20px;text-align:center;">
              <div style="font-size:10px;font-weight:700;color:${COLORS.muted};text-transform:uppercase;letter-spacing:2px;margin-bottom:6px;">
                Your Enquiry Reference
              </div>
              <div style="font-family:Consolas,Monaco,'Courier New',monospace;font-size:20px;letter-spacing:1.5px;color:${COLORS.navy};font-weight:700;">
                ${escapeHtml(referenceId)}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:0 30px 24px 30px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#FFFFFF;border:1px solid ${COLORS.border};border-radius:4px;">
          ${detailRow("Focus Area", escapeHtml(service))}
          ${detailRow("Submitted", escapeHtml(data.submittedAtKolkata), true)}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:0 30px 24px 30px;">
        <p style="margin:0;font-size:14px;line-height:1.8;color:${COLORS.charcoal};">
          Our team will respond within <strong>${escapeHtml(responseSla)}</strong>. If your matter is urgent, please call us directly using the number below.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:0 30px 30px 30px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${COLORS.ivory};border:1px solid ${COLORS.border};border-radius:4px;">
          <tr>
            <td style="padding:18px 20px;font-size:13px;line-height:1.8;color:${COLORS.charcoal};">
              <strong style="color:${COLORS.navy};">Direct contact</strong><br>
              Telephone: <a href="tel:${escapeHtml(COMPANY.phoneTel)}" style="color:${COLORS.goldDark};text-decoration:none;font-weight:600;">${escapeHtml(COMPANY.phoneDisplay)}</a><br>
              Email: <a href="mailto:${escapeHtml(COMPANY.email)}" style="color:${COLORS.goldDark};text-decoration:none;font-weight:600;">${escapeHtml(COMPANY.email)}</a><br>
              Hours: ${escapeHtml(COMPANY.hours)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:0 30px 30px 30px;">
        <p style="margin:0;font-size:11px;line-height:1.7;color:${COLORS.muted};">
          This is an automated acknowledgement. Please do not submit sensitive personal, financial, or confidential information by email. Details shared with Anvard Global are handled under our
          <a href="${escapeHtml(privacyUrl)}" style="color:${COLORS.goldDark};text-decoration:underline;">Privacy Policy</a>.
        </p>
      </td>
    </tr>`;

  const html = renderShell({
    title: subject,
    preheader: `We have received your enquiry. Your reference is ${referenceId}.`,
    kicker: COMPANY.displayName,
    heading: "Your Enquiry Has Been Received",
    subheading: `Reference ${referenceId}`,
    body,
  });

  const text = `
Dear ${firstName},

Thank you for contacting ${COMPANY.legalName}. Your enquiry has been received and is being reviewed by our advisory team.

YOUR ENQUIRY REFERENCE: ${referenceId}

Service focus: ${service}
Submitted: ${data.submittedAtKolkata}

Our team will respond within ${responseSla}. If your matter is urgent, please call us directly.

DIRECT CONTACT
Telephone: ${COMPANY.phoneDisplay}
Email: ${COMPANY.email}
Hours: ${COMPANY.hours}

Registered Office:
${COMPANY.address.full}

This is an automated acknowledgement. Please do not submit sensitive personal, financial, or confidential information by email. Details shared with Anvard Global are handled under our Privacy Policy: ${privacyUrl}

${COMPANY.legalName}
CIN: ${COMPANY.cin}
Director: ${COMPANY.director}
`.trim();

  return { subject, html, text };
}
