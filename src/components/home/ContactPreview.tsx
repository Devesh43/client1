"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { COMPANY } from "@/config/company";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export function ContactPreview() {
  return (
    <section className="bg-ivory py-20 sm:py-28 border-b border-border-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-600">
                <span className="h-px w-6 bg-gold-500/60" />
                <span>Get In Touch</span>
              </div>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-navy-950 leading-[1.18]">
                Let&apos;s Start a Conversation
              </h2>
              <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
                Whether you are evaluating a new commercial initiative, seeking to streamline operations, or planning organizational growth, our leadership team is ready to connect.
              </p>
            </div>

            {/* Structured Contact Cards */}
            <div className="space-y-4">
              {/* Telephone */}
              <div className="flex items-start gap-4 rounded-lg border border-border-light bg-white p-5 transition-all hover:border-gold-500/40">
                <div className="flex h-11 w-11 items-center justify-center rounded bg-navy-900 text-gold-400 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                    Telephone Enquiry
                  </div>
                  <a
                    href={`tel:${COMPANY.phoneTel}`}
                    className="mt-1 block text-base font-semibold text-navy-950 hover:text-gold-600 transition-colors"
                  >
                    {COMPANY.phoneDisplay}
                  </a>
                  <p className="mt-0.5 text-xs text-text-muted">
                    Direct access to advisory coordination
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 rounded-lg border border-border-light bg-white p-5 transition-all hover:border-gold-500/40">
                <div className="flex h-11 w-11 items-center justify-center rounded bg-navy-900 text-gold-400 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                    Official Email
                  </div>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="mt-1 block text-base font-semibold text-navy-950 hover:text-gold-600 transition-colors break-all"
                  >
                    {COMPANY.email}
                  </a>
                  <p className="mt-0.5 text-xs text-text-muted">
                    Formal advisory inquiries &amp; proposals
                  </p>
                </div>
              </div>

              {/* Registered Office */}
              <div className="flex items-start gap-4 rounded-lg border border-border-light bg-white p-5 transition-all hover:border-gold-500/40">
                <div className="flex h-11 w-11 items-center justify-center rounded bg-navy-900 text-gold-400 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                    Registered Office Location
                  </div>
                  <div className="mt-1 text-xs sm:text-sm font-semibold text-navy-950 leading-relaxed">
                    {COMPANY.address.locality}, {COMPANY.address.city} – {COMPANY.address.postalCode}, India
                  </div>
                  <a
                    href={COMPANY.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-xs text-gold-600 hover:text-gold-700 font-medium underline underline-offset-4"
                  >
                    <span>View Directions on Map</span>
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours & Guarantee */}
            <div className="rounded-lg bg-ivory-warm p-4 border border-border-light text-xs text-text-secondary space-y-2">
              <div className="flex items-center gap-2 font-medium text-navy-900">
                <Clock className="h-4 w-4 text-gold-600 shrink-0" />
                <span>Advisory Hours: {COMPANY.hours}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-text-muted">
                <ShieldCheck className="h-3.5 w-3.5 text-gold-600 shrink-0" />
                <span>Prompt acknowledgment within 1 business day.</span>
              </div>
            </div>

            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-900 hover:text-gold-600 transition-colors"
              >
                <span>Visit Complete Contact Page</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Embedded Functional Enquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-border-light bg-white p-7 sm:p-10 shadow-lg">
              <div className="mb-6 pb-6 border-b border-border-light">
                <div className="text-[10px] uppercase tracking-widest text-gold-600 font-bold">
                  Quick Enquiry
                </div>
                <h3 className="mt-1 font-serif text-2xl font-normal text-navy-950">
                  Send an Advisory Query
                </h3>
                <p className="mt-1 text-xs text-text-muted">
                  Fill in your requirements below for direct review by Anvard Global.
                </p>
              </div>

              <EnquiryForm defaultService="General Enquiry" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
