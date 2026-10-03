import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, Check, Shield, Cpu, Code2, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Software Agentur Zürich — Massgeschneiderte Softwareentwicklung Schweiz",
  description:
    "Führende Software Agentur in Zürich für geschäftskritische Webapplikationen, Cloud-Systeme und Enterprise AI. 100% Schweizer Datensouveränität (nDSG) und Senior Engineering.",
  keywords: [
    "Software Agentur Zürich",
    "Softwareentwicklung Zürich",
    "Softwareentwickler Zürich",
    "Software Unternehmen Zürich",
    "Schweizer Software Agentur",
    "Individuelle Softwareentwicklung Schweiz",
    "Bespoke Software Development Zurich",
  ],
  alternates: {
    canonical: "https://shazwerk.ch/software-agentur-zuerich",
  },
  openGraph: {
    title: "Software Agentur Zürich | SHAZWERK",
    description:
      "Massgeschneiderte Softwareentwicklung in Zürich mit Schweizer Präzision und Datensouveränität.",
    url: "https://shazwerk.ch/software-agentur-zuerich",
  },
};

export default function SoftwareAgenturZuerichPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Softwareentwicklung Zürich",
    provider: {
      "@type": "Organization",
      name: "SHAZWERK",
      url: "https://shazwerk.ch",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Gotthardstrasse 26",
        addressLocality: "Zürich",
        postalCode: "8002",
        addressCountry: "CH",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Zürich",
    },
    description:
      "Individuelle Softwareentwicklung, Webplattformen und Cloud-Architektur in Zürich.",
  };

  return (
    <div className="bg-white text-neutral-900 min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-950 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Zurück zur Übersicht</span>
          </Link>
        </div>

        {/* Page Hero */}
        <div className="pb-16 border-b border-neutral-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
              STANDORT ZÜRICH · GOTTHARDSTRASSE 26
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-neutral-950 leading-[1.05] max-w-4xl">
            Software Agentur Zürich: Massgeschneiderte Systeme mit Schweizer Präzision.
          </h1>
          <p className="mt-6 text-xl text-neutral-600 max-w-2xl font-normal leading-relaxed">
            Wir konzipieren und entwickeln geschäftskritische Individualsoftware, moderne Webapplikationen und souveräne Enterprise AI für Schweizer Unternehmen, Fintechs und innovative Marktführer.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-neutral-950 text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors shadow-sm"
            >
              <span>Projekt in Zürich anfragen</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-neutral-100 text-neutral-900 text-xs font-mono uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors"
            >
              <span>Referenzen ansehen</span>
            </Link>
          </div>
        </div>

        {/* Key USPs */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-neutral-200">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-neutral-950">Senior Engineering Pods</h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-mono">
              Keine Junior-Teams oder unkoordinierte Weitergaben. Sie arbeiten direkt mit erfahrenen Senior Software Engineers in Zürich.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-neutral-950">100% nDSG & Datensouveränität</h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-mono">
              Betrieb in Schweizer Rechenzentren (AWS Zürich Region eu-central-2 / Exoscale) mit strenger Einhaltung des Schweizer Datenschutzgesetzes.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-neutral-950">Vollständiges IP-Eigentum</h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-mono">
              100% des Quellcodes und geistigen Eigentums gehören ab Tag 1 Ihnen. Kein Vendor Lock-In, keine Lizenzfallen.
            </p>
          </div>
        </div>

        {/* Development Process */}
        <div className="py-16 border-b border-neutral-200 space-y-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-2">
              METHODIK & PHASEN
            </span>
            <h2 className="text-3xl font-medium tracking-tight text-neutral-950">
              Vom Architektur-Entwurf zur produktiven Software in Rekordzeit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs font-mono">
            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
              <span className="text-red-600 font-bold block text-sm">01 / ARCHITEKTUR</span>
              <h4 className="font-semibold text-neutral-950 text-sm">Design & Scope</h4>
              <p className="text-neutral-600 leading-relaxed">
                Präzise Festlegung der Datenmodelle, Sicherheitsanforderungen und Schnittstellen-Architektur.
              </p>
            </div>

            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
              <span className="text-red-600 font-bold block text-sm">02 / SPRINTS</span>
              <h4 className="font-semibold text-neutral-950 text-sm">Agile Entwicklung</h4>
              <p className="text-neutral-600 leading-relaxed">
                Zweiwöchige Entwicklungszyklen mit freitags bereitgestellten Staging-Deployments zum direkten Testen.
              </p>
            </div>

            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
              <span className="text-red-600 font-bold block text-sm">03 / AUDIT</span>
              <h4 className="font-semibold text-neutral-950 text-sm">Security & nDSG Test</h4>
              <p className="text-neutral-600 leading-relaxed">
                Automatisierte Penetrationstests, Lastprüfungen und Auditierung nach Schweizer Standards.
              </p>
            </div>

            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
              <span className="text-red-600 font-bold block text-sm">04 / DEPLOY</span>
              <h4 className="font-semibold text-neutral-950 text-sm">Produktivstart</h4>
              <p className="text-neutral-600 leading-relaxed">
                Reibungsloser Go-Live auf Schweizer Cloud-Infrastruktur mit 24/7 Monitoring und Telemetrie.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="pt-16 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-medium tracking-tight text-neutral-950 mb-2">
              Planen Sie ein neues Softwareprojekt in Zürich?
            </h3>
            <p className="text-sm font-mono text-neutral-500">
              Sprechen Sie direkt mit unseren Lead Engineers. Wir evaluieren Ihren Anwendungsfall unverbindlich innerhalb von 24 Stunden.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-neutral-950 text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors shrink-0 shadow-sm"
          >
            <span>Projekt anfragen</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
