"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

export default function FinalCTA() {
  return (
    <section className="py-24 lg:py-36 bg-[#0C0E11] text-[#FAFAF8] relative overflow-hidden">
      {/* Precision Hairline Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#161A22_1px,transparent_1px),linear-gradient(to_bottom,#161A22_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1F29] border border-[#2B3442] text-[11px] font-mono uppercase tracking-[0.16em] text-[#9CA3AF] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E30613]"></span>
            <span>07 / INITIATE ENGAGEMENT</span>
          </div>

          {/* Large Minimalist Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-[#FAFAF8] leading-[1.08] mb-6">
            Have a product in mind?
            <br />
            <span className="text-[#9CA3AF]">Let’s turn it into something real.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed mb-10 max-w-xl font-normal">
            Whether you are scoping a greenfield digital product, automating operational workflows, or rebuilding a mission-critical platform — we provide senior Swiss technical leadership from day one.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/contact"
              onClick={() => trackClientEvent("cta_click", { cta_id: "final_cta_start_project" })}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FAFAF8] hover:bg-white text-[#0C0E11] text-sm font-bold tracking-wide transition-all shadow-md active:scale-[0.99]"
            >
              <span>Start a project</span>
              <ArrowUpRight className="w-4 h-4 text-[#E30613]" />
            </Link>

            <a
              href="mailto:contact@shazwerk.ch"
              onClick={() => trackClientEvent("cta_click", { cta_id: "final_cta_email" })}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent hover:bg-[#161A22] text-[#D1D5DB] border border-[#2B3442] text-sm font-mono tracking-wide transition-colors"
            >
              <span>contact@shazwerk.ch</span>
            </a>
          </div>

          {/* Direct response commitment */}
          <div className="mt-12 pt-8 border-t border-[#1F242D] flex flex-wrap items-center gap-6 font-mono text-xs text-[#6B7280]">
            <div>ESTIMATED RESPONSE: &le; 24H</div>
            <div>·</div>
            <div>LOCATION: ZURICH, SWITZERLAND</div>
            <div>·</div>
            <div className="text-[#10B981]">NDA / CONFIDENTIALITY UPON REQUEST</div>
          </div>
        </div>
      </div>
    </section>
  );
}
