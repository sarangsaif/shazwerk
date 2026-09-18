import React from "react";
import BlueprintHero from "@/components/home/BlueprintHero";
import ProcessSection from "@/components/home/ProcessSection";
import ServicesMatrix from "@/components/home/ServicesMatrix";
import WhatWeBuild from "@/components/home/WhatWeBuild";
import SelectedWork from "@/components/home/SelectedWork";
import WhyShazwerk from "@/components/home/WhyShazwerk";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <BlueprintHero />
      <ProcessSection />
      <ServicesMatrix />
      <WhatWeBuild />
      <SelectedWork />
      <WhyShazwerk />
      <ProcessTimeline />
      <FinalCTA />
    </div>
  );
}
