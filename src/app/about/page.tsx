import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Compass, Cpu, Layers, ShieldCheck, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "About SHAZWERK — Studio Philosophy & Engineering Standards",
  description:
    "SHAZWERK is a digital product and software studio focused on turning complex business needs into simple, useful technology.",
};

const PILLARS = [
  {
    num: "01",
    title: "Product Thinking Over Ticket-Filling",
    lead: "We question requirements before committing code.",
    body: "Great software isn't built by blindly following tickets. We scrutinize edge cases, identify workflow bottlenecks, and clarify true commercial utility before a single line of architecture is written.",
  },
  {
    num: "02",
    title: "Swiss Precision & Design Rigor",
    lead: "Rooted in clarity, typographic balance, and purpose.",
    body: "Taking cues from Swiss industrial design, our interfaces are engineered for maximum speed, intuitive ergonomics, and dense information layout without superfluous decoration.",
  },
  {
    num: "03",
    title: "Disciplined Engineering",
    lead: "Type safety, resilient schemas, and maintainability.",
    body: "We write clean, testable code in modern TypeScript and robust server environments. We architect for zero-downtime, sub-second latency, and long-term production stability.",
  },
  {
    num: "04",
    title: "Pragmatic Machine Intelligence",
    lead: "Targeted AI integration with complete data sovereignty.",
    body: "We incorporate AI where it meaningfully accelerates human workflows—document extraction, semantic knowledge search, automated categorization—while strictly upholding Swiss nDSG data residency.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-[#E5E5E0] pt-16 pb-20 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFEFEA] border border-[#E0E0DA] text-[11px] font-mono uppercase tracking-[0.16em] text-[#4B5563] mb-6">
              <span className="w-1.5 h-1.5 bg-[#E30613] rounded-full"></span>
              <span>ABOUT THE STUDIO</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-[#0C0E11] leading-[1.08] mb-6">
              Turning complex business needs into simple, useful technology.
            </h1>
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
              SHAZWERK is a digital product and software studio focused on turning complex business needs into simple, useful technology. We bridge the gap between strategic design and technical delivery for companies across Switzerland and the DACH region.
            </p>
          </div>
        </div>
      </section>

      {/* Core Studio Ethos */}
      <section className="py-20 bg-[#FFFFFF] border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-widest text-[#6B7280] block mb-2">
                WHO WE ARE
              </span>
              <h2 className="text-3xl font-extrabold text-[#0C0E11] tracking-tight mb-6">
                A modern technology company built on craft and accountability.
              </h2>
              <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
                We operate as an agile, senior-led software studio. By pairing rigorous Swiss coordination and client focus with modern distributed engineering capability, we deliver enterprise-grade digital systems without the bureaucracy or overhead of legacy consultancies.
              </p>
              <div className="p-4 bg-[#FAFAF8] border border-[#E0E0DA] font-mono text-xs text-[#374151]">
                <div className="text-[#E30613] font-bold mb-1">// OUR CORE CONVICTION</div>
                <div>Software should feel effortless to use, effortless to maintain, and mathematically sound in its architecture.</div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="border border-[#E0E0DA] bg-[#FAFAF8] p-6">
                <h3 className="font-sans font-bold text-lg text-[#0C0E11] mb-2">
                  Swiss Business Context
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                  We understand the regulatory, financial, and privacy standards required when doing business in Switzerland. From Swiss nDSG data residency to EBICS banking formats and multi-lingual DACH market demands, our work is attuned to local requirements.
                </p>
                <div className="flex flex-wrap gap-2 font-mono text-[11px] text-[#0C0E11]">
                  <span className="px-2 py-1 bg-white border border-[#E0E0DA]">Swiss Federal Act on Data Protection (nDSG)</span>
                  <span className="px-2 py-1 bg-white border border-[#E0E0DA]">ISO 20022 Financial Standards</span>
                  <span className="px-2 py-1 bg-white border border-[#E0E0DA]">Zurich CET Timezone Alignment</span>
                </div>
              </div>

              <div className="border border-[#E0E0DA] bg-[#FAFAF8] p-6">
                <h3 className="font-sans font-bold text-lg text-[#0C0E11] mb-2">
                  International Engineering Delivery
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  We combine high-touch Swiss strategy, UX architecture, and product governance with world-class engineering execution. This hybrid model allows us to deliver deeply technical platforms rapidly, with predictable sprint velocities and transparent cost efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="py-20 lg:py-28 bg-[#FAFAF8] border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-[#6B7280] block mb-2">
              FOUNDATIONAL PILLARS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0C0E11]">
              How we approach technology.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                className="bg-[#FFFFFF] border border-[#E0E0DA] p-8 hover:border-[#0C0E11] transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#E30613]">
                    {pillar.num}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-[#9CA3AF]">
                    Standard
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0C0E11] mb-2 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs font-semibold text-[#1F242D] mb-3">
                  {pillar.lead}
                </p>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-[#0C0E11] text-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-[#FAFAF8]">
            Work with a dedicated technology partner.
          </h2>
          <p className="text-sm text-[#9CA3AF] mb-8">
            We are always open to discuss new software platforms, AI integrations, or product redesigns.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FAFAF8] text-[#0C0E11] text-xs font-bold uppercase tracking-wider hover:bg-white transition-all"
          >
            <span>Start a project inquiry</span>
            <ArrowUpRight className="w-4 h-4 text-[#E30613]" />
          </Link>
        </div>
      </section>
    </div>
  );
}
