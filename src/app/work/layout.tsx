import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Work & Case Studies — Swiss Software & AI Engineering",
  description:
    "Explore mission-critical digital systems engineered by SHAZWERK: Alpine logistics telemetry, FINMA asset reconciliation, Swiss-sovereign legal LLMs, and Basel clinical biotech workstations.",
  keywords: [
    "Swiss software case studies",
    "Digital product portfolio Zurich",
    "FinTech development Switzerland",
    "Private LLM case studies",
    "High throughput telemetry",
  ],
  alternates: {
    canonical: "https://shazwerk.ch/work",
  },
  openGraph: {
    title: "Selected Work & Case Studies | SHAZWERK",
    description:
      "Mission-critical digital products, high-frequency systems, and sovereign AI built with Swiss precision.",
    url: "https://shazwerk.ch/work",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
