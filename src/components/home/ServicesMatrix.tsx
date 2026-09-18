"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

const SERVICES = [
  {
    id: "digital-products",
    code: "SRV-01",
    title: "Digital Products",
    lead: "Complete web & mobile products from zero to operational market readiness.",
    description:
      "We take complex business requirements and engineer comprehensive digital products that solve operational friction, satisfy end-users, and scale cleanly.",
    tags: ["Full-Stack Architecture", "Web Apps", "Mobile Products", "SaaS Infrastructure"],
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 stroke-current stroke-[1.5]">
        <rect x="2" y="3" width="20" height="14" rx="1" />
        <line x1="2" y1="7" x2="22" y2="7" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <circle cx="5" cy="5" r="0.8" fill="currentColor" />
        <circle cx="8" cy="5" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "software-dev",
    code: "SRV-02",
    title: "Software Engineering",
    lead: "Reliable, type-safe software platforms and robust backend systems.",
    description:
      "Modern TypeScript, serverless architectures, robust relational/non-relational database schemas, and clean REST/GraphQL APIs with zero bloat.",
    tags: ["Distributed Systems", "TypeScript", "PostgreSQL", "Resilient APIs"],
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 stroke-current stroke-[1.5]">
        <path d="M16 18l6-6-6-6" />
        <path d="M8 6l-6 6 6 6" />
        <path d="M14 4l-4 16" />
      </svg>
    ),
  },
  {
    id: "ai-automation",
    code: "SRV-03",
    title: "AI & Workflow Automation",
    lead: "Pragmatic machine intelligence engineered for real operational workflows.",
    description:
      "We integrate LLMs, retrieval systems (RAG), autonomous pipelines, and structured extraction into your existing ERP, CRM, and operational backends.",
    tags: ["LLM Integrations", "Autonomous Workflows", "Vector Indexing", "Process Automation"],
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 stroke-current stroke-[1.5]">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    ),
  },
  {
    id: "ux-ui",
    code: "SRV-04",
    title: "UX / UI Architecture",
    lead: "Swiss modernist interface systems prioritizing information density and speed.",
    description:
      "Every layout, typography pairing, and microinteraction is crafted for precision. No decorative fluff—just intuitive, high-velocity business tools.",
    tags: ["Design Systems", "Component Libraries", "Information Architecture", "Figma to Code"],
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 stroke-current stroke-[1.5]">
        <rect x="3" y="3" width="18" height="18" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    id: "product-strategy",
    code: "SRV-05",
    title: "Product Strategy",
    lead: "Translating ambiguous corporate challenges into technical roadmaps.",
    description:
      "Senior technical coordination to align commercial objectives, architecture selection, cost projections, and engineering milestones.",
    tags: ["Technical Roadmaps", "Scope Pruning", "Cost Optimization", "Feasibility Audits"],
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 stroke-current stroke-[1.5]">
        <circle cx="12" cy="12" r="9" />
        <polygon points="12 8 8 16 16 16" />
      </svg>
    ),
  },
  {
    id: "continuous-dev",
    code: "SRV-06",
    title: "Continuous Product Squads",
    lead: "Long-term dedicated technical partnership and progressive feature delivery.",
    description:
      "A dedicated engineering squad acting as an extension of your company. We manage maintenance, security audits, and iterative product sprints.",
    tags: ["Dedicated Squads", "SLA Guarantees", "Zero-Downtime Releases", "Security Hardening"],
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 stroke-current stroke-[1.5]">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19" />
      </svg>
    ),
  },
];

export default function ServicesMatrix() {
  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#E5E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E5E5E0]">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#6B7280] mb-2">
              02 / CORE CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0C0E11]">
              Engineered across the product lifecycle.
            </h2>
          </div>
          <Link
            href="/services"
            onClick={() => trackClientEvent("cta_click", { cta_id: "services_view_all" })}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-mono uppercase font-semibold text-[#0C0E11] hover:text-[#E30613] transition-colors"
          >
            <span>Explore all services in detail</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6-Service Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="group bg-[#FAFAF8] border border-[#E0E0DA] hover:border-[#0C0E11] p-7 transition-all duration-200 flex flex-col justify-between hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            >
              <div>
                {/* Card Top Metadata */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 bg-[#FFFFFF] border border-[#E5E5E0] text-[#0C0E11] group-hover:text-[#E30613] group-hover:border-[#0C0E11] flex items-center justify-center transition-colors">
                    {srv.iconSvg}
                  </div>
                  <span className="font-mono text-[11px] text-[#9CA3AF] tracking-wider">
                    {srv.code}
                  </span>
                </div>

                {/* Title and Lead */}
                <h3 className="text-xl font-bold text-[#0C0E11] mb-2 tracking-tight">
                  {srv.title}
                </h3>
                <p className="text-xs font-semibold text-[#374151] mb-3 leading-snug">
                  {srv.lead}
                </p>
                <p className="text-xs text-[#6B7280] leading-relaxed mb-6 font-normal">
                  {srv.description}
                </p>
              </div>

              {/* Tags and Link */}
              <div className="pt-4 border-t border-[#EAEAE5]">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {srv.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E5E5E0] text-[10px] font-mono text-[#4B5563]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/services#${srv.id}`}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase font-bold text-[#0C0E11] group-hover:text-[#E30613] transition-colors"
                >
                  <span>Technical details</span>
                  <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
