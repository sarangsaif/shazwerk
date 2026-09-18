"use client";

import React from "react";
import { Shield, Target, Users, Code2, Clock } from "lucide-react";

const VALUES = [
  {
    num: "01",
    title: "Swiss Client Focus",
    desc: "Direct communication aligned with Swiss business hours, high standards of accountability, data privacy awareness (FADP / nDSG), and cultural context.",
    icon: Shield,
  },
  {
    num: "02",
    title: "Product-First Thinking",
    desc: "We don't merely write tickets; we challenge product assumptions, prune unnecessary scope, and ensure features translate into actual commercial utility.",
    icon: Target,
  },
  {
    num: "03",
    title: "Senior Design & Coordination",
    desc: "Direct access to senior practitioners. No junior handoffs, no bloated account management layers, and zero friction in technical decision making.",
    icon: Users,
  },
  {
    num: "04",
    title: "Modern Engineering",
    desc: "Type-safe architectures, robust testing, maintainable repositories, and automated CI/CD pipelines. Systems built for long-term production resilience.",
    icon: Code2,
  },
  {
    num: "05",
    title: "Long-Term Partnership",
    desc: "We stand behind what we deploy. Providing continuous evolution, security patching, and proactive architectural scaling as your business expands.",
    icon: Clock,
  },
];

export default function WhyShazwerk() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAFAF8] border-b border-[#E5E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E5E5E0]">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#6B7280] mb-2">
              05 / CORE PRINCIPLES & VALUES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0C0E11]">
              Why SHAZWERK.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-[#4B5563] max-w-md font-mono">
            Understated confidence, senior craftsmanship, and zero tolerance for technical compromises.
          </p>
        </div>

        {/* 5-Item Swiss Precision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className={`p-7 bg-[#FFFFFF] border border-[#E0E0DA] hover:border-[#0C0E11] transition-all duration-200 flex flex-col justify-between ${
                  idx === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 bg-[#FAFAF8] border border-[#E5E5E0] flex items-center justify-center text-[#0C0E11]">
                      <Icon className="w-5 h-5 text-[#0C0E11]" />
                    </div>
                    <span className="font-mono text-xs text-[#E30613] font-bold">
                      {item.num}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0C0E11] mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#4B5563] leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0F0EB] text-[10px] font-mono uppercase text-[#9CA3AF]">
                  Standard // Swiss Operational Rigor
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
