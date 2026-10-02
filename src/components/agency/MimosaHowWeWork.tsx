"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";
import { useLanguage } from "@/context/LanguageContext";

interface FaqItem {
  questionDe: string;
  questionEn: string;
  answerDe: string;
  answerEn: string;
  badgeDe: string;
  badgeEn: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    questionDe: "Wie läuft der Start eines neuen Projekts ab?",
    questionEn: "How does project onboarding work?",
    answerDe:
      "Wir starten mit einer 5-tägigen technischen Discovery: Wir analysieren Architektur, Datenschutzvorgaben und Zielbild und erstellen einen verbindlichen Meilensteinplan vor der ersten Codezeile.",
    answerEn:
      "We begin with a 5-day technical discovery: We analyze architecture, data compliance, and roadmap milestones before writing a single line of production code.",
    badgeDe: "5 Tage Discovery",
    badgeEn: "5-Day Discovery",
  },
  {
    questionDe: "Wie sehen typische Projektlaufzeiten aus?",
    questionEn: "What are typical project timelines?",
    answerDe:
      "Die meisten MVPs und Kernsysteme liefern wir in 4 bis 8 Wochen in zweiwöchentlichen Sprint-Zyklen. Staging-Deployments sind jeden Freitag für Ihr Team erreichbar.",
    answerEn:
      "Most MVPs and core systems ship in 4 to 8 weeks through bi-weekly sprints. Staging releases are updated every Friday for client review.",
    badgeDe: "4–8 Wochen",
    badgeEn: "4–8 Weeks",
  },
  {
    questionDe: "Wie garantieren Sie Schweizer Datensouveränität (nDSG)?",
    questionEn: "How do you guarantee Swiss data residency?",
    answerDe:
      "Alle Systeme werden in Schweizer Rechenzentren (AWS Zürich oder Exoscale) betrieben. Private LLMs laufen air-gapped ohne Datenabfluss ins Ausland.",
    answerEn:
      "All systems deploy to Swiss data centers (AWS Zurich or Exoscale). Private LLMs run air-gapped with zero telemetry leaving Switzerland.",
    badgeDe: "Schweizer Cloud",
    badgeEn: "Swiss Cloud",
  },
  {
    questionDe: "Was wird bei Projektabschluss übergeben?",
    questionEn: "What is handed over upon completion?",
    answerDe:
      "100% geistiges Eigentum (IP). Sie erhalten den vollständigen TypeScript-Quellcode, automatisierte CI/CD-Pipelines und Dokumentation. Kein Vendor Lock-In.",
    answerEn:
      "100% intellectual property transfer. You receive the full TypeScript codebase, CI/CD pipelines, and technical documentation. Zero vendor lock-in.",
    badgeDe: "100% IP-Eigentum",
    badgeEn: "100% IP Handover",
  },
  {
    questionDe: "Wie läuft die Zusammenarbeit mit den Entwicklern ab?",
    questionEn: "How do we interface with your engineers?",
    answerDe:
      "Sie haben direkten Zugang zu den leitenden Systemarchitekten über dedizierte Slack- oder Teams-Kanäle. Keine Zwischenhändler oder Kontakter.",
    answerEn:
      "Direct communication with senior system architects via dedicated Slack or Teams channels. Zero agency middlemen or account managers.",
    badgeDe: "Direkter Kontakt",
    badgeEn: "Direct Access",
  },
];

export default function MimosaHowWeWork() {
  const { language } = useLanguage();
  const isDe = language === "de";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    const next = openIndex === index ? null : index;
    setOpenIndex(next);
    trackClientEvent("faq_toggle", { questionIndex: index });
  };

  return (
    <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-5">
            <div>
              <span className="text-xs font-mono tracking-wider text-neutral-500 uppercase block mb-3">
                [ {isDe ? "04 / ABLAUF & FAQ" : "04 / PROCESS & FAQ"} ]
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950 leading-[1.08]">
                {isDe ? "Klarheit vor Code." : "Clarity before code."}
              </h2>
            </div>

            <p className="text-neutral-600 text-sm leading-relaxed">
              {isDe
                ? "Schnelle Iterationen, vollständige Transparenz und direkte Kommunikation mit den Ingenieuren Ihres Systems."
                : "Fast iterations, total code transparency, and direct communication with principal engineers."}
            </p>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs font-mono space-y-1.5 text-neutral-700">
              <div className="font-semibold text-neutral-950 uppercase">{isDe ? "Garantien" : "Guarantees"}</div>
              <div>• {isDe ? "Staging-Release jeden Freitag" : "Friday staging releases"}</div>
              <div>• {isDe ? "100% Quellcode-Übergabe" : "100% IP & source handover"}</div>
              <div>• {isDe ? "Keine Nachwuchskräfte" : "Senior pods only"}</div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`border rounded-2xl transition-all ${
                    isOpen
                      ? "bg-neutral-50 border-neutral-400/80 shadow-xs"
                      : "bg-white border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-neutral-400">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </span>
                      <span className="text-base sm:text-lg font-medium tracking-tight text-neutral-950">
                        {isDe ? item.questionDe : item.questionEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono bg-neutral-200/70 text-neutral-700">
                        {isDe ? item.badgeDe : item.badgeEn}
                      </span>
                      <div className="p-1 rounded-full bg-neutral-100 text-neutral-800">
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-neutral-600 text-sm leading-relaxed border-t border-neutral-200/60 font-normal">
                      <p>{isDe ? item.answerDe : item.answerEn}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
