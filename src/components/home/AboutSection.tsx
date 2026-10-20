import React from "react";
import Link from "next/link";
import { ArrowRight, Shield, Lightbulb, TrendingUp, Award } from "lucide-react";
import { COMPANY } from "@/config/company";

const valueIcons = {
  Integrity: Shield,
  Innovation: Lightbulb,
  Growth: TrendingUp,
  Excellence: Award,
};

export function AboutSection() {
  return (
    <section className="bg-navy-950 text-ivory py-20 sm:py-28 border-b border-navy-800 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute -top-32 right-1/4 h-80 w-80 rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Top Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-400">
            <span className="h-px w-6 bg-gold-500/60" />
            <span>Corporate Ethos</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory leading-[1.18]">
            Rooted in Integrity.{" "}
            <span className="block font-normal text-gold-400 mt-1 italic">
              Focused on Progress.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-text-muted leading-relaxed font-light">
            Anvard Global Private Limited is a Delhi-based company focused on business consultancy and advisory services. We aim to support organizations through thoughtful planning, practical insights, and an approach centered on long-term business objectives.
          </p>
        </div>

        {/* 4 Stated Company Values */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPANY.values.map((val) => {
            const Icon = valueIcons[val.title as keyof typeof valueIcons] || Shield;
            return (
              <div
                key={val.title}
                className="group relative rounded-lg border border-navy-800 bg-navy-900/60 p-6 sm:p-7 backdrop-blur-sm transition-all duration-300 hover:border-gold-500/40 hover:bg-navy-900 hover:-translate-y-1"
              >
                {/* Gold Top Accent Line */}
                <div className="h-0.5 w-8 bg-gold-500/50 transition-all duration-300 group-hover:w-16 group-hover:bg-gold-400 mb-5" />

                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded bg-navy-800 text-gold-400 flex items-center justify-center shrink-0 border border-gold-500/20">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-serif text-xl font-normal text-ivory tracking-wide">
                    {val.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-navy-900">
          <div className="text-xs text-text-muted">
            <span className="text-ivory font-semibold">Corporate Identity:</span>{" "}
            {COMPANY.legalName} &bull; CIN: {COMPANY.cin}
          </div>

          <Link
            href="/about#approach"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors group"
          >
            <span>Discover Our Approach</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
