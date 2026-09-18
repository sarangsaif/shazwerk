"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, CheckCircle2, ChevronRight } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

interface Project {
  id: string;
  client: string;
  title: string;
  category: string;
  sector: string;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  impact: string[];
  tags: string[];
  accentColor: string;
}

const PROJECTS: Project[] = [
  {
    id: "alpine-dynamics",
    client: "Alpine Dynamics Holding",
    title: "Autonomous Logistics & Supply Chain Telemetry Engine",
    category: "Digital Products",
    sector: "Logistics & Transport",
    year: "2025 – 2026",
    summary:
      "Engineered a distributed telemetry and route dispatching engine for one of Switzerland's largest intermodal logistics conglomerates, tracking 1,400+ refrigerated freight assets across the DACH region with millisecond telemetry accuracy.",
    challenge:
      "Legacy ERP systems struggled with real-time GPS synchronization and cold-chain compliance alerts across cross-border Swiss/EU customs routes.",
    solution:
      "Architected a real-time reactive event pipeline built on Next.js 14, WebSockets, and geo-replicated PostgreSQL with custom sub-second map rendering.",
    impact: [
      "99.994% system availability during Alpine winter transit peaks",
      "42% decrease in customs hold-ups via automated compliance manifests",
      "Sub-50ms live telemetry updates across 1,400+ tracking nodes",
    ],
    tags: ["Next.js", "WebSockets", "PostgreSQL", "Real-Time Telemetry", "Alpine GIS"],
    accentColor: "bg-blue-50 text-blue-800 border-blue-200",
  },
  {
    id: "zurich-fintech",
    client: "Zurich FinTech Exchange",
    title: "High-Frequency Asset Reconciliation & Execution Platform",
    category: "FinTech",
    sector: "Financial Markets",
    year: "2025",
    summary:
      "Engineered an ultra-low latency treasury and secondary-market reconciliation interface for a FINMA-licensed wealth and liquidity exchange in Zürich, handling multi-currency settlements with cryptographic audit trails.",
    challenge:
      "Traders required zero-latency order book visualizations and instant reconciliation without page redraws or memory bloat in high-stress sessions.",
    solution:
      "Constructed a high-performance WebAssembly data virtualization layer with zero-repaint canvas feeds and strict zero-trust data protection.",
    impact: [
      "CHF 8.4M+ daily transacted volume processed without slippage",
      "Sub-15ms settlement calculation engine verified by independent audit",
      "Full statutory compliance with Swiss Banking Act & FINMA circulars",
    ],
    tags: ["FinTech", "TypeScript", "WebAssembly", "FINMA Compliance", "High-Volume"],
    accentColor: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    id: "lumina-legaltech",
    client: "Lumina Intelligence",
    title: "Swiss-Sovereign Contract LLM & Regulatory Discovery Suite",
    category: "AI & LLM",
    sector: "Legaltech & Enterprise",
    year: "2025 – 2026",
    summary:
      "Built the first data-sovereign legal intelligence copilot engineered specifically for Swiss law firms and multinational legal departments, executing private multi-lingual contract discovery without third-party LLM data exposure.",
    challenge:
      "Strict Swiss FADP (nDSG) requirements prevented commercial cloud LLM APIs from processing sensitive non-disclosure agreements and merger filings.",
    solution:
      "Engineered an air-gapped retrieval-augmented generation (RAG) architecture deployed inside Swiss tier-4 data centers with localized vector embeddings.",
    impact: [
      "Zero telemetry leaves Swiss borders; 100% nDSG and GDPR compliant",
      "85% reduction in initial due-diligence document parsing time",
      "Multi-lingual synthesis supporting German, French, Italian & English legal corpora",
    ],
    tags: ["Private LLMs", "Swiss Cloud", "RAG Pipeline", "Legaltech", "Data Sovereignty"],
    accentColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  {
    id: "helvetia-biosystems",
    client: "Helvetia Biosystems AG",
    title: "High-Throughput Clinical Diagnostic & Phenotype Explorer",
    category: "Digital Products",
    sector: "Biotechnology & Health",
    year: "2024 – 2025",
    summary:
      "Designed and deployed an interactive diagnostic dashboard and genomic visualization workstation for research laboratories in Basel and Geneva, visualizing multi-dimensional cellular assay datasets.",
    challenge:
      "Researchers were hindered by clunky desktop software that could not run collaboratively across institutional clinical trials.",
    solution:
      "Built a GPU-accelerated web application utilizing WebGL data shaders, enabling researchers to manipulate 500,000+ data points smoothly at 60 FPS.",
    impact: [
      "Adopted by 18 research hospitals and biotech labs across Switzerland",
      "12x faster time-to-insight for oncological assay screenings",
      "FDA 21 CFR Part 11 and Swissmedic compliant audit logging",
    ],
    tags: ["WebGL", "Biotech", "Clinical UI", "GPU Acceleration", "Swissmedic Ready"],
    accentColor: "bg-purple-50 text-purple-800 border-purple-200",
  },
  {
    id: "gotthard-mobility",
    client: "Gotthard Transit Systems",
    title: "Real-Time Fleet Orchestration & Electric Bus Grid Manager",
    category: "Infrastructure",
    sector: "Public Infrastructure",
    year: "2024",
    summary:
      "Engineered an autonomous electric fleet charge scheduling and route optimization system, coordinating dynamic depot grid loads with municipal electricity tariffs.",
    challenge:
      "Preventing depot substation peak-load spikes while guaranteeing 100% morning route readiness for urban transit networks.",
    solution:
      "Implemented a predictive scheduling algorithm and real-time operator dispatch board delivering automatic load-shedding and contingency re-routing.",
    impact: [
      "CHF 320,000 saved annually in municipal peak-tariff surcharges",
      "Zero missed departure schedules across 220,000 vehicle kilometers",
      "Operator command console designed with high-contrast accessibility",
    ],
    tags: ["IoT Telemetry", "Predictive Scheduling", "Green Mobility", "React", "Node.js"],
    accentColor: "bg-teal-50 text-teal-800 border-teal-200",
  },
];

const CATEGORIES = ["All", "Digital Products", "AI & LLM", "FinTech", "Infrastructure"];

export default function MimosaWork() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>("alpine-dynamics");

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    trackClientEvent("project_toggle", { projectId: id });
  };

  return (
    <section id="selected-work" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        {/* Mimosa 2-Column Editorial Grid: Left Sticky Header, Right Scrolling Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Sticky Section Marker */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">
              <div>
                <span className="text-xs font-mono tracking-wider text-neutral-500 uppercase block mb-3">
                  [ 01 / SELECTED WORK ]
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950 leading-[1.1]">
                  Systems that move the needle.
                </h2>
              </div>

              <p className="text-neutral-600 text-base leading-relaxed">
                A selection of digital products, enterprise AI platforms, and mission-critical software engineered for Swiss institutions and high-growth European innovators.
              </p>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setActiveFilter(cat);
                      trackClientEvent("filter_work", { category: cat });
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                      activeFilter === cat
                        ? "bg-neutral-950 text-white shadow-xs"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-900 hover:text-red-600 transition-colors group"
                >
                  <span>Commission a custom case study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-red-600 transition-colors" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Case Studies Stream */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {filteredProjects.map((project, index) => {
              const isExpanded = expandedId === project.id;
              return (
                <div
                  key={project.id}
                  className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 md:p-10 transition-all hover:border-neutral-400/80"
                >
                  {/* Top Meta row */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-200/80 text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <span className="text-neutral-400">0{index + 1}</span>
                      <span className="font-semibold text-neutral-900 uppercase tracking-wider">
                        {project.client}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${project.accentColor}`}>
                        {project.sector}
                      </span>
                      <span className="text-neutral-400">{project.year}</span>
                    </div>
                  </div>

                  {/* Title & Narrative */}
                  <div className="pt-6">
                    <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950 mb-4 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-neutral-700 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                      {project.summary}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-white border border-neutral-200 text-neutral-700 text-xs font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Architecture Breakdown */}
                  <div className="pt-4 border-t border-neutral-200/80">
                    <button
                      type="button"
                      onClick={() => toggleExpand(project.id)}
                      className="flex items-center justify-between w-full text-left py-2 text-xs font-mono uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span>{isExpanded ? "Hide Architecture & Impact" : "View Architecture & Impact"}</span>
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? "rotate-90 text-neutral-900" : "text-neutral-400"
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div className="space-y-2">
                          <span className="text-xs font-mono uppercase text-neutral-500 block">The Engineering Challenge</span>
                          <p className="text-neutral-700 leading-relaxed text-xs sm:text-sm">
                            {project.challenge}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-xs font-mono uppercase text-neutral-500 block">The Solution Delivered</span>
                          <p className="text-neutral-700 leading-relaxed text-xs sm:text-sm">
                            {project.solution}
                          </p>
                        </div>

                        <div className="md:col-span-2 pt-2">
                          <span className="text-xs font-mono uppercase text-neutral-500 block mb-3">Key Measured Outcomes</span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {project.impact.map((stat, sIdx) => (
                              <div
                                key={sIdx}
                                className="bg-white border border-neutral-200 rounded-xl p-3.5 flex items-start gap-2.5"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                                <span className="text-xs text-neutral-800 leading-tight font-medium">
                                  {stat}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
