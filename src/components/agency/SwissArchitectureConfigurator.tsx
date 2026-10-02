"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Cpu, Server, ShieldCheck, Layers, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { trackClientEvent } from "@/lib/analytics-client";

interface SystemOption {
  id: string;
  nameDe: string;
  nameEn: string;
  taglineDe: string;
  taglineEn: string;
  stack: string[];
}

const SYSTEM_OPTIONS: SystemOption[] = [
  {
    id: "web-saas",
    nameDe: "Webplattform & Enterprise SaaS",
    nameEn: "Web Platform & Enterprise SaaS",
    taglineDe: "Next.js, reaktive Oberflächen, relationale DB, API-Architektur",
    taglineEn: "Next.js, reactive UI, relational DB, robust API architecture",
    stack: ["Next.js 14", "TypeScript", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: "private-ai",
    nameDe: "Souveräne Enterprise AI & LLMs",
    nameEn: "Sovereign Enterprise AI & LLMs",
    taglineDe: "Air-gapped RAG, lokale Vektoren, 100% nDSG-Konformität",
    taglineEn: "Air-gapped RAG, local vectors, 100% nDSG compliance",
    stack: ["Private LLMs", "pgvector", "LangChain", "Swiss Cloud"],
  },
  {
    id: "telemetry-fintech",
    nameDe: "High-Frequency & FinTech",
    nameEn: "High-Frequency & FinTech",
    taglineDe: "Sub-50ms Latenz, WebSockets, FINMA-Auditsicherheit",
    taglineEn: "Sub-50ms latency, WebSockets, FINMA audit readiness",
    stack: ["WebAssembly", "WebSockets", "TimescaleDB", "Zero-Trust"],
  },
  {
    id: "security-audit",
    nameDe: "Architektur- & Security-Audit",
    nameEn: "Architecture & Security Audit",
    taglineDe: "Code-Inspection, Latenz-Profiling, Hardening & Refactoring",
    taglineEn: "Code inspection, latency profiling, hardening & roadmap",
    stack: ["Code Audit", "Performance", "Hardening", "FADP/nDSG"],
  },
];

const DATA_TIERS = [
  {
    id: "swiss-cloud",
    labelDe: "Schweizer Sovereign Cloud (Zürich eu-central-2)",
    labelEn: "Swiss Sovereign Cloud (Zurich eu-central-2)",
  },
  {
    id: "air-gapped",
    labelDe: "Air-Gapped Private VPC / On-Premise",
    labelEn: "Air-Gapped Private VPC / On-Premise",
  },
  {
    id: "global-edge",
    labelDe: "Global High-Availability Edge",
    labelEn: "Global High-Availability Edge",
  },
];

const CADENCES = [
  {
    id: "rapid-mvp",
    titleDe: "Rapid Sprint (4–6 Wochen)",
    titleEn: "Rapid Sprint (4–6 Weeks)",
    badgeDe: "Schneller Markteintritt",
    badgeEn: "Fast Market Entry",
  },
  {
    id: "full-platform",
    titleDe: "Full Platform (8–12 Wochen)",
    titleEn: "Full Platform (8–12 Weeks)",
    badgeDe: "Skalierbares Gesamtsystem",
    badgeEn: "Scalable Core System",
  },
  {
    id: "retained-pod",
    titleDe: "Dediziertes Senior Pod Mandat",
    titleEn: "Dedicated Senior Pod Retainer",
    badgeDe: "Laufende Weiterentwicklung",
    badgeEn: "Continuous Engineering",
  },
];

export default function SwissArchitectureConfigurator() {
  const { language } = useLanguage();
  const isDe = language === "de";

  const [selectedSystem, setSelectedSystem] = useState<string>("web-saas");
  const [selectedTier, setSelectedTier] = useState<string>("swiss-cloud");
  const [selectedCadence, setSelectedCadence] = useState<string>("full-platform");

  const currentSystem = SYSTEM_OPTIONS.find((s) => s.id === selectedSystem) || SYSTEM_OPTIONS[0];
  const currentTier = DATA_TIERS.find((t) => t.id === selectedTier) || DATA_TIERS[0];
  const currentCadence = CADENCES.find((c) => c.id === selectedCadence) || CADENCES[1];

  const handleApplyToBrief = () => {
    trackClientEvent("architecture_config_apply", {
      system: selectedSystem,
      tier: selectedTier,
      cadence: selectedCadence,
    });

    const contactEl = document.getElementById("contact-section");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        const textarea = document.querySelector("#contact-section textarea") as HTMLTextAreaElement | null;
        if (textarea) {
          const configSummary = isDe
            ? `[Architektur-Spezifikation]:\n• System: ${currentSystem.nameDe}\n• Modell: ${currentCadence.titleDe}\n• Infrastruktur: ${currentTier.labelDe}\n• Stack: ${currentSystem.stack.join(", ")}\n\nProjekt-Details:`
            : `[Architecture Specification]:\n• System: ${currentSystem.nameEn}\n• Model: ${currentCadence.titleEn}\n• Infrastructure: ${currentTier.labelEn}\n• Stack: ${currentSystem.stack.join(", ")}\n\nProject Details:`;
          textarea.value = configSummary;
          textarea.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }, 500);
    }
  };

  return (
    <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Punchy, No Fluff */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-neutral-200 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono tracking-wider text-neutral-500 uppercase block mb-3">
              [ {isDe ? "02 / ARCHITEKTUR-KONFIGURATOR" : "02 / ARCHITECTURE CONFIGURATOR"} ]
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950 leading-[1.08]">
              {isDe ? "Konfigurieren Sie Ihr System." : "Configure your system architecture."}
            </h2>
          </div>
          <p className="text-sm font-mono text-neutral-500 max-w-sm">
            {isDe
              ? "Wählen Sie Komponenten, Sicherheitsstufe und Bereitstellungsmodell. Übergabe direkt ins Briefing."
              : "Select system components, data sovereignty tier, and cadence. Exported directly into your brief."}
          </p>
        </div>

        {/* 3 Step Interactive Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10">
          
          {/* Step 1: System Type */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200 text-xs font-mono text-neutral-500">
              <span>{isDe ? "01 / SYSTEM-TYP" : "01 / SYSTEM TYPE"}</span>
            </div>
            <div className="space-y-2.5">
              {SYSTEM_OPTIONS.map((sys) => {
                const isSelected = selectedSystem === sys.id;
                return (
                  <button
                    key={sys.id}
                    type="button"
                    onClick={() => setSelectedSystem(sys.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? "bg-neutral-950 text-white border-neutral-950 shadow-sm"
                        : "bg-neutral-50 hover:bg-neutral-100 text-neutral-900 border-neutral-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-medium text-sm">
                        {isDe ? sys.nameDe : sys.nameEn}
                      </span>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                    </div>
                    <p className={`text-xs leading-relaxed ${isSelected ? "text-neutral-400" : "text-neutral-600"}`}>
                      {isDe ? sys.taglineDe : sys.taglineEn}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Infrastructure & Cadence */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Cadence */}
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200 text-xs font-mono text-neutral-500 mb-3">
                <span>{isDe ? "02 / ZEITRAHMEN & MODELL" : "02 / CADENCE & MODEL"}</span>
              </div>
              <div className="space-y-2">
                {CADENCES.map((cad) => {
                  const isSelected = selectedCadence === cad.id;
                  return (
                    <button
                      key={cad.id}
                      type="button"
                      onClick={() => setSelectedCadence(cad.id)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-neutral-950 text-white border-neutral-950 shadow-xs"
                          : "bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-neutral-200"
                      }`}
                    >
                      <div>
                        <span className="font-medium block">{isDe ? cad.titleDe : cad.titleEn}</span>
                        <span className={`text-[10px] font-mono ${isSelected ? "text-neutral-400" : "text-neutral-500"}`}>
                          {isDe ? cad.badgeDe : cad.badgeEn}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Data Tier */}
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200 text-xs font-mono text-neutral-500 mb-3">
                <span>{isDe ? "03 / DATENSOUVERÄNITÄT" : "03 / DATA CUSTODY"}</span>
              </div>
              <div className="space-y-2">
                {DATA_TIERS.map((tier) => {
                  const isSelected = selectedTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTier(tier.id)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-neutral-950 text-white border-neutral-950 shadow-xs"
                          : "bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-neutral-200"
                      }`}
                    >
                      <span className="font-medium">{isDe ? tier.labelDe : tier.labelEn}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Blueprint Summary Card */}
          <div className="lg:col-span-4">
            <div className="bg-neutral-950 text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between h-full shadow-lg">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800 text-xs font-mono text-neutral-400">
                  <span>BLUEPRINT PREVIEW</span>
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Ready
                  </span>
                </div>

                <div className="py-5 space-y-4">
                  <div>
                    <span className="text-[11px] font-mono text-neutral-500 uppercase block">Selected Core</span>
                    <span className="text-lg font-medium text-white block">
                      {isDe ? currentSystem.nameDe : currentSystem.nameEn}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-neutral-500 uppercase block mb-1.5">Technology Stack</span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentSystem.stack.map((item) => (
                        <span key={item} className="px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono border-t border-neutral-800/80">
                    <div>
                      <span className="text-neutral-500 block text-[10px]">DELIVERY</span>
                      <span className="text-neutral-200">{isDe ? currentCadence.titleDe.split(" ")[0] : currentCadence.titleEn.split(" ")[0]}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px]">IP TRANSFER</span>
                      <span className="text-neutral-200">100% Client</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={handleApplyToBrief}
                  className="w-full py-3.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-950 font-medium text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>{isDe ? "In Briefing übernehmen" : "Apply to Project Brief"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
