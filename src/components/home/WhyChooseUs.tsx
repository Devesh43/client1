import React from "react";
import { Check, Eye, MessageSquareText, Layers, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const propositions = [
  {
    title: "Business-Focused Thinking",
    description: "An approach centered on understanding specific organizational needs, commercial objectives, and industry nuances.",
    icon: Eye,
  },
  {
    title: "Clear Communication",
    description: "Straightforward discussions, practical perspectives, and transparent engagement without superfluous jargon.",
    icon: MessageSquareText,
  },
  {
    title: "Tailored Approach",
    description: "Recommendations developed around the concrete objectives, operational capacity, and circumstances of each business.",
    icon: Layers,
  },
  {
    title: "Long-Term Perspective",
    description: "A steadfast focus on thoughtful decisions, organizational stability, and sustainable business progress.",
    icon: TrendingUp,
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-ivory py-20 sm:py-28 border-b border-border-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Why Anvard Global"
          title="A More Considered Approach to Consultancy"
          description="In an era of generic business playbooks, we prioritize grounded evaluation, thoughtful strategic dialogue, and realistic execution paths."
        />

        {/* 4 Value Propositions Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {propositions.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <div
                key={prop.title}
                className="relative flex flex-col justify-between rounded-lg border border-border-light bg-white p-7 transition-all duration-300 hover:border-gold-500/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-10 w-10 rounded bg-navy-950 text-gold-400 flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs text-text-muted/60 font-semibold">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-normal text-navy-950">
                    {prop.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {prop.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border-light/60 flex items-center gap-2 text-xs font-medium text-gold-700">
                  <Check className="h-3.5 w-3.5 text-gold-600" />
                  <span>Deliberate &amp; Grounded</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
