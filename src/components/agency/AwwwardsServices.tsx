"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

interface ServiceItem {
  num: string;
  title: string;
  lead: string;
  description: string;
  deliverables: string[];
}

const SERVICES: ServiceItem[] = [
  {
    num: "01",
    title: "Digital Products & Platforms",
    lead: "From zero to production-grade web and mobile applications.",
    description:
      "We design and build complete digital products for companies that refuse to compromise on user experience or technical durability. Every interface is crafted for speed, ergonomics, and high conversion.",
    deliverables: ["Full-Stack Web Apps", "Mobile Applications", "Multi-Tenant SaaS", "Customer Portals"],
  },
  {
    num: "02",
    title: "Software Engineering & Backends",
    lead: "Type-safe, distributed architectures engineered for scale.",
    description:
      "Resilient backends operating quietly and reliably under load. Clean domain modeling, modern TypeScript, resilient relational schemas, and hardened APIs with zero bloat.",
    deliverables: ["Distributed Systems", "TypeScript & Go", "PostgreSQL Schemas", "Resilient APIs"],
  },
  {
    num: "03",
    title: "AI Integration & Automation",
    lead: "Targeted machine intelligence engineered for real operational workflows.",
    description:
      "We bypass AI hype to deliver tangible productivity gains. Private Retrieval-Augmented Generation (RAG), automated OCR document processing, and autonomous workflows with complete data sovereignty.",
    deliverables: ["Private Local RAG", "OCR & Document Parsing", "Autonomous Workflows", "Swiss nDSG Compliance"],
  },
  {
    num: "04",
    title: "UX / UI Architecture & Design Systems",
    lead: "Swiss modernist industrial design prioritizing density, clarity, and speed.",
    description:
      "Inspired by the International Typographic Style, our interfaces eliminate cognitive clutter. We engineer bespoke design systems and component libraries built for high-velocity operation.",
    deliverables: ["Design Tokens in Code", "High-Density UX", "Figma Design Systems", "WCAG 2.1 AA"],
  },
  {
    num: "05",
    title: "Strategic Technical Advisory",
    lead: "Senior technical direction aligned directly with commercial milestones.",
    description:
      "We de-risk product investments before writing code. Comprehensive architecture blueprints, build-vs-buy evaluations, scope pruning, and Fractional CTO advisory for leadership teams.",
    deliverables: ["Technical Roadmaps", "Architecture Audits", "Cost Modeling", "Fractional CTO"],
  },
];

export default function AwwwardsServices() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
    trackClientEvent("cta_click", { cta_id: `toggle_service_${SERVICES[idx].num}` });
  };

  return (
    <section className="py-28 lg:py-40 px-4 sm:px-8 border-t border-white/5 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 mb-16 border-b border-white/10 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#7E8494] block mb-3">
              02 // CORE CAPABILITIES
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] text-[#F5F5F3]">
              What we engineer.
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#F5F5F3] hover:text-[#E30613] transition-colors"
          >
            <span>Detailed Capability Matrix</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Minimalist Typographic Accordion */}
        <div className="divide-y divide-white/10">
          {SERVICES.map((srv, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={srv.num} className="group py-8 sm:py-10 transition-colors">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-baseline justify-between text-left focus:outline-none"
                >
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span className="font-mono text-xs text-[#7E8494] group-hover:text-[#E30613] transition-colors">
                      {srv.num}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#F5F5F3] group-hover:text-white transition-colors">
                      {srv.title}
                    </h3>
                  </div>

                  <div className="p-2 rounded-full border border-white/10 text-[#7E8494] group-hover:text-white group-hover:border-white/30 transition-all">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Smooth Expandable Content */}
                {isOpen && (
                  <div className="pt-6 sm:pt-8 pl-8 sm:pl-16 grid grid-cols-1 md:grid-cols-12 gap-8 text-[#A0A5B0]">
                    <div className="md:col-span-7">
                      <p className="text-base sm:text-lg text-[#F5F5F3] font-medium leading-relaxed mb-4">
                        {srv.lead}
                      </p>
                      <p className="text-sm text-[#8E94A0] leading-relaxed">
                        {srv.description}
                      </p>
                    </div>

                    <div className="md:col-span-5">
                      <div className="text-[11px] font-mono uppercase tracking-widest text-[#7E8494] mb-3">
                        Key Deliverables
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {srv.deliverables.map((item, dIdx) => (
                          <span
                            key={dIdx}
                            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#F5F5F3]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
