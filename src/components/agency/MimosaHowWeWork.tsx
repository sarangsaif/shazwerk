"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

interface FaqItem {
  question: string;
  answer: string;
  badge?: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How do you tackle new projects?",
    answer:
      "Every engagement begins with an intensive Technical & Product Discovery phase (typically 5 to 7 days). We examine your existing architecture, compliance boundaries, and business objectives. We then produce an unambiguous technical blueprint, interactive architecture diagram, and fixed milestone roadmap before writing a single line of production code.",
    badge: "Discovery & Plan",
  },
  {
    question: "What does a typical project timeline look like?",
    answer:
      "Most core systems and minimum testable products (MVPs) ship within 4 to 8 weeks through iterative bi-weekly sprint cycles. Enterprise systems or multi-modal AI integrations usually range between 8 to 16 weeks with staging deployments accessible to your team every Friday.",
    badge: "4 – 12 Weeks",
  },
  {
    question: "How do you handle revisions, feedback & quality assurance?",
    answer:
      "You have direct access to the senior engineers building your platform via dedicated Slack / Teams channels and private staging environments. Every sprint includes automated end-to-end integration tests, static code analysis, and interactive review checkpoints.",
    badge: "Continuous QA",
  },
  {
    question: "Do you work on fixed-scope projects or dedicated retainers?",
    answer:
      "Both. For greenfield digital products with defined objectives, we operate on milestone-based fixed-budget sprints (no surprise invoices). For ongoing product evolution, dedicated AI development, and mission-critical operations, we embed dedicated senior engineering pods on monthly retained capacity.",
    badge: "Flexible Terms",
  },
  {
    question: "How do you ensure Swiss data residency and compliance (FADP / nDSG)?",
    answer:
      "All architectures can be deployed natively within Swiss-based data centers (such as AWS Europe Zurich region or Exoscale Zurich/Geneva). We configure zero-trust networking, encrypted data at rest/transit, and enforce strict air-gapped private LLM inference so your proprietary data never leaks across foreign borders.",
    badge: "Swiss Sovereign",
  },
  {
    question: "What is handed over upon project completion?",
    answer:
      "100% full intellectual property (IP) transfer. You receive clean, fully documented TypeScript source code repositories, automated CI/CD deployment configurations, database migration scripts, environment variables checklists, and interactive technical documentation. Zero vendor lock-in.",
    badge: "100% IP Ownership",
  },
];

export default function MimosaHowWeWork() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    const next = openIndex === index ? null : index;
    setOpenIndex(next);
    trackClientEvent("faq_toggle", { questionIndex: index });
  };

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Sticky Section Marker */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">
              <div>
                <span className="text-xs font-mono tracking-wider text-neutral-500 uppercase block mb-3">
                  [ 03 / HOW WE WORK ]
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950 leading-[1.1]">
                  Clarity before code.
                </h2>
              </div>

              <p className="text-neutral-600 text-base leading-relaxed">
                We eliminate the ambiguity of traditional agencies. Fast iteration, complete code transparency, and direct communication with the engineers building your system.
              </p>

              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs font-mono space-y-2 text-neutral-700">
                <div className="font-semibold text-neutral-950 uppercase tracking-wider">
                  The SHAZWERK Guarantee
                </div>
                <div>• Bi-weekly staging deployments</div>
                <div>• 100% Swiss IP & source handover</div>
                <div>• No junior hand-offs or outsourcing</div>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion FAQ Cards */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`border rounded-2xl transition-all ${
                    isOpen
                      ? "bg-neutral-50/80 border-neutral-400/80 shadow-xs"
                      : "bg-white border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between text-left gap-4"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="text-xs font-mono text-neutral-400">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </span>
                      <span className="text-lg sm:text-xl font-medium tracking-tight text-neutral-950">
                        {item.question}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {item.badge && (
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-neutral-200/70 text-neutral-700">
                          {item.badge}
                        </span>
                      )}
                      <div className="p-1.5 rounded-full bg-neutral-100 text-neutral-800">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 text-neutral-700 text-base leading-relaxed border-t border-neutral-200/60 font-normal">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
