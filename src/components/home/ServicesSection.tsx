import React from "react";
import Link from "next/link";
import { SERVICES } from "@/config/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight } from "lucide-react";

export function ServicesSection() {
  return (
    <section className="bg-ivory-warm/60 py-20 sm:py-28 border-b border-border-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="What We Do"
          title="Expertise That Moves Businesses Forward"
          description="Explore our consultancy and advisory focus areas, designed to help businesses make informed decisions and identify opportunities for improvement."
        />

        {/* 4 Services Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom Context Banner */}
        <div className="mt-12 rounded-lg border border-border-light bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="font-serif text-lg font-normal text-navy-950">
              Need tailored guidance for your organizational context?
            </h4>
            <p className="mt-1 text-xs text-text-muted">
              We structure our advisory sessions around the unique goals, scale, and operational realities of your business.
            </p>
          </div>

          <Link
            href="/services"
            className="shrink-0 inline-flex items-center gap-2 rounded bg-navy-900 px-6 py-3 text-xs font-bold uppercase tracking-wider text-ivory hover:bg-navy-850 transition-colors"
          >
            <span>View All Services</span>
            <ArrowRight className="h-3.5 w-3.5 text-gold-400" />
          </Link>
        </div>

      </div>
    </section>
  );
}
