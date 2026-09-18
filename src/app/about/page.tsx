import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, Shield, Award, Zap, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "About SHAZWERK — Studio Philosophy & Standards",
  description:
    "SHAZWERK is a Swiss digital engineering studio focused on turning complex commercial requirements into intuitive, resilient technology.",
};

export default function AboutPage() {
  return (
    <div className="bg-white text-neutral-900 min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-16">
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
            [ STUDIO & ETHOS ]
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-neutral-950 leading-[1.05] max-w-4xl">
            Engineering digital products with Swiss precision and creative audacity.
          </h1>
          <p className="mt-6 text-xl text-neutral-600 max-w-2xl font-normal leading-relaxed">
            SHAZWERK is an independent software and AI studio based in Zürich and Zug. We bridge the gap between strategic design and complex systems engineering for companies moving from concept to market reality.
          </p>
        </div>

        {/* 2-Column Story Sections */}
        <div className="py-16 space-y-16">
          {/* Section 01 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-neutral-200">
            <div className="lg:col-span-4">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-2">
                01 / THE CONVICTION
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950">
                Software as high-precision craft.
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-5 text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
              <p>
                We believe that software engineering should mirror the timeless values of Swiss industrial design: functional clarity, understated confidence, and zero tolerance for superficial vanity metrics.
              </p>
              <p>
                Too many agencies build bloated prototypes that collapse the moment real production data hits the database. At SHAZWERK, we design from day one for operational scale, sub-second latency, and complete data ownership.
              </p>
            </div>
          </div>

          {/* Section 02 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-neutral-200">
            <div className="lg:col-span-4">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-2">
                02 / SENIOR ENGINEERING PODS
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950">
                No junior hand-offs or bureaucracy.
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-5 text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
              <p>
                Legacy consultancies sell you a partner and then hand off your project to inexperienced junior developers behind an opaque curtain of project managers.
              </p>
              <p>
                We run as small, lethal pods composed exclusively of senior software architects, full-stack engineers, and interface designers. You speak directly with the makers architecting your platform every single week.
              </p>
            </div>
          </div>

          {/* Section 03 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-neutral-200">
            <div className="lg:col-span-4">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-2">
                03 / DATA SOVEREIGNTY
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950">
                Swiss data confidentiality by design.
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-5 text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
              <p>
                Switzerland’s reputation for institutional privacy is not accidental. We take data sovereignty seriously: private cloud infrastructure, air-gapped LLMs, localized embeddings, and full compliance with the revised Swiss Federal Act on Data Protection (FADP / nDSG) and European GDPR.
              </p>
              <p>
                Your proprietary business logic and client records remain strictly within designated jurisdictions.
              </p>
            </div>
          </div>
        </div>

        {/* Principles Grid */}
        <div className="pt-8 pb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-3">
            [ GUIDING PRINCIPLES ]
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-950 mb-10">
            What Governs Every Line of Code
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8">
              <span className="text-xs font-mono text-neutral-400 block mb-3">01</span>
              <h3 className="text-xl font-medium text-neutral-950 mb-2">Honesty in Architecture</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                We never recommend complex microservices when a monolithic Next.js architecture delivers faster, cheaper, and more reliable outcomes for your current business stage.
              </p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8">
              <span className="text-xs font-mono text-neutral-400 block mb-3">02</span>
              <h3 className="text-xl font-medium text-neutral-950 mb-2">Zero Vendor Lock-In</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                You own 100% of your source code, deployment scripts, and intellectual property. No closed proprietary CMS platforms or hostage agreements.
              </p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8">
              <span className="text-xs font-mono text-neutral-400 block mb-3">03</span>
              <h3 className="text-xl font-medium text-neutral-950 mb-2">Performance as a Feature</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Every UI interaction should feel instantaneous. We budget milliseconds aggressively across database queries, network payloads, and DOM paint cycles.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-2">
              Ready to start a collaboration?
            </h3>
            <p className="text-neutral-400 text-sm max-w-lg">
              Let&apos;s discuss your engineering goals and outline how our team can support your product roadmap.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-neutral-950 font-medium text-sm hover:bg-neutral-100 transition-colors shrink-0"
          >
            <span>Start a conversation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
