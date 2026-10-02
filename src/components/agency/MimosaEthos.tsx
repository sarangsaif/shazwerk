"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Award, Shield, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MimosaEthos() {
  const { language } = useLanguage();
  const isDe = language === "de";

  return (
    <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-neutral-50/70 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-5">
            <div>
              <span className="text-xs font-mono tracking-wider text-neutral-500 uppercase block mb-3">
                [ {isDe ? "04 / PRINZIPIEN" : "04 / STUDIO ETHOS"} ]
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950 leading-[1.08]">
                {isDe ? "Schweizer Ingenieurskultur." : "Built on Swiss principles."}
              </h2>
            </div>

            <p className="text-neutral-600 text-sm leading-relaxed">
              {isDe
                ? "Gute Software ist wie eine Schweizer Uhr: Präzise gefertigt, langlebig konstruiert und verlässlich unter Spitzenlast."
                : "Great software is like fine Swiss watchmaking: quiet on the surface, meticulously engineered beneath, and built to operate flawlessly."}
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-900 hover:text-red-600 transition-colors"
              >
                <span>{isDe ? "Über unsere Philosophie" : "Learn about our philosophy"}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Clean Cards + 4 Metrics */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center mb-5 text-neutral-900">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-medium tracking-tight text-neutral-950 mb-2">
                    {isDe ? "Volle Datensouveränität" : "Full Data Sovereignty"}
                  </h3>
                  <p className="text-neutral-600 text-xs leading-relaxed">
                    {isDe
                      ? "Keine Kompromisse beim Datenschutz. Strikte nDSG- und DSGVO-Konformität in Schweizer Rechenzentren."
                      : "Zero compromises on data custody. Native Swiss FADP/nDSG compliance with zero unauthorized telemetry."}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-neutral-100 text-[11px] font-mono text-neutral-500">
                  {isDe ? "Schweizer Cloud · Air-Gapped" : "Swiss Cloud · Air-Gapped"}
                </div>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center mb-5 text-neutral-900">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-medium tracking-tight text-neutral-950 mb-2">
                    {isDe ? "Extreme Performance" : "Extreme Performance"}
                  </h3>
                  <p className="text-neutral-600 text-xs leading-relaxed">
                    {isDe
                      ? "Sub-Sekunden Ladezeiten, schlanke Bundles und kompromisslose Optimierung für geschäftskritische Tools."
                      : "Sub-second response times, lean bundles, and zero unnecessary dependencies for mission-critical apps."}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-neutral-100 text-[11px] font-mono text-neutral-500">
                  Sub-50ms · 60fps UI
                </div>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center mb-5 text-neutral-900">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-medium tracking-tight text-neutral-950 mb-2">
                    {isDe ? "Senior Engineering Pods" : "Senior Engineering Pods"}
                  </h3>
                  <p className="text-neutral-600 text-xs leading-relaxed">
                    {isDe
                      ? "Direkter Austausch mit den Architekten, die Ihren Code schreiben. Kein Outsourcing an Subunternehmer."
                      : "Direct interface with principal architects who write your production code. Zero third-party outsourcing."}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-neutral-100 text-[11px] font-mono text-neutral-500">
                  {isDe ? "Kein Outsourcing · Direktkontakt" : "Zero Outsourcing · Direct Access"}
                </div>
              </div>
            </div>

            {/* Metrics Bar */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-7">
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-4">
                {isDe ? "Verifizierte Qualitäts-Metriken" : "Verified Quality Benchmarks"}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                <div>
                  <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-950 mb-0.5">
                    99.99%
                  </div>
                  <div className="text-xs text-neutral-600">{isDe ? "Verfügbarkeit in Produktion" : "Production uptime"}</div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-950 mb-0.5">
                    100%
                  </div>
                  <div className="text-xs text-neutral-600">{isDe ? "Quellcode- & IP-Übergabe" : "IP & source transfer"}</div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-950 mb-0.5">
                    &lt; 50ms
                  </div>
                  <div className="text-xs text-neutral-600">{isDe ? "Telemetrie-Latenz" : "Telemetry latency"}</div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-950 mb-0.5">
                    4–8 Wo.
                  </div>
                  <div className="text-xs text-neutral-600">{isDe ? "Durchschnittliche MVP-Dauer" : "Average MVP delivery"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
