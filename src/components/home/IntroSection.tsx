import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Target, BarChart2 } from "lucide-react";

export function IntroSection() {
  return (
    <section className="bg-ivory py-20 sm:py-28 border-b border-border-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Composition with Supporting Photo (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Supporting corporate photograph */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border-light shadow-lg">
                <Image
                  src="/images/about-consulting.jpg"
                  alt="Business strategy consultation at Anvard Global"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>

              {/* Overlapping Ivory Card */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 w-3/4 bg-white p-5 sm:p-6 rounded-lg border border-border-light shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-navy-900 text-gold-400 flex items-center justify-center shrink-0">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-gold-600">
                      Advisory Principle
                    </div>
                    <div className="text-xs font-semibold text-navy-950 mt-0.5">
                      Understanding Before Action
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Editorial Narrative (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-600">
              <span className="h-px w-6 bg-gold-500/60" />
              <span>About Anvard Global</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-navy-950 leading-[1.18]">
              A Thoughtful Approach to Business Growth
            </h2>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              At Anvard Global, we believe meaningful business progress begins with understanding the challenges, ambitions, and opportunities unique to every organization. Our consultancy approach focuses on practical thinking, clear direction, and solutions aligned with business objectives.
            </p>

            <p className="text-sm text-text-secondary leading-relaxed">
              Rather than offering generic formulas, we engage directly with business leaders to evaluate operational realities, clarify strategic priorities, and formulate structured approaches that foster resilient enterprise development.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded border border-border-light bg-white">
                <Target className="h-5 w-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy-950">
                    Objective-Aligned
                  </h4>
                  <p className="mt-1 text-xs text-text-muted leading-relaxed">
                    Initiatives mapped to tangible commercial priorities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded border border-border-light bg-white">
                <BarChart2 className="h-5 w-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy-950">
                    Practical Solutions
                  </h4>
                  <p className="mt-1 text-xs text-text-muted leading-relaxed">
                    Pragmatic roadmaps designed for real-world execution.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-900 hover:text-gold-600 transition-colors group"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
