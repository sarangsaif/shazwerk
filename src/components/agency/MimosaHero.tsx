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
    <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 px-6 sm:px-10 lg:px-16 overflow-hidden bg-white">
      {/* Subtle background editorial dot pattern */}
      <div className="absolute inset-0 bg-editorial-dot opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top agency metadata pill */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-800">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            <span>SHAZWERK · Zürich & Zug</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-mono text-amber-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {isDe ? "Schweizer Software- & AI-Ingenieurbüro" : "Swiss Digital Products, Software & AI"}
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-50 border border-neutral-200 text-xs font-mono text-neutral-600">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isDe ? "100% nDSG & Schweizer Cloud" : "100% nDSG & Swiss Cloud"}</span>
          </div>
        </div>

        {/* Large Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-normal tracking-tight text-neutral-950 leading-[1.04] max-w-5xl">
          {isDe
            ? "Digital Engineering und Software-Studio in Zürich für zukunftsweisende Systeme."
            : "Digital engineering and software studio in Zürich for pioneering futures."}
        </h1>

        {/* Editorial Subtitle / Manifesto */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-t border-neutral-200 pt-8">
          <div className="md:col-span-8">
            <p className="text-xl sm:text-2xl text-neutral-700 font-normal leading-relaxed max-w-2xl">
              {isDe
                ? "Wir verbinden kompromisslose Schweizer Ingenieurspräzision mit der gestalterischen Klarheit, die anspruchsvolle Ideen in intuitive, skalierbare Software verwandelt. Wir bauen ehrlich, sprechen klar und liefern Systeme mit lückenloser Datensouveränität."
                : "We mix relentless Swiss engineering rigor with the kind of creative audacity that transforms complex ideas into intuitive, award-winning software. We build with honesty, speak with clarity, and ship systems that scale seamlessly."}
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-4">
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
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-neutral-100 text-neutral-800 font-medium text-xs hover:bg-neutral-200 transition-colors"
            >
              <span>{isDe ? "Arbeiten entdecken" : "Explore selected work"}</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Agency Capability Strip */}
        <div className="mt-16 pt-8 border-t border-neutral-200 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-mono text-neutral-600">
          <div>
            <span className="text-neutral-400 block mb-1">
              {isDe ? "01 / DISZIPLIN" : "01 / DISCIPLINE"}
            </span>
            <span className="text-neutral-900 font-medium">
              {isDe ? "Digitale Produktentwicklung" : "Digital Product Design"}
            </span>
          </div>
          <div>
            <span className="text-neutral-400 block mb-1">
              {isDe ? "02 / TECH-STACK" : "02 / CORE TECH"}
            </span>
            <span className="text-neutral-900 font-medium">Next.js, React & TS</span>
          </div>
          <div>
            <span className="text-neutral-400 block mb-1">
              {isDe ? "03 / INTELLIGENZ" : "03 / INTELLIGENCE"}
            </span>
            <span className="text-neutral-900 font-medium">
              {isDe ? "Private Enterprise AI" : "Enterprise & Private AI"}
            </span>
          </div>
          <div>
            <span className="text-neutral-400 block mb-1">
              {isDe ? "04 / COMPLIANCE" : "04 / RESIDENCY"}
            </span>
            <span className="text-neutral-900 font-medium">
              {isDe ? "100% Schweizer Recht (nDSG)" : "100% Swiss Compliance"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
