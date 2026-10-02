import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referenzen & Fallstudien — Software & AI Studio Zürich | SHAZWERK",
  description:
    "Ausgewählte Software- und KI-Systeme im produktiven Einsatz: Echtzeit-Telemetrie, FINMA-Handelsabwicklung und souveräne Enterprise LLMs in der Schweiz.",
  keywords: [
    "Software Referenzen Schweiz",
    "Digital Engineering Portfolio Zürich",
    "FinTech Entwicklung Schweiz",
    "Private LLM Fallstudien",
    "Next.js Case Studies Schweiz",
  ],
  alternates: {
    canonical: "https://shazwerk.ch/work",
  },
  openGraph: {
    title: "Referenzen & Fallstudien | SHAZWERK Zürich",
    description:
      "Ausgewählte geschäftskritische Software- und KI-Systeme mit Schweizer Präzision entwickelt.",
    url: "https://shazwerk.ch/work",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
