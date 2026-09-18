"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Award, CheckCircle, Shield, Zap } from "lucide-react";

export default function MimosaEthos() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-neutral-50/70 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Sticky Section Marker */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">
              <div>
                <span className="text-xs font-mono tracking-wider text-neutral-500 uppercase block mb-3">
                  [ 04 / STUDIO ETHOS ]
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950 leading-[1.1]">
                  Built on Swiss principles.
                </h2>
              </div>

              <p className="text-neutral-600 text-base leading-relaxed">
                We believe great software is like fine Swiss watchmaking: quiet on the surface, meticulously engineered beneath, and built to operate flawlessly under pressure.
              </p>

              <div className="pt-4 border-t border-neutral-200">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-900 hover:text-red-600 transition-colors"
                >
                  <span>Learn about our engineering philosophy</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Ethos Cards & Proof Points */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Principles Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mb-6 text-neutral-900">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-medium tracking-tight text-neutral-950 mb-3">
                    Absolute Data Sovereignty
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    Zero compromises on data custody. We design systems that adhere natively to the Swiss Federal Act on Data Protection (FADP / nDSG) and strict European GDPR regulations.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-100 text-xs font-mono text-neutral-500">
                  Swiss-Hosted · Air-Gapped
                </div>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mb-6 text-neutral-900">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-medium tracking-tight text-neutral-950 mb-3">
                    Extreme Performance
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    Sub-second query responses, optimized rendering bundles, and zero unnecessary dependencies. Every millisecond of latency eliminated protects user focus and trust.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-100 text-xs font-mono text-neutral-500">
                  Sub-50ms Telemetry · 60fps UI
                </div>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mb-6 text-neutral-900">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-medium tracking-tight text-neutral-950 mb-3">
                    Senior Engineering Pods
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    No bait-and-switch. You interface directly with senior system architects and product designers who possess deep technical ownership over your codebase.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-100 text-xs font-mono text-neutral-500">
                  Zero Outsourcing · Direct Access
                </div>
              </div>
            </div>

            {/* Metrics Counter Bar */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-10">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-6">
                Verified Performance Benchmarks
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 mb-1">
                    99.99%
                  </div>
                  <div className="text-xs text-neutral-600">Production Uptime across client deployments</div>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 mb-1">
                    100%
                  </div>
                  <div className="text-xs text-neutral-600">Swiss IP transfer & source code handover</div>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 mb-1">
                    CHF 8.4M+
                  </div>
                  <div className="text-xs text-neutral-600">Daily transaction volume securely processed</div>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 mb-1">
                    &lt; 4 Weeks
                  </div>
                  <div className="text-xs text-neutral-600">Average time to initial working prototype</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
