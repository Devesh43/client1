# ANVARD GLOBAL PRIVATE LIMITED — Official Corporate Website

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-111C30?style=for-the-badge&logo=next.js&logoColor=FAF9F6)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-C7A66B?style=for-the-badge&logo=react&logoColor=111C30)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-1D2633?style=for-the-badge&logo=tailwindcss&logoColor=FAF9F6)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-111C30?style=for-the-badge&logo=typescript&logoColor=C7A66B)](https://www.typescriptlang.org/)

A production-grade, bespoke corporate website designed and engineered for **ANVARD GLOBAL PRIVATE LIMITED**, an Indian business consultancy and advisory firm headquartered in New Delhi.

---

## 1. Verified Corporate Identity & Registration

The website strictly integrates verified credentials transcribed directly from the official corporate business card and statutory records:

| Parameter | Verified Corporate Detail |
| :--- | :--- |
| **Registered Corporate Name** | **ANVARD GLOBAL PRIVATE LIMITED** |
| **Brand Display Name** | **ANVARD GLOBAL** |
| **Industry Category** | Business Consultancy & Advisory |
| **Director** | **Ankit Sharma** |
| **Official Email** | `Anvardglobal@gmail.com` |
| **Corporate Telephone** | `+91 8010416869` |
| **Registered Office** | Plot No. 494-A, Kh. No. 296, Ground Floor, Shyam Vihar Phase 1, E-Block, Najafgarh, Delhi – 110043, India |
| **Corporate Identification Number (CIN)** | `U56290DL2026PTC469327` *(Transcribed verbatim from physical card)* |
| **Stated Core Values** | **Integrity • Innovation • Growth • Excellence** |

> [!NOTE]
> **CIN Verification Note:** The Corporate Identification Number (`U56290DL2026PTC469327`) has been transcribed character-by-character from the official physical business card. As requested, this is noted for the corporate secretarial team to cross-verify against the MCA certificate of incorporation.

---

## 2. Brand Identity & Visual System

The design reflects the aesthetic of premier international management consultancies and private advisory houses:

* **Midnight Navy (`#111C30` / `#0A1120`):** Core background for header, footer, hero, and contrast sections.
* **Deep Charcoal Navy (`#1D2633`):** Intermediate elevation and panel borders.
* **Champagne Gold (`#C7A66B` / `#D4B67F`):** Primary brand accent, button highlights, icons, and logo swoosh.
* **Warm Ivory (`#FAF9F6` / `#F4F2EC`):** Content reading background offering superior warmth and elegance over sterile cold white.
* **Refined Typography:**
  * **Headings:** *Cormorant Garamond* & *Playfair Display* (Editorial luxury serif).
  * **Body & Navigation:** *Manrope* (Geometric, high-legibility corporate sans-serif).

### Official Logo & Brand Assets (`/public/brand/`)

All logo variants were processed directly from the high-resolution master mark:
* `logo-dark-bg.png`: Optimized for dark midnight navy surfaces (crisp white typography, original champagne gold swoosh).
* `logo-light-bg.png`: Clean alpha transparency for light ivory backgrounds without fringing or white artifact boxes.
* `emblem-dark-bg.png` & `emblem-light-bg.png`: The distinctive stylized "A" emblem.
* `icon-512.png`, `icon-192.png`, `favicon-32x32.png`, `favicon-16x16.png`, `favicon.ico`: Complete browser icon suite.
* `og-image.png`: High-resolution 1200×630 OpenGraph and Twitter card preview.

---

## 3. Technology Stack & Architecture

* **Framework:** Next.js (App Router, Turbopack, Partial Prerendering)
* **Frontend:** React 19, TypeScript, Tailwind CSS v4
* **Animations:** Framer Motion / Motion for React & native CSS transitions
* **Icons:** Lucide React
* **Form UX:** React Hook Form + Client-side & Server-side Zod validation
* **Email Service:** **Gmail SMTP via Nodemailer** (App Password), with a branded enquirer acknowledgement email, stable enquiry reference IDs, and safe development staging mode
* **Anti-Spam Protections:**
  * In-memory IP rate limiter (maximum 5 requests per 10 minutes)
  * Hidden honeypot field (`website`) trapping automated web scrapers
  * Per-instance daily acknowledgement cap to limit backscatter
  * Email header injection sanitization (stripping `\r\n\t`)
  * HTML entity escaping for user query inputs

---

## 4. Website Route Structure

* **`/` (Home):**
  1. Responsive Navigation Header (Sticky, backdrop blur, logo, Enquire Now gold CTA, mobile drawer).
  2. Hero Section (Headline, verified credentials, CTAs, authentic corporate boardroom photography).
  3. Introduction (*A Thoughtful Approach to Business Growth*).
  4. Services Grid (4 pillars: Business Strategy, Operations Consulting, Business Advisory, Growth Opportunities).
  5. About Anvard Global (Core values: Integrity, Innovation, Growth, Excellence).
  6. Why Choose Us (Business-focused thinking, clear communication, tailored approach, long-term perspective).
  7. Our Approach (4-stage process: Understand → Evaluate → Recommend → Move Forward).
  8. Premium CTA (*Let's Build What's Next* with custom abstract gold curve).
  9. Contact Preview (Direct phone link, email, office address, embedded interactive enquiry form).
  10. Structured Corporate Footer (CIN, address, legal links, dynamic copyright).
* **`/about` (About Us):** Detailed corporate narrative, proposed mission & vision, core values breakdown, and business philosophy.
* **`/services` (Services):** In-depth focus areas, deliverables, and pre-selected enquiry triggers for each advisory pillar.
* **`/contact` (Contact & Enquiries):** Complete contact hub, direct click-to-call, email, Google Maps directions link generated from registered address, and full enquiry form.
* **`/privacy-policy` (Privacy Policy):** Transparent description of enquiry data processing, security measures, and DPDP review notice.
* **`/terms` (Terms & Conditions):** Corporate legal information, advisory disclaimer, intellectual property, and New Delhi jurisdiction.
* **`/not-found` (`not-found.tsx`):** Branded custom 404 page.
* **`/sitemap.xml` & `/robots.txt`:** Search engine indexation routes.

---

## 5. Environment Variables & Setup

Create a `.env.local` file in the project root based on `.env.example`:

```bash
# Canonical site URL
NEXT_PUBLIC_SITE_URL="https://anvardglobal.com"

# Destination for business enquiries
EMAIL_TO="Anvardglobal@gmail.com"

# Sender identity. With Gmail SMTP this must be the authenticated Gmail
# address or a verified "Send mail as" alias in that account.
EMAIL_FROM="ANVARD GLOBAL Website <Anvardglobal@gmail.com>"

# Promise shown in the acknowledgement email
ENQUIRY_RESPONSE_SLA="one business day"

# Per-instance daily acknowledgement cap
MAX_DAILY_ACKNOWLEDGEMENTS="200"

# --- Gmail SMTP (primary) ---
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
SMTP_USER="Anvardglobal@gmail.com"
SMTP_PASS="your_16_character_google_app_password"

# --- Optional Resend fallback (only used when SMTP is not configured) ---
RESEND_API_KEY=""
```

### Gmail App Password setup

1. Sign in to the Google Account used for `SMTP_USER`.
2. Go to **Google Account → Security** and enable **2-Step Verification**.
3. Open **Security → App passwords**, create one named `Anvard Website Enquiry`, and copy the 16-character password.
4. Paste it into `SMTP_PASS` (spaces are fine; they are stripped by the app).
5. Restart `npm run dev` and submit a test enquiry.

> [!IMPORTANT]
> Gmail will rewrite or reject a `From` address it does not own. Keep `EMAIL_FROM` set to the authenticated Gmail address (`Anvardglobal@gmail.com`) unless you have explicitly verified an alias under Gmail's **Send mail as** settings.

> [!TIP]
> **Safe Development Staging Mode:** If SMTP credentials are not configured, the enquiry API validates the submission and logs it to the server console with an Asia/Kolkata timestamp. No email leaves the server. In **production**, missing credentials produce a `503` configuration error instead of a silent success, so enquiries are never silently discarded.

---

## 6. Local Development & Production Commands

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Run unit and SMTP integration tests
npm test

# 4. Lint and type-check
npm run lint
npx tsc --noEmit

# 5. Test production build
npm run build

# 6. Run production server locally
npm run start
```

> [!NOTE]
> `npm test` covers validation, reference IDs, both email templates, development staging, the production fail-fast path, and a local fake-SMTP integration test that verifies recipients, `Reply-To`, and auto-reply headers. It never sends real email.

---

## 7. Vercel Deployment Instructions

1. Push this repository to GitHub or GitLab.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the repository `clientproject1`.
4. Under **Environment Variables** (add to **Production** and **Preview**), add:
   * `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`
   * `EMAIL_TO` = `Anvardglobal@gmail.com`
   * `EMAIL_FROM` = `ANVARD GLOBAL Website <Anvardglobal@gmail.com>`
   * `ENQUIRY_RESPONSE_SLA` = `one business day`
   * `MAX_DAILY_ACKNOWLEDGEMENTS` = `200`
   * `SMTP_HOST` = `smtp.gmail.com`
   * `SMTP_PORT` = `465`
   * `SMTP_USER` = `Anvardglobal@gmail.com`
   * `SMTP_PASS` = your 16-character Google App Password.
5. Click **"Deploy"**. The site will automatically build and deploy globally via Vercel Edge Network.
6. After deployment, submit a live test enquiry from an external email address and confirm:
   * the team inbox receives the notification;
   * the notification's **Reply-To** points to the enquirer;
   * the enquirer receives the acknowledgement with the same reference ID.

> [!NOTE]
> Environment-variable changes only apply to new deployments. Redeploy after updating secrets. Verify that your hosting platform permits outbound SMTP on port 465 or 587; if it does not, use the optional Resend fallback with a verified domain.

---

## 8. Summary of Items for Corporate Client Review

Before official public launch, the corporate leadership of Anvard Global should review:
1. **CIN Confirmation:** Confirm CIN `U56290DL2026PTC469327` against the final MCA incorporation certificate.
2. **Email Provider Setup:** Generate a Google App Password for `Anvardglobal@gmail.com`, add the SMTP variables to Vercel, and confirm the acknowledgement copy and response SLA (`ENQUIRY_RESPONSE_SLA`).
3. **Mission & Vision Statements:** Confirm or customize the proposed strategic mission and vision copy located in `src/app/about/page.tsx`.
4. **Service Scope:** Tailor any specific consulting offerings in `src/config/services.ts` as the firm introduces specialized practices.
