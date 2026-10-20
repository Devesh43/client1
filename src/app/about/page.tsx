import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/config/company";
import { Shield, Lightbulb, TrendingUp, Award, Compass, ArrowRight } from "lucide-react";
import { CtaBanner } from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "About Us | Anvard Global Pvt. Ltd.",
  description:
    "Learn about Anvard Global Private Limited, a Delhi-based business consultancy and advisory firm dedicated to integrity, innovation, growth, and excellence.",
};

const valueIcons = {
  Integrity: Shield,
  Innovation: Lightbulb,
  Growth: TrendingUp,
  Excellence: Award,
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28 text-ivory border-b border-navy-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-400">
              <span className="h-px w-6 bg-gold-500/60" />
              <span>About Anvard Global</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-ivory leading-[1.12]">
              Rooted in Integrity.{" "}
              <span className="block font-normal text-gold-400 mt-1 italic">
                Focused on Progress.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-text-muted leading-relaxed font-light">
              Anvard Global Private Limited is a corporate consultancy and advisory company established in New Delhi, India. We partner with organizations to deliver practical strategic perspectives, operational clarity, and sustainable business advancement.
            </p>
          </div>
        </div>
      </section>

      {/* Company Profile & Stated Values */}
      <section className="bg-ivory py-20 sm:py-28 border-b border-border-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-600">
                <span className="h-px w-6 bg-gold-500/60" />
                <span>Organizational Profile</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-navy-950 leading-tight">
                Grounded Guidance for Real-World Business Challenges
              </h2>
              <p className="text-base text-text-secondary leading-relaxed">
                Registered in Delhi, India, Anvard Global Private Limited operates with the conviction that effective advisory work must be deeply rooted in operational reality. We work with business owners and executive leadership to diagnose organizational challenges, streamline core processes, and map viable avenues for commercial expansion.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Our approach rejects generic formulas and superficial buzzwords. Instead, we emphasize rigorous listening, transparent evaluation, and tailored advisory deliverables that leadership teams can directly translate into operational execution.
              </p>

              {/* Verified Corporate Credentials Box */}
              <div className="rounded-lg border border-border-light bg-white p-5 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-navy-900">
                  Verified Corporate Credentials
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-text-muted">
                  <div>
                    <span className="text-text-secondary font-medium">Corporate Entity:</span><br />
                    <strong className="text-navy-950">{COMPANY.legalName}</strong>
                  </div>
                  <div>
                    <span className="text-text-secondary font-medium">Corporate ID (CIN):</span><br />
                    <strong className="text-navy-950 font-mono">{COMPANY.cin}</strong>
                  </div>
                  <div>
                    <span className="text-text-secondary font-medium">Director:</span><br />
                    <strong className="text-navy-950">{COMPANY.director}</strong>
                  </div>
                  <div>
                    <span className="text-text-secondary font-medium">Registered Office:</span><br />
                    <strong className="text-navy-950">{COMPANY.address.locality}, {COMPANY.address.city}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border-light shadow-xl">
                  <Image
                    src="/images/corporate-architecture.jpg"
                    alt="Corporate headquarters architectural view"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Floating quote badge */}
                <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 max-w-xs bg-navy-900 text-ivory p-5 rounded-lg border border-gold-500/30 shadow-2xl">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-gold-400">
                    Company Creed
                  </div>
                  <p className="mt-1 text-xs italic text-ivory/90 leading-relaxed font-serif">
                    &ldquo;Integrity is not an option; it is the prerequisite of enduring value.&rdquo;
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-ivory-warm/60 py-20 sm:py-24 border-b border-border-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Mission Card */}
            <div className="rounded-xl border border-border-light bg-white p-8 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="h-1.5 w-16 bg-gold-500 mb-6" />
              <div className="flex items-center gap-3 mb-4">
                <Compass className="h-6 w-6 text-gold-600" />
                <h3 className="font-serif text-2xl font-normal text-navy-950">
                  Our Mission
                </h3>
              </div>
              <p className="text-base text-text-secondary leading-relaxed font-light">
                &ldquo;To support businesses through practical advisory perspectives, thoughtful planning, and a commitment to integrity and continuous improvement.&rdquo;
              </p>
              <div className="mt-6 pt-4 border-t border-border-light/60 text-[11px] text-text-muted">
                Proposed strategic mission statement (subject to formal company review).
              </div>
            </div>

            {/* Vision Card */}
            <div className="rounded-xl border border-border-light bg-white p-8 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="h-1.5 w-16 bg-navy-900 mb-6" />
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-6 w-6 text-navy-900" />
                <h3 className="font-serif text-2xl font-normal text-navy-950">
                  Our Vision
                </h3>
              </div>
              <p className="text-base text-text-secondary leading-relaxed font-light">
                &ldquo;To contribute to a business environment where organizations can make informed decisions, adapt confidently, and pursue meaningful growth.&rdquo;
              </p>
              <div className="mt-6 pt-4 border-t border-border-light/60 text-[11px] text-text-muted">
                Proposed strategic vision statement (subject to formal company review).
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Detailed Section */}
      <section id="values" className="bg-navy-950 text-ivory py-20 sm:py-28 border-b border-navy-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-400">
              <span className="h-px w-6 bg-gold-500/60" />
              <span>Foundational Values</span>
              <span className="h-px w-6 bg-gold-500/60" />
            </div>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory">
              The Four Pillars of Anvard Global
            </h2>
            <p className="mt-4 text-sm sm:text-base text-text-muted leading-relaxed">
              Excellence in advisory begins with uncompromising principles. These four core values guide every interaction, analysis, and recommendation we put forth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {COMPANY.values.map((val) => {
              const Icon = valueIcons[val.title as keyof typeof valueIcons] || Shield;
              return (
                <div
                  key={val.title}
                  className="rounded-lg border border-navy-800 bg-navy-900/60 p-7 backdrop-blur-sm space-y-4 hover:border-gold-500/40 transition-colors"
                >
                  <div className="h-12 w-12 rounded bg-navy-800 text-gold-400 flex items-center justify-center border border-gold-500/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-ivory">
                    {val.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consultancy Philosophy */}
      <section className="bg-ivory py-20 sm:py-28 border-b border-border-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-600">
            <span className="h-px w-6 bg-gold-500/60" />
            <span>Consultancy Philosophy</span>
            <span className="h-px w-6 bg-gold-500/60" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-navy-950">
            Thoughtful Analysis Precedes Meaningful Action
          </h2>
          <p className="text-base text-text-secondary leading-relaxed">
            We operate with the understanding that sustainable business improvements cannot be rushed or delivered via pre-packaged templates. We dedicate time to understanding the nuances of your business model, customer relationships, and operational pain points before crafting actionable, tailored recommendations.
          </p>
          <div className="pt-4 flex justify-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded bg-navy-900 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-ivory hover:bg-navy-850 transition-colors"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="h-4 w-4 text-gold-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reusable CTA */}
      <CtaBanner />
    </main>
  );
}
