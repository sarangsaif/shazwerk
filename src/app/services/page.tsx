import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Dienstleistungen & Technologie-Stack — Software Studio Zürich",
  description:
    "Schweizer Softwareentwicklung, Next.js Webplattformen, souveräne Enterprise AI (nDSG) und Cloud-Infrastruktur mit Schweizer Präzision.",
  alternates: {
    canonical: "https://shazwerk.ch/services",
  },
  openGraph: {
    title: "Dienstleistungen & Technologie-Stack | SHAZWERK Zürich",
    description:
      "Schweizer Softwareentwicklung, Next.js Webplattformen und souveräne Enterprise AI mit Schweizer Präzision.",
    url: "https://shazwerk.ch/services",
  },
};

const CAPABILITIES = [
  {
    num: "01",
    title: "Webplattformen & SaaS-Systeme",
    subtitle: "Vollwertige Full-Stack Produkte von Architektur bis Produktion",
    lead: "Wir entwickeln massgeschneiderte Webplattformen, reaktive Portale und geschäftskritische SaaS-Systeme mit kompromissloser Typensicherheit und Performance.",
    deliverables: [
      "Next.js 14, React & TypeScript Full-Stack Entwicklung",
      "Multi-Tenant Cloud- & SaaS-Architekturen",
      "Echtzeit-Kundenportale & Self-Service Dashboards",
      "Skalierbare PostgreSQL- & API-Infrastruktur (REST / GraphQL)",
      "100% Quellcode-Übergabe & automatisierte CI/CD-Pipelines",
    ],
    tech: ["Next.js 14", "TypeScript", "React 18", "Tailwind CSS", "Node.js", "PostgreSQL"],
  },
  {
    num: "02",
    title: "Souveräne Enterprise AI & Private LLMs",
    subtitle: "Air-Gapped KI-Systeme ohne Datenabfluss ins Ausland",
    lead: "Wir integrieren private Sprachmodelle und domänenspezifische RAG-Pipelines direkt in Schweizer Rechenzentren unter strikter Einhaltung des Schweizer Datenschutzgesetzes (nDSG).",
    deliverables: [
      "Air-Gapped RAG-Pipelines auf Schweizer Cloud-Servern",
      "Lokale Vektordatenbanken (pgvector / Qdrant)",
      "Automatisierte Dokumentenextraktion & semantische Suche",
      "Multi-Agenten Workflows & domänenspezifische Copilots",
      "Zero Telemetry: Vollständige Datensouveränität",
    ],
    tech: ["Llama 3", "Mistral", "pgvector", "LangChain", "Python", "Docker"],
  },
  {
    num: "03",
    title: "Cloud-Infrastruktur & Schweizer Residenz",
    subtitle: "Ausfallsichere Hochleistungssysteme für Spitzenlasten",
    lead: "Infrastruktur nach Schweizer Bankenstandards: Höchste Verfügbarkeit, lückenlose Verschlüsselung und automatisierte Zero-Downtime Releases.",
    deliverables: [
      "Zero-Trust Cloud & Kubernetes Topologie",
      "Schweizer Datenhaltung (Zürich eu-central-2 / Exoscale)",
      "Automatisierte Zero-Downtime Deployment-Pipelines",
      "Verteilte Telemetrie, Logging & Monitoring",
      "Disaster Recovery & High-Availability Failover",
    ],
    tech: ["AWS (Zürich)", "Exoscale", "Docker", "Terraform", "PostgreSQL", "Redis"],
  },
  {
    num: "04",
    title: "Design Systems & Interface Craft",
    subtitle: "Funktionale Schweizer Typografie trifft auf 60fps-Interaktion",
    lead: "Inspiriert vom Schweizer internationalen Grafikstil: Klare visuelle Hierarchien, schnelle Tastaturnavigation und langlebige Design-Token-Architekturen.",
    deliverables: [
      "Ganzheitliches UI/UX-Systemdesign & interaktive Prototypen",
      "Wiederverwendbare Komponentenbibliotheken & Figma Tokens",
      "Echtzeit-Visualisierung komplexer Datenströme",
      "Ergonomische Tastatur- & Mobilbedienung",
      "Barrierefreiheit nach WCAG 2.1 AA",
    ],
    tech: ["Figma Tokens", "Tailwind CSS", "Design Tokens", "Micro-Interactions", "WCAG 2.1"],
  },
  {
    num: "05",
    title: "Architektur- & Security-Audit",
    subtitle: "Technische Risiken vor dem Go-Live eliminieren",
    lead: "Wir durchleuchten bestehende Codebasen auf Skalierbarkeit, Sicherheit und Schweizer Compliance. Sie erhalten klare Architekturpläne und Refactoring-Roadmaps.",
    deliverables: [
      "Ganzheitliche Code- & Architektur-Audits",
      "Schweizer nDSG & Sicherheits-Grenzprüfungen",
      "Latenz-Profiling & Datenbank-Optimierung",
      "Senior Engineering Advisory für CTOs & Gründer",
    ],
    tech: ["C4 Model", "Technical PRDs", "Profiling", "Cloud Audits", "nDSG"],
  },
];

const ENGAGEMENTS = [
  {
    num: "01",
    title: "Fixed-Milestone Sprint",
    lead: "Für klar definierte neue Plattformen, MVPs oder Kernfeatures.",
    details: "Verbindliche Meilensteine, transparente Roadmap, wöchentliche Staging-Deployments und 100% Quellcode-Übergabe.",
    duration: "4 – 8 Wochen",
  },
  {
    num: "02",
    title: "Dediziertes Senior Pod Mandat",
    lead: "Für kontinuierliche Plattform-Evolution und Skalierung.",
    details: "Leitende Systemarchitekten direkt in Ihre Entwicklungsprozesse eingebettet mit zweiwöchentlicher Sprint-Kadenz.",
    duration: "Laufendes Mandat",
  },
  {
    num: "03",
    title: "Architektur- & Compliance-Audit",
    lead: "Für bestehende Systeme vor Finanzierungsrunden oder Skalierung.",
    details: "Tiefgehende Prüfung von Codequalität, Schweizer nDSG-Grenzverläufen und Performance-Engpässen.",
    duration: "1 – 2 Wochen",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-16 text-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-950 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Zurück zum Studio</span>
          </Link>
        </div>

        {/* Header - Editorial & Punchy */}
        <div className="pb-12 border-b border-neutral-200">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-2">
            [ DIENSTLEISTUNGEN & KOMPETENZEN // ZÜRICH ]
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-neutral-950 leading-[1.05] max-w-4xl">
            Ingenieurdisziplinen & Stack.
          </h1>
          <p className="mt-4 text-base sm:text-xl text-neutral-600 max-w-2xl font-normal leading-relaxed">
            Wir konzipieren und bauen geschäftskritische Softwareplattformen, sichere Enterprise AI und robuste Cloud-Systeme mit Schweizer Präzision.
          </p>
        </div>

        {/* Services Stream */}
        <div className="py-12 flex flex-col gap-8">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.num}
              className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-9 transition-all hover:border-neutral-400"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 text-xs font-mono">
                <span className="text-neutral-400">DISZIPLIN {cap.num}</span>
                <span className="text-neutral-600">{cap.subtitle}</span>
              </div>

              <div className="pt-4 mb-4">
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950 mb-2">
                  {cap.title}
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  {cap.lead}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 border-t border-neutral-200">
                <div>
                  <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-2.5">
                    Leistungsumfang
                  </span>
                  <ul className="space-y-2">
                    {cap.deliverables.map((del, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-2.5">
                    Technologien & Standards
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cap.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-white border border-neutral-200 text-neutral-800 text-xs font-mono"
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

        {/* Engagement Models */}
        <div className="pt-12 pb-12 border-t border-neutral-200">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-2">
            [ ZUSAMMENARBEITS-MODELLE ]
          </span>
          <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-neutral-950 mb-8">
            Verbindlich & partnerschaftlich
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ENGAGEMENTS.map((eng) => (
              <div
                key={eng.num}
                className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-neutral-400 mb-2">{eng.num}</div>
                  <h3 className="text-lg font-medium tracking-tight text-neutral-950 mb-1.5">
                    {eng.title}
                  </h3>
                  <p className="text-xs font-medium text-neutral-800 mb-2">{eng.lead}</p>
                  <p className="text-xs text-neutral-600 leading-relaxed">{eng.details}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-neutral-200 text-xs font-mono text-neutral-900 font-semibold">
                  Typische Kadenz: {eng.duration}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-neutral-950 text-white rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight mb-1">
              Bereit, Ihr Vorhaben technisch zu definieren?
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-lg">
              Wir prüfen Ihre Spezifikationen und liefern eine technische Ersteinschätzung innerhalb von 24 Stunden.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-neutral-950 font-medium text-xs font-mono uppercase tracking-wider hover:bg-neutral-100 transition-colors shrink-0"
          >
            <span>Projekt briefen</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
