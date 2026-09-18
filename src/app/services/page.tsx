import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, Check, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Capabilities & Technical Stack",
  description:
    "Comprehensive digital product engineering, software architecture, AI automation, and UX systems built with Swiss precision.",
};

const CAPABILITIES = [
  {
    num: "01",
    title: "Digital Products & Web Platforms",
    subtitle: "Full-cycle digital products engineered from concept to market reality",
    lead: "We partner with visionary founders and enterprise leaders to turn complex requirements into high-fidelity web platforms and commercial SaaS systems.",
    deliverables: [
      "Full-stack Next.js & React platforms",
      "Multi-tenant SaaS architectures",
      "Real-time customer self-service portals",
      "High-throughput transactional interfaces",
      "API integrations & custom payment gateways",
    ],
    tech: ["Next.js 14", "TypeScript", "React 18", "Tailwind CSS", "Node.js", "PostgreSQL"],
  },
  {
    num: "02",
    title: "Enterprise AI & Private LLMs",
    subtitle: "Data-sovereign intelligence engineered into operational workflows",
    lead: "We cut through the noise of AI hype to deliver private, air-gapped language models, retrieval pipelines, and domain copilots that strictly preserve Swiss confidentiality.",
    deliverables: [
      "Air-gapped retrieval-augmented generation (RAG)",
      "Automated document ingestion & extraction pipelines",
      "Multi-agent autonomous decision workflows",
      "Local vector embeddings & pgvector semantic search",
      "Strict data boundary enforcement & audit logs",
    ],
    tech: ["Llama 3", "Mistral", "Qdrant / pgvector", "LangChain", "Python", "Docker"],
  },
  {
    num: "03",
    title: "Cloud Infrastructure & Swiss Residency",
    subtitle: "Zero-downtime distributed systems engineered for peak resilience",
    lead: "Infrastructure designed to withstand extreme load with Swiss banking-grade security, automated CI/CD releases, and verifiable data residency.",
    deliverables: [
      "Swiss data residency architectures (nDSG / FADP / GDPR)",
      "Zero-trust cloud topology & Kubernetes clusters",
      "Automated zero-downtime deployment pipelines",
      "Distributed monitoring, telemetry & alerting",
      "Disaster recovery & high-availability failover",
    ],
    tech: ["AWS (Zurich)", "Exoscale", "Docker / K8s", "Terraform", "PostgreSQL", "Redis"],
  },
  {
    num: "04",
    title: "Interface Architecture & Design Systems",
    subtitle: "Awwwards-grade aesthetic meets utilitarian functional clarity",
    lead: "Inspired by the Swiss International Typographic Style, our interfaces eliminate cognitive friction with modern editorial typography, fast keyboard navigation, and reusable design tokens.",
    deliverables: [
      "Complete UI/UX system design & interactive prototypes",
      "Design tokens in code & Figma synchronization",
      "High-density data visualization dashboards",
      "Micro-interactions & fluid animations",
      "Accessibility compliance (WCAG 2.1 AA)",
    ],
    tech: ["Figma Tokens", "Tailwind CSS", "Radix UI", "Micro-Animations", "Design Tokens"],
  },
  {
    num: "05",
    title: "Strategic Architecture Advisory",
    subtitle: "De-risking technical investments before writing production code",
    lead: "We conduct architectural audits, evaluate build-vs-buy decisions, plan database scalability, and establish milestone roadmaps with predictable timelines and budgets in CHF.",
    deliverables: [
      "Comprehensive architectural & code quality audits",
      "Swiss compliance & security boundary reviews",
      "Scalability & cloud expenditure optimization",
      "Fractional CTO & engineering leadership advisory",
    ],
    tech: ["C4 Model Architecture", "Technical PRDs", "Risk Matrices", "Cloud Cost Auditing"],
  },
];

const ENGAGEMENTS = [
  {
    num: "01",
    title: "Fixed-Scope Product Sprint",
    lead: "For well-defined new digital products, platforms, or MVPs.",
    details: "Clear deliverables, non-negotiable timelines, and transparent budget in CHF. Weekly staging releases and full IP handoff.",
    duration: "4 – 12 weeks",
  },
  {
    num: "02",
    title: "Dedicated Engineering Pod",
    lead: "For scaling platforms and ongoing product evolution.",
    details: "Senior full-stack engineers and technical lead embedded directly into your cadence with bi-weekly sprint velocity.",
    duration: "Monthly retained capacity",
  },
  {
    num: "03",
    title: "Architecture & Compliance Audit",
    lead: "For existing systems requiring performance or regulatory review.",
    details: "Deep-dive into code quality, security posture, Swiss nDSG data boundaries, and performance bottlenecks.",
    duration: "1 – 2 weeks",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-16 text-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
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
        <div className="pb-16 border-b border-neutral-200">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-3">
            [ CAPABILITIES & SERVICES ]
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-neutral-950 leading-[1.05] max-w-4xl">
            What We Do
          </h1>
          <p className="mt-6 text-xl text-neutral-600 max-w-2xl font-normal leading-relaxed">
            We design, architect, and deploy high-performance software, custom AI systems, and digital products that solve high-stakes commercial problems.
          </p>
        </div>

        {/* Services Stream */}
        <div className="py-16 flex flex-col gap-12">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.num}
              className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-10 transition-all hover:border-neutral-400"
            >
              <div className="flex items-center justify-between pb-6 border-b border-neutral-200 text-xs font-mono">
                <span className="text-neutral-400">DISCIPLINE {cap.num}</span>
                <span className="text-neutral-600">{cap.subtitle}</span>
              </div>

              <div className="pt-6">
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950 mb-3">
                  {cap.title}
                </h2>
                <p className="text-neutral-700 text-base sm:text-lg leading-relaxed mb-8">
                  {cap.lead}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-neutral-200">
                <div>
                  <span className="text-xs font-mono uppercase text-neutral-500 block mb-3">
                    Deliverables
                  </span>
                  <ul className="space-y-2.5">
                    {cap.deliverables.map((del, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-800">
                        <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase text-neutral-500 block mb-3">
                    Tech Stack & Standards
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cap.tech.map((t) => (
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
            </div>
          ))}
        </div>

        {/* Engagement Models */}
        <div className="pt-16 pb-12 border-t border-neutral-200">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-3">
            [ ENGAGEMENT STRUCTURES ]
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-950 mb-10">
            How We Partner With You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ENGAGEMENTS.map((eng) => (
              <div
                key={eng.num}
                className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-neutral-400 mb-3">{eng.num}</div>
                  <h3 className="text-xl font-medium tracking-tight text-neutral-950 mb-2">
                    {eng.title}
                  </h3>
                  <p className="text-xs font-medium text-neutral-800 mb-4">{eng.lead}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">{eng.details}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-neutral-200 text-xs font-mono text-neutral-900 font-semibold">
                  Typical cadence: {eng.duration}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-neutral-950 text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-2">
              Ready to scope your engineering requirements?
            </h3>
            <p className="text-neutral-400 text-sm max-w-lg">
              We provide fixed-milestone estimates and technical feasibility assessments within 48 hours.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-neutral-950 font-medium text-sm hover:bg-neutral-100 transition-colors shrink-0"
          >
            <span>Initiate a technical brief</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
