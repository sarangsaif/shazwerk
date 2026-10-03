import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, Shield, Cpu, Lock, Database, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise AI Schweiz — Private LLMs & nDSG Datensouveränität",
  description:
    "Souveräne Enterprise AI Entwicklung in Zürich. Air-gapped Sprachmodelle, private RAG-Pipelines und FINMA-konforme KI-Architektur ohne Datenabfluss ins Ausland.",
  keywords: [
    "Enterprise AI Schweiz",
    "Private LLMs Schweiz",
    "AI Agentur Zürich",
    "Künstliche Intelligenz Schweiz nDSG",
    "Air gapped AI Switzerland",
    "RAG Pipelines Zürich",
    "FINMA AI Compliance",
  ],
  alternates: {
    canonical: "https://shazwerk.ch/enterprise-ai-schweiz",
  },
  openGraph: {
    title: "Enterprise AI Schweiz | SHAZWERK",
    description:
      "Souveräne Enterprise AI & private Sprachmodelle in Schweizer Rechenzentren nach nDSG.",
    url: "https://shazwerk.ch/enterprise-ai-schweiz",
  },
};

export default function EnterpriseAiSchweizPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Enterprise AI & Private LLMs Schweiz",
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
      "@type": "Country",
      name: "Switzerland",
    },
    description:
      "Entwicklung und Integration von sicheren, privaten Sprachmodellen und RAG-Systemen in Schweizer Rechenzentren.",
  };

  return (
    <div className="bg-white text-neutral-900 min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
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
              SOUVERÄNE ENTERPRISE AI · 100% SCHWEIZER nDSG
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-neutral-950 leading-[1.05] max-w-4xl">
            Enterprise AI Schweiz: Eigene Sprachmodelle ohne Datenabfluss.
          </h1>
          <p className="mt-6 text-xl text-neutral-600 max-w-2xl font-normal leading-relaxed">
            Wir bauen und integrieren private LLMs und semantische RAG-Pipelines direkt auf Schweizer Cloud-Servern. Höchste Präzision für Banken, Kanzleien, Medtech und Industrie.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-neutral-950 text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors shadow-sm"
            >
              <span>AI-Architektur auditieren</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-neutral-100 text-neutral-900 text-xs font-mono uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors"
            >
              <span>Dienstleistungen einsehen</span>
            </Link>
          </div>
        </div>

        {/* 3 Core Security Pillars */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-neutral-200">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-neutral-950">Zero-Telemetry Garantie</h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-mono">
              Keine Kundendaten fliessen an US-Konzerne oder Drittanbieter-APIs. Sämtliche Inferenz läuft isoliert auf Ihrer dedizierten Schweizer Infrastruktur.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-neutral-950">Air-Gapped RAG Pipelines</h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-mono">
              Semantische Vektorsuche über Unternehmensdokumente, Verträge und Forschungsdaten mit lokaler Vektordatenbank (pgvector / Qdrant).
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-neutral-950">FINMA & nDSG Compliance</h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-mono">
              Auditierbare Systemarchitektur, granulare Zugriffskontrollen (RBAC) und lückenlose Protokollierung aller generierten Antworten.
            </p>
          </div>
        </div>

        {/* Architecture Specs */}
        <div className="py-16 border-b border-neutral-200 space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-2">
              UNTERSTÜTZTE KI-MODELLE & INFERENZ
            </span>
            <h2 className="text-3xl font-medium tracking-tight text-neutral-950">
              Open-Weights & High-Performance Modelle
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            {["Llama 3.1 (8B, 70B)", "Mistral Large & Nemo", "Qwen 2.5 Enterprise", "DeepSeek R1", "Local pgvector Embeddings", "vLLM High-Throughput", "LangChain & LlamaIndex", "Schweizer GPU Pods"].map((item) => (
              <div key={item} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                <span className="text-neutral-900 font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-16 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-medium tracking-tight text-neutral-950 mb-2">
              Möchten Sie eine sichere KI-Lösung in der Schweiz implementieren?
            </h3>
            <p className="text-sm font-mono text-neutral-500">
              Lassen Sie uns Ihre Anforderungen und Compliance-Vorgaben in einem vertraulichen Gespräch analysieren.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-neutral-950 text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors shrink-0 shadow-sm"
          >
            <span>AI-Audit anfragen</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
