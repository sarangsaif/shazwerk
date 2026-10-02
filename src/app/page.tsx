import React from "react";
import MimosaHero from "@/components/agency/MimosaHero";
import SwissPrecisionInspector from "@/components/agency/SwissPrecisionInspector";
import MimosaWork from "@/components/agency/MimosaWork";
import SwissProjectCalculator from "@/components/agency/SwissProjectCalculator";
import MimosaServices from "@/components/agency/MimosaServices";
import MimosaHowWeWork from "@/components/agency/MimosaHowWeWork";
import MimosaEthos from "@/components/agency/MimosaEthos";
import MimosaContact from "@/components/agency/MimosaContact";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-white text-neutral-900 min-h-screen">
      <MimosaHero />
      <SwissPrecisionInspector />
      <MimosaWork />
      <SwissProjectCalculator />
      <MimosaServices />
      <MimosaHowWeWork />
      <MimosaEthos />
      <MimosaContact />
    </div>
  );
}
