"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

interface WorkProject {
  id: string;
  num: string;
  client: string;
  title: string;
  category: string;
  sector: string;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  tech: string[];
}

const ALL_PROJECTS: WorkProject[] = [
  {
    id: "alpine-dynamics",
    num: "01",
    client: "Alpine Dynamics Holding",
    title: "Autonomous Logistics & Telemetry Engine",
    category: "Digital Products",
    sector: "Logistics & Transport",
    year: "2025 – 2026",
    summary:
      "Distributed telemetry and route optimization system tracking 1,400+ refrigerated freight assets across the DACH region with millisecond GPS synchronization and cold-chain compliance alerts.",
    challenge:
      "Legacy ERP infrastructure suffered from severe latency bottlenecks during high-altitude Alpine transit, risking perishable pharmaceutical cargo compliance.",
    solution:
      "Architected an event-driven telemetry pipeline on Next.js 14, WebSockets, and geo-replicated PostgreSQL with sub-second map rendering.",
    outcomes: [
      "99.994% system availability through Alpine winter transit peaks",
      "42% decrease in customs delays via automated digital manifest generation",
      "Sub-50ms live telemetry updates across all connected nodes",
    ],
    tech: ["Next.js 14", "WebSockets", "PostgreSQL", "GIS Mapping", "Docker"],
  },
  {
    id: "zurich-fintech",
    num: "02",
    client: "Zurich FinTech Exchange",
    title: "High-Frequency Asset Reconciliation Interface",
    category: "FinTech",
    sector: "Financial Markets",
    year: "2025",
    summary:
      "Ultra-low latency treasury and secondary-market reconciliation interface for a FINMA-licensed exchange in Zürich, handling multi-currency liquidity with zero-latency order book rendering.",
    challenge:
      "Traders experienced UI frame drops and state race conditions in high-volatility sessions with millions of real-time book updates.",
    solution:
      "Constructed a high-performance WebAssembly virtualization layer with zero-repaint canvas feeds and strict zero-trust data protection.",
    outcomes: [
      "CHF 8.4M+ daily transacted volume processed without slippage",
      "Sub-15ms settlement calculation engine verified by independent audit",
      "Full statutory compliance with the Swiss Banking Act and FINMA circulars",
    ],
    tech: ["WebAssembly", "TypeScript", "Next.js", "FINMA Compliance", "Tailwind"],
  },
  {
    id: "lumina-legaltech",
    num: "03",
    client: "Lumina Intelligence",
    title: "Swiss-Sovereign Contract LLM & Regulatory Discovery",
    category: "AI & LLM",
    sector: "Legaltech & Enterprise",
    year: "2025 – 2026",
    summary:
      "First data-sovereign legal copilot engineered specifically for Swiss law firms and multinational legal departments, executing private multi-lingual contract discovery without third-party cloud data exposure.",
    challenge:
      "Strict Swiss FADP (nDSG) requirements prevented commercial cloud LLM APIs from processing sensitive client contracts and merger filings.",
    solution:
      "Air-gapped retrieval-augmented generation (RAG) architecture deployed inside Swiss tier-4 data centers with localized vector embeddings.",
    outcomes: [
      "Zero telemetry leaves Swiss borders; 100% nDSG and GDPR compliant",
      "85% reduction in initial due-diligence document parsing time",
      "Multi-lingual synthesis supporting German, French, Italian & English",
    ],
    tech: ["Private LLMs", "Swiss Cloud", "pgvector", "RAG Pipeline", "FastAPI"],
  },
  {
    id: "helvetia-biosystems",
    num: "04",
    client: "Helvetia Biosystems AG",
    title: "High-Throughput Clinical Diagnostic Explorer",
    category: "Digital Products",
    sector: "Biotechnology & Health",
    year: "2024 – 2025",
    summary:
      "Interactive diagnostic dashboard and genomic visualization workstation for research laboratories in Basel and Geneva, visualizing multi-dimensional cellular assay datasets.",
    challenge:
      "Researchers were hindered by clunky desktop software that could not run collaboratively across institutional clinical trials.",
    solution:
      "Built a GPU-accelerated web application utilizing WebGL data shaders, enabling researchers to manipulate 500,000+ data points smoothly at 60 FPS.",
    outcomes: [
      "Adopted by 18 research hospitals and biotech labs across Switzerland",
      "12x faster time-to-insight for oncological assay screenings",
      "FDA 21 CFR Part 11 and Swissmedic compliant audit logging",
    ],
    tech: ["WebGL", "GPU Acceleration", "TypeScript", "Next.js", "Swissmedic Ready"],
  },
  {
    id: "gotthard-mobility",
    num: "05",
    client: "Gotthard Transit Systems",
    title: "Real-Time Fleet Orchestration & Electric Grid Manager",
    category: "Infrastructure",
    sector: "Public Infrastructure",
    year: "2024",
    summary:
      "Autonomous electric fleet charge scheduling and route optimization system, coordinating dynamic depot grid loads with municipal electricity tariffs.",
    challenge:
      "Preventing depot substation peak-load spikes while guaranteeing 100% morning route readiness for urban transit networks.",
    solution:
      "Implemented a predictive scheduling algorithm and real-time operator dispatch board delivering automatic load-shedding and contingency re-routing.",
    outcomes: [
      "CHF 320,000 saved annually in municipal peak-tariff surcharges",
      "Zero missed departure schedules across 220,000 vehicle kilometers",
      "Operator command console designed with high-contrast accessibility",
    ],
    tech: ["IoT Telemetry", "Predictive Scheduling", "React", "Node.js", "Time-Series DB"],
  },
];

const CATEGORIES = ["All", "Digital Products", "AI & LLM", "FinTech", "Infrastructure"];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="bg-white min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-16 text-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-950 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Studio</span>
          </Link>
        </div>

        {/* Header */}
        <div className="pb-12 border-b border-neutral-200">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-3">
            [ PORTFOLIO ARCHIVE ]
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-neutral-950 leading-[1.05] max-w-4xl">
            Selected Work
          </h1>
          <p className="mt-6 text-xl text-neutral-600 max-w-2xl font-normal leading-relaxed">
            A comprehensive archive of software systems, digital platforms, and private AI deployments engineered for clients across Switzerland and Europe.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveFilter(cat);
                  trackClientEvent("filter_archive", { category: cat });
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  activeFilter === cat
                    ? "bg-neutral-950 text-white shadow-xs"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project List Stream */}
        <div className="py-12 flex flex-col gap-10">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-10 transition-all hover:border-neutral-400"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-200 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-neutral-400">{item.num}</span>
                  <span className="font-semibold text-neutral-900 uppercase tracking-wider">
                    {item.client}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-200/80 text-neutral-800 text-[11px]">
                    {item.sector}
                  </span>
                  <span className="text-neutral-500">{item.year}</span>
                </div>
              </div>

              <div className="pt-6">
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950 mb-3">
                  {item.title}
                </h2>
                <p className="text-neutral-700 text-base sm:text-lg leading-relaxed mb-6">
                  {item.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-y border-neutral-200 text-sm">
                <div>
                  <span className="text-xs font-mono uppercase text-neutral-500 block mb-2">The Challenge</span>
                  <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed">{item.challenge}</p>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-neutral-500 block mb-2">The Solution</span>
                  <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed">{item.solution}</p>
                </div>
              </div>

              <div className="pt-6">
                <span className="text-xs font-mono uppercase text-neutral-500 block mb-3">Verified Impact</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {item.outcomes.map((stat, i) => (
                    <div
                      key={i}
                      className="bg-white border border-neutral-200 rounded-xl p-3.5 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span className="text-xs text-neutral-800 font-medium leading-tight">{stat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-white border border-neutral-200 text-neutral-700 text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="mt-12 bg-neutral-950 text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-2">
              Have a similar engineering challenge?
            </h3>
            <p className="text-neutral-400 text-sm max-w-lg">
              Let&apos;s evaluate your architectural requirements and outline a concrete milestone roadmap.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-neutral-950 font-medium text-sm hover:bg-neutral-100 transition-colors shrink-0"
          >
            <span>Commission a project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
