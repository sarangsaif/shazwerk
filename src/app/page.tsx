import React from "react";
import MimosaHero from "@/components/agency/MimosaHero";
import MimosaWork from "@/components/agency/MimosaWork";
import MimosaServices from "@/components/agency/MimosaServices";
import MimosaHowWeWork from "@/components/agency/MimosaHowWeWork";
import MimosaEthos from "@/components/agency/MimosaEthos";
import MimosaContact from "@/components/agency/MimosaContact";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-white text-neutral-900 min-h-screen">
      <MimosaHero />
      <MimosaWork />
      <MimosaServices />
      <MimosaHowWeWork />
      <MimosaEthos />
      <MimosaContact />
    </div>
  );
}
