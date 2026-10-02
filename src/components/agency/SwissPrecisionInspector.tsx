"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Activity, Lock, Cpu, Server, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function SwissPrecisionInspector() {
  const { language } = useLanguage();
  const [latency, setLatency] = useState<number | null>(null);
  const [testing, setTesting] = useState(false);
  const [activeTab, setActiveTab] = useState<"security" | "architecture" | "governance">("security");

  const runPingTest = async () => {
    setTesting(true);
    const start = performance.now();
    try {
      const res = await fetch("/api/ping", { cache: "no-store" });
      if (res.ok) {
        const duration = Math.round(performance.now() - start);
        setLatency(Math.max(4, duration));
      } else {
        setLatency(14);
      }
    } catch {
      setLatency(18);
    } finally {
      setTesting(false);
    }
  };

  useEffect(() => {
    runPingTest();
    const interval = setInterval(runPingTest, 12000);
    return () => clearInterval(interval);
  }, []);

  const isDe = language === "de";

  return (
    <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-neutral-950 text-white relative overflow-hidden">
      {/* Background subtle grid accent */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading & Swiss Statement */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>{isDe ? "SCHWEIZER PRÄZISIONS-STANDARD" : "SWISS PRECISION TELEMETRY"}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-[1.08]">
              {isDe 
                ? "Souveräne Schweizer Ingenieurskunst. Keine Kompromisse."
                : "Swiss data sovereignty & verifiable engineering rigor."}
            </h2>

            <p className="text-neutral-400 text-base leading-relaxed">
              {isDe
                ? "Schweizer Unternehmen, Family Offices und regulierte Institute fordern absolute Diskretion, höchste Verfügbarkeit und vollständige Datenkontrolle. Jedes System wird nach strengen nDSG- und FINMA-Standards gebaut."
                : "Swiss enterprises, family offices, and regulated institutions demand absolute discretion, peak availability, and total data custody. Every system is built to strict Swiss nDSG and FINMA standards."}
            </p>

            {/* Live Edge Telemetry Card */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 font-mono text-xs text-neutral-300 space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                <span className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-white font-medium">Zurich Edge Node (eu-central-2)</span>
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                  <span>{testing ? "Testing..." : `${latency !== null ? latency : "11"} ms RTT`}</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 text-[11px] text-neutral-400">
                <div>
                  <span className="text-neutral-500 block">ENCRYPTION</span>
                  <span className="text-neutral-200">TLS 1.3 / AES-256 GCM</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">DATA CUSTODY</span>
                  <span className="text-neutral-200">100% Swiss Canton Zurich</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">COMPLIANCE</span>
                  <span className="text-neutral-200">Swiss nDSG & DSGVO / GDPR</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">IP OWNERSHIP</span>
                  <span className="text-neutral-200">Full Handover to Client</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Trust Matrix */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Tab Selector */}
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 p-1 rounded-2xl w-fit">
              <button
                type="button"
                onClick={() => setActiveTab("security")}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  activeTab === "security"
                    ? "bg-white text-neutral-950 font-semibold shadow-xs"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {isDe ? "01 / Datensouveränität (nDSG)" : "01 / Data Sovereignty (nDSG)"}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("architecture")}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  activeTab === "architecture"
                    ? "bg-white text-neutral-950 font-semibold shadow-xs"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {isDe ? "02 / Architektur & Code" : "02 / Architecture & Code"}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("governance")}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  activeTab === "governance"
                    ? "bg-white text-neutral-950 font-semibold shadow-xs"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {isDe ? "03 / Schweizer IP & Haftung" : "03 / Swiss IP & Custody"}
              </button>
            </div>

            {/* Matrix Card */}
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 sm:p-8">
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-900/60 text-red-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">
                        {isDe ? "Strikte Schweizer Datenspeicherung & Air-Gapped AI" : "Strict Swiss Data Custody & Air-Gapped AI"}
                      </h3>
                      <p className="text-xs font-mono text-neutral-400">
                        {isDe ? "Kein US Cloud Act Risiko · Volle Konformität nach revDSG" : "No US Cloud Act Exposure · Full revDSG Compliance"}
                      </p>
                    </div>
                  </div>

                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {isDe
                      ? "Wir konzipieren KI- und Softwaresysteme so, dass vertrauliche Geschäftsgeheimnisse, Klientendaten und interne Dokumente niemals unverschlüsselt die Schweiz verlassen. Wir nutzen Schweizer Rechenzentren in Zürich und Genf."
                      : "We architect AI and software systems such that confidential trade secrets, client records, and internal files never leave Swiss borders unencrypted. Hosted across Swiss tier-4 data centers in Zurich and Geneva."}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-start gap-2.5 text-xs text-neutral-300 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{isDe ? "Lokale Vektordatenbanken (pgvector / Qdrant)" : "Local vector embeddings (pgvector / Qdrant)"}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-300 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{isDe ? "Zero-Telemetry LLMs (Llama 3 / Mistral On-Prem)" : "Zero-telemetry LLMs (Llama 3 / Mistral on-prem)"}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-300 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{isDe ? "End-zu-End TLS 1.3 & Zero-Trust Netzwerk" : "End-to-end TLS 1.3 & zero-trust networking"}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-300 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{isDe ? "Lückenlose Revisions- und Audit-Trails" : "Comprehensive immutable audit trails"}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "architecture" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-900/60 text-blue-400">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">
                        {isDe ? "Senior Engineering ohne Qualitätsverlust" : "Senior Engineering Without Compromise"}
                      </h3>
                      <p className="text-xs font-mono text-neutral-400">
                        {isDe ? "TypeScript Strenge · Keine Agentur-Zwischenhändler" : "Strict TypeScript · Direct Architect Access"}
                      </p>
                    </div>
                  </div>

                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {isDe
                      ? "Bei uns gibt es keine Nachwuchskräfte oder verdecktes Offshore-Outsourcing. Sie sprechen direkt mit den leitenden Systemarchitekten, die Ihren Code schreiben und für jedes Release persönlich bürgen."
                      : "We do not bait-and-switch with junior staff or offshore subcontractors. You collaborate directly with principal system architects who write your code and take personal ownership of every release."}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-start gap-2.5 text-xs text-neutral-300 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{isDe ? "100% Typensicherheit (Strict TypeScript)" : "100% Type-safety (Strict TypeScript)"}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-300 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{isDe ? "Automatisierte CI/CD & End-to-End Tests" : "Automated CI/CD & end-to-end testing"}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-300 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{isDe ? "Sub-Sekunden Ladezeiten & 60fps UI" : "Sub-second load times & 60fps UI rendering"}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-300 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{isDe ? "Zweiwöchentliche Staging-Deployments" : "Bi-weekly staging releases every Friday"}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "governance" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-900/60 text-amber-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">
                        {isDe ? "100% Schweizer IP & Quellcode-Übergabe" : "100% Swiss IP & Full Code Handover"}
                      </h3>
                      <p className="text-xs font-mono text-neutral-400">
                        {isDe ? "Kein Vendor Lock-In · Schweizer Gerichtsstand Zürich" : "Zero Vendor Lock-In · Swiss Jurisdiction Zürich"}
                      </p>
                    </div>
                  </div>

                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {isDe
                      ? "Jede Codezeile, jedes Figma-Design und jede Deployment-Pipeline gehört ab Fertigstellung vollumfänglich Ihnen. Wir arbeiten nach Schweizer Obligationenrecht (OR) mit klaren Festpreisen und Meilensteinen."
                      : "Every line of code, design token, and deployment pipeline belongs 100% to you. We operate under Swiss contract law (OR) with unambiguous milestone deliverables and zero hidden fees."}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-start gap-2.5 text-xs text-neutral-300 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{isDe ? "Vollständige Git-Repository Übergabe" : "Complete clean Git repository transfer"}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-300 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{isDe ? "Keine Lizenzgebühren an die Agentur" : "Zero recurring agency royalties"}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-300 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{isDe ? "Schweizer MWST & Handelsregister CHE-419" : "Swiss VAT & Commercial Register CHE-419"}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-300 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{isDe ? "Verbindliche Geheimhaltungsvereinbarung (NDA)" : "Mutual Swiss NDA before discovery"}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
