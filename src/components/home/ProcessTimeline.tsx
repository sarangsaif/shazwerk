"use client";

import React, { useState } from "react";
import { CheckCircle2, Clock, ShieldCheck } from "lucide-react";

const TIMELINE_STAGES = [
  {
    step: "01",
    title: "Discovery",
    duration: "Week 1",
    lead: "Deconstructing constraints, risks, and business mechanics.",
    details:
      "Deep technical interviews, existing codebase review, infrastructure assessment, and operational workflow mapping.",
  },
  {
    step: "02",
    title: "Product Definition",
    duration: "Week 1–2",
    lead: "Pruning scope into a clear, non-negotiable specification.",
    details:
      "Functional PRD, database entity relationship diagrams (ERD), API contracts, and milestone scheduling.",
  },
  {
    step: "03",
    title: "UX / UI Design",
    duration: "Week 2–3",
    lead: "High-density, Swiss industrial design systems.",
    details:
      "Interactive Figma prototypes, accessibility audit, design token architecture, and user flow validation.",
  },
  {
    step: "04",
    title: "Engineering",
    duration: "Week 3–7",
    lead: "Type-safe, modern development across the stack.",
    details:
      "Next.js, TypeScript, PostgreSQL, REST/GraphQL endpoints, state machine implementation, and weekly staging deployments.",
  },
  {
    step: "05",
    title: "Quality Assurance (QA)",
    duration: "Week 7–8",
    lead: "End-to-end integration and security hardening.",
    details:
      "Automated Playwright/Cypress tests, penetration testing, load benchmarking, and edge-case validation.",
  },
  {
    step: "06",
    title: "Launch",
    duration: "Week 8",
    lead: "Zero-downtime production deployment.",
    details:
      "Vercel/Cloud cutover, DNS propagation, SSL verification, telemetry monitoring, and documentation handoff.",
  },
  {
    step: "07",
    title: "Support & Scaling",
    duration: "Ongoing",
    lead: "Proactive maintenance and feature iteration.",
    details:
      "Continuous SLA monitoring, security patching, dependency upgrades, and strategic product roadmap execution.",
  },
];

export default function ProcessTimeline() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#E5E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E5E5E0]">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#6B7280] mb-2">
              06 / DELIVERY ROADMAP
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0C0E11]">
              Predictable engineering timeline.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-[#4B5563] max-w-md font-mono">
            Structured in transparent phases with tangible code deliverables at every step.
          </p>
        </div>

        {/* Vertical Architectural Timeline */}
        <div className="relative border-l-2 border-[#E5E5E0] ml-4 md:ml-8 pl-6 md:pl-10 space-y-10">
          {TIMELINE_STAGES.map((stage, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={stage.step}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative group transition-all"
              >
                {/* Timeline node pin */}
                <div
                  className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-colors ${
                    isHovered
                      ? "bg-[#E30613] border-[#0C0E11]"
                      : "bg-[#FFFFFF] border-[#6B7280] group-hover:border-[#E30613]"
                  }`}
                />

                <div
                  className={`p-6 border transition-all duration-150 ${
                    isHovered
                      ? "bg-[#FAFAF8] border-[#0C0E11] shadow-sm"
                      : "bg-[#FFFFFF] border-[#E0E0DA]"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#E30613]">
                        {stage.step}
                      </span>
                      <h3 className="text-xl font-bold text-[#0C0E11] tracking-tight">
                        {stage.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-[#6B7280] bg-[#EFEFEA] px-2.5 py-1 border border-[#E0E0DA] w-fit">
                      <Clock className="w-3 h-3" />
                      <span>{stage.duration}</span>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-[#1F242D] mb-2 leading-relaxed">
                    {stage.lead}
                  </p>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    {stage.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
