import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, Check, Zap, Layout, Globe, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Webagentur Zürich — High-End Webentwicklung & Next.js Schweiz",
  description:
    "Moderne Webagentur in Zürich für massgeschneiderte Webplattformen, interaktive Webanwendungen und Hochleistungs-Websites. Next.js 14, TypeScript & 60fps Animationen.",
  keywords: [
    "Webagentur Zürich",
    "Webentwicklung Zürich",
    "Next.js Agentur Schweiz",
    "Webdesign Agentur Zürich",
    "Web Application Development Zurich",
    "Webagentur Schweiz",
    "Webentwickler Zürich",
  ],
  alternates: {
    canonical: "https://shazwerk.ch/webagentur-zuerich",
  },
  openGraph: {
    title: "Webagentur Zürich | SHAZWERK",
    description:
      "High-End Webentwicklung & massgeschneiderte Webplattformen in Zürich mit Schweizer Präzision.",
    url: "https://shazwerk.ch/webagentur-zuerich",
  },
};

export default function WebagenturZuerichPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Webentwicklung & Webagentur Zürich",
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
      "Full-Stack Webentwicklung mit Next.js, TypeScript und massgeschneidertem Design in Zürich.",
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

        {/* Hero */}
        <div className="pb-16 border-b border-neutral-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
              DIGITAL ENGINEERING · ZÜRICH & SCHWEIZ
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-neutral-950 leading-[1.05] max-w-4xl">
            Webagentur Zürich: High-End Webplattformen ohne Template-Kompromisse.
          </h1>
          <p className="mt-6 text-xl text-neutral-600 max-w-2xl font-normal leading-relaxed">
            Wir bauen reaktive Webanwendungen, Corporate Portale und E-Commerce Plattformen mit Next.js 14, Typensicherheit und kompromissloser Schweizer Designästhetik.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-neutral-950 text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors shadow-sm"
            >
              <span>Webprojekt besprechen</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-neutral-100 text-neutral-900 text-xs font-mono uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors"
            >
              <span>Ausgewählte Projekte</span>
            </Link>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-neutral-200">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-neutral-950">Sub-Sekunden Ladezeiten</h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-mono">
              Server-Components, Edge-Caching und optimierte Asset-Pipelines sorgen für perfekte Google Core Web Vitals (99+ Score).
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
              <Layout className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-neutral-950">Schweizer Typografie & UI</h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-mono">
              Minimalistisch, funktional und typografisch präzise. Inspiriert von Josef Müller-Brockmann und zeitgenössischem Web Craft.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-neutral-950">SEO-Architektur & Indexierung</h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-mono">
              Vollständige Schema.org-Auszeichnung, kanonische URLs und lokales SEO für maximale Sichtbarkeit bei Google Schweiz.
            </p>
          </div>
        </div>

        {/* Technology Specs */}
        <div className="py-16 border-b border-neutral-200 space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-2">
              MODERNER FRONTEND & CLOUD STACK
            </span>
            <h2 className="text-3xl font-medium tracking-tight text-neutral-950">
              Moderne Technologien für langlebige Plattformen
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            {["Next.js 14 App Router", "TypeScript 5", "React 18", "Tailwind CSS", "PostgreSQL", "Node.js", "Docker & Kubernetes", "Vercel Edge Network"].map((tech) => (
              <div key={tech} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                <span className="text-neutral-900 font-semibold">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-16 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-medium tracking-tight text-neutral-950 mb-2">
              Bereit für Ihren nächsten Webauftritt?
            </h3>
            <p className="text-sm font-mono text-neutral-500">
              Vereinbaren Sie eine Erstberatung mit unserem Studio in Zürich.
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
