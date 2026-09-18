import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About SHAZWERK — Studio Philosophy & Standards",
  description:
    "SHAZWERK is a digital product and software studio focused on turning complex business needs into simple, useful technology.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#080808] text-[#F5F5F3] min-h-screen pt-32 pb-28 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="pb-12 mb-16 border-b border-white/10">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#7E8494] block mb-4">
            STUDIO // ETHOS & CONVICTIONS
          </span>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-[-0.04em] text-[#F5F5F3] leading-[0.98] mb-8">
            Turning complex business needs into simple, useful technology.
          </h1>
          <p className="text-xl text-[#A0A5B0] max-w-3xl leading-relaxed font-normal">
            SHAZWERK is a digital product and software studio focused on turning complex business needs into simple, useful technology. We bridge the gap between strategic design and technical delivery for companies across Switzerland and the DACH region.
          </p>
        </div>

        {/* Narrative & Positioning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-12 border-b border-white/10 items-start">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs text-[#E30613] font-bold block mb-3">
              01 // THE APPROACH
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight leading-snug">
              A modern technology company built on craft and accountability.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-sm text-[#8E94A0] leading-relaxed">
            <p>
              We operate as an agile, senior-led software studio. By pairing rigorous Swiss coordination and client focus with modern distributed engineering capability, we deliver enterprise-grade digital systems without the bureaucracy, inflated headcounts, or overhead of legacy consultancies.
            </p>
            <p>
              Great software isn&apos;t built by blindly following Jira tickets. We scrutinize edge cases, identify workflow bottlenecks, and clarify true commercial utility before writing architecture. Every line of code is written to be maintainable, auditable, and resilient.
            </p>
          </div>
        </div>

        {/* Swiss Context & International Delivery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-16 border-b border-white/10 items-start">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs text-[#E30613] font-bold block mb-3">
              02 // LOCAL CONTEXT & GLOBAL TALENT
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight leading-snug">
              Swiss Discretion. International Delivery.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-sm text-[#8E94A0] leading-relaxed">
            <p>
              We understand the regulatory, financial, and privacy standards required when doing business in Switzerland. From Swiss nDSG data residency to EBICS banking formats and multi-lingual DACH market demands, our work is attuned to local requirements.
            </p>
            <p>
              We combine high-touch Swiss strategy, UX architecture, and product governance with world-class engineering execution. This hybrid model allows us to deliver deeply technical platforms rapidly, with predictable sprint velocities and transparent cost efficiency.
            </p>
            <div className="pt-4 flex flex-wrap gap-2 font-mono text-xs text-[#D1D5DB]">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">FADP / nDSG Data Sovereignty</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">ISO 20022 Financial Standards</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Zurich CET Alignment</span>
            </div>
          </div>
        </div>

        {/* Closing Action */}
        <div className="mt-20 pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Work with a dedicated technology partner.</h3>
            <p className="text-xs text-[#7E8494] font-mono mt-1">We welcome exploratory technical discussions.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F5F5F3] text-[#080808] text-xs font-bold uppercase tracking-wider hover:bg-white transition-all"
          >
            <span>Start an Inquiry</span>
            <ArrowUpRight className="w-4 h-4 text-[#E30613]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
