import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Cpu, Database, Layers, ShieldCheck, Terminal, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Technical Capabilities",
  description:
    "Comprehensive digital product engineering, software architecture, AI automation, and UX systems built with Swiss precision.",
};

const DETAILED_SERVICES = [
  {
    id: "digital-products",
    code: "SRV-01",
    title: "Digital Products",
    lead: "From initial validation to fully operational web and mobile products.",
    description:
      "We partner with businesses to turn product concepts into scalable, commercial reality. Rather than building bloated MVPs, we craft lean, high-fidelity products engineered for market traction and operational reliability.",
    capabilities: [
      "End-to-End Product Engineering",
      "Next-Generation Web Applications",
      "Cross-Platform Mobile Applications",
      "Multi-Tenant SaaS Infrastructure",
      "Customer Self-Service Portals",
      "Billing & Payment Gateway Integration (Stripe, Swiss QR-Bill)",
    ],
    stack: ["Next.js (App Router)", "TypeScript", "React Native", "Tailwind CSS", "PostgreSQL", "Node.js"],
  },
  {
    id: "software-dev",
    code: "SRV-02",
    title: "Software Engineering & Backend Platforms",
    lead: "Resilient distributed systems, robust data pipelines, and clean APIs.",
    description:
      "We design backends that operate quietly and reliably under load. Clean domain modeling, strict type-safety, ACID transactions, and thorough automated test suites guarantee that your systems remain maintainable for years.",
    capabilities: [
      "Domain-Driven Architecture (DDD)",
      "High-Throughput REST & GraphQL APIs",
      "Event-Driven Architecture & Message Queues",
      "Relational & Time-Series Data Modeling",
      "Cloud Infrastructure as Code (IaC)",
      "Zero-Downtime Migration & Database Hardening",
    ],
    stack: ["TypeScript", "Go / Python", "PostgreSQL", "Redis", "Docker", "Vercel / AWS", "Prisma / Drizzle"],
  },
  {
    id: "ai-automation",
    code: "SRV-03",
    title: "AI Integration & Workflow Automation",
    lead: "Pragmatic machine intelligence engineered into real operational workflows.",
    description:
      "We bypass AI hype to deliver tangible productivity gains. By integrating state-of-the-art LLMs, deterministic data extraction pipelines, and automated business logic, we automate repetitive knowledge tasks while strictly preserving data sovereignty.",
    capabilities: [
      "Private Retrieval-Augmented Generation (RAG)",
      "Document Understanding & Automated OCR",
      "Autonomous Decision & Dispatch Workflows",
      "Local Vector Indexing & Semantic Search",
      "AI Safety, Guardrails & Audit Verification",
      "Internal Operational Copilots",
    ],
    stack: ["OpenAI API", "Anthropic Claude", "pgvector", "LangChain / LlamaIndex", "FastAPI", "Python", "Redis"],
  },
  {
    id: "ux-ui",
    code: "SRV-04",
    title: "UX / UI Architecture & Design Systems",
    lead: "Swiss industrial interface design: clarity, density, and precision.",
    description:
      "Inspired by the Swiss International Typographic Style, our interfaces eliminate cognitive friction. We prioritize information hierarchy, rapid keyboard navigation, legible typography, and robust component tokens that developers love building with.",
    capabilities: [
      "Comprehensive Design Systems in Figma & Code",
      "High-Density Dashboard UX",
      "Complex Form Architecture & Instant Validation",
      "Accessibility Standards (WCAG 2.1 AA)",
      "Micro-Interactions & Kinetic Feedback",
      "Interactive Prototyping & User Flow Audits",
    ],
    stack: ["Figma Tokens", "Tailwind CSS", "Radix UI Primitives", "CSS Micro-Animations", "Design Tokens"],
  },
  {
    id: "product-strategy",
    code: "SRV-05",
    title: "Product Strategy & Technical Architecture",
    lead: "Aligning technical architecture directly with commercial objectives.",
    description:
      "Before writing code, we de-risk the investment. We conduct architectural audits, evaluate build-vs-buy decisions, plan database scalability, and establish milestone roadmaps with predictable timelines and budgets.",
    capabilities: [
      "Technical Feasibility & Architecture Blueprinting",
      "Legacy Codebase & Cloud Infrastructure Audits",
      "Cloud Cost & Scalability Modeling",
      "Security & Swiss nDSG Compliance Audits",
      "Milestone Planning & Scope Pruning",
      "Fractional CTO & Advisory Services",
    ],
    stack: ["Architecture Diagrams (C4 Model)", "Technical PRDs", "Risk Matrices", "Cloud Cost Optimization"],
  },
  {
    id: "continuous-dev",
    code: "SRV-06",
    title: "Continuous Product Development Squads",
    lead: "Dedicated senior engineering capacity for ongoing iteration.",
    description:
      "Technology requires continuous stewardship. We act as your long-term product squad, delivering bi-weekly release cycles, performance monitoring, security patches, and strategic feature expansion.",
    capabilities: [
      "Dedicated Senior Engineering Squads",
      "Guaranteed SLA Response Times",
      "Continuous CI/CD Testing & Release Management",
      "Proactive Security & Dependency Maintenance",
      "Observability & Real-Time Performance Tuning",
      "Transparent Sprints & Sprint Demos",
    ],
    stack: ["GitHub Actions", "Sentry Observability", "Vercel Enterprise", "Automated Playwright QA"],
  },
];

const ENGAGEMENT_MODELS = [
  {
    title: "Fixed-Scope Product Build",
    lead: "Ideal for well-defined new digital products, platforms, or MVPs.",
    features: [
      "Clear scope, milestones, and deliverable commitments",
      "Transparent, predictable budget in CHF",
      "Weekly staging demos and codebase access",
      "Full IP and documentation handoff upon completion",
    ],
  },
  {
    title: "Dedicated Engineering Squad",
    lead: "Ideal for continuous product development and scaling platforms.",
    features: [
      "Dedicated senior engineers & UX architect",
      "Agile 2-week sprint cadence with sprint reviews",
      "Direct communication in Slack/Teams and Swiss business hours",
      "Flexible roadmap adaptation as business requirements evolve",
    ],
  },
  {
    title: "Technical Advisory & Architecture",
    lead: "Ideal for companies needing senior technical steering or code audits.",
    features: [
      "Comprehensive system architecture and risk audits",
      "Vendor and technology evaluation (build vs. buy)",
      "Fractional CTO guidance for executive teams",
      "Data sovereignty and nDSG privacy roadmap",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Services Hero */}
      <section className="border-b border-[#E5E5E0] pt-16 pb-20 bg-[#FAFAF8] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFEFEA] border border-[#E0E0DA] text-[11px] font-mono uppercase tracking-[0.16em] text-[#4B5563] mb-6">
              <span className="w-1.5 h-1.5 bg-[#E30613] rounded-full"></span>
              <span>SERVICES & CORE CAPABILITIES</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-[#0C0E11] leading-[1.08] mb-6">
              Engineering with Swiss precision across the product lifecycle.
            </h1>
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
              We eliminate technical ambiguity. Whether you need a ground-up digital product, an enterprise backend platform, or pragmatic AI integration, we deliver robust, production-grade systems engineered for real commercial outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Services Breakdown */}
      <section className="py-20 bg-[#FFFFFF] border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {DETAILED_SERVICES.map((srv, idx) => (
              <div
                key={srv.id}
                id={srv.id}
                className="scroll-mt-28 border border-[#E0E0DA] bg-[#FAFAF8] p-6 sm:p-10 transition-all hover:border-[#0C0E11]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Title and Lead */}
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-xs font-bold text-[#E30613]">
                        {srv.code}
                      </span>
                      <span className="text-xs font-mono text-[#9CA3AF]">
                        CAPABILITY 0{idx + 1} / 06
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C0E11] tracking-tight mb-3">
                      {srv.title}
                    </h2>
                    <p className="text-xs font-semibold text-[#1F242D] mb-4 leading-relaxed">
                      {srv.lead}
                    </p>
                    <p className="text-xs text-[#6B7280] leading-relaxed mb-6">
                      {srv.description}
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#0C0E11] hover:text-[#E30613] transition-colors"
                    >
                      <span>Inquire regarding this capability</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Right Column: Capabilities and Tech Stack */}
                  <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E5E5E0] p-6">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-[#6B7280] mb-4">
                      Core Engineering Scope:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {srv.capabilities.map((cap, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-start gap-2 text-xs font-medium text-[#1F242D]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-[#F0F0EB]">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#9CA3AF] mb-2">
                        Primary Technologies:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {srv.stack.map((item, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 bg-[#F4F4F0] border border-[#E0E0DA] text-[10px] font-mono text-[#4B5563]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models Section */}
      <section className="py-20 lg:py-28 bg-[#FAFAF8] border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#6B7280] mb-2">
              ENGAGEMENT FRAMEWORKS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0C0E11]">
              How we collaborate.
            </h2>
            <p className="text-xs text-[#4B5563] mt-3 font-mono">
              Transparent, accountable structures designed for Swiss business reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ENGAGEMENT_MODELS.map((model, mIdx) => (
              <div
                key={mIdx}
                className="bg-[#FFFFFF] border border-[#E0E0DA] p-7 flex flex-col justify-between hover:border-[#0C0E11] transition-colors"
              >
                <div>
                  <span className="font-mono text-xs text-[#E30613] font-bold block mb-3">
                    MODEL 0{mIdx + 1}
                  </span>
                  <h3 className="text-xl font-bold text-[#0C0E11] mb-2 tracking-tight">
                    {model.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] mb-6 leading-relaxed">
                    {model.lead}
                  </p>
                  <ul className="space-y-2.5 mb-6 text-xs text-[#374151]">
                    {model.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#F0F0EB]">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-between w-full text-xs font-mono font-bold uppercase text-[#0C0E11] hover:text-[#E30613]"
                  >
                    <span>Request Proposal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Bottom CTA */}
      <section className="py-20 bg-[#0C0E11] text-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-[#FAFAF8]">
            Ready to define your product architecture?
          </h2>
          <p className="text-sm text-[#9CA3AF] mb-8 font-normal">
            Schedule a direct technical consultation with our senior engineering team in Zurich.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FAFAF8] hover:bg-white text-[#0C0E11] text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>Start the conversation</span>
            <ArrowUpRight className="w-4 h-4 text-[#E30613]" />
          </Link>
        </div>
      </section>
    </div>
  );
}
