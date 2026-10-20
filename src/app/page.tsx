import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { IntroSection } from "@/components/home/IntroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ApproachTimeline } from "@/components/home/ApproachTimeline";
import { CtaBanner } from "@/components/home/CtaBanner";
import { ContactPreview } from "@/components/home/ContactPreview";

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <AboutSection />
      <WhyChooseUs />
      <ApproachTimeline />
      <CtaBanner />
      <ContactPreview />
    </main>
  );
}
