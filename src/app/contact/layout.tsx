import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Project Briefing — Zürich & Zug Studio",
  description:
    "Submit your technical brief or schedule a direct architecture discovery with SHAZWERK senior partners. Gotthardstrasse 26, 8002 Zürich. Fast 24h technical assessment.",
  keywords: [
    "Contact Swiss software studio",
    "Software agency Zurich contact",
    "Digital product brief Switzerland",
    "Hire software engineers Switzerland",
    "AI studio Zurich contact",
  ],
  alternates: {
    canonical: "https://shazwerk.ch/contact",
  },
  openGraph: {
    title: "Contact & Technical Briefing | SHAZWERK",
    description:
      "Direct channel to senior engineering partners in Zürich. Submit a project brief under mutual Swiss NDA.",
    url: "https://shazwerk.ch/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
