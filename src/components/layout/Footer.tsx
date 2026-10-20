"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/config/company";
import { FOOTER_LINKS } from "@/config/navigation";
import { MapPin, Phone, Mail, FileText, ArrowRight } from "lucide-react";
import { useEnquiry } from "@/context/EnquiryContext";

export function Footer() {
  const [currentYear, setCurrentYear] = React.useState<number>(2026);
  const { openEnquiry } = useEnquiry();

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-navy-950 text-ivory border-t border-navy-800">
      {/* Top Value Banner */}
      <div className="border-b border-navy-800/80 bg-navy-900/60 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="font-semibold uppercase tracking-widest text-gold-400">
              Core Principles
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-text-muted">
              {COMPANY.values.map((v, idx) => (
                <div key={v.title} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-gold-500" />
                  <span className="text-ivory font-medium tracking-wide">{v.title}</span>
                  {idx < COMPANY.values.length - 1 && (
                    <span className="text-navy-700 hidden sm:inline">&bull;</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & Registration (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative h-14 w-56">
              <Image
                src="/brand/logo-dark-bg.png"
                alt="Anvard Global Private Limited"
                fill
                className="object-contain object-left"
              />
            </div>
            
            <p className="text-sm text-text-muted leading-relaxed max-w-sm">
              ANVARD GLOBAL PRIVATE LIMITED is an Indian business consultancy and advisory firm dedicated to assisting organizations through structured planning, operational clarity, and sustainable growth strategies.
            </p>

            <div className="space-y-2 pt-2 text-xs border-t border-navy-900">
              <div className="flex items-center gap-2 text-text-muted">
                <FileText className="h-3.5 w-3.5 text-gold-500 shrink-0" />
                <span>
                  <strong className="text-ivory font-semibold">CIN:</strong> {COMPANY.cin}
                </span>
              </div>
              <div className="text-[11px] text-text-secondary">
                Registered under the Companies Act, Ministry of Corporate Affairs, Government of India.
              </div>
              <div className="text-text-muted">
                <strong className="text-ivory font-semibold">Director:</strong> {COMPANY.director}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-gold-300 transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Focus Areas (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Advisory Areas
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-gold-300 transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Registered Office & Contacts (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Registered Office
            </h4>
            <div className="space-y-3 text-sm text-text-muted">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold-500 shrink-0 mt-1" />
                <address className="not-italic text-xs leading-relaxed text-text-muted">
                  {COMPANY.address.line1},<br />
                  {COMPANY.address.line2},<br />
                  {COMPANY.address.locality}, {COMPANY.address.city} – {COMPANY.address.postalCode},<br />
                  {COMPANY.address.country}
                </address>
              </div>

              <div className="pt-1">
                <a
                  href={COMPANY.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 underline underline-offset-4"
                >
                  <span>View on Google Maps</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>

              <div className="pt-2 space-y-2 border-t border-navy-900 text-xs">
                <div className="flex items-center gap-2.5">
                  <Phone className="h-3.5 w-3.5 text-gold-500 shrink-0" />
                  <a
                    href={`tel:${COMPANY.phoneTel}`}
                    className="text-ivory hover:text-gold-300 transition-colors"
                  >
                    {COMPANY.phoneDisplay}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="h-3.5 w-3.5 text-gold-500 shrink-0" />
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-ivory hover:text-gold-300 transition-colors"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => openEnquiry("General Enquiry")}
                  className="w-full rounded border border-gold-500/40 bg-navy-900 px-3.5 py-2 text-center text-xs font-semibold text-gold-400 hover:bg-gold-500 hover:text-navy-950 transition-all duration-200"
                >
                  Direct Business Enquiry
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Strip */}
        <div className="mt-16 pt-8 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
          <p>
            &copy; {currentYear} {COMPANY.legalName}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-gold-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-navy-800">&bull;</span>
            <Link
              href="/terms"
              className="hover:text-gold-400 transition-colors"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
