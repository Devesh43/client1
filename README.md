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
* **Email Service:** Dual integration supporting **Resend API** and **Nodemailer SMTP**, plus development staging mode
* **Anti-Spam Protections:**
  * In-memory IP rate limiter (maximum 5 requests per 10 minutes)
  * Hidden honeypot field (`website`) trapping automated web scrapers
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

# Sender identity (must match your verified sending domain or SMTP user)
EMAIL_FROM="Anvard Global Website <notifications@anvardglobal.com>"

# --- Option A: Resend (Recommended) ---
RESEND_API_KEY="re_123456789"

# --- Option B: Corporate SMTP (Google Workspace / Zoho / Microsoft 365) ---
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="notifications@anvardglobal.com"
SMTP_PASS="app_specific_password_here"
```

> [!TIP]
> **Zero-Downtime Safe Staging Mode:** If neither Resend nor SMTP credentials are configured, the enquiry API automatically switches to **Development Staging Mode**. Submissions are validated, given a unique reference ID, and logged in full to the secure server console with Asia/Kolkata timestamps without throwing errors to visitors.

---

## 6. Local Development & Production Commands

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Test production build
npm run build

# 4. Run production server locally
npm run start
```

---

## 7. Vercel Deployment Instructions

1. Push this repository to GitHub or GitLab.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the repository `clientproject1`.
4. Under **Environment Variables**, add:
   * `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`
   * `EMAIL_TO` = `Anvardglobal@gmail.com`
   * `EMAIL_FROM` = `Anvard Global Website <notifications@yourdomain.com>`
   * `RESEND_API_KEY` = your Resend API key (or SMTP credentials).
5. Click **"Deploy"**. The site will automatically build and deploy globally via Vercel Edge Network.

---

## 8. Summary of Items for Corporate Client Review

Before official public launch, the corporate leadership of Anvard Global should review:
1. **CIN Confirmation:** Confirm CIN `U56290DL2026PTC469327` against the final MCA incorporation certificate.
2. **Email Provider Setup:** Choose between Resend (recommended) or Corporate SMTP, and add the credentials to Vercel environment variables.
3. **Mission & Vision Statements:** Confirm or customize the proposed strategic mission and vision copy located in `src/app/about/page.tsx`.
4. **Service Scope:** Tailor any specific consulting offerings in `src/config/services.ts` as the firm introduces specialized practices.
