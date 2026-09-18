"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

interface ProjectItem {
  id: string;
  num: string;
  title: string;
  category: string;
  conceptLabel: string;
  tagline: string;
  challenge: string;
  solution: string;
  tech: string[];
  gradient: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "aetheris",
    num: "01",
    title: "Aetheris",
    category: "AI & Knowledge Infrastructure",
    conceptLabel: "Concept / Internal Study",
    tagline: "Autonomous AI business assistant with localized RAG and zero-leakage security.",
    challenge: "Knowledge retrieval across confidential corporate documents without risking public LLM data leaks.",
    solution: "Private vector retrieval bus with cryptographic citation verification and sub-400ms query latency.",
    tech: ["TypeScript", "Vector DB", "pgvector", "FastAPI", "Next.js"],
    gradient: "from-[#1A1412] to-[#0A0B0E]",
  },
  {
    id: "helvetia",
    num: "02",
    title: "Helvetia OS",
    category: "Business Platforms & Data",
    conceptLabel: "Concept / Internal Study",
    tagline: "Swiss B2B multi-tenant resource, liquidity, and canton compliance cockpit.",
    challenge: "Consolidating multi-currency liquidity and canton VAT statements from legacy ERPs.",
    solution: "Sub-50ms high-density operational platform with ISO 20022 banking API ingestion.",
    tech: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js"],
    gradient: "from-[#0E151B] to-[#080808]",
  },
  {
    id: "vanguard",
    num: "03",
    title: "Vanguard Platform",
    category: "Digital Customer Experience",
    conceptLabel: "Concept / Internal Study",
    tagline: "Self-service enterprise client platform with automated document verification.",
    challenge: "Cumbersome B2B onboarding requiring weeks of manual document back-and-forth.",
    solution: "Asynchronous biometric onboarding portal with client-side AES-256 document encryption.",
    tech: ["Next.js", "WebAuthn", "Zod", "AES-256", "Tailwind CSS"],
    gradient: "from-[#161219] to-[#080808]",
  },
  {
    id: "synapse",
    num: "04",
    title: "Synapse Flow",
    category: "Workflow Automation & Systems",
    conceptLabel: "Concept / Internal Study",
    tagline: "Event-driven orchestration system for enterprise ERPs and third-party logistics.",
    challenge: "Fragile point-to-point integrations causing lost orders and manual invoice re-entry.",
    solution: "High-throughput Redis event pipeline with dead-letter replay and instant error alerts.",
    tech: ["Node.js", "Redis / BullMQ", "TypeScript", "PostgreSQL"],
    gradient: "from-[#121A15] to-[#080808]",
  },
];

export default function AwwwardsWork() {
  const [hoveredIdx, setHoveredIdx] = useState<number>(0);
  const active = PROJECTS[hoveredIdx];

  return (
    <section id="work" className="py-28 lg:py-40 px-4 sm:px-8 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 mb-16 border-b border-white/10 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#7E8494] block mb-3">
              01 // SELECTED WORK & CASE STUDIES
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] text-[#F5F5F3]">
              Architectural studies.
            </h2>
          </div>
          <div className="text-xs font-mono text-[#7E8494]">
            Transparently labeled: Conceptual / Internal Studies
          </div>
        </div>

        {/* Editorial Project Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Monolithic Interactive List */}
          <div className="lg:col-span-7 divide-y divide-white/5">
            {PROJECTS.map((proj, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <div
                  key={proj.id}
                  onMouseEnter={() => {
                    setHoveredIdx(idx);
                    trackClientEvent("cta_click", { cta_id: `hover_work_${proj.id}` });
                  }}
                  className="group py-8 sm:py-10 cursor-pointer transition-all duration-300 flex items-baseline justify-between"
                >
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span
                      className={`font-mono text-xs transition-colors duration-200 ${
                        isHovered ? "text-[#E30613] font-bold" : "text-[#7E8494]"
                      }`}
                    >
                      {proj.num}
                    </span>
                    <div>
                      <h3
                        className={`text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] transition-all duration-300 ${
                          isHovered
                            ? "text-white translate-x-2"
                            : "text-[#8E94A0] group-hover:text-[#D1D5DB]"
                        }`}
                      >
                        {proj.title}
                      </h3>
                      <div className="text-xs font-mono text-[#7E8494] mt-1.5 flex items-center gap-3">
                        <span>{proj.category}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20"></span>
                        <span className="text-[10px] text-white/40 uppercase">{proj.conceptLabel}</span>
                      </div>
                    </div>
                  </div>

                  <ArrowUpRight
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                      isHovered
                        ? "text-[#E30613] opacity-100 translate-x-1 -translate-y-1"
                        : "text-white/20 opacity-0 group-hover:opacity-60"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column: Floating Visual Vignette Card */}
          <div className="lg:col-span-5 sticky top-32">
            <div
              className={`p-8 sm:p-10 rounded-2xl bg-gradient-to-br ${active.gradient} border border-white/10 transition-all duration-500 shadow-2xl relative overflow-hidden`}
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#E30613]/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between text-xs font-mono text-[#7E8494] pb-4 mb-6 border-b border-white/10">
                  <span className="text-[#E30613] font-bold">CASE STUDY {active.num}</span>
                  <span className="uppercase text-[10px] text-white/50">{active.conceptLabel}</span>
                </div>

                <h4 className="text-2xl font-bold text-white tracking-tight mb-3">
                  {active.title}
                </h4>

                <p className="text-sm text-[#D1D5DB] leading-relaxed mb-6 font-normal">
                  {active.tagline}
                </p>

                <div className="space-y-4 text-xs text-[#A0A5B0] mb-8 font-mono">
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase">Challenge</span>
                    <span className="text-[#D1D5DB]">{active.challenge}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase">Solution</span>
                    <span className="text-[#D1D5DB]">{active.solution}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                  {active.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-[#E5E7EB]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Link to Full Archive */}
        <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs font-mono text-[#7E8494]">
            EXPLORE THE FULL REPERTOIRE
          </span>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#F5F5F3] hover:text-[#E30613] transition-colors"
          >
            <span>View All Case Studies</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
