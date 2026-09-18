import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Capabilities & Technical Stack",
  description:
    "Comprehensive digital product engineering, software architecture, AI automation, and UX systems built with Swiss precision.",
};

const CAPABILITIES = [
  {
    num: "01",
    title: "Digital Products & Platforms",
    lead: "Complete web and mobile products engineered from concept to market reality.",
    body: "We partner with businesses to turn product concepts into scalable, commercial reality. Rather than building bloated MVPs, we craft lean, high-fidelity products engineered for market traction and operational reliability.",
    deliverables: ["Full-Stack Architecture", "Next.js Web Applications", "Mobile Applications", "Multi-Tenant SaaS Infrastructure", "Customer Self-Service Portals", "Payment & Billing Gateways"],
    tech: ["Next.js (App Router)", "TypeScript", "React Native", "Tailwind CSS", "PostgreSQL", "Node.js"],
  },
  {
    num: "02",
    title: "Software Engineering & Backends",
    lead: "Resilient distributed systems, robust data pipelines, and hardened APIs.",
    body: "We design backends that operate quietly and reliably under load. Clean domain modeling, strict type-safety, ACID transactions, and thorough automated test suites guarantee that your systems remain maintainable for years.",
    deliverables: ["Domain-Driven Architecture (DDD)", "High-Throughput REST & GraphQL", "Event-Driven Message Queues", "Relational & Time-Series Data Modeling", "Cloud Infrastructure as Code", "Zero-Downtime Releases"],
    tech: ["TypeScript", "Go / Python", "PostgreSQL", "Redis", "Docker", "Vercel / AWS", "Prisma / Drizzle"],
  },
  {
    num: "03",
    title: "AI Integration & Automation",
    lead: "Pragmatic machine intelligence engineered into real operational workflows.",
    body: "We bypass AI hype to deliver tangible productivity gains. By integrating state-of-the-art LLMs, deterministic data extraction pipelines, and automated business logic, we automate repetitive knowledge tasks while strictly preserving Swiss data sovereignty.",
    deliverables: ["Private Local RAG Systems", "Document OCR & Extraction", "Autonomous Decision Pipelines", "Local Vector Indexing", "AI Safety & Guardrails", "Internal Operational Copilots"],
    tech: ["OpenAI API", "Anthropic Claude", "pgvector", "LangChain", "FastAPI", "Python", "Redis"],
  },
  {
    num: "04",
    title: "UX / UI Architecture & Design Systems",
    lead: "Swiss industrial interface design prioritizing density, clarity, and speed.",
    body: "Inspired by the Swiss International Typographic Style, our interfaces eliminate cognitive friction. We prioritize information hierarchy, rapid keyboard navigation, legible typography, and robust component tokens that developers love building with.",
    deliverables: ["Design Systems in Code & Figma", "High-Density Dashboard UX", "Complex Form Systems", "Accessibility (WCAG 2.1 AA)", "Micro-Interactions", "User Flow Audits"],
    tech: ["Figma Tokens", "Tailwind CSS", "Radix UI Primitives", "CSS Micro-Animations", "Design Tokens"],
  },
  {
    num: "05",
    title: "Strategic Technical Advisory",
    lead: "Aligning technical architecture directly with commercial milestones.",
    body: "Before writing code, we de-risk the investment. We conduct architectural audits, evaluate build-vs-buy decisions, plan database scalability, and establish milestone roadmaps with predictable timelines and budgets.",
    deliverables: ["Technical Roadmaps", "Architecture Audits", "Cost & Scalability Modeling", "Swiss nDSG Compliance Audits", "Milestone Planning", "Fractional CTO Advisory"],
    tech: ["C4 Model Architecture", "Technical PRDs", "Risk Matrices", "Cloud Cost Optimization"],
  },
];

const ENGAGEMENTS = [
  {
    num: "01",
    title: "Fixed-Scope Product Build",
    lead: "For well-defined new digital products, platforms, or MVPs.",
    details: "Clear deliverables, non-negotiable timelines, and transparent budget in CHF. Weekly staging releases and full IP handoff.",
  },
  {
    num: "02",
    title: "Dedicated Engineering Squad",
    lead: "For continuous product evolution and scaling platforms.",
    details: "Dedicated senior software squad acting as an extension of your company. Agile 2-week sprint cadence aligned with Swiss business hours.",
  },
  {
    num: "03",
    title: "Technical Advisory & Architecture",
    lead: "For leadership teams needing senior technical steering.",
    details: "System audits, vendor evaluation, Fractional CTO guidance, and data sovereignty roadmaps.",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#080808] text-[#F5F5F3] min-h-screen pt-32 pb-28 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="pb-12 mb-16 border-b border-white/10">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#7E8494] block mb-4">
            CAPABILITIES // TECHNICAL MATRIX
          </span>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-[-0.04em] text-[#F5F5F3] leading-[0.98] mb-6">
            Engineering across the lifecycle.
          </h1>
          <p className="text-lg text-[#8E94A0] max-w-2xl leading-relaxed">
            We eliminate technical ambiguity. Whether you need a ground-up digital product, an enterprise software platform, or pragmatic AI automation, we deliver robust, production-grade systems engineered for real commercial outcomes.
          </p>
        </div>

        {/* Capabilities List */}
        <div className="space-y-24">
          {CAPABILITIES.map((cap) => (
            <div key={cap.num} className="border-b border-white/10 pb-20 last:border-b-0">
              <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
                <span className="font-mono text-sm text-[#E30613] font-bold">
                  {cap.num}
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#F5F5F3]">
                  {cap.title}
                </h2>
              </div>

              <p className="text-lg sm:text-xl text-[#A0A5B0] leading-relaxed max-w-3xl mb-8">
                {cap.lead}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                  <p className="text-sm text-[#8E94A0] leading-relaxed mb-6 font-normal">
                    {cap.body}
                  </p>
                  <div className="pt-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#7E8494] block mb-3">
                      Technologies Applied
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {cap.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-[#D1D5DB]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#7E8494] block mb-4">
                    Core Deliverables
                  </span>
                  <div className="space-y-2.5 text-xs text-[#D1D5DB]">
                    {cap.deliverables.map((deliv, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E30613]"></span>
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Engagement Frameworks */}
        <div className="mt-28 pt-16 border-t border-white/10">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#7E8494] block mb-4">
            ENGAGEMENT MODELS
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#F5F5F3] mb-12">
            How we collaborate.
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ENGAGEMENTS.map((eng) => (
              <div key={eng.num} className="p-8 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="font-mono text-xs text-[#E30613] font-bold block mb-3">
                  MODEL {eng.num}
                </span>
                <h4 className="text-xl font-bold text-white mb-2">{eng.title}</h4>
                <p className="text-xs font-semibold text-[#A0A5B0] mb-4 leading-relaxed">{eng.lead}</p>
                <p className="text-xs text-[#7E8494] leading-relaxed">{eng.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Action */}
        <div className="mt-20 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Ready to define your product architecture?</h3>
            <p className="text-xs text-[#7E8494] font-mono mt-1">Book an initial technical briefing with our team.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F5F5F3] text-[#080808] text-xs font-bold uppercase tracking-wider hover:bg-white transition-all"
          >
            <span>Start an Inquiry</span>
            <ArrowUpRight className="w-4 h-4 text-[#E30613]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
