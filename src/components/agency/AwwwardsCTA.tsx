"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

export default function AwwwardsCTA() {
  return (
    <section className="py-32 lg:py-48 px-4 sm:px-8 border-t border-white/5 bg-[#080808] relative overflow-hidden">
      {/* Background Subtle Radial Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E30613]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#7E8494] block mb-8">
            04 // INITIATE DIALOGUE
          </span>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-[#F5F5F3] leading-[1.02] mb-10">
            Have a product in mind?
            <span className="block text-[#7E8494] mt-2">
              Let&apos;s turn it into something real.
            </span>
          </h2>

          <p className="text-lg text-[#8E94A0] max-w-xl leading-relaxed mb-12 font-normal">
            Whether you are scoping a greenfield digital product, automating mission-critical workflows, or re-architecting a legacy platform — we bring senior Swiss technical leadership from day one.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/contact"
              onClick={() => trackClientEvent("cta_click", { cta_id: "cta_start_project" })}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#F5F5F3] hover:bg-white text-[#080808] text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            >
              <span>Start a project inquiry</span>
              <ArrowUpRight className="w-4 h-4 text-[#E30613] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <a
              href="mailto:contact@shazwerk.ch"
              onClick={() => trackClientEvent("cta_click", { cta_id: "cta_email" })}
              className="inline-flex items-center gap-2 text-sm font-mono text-[#F5F5F3] hover:text-[#E30613] transition-colors"
            >
              <span>contact@shazwerk.ch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
