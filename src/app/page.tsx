import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import SectorBand from "@/components/home/SectorBand";
import Manifest from "@/components/home/Manifest";
import SelectedWork from "@/components/home/SelectedWork";
import ServicesList from "@/components/home/ServicesList";
import Process from "@/components/home/Process";
import Faq from "@/components/home/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectorBand />
      <Manifest />
      <SelectedWork />
      <ServicesList />
      <Process />
      <Faq />
    </>
  );
}
