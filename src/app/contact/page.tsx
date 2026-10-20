import React from "react";
import type { Metadata } from "next";
import { COMPANY } from "@/config/company";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Enquiries | Anvard Global Pvt. Ltd.",
  description:
    "Get in touch with Anvard Global Private Limited. Contact our business consultancy team in Delhi via phone +91 8010416869 or email Anvardglobal@gmail.com.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28 text-ivory border-b border-navy-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-400">
              <span className="h-px w-6 bg-gold-500/60" />
              <span>Contact &amp; Corporate Enquiries</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-ivory leading-[1.12]">
              Let&apos;s Start a{" "}
              <span className="block font-normal text-gold-400 mt-1 italic">
                Strategic Conversation.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-text-muted leading-relaxed font-light">
              Connect directly with Anvard Global&apos;s leadership team to discuss advisory requirements, operational planning, or growth initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Main Two-Column Contact Section */}
      <section className="bg-ivory py-20 sm:py-28 border-b border-border-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Business Details & Location (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-600">
                  <span className="h-px w-6 bg-gold-500/60" />
                  <span>Corporate Office Details</span>
                </div>
                <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-normal text-navy-950">
                  Direct Inquiries &amp; Coordination
                </h2>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                  We welcome direct communication from prospective clients, enterprise stakeholders, and commercial partners.
                </p>
              </div>

              {/* Direct Details Grid */}
              <div className="space-y-4">
                
                {/* Telephone */}
                <div className="rounded-lg border border-border-light bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded bg-navy-900 text-gold-400">
                      <Phone className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                      Direct Telephone
                    </span>
                  </div>
                  <a
                    href={`tel:${COMPANY.phoneTel}`}
                    className="text-lg font-semibold text-navy-950 hover:text-gold-600 transition-colors block"
                  >
                    {COMPANY.phoneDisplay}
                  </a>
                  <p className="mt-1 text-xs text-text-muted">
                    Click to initiate call directly with advisory coordination.
                  </p>
                </div>

                {/* Email */}
                <div className="rounded-lg border border-border-light bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded bg-navy-900 text-gold-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                      Official Corporate Email
                    </span>
                  </div>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-base font-semibold text-navy-950 hover:text-gold-600 transition-colors block break-all"
                  >
                    {COMPANY.email}
                  </a>
                  <p className="mt-1 text-xs text-text-muted">
                    For formal documentation, proposals, and advisory engagement scopes.
                  </p>
                </div>

                {/* Registered Office Address */}
                <div className="rounded-lg border border-border-light bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded bg-navy-900 text-gold-400">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                      Registered Office
                    </span>
                  </div>
                  <address className="not-italic text-sm text-navy-950 leading-relaxed font-medium">
                    {COMPANY.address.line1},<br />
                    {COMPANY.address.line2},<br />
                    {COMPANY.address.locality}, {COMPANY.address.city} – {COMPANY.address.postalCode},<br />
                    {COMPANY.address.country}
                  </address>
                  <div className="mt-4 pt-3 border-t border-border-light/60">
                    <a
                      href={COMPANY.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700 hover:text-gold-800 underline underline-offset-4"
                    >
                      <span>Open Directions in Google Maps</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Company Registration Card */}
              <div className="rounded-lg bg-navy-900 p-6 text-ivory space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-400">
                  <FileText className="h-4 w-4" />
                  <span>Statutory Registration</span>
                </div>
                <div className="text-xs space-y-1 text-text-muted">
                  <div>
                    <strong className="text-ivory">Entity:</strong> {COMPANY.legalName}
                  </div>
                  <div>
                    <strong className="text-ivory">CIN:</strong> {COMPANY.cin}
                  </div>
                  <div>
                    <strong className="text-ivory">Director:</strong> {COMPANY.director}
                  </div>
                  <div>
                    <strong className="text-ivory">Hours:</strong> {COMPANY.hours}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Complete Enquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-border-light bg-white p-8 sm:p-12 shadow-xl">
                <div className="mb-8 pb-6 border-b border-border-light">
                  <div className="text-[10px] uppercase tracking-widest text-gold-600 font-bold">
                    Official Advisory Form
                  </div>
                  <h3 className="mt-2 font-serif text-3xl font-normal text-navy-950">
                    Submit Business Enquiry
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    Please provide your contact information and details regarding your business inquiry. Our team will review and respond promptly.
                  </p>
                </div>

                <EnquiryForm defaultService="General Enquiry" isCompact={false} />
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
