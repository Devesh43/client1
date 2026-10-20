import React from "react";
import type { Metadata } from "next";
import { COMPANY } from "@/config/company";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Anvard Global Pvt. Ltd.",
  description: "Privacy Policy for Anvard Global Private Limited regarding website enquiries and data processing.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1 bg-ivory py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-border-light pb-8">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-600">
            <span className="h-px w-6 bg-gold-500/60" />
            <span>Corporate Governance</span>
          </div>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-navy-950">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-text-muted">
            Last Updated: October 2026 &bull; {COMPANY.legalName}
          </p>
        </div>

        {/* Notice of editable legal text */}
        <div className="my-8 rounded-lg border border-gold-500/30 bg-ivory-warm p-4 text-xs text-text-secondary flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-gold-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-navy-950">Notice for Legal Review:</strong> This privacy document outlines current operational data practices for website inquiries. Specific enterprise retention policies, statutory disclosures under the Digital Personal Data Protection Act (DPDP), and customized compliance terms are subject to final corporate review by Anvard Global.
          </div>
        </div>

        {/* Policy Content */}
        <div className="prose prose-navy max-w-none space-y-8 text-sm sm:text-base text-text-secondary leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-navy-950">
              1. Introduction &amp; Scope
            </h2>
            <p>
              This Privacy Policy explains how <strong>{COMPANY.legalName}</strong> (&ldquo;Anvard Global&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and safeguards information submitted through our official website. We are committed to handling client communications responsibly and in accordance with applicable Indian privacy standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-navy-950">
              2. Information Collected Through the Enquiry Form
            </h2>
            <p>
              When you submit a business enquiry through our website, we collect only the necessary contact details you voluntarily provide:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              <li><strong>Full Name:</strong> To identify and address you appropriately.</li>
              <li><strong>Email Address:</strong> To send an acknowledgement with your enquiry reference and to respond to your request.</li>
              <li><strong>Telephone Number:</strong> To connect regarding your business inquiry.</li>
              <li><strong>Service Focus Area:</strong> To understand your specific consulting requirements.</li>
              <li><strong>Business Query:</strong> The details, context, and requirements you submit.</li>
              <li><strong>Technical Metadata:</strong> Basic server transmission data (such as IP address and timestamp) collected solely for anti-spam and network rate-limiting protections.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-navy-950">
              3. Purpose of Collection &amp; Email Processing
            </h2>
            <p>
              The information submitted is transmitted securely through our server-side infrastructure and delivered directly to our official corporate mailbox (<a href={`mailto:${COMPANY.email}`} className="text-navy-900 underline font-medium">{COMPANY.email}</a>). We use this information solely to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              <li>Review your commercial requirements and respond with relevant advisory information.</li>
              <li>Send an automated acknowledgement email containing a reference ID for your enquiry.</li>
              <li>Coordinate initial telephone or virtual consultations.</li>
              <li>Maintain internal business communication logs.</li>
            </ul>
            <p className="text-xs text-text-muted italic">
              We do not sell, rent, or lease your personal information to third-party marketing brokers or advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-navy-950">
              4. Data Security Measures
            </h2>
            <p>
              We implement industry-standard technical measures, including SSL/TLS encryption for all website transmissions, server-side payload validation, honeypot spam traps, and automated rate limiting to protect user inquiries against unauthorized access or tampering.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-navy-950">
              5. Data Retention Practices
            </h2>
            <p>
              Inquiry submissions are retained within our secure business correspondence archives for as long as necessary to fulfill the initial advisory dialogue or comply with reasonable corporate recordkeeping practices, unless an earlier deletion is formally requested by the enquirer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-navy-950">
              6. Contact for Privacy Inquiries
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy or wish to update or remove your submitted contact details, please reach out to:
            </p>
            <div className="rounded-lg border border-border-light bg-white p-5 text-sm space-y-1 text-navy-950">
              <div><strong>{COMPANY.legalName}</strong></div>
              <div>Director: {COMPANY.director}</div>
              <div>Registered Office: {COMPANY.address.full}</div>
              <div>Official Email: <a href={`mailto:${COMPANY.email}`} className="text-gold-700 underline">{COMPANY.email}</a></div>
              <div>Telephone: <a href={`tel:${COMPANY.phoneTel}`} className="text-gold-700 underline">{COMPANY.phoneDisplay}</a></div>
              <div>CIN: {COMPANY.cin}</div>
            </div>
          </section>

        </div>

      </div>
    </main>
  );
}
