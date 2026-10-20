import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    step: "01",
    phase: "Understand",
    description: "We begin by discussing business objectives, challenges, and priorities directly with your leadership team.",
    detail: "Comprehensive stakeholder dialogue to map organizational context and current operational boundaries.",
  },
  {
    step: "02",
    phase: "Evaluate",
    description: "We examine relevant opportunities, operational considerations, and possible strategic approaches.",
    detail: "Rigorous diagnosis of feasibility, resource requirements, and market dynamics.",
  },
  {
    step: "03",
    phase: "Recommend",
    description: "We outline practical recommendations aligned with the identified business needs and capabilities.",
    detail: "Concrete, actionable blueprints rather than abstract theoretical frameworks.",
  },
  {
    step: "04",
    phase: "Move Forward",
    description: "We discuss implementation priorities and opportunities for continued improvement and review.",
    detail: "Structuring phased rollouts, governance check-ins, and adaptive progress metrics.",
  },
];

export function ApproachTimeline() {
  return (
    <section id="approach" className="bg-ivory-warm/70 py-20 sm:py-28 border-b border-border-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Our Process"
          title="From Understanding to Action"
          description="A structured four-stage advisory engagement designed to translate business ambitions into clear, executable organizational roadmaps."
        />

        {/* Desktop Horizontal Timeline / Mobile Vertical Timeline */}
        <div className="mt-16">
          
          {/* Desktop Timeline (horizontal connector bar) */}
          <div className="hidden lg:block relative mb-6">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-gradient-to-r from-gold-500/10 via-gold-500/50 to-gold-500/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((st, idx) => (
              <div
                key={st.step}
                className="relative flex flex-col justify-between rounded-lg border border-border-light bg-white p-7 transition-all duration-300 hover:border-gold-500/50 hover:shadow-lg"
              >
                <div>
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-950 font-mono text-xs font-bold text-gold-400 border border-gold-500/30">
                      {st.step}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gold-600">
                      Phase 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-navy-950">
                    {st.phase}
                  </h3>

                  <p className="mt-3 text-sm text-text-secondary leading-relaxed font-medium">
                    {st.description}
                  </p>

                  <p className="mt-2 text-xs text-text-muted leading-relaxed">
                    {st.detail}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border-light/60 text-[11px] font-mono text-text-muted uppercase tracking-wider">
                  Step {idx + 1} of 4
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Process Note */}
        <p className="mt-10 text-center text-xs text-text-muted italic">
          * Illustrative advisory engagement methodology; tailored to each organization&apos;s operational scope and timeline.
        </p>

      </div>
    </section>
  );
}
