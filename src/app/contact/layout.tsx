import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt & Projektanfrage — Studio Zürich & Zug",
  description:
    "Projektanfrage oder technische Discovery mit SHAZWERK Senior Systemarchitekten. Gotthardstrasse 26, 8002 Zürich. Schnelle technische Ersteinschätzung innerhalb von 24h.",
  keywords: [
    "Software Agentur Zürich Kontakt",
    "Webentwicklung Schweiz Anfrage",
    "Digitalagentur Zürich Briefing",
    "Softwareentwickler Schweiz engagieren",
    "AI Studio Zürich Kontakt",
  ],
  alternates: {
    canonical: "https://shazwerk.ch/contact",
  },
  openGraph: {
    title: "Kontakt & Projektanfrage | SHAZWERK Zürich",
    description:
      "Direkter Kanal zu leitenden Systemarchitekten in Zürich. Vertraulich nach Schweizer Recht.",
    url: "https://shazwerk.ch/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
