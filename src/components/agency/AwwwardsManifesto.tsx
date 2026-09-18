"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AwwwardsManifesto() {
  return (
    <section className="py-28 lg:py-40 px-4 sm:px-8 border-t border-white/5 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#7E8494] block mb-8">
          03 // STUDIO MANIFESTO
        </span>

        {/* Large Statement Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-[-0.04em] text-[#F5F5F3] leading-[1.05] max-w-5xl mb-16">
          We reject template culture, bloated frameworks, and superficial AI buzzwords.
          <span className="block text-[#7E8494] mt-4">
            We build software with Swiss architectural discipline.
          </span>
        </h2>

        {/* 3 Editorial Tenets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-white/10">
          <div>
            <div className="font-mono text-xs text-[#E30613] font-bold mb-4">01 // SENIOR SQUADS</div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Direct Senior Access</h3>
            <p className="text-sm text-[#8E94A0] leading-relaxed">
              Every project is led and engineered by senior practitioners. No junior handoffs, no bloated account management layers, and zero friction between strategy and production code.
            </p>
          </div>

          <div>
            <div className="font-mono text-xs text-[#E30613] font-bold mb-4">02 // DATA SOVEREIGNTY</div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Swiss Discretion & Security</h3>
            <p className="text-sm text-[#8E94A0] leading-relaxed">
              Rooted in Swiss regulatory standards. Complete compliance with the Swiss Federal Act on Data Protection (nDSG), client-side encryption, and strict data sovereignty.
            </p>
          </div>

          <div>
            <div className="font-mono text-xs text-[#E30613] font-bold mb-4">03 // PRODUCTION REALITY</div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Built to Endure</h3>
            <p className="text-sm text-[#8E94A0] leading-relaxed">
              We architect systems that handle real traffic, scale gracefully under load, and remain maintainable for years. Pragmatic engineering over temporary hype.
            </p>
          </div>
        </div>

        {/* Studio Philosophy Link */}
        <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs font-mono text-[#7E8494]">DISCOVER OUR ETHOS & APPROACH</span>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#F5F5F3] hover:text-[#E30613] transition-colors"
          >
            <span>Read About the Studio</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
