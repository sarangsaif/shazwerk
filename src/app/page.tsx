import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import SectorBand from "@/components/home/SectorBand";
import Manifest from "@/components/home/Manifest";
import SelectedWork from "@/components/home/SelectedWork";
import ServicesList from "@/components/home/ServicesList";
import Process from "@/components/home/Process";
import Faq from "@/components/home/Faq";
import { getContent } from "@/lib/cms";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const { settings, services, faq } = await getContent();
  return (
    <>
      <Hero settings={settings} />
      <SectorBand />
      <Manifest manifesto={settings.manifesto} />
      <SelectedWork />
      <ServicesList services={services} />
      <Process />
      <Faq items={faq} />
    </>
  );
}
