"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, ChevronRight } from "lucide-react";
import { useEnquiry } from "@/context/EnquiryContext";
import { COMPANY } from "@/config/company";

export function HeroSection() {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="relative overflow-hidden bg-navy-950 text-ivory py-16 sm:py-24 lg:py-32 border-b border-navy-800">
      {/* Background ambient lighting and subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-navy-700/30 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/30 bg-navy-900/80 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300">
                Business Consultancy &amp; Advisory
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-ivory leading-[1.12]">
              Building Better Businesses.{" "}
              <span className="block font-normal text-gold-400 mt-1 italic">
                Creating New Opportunities.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="max-w-2xl text-base sm:text-lg text-text-muted leading-relaxed font-light">
              Practical business solutions designed to help organizations navigate challenges, strengthen operations, and pursue sustainable growth.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2.5 rounded bg-gold-500 px-7 py-4 text-xs font-bold uppercase tracking-wider text-navy-950 transition-all duration-200 hover:bg-gold-400 hover:shadow-[0_0_25px_rgba(199,166,107,0.35)] active:scale-[0.98]"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                type="button"
                onClick={() => openEnquiry("General Enquiry")}
                className="inline-flex items-center justify-center gap-2 rounded border border-ivory/25 bg-navy-900/70 px-7 py-4 text-xs font-semibold uppercase tracking-wider text-ivory transition-all duration-200 hover:border-gold-400/80 hover:bg-navy-850 hover:text-gold-300"
              >
                <span>Get in Touch</span>
                <ChevronRight className="h-4 w-4 text-gold-400" />
              </button>
            </div>

            {/* Credibility Strip */}
            <div className="pt-6 border-t border-navy-800/80 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-gold-500" />
                <span className="text-ivory font-medium">Registered in Delhi, India</span>
              </div>
              <span className="text-navy-700 hidden sm:inline">&bull;</span>
              <div>
                CIN: <span className="text-ivory font-mono text-[11px]">{COMPANY.cin}</span>
              </div>
              <span className="text-navy-700 hidden sm:inline">&bull;</span>
              <div className="text-gold-400/90 font-medium">
                Integrity &bull; Innovation &bull; Growth &bull; Excellence
              </div>
            </div>

          </div>

          {/* Right Column: High-End Corporate Meeting Photograph (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Luxury Frame Layer */}
              <div className="relative aspect-[4/3] sm:aspect-[5/4] rounded-lg overflow-hidden border border-gold-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image
                  src="/images/hero-advisory.jpg"
                  alt="Modern corporate executive meeting and business advisory discussion at Anvard Global"
                  fill
                  priority
                  className="object-cover object-center transform transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
                
                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 rounded bg-navy-900/90 backdrop-blur-md border border-gold-500/20 px-4 py-3">
                  <div className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">
                    Advisory Focus
                  </div>
                  <div className="text-xs text-ivory mt-0.5 font-medium">
                    Structured planning for sustainable organizational progress
                  </div>
                </div>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute -top-3 -left-3 h-8 w-8 border-t-2 border-l-2 border-gold-500/60 pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 h-8 w-8 border-b-2 border-r-2 border-gold-500/60 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
