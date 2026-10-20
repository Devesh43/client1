import React from "react";
import type { Metadata } from "next";
import { COMPANY } from "@/config/company";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Anvard Global Pvt. Ltd.",
  description: "Terms and conditions governing the use of Anvard Global Private Limited website and advisory inquiry system.",
};

export default function TermsPage() {
  return (
    <main className="flex-1 bg-ivory py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-border-light pb-8">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-600">
            <span className="h-px w-6 bg-gold-500/60" />
            <span>Legal Framework</span>
          </div>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-navy-950">
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-xs text-text-muted">
            Last Updated: October 2026 &bull; {COMPANY.legalName}
          </p>
        </div>

        {/* Notice of editable legal text */}
        <div className="my-8 rounded-lg border border-gold-500/30 bg-ivory-warm p-4 text-xs text-text-secondary flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-gold-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-navy-950">Legal Notice:</strong> The terms below govern informational access and preliminary inquiry communications through this website. Formal advisory engagements are subject to separate, mutually executed Master Services Agreements (MSAs) or Engagement Letters between Anvard Global Private Limited and the contracting enterprise.
          </div>
        </div>

        {/* Policy Content */}
        <div className="prose prose-navy max-w-none space-y-8 text-sm sm:text-base text-text-secondary leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-navy-950">
              1. Corporate Information &amp; Website Use
            </h2>
            <p>
              This website is owned and operated by <strong>{COMPANY.legalName}</strong> (&ldquo;Anvard Global&rdquo;), a company incorporated under the laws of India, having its Corporate Identification Number (CIN) as <strong>{COMPANY.cin}</strong>, and its registered office at {COMPANY.address.full}.
            </p>
            <p>
              By accessing, browsing, or utilizing this website, you acknowledge that you have read, understood, and agreed to be bound by these Terms &amp; Conditions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-navy-950">
              2. Nature of Advisory Content (Disclaimer)
            </h2>
            <p>
              All materials, service descriptions, frameworks, and insights presented on this website are provided solely for general informational and illustrative purposes.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              <li>Information presented on this website does not constitute formal legal, taxation, statutory audit, investment, or securities advisory services.</li>
              <li>No advisor-client relationship is created solely by visiting this website or by submitting an enquiry form. An advisor-client relationship arises solely upon the formal execution of a written engagement contract.</li>
              <li>While we strive to maintain accurate information, Anvard Global makes no express or implied representations regarding the immediate completeness or applicability of general website copy to your specific company circumstances without independent bilateral evaluation.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-navy-950">
              3. Intellectual Property Rights
            </h2>
            <p>
              The Anvard Global corporate logo, the stylized &ldquo;A&rdquo; emblem, layout design, branding elements, typography combinations, and website editorial copy are the intellectual property of <strong>{COMPANY.legalName}</strong>. Unauthorized reproduction, modification, or commercial exploitation without prior written authorization is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-navy-950">
              4. Enquiry Submissions &amp; Communications
            </h2>
            <p>
              Visitors agree to submit accurate, truthful contact information when utilizing the enquiry system. Submitting automated, fraudulent, harassing, or spam inquiries is strictly prohibited. Anvard Global reserves the right to decline or disregard any inquiry without obligation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-navy-950">
              5. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms &amp; Conditions and any disputes arising out of or related to this website shall be governed by and construed in accordance with the laws of India. The courts situated in New Delhi, India shall have exclusive jurisdiction over all matters arising hereunder.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-navy-950">
              6. Contact Information
            </h2>
            <p>
              For any legal or corporate governance inquiries regarding these terms, please contact:
            </p>
            <div className="rounded-lg border border-border-light bg-white p-5 text-sm space-y-1 text-navy-950">
              <div><strong>{COMPANY.legalName}</strong></div>
              <div>Attention: Directorate / Legal Affairs</div>
              <div>Registered Office: {COMPANY.address.full}</div>
              <div>Email: <a href={`mailto:${COMPANY.email}`} className="text-gold-700 underline">{COMPANY.email}</a></div>
              <div>CIN: {COMPANY.cin}</div>
            </div>
          </section>

        </div>

      </div>
    </main>
  );
}
