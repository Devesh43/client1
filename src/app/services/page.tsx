"use client";

import React from "react";
import Link from "next/link";
import { SERVICES } from "@/config/services";
import { TrendingUp, SlidersHorizontal, Handshake, Globe2, CheckCircle2, ArrowRight } from "lucide-react";
import { useEnquiry } from "@/context/EnquiryContext";
import { CtaBanner } from "@/components/home/CtaBanner";

const iconMap = {
  TrendingUp,
  SlidersHorizontal,
  Handshake,
  Globe2,
};

export default function ServicesPage() {
  const { openEnquiry } = useEnquiry();

  return (
    <main className="flex-1">
      {/* Services Page Hero */}
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28 text-ivory border-b border-navy-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-400">
              <span className="h-px w-6 bg-gold-500/60" />
              <span>Consultancy &amp; Advisory Capabilities</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-ivory leading-[1.12]">
              Expertise That Moves{" "}
              <span className="block font-normal text-gold-400 mt-1 italic">
                Businesses Forward.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-text-muted leading-relaxed font-light">
              Structured advisory capabilities designed to help commercial organizations navigate operational complexity, clarify strategic focus, and pursue sustainable expansion.
            </p>
          </div>
        </div>
      </section>

      {/* Services Quick Anchor Navigation */}
      <section className="sticky top-[73px] z-20 bg-ivory-warm/95 backdrop-blur border-b border-border-light py-4 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold uppercase tracking-wider text-navy-900 scrollbar-none">
            <span className="text-text-muted shrink-0 mr-2 text-[11px]">Jump to focus area:</span>
            {SERVICES.map((s) => (
              <a
                key={s.id}
                href={`#${s.slug}`}
                className="shrink-0 rounded bg-white px-3.5 py-1.5 border border-border-light hover:border-gold-500 hover:text-gold-700 transition-colors"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Dedicated Service Sections */}
      <div className="divide-y divide-border-light bg-ivory">
        {SERVICES.map((service, index) => {
          const Icon = iconMap[service.iconName] || TrendingUp;
          const isEven = index % 2 === 1;

          return (
            <section
              key={service.id}
              id={service.slug}
              className={`py-20 sm:py-28 scroll-mt-24 ${
                isEven ? "bg-white" : "bg-ivory"
              }`}
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                  
                  {/* Left Column: Service Details & Deliverables (7 cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-navy-900 text-gold-400">
                        <Icon className="h-6 w-6 stroke-[1.75]" />
                      </div>
                      <span className="font-mono text-xs font-semibold text-text-muted">
                        Pillar 0{index + 1}
                      </span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl font-normal text-navy-950">
                      {service.title}
                    </h2>

                    <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                      {service.fullDescription}
                    </p>

                    {/* Key Focus Areas */}
                    <div className="pt-4 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-navy-900">
                        Core Focus Areas
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {service.focusAreas.map((focus) => (
                          <div
                            key={focus.title}
                            className="rounded-lg border border-border-light bg-ivory-warm/40 p-4 space-y-1.5"
                          >
                            <h4 className="text-xs font-bold text-navy-950 uppercase tracking-wide">
                              {focus.title}
                            </h4>
                            <p className="text-xs text-text-secondary leading-relaxed">
                              {focus.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">
                        Representative Deliverables
                      </h4>
                      <ul className="space-y-2 text-xs text-text-secondary">
                        {service.deliverables.map((deliv) => (
                          <li key={deliv} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-gold-600 shrink-0" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-6 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => openEnquiry(service.inquiryPreselect)}
                        className="inline-flex items-center gap-2 rounded bg-navy-900 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-ivory hover:bg-navy-850 hover:shadow-lg transition-all border border-gold-500/30"
                      >
                        <span>Enquire for {service.title}</span>
                        <ArrowRight className="h-4 w-4 text-gold-400" />
                      </button>

                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded border border-border-light bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-navy-900 hover:border-gold-500 transition-colors"
                      >
                        <span>Schedule Call</span>
                      </Link>
                    </div>

                  </div>

                  {/* Right Column: Advisory Scope Box (5 cols) */}
                  <div className="lg:col-span-5">
                    <div className="rounded-xl border border-border-light bg-ivory-warm/80 p-8 space-y-6 shadow-sm">
                      <div className="text-[10px] uppercase font-bold tracking-widest text-gold-600">
                        Advisory Scope &amp; Context
                      </div>
                      <h4 className="font-serif text-xl font-normal text-navy-950">
                        Tailored Engagement for {service.title}
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Every organization operates within unique regulatory, competitive, and capital frameworks. Our advisory work in {service.title.toLowerCase()} is never templated; we adapt our frameworks directly to your leadership priorities.
                      </p>

                      <div className="pt-4 border-t border-border-light space-y-3 text-xs text-text-muted">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-navy-950">Engagement Model:</span>
                          <span>Bespoke Advisory / Project-Based</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-navy-950">Primary Contact:</span>
                          <span>Strategic Advisory Team</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-navy-950">Response Time:</span>
                          <span>Within 1 Business Day</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => openEnquiry(service.inquiryPreselect)}
                          className="w-full rounded bg-gold-500 py-3 text-center text-xs font-bold uppercase tracking-wider text-navy-950 hover:bg-gold-400 transition-colors"
                        >
                          Request Consultation
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          );
        })}
      </div>

      <CtaBanner />
    </main>
  );
}
