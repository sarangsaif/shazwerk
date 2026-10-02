"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";
import { useLanguage } from "@/context/LanguageContext";

interface Project {
  id: string;
  client: string;
  titleDe: string;
  titleEn: string;
  category: string;
  sectorDe: string;
  sectorEn: string;
  summaryDe: string;
  summaryEn: string;
  metrics: string[];
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    id: "alpine-dynamics",
    client: "Alpine Dynamics Holding",
    titleDe: "Autonome Echtzeit-Telemetrie & Flotten-Dispositions-Engine",
    titleEn: "Autonomous Logistics & Real-Time Telemetry Engine",
    category: "Digital Products",
    sectorDe: "Logistik & Transport · Schweiz",
    sectorEn: "Logistics & Transport · Switzerland",
    summaryDe: "Echtzeit-Telemetrieplattform für 1'400+ Kühltransporte im Alpenraum mit Sub-Sekunden Kartennavigation.",
    summaryEn: "Real-time telemetry and dispatching engine tracking 1,400+ refrigerated freight assets across the DACH region.",
    metrics: ["99.994% Uptime", "Sub-50ms Telemetrie", "Alpen-GIS Echtzeit"],
    tags: ["Next.js 14", "WebSockets", "PostgreSQL", "Alpine GIS"],
  },
  {
    id: "zurich-fintech",
    client: "Zurich FinTech Exchange",
    titleDe: "High-Frequency Asset Reconciliation & Handelsplattform",
    titleEn: "High-Frequency Asset Reconciliation & Execution Platform",
    category: "FinTech",
    sectorDe: "Finanzmärkte & Wealthtech · Zürich",
    sectorEn: "Financial Markets & Wealthtech · Zurich",
    summaryDe: "Ultraschnelle Treasury- und Abrechnungsoberfläche für regulierte Finanzinstitute mit kryptografischem Audit-Trail.",
    summaryEn: "Ultra-low latency treasury and reconciliation interface for FINMA-regulated liquidity and wealth exchange.",
    metrics: ["Sub-15ms Settlement", "FINMA-Auditsicherheit", "Zero-Repaint UI"],
    tags: ["TypeScript", "WebAssembly", "WebSockets", "FINMA Ready"],
  },
  {
    id: "lumina-legaltech",
    client: "Lumina Intelligence",
    titleDe: "Souveräner Schweizer Vertrags-LLM & Recherche-Copilot",
    titleEn: "Swiss-Sovereign Contract LLM & Regulatory Discovery Suite",
    category: "AI & LLM",
    sectorDe: "Legaltech & Enterprise · Zug",
    sectorEn: "Legaltech & Enterprise · Zug",
    summaryDe: "Air-Gapped RAG-Architektur in Schweizer Rechenzentren für multilinguale Vertragsanalyse ohne Drittanbieter-Datenabfluss.",
    summaryEn: "Air-gapped RAG architecture deployed in Swiss tier-4 data centers for multi-lingual contract discovery without third-party LLM leakage.",
    metrics: ["100% nDSG-Konform", "0% Datenabfluss", "4 Landessprachen"],
    tags: ["Private LLMs", "Swiss Cloud", "pgvector", "Data Sovereignty"],
  },
  {
    id: "helvetia-biosystems",
    client: "Helvetia Biosystems AG",
    titleDe: "Klinische Diagnostik & High-Throughput Assay Explorer",
    titleEn: "High-Throughput Clinical Diagnostic & Assay Explorer",
    category: "Digital Products",
    sectorDe: "Biotechnologie & Life Sciences · Basel",
    sectorEn: "Biotechnology & Life Sciences · Basel",
    summaryDe: "GPU-beschleunigte Web-Workstation für klinische Labore in Basel und Genf mit 500'000+ Datenpunkten bei 60 FPS.",
    summaryEn: "GPU-accelerated workstation for clinical research labs in Basel and Geneva, rendering 500,000+ data points smoothly at 60 FPS.",
    metrics: ["60 FPS Rendering", "18 Klinische Institute", "Swissmedic Ready"],
    tags: ["WebGL", "Clinical UI", "GPU Acceleration", "Swissmedic"],
  },
];

const CATEGORIES_DE = ["Alle", "Digital Products", "AI & LLM", "FinTech"];
const CATEGORIES_EN = ["All", "Digital Products", "AI & LLM", "FinTech"];

export default function MimosaWork() {
  const { language } = useLanguage();
  const isDe = language === "de";

  const [activeFilter, setActiveFilter] = useState("All");

  const categories = isDe ? CATEGORIES_DE : CATEGORIES_EN;

  const filteredProjects =
    activeFilter === "All" || activeFilter === "Alle"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="selected-work" className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-5">
            <div>
              <span className="text-xs font-mono tracking-wider text-neutral-500 uppercase block mb-3">
                [ {isDe ? "01 / REFERENZEN" : "01 / SELECTED WORK"} ]
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950 leading-[1.08]">
                {isDe ? "Systeme im produktiven Einsatz." : "Systems that perform."}
              </h2>
            </div>

            <p className="text-neutral-600 text-sm leading-relaxed">
              {isDe
                ? "Keine Dummy-Prototypen. Wir entwickeln Software und KI-Infrastruktur für anspruchsvolle Unternehmen in der Schweiz."
                : "No disposable prototypes. High-stakes software and AI infrastructure deployed for pioneering companies in Switzerland."}
            </p>

            <div className="pt-2">
              <Link
                href="/work"
                onClick={() => trackClientEvent("nav_click", { destination: "work_page" })}
                className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-900 hover:text-red-600 transition-colors"
              >
                <span>{isDe ? "Alle Fallstudien ansehen" : "Explore full archive"}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </Link>
            </div>
          </div>

          {/* Right Column: Cards Stream */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 pb-2">
              {categories.map((cat, idx) => {
                const isSelected = activeFilter === (idx === 0 ? "All" : cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      const filterVal = idx === 0 ? "All" : cat;
                      setActiveFilter(filterVal);
                      trackClientEvent("filter_work", { category: filterVal });
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                      isSelected
                        ? "bg-neutral-950 text-white font-medium shadow-xs"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Project Cards */}
            <div className="space-y-4">
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  className="bg-neutral-50/70 border border-neutral-200 hover:border-neutral-400 rounded-2xl p-6 transition-all shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-200/80 text-xs font-mono">
                    <span className="font-semibold text-neutral-950">{p.client}</span>
                    <span className="text-neutral-500">{isDe ? p.sectorDe : p.sectorEn}</span>
                  </div>

                  <div className="pt-4 mb-3">
                    <h3 className="text-lg sm:text-xl font-medium tracking-tight text-neutral-950 mb-1.5">
                      {isDe ? p.titleDe : p.titleEn}
                    </h3>
                    <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                      {isDe ? p.summaryDe : p.summaryEn}
                    </p>
                  </div>

                  {/* Metrics Badges */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-neutral-200/80">
                    {p.metrics.map((m) => (
                      <span key={m} className="px-2.5 py-1 rounded-md bg-white border border-neutral-200 text-neutral-800 text-[11px] font-mono font-medium">
                        ✓ {m}
                      </span>
                    ))}
                    {p.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-md bg-neutral-200/60 text-neutral-700 text-[11px] font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
