"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Phone } from "lucide-react";
import { useEnquiry } from "@/context/EnquiryContext";
import { COMPANY } from "@/config/company";

export function CtaBanner() {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 sm:py-32 text-ivory border-b border-navy-800">
      {/* Abstract gold curve SVG inspired by Anvard Global's logo swoosh */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <svg
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-[160%] max-w-none h-full"
        >
          <path
            d="M-200 480 C 400 320, 800 120, 1600 240"
            stroke="url(#ctaGoldGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M-100 520 C 500 360, 900 160, 1700 280"
            stroke="url(#ctaGoldGradient)"
            strokeWidth="1.5"
            strokeDasharray="8 8"
          />
          <defs>
            <linearGradient id="ctaGoldGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C7A66B" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#C7A66B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C7A66B" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Subtle Eyebrow */}
        <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-400">
          <span className="h-px w-6 bg-gold-500/60" />
          <span>Strategic Advisory Partnership</span>
          <span className="h-px w-6 bg-gold-500/60" />
        </div>

        {/* Headline */}
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-ivory leading-tight">
          Let&apos;s Build What&apos;s Next.
        </h2>

        {/* Copy */}
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-text-muted leading-relaxed font-light">
          Have a business challenge, an idea, or an opportunity worth exploring? Start a conversation with Anvard Global.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={() => openEnquiry("General Enquiry")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded bg-gold-500 px-8 py-4 text-xs font-bold uppercase tracking-wider text-navy-950 transition-all duration-200 hover:bg-gold-400 hover:shadow-[0_0_30px_rgba(199,166,107,0.4)] active:scale-[0.98]"
          >
            <span>Make an Enquiry</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded border border-ivory/20 bg-navy-900/60 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-ivory transition-all duration-200 hover:border-gold-400 hover:bg-navy-850 hover:text-gold-300"
          >
            <span>Contact Us</span>
            <ChevronRight className="h-4 w-4 text-gold-400" />
          </Link>
        </div>

        {/* Direct phone quick action */}
        <div className="pt-6 flex items-center justify-center gap-2 text-xs text-text-muted">
          <span>Prefer direct consultation?</span>
          <a
            href={`tel:${COMPANY.phoneTel}`}
            className="inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 font-semibold"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>{COMPANY.phoneDisplay}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
