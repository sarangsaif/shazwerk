"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Code, ShieldCheck, Terminal } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

export interface CaseStudy {
  id: string;
  tag: string;
  badge: string;
  title: string;
  category: string;
  summary: string;
  challenge: string;
  approach: string;
  solution: string;
  technology: string[];
  outcome: string;
  archSpecs: { label: string; value: string }[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "aetheris-assistant",
    tag: "CS-01",
    badge: "Concept / Internal Project",
    title: "Aetheris: Autonomous AI Business Assistant",
    category: "AI & Knowledge Infrastructure",
    summary:
      "A zero-leakage, context-aware AI assistant designed for confidential enterprise document repositories and cross-departmental operations.",
    challenge:
      "Enterprise knowledge workers spend significant time querying siloed internal repositories across compliance, legal, and operational documents. Off-the-shelf public AI models present severe data exfiltration risks and lack grounded context verification.",
    approach:
      "Architected a private hybrid Retrieval-Augmented Generation (RAG) system with localized semantic chunking, strict role-based access control (RBAC), and verifiable citation traces on every generated assertion.",
    solution:
      "Engineered an offline-compatible semantic retrieval bus paired with an ultra-low latency frontend query interface, featuring multi-source cross-verification and deterministic hallucination screening.",
    technology: ["TypeScript", "Next.js", "Vector DB (pgvector)", "OpenAI / Anthropic APIs", "Python FastAPI", "Docker"],
    outcome:
      "Demonstrated instantaneous query response across 10,000+ internal documents with 100% cryptographic citation traceability and zero external training telemetry.",
    archSpecs: [
      { label: "Vector Index", value: "HNSW Hierarchical" },
      { label: "Latency P95", value: "380ms" },
      { label: "Security", value: "Zero-Data Retention" },
    ],
  },
  {
    id: "helvetia-dashboard",
    tag: "CS-02",
    badge: "Concept / Internal Project",
    title: "Helvetia OS: Swiss Business Operations Dashboard",
    category: "Business Platforms & Data",
    summary:
      "A high-density financial and multi-entity operational dashboard built for Swiss holding structures requiring strict data residency and canton-level reporting.",
    challenge:
      "Managing cash flows, payroll obligations, VAT reconciliations, and inter-company contracts across multiple Swiss cantons is traditionally fractured between legacy ERP systems and static spreadsheets.",
    approach:
      "Designed an industrial, Swiss neo-grotesque UI focused on high information density, tabular clarity, and sub-100ms response times for heavy analytical data sets.",
    solution:
      "Constructed a high-throughput unified platform leveraging Next.js server components, optimistic UI updates, and automated Swiss QR-bill / ISO 20022 banking API ingestion.",
    technology: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js Microservices", "ISO 20022 Parser"],
    outcome:
      "Delivered a production-ready architectural platform capable of consolidating multi-currency treasury positions and generating canton-specific VAT statements in real-time.",
    archSpecs: [
      { label: "Data Model", value: "Multi-Tenant Relational" },
      { label: "UI Response", value: "< 50ms" },
      { label: "Banking Standard", value: "EBICS & ISO 20022" },
    ],
  },
  {
    id: "vanguard-platform",
    tag: "CS-03",
    badge: "Concept / Internal Project",
    title: "Vanguard Platform: Digital Customer Portal",
    category: "Customer Experience & Web",
    summary:
      "A self-service enterprise client platform with automated document verification, multi-language switching, and strict Swiss nDSG data sovereignty.",
    challenge:
      "Complex B2B customer onboarding required weeks of manual back-and-forth document verification, resulting in significant administrative overhead and dropped onboarding flows.",
    approach:
      "Mapped the end-to-end customer lifecycle into a frictionless, multi-step asynchronous onboarding flow with client-side document encryption and instant validation.",
    solution:
      "Built a secure, responsive portal featuring biometric authentication support, automated OCR verification, and an auditable activity log visible to both customer and compliance officers.",
    technology: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Zod Validation", "AES-256 GCM", "WebAuthn"],
    outcome:
      "Reduced theoretical onboarding cycle from 12 days to under 15 minutes, with full compliance under the Swiss Federal Act on Data Protection (nDSG).",
    archSpecs: [
      { label: "Compliance", value: "Swiss nDSG & EU GDPR" },
      { label: "Encryption", value: "Client-Side AES-256" },
      { label: "Auth", value: "Passkey & WebAuthn" },
    ],
  },
  {
    id: "synapse-flow",
    tag: "CS-04",
    badge: "Concept / Internal Project",
    title: "Synapse Flow: Low-Latency Automation Engine",
    category: "Workflow Automation & Systems",
    summary:
      "An event-driven orchestration system connecting legacy ERPs, CRM databases, and third-party logistics APIs into a single observable workflow pipeline.",
    challenge:
      "Siloed legacy systems resulted in dropped orders, manual double-entry of supplier invoices, and lack of visibility across distributed supply chain nodes.",
    approach:
      "Engineered an event-driven architecture using robust message queues with idempotency guarantees, dead-letter recovery, and real-time observability.",
    solution:
      "Implemented a reliable execution engine with visual execution traces, automated retry logic with exponential backoff, and instant Slack/Teams error alerting.",
    technology: ["Node.js", "Redis / BullMQ", "TypeScript", "PostgreSQL", "Webhooks Broker", "Prometheus"],
    outcome:
      "Achieved zero message loss during peak volume simulations with automated failover and end-to-end auditability across all connected systems.",
    archSpecs: [
      { label: "Message Bus", value: "Redis Event Stream" },
      { label: "Fault Recovery", value: "Dead-Letter Auto-Replay" },
      { label: "Throughput", value: "10k+ events/sec" },
    ],
  },
];

export default function SelectedWork() {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#E5E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E5E5E0]">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#6B7280] mb-2">
              04 / SELECTED WORK & CASE STUDIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0C0E11]">
              Architectural studies & internal products.
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <span className="inline-flex items-center px-2.5 py-1 bg-[#EFEFEA] border border-[#E0E0DA] text-[11px] font-mono text-[#4B5563]">
              Transparently labeled: Concept / Internal Projects
            </span>
          </div>
        </div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Project Selector List */}
          <div className="lg:col-span-5 space-y-4">
            {CASE_STUDIES.map((project, idx) => {
              const isSelected = activeProject === idx;
              return (
                <div
                  key={project.id}
                  onClick={() => {
                    setActiveProject(idx);
                    trackClientEvent("cta_click", { cta_id: `work_select_${project.id}` });
                  }}
                  className={`p-6 border cursor-pointer transition-all duration-200 relative ${
                    isSelected
                      ? "bg-[#0C0E11] text-[#FAFAF8] border-[#0C0E11] shadow-lg"
                      : "bg-[#FAFAF8] text-[#0C0E11] border-[#E0E0DA] hover:border-[#9CA3AF] hover:bg-[#FFFFFF]"
                  }`}
                >
                  {/* Red indicator stripe */}
                  {isSelected && (
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#E30613]"></div>
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[#E30613] font-bold">
                      {project.tag}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 border ${
                        isSelected
                          ? "border-[#262C36] text-[#9CA3AF] bg-[#14181F]"
                          : "border-[#E5E5E0] text-[#6B7280] bg-[#FFFFFF]"
                      }`}
                    >
                      {project.badge}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-lg tracking-tight mb-2">
                    {project.title}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed ${
                      isSelected ? "text-[#D1D5DB]" : "text-[#6B7280]"
                    }`}
                  >
                    {project.summary}
                  </p>

                  <div className="mt-4 pt-3 border-t border-current/10 flex items-center justify-between text-[11px] font-mono">
                    <span className={isSelected ? "text-[#9CA3AF]" : "text-[#9CA3AF]"}>
                      {project.category}
                    </span>
                    <span className="font-bold flex items-center gap-1">
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Technical Blueprint Breakdown */}
          <div className="lg:col-span-7 bg-[#FAFAF8] border border-[#E0E0DA] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Header Box */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-[#E0E0DA]">
                <div>
                  <span className="font-mono text-xs text-[#E30613] font-bold block mb-1">
                    {CASE_STUDIES[activeProject].tag} / TECHNICAL DOSSIER
                  </span>
                  <h3 className="text-2xl font-bold text-[#0C0E11] tracking-tight">
                    {CASE_STUDIES[activeProject].title}
                  </h3>
                </div>
                <span className="px-2.5 py-1 bg-[#FFFFFF] border border-[#E0E0DA] text-[11px] font-mono text-[#4B5563]">
                  {CASE_STUDIES[activeProject].badge}
                </span>
              </div>

              {/* Specifications Matrix */}
              <div className="grid grid-cols-3 gap-3 mb-6 bg-[#FFFFFF] p-3 border border-[#E0E0DA] font-mono text-xs">
                {CASE_STUDIES[activeProject].archSpecs.map((spec, sIdx) => (
                  <div key={sIdx}>
                    <div className="text-[10px] text-[#9CA3AF] uppercase">{spec.label}</div>
                    <div className="font-bold text-[#0C0E11] mt-0.5">{spec.value}</div>
                  </div>
                ))}
              </div>

              {/* Challenge / Approach / Solution Grid */}
              <div className="space-y-4 text-xs leading-relaxed text-[#374151]">
                <div className="bg-[#FFFFFF] p-4 border border-[#E5E5E0]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#E30613] font-bold block mb-1">
                    01 // THE CHALLENGE
                  </span>
                  <p>{CASE_STUDIES[activeProject].challenge}</p>
                </div>

                <div className="bg-[#FFFFFF] p-4 border border-[#E5E5E0]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#0C0E11] font-bold block mb-1">
                    02 // ARCHITECTURAL APPROACH
                  </span>
                  <p>{CASE_STUDIES[activeProject].approach}</p>
                </div>

                <div className="bg-[#FFFFFF] p-4 border border-[#E5E5E0]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#0C0E11] font-bold block mb-1">
                    03 // ENGINEERING SOLUTION & OUTCOME
                  </span>
                  <p className="mb-2">{CASE_STUDIES[activeProject].solution}</p>
                  <div className="pt-2 border-t border-[#F0F0EB] text-[#111418] font-medium flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>{CASE_STUDIES[activeProject].outcome}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack Footer */}
            <div className="mt-6 pt-4 border-t border-[#E0E0DA]">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#6B7280] mb-2">
                Engineered With:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {CASE_STUDIES[activeProject].technology.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 bg-[#FFFFFF] border border-[#D5D5CF] text-[11px] font-mono text-[#1F242D] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA to Work Page */}
        <div className="mt-12 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0C0E11] text-[#FAFAF8] text-xs font-semibold uppercase tracking-wider hover:bg-[#1F242D] transition-colors"
          >
            <span>View Full Portfolio & Architecture Cases</span>
            <ArrowUpRight className="w-4 h-4 text-[#E30613]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
