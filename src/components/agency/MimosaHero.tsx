"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Sparkles, ShieldCheck } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";
import { useLanguage } from "@/context/LanguageContext";

export default function MimosaHero() {
  const { language } = useLanguage();
  const isDe = language === "de";

  const scrollToWork = () => {
    const el = document.getElementById("selected-work");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-6 sm:px-10 lg:px-16 overflow-hidden bg-white">
      {/* Background dot pattern */}
      <div className="absolute inset-0 bg-editorial-dot opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-800">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            <span>SHAZWERK · Zürich & Zug</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-50 border border-neutral-200 text-xs font-mono text-neutral-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isDe ? "100% nDSG & Schweizer Cloud" : "100% nDSG & Swiss Cloud"}</span>
          </div>
        </div>

        {/* Large Editorial Headline - Crisp & Punchy */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-normal tracking-tight text-neutral-950 leading-[1.04] max-w-5xl">
          {isDe
            ? "Software- & AI-Studio in Zürich für geschäftskritische Systeme."
            : "Digital engineering and software studio in Zürich."}
        </h1>

        {/* Subtitle / Manifesto - Lean & Scannable */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-t border-neutral-200 pt-8">
          <div className="md:col-span-8">
            <p className="text-lg sm:text-2xl text-neutral-700 font-normal leading-relaxed max-w-2xl">
              {isDe
                ? "Schweizer Ingenieurspräzision trifft auf moderne Webarchitektur. Schnelle Zyklen, Senior Pods und 100% Quellcode-Eigentum."
                : "Swiss engineering precision meets modern digital architecture. Fast cycles, senior pods, and 100% intellectual property custody."}
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3.5">
            <Link
              href="/contact"
              onClick={() => trackClientEvent("cta_click", { location: "hero_primary" })}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-neutral-950 text-white font-medium text-sm hover:bg-neutral-800 transition-colors shadow-sm"
            >
              <span>{isDe ? "Projekt starten" : "Start a project"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={scrollToWork}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-100 text-neutral-800 font-medium text-xs hover:bg-neutral-200 transition-colors"
            >
              <span>{isDe ? "Ausgewählte Arbeiten" : "Explore selected work"}</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Capability Strip */}
        <div className="mt-14 pt-6 border-t border-neutral-200 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-mono text-neutral-600">
          <div>
            <span className="text-neutral-400 block mb-1">01 / STACK</span>
            <span className="text-neutral-950 font-medium">Next.js 14, React & TS</span>
          </div>
          <div>
            <span className="text-neutral-400 block mb-1">02 / AI & LLM</span>
            <span className="text-neutral-950 font-medium">Private Air-Gapped RAG</span>
          </div>
          <div>
            <span className="text-neutral-400 block mb-1">03 / RESIDENCY</span>
            <span className="text-neutral-950 font-medium">Zürich (eu-central-2)</span>
          </div>
          <div>
            <span className="text-neutral-400 block mb-1">04 / STANDARDS</span>
            <span className="text-neutral-950 font-medium">100% nDSG & FINMA Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
}
