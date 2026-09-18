"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Cpu, Layers, Server, Sparkles, Check } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  technologies: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: "digital-products",
    number: "01",
    title: "Digital Product Engineering",
    subtitle: "From architecture to production-grade software",
    description:
      "We design and build bespoke web platforms, consumer digital products, and high-load internal tools with obsessive attention to speed, type safety, and maintainable software architecture.",
    deliverables: [
      "Custom full-stack web applications & portals",
      "High-throughput real-time dashboards & analytics",
      "Robust REST & GraphQL API infrastructure",
      "Scalable database modeling & schema migrations",
    ],
    technologies: ["Next.js 14", "React 18", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: "enterprise-ai",
    number: "02",
    title: "Enterprise AI & Private LLMs",
    subtitle: "Domain-specific AI with zero telemetry leakage",
    description:
      "We deploy domain-tailored Large Language Models, specialized retrieval-augmented generation (RAG) pipelines, and intelligent workflow automation designed around Swiss data confidentiality.",
    deliverables: [
      "Private air-gapped LLM deployment in Swiss data centers",
      "Enterprise document intelligence & semantic search",
      "Multi-agent workflow automation & copilot systems",
      "Model evaluation, latency optimization & fine-tuning",
    ],
    technologies: ["Llama 3", "Mistral", "LangChain", "Qdrant / pgvector", "Python", "Ollama"],
  },
  {
    id: "cloud-reliability",
    number: "03",
    title: "Cloud Architecture & Swiss Residency",
    subtitle: "Resilient infrastructure built for zero downtime",
    description:
      "Infrastructure engineered to withstand critical peak loads with uncompromising Swiss banking-grade security, automated CI/CD pipelines, and verifiable data sovereignty.",
    deliverables: [
      "Zero-trust cloud infrastructure & Kubernetes clusters",
      "Swiss data residency compliance (nDSG / FADP / GDPR)",
      "Automated zero-downtime deployment pipelines",
      "Real-time distributed telemetry, logging & alerting",
    ],
    technologies: ["AWS (Zurich)", "Exoscale", "Docker / K8s", "Terraform", "PostgreSQL", "Redis"],
  },
  {
    id: "design-systems",
    number: "04",
    title: "Design Systems & Interface Craft",
    subtitle: "Awwwards-grade aesthetic meets functional utility",
    description:
      "We shape digital brands that stand out in crowded markets. Modern editorial typography, intuitive interaction models, and unified design token systems that engineer trust at first glance.",
    deliverables: [
      "Complete UI/UX system design & interactive prototypes",
      "Atomic design token architecture & component libraries",
      "Fluid micro-animations & responsive ergonomics",
      "Comprehensive design guideline documentation",
    ],
    technologies: ["Figma", "CSS Tokens", "Modern Typography", "Micro-Interactions", "WCAG 2.1 AA"],
  },
];

export default function MimosaServices() {
  const [activeService, setActiveService] = useState<string>("digital-products");

  return (
    <section id="capabilities" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-neutral-50/70 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Sticky Section Marker */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">
              <div>
                <span className="text-xs font-mono tracking-wider text-neutral-500 uppercase block mb-3">
                  [ 02 / WHAT WE DO ]
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950 leading-[1.1]">
                  Disciplines & capabilities.
                </h2>
              </div>

              <p className="text-neutral-600 text-base leading-relaxed">
                We do not believe in superficial solutions. We assemble dedicated, senior engineering pods focused on technical depth, rock-solid reliability, and tangible commercial impact.
              </p>

              <div className="pt-4 border-t border-neutral-200">
                <Link
                  href="/services"
                  onClick={() => trackClientEvent("nav_click", { destination: "services_page" })}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-900 hover:text-red-600 transition-colors"
                >
                  <span>Explore full service matrix</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Service Cards */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 md:p-10 transition-all hover:border-neutral-400/80 shadow-xs"
              >
                <div className="flex items-center justify-between gap-4 pb-6 border-b border-neutral-100 text-xs font-mono">
                  <span className="text-neutral-400 font-medium">DISCIPLINE {service.number}</span>
                  <span className="text-neutral-500">{service.subtitle}</span>
                </div>

                <div className="pt-6">
                  <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-neutral-700 text-base sm:text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-neutral-100">
                  <div>
                    <span className="text-xs font-mono uppercase text-neutral-400 block mb-3">
                      Core Deliverables
                    </span>
                    <ul className="space-y-2.5">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-800">
                          <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase text-neutral-400 block mb-3">
                      Technologies & Standards
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 text-xs font-mono"
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
        </div>
      </div>
    </section>
  );
}
