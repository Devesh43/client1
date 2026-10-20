"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, SlidersHorizontal, Handshake, Globe2, ArrowRight } from "lucide-react";
import { type ServiceItem } from "@/config/services";
import { useEnquiry } from "@/context/EnquiryContext";

const iconMap = {
  TrendingUp,
  SlidersHorizontal,
  Handshake,
  Globe2,
};

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const IconComponent = iconMap[service.iconName] || TrendingUp;
  const { openEnquiry } = useEnquiry();

  return (
    <div className="group relative flex flex-col justify-between rounded-lg border border-border-light bg-white p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[0_12px_30px_rgba(17,28,48,0.06)]">
      {/* Top subtle gold corner accent */}
      <div className="absolute top-0 right-0 h-10 w-10 overflow-hidden rounded-tr-lg">
        <div className="absolute transform rotate-45 bg-gold-500/10 -top-6 -right-6 h-12 w-12 transition-colors duration-300 group-hover:bg-gold-500/25" />
      </div>

      <div>
        {/* Icon & Index */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-ivory-warm border border-border-light text-gold-600 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-gold-400 group-hover:border-navy-900">
            <IconComponent className="h-6 w-6 stroke-[1.75]" />
          </div>
          <span className="font-mono text-xs font-semibold text-text-muted/60">
            0{index + 1}
          </span>
        </div>

        {/* Heading */}
        <h3 className="font-serif text-xl sm:text-2xl font-normal text-navy-950 transition-colors group-hover:text-navy-900">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          {service.shortDescription}
        </p>

        {/* Focus areas snippet */}
        <div className="mt-5 pt-4 border-t border-border-light/60 space-y-1.5">
          {service.focusAreas.slice(0, 2).map((item) => (
            <div key={item.title} className="flex items-center gap-2 text-xs text-text-muted">
              <span className="h-1 w-1 rounded-full bg-gold-500" />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action links */}
      <div className="mt-8 pt-4 border-t border-border-light flex items-center justify-between text-xs">
        <Link
          href={`/services#${service.slug}`}
          className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-navy-900 group-hover:text-gold-600 transition-colors"
        >
          <span>Explore Details</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>

        <button
          type="button"
          onClick={() => openEnquiry(service.inquiryPreselect)}
          className="text-text-muted hover:text-navy-900 font-medium transition-colors"
        >
          Enquire &rarr;
        </button>
      </div>
    </div>
  );
}
