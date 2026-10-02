"use client";

import React, { useState } from "react";
import { ArrowUpRight, Calculator, Check, Sparkles, Clock, Coins, Users, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { trackClientEvent } from "@/lib/analytics-client";

interface SystemTier {
  id: string;
  nameEn: string;
  nameDe: string;
  descEn: string;
  descDe: string;
  baseChfMin: number;
  baseChfMax: number;
  baseWeeks: number;
}

const SYSTEM_TIERS: SystemTier[] = [
  {
    id: "web-saas",
    nameEn: "Custom Web Application & SaaS",
    nameDe: "Massgeschneiderte Webplattform & SaaS",
    descEn: "Full-stack Next.js, reactive interfaces, secure auth, relational database, payment gateways.",
    descDe: "Full-Stack Next.js, reaktive Benutzeroberfläche, sichere Auth, relationale DB, API-Integration.",
    baseChfMin: 28000,
    baseChfMax: 48000,
    baseWeeks: 6,
  },
  {
    id: "private-ai",
    nameEn: "Sovereign Enterprise AI & LLM",
    nameDe: "Souveräne Enterprise AI & Private LLMs",
    descEn: "Air-gapped retrieval pipelines (RAG), local vector search, zero telemetry leakage, nDSG compliance.",
    descDe: "Air-Gapped RAG-Pipelines, lokale Vektorsuche, null Datenabfluss, strikte nDSG-Konformität.",
    baseChfMin: 35000,
    baseChfMax: 65000,
    baseWeeks: 8,
  },
  {
    id: "telemetry-fintech",
    nameEn: "High-Frequency & FinTech Systems",
    nameDe: "Hochleistungs- & FinTech-Systeme",
    descEn: "Ultra-low latency execution, WebSockets, WebAssembly virtualization, FINMA audit readiness.",
    descDe: "Niedrigste Latenzen, WebSockets, WebAssembly Virtualisierung, FINMA-Auditsicherheit.",
    baseChfMin: 42000,
    baseChfMax: 78000,
    baseWeeks: 8,
  },
  {
    id: "modernization-audit",
    nameEn: "Architecture & Security Audit",
    nameDe: "Architektur- & Sicherheitsaudit",
    descEn: "Comprehensive code inspection, latency profiling, security hardening, technical debt eradication.",
    descDe: "Ganzheitliche Code-Prüfung, Latenz-Profiling, Sicherheits-Hardening, Refactoring-Fahrplan.",
    baseChfMin: 14000,
    baseChfMax: 24000,
    baseWeeks: 3,
  },
];

const CADENCES = [
  {
    id: "rapid-sprint",
    labelEn: "4-Week Rapid MVP Sprint",
    labelDe: "4-Wochen Schnell-Sprint (MVP)",
    multiplier: 0.9,
    weeksOffset: -2,
  },
  {
    id: "full-production",
    labelEn: "8–12 Week Complete Platform",
    labelDe: "8–12 Wochen Vollständiges System",
    multiplier: 1.25,
    weeksOffset: 2,
  },
  {
    id: "pod-retainer",
    labelEn: "Quarterly Retained Pod",
    labelDe: "Quartalsweises Senior-Pod Mandat",
    multiplier: 1.6,
    weeksOffset: 6,
  },
];

const DEPLOYMENT_TIERS = [
  {
    id: "swiss-cloud",
    labelEn: "Swiss Sovereign Cloud (Zurich eu-central-2)",
    labelDe: "Schweizer Sovereign Cloud (Zürich eu-central-2)",
    extraChf: 0,
  },
  {
    id: "air-gapped",
    labelEn: "Air-Gapped On-Premise / Private VPC",
    labelDe: "Air-Gapped On-Premise / Privates VPC",
    extraChf: 6000,
  },
];

export default function SwissProjectCalculator() {
  const { language } = useLanguage();
  const isDe = language === "de";

  const [selectedSystem, setSelectedSystem] = useState<string>("web-saas");
  const [selectedCadence, setSelectedCadence] = useState<string>("full-production");
  const [selectedDeployment, setSelectedDeployment] = useState<string>("swiss-cloud");

  const currentTier = SYSTEM_TIERS.find((t) => t.id === selectedSystem) || SYSTEM_TIERS[0];
  const currentCadence = CADENCES.find((c) => c.id === selectedCadence) || CADENCES[1];
  const currentDeployment = DEPLOYMENT_TIERS.find((d) => d.id === selectedDeployment) || DEPLOYMENT_TIERS[0];

  const minChf = Math.round((currentTier.baseChfMin * currentCadence.multiplier + currentDeployment.extraChf) / 1000) * 1000;
  const maxChf = Math.round((currentTier.baseChfMax * currentCadence.multiplier + currentDeployment.extraChf) / 1000) * 1000;
  const estimatedWeeks = Math.max(3, currentTier.baseWeeks + currentCadence.weeksOffset);

  // Format Swiss style with apostrophe: e.g. CHF 35'000
  const formatChf = (val: number) => `CHF ${val.toLocaleString("de-CH")}`;

  const handleApplyToBrief = () => {
    trackClientEvent("calculator_apply", {
      system: selectedSystem,
      cadence: selectedCadence,
      investment: `${formatChf(minChf)} - ${formatChf(maxChf)}`,
    });

    const contactEl = document.getElementById("contact-section");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });

      // Prepopulate brief textarea if empty
      setTimeout(() => {
        const textarea = document.querySelector("#contact-section textarea") as HTMLTextAreaElement | null;
        if (textarea && !textarea.value) {
          const configSummary = isDe
            ? `[Projekt-Konfiguration aus Kalkulator]:\n• Systemtyp: ${currentTier.nameDe}\n• Modell: ${currentCadence.labelDe}\n• Bereitstellung: ${currentDeployment.labelDe}\n• Erwarteter Zeitrahmen: ca. ${estimatedWeeks} Wochen\n• Richtbudget: ${formatChf(minChf)} – ${formatChf(maxChf)}\n\nDetails zum Projekt:`
            : `[Project Scope from Calculator]:\n• System Type: ${currentTier.nameEn}\n• Delivery Cadence: ${currentCadence.labelEn}\n• Deployment: ${currentDeployment.labelEn}\n• Estimated Timeline: ~${estimatedWeeks} Weeks\n• Indicative Investment: ${formatChf(minChf)} – ${formatChf(maxChf)}\n\nProject details:`;
          textarea.value = configSummary;
          textarea.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }, 600);
    }
  };

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Explanation */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-6">
            <div>
              <span className="text-xs font-mono tracking-wider text-neutral-500 uppercase block mb-3">
                [ {isDe ? "02 / BUDGET & SPRINT RECHNER" : "02 / SCOPE & BUDGET ESTIMATOR"} ]
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950 leading-[1.1]">
                {isDe ? "Transparente Planung vor der ersten Zeile Code." : "Predictable sprints, transparent Swiss pricing."}
              </h2>
            </div>

            <p className="text-neutral-600 text-base leading-relaxed">
              {isDe
                ? "Keine versteckten Agentur-Aufschläge oder unklare Stundensätze. Wählen Sie Ihre Systemarchitektur und erhalten Sie eine verlässliche Schätzung für Timeline und Budget in Schweizer Franken."
                : "No hidden agency markups or ambiguous hourly billings. Select your system architecture to receive an honest, milestone-based timeline and budget estimate in Swiss Francs (CHF)."}
            </p>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs font-mono space-y-2 text-neutral-700">
              <div className="font-semibold text-neutral-950 uppercase tracking-wider">
                {isDe ? "Die SHAZWERK Zusage" : "The SHAZWERK Guarantee"}
              </div>
              <div>• {isDe ? "Festpreisige Meilenstein-Sprints" : "Fixed-scope milestone sprints"}</div>
              <div>• {isDe ? "Staging-Deployment jeden Freitag" : "Staging releases every Friday"}</div>
              <div>• {isDe ? "100% Quellcode & IP-Übergabe" : "100% IP & source code transfer"}</div>
              <div>• {isDe ? "Senior-Pod ohne Untervergabe" : "Senior pods, zero outsourcing"}</div>
            </div>
          </div>

          {/* Right Column: Interactive Configurator */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Step 1: System Architecture */}
            <div className="bg-neutral-50/80 border border-neutral-200 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                  {isDe ? "Schritt 1: System-Typ" : "Step 1: System Architecture"}
                </span>
                <span className="text-xs font-mono text-neutral-400">01 / 03</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SYSTEM_TIERS.map((tier) => {
                  const isSelected = selectedSystem === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedSystem(tier.id)}
                      className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                        isSelected
                          ? "bg-white border-neutral-950 shadow-sm ring-1 ring-neutral-950"
                          : "bg-white/60 border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <div>
                        <div className="font-medium text-sm text-neutral-950 mb-1">
                          {isDe ? tier.nameDe : tier.nameEn}
                        </div>
                        <div className="text-xs text-neutral-500 leading-relaxed">
                          {isDe ? tier.descDe : tier.descEn}
                        </div>
                      </div>
                      <div className="text-xs font-mono text-neutral-900 font-semibold pt-2 border-t border-neutral-100 flex items-center justify-between">
                        <span>{isDe ? "Basisab" : "From"} {formatChf(tier.baseChfMin)}</span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-red-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Delivery Cadence & Deployment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Cadence */}
              <div className="bg-neutral-50/80 border border-neutral-200 rounded-3xl p-6">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-3">
                  {isDe ? "Schritt 2: Sprint-Umfang" : "Step 2: Delivery Cadence"}
                </span>
                <div className="space-y-2">
                  {CADENCES.map((cadence) => {
                    const isSelected = selectedCadence === cadence.id;
                    return (
                      <button
                        key={cadence.id}
                        type="button"
                        onClick={() => setSelectedCadence(cadence.id)}
                        className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-neutral-950 text-white border-neutral-950 shadow-xs"
                            : "bg-white text-neutral-800 border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        <span>{isDe ? cadence.labelDe : cadence.labelEn}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Deployment */}
              <div className="bg-neutral-50/80 border border-neutral-200 rounded-3xl p-6">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-3">
                  {isDe ? "Schritt 3: Datenstandort" : "Step 3: Data Sovereignty"}
                </span>
                <div className="space-y-2">
                  {DEPLOYMENT_TIERS.map((dep) => {
                    const isSelected = selectedDeployment === dep.id;
                    return (
                      <button
                        key={dep.id}
                        type="button"
                        onClick={() => setSelectedDeployment(dep.id)}
                        className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-neutral-950 text-white border-neutral-950 shadow-xs"
                            : "bg-white text-neutral-800 border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        <span className="pr-2">{isDe ? dep.labelDe : dep.labelEn}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Dynamic Result Summary Card */}
            <div className="bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800 gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                    {isDe ? "PROJEKT-SCHÄTZUNG & ARCHITEKTUR" : "ESTIMATED PROJECT BLUEPRINT"}
                  </span>
                  <div className="text-2xl font-semibold tracking-tight text-white">
                    {isDe ? currentTier.nameDe : currentTier.nameEn}
                  </div>
                </div>

                <div className="text-right sm:text-right">
                  <span className="text-xs font-mono text-neutral-400 block mb-0.5">
                    {isDe ? "RICHTWERT (CHF)" : "INDICATIVE INVESTMENT"}
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
                    {formatChf(minChf)} – {formatChf(maxChf)}
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-neutral-800 text-xs font-mono">
                <div>
                  <span className="text-neutral-500 block mb-1">TIMELINE</span>
                  <span className="text-white font-medium">~ {estimatedWeeks} {isDe ? "Wochen" : "Weeks"}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1">ENGINEERING POD</span>
                  <span className="text-white font-medium">2–3 Senior Architects</span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1">COMPLIANCE</span>
                  <span className="text-white font-medium">100% nDSG / Swiss FADP</span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1">IP TRANSFER</span>
                  <span className="text-white font-medium">100% Ownership</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-neutral-400 font-mono">
                  {isDe
                    ? "Inklusive technischer Spezifikation, Staging-Umgebungen & vollständigem Quellcode."
                    : "Includes technical blueprint, private staging URLs, CI/CD, and full source code."}
                </p>

                <button
                  type="button"
                  onClick={handleApplyToBrief}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-neutral-100 text-neutral-950 font-medium text-xs font-mono uppercase tracking-wider transition-colors shadow-sm shrink-0"
                >
                  <span>{isDe ? "Auswahl in Briefing übernehmen" : "Apply Selection to Brief"}</span>
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
