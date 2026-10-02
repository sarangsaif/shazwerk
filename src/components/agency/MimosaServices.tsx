"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceItem {
  id: string;
  number: string;
  titleDe: string;
  titleEn: string;
  subtitleDe: string;
  subtitleEn: string;
  descDe: string;
  descEn: string;
  deliverablesDe: string[];
  deliverablesEn: string[];
  technologies: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: "digital-products",
    number: "01",
    titleDe: "Webplattformen & SaaS-Systeme",
    titleEn: "Web Platforms & SaaS Systems",
    subtitleDe: "Vollwertige Full-Stack Produkte",
    subtitleEn: "Production-grade digital systems",
    descDe: "Massgeschneiderte Next.js-Plattformen, reaktive Portale und transaktionsstarke SaaS-Architekturen.",
    descEn: "Custom Next.js platforms, reactive web portals, and transactional SaaS architectures built for high concurrency.",
    deliverablesDe: [
      "Next.js 14 & React Full-Stack Entwicklung",
      "Echtzeit-Dashboards & Kundenportale",
      "Skalierbare PostgreSQL- & API-Architektur",
      "100% Quellcode-Übergabe & CI/CD",
    ],
    deliverablesEn: [
      "Next.js 14 & React full-stack engineering",
      "Real-time customer portals & telemetry dashboards",
      "Scalable PostgreSQL & API infrastructure",
      "100% source code handover & CI/CD",
    ],
    technologies: ["Next.js 14", "TypeScript", "React 18", "PostgreSQL", "Node.js", "Tailwind CSS"],
  },
  {
    id: "enterprise-ai",
    number: "02",
    titleDe: "Enterprise AI & Private LLMs",
    titleEn: "Enterprise AI & Private LLMs",
    subtitleDe: "Zero-Telemetry & Schweizer Datenschutz",
    subtitleEn: "Zero-telemetry & Swiss data sovereignty",
    descDe: "Air-gapped Sprachmodelle und RAG-Pipelines in Schweizer Rechenzentren ohne US Cloud Act Risiko.",
    descEn: "Air-gapped language models and RAG pipelines hosted in Swiss data centers with zero external data leakage.",
    deliverablesDe: [
      "Lokale Vektordatenbanken (pgvector / Qdrant)",
      "Air-gapped RAG-Pipelines für Unternehmensdaten",
      "Multi-Agenten Automatisierung & Copilots",
      "Vollständige nDSG-Konformität (kein Datenabfluss)",
    ],
    deliverablesEn: [
      "Local vector search (pgvector / Qdrant)",
      "Air-gapped RAG pipelines for private data",
      "Multi-agent automation & domain copilots",
      "Full Swiss FADP / nDSG compliance",
    ],
    technologies: ["Llama 3", "Mistral", "pgvector", "LangChain", "Python", "Docker"],
  },
  {
    id: "cloud-reliability",
    number: "03",
    titleDe: "Schweizer Cloud & High-Load",
    titleEn: "Swiss Cloud & High-Load Architecture",
    subtitleDe: "Ausfallsicherheit & Bankenstandard",
    subtitleEn: "Resilience & banking-grade security",
    descDe: "Infrastruktur für maximale Lastspitzen mit Schweizer Datenhaltung und automatisierter Ausfallsicherung.",
    descEn: "Infrastructure engineered for peak load with Swiss data residency and automated high-availability failover.",
    deliverablesDe: [
      "Zero-Trust Cloud & Kubernetes Topologie",
      "Schweizer Datenhaltung (Zürich eu-central-2 / Exoscale)",
      "Automatisierte Zero-Downtime Deployments",
      "Sub-50ms Latenzen & Distributed Telemetry",
    ],
    deliverablesEn: [
      "Zero-trust cloud & Kubernetes topology",
      "Swiss data residency (Zurich eu-central-2 / Exoscale)",
      "Automated zero-downtime deployment pipelines",
      "Sub-50ms latency & distributed telemetry",
    ],
    technologies: ["AWS (Zurich)", "Exoscale", "Docker", "Terraform", "PostgreSQL", "Redis"],
  },
  {
    id: "design-systems",
    number: "04",
    titleDe: "Design Systems & UI Craft",
    titleEn: "Design Systems & Interface Craft",
    subtitleDe: "Funktionale Schweizer Typografie",
    subtitleEn: "Utilitarian Swiss typography",
    descDe: "Klarheit statt Spielerei: Schnelle Keyboard-Navigation, konsistente Token-Systeme und 60fps-Interaktionen.",
    descEn: "Clarity over gimmicks: Fast keyboard navigation, unified design token architectures, and 60fps rendering.",
    deliverablesDe: [
      "Figma UI/UX Systems & Interaktive Prototypen",
      "Design-Token-Architektur & UI-Komponenten",
      "Ergonomische Tastatur- & Mobilbedienung",
      "WCAG 2.1 Barrierefreiheit & Design-Richtlinien",
    ],
    deliverablesEn: [
      "Figma UI/UX systems & prototypes",
      "Design token architecture & libraries",
      "Fast ergonomics & responsive layouts",
      "WCAG 2.1 accessibility & documentation",
    ],
    technologies: ["Figma", "CSS Tokens", "Modern Typography", "Micro-Interactions", "WCAG 2.1"],
  },
];

export default function MimosaServices() {
  const { language } = useLanguage();
  const isDe = language === "de";

  return (
    <section id="capabilities" className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-neutral-50/70 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-6">
            <div>
              <span className="text-xs font-mono tracking-wider text-neutral-500 uppercase block mb-3">
                [ {isDe ? "03 / DISZIPLINEN" : "03 / CAPABILITIES"} ]
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950 leading-[1.08]">
                {isDe ? "Ingenieurdisziplinen." : "Disciplines & capabilities."}
              </h2>
            </div>

            <p className="text-neutral-600 text-sm leading-relaxed">
              {isDe
                ? "Keine Nachwuchskräfte, kein Outsourcing. Dedizierte Senior Pods mit technischer Tiefe und persönlicher Verantwortung."
                : "No junior staff, zero outsourcing. Dedicated senior pods focused on architectural depth and commercial reliability."}
            </p>

            <div className="pt-2">
              <Link
                href="/services"
                onClick={() => trackClientEvent("nav_click", { destination: "services_page" })}
                className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-900 hover:text-red-600 transition-colors"
              >
                <span>{isDe ? "Detaillierte Übersicht ansehen" : "Explore full service matrix"}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </Link>
            </div>
          </div>

          {/* Right Column: Service Cards */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 transition-all hover:border-neutral-400/80 shadow-xs"
              >
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-neutral-100 text-xs font-mono">
                  <span className="text-neutral-400 font-medium">DISCIPLINE {service.number}</span>
                  <span className="text-neutral-500">{isDe ? service.subtitleDe : service.subtitleEn}</span>
                </div>

                <div className="pt-4 mb-4">
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-neutral-950 mb-2">
                    {isDe ? service.titleDe : service.titleEn}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {isDe ? service.descDe : service.descEn}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-neutral-100">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-2">
                      {isDe ? "Leistungsumfang" : "Deliverables"}
                    </span>
                    <ul className="space-y-1.5">
                      {(isDe ? service.deliverablesDe : service.deliverablesEn).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-neutral-800">
                          <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-2">
                      {isDe ? "Technologien" : "Technologies"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800 text-[11px] font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
