import React from "react";
import AwwwardsHero from "@/components/agency/AwwwardsHero";
import AwwwardsWork from "@/components/agency/AwwwardsWork";
import AwwwardsServices from "@/components/agency/AwwwardsServices";
import AwwwardsManifesto from "@/components/agency/AwwwardsManifesto";
import AwwwardsCTA from "@/components/agency/AwwwardsCTA";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#080808] text-[#F5F5F3]">
      <AwwwardsHero />
      <AwwwardsWork />
      <AwwwardsServices />
      <AwwwardsManifesto />
      <AwwwardsCTA />
    </div>
  );
}
