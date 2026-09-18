"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

const WORK_ITEMS = [
  {
    id: "aetheris",
    num: "01",
    title: "Aetheris Intelligence",
    tagline: "Autonomous AI business assistant with localized RAG and zero-leakage security.",
    category: "AI & Knowledge Systems",
    conceptBadge: "Concept / Internal Study",
    challenge:
      "Enterprise knowledge workers spend significant time querying siloed internal repositories across compliance, legal, and operational documents. Off-the-shelf public AI models present severe data exfiltration risks.",
    solution:
      "Architected a private hybrid Retrieval-Augmented Generation (RAG) system with localized semantic chunking, strict role-based access control (RBAC), and verifiable citation traces on every generated assertion.",
    outcome:
      "Demonstrated instantaneous query response across 10,000+ internal documents with 100% cryptographic citation traceability and zero external training telemetry.",
    specs: [
      { label: "Vector Index", value: "HNSW Hierarchical" },
      { label: "Latency P95", value: "380ms" },
      { label: "Security", value: "Zero-Data Retention" },
    ],
    tech: ["TypeScript", "Next.js", "Vector DB (pgvector)", "OpenAI / Claude APIs", "FastAPI", "Docker"],
  },
  {
    id: "helvetia",
    num: "02",
    title: "Helvetia OS",
    tagline: "Swiss B2B multi-tenant resource, liquidity, and canton compliance cockpit.",
    category: "Business Platforms",
    conceptBadge: "Concept / Internal Study",
    challenge:
      "Managing cash flows, payroll obligations, VAT reconciliations, and inter-company contracts across multiple Swiss cantons is traditionally fractured between legacy ERP systems and static spreadsheets.",
    solution:
      "Constructed a high-throughput unified platform leveraging Next.js server components, optimistic UI updates, and automated Swiss QR-bill / ISO 20022 banking API ingestion.",
    outcome:
      "Delivered a production-ready architectural platform capable of consolidating multi-currency treasury positions and generating canton-specific VAT statements in real-time.",
    specs: [
      { label: "Data Model", value: "Multi-Tenant Relational" },
      { label: "UI Response", value: "< 50ms" },
      { label: "Banking Standard", value: "EBICS & ISO 20022" },
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js", "ISO 20022 Parser"],
  },
  {
    id: "vanguard",
    num: "03",
    title: "Vanguard Platform",
    tagline: "Self-service enterprise client platform with automated document verification.",
    category: "Customer Experience",
    conceptBadge: "Concept / Internal Study",
    challenge:
      "Complex B2B customer onboarding required weeks of manual back-and-forth document verification, resulting in significant administrative overhead and dropped onboarding flows.",
    solution:
      "Built a secure, responsive portal featuring biometric authentication support, automated OCR verification, and an auditable activity log visible to both customer and compliance officers.",
    outcome:
      "Reduced theoretical onboarding cycle from 12 days to under 15 minutes, with full compliance under the Swiss Federal Act on Data Protection (nDSG).",
    specs: [
      { label: "Compliance", value: "Swiss nDSG & EU GDPR" },
      { label: "Encryption", value: "Client-Side AES-256" },
      { label: "Auth", value: "Passkey & WebAuthn" },
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Zod Validation", "AES-256 GCM", "WebAuthn"],
  },
  {
    id: "synapse",
    num: "04",
    title: "Synapse Flow",
    tagline: "Low-latency event-driven orchestration system for enterprise ERPs.",
    category: "Workflow Automation",
    conceptBadge: "Concept / Internal Study",
    challenge:
      "Siloed legacy systems resulted in dropped orders, manual double-entry of supplier invoices, and lack of visibility across distributed supply chain nodes.",
    solution:
      "Engineered an event-driven architecture using robust message queues with idempotency guarantees, dead-letter recovery, and real-time observability.",
    outcome:
      "Achieved zero message loss during peak volume simulations with automated failover and end-to-end auditability across all connected systems.",
    specs: [
      { label: "Message Bus", value: "Redis Event Stream" },
      { label: "Fault Recovery", value: "Dead-Letter Auto-Replay" },
      { label: "Throughput", value: "10k+ events/sec" },
    ],
    tech: ["Node.js", "Redis / BullMQ", "TypeScript", "PostgreSQL", "Webhooks Broker", "Prometheus"],
  },
];

const CATEGORIES = ["All", "AI & Knowledge Systems", "Business Platforms", "Customer Experience", "Workflow Automation"];

export default function WorkPage() {
  const [selectedCat, setSelectedCat] = useState("All");

  const filtered =
    selectedCat === "All"
      ? WORK_ITEMS
      : WORK_ITEMS.filter((item) => item.category === selectedCat);

  return (
    <div className="bg-[#080808] text-[#F5F5F3] min-h-screen pt-32 pb-28 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="pb-12 mb-16 border-b border-white/10">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#7E8494] block mb-4">
            PORTFOLIO // SELECTED WORK
          </span>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-[-0.04em] text-[#F5F5F3] leading-[0.98] mb-6">
            Architectural studies & systems.
          </h1>
          <p className="text-lg text-[#8E94A0] max-w-2xl leading-relaxed">
            A curated catalog of internal software architectures, system prototypes, and digital product studies demonstrating our technical standard. Transparently labeled as conceptual internal studies.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCat(cat);
                  trackClientEvent("cta_click", { cta_id: `filter_work_${cat}` });
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
                  selectedCat === cat
                    ? "bg-[#F5F5F3] text-[#080808] font-bold"
                    : "bg-white/5 text-[#8E94A0] hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Dossier */}
        <div className="space-y-24">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="border-b border-white/10 pb-20 last:border-b-0"
            >
              <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-4 mb-6">
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-mono text-sm text-[#E30613] font-bold">
                    {item.num}
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#F5F5F3]">
                    {item.title}
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#7E8494]">{item.category}</span>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50">
                    {item.conceptBadge}
                  </span>
                </div>
              </div>

              <p className="text-base sm:text-xl text-[#A0A5B0] leading-relaxed max-w-3xl mb-10">
                {item.tagline}
              </p>

              {/* Architectural Specs Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 p-6 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs">
                {item.specs.map((spec, sIdx) => (
                  <div key={sIdx}>
                    <div className="text-[10px] text-[#7E8494] uppercase tracking-wider mb-1">{spec.label}</div>
                    <div className="text-sm font-bold text-[#F5F5F3]">{spec.value}</div>
                  </div>
                ))}
              </div>

              {/* Challenge / Solution / Outcome Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-xs text-[#8E94A0] leading-relaxed font-sans">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#E30613] font-bold block mb-2">
                    01 // THE CHALLENGE
                  </span>
                  <p>{item.challenge}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#F5F5F3] font-bold block mb-2">
                    02 // ARCHITECTURAL SOLUTION
                  </span>
                  <p>{item.solution}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#10B981] font-bold block mb-2">
                    03 // OUTCOME & RESILIENCE
                  </span>
                  <p>{item.outcome}</p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap items-center gap-2 pt-4">
                <span className="text-[10px] font-mono uppercase text-[#7E8494] mr-2">Technologies:</span>
                {item.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-[#D1D5DB]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Have a similar project in mind?</h3>
            <p className="text-xs text-[#7E8494] font-mono mt-1">Schedule a direct technical consultation in Zurich.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F5F5F3] text-[#080808] text-xs font-bold uppercase tracking-wider hover:bg-white transition-all"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 text-[#E30613]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
