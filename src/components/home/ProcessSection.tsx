"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Discover",
    lead: "Business realities & technical audit",
    desc: "We analyze operational bottlenecks, data flows, existing infrastructure, and business objectives without buzzwords.",
    deliverables: ["Technical Feasibility Report", "Architecture Blueprint", "Risk Assessment"],
  },
  {
    num: "02",
    title: "Define",
    lead: "Scope, architecture & systems",
    desc: "Clear product specifications, technical boundaries, database schemas, and a non-negotiable delivery timeline.",
    deliverables: ["Functional Spec (PRD)", "System Schema", "Milestone Roadmap"],
  },
  {
    num: "03",
    title: "Design",
    lead: "Industrial UI & interaction systems",
    desc: "High-density, intuitive interfaces built for real operators. Prioritizing workflow speed, visual hierarchy, and clarity.",
    deliverables: ["Component Design System", "High-Fidelity Prototype", "Accessibility Specs"],
  },
  {
    num: "04",
    title: "Build",
    lead: "Type-safe, modern engineering",
    desc: "Full-stack development using Next.js, TypeScript, resilient APIs, and disciplined testing. Code built to endure.",
    deliverables: ["Production Codebase", "Automated CI/CD Test Suite", "API Documentation"],
  },
  {
    num: "05",
    title: "Launch",
    lead: "Hardened deployment & verification",
    desc: "Zero-downtime cutovers, security audits, database migrations, and performance optimization on modern cloud infrastructure.",
    deliverables: ["Cloud Deployment", "Audit & Security Checklist", "DNS & SSL Configuration"],
  },
  {
    num: "06",
    title: "Evolve",
    lead: "Continuous optimization & telemetry",
    desc: "Observability, privacy-conscious analytics, proactive maintenance, and iterative feature scaling as business demands grow.",
    deliverables: ["Real-Time Telemetry", "SLA Maintenance", "Roadmap Iterations"],
  },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAF8] border-b border-[#E5E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E5E5E0]">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#6B7280] mb-2">
              01 / METHODOLOGY & PROCESS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0C0E11]">
              From first idea to production.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-[#4B5563] max-w-md font-mono">
            A linear, accountable delivery framework with transparent Swiss milestones at every phase.
          </p>
        </div>

        {/* Horizontal Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          {STEPS.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`p-5 text-left border transition-all duration-150 relative group ${
                  isSelected
                    ? "bg-[#0C0E11] text-[#FAFAF8] border-[#0C0E11] shadow-md"
                    : "bg-[#FFFFFF] text-[#0C0E11] border-[#E0E0DA] hover:border-[#9CA3AF] hover:bg-[#F9F9F7]"
                }`}
              >
                {/* Active Indicator Top Bar */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#E30613]"></div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSelected ? "text-[#E30613]" : "text-[#6B7280]"
                    }`}
                  >
                    {step.num}
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase ${
                      isSelected ? "text-[#9CA3AF]" : "text-[#9CA3AF]"
                    }`}
                  >
                    Phase
                  </span>
                </div>
                <h3 className="font-sans font-bold text-base tracking-tight mb-1">
                  {step.title}
                </h3>
                <p
                  className={`text-[12px] line-clamp-2 leading-relaxed ${
                    isSelected ? "text-[#D1D5DB]" : "text-[#6B7280]"
                  }`}
                >
                  {step.lead}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Blueprint Box */}
        <div className="bg-[#FFFFFF] border border-[#E0E0DA] p-6 sm:p-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E30613] font-bold mb-2">
                <span>PHASE {STEPS[activeStep].num} DETAILS</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0C0E11] mb-2 tracking-tight">
                {STEPS[activeStep].title} — {STEPS[activeStep].lead}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
                {STEPS[activeStep].desc}
              </p>
            </div>

            <div className="lg:col-span-8 bg-[#F8F8F6] border border-[#ECECE6] p-5">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#6B7280] mb-3">
                Key Engineering Deliverables:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {STEPS[activeStep].deliverables.map((deliv, dIdx) => (
                  <div
                    key={dIdx}
                    className="flex items-start gap-2 bg-[#FFFFFF] p-3 border border-[#E5E5E0] text-xs font-medium text-[#0C0E11]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-[#EAEAE5] flex items-center justify-between text-[11px] font-mono text-[#6B7280]">
                <span>ACCOUNTABILITY: Full documentation and source code handoff</span>
                <span>STATUS: STAGE {STEPS[activeStep].num} / 06</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
