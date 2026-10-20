# PRD — Email Integration for the "Get in Touch" Enquiry Form

| Field | Value |
| --- | --- |
| **Product** | ANVARD GLOBAL corporate website (`client1`) |
| **Feature** | Email delivery for website enquiries |
| **Status** | Implemented; pending Gmail App Password + live delivery test |
| **Version** | 1.0 |
| **Date** | 20 October 2026 |
| **Owner** | Engineering / Website Maintainer |
| **Stakeholders** | Director (Ankit Sharma), advisory coordination team |
| **Delivery provider** | Gmail SMTP via Nodemailer (app password) |
| **Scope** | Admin notification + enquirer acknowledgement email |

---

## 1. Summary

The website already contained a complete enquiry form, a `/api/enquiry` route handler, Zod validation, honeypot and rate-limit protection, and an email module with Resend/SMTP fallbacks. The original gap was that **no email credentials were configured** (`.env.local` did not exist), so submissions fell through to `development-staged` mode and no email left the server.

This PRD defined the work required to make the enquiry flow genuinely deliver email in production using **Gmail SMTP**, and to add a **branded acknowledgement email** to the enquirer. It also closed the gaps that would make a production launch unsafe: no enquirer email field, no stable reference ID, silent success when email is not configured, and no documented Gmail-specific sender rules.

**Outcome:** A visitor submits the form → the team inbox receives a structured notification → the visitor receives a branded confirmation with a reference ID → the visitor sees that same reference ID on screen.

> **Implementation status (20 October 2026):** Phases 0–4 are implemented. `.env.local` now exists with `EMAIL_TO`/`SMTP_USER` set to `Anvardglobal@gmail.com`, but `SMTP_PASS` is intentionally blank. Development therefore remains in staging mode until a Google App Password is added. A fake-SMTP integration test verifies the transport/headers, and the production build was verified to return `503` when credentials are missing. A real Gmail delivery test remains the final step.

---

## 2. Problem & Context

### 2.1 Current behaviour (verified in the repository)

| Area | Current state | Gap |
| --- | --- | --- |
| Form | `src/components/forms/EnquiryForm.tsx` collects name, phone, service focus, and query | **No email address is collected**, so an acknowledgement cannot be sent |
| Validation | `src/lib/validation.ts` validates name, phone, service enum, query, honeypot | No email validation rules |
| API | `src/app/api/enquiry/route.ts` handles rate limiting, honeypot, Zod validation, and sending | Returns provider `messageId` as `referenceId`; no acknowledgement email |
| Email service | `src/lib/email.ts` supports Resend, SMTP, and a dev staging mode | SMTP defaults to the wrong sender identity for Gmail; staging mode returns success even in production |
| Config | `.env.example` documents `EMAIL_TO`, `EMAIL_FROM`, `RESEND_API_KEY`, and SMTP values | No `.env.local`; README tells the operator to choose a provider but not how to configure Gmail safely |
| Privacy policy | `src/app/privacy-policy/page.tsx` lists name, phone, service, query, and metadata | Does not disclose collection of an email address or acknowledgement emails |
| Success UX | Shows a generic thank-you card | Does not show a reference ID or confirm where the acknowledgement was sent |

### 2.2 Why this matters

- **Lost leads:** In the current state, a production deployment without credentials would accept enquiries and show success while silently discarding them from the team's perspective.
- **No reply path:** The team can only call the enquirer. There is no email address and no `Reply-To` header.
- **No acknowledgement:** Enquirers receive no confirmation, which weakens trust for a consultancy brand.
- **Support burden:** Without a reference ID, a follow-up conversation ("I submitted last Tuesday") cannot be matched to a record.
- **Compliance:** Collecting an email address requires a matching privacy disclosure under the site's stated DPDP review posture.

### 2.3 Assumption

Email is the **only** system of record for enquiries. There is no database and no CRM integration in this project. If an email is not delivered, the enquiry is lost. This makes delivery reliability and failure visibility product requirements, not just engineering details.

---

## 3. Goals & Success Metrics

### 3.1 Goals

1. Deliver every valid enquiry to the official team inbox using Gmail SMTP.
2. Send the enquirer a branded acknowledgement containing a stable reference ID.
3. Never show a success message unless the team notification was actually accepted by Gmail.
4. Make configuration failures obvious in production instead of silently staging enquiries.
5. Protect the mailbox and the enquirer's address from abuse introduced by the auto-reply.
6. Keep the existing form UX, visual identity, and anti-spam posture intact.

### 3.2 Success metrics

| Metric | Target |
| --- | --- |
| Admin notification delivery rate (accepted by Gmail) | ≥ 99% of valid submissions |
| Acknowledgement delivery rate | ≥ 95% of valid submissions |
| Form submission → team email latency (p95) | ≤ 10 seconds |
| API response latency (p95), excluding background acknowledgement | ≤ 5 seconds |
| Silent failures in production | 0 |
| Spam / bot submissions reaching the inbox | < 5% of total submissions |
| Enquiries with a reference ID shown to the user | 100% |

Instrumentation for these metrics is limited to server logs in v1 (see §13). A dashboard is out of scope.

---

## 4. Non-Goals

- Database or CRM persistence of enquiries.
- An admin dashboard, inbox UI, or status pipeline.
- Marketing newsletters, drip campaigns, or subscriber lists.
- File attachments in enquiries.
- Multi-language email templates (English `en-IN` only in v1).
- Calendar booking or automatic meeting scheduling.
- Replacing Gmail with a transactional provider. Resend remains an optional technical fallback, but is not part of v1 acceptance.
- Automated deliverability testing across every email client. Manual checks cover Gmail, Outlook, and Apple Mail.

---

## 5. Users & Use Cases

### 5.1 Personas

| Persona | Need |
| --- | --- |
| **Prospective client** | Submit an enquiry quickly and receive confidence that it was received |
| **Director / advisory team** | Receive a complete, scannable enquiry with a one-click reply and call action |
| **Website operator** | Configure credentials safely once and detect delivery failures quickly |
| **Spam bot / abuser** | Should be blocked or neutralised without generating outbound email |

### 5.2 Primary use cases

1. **Happy path:** A prospective client submits name, work email, phone, service focus, and a query. The team is notified. The client receives an acknowledgement with a reference ID.
2. **Direct reply:** The director opens the notification and hits Reply. The reply goes to the enquirer, not to the website's own address.
3. **Follow-up:** The enquirer quotes the reference ID; the team searches the mailbox for it.
4. **Provider failure:** Gmail rejects the message (auth failure, quota, timeout). The user sees an actionable fallback with the phone number and email address; no false success.
5. **Spam attempt:** A bot fills the honeypot or exceeds the rate limit. No email is sent.
6. **Missing configuration:** A production deployment lacks SMTP credentials. The API fails loudly and logs a configuration error; it does not silently swallow enquiries.

---

## 6. Locked Decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Provider | **Gmail SMTP** (`smtp.gmail.com`) via Nodemailer | Uses the existing dependency and the company's existing Gmail inbox; no domain verification required |
| Authentication | Google **App Password** with 2-Step Verification enabled | Google no longer supports basic password auth for SMTP |
| Email scope | **Admin notification + enquirer acknowledgement** | Confirms receipt and provides a reference ID |
| Sender identity | Authenticated Gmail address with display name `ANVARD GLOBAL Website` | Gmail rewrites or rejects `From` addresses it does not own |
| Enquirer email | **Required field** | Acknowledgement is part of the feature; optional email would make behaviour inconsistent |
| Acknowledgement timing | Scheduled with Next.js `after()` after the admin email succeeds | Keeps the HTTP response fast; admin delivery remains the blocking requirement |
| Reference ID | Server-generated, human-readable, included in both emails and the API response | Provider message IDs are opaque and differ per transport |
| Production staging mode | **Disabled** | Silent success in production is a lead-loss bug |

---

## 7. Functional Requirements

Priority uses MoSCoW. All **Must** items are required for v1.

### FR-1 — Collect the enquirer's email address (Must)

- Add a required **Email Address** field to `EnquiryForm`, positioned after Full Name and before Phone Number.
- Use `type="email"`, `autoComplete="email"`, `inputMode="email"`, a visible label, and a required indicator consistent with existing fields.
- Placeholder: `you@company.com`.
- Trim whitespace; enforce a maximum length of 254 characters.
- Show an inline validation error for malformed addresses.
- Preserve the field's value on submission failure; clear it only on success.

### FR-2 — Validate and sanitise the email address server-side (Must)

- Extend `enquirySchema` with a required `email` field.
- Reject addresses containing CR/LF or other header-injection characters.
- Normalise by trimming; do not alter the local part's case.
- Never interpolate a raw address into an email header without sanitisation.
- Reject the request with `422` and a field-level error if validation fails.

### FR-3 — Send an admin notification (Must)

- Send to `EMAIL_TO` (fallback: `COMPANY.email`).
- Send from `EMAIL_FROM` (must be the authenticated Gmail address or a verified alias).
- Set `Reply-To` to the enquirer's email address.
- Subject: `New Website Enquiry — {Full Name} ({Service}) [{Reference ID}]`.
- Include: reference ID, received timestamp in Asia/Kolkata, full name, email (mailto link), phone (tel link), service focus, full query, source page, and internal metadata (IP, user agent).
- Provide both HTML and plain-text versions.
- Escape all user-supplied values in HTML; never render raw HTML from the query.

### FR-4 — Send an enquirer acknowledgement (Must)

- Send to the enquirer's email address only after the admin notification succeeds.
- Send from `EMAIL_FROM`; set `Reply-To` to `EMAIL_TO` so replies reach the team.
- Subject: `We've received your enquiry — ANVARD GLOBAL (Ref: {Reference ID})`.
- Include: greeting, confirmation of receipt, reference ID, service focus, submission date in IST, expected response window, official phone and email, registered office, and a confidentiality note.
- **Do not echo the full submitted query** in the acknowledgement. This limits accidental disclosure if the address was mistyped and reduces backscatter value to abusers.
- Provide both HTML and plain-text versions using the existing navy/gold/ivory brand system.
- Set `Auto-Submitted: auto-replied` and `X-Auto-Response-Suppress: All` to reduce auto-responder loops.
- Skip the acknowledgement if the recipient address equals `EMAIL_TO` or `SMTP_USER` (self-loop protection).
- A failure here must **not** fail the API request.

### FR-5 — Generate a stable reference ID (Must)

- Generate one ID per accepted submission, server-side, before sending.
- Format: `AG-YYMMDD-XXXX` using IST date and four unambiguous uppercase alphanumeric characters (e.g. `AG-261020-K7Q2`).
- Use the same ID in the admin subject/body, the acknowledgement subject/body, the API response, and the on-screen success state.
- Do not use the transport `messageId` as the customer-facing reference.

### FR-6 — Gmail SMTP transport (Must)

- Use `nodemailer.createTransport` with:
  - `host: process.env.SMTP_HOST` (default `smtp.gmail.com`)
  - `port: Number(process.env.SMTP_PORT)` (default `465`)
  - `secure: port === 465`
  - `auth.user: process.env.SMTP_USER`
  - `auth.pass: process.env.SMTP_PASS` (16-character Google App Password, spaces removed)
- Set connection timeouts: `connectionTimeout: 10_000`, `greetingTimeout: 10_000`, `socketTimeout: 20_000`.
- Create the transport per send or use a short-lived pooled transport; do not keep idle sockets open indefinitely in a serverless runtime.
- Set `export const maxDuration = 30` in the route handler so the response plus background acknowledgement fit within the function limit.
- `EMAIL_FROM` **must** be `ANVARD GLOBAL Website <Anvardglobal@gmail.com>` or a verified "Send mail as" alias. A `notifications@anvardglobal.com` sender will be rewritten or rejected unless that alias is verified in Gmail.

### FR-7 — Configuration detection and fail-fast (Must)

- Add `isEmailConfigured()` that requires `SMTP_HOST`, `SMTP_USER`, and `SMTP_PASS`.
- In **development**, if unconfigured, keep the current staging behaviour: validate, log a clearly marked `DEV STAGING` record, and return success.
- In **production**, if unconfigured:
  - Log a single high-severity configuration error with the missing variable names (never values).
  - Return `503` with a user-facing fallback message.
  - Do **not** return success and do **not** attempt an acknowledgement.
- If Resend remains in the codebase, define precedence explicitly: **SMTP wins when configured**. Resend is only attempted when SMTP is absent and `RESEND_API_KEY` is present. If neither is configured in production, fail as above.

### FR-8 — Error handling and fallback copy (Must)

| Failure | API response | User experience |
| --- | --- | --- |
| Validation error | `422` + `fieldErrors` | Inline field error and summary notice |
| Rate limited | `429` | Notice to wait or call directly |
| Honeypot triggered | `200` synthetic success | No email sent; bot sees success |
| Missing SMTP in production | `503` | "Email service temporarily unavailable. Call +91 8010416869 or email Anvardglobal@gmail.com." |
| Gmail auth failure (`535`) | `502` | Same actionable fallback; operator log includes `EAUTH` |
| Gmail quota exceeded (`550 5.4.5` / daily limit) | `502` | Same fallback; operator alert log |
| SMTP timeout / connection reset | `502` (after one retry) | Same fallback |
| Admin email accepted, acknowledgement failed | `200` success | Success card shown; acknowledgement failure logged with reference ID |
| Unexpected error | `500` | Generic fallback with direct contact details |

- Retry the admin notification **once** for transient connection/timeout errors only. Do not retry authentication or validation errors.
- Return a generic error message to the client; never expose SMTP hostnames, credentials, or stack traces.

### FR-9 — Anti-abuse controls (Must)

Retain and strengthen the existing protections:

- Honeypot field `website` remains hidden from humans; a filled value returns synthetic success and sends nothing.
- Per-IP rate limit: **5 requests per 10 minutes** (existing). Document that the in-memory map is per-instance and resets on cold starts.
- Add a per-instance **daily acknowledgement cap** (default 200) to limit backscatter if the endpoint is abused. Log when the cap is hit; admin notifications continue.
- Reject requests with malformed JSON or an oversized body (existing behaviour, keep the payload small).
- Validate the email address before any send attempt.
- Do not auto-reply to the company's own addresses.
- Phase 2 (not v1): durable rate limiting (Redis/Upstash) and Cloudflare Turnstile if spam volume increases.

### FR-10 — Success and failure UX (Must)

- On success, display:
  - Heading: "Enquiry Received".
  - Confirmation copy: "A confirmation has been sent to **{submitted email}**."
  - Reference ID in a monospace, copyable block labelled "Your Reference".
  - Note: "If you do not see the confirmation, please check your spam folder."
  - Direct contact details as a fallback.
  - "Submit another enquiry" action (existing).
- Store the submitted email and reference ID in component state before resetting the form.
- On failure, keep all field values and show the actionable error notice.
- Keep the success card visually consistent with the current navy/gold design.

### FR-11 — Configuration artefacts and documentation (Must)

- Update `.env.example` with the Gmail-specific values and remove misleading defaults.
- Update `README.md` with:
  - Gmail App Password setup steps.
  - Required environment variables.
  - Local testing instructions.
  - Vercel environment-variable instructions.
  - A note that `EMAIL_FROM` must match the authenticated Gmail account or a verified alias.
- Never commit `.env.local` or real credentials. `.gitignore` already excludes `.env*` except `.env.example`.
- Add a short operations runbook: how to rotate the app password, how to check logs, and how to disable email delivery in an emergency.

### FR-12 — Privacy policy update (Must)

Update `src/app/privacy-policy/page.tsx`:

- Add **Email Address** to the list of collected information in section 2.
- State that the email address is used to send an acknowledgement and to respond to the enquiry.
- Update section 3 to mention the automated acknowledgement email.
- Keep the existing legal-review notice; this is a disclosure update, not legal advice.

### FR-13 — Shared email design system (Should)

- Extract the shared HTML shell (navy header, gold rule, ivory body, footer with company details) into a reusable template module so the admin and acknowledgement emails do not duplicate 100+ lines of markup.
- Both templates must use table-based layout, inline CSS, a maximum width of 600px, and no external fonts or tracking pixels.
- Provide a plain-text alternative for every HTML email.

### FR-14 — Observability (Should)

- Emit structured logs for each attempt:
  - `referenceId`
  - `event`: `enquiry.received`, `email.admin.sent`, `email.admin.failed`, `email.ack.sent`, `email.ack.failed`, `email.config.missing`, `email.rate_limited`
  - `mode`: `smtp` | `resend` | `development-staged`
  - `durationMs`
  - `errorCode` (e.g. `EAUTH`, `ETIMEDOUT`, `EQUOTA`)
- Do **not** log full query text, email addresses, or phone numbers in production. Log the reference ID and masked address (`a***@domain.com`) only.
- Include the reference ID in all error messages written to the server log so support can correlate a user report.

---

## 8. User Flows

### 8.1 Happy path

1. Visitor opens `/contact` or the enquiry modal.
2. Fills name, email, phone, service focus, and query.
3. Client-side Zod validation passes.
4. `POST /api/enquiry` validates IP rate limit, honeypot, and payload.
5. Server generates reference ID `AG-261020-K7Q2`.
6. Server sends the admin notification and waits for Gmail to accept it.
7. Server returns `200` with `referenceId`.
8. `after()` sends the acknowledgement to the visitor.
9. Form shows the success card with the reference ID and the submitted email.
10. Team replies to the notification; `Reply-To` routes the reply to the visitor.

### 8.2 Admin email fails

1. Gmail rejects the message (auth, quota, or timeout).
2. Server retries once for transient errors.
3. Server logs `email.admin.failed` with the reference ID and error code.
4. API returns `502` with the direct-contact fallback.
5. **No acknowledgement is sent** (the enquiry was not recorded).
6. Form preserves the visitor's input and shows the fallback notice.

### 8.3 Acknowledgement fails

1. Admin notification succeeds.
2. API returns `200`; the success card is shown.
3. `after()` attempts the acknowledgement and fails.
4. Server logs `email.ack.failed` with the reference ID.
5. The team still has the enquiry and can follow up. No user-facing error is shown.

### 8.4 Spam

1. Bot fills the hidden `website` field.
2. Server logs the honeypot trigger (without PII) and returns synthetic success.
3. No email is sent.
4. Repeated requests from one IP receive `429` after five attempts in ten minutes.

### 8.5 Missing production configuration

1. A deployment lacks `SMTP_PASS`.
2. The first enquiry request detects the missing configuration.
3. Server logs `email.config.missing` naming the missing variables.
4. API returns `503` with direct contact details.
5. The visitor is never told the enquiry succeeded.

---

## 9. Email Specifications

### 9.1 Admin notification

| Header | Value |
| --- | --- |
| `From` | `ANVARD GLOBAL Website <Anvardglobal@gmail.com>` (or verified alias) |
| `To` | `EMAIL_TO` |
| `Reply-To` | Enquirer's email |
| `Subject` | `New Website Enquiry — {Full Name} ({Service}) [{Reference ID}]` |
| `X-Entity-Ref-ID` | Reference ID (optional, useful for mailbox filters) |

**Body sections:**

1. Navy header with company name, "New Business Enquiry Received", and IST timestamp.
2. Summary table: reference ID, client name, email (mailto), telephone (tel), focus area.
3. Full query in a pre-wrapped block with escaped HTML.
4. Primary action: "Reply to Enquirer" (`mailto:` with subject pre-filled) and secondary "Call Enquirer".
5. Footer: legal name, CIN, director, registered office, official email, phone.
6. Internal metadata: source URL/page, IP address, user agent, submission timestamp (ISO 8601).

### 9.2 Enquirer acknowledgement

| Header | Value |
| --- | --- |
| `From` | `ANVARD GLOBAL <Anvardglobal@gmail.com>` (or verified alias) |
| `To` | Enquirer's email |
| `Reply-To` | `EMAIL_TO` |
| `Subject` | `We've received your enquiry — ANVARD GLOBAL (Ref: {Reference ID})` |
| `Auto-Submitted` | `auto-replied` |
| `X-Auto-Response-Suppress` | `All` |

**Body sections:**

1. Navy header with the company wordmark and "Enquiry Received".
2. Greeting using the enquirer's name.
3. Confirmation paragraph: "Thank you for contacting Anvard Global. Your enquiry has been received and is being reviewed by our advisory team."
4. Reference block: `AG-261020-K7Q2` (large, copyable).
5. Summary: service focus and submission date (IST). **No full query.**
6. Response expectation: "Our team will respond within one business day." (Confirm the SLA with the Director before launch.)
7. Contact block: phone (tel link), email (mailto link), registered office, business hours.
8. Confidentiality note and a link to the privacy policy on the website.
9. Footer with legal name, CIN, director, and registered office.

### 9.3 Brand and accessibility

- Palette: navy `#111C30`, deep navy `#0A1120`, champagne gold `#C7A66B`, ivory `#FAF9F6`, warm ivory `#F4F2EC`, charcoal `#1D2633`.
- Typography: Georgia or a system serif for headings; Arial/Helvetica for body. Do not rely on web fonts.
- Use semantic headings and sufficient contrast (minimum 4.5:1 for body text).
- If a logo image is used, host it on the production domain and provide alt text. A text wordmark is preferred in v1 to avoid blocked images.
- Test at 320px, 600px, and desktop widths.

---

## 10. Data & API Contracts

### 10.1 Request

`POST /api/enquiry`

```json
{
  "fullName": "Ankit Sharma",
  "email": "ankit@example.com",
  "phoneNumber": "+91 80104 16869",
  "serviceInterestedIn": "Business Strategy",
  "query": "We are exploring a growth plan for a new vertical.",
  "website": ""
}
```

### 10.2 Validation rules

| Field | Rules |
| --- | --- |
| `fullName` | Required; 2–100 chars; letters, spaces, `.`, `'`, `-` |
| `email` | Required; trimmed; max 254 chars; valid email syntax; no CR/LF; normalised for comparison |
| `phoneNumber` | Required; 10–18 chars; existing Indian/international rules |
| `serviceInterestedIn` | Required enum: Business Strategy, Operations Consulting, Business Advisory, Growth Opportunities, General Enquiry |
| `query` | Required; 10–1,500 chars; trimmed |
| `website` | Must be empty (honeypot) |

### 10.3 Success response (`200`)

```json
{
  "success": true,
  "message": "Thank you for reaching out. Your enquiry has been received. A confirmation has been sent to your email address.",
  "referenceId": "AG-261020-K7Q2"
}
```

### 10.4 Error response

```json
{
  "success": false,
  "error": "Our email service is temporarily unavailable. Please call +91 8010416869 or email Anvardglobal@gmail.com.",
  "fieldErrors": {
    "email": ["Please enter a valid email address"]
  }
}
```

### 10.5 Environment variables

| Variable | Required | Example | Notes |
| --- | --- | --- | --- |
| `EMAIL_TO` | Yes | `Anvardglobal@gmail.com` | Team inbox that receives enquiries |
| `EMAIL_FROM` | Yes | `ANVARD GLOBAL Website <Anvardglobal@gmail.com>` | Must match the authenticated Gmail account or a verified alias |
| `SMTP_HOST` | Yes | `smtp.gmail.com` | Gmail SMTP host |
| `SMTP_PORT` | Yes | `465` | `465` (implicit TLS) or `587` (STARTTLS) |
| `SMTP_USER` | Yes | `Anvardglobal@gmail.com` | Full Gmail address |
| `SMTP_PASS` | Yes | `abcd efgh ijkl mnop` | 16-character App Password; remove spaces when pasting |
| `ENQUIRY_RESPONSE_SLA` | No | `one business day` | Promise shown in the acknowledgement email |
| `MAX_DAILY_ACKNOWLEDGEMENTS` | No | `200` | Per-instance daily acknowledgement cap (backscatter protection) |
| `RESEND_API_KEY` | No | empty | Optional legacy fallback only; not used when SMTP is configured |

**Never commit real values.** `.env.example` contains placeholders only.

---

## 11. Architecture & File-Level Plan

### 11.1 Flow

```
EnquiryForm (client)
  └─ POST /api/enquiry
       ├─ rate limit / honeypot / Zod validation
       ├─ generate reference ID
       ├─ sendAdminNotification()  ← awaited; failure → 502
       ├─ respond 200 { referenceId }
       └─ after(): sendEnquirerAcknowledgement()  ← failure → log only
```

### 11.2 Files

| File | Change |
| --- | --- |
| `src/lib/validation.ts` | Add required `email` field with Zod email validation, trimming, max length, and CR/LF rejection |
| `src/components/forms/EnquiryForm.tsx` | Add email input; include it in the request; store submitted email/reference; show reference and acknowledgement notice on success; preserve values on error |
| `src/app/api/enquiry/route.ts` | Generate reference ID; await admin send; schedule acknowledgement with `after()`; return stable `referenceId`; add `maxDuration`; improve error mapping |
| `src/lib/email.ts` | Add Gmail SMTP transport, configuration detection, reference ID generator, retry logic, and two send functions |
| `src/lib/email-templates.ts` *(new)* | Shared HTML shell + admin and acknowledgement HTML/text builders |
| `src/app/privacy-policy/page.tsx` | Disclose email collection and acknowledgement processing |
| `.env.example` | Gmail-specific variables and safe defaults |
| `README.md` | Gmail App Password setup, local testing, Vercel deployment, runbook |
| `docs/PRD-email-integration.md` | This document |

No new npm dependencies are required. `nodemailer` and `@types/nodemailer` are already installed.

### 11.3 Implementation notes

- Import `after` from `next/server` in the route handler. Per the Next.js 16 docs, it runs after the response is sent and is supported in Route Handlers.
- Keep the admin send awaited. This is the only way to guarantee the user is not told "success" when the enquiry was not recorded.
- Use a shared `createTransport()` helper so timeout and auth settings are defined once.
- Prefer returning `{ success, message, referenceId }`; do not expose transport internals.
- If Resend remains, make SMTP precedence explicit and document it. Do not leave two providers racing silently.

---

## 12. Security, Privacy & Compliance

### 12.1 Threats and mitigations

| Threat | Mitigation |
| --- | --- |
| Header injection via name/email | Zod validation + `sanitizeHeader()` on every header value |
| HTML injection in email body | `escapeHtml()` on every user-supplied value; query rendered with `white-space: pre-wrap` |
| Spam bots | Honeypot, per-IP rate limit, validation, optional Turnstile in Phase 2 |
| Backscatter / using the form to email third parties | Acknowledgement sent only after admin success; no full query echoed; per-instance daily cap; rate limit |
| Auto-responder loops | `Auto-Submitted: auto-replied`, `X-Auto-Response-Suppress: All`, skip self-addresses |
| Credential leakage | App Password stored only in `.env.local` / Vercel env vars; never logged or committed |
| Open relay | The endpoint only sends to the fixed team inbox and the validated submitter; no user-controlled recipients beyond that |
| PII in logs | Log reference ID + masked email only; no query text in production |
| Denial of service | Payload validation, body size limits, rate limiting, SMTP timeouts, single retry |

### 12.2 Privacy

- Collect only the email address, which is necessary to acknowledge the enquiry.
- Disclose the purpose in the privacy policy and link to it from the form.
- Retain emails in the corporate mailbox under the existing retention statement.
- Honour deletion requests by searching the mailbox for the reference ID.
- Do not sell or share the address; no marketing use without separate consent.
- The acknowledgement must not include the full query, limiting exposure if an address is mistyped.

### 12.3 Compliance note

This PRD updates disclosures but is not legal advice. The existing DPDP review notice remains. The Director should confirm the response SLA, retention period, and grievance contact before launch.

---

## 13. Non-Functional Requirements

| Category | Requirement |
| --- | --- |
| **Reliability** | Admin notification is attempted for every valid submission; one retry on transient failures; failures are visible in logs |
| **Performance** | API p95 ≤ 5s excluding background acknowledgement; SMTP timeouts prevent hanging requests |
| **Availability** | A Gmail outage degrades to a clear fallback message; the site itself remains available |
| **Security** | See §12; no secrets in source control; production logs contain no query text or full addresses |
| **Accessibility** | Email field has a visible label, error text, and keyboard support; email templates use semantic headings and sufficient contrast |
| **Compatibility** | Form works on the existing `/contact` page and the global enquiry modal; emails render in Gmail, Outlook, and Apple Mail |
| **Maintainability** | Shared email template shell; no duplicated 100-line HTML blocks; configuration documented in one place |
| **Observability** | Structured logs keyed by reference ID; errors include a stable error code |
| **Cost** | No new paid service; Gmail limits apply (see §16) |

---

## 14. Acceptance Criteria

### AC-1 — Successful submission

**Given** valid name, email, phone, service, and query,  
**When** the visitor submits the form,  
**Then** the team inbox receives the notification with a `Reply-To` pointing to the visitor, the visitor receives an acknowledgement with the same reference ID, and the success card displays that reference ID and the submitted email.

### AC-2 — Email field validation

**Given** an invalid email such as `ankit@`,  
**When** the visitor submits,  
**Then** an inline error appears, no API request is made (or the API returns `422`), and no email is sent.

### AC-3 — Reply routing

**Given** the admin notification,  
**When** the director clicks Reply,  
**Then** the recipient is the enquirer's email address, not the company address.

### AC-4 — Honeypot

**Given** a bot fills the `website` field,  
**When** it submits,  
**Then** the API returns synthetic success and neither the team nor any third party receives an email.

### AC-5 — Rate limit

**Given** six submissions from one IP within ten minutes,  
**When** the sixth is sent,  
**Then** the API returns `429` and no email is sent for that request.

### AC-6 — Admin delivery failure

**Given** invalid SMTP credentials,  
**When** a valid enquiry is submitted,  
**Then** the API returns `502`, the UI shows the direct-contact fallback, the input is preserved, and no acknowledgement is sent.

### AC-7 — Acknowledgement failure

**Given** the admin email succeeds but the acknowledgement throws,  
**When** the request completes,  
**Then** the API returns `200` success, the reference ID is shown, and the failure is logged as `email.ack.failed`.

### AC-8 — Missing production configuration

**Given** `NODE_ENV=production` and no `SMTP_PASS`,  
**When** an enquiry is submitted,  
**Then** the API returns `503`, logs `email.config.missing`, and does not return success.

### AC-9 — Development staging

**Given** local development with no SMTP credentials,  
**When** an enquiry is submitted,  
**Then** the server logs a clearly marked `DEV STAGING` record and the UI shows success with a `dev-` reference ID. No external email is sent.

### AC-10 — Gmail sender identity

**Given** `EMAIL_FROM` is set to an unverified `@anvardglobal.com` address,  
**When** Gmail processes the message,  
**Then** the sender is rewritten or rejected. The implementation and documentation must prevent this by using the authenticated Gmail address or a verified alias.

### AC-11 — Privacy disclosure

**Given** the privacy policy page,  
**When** a visitor reads section 2,  
**Then** the email address is listed as collected data and the acknowledgement purpose is described.

### AC-12 — Build quality

**Given** the completed implementation,  
**When** `npm run lint` and `npm run build` are run,  
**Then** both pass with no new errors.

### AC-13 — Existing flows preserved

**Given** the home page enquiry modal and the `/contact` form,  
**When** each is used,  
**Then** both submit successfully with the new email field and show the reference ID.

---

## 15. Test Plan

### 15.1 Manual test matrix

| # | Scenario | Expected |
| --- | --- | --- |
| 1 | Valid submission from `/contact` | Admin email + acknowledgement + reference on screen |
| 2 | Valid submission from modal | Same as above; modal closes after the existing delay |
| 3 | Missing email | Inline error; no send |
| 4 | Malformed email | Inline error; no send |
| 5 | Email with CR/LF | `422`; no send |
| 6 | Missing name/query | Inline errors; no send |
| 7 | Honeypot filled | Synthetic success; no send |
| 8 | 6th request in 10 minutes | `429`; no send |
| 9 | Wrong SMTP password | `502`; fallback notice; input preserved |
| 10 | Empty SMTP config in production | `503`; config error logged |
| 11 | Empty SMTP config in development | Staging log; success with `dev-` ID |
| 12 | Gmail reply to admin email | Reply goes to enquirer |
| 13 | Acknowledgement rendering in Gmail | Correct branding, links, reference |
| 14 | Acknowledgement rendering in Outlook | No broken layout |
| 15 | Mobile 320px | Form usable; email input triggers email keyboard |
| 16 | Plain-text client | Readable text version |
| 17 | Self-addressed submission (`EMAIL_TO`) | Admin email sent; acknowledgement skipped |
| 18 | Duplicate double-click | Button disabled during submit; one request in normal use |

### 15.2 Automated tests (recommended, not blocking v1)

No test framework is currently installed. If one is added later, cover:

- `enquirySchema` accepts valid email variants and rejects malformed/header-injection inputs.
- Reference ID format and uniqueness.
- `isEmailConfigured()` behaviour for each environment.
- Route handler error mapping with a mocked transport.
- Template escaping for `<script>`, quotes, and newlines.

### 15.3 Pre-launch verification

- [ ] App Password generated and stored in Vercel for Production and Preview.
- [ ] `EMAIL_FROM` matches the authenticated Gmail account or a verified alias.
- [ ] Test submission from a non-company email address.
- [ ] Team inbox receives the notification; Reply goes to the tester.
- [ ] Tester receives the acknowledgement; reference IDs match.
- [ ] Check Gmail "Sent" folder and server logs.
- [ ] Check spam folder for the acknowledgement.
- [ ] `npm run lint` and `npm run build` pass.
- [ ] Privacy policy updated.
- [ ] `.env.example` contains no real credentials.

---

## 16. Gmail Operational Constraints

These are product constraints because they can cause lost enquiries.

| Constraint | Impact | Mitigation |
| --- | --- | --- |
| App Password requires 2-Step Verification | Setup cannot proceed without 2FA | Document the exact Google Account steps |
| Free Gmail sending limit (~500 recipients/day; verify current Google limits) | Bulk or abusive traffic can exhaust the quota | Monitor quota errors; keep the daily acknowledgement cap; upgrade to Workspace if volume grows |
| Google Workspace limit (~2,000 recipients/day; verify current limits) | Higher but still finite | Same monitoring |
| `From` must be the authenticated account or a verified alias | Unverified senders are rewritten/rejected | Use `Anvardglobal@gmail.com` or configure "Send mail as" and verify |
| SMTP over serverless can be slower than HTTP APIs | Higher latency, occasional timeouts | 10s connection timeout, 30s route duration, one retry |
| Some hosts restrict outbound SMTP ports | Delivery may fail entirely | Verify port 465/587 on the deployment platform before launch; Resend is the contingency |
| Gmail may rate-limit rapid identical messages | Acknowledgement delays | Send admin first; acknowledgement is best-effort |
| New accounts may have lower limits | Early failures | Warm up the account; monitor logs |

**Contingency:** If Gmail SMTP proves unreliable on the chosen host, switch to Resend (already implemented) after verifying `anvardglobal.com` and setting `RESEND_API_KEY`. The PRD's API contract and templates remain unchanged.

---

## 17. Implementation Plan

Estimates assume one developer familiar with the codebase. Total: **2.5–3.5 working days**.

### Phase 0 — Configuration and access (0.5 day)

- Confirm the team inbox and whether it is free Gmail or Google Workspace.
- Enable 2-Step Verification and generate an App Password.
- Decide `EMAIL_FROM` (authenticated Gmail address in v1).
- Add variables to `.env.local` for local testing.
- Verify outbound SMTP from the deployment platform with a throwaway script or a test submission.

**Exit:** A manual Nodemailer send from the project succeeds.

### Phase 1 — Form and schema (0.5 day)

- Add `email` to `enquirySchema`.
- Add the email input to `EnquiryForm` with validation and autocomplete.
- Add email to the request payload.
- Update the privacy policy disclosure.
- Verify client-side validation and the existing modal/contact layouts.

**Exit:** The form submits an email value; invalid addresses are blocked on the client and server.

### Phase 2 — Email service and templates (1 day)

- Add `isEmailConfigured()` and Gmail transport settings.
- Add the reference ID generator.
- Extract `src/lib/email-templates.ts` with the shared shell.
- Implement `sendAdminNotification()` and `sendEnquirerAcknowledgement()`.
- Add plain-text versions and the required headers.
- Keep the dev staging path, but make production fail fast.

**Exit:** Both emails can be sent from a small script or route with a known reference ID.

### Phase 3 — API orchestration and UX (0.5–1 day)

- Generate the reference ID in the route.
- Await the admin send; map Gmail errors to the response table in FR-8.
- Schedule the acknowledgement with `after()`.
- Return the stable `referenceId`.
- Update the success card to show the reference and submitted email.
- Add `maxDuration`.
- Add structured logs.

**Exit:** End-to-end flow works locally and in a preview deployment.

### Phase 4 — QA, docs, and launch (0.5 day)

- Run the manual test matrix.
- Test Gmail, Outlook, Apple Mail, and mobile widths.
- Update `README.md` and `.env.example`.
- Add the operations runbook.
- Deploy to Vercel with Production and Preview variables.
- Perform a live test from an external email address.
- Confirm logs and the Gmail Sent folder.

**Exit:** All acceptance criteria pass; the Director signs off on the SLA copy.

### Dependency graph

```
Phase 0 (credentials)
   └─ Phase 2 (transport + templates)
Phase 1 (form + schema) ──┴─ Phase 3 (API + UX) ── Phase 4 (QA + launch)
```

---

## 18. Rollout & Rollback

### Rollout

1. Merge behind the existing route; no feature flag is required because the form is already live.
2. Add environment variables to **Preview** first; deploy a preview and run the test matrix.
3. Add the same variables to **Production**; redeploy (Vercel requires a redeploy after env changes).
4. Monitor logs for `email.admin.failed`, `email.ack.failed`, and `email.config.missing` for the first 48 hours.
5. Send a live test from a personal address and confirm reply routing.

### Rollback

- **Code issue:** Revert the deployment in Vercel. No database migration is involved.
- **Credential issue:** Rotate the App Password in Google Account settings, update `SMTP_PASS`, and redeploy.
- **Provider outage:** Set `RESEND_API_KEY` and leave SMTP unconfigured to use the fallback path (if retained), or temporarily point the site's contact CTA to phone/email.
- **Abuse spike:** Clear the endpoint's rate-limit state by redeploying if necessary, lower the daily acknowledgement cap, and add Turnstile (Phase 2).
- **Data loss:** None beyond emails already accepted by Gmail; the mailbox is the system of record.

---

## 19. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Gmail App Password not configured correctly | Medium | High | Phase 0 verification, exact setup docs, fail-fast in production |
| `EMAIL_FROM` rewritten/rejected by Gmail | High if misconfigured | High | Use the authenticated address; document verified aliases |
| Gmail daily quota exceeded | Low–Medium | High | Monitor `550 5.4.5`, daily cap, Workspace upgrade path |
| Serverless SMTP timeouts | Medium | Medium | 10s timeouts, one retry, 30s route duration, Resend contingency |
| Auto-reply used for backscatter | Medium | Medium | No full query echo, rate limit, daily cap, self-address skip |
| In-memory rate limiter resets on cold start | High | Medium | Document limitation; Phase 2 durable limiter |
| Acknowledgement lands in spam | Medium | Medium | Gmail-authenticated sender, plain-text alternative, no tracking, ask users to check spam |
| Email address field reduces conversion | Medium | Medium | Keep the field short and clearly labelled; monitor submission rate |
| PII leakage in logs | Low | High | Structured logging with reference ID and masked email only |
| Privacy disclosure missed | Low | Medium | Include it in the acceptance criteria and launch checklist |
| Gmail account compromise | Low | High | 2FA, App Password rotation, no password reuse, restrict account access |

---

## 20. Decisions & Remaining Confirmations

| Topic | Implemented default | Status |
| --- | --- | --- |
| Team inbox | `Anvardglobal@gmail.com` via `EMAIL_TO` | **Confirmed by stakeholder** |
| Email field | Required, validated on client and server | **Implemented** |
| Sender identity | `ANVARD GLOBAL Website <Anvardglobal@gmail.com>` | **Implemented**; no Gmail alias assumed |
| Response SLA | `one business day`, configurable via `ENQUIRY_RESPONSE_SLA` | **Default applied**; confirm copy |
| Acknowledgement | Branded email, same reference ID, no full query echoed | **Implemented** |
| Production without credentials | `503` fail-fast, detailed server log, no PII | **Implemented and verified** |
| CC/BCC | None; single `EMAIL_TO` recipient | **Not implemented**; can be added if required |
| Consent copy | Privacy Policy link below the form, no checkbox | **Implemented**; legal review may request a checkbox |
| Retention / deletion | Gmail mailbox policy is the system of record | **Operator responsibility**; no automated retention |
| Persistence / backup | Email only | **Not implemented**; consider later |
| Email brand asset | Text wordmark, no remote images | **Implemented** |

### Final confirmation still needed

1. **Gmail plan:** Free Gmail vs Google Workspace. Both work with app passwords, but daily sending limits differ. Confirm the plan and its current limit before high-volume launch.
2. **Response SLA:** Confirm that "one business day" is accurate, or change `ENQUIRY_RESPONSE_SLA`.
3. **Gmail alias:** If `anvardglobal.com` is later verified as a Gmail "Send mail as" alias, `EMAIL_FROM` can be changed. Until then, keep the `@gmail.com` sender to avoid Gmail rewriting or rejecting the message.
4. **Live delivery test:** Add the 16-character Google App Password to `.env.local` and Vercel, then send a real test enquiry and confirm both messages arrive.

---

## Appendix A — Gmail App Password Setup

1. Sign in to the Google Account used for `SMTP_USER` (e.g. `Anvardglobal@gmail.com`).
2. Go to **Google Account → Security**.
3. Enable **2-Step Verification** if it is not already on.
4. Return to **Security → App passwords**. (If the option is missing, the account may be managed by an organization that blocks app passwords; a Workspace admin must allow them.)
5. Create an app password named `Anvard Website Enquiry`.
6. Copy the 16-character password. Remove spaces when pasting into `SMTP_PASS`.
7. Add the values to `.env.local` for local testing and to Vercel for Preview/Production.
8. Never commit the password. Rotate it immediately if it is exposed.

**Local test:**

```bash
# .env.local
EMAIL_TO="Anvardglobal@gmail.com"
EMAIL_FROM="ANVARD GLOBAL Website <Anvardglobal@gmail.com>"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
SMTP_USER="Anvardglobal@gmail.com"
SMTP_PASS="your16charapppassword"
```

```bash
npm run dev
# Submit the form at http://localhost:3000/contact
# Check the terminal for [Email] logs and the Gmail Sent folder
```

**Vercel:**

1. Project → Settings → Environment Variables.
2. Add each variable for **Production** and **Preview** (and optionally Development).
3. Redeploy the project; environment changes do not apply to existing deployments.
4. Submit a live test and check **Deployments → Functions → Logs**.

---

## Appendix B — Current State vs. Target State

| Capability | Today | After v1 |
| --- | --- | --- |
| Enquirer email collected | No | Yes, required |
| Admin notification | Code exists, unconfigured | Delivered via Gmail SMTP |
| Enquirer acknowledgement | No | Yes, branded, with reference ID |
| Reference ID | Provider `messageId` | Stable `AG-YYMMDD-XXXX` in both emails and UI |
| Reply routing | No `Reply-To` | Replies go to the enquirer |
| Missing config in production | Silent success (`development-staged`) | `503` + config error log |
| Acknowledgement failure | N/A | Logged; admin flow unaffected |
| Privacy disclosure | No email address listed | Email address + acknowledgement purpose disclosed |
| Success UX | Generic thank-you | Reference ID + confirmation destination + spam hint |
| Gmail setup docs | Generic provider choice | Exact App Password steps and sender rules |
| Tests | Manual only | Manual matrix + optional automated tests |

---

## Appendix C — Definition of Done

- [ ] All **Must** functional requirements implemented.
- [ ] All acceptance criteria pass.
- [ ] Manual test matrix completed on preview and production.
- [ ] `npm run lint` and `npm run build` pass.
- [ ] `.env.example` and `README.md` updated with Gmail instructions.
- [ ] Privacy policy updated.
- [ ] Vercel Production and Preview variables set.
- [ ] Live test from an external address succeeds; reply routing and reference IDs verified.
- [ ] Director approves the acknowledgement copy and response SLA.
- [ ] Operations runbook reviewed (rotation, rollback, abuse response).
