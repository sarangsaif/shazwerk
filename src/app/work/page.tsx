"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, CheckCircle2, Code2, Layers, ShieldCheck, Terminal } from "lucide-react";
import { CASE_STUDIES } from "@/components/home/SelectedWork";
import { trackClientEvent } from "@/lib/analytics-client";

const FILTER_TAGS = [
  "All",
  "AI & Knowledge",
  "Business Platforms",
  "Customer Experience",
  "Workflow Automation",
];

export default function WorkPage() {
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredStudies =
    selectedTag === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => {
          if (selectedTag === "AI & Knowledge") return cs.category.includes("AI");
          if (selectedTag === "Business Platforms") return cs.category.includes("Business");
          if (selectedTag === "Customer Experience") return cs.category.includes("Customer");
          if (selectedTag === "Workflow Automation") return cs.category.includes("Workflow");
          return true;
        });

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Work Page Hero */}
      <section className="border-b border-[#E5E5E0] pt-16 pb-20 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFEFEA] border border-[#E0E0DA] text-[11px] font-mono uppercase tracking-[0.16em] text-[#4B5563] mb-6">
              <span className="w-1.5 h-1.5 bg-[#E30613] rounded-full"></span>
              <span>PORTFOLIO & ARCHITECTURAL STUDIES</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-[#0C0E11] leading-[1.08] mb-6">
              Selected Work.
            </h1>
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed mb-6">
              A curated catalog of internal software architectures, system prototypes, and digital product studies demonstrating our technical standard.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFFFFF] border border-[#E0E0DA] text-xs font-mono text-[#6B7280]">
              <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
              <span>All projects transparently marked as Concept / Internal Project</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-[#FFFFFF] border-b border-[#E5E5E0] sticky top-18 lg:top-[97px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center space-x-2">
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTag(tag);
                  trackClientEvent("cta_click", { cta_id: `filter_work_${tag}` });
                }}
                className={`px-3.5 py-1.5 text-xs font-mono tracking-wide transition-colors whitespace-nowrap ${
                  selectedTag === tag
                    ? "bg-[#0C0E11] text-[#FAFAF8] font-bold"
                    : "bg-[#FAFAF8] text-[#4B5563] hover:text-[#0C0E11] border border-[#E0E0DA]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <span className="text-xs font-mono text-[#9CA3AF] hidden sm:block">
            SHOWING {filteredStudies.length} ARCHITECTURES
          </span>
        </div>
      </section>

      {/* Case Studies Detailed List */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="bg-[#FFFFFF] border border-[#E0E0DA] p-6 sm:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
            >
              {/* Header Box */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E5E5E0] gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs font-bold text-[#E30613]">
                      {study.tag}
                    </span>
                    <span className="text-xs font-mono uppercase text-[#6B7280]">
                      {study.category}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C0E11] tracking-tight">
                    {study.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#FAFAF8] border border-[#E0E0DA] text-[11px] font-mono text-[#4B5563]">
                    {study.badge}
                  </span>
                </div>
              </div>

              {/* Architectural Highlights Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 bg-[#FAFAF8] p-4 border border-[#E5E5E0] font-mono text-xs">
                {study.archSpecs.map((spec, sIdx) => (
                  <div key={sIdx}>
                    <div className="text-[10px] text-[#9CA3AF] uppercase">{spec.label}</div>
                    <div className="font-bold text-[#0C0E11] text-sm mt-0.5">{spec.value}</div>
                  </div>
                ))}
              </div>

              {/* 4-Column Breakdown: Challenge, Approach, Solution, Outcome */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-5 bg-[#FAFAF8] border border-[#EAEAE5]">
                  <div className="font-mono text-xs uppercase tracking-wider text-[#E30613] font-bold mb-2">
                    01 // THE CHALLENGE
                  </div>
                  <p className="text-xs text-[#374151] leading-relaxed">{study.challenge}</p>
                </div>

                <div className="p-5 bg-[#FAFAF8] border border-[#EAEAE5]">
                  <div className="font-mono text-xs uppercase tracking-wider text-[#0C0E11] font-bold mb-2">
                    02 // ARCHITECTURAL APPROACH
                  </div>
                  <p className="text-xs text-[#374151] leading-relaxed">{study.approach}</p>
                </div>

                <div className="p-5 bg-[#FAFAF8] border border-[#EAEAE5]">
                  <div className="font-mono text-xs uppercase tracking-wider text-[#0C0E11] font-bold mb-2">
                    03 // ENGINEERING SOLUTION
                  </div>
                  <p className="text-xs text-[#374151] leading-relaxed">{study.solution}</p>
                </div>

                <div className="p-5 bg-[#FAFAF8] border border-[#EAEAE5] flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider text-[#10B981] font-bold mb-2">
                      04 // ARCHITECTURAL OUTCOME
                    </div>
                    <p className="text-xs text-[#374151] leading-relaxed mb-4">{study.outcome}</p>
                  </div>
                  <div className="pt-3 border-t border-[#E5E5E0] flex items-center gap-2 text-xs font-mono text-[#0C0E11] font-semibold">
                    <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                    <span>Verified Production Architecture</span>
                  </div>
                </div>
              </div>

              {/* Technology Stack Tags */}
              <div className="pt-4 border-t border-[#E5E5E0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#9CA3AF] block mb-1">
                    TECHNOLOGIES APPLIED
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {study.technology.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 bg-[#FAFAF8] border border-[#D5D5CF] text-[11px] font-mono text-[#1F242D]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#0C0E11] hover:text-[#E30613] transition-colors self-end sm:self-center"
                >
                  <span>Discuss similar system</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-[#0C0E11] text-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-[#FAFAF8]">
            Need a bespoke digital product or system architecture?
          </h2>
          <p className="text-sm text-[#9CA3AF] mb-8">
            Tell us about your requirements and let our senior engineering team evaluate the solution.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FAFAF8] text-[#0C0E11] text-xs font-bold uppercase tracking-wider hover:bg-white transition-all"
          >
            <span>Start a project inquiry</span>
            <ArrowUpRight className="w-4 h-4 text-[#E30613]" />
          </Link>
        </div>
      </section>
    </div>
  );
}
