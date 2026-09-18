"use client";

import React, { useState } from "react";
import { Terminal, Database, Server, Smartphone, Cpu, Workflow, Check, Activity } from "lucide-react";

const CATEGORIES = [
  { id: "web-apps", label: "Web Applications", icon: Terminal },
  { id: "business-platforms", label: "Business Platforms", icon: Server },
  { id: "ai-interfaces", label: "AI Interfaces", icon: Cpu },
  { id: "internal-tools", label: "Internal Tools", icon: Database },
  { id: "automated-workflows", label: "Automated Workflows", icon: Workflow },
  { id: "mobile-products", label: "Mobile Products", icon: Smartphone },
];

export default function WhatWeBuild() {
  const [activeTab, setActiveTab] = useState("web-apps");

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAF8] border-b border-[#E5E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E5E5E0]">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#6B7280] mb-2">
              03 / INTERFACE & SYSTEM ARTIFACTS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0C0E11]">
              What we build.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-[#4B5563] max-w-md font-mono">
            Living product interfaces engineered for operational clarity, low latency, and zero cognitive clutter.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[#E0E0DA] pb-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono tracking-wide transition-all ${
                  isActive
                    ? "bg-[#0C0E11] text-[#FAFAF8] font-semibold"
                    : "bg-[#FFFFFF] text-[#4B5563] hover:text-[#0C0E11] hover:bg-[#EFEFEA] border border-[#E0E0DA]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#E30613]" : "text-[#9CA3AF]"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interface Canvas Container */}
        <div className="bg-[#0C0E11] text-[#FAFAF8] border border-[#262C36] p-4 sm:p-8 relative overflow-hidden shadow-2xl">
          {/* OS Window Top Bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1F242D] text-xs font-mono text-[#9CA3AF]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E30613]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#374151]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#374151]"></span>
              <span className="ml-3 text-white font-semibold">
                SYSTEM://SHAZWERK/{activeTab.toUpperCase()}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1 text-[#10B981]">
                <Activity className="w-3.5 h-3.5" />
                <span>LATENCY: 1.8ms</span>
              </span>
              <span>ENVIRONMENT: PROD-CH</span>
            </div>
          </div>

          {/* Dynamic Content Views */}
          {activeTab === "web-apps" && (
            <div className="space-y-6">
              {/* Metric bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#14181F] p-4 border border-[#262C36]">
                <div>
                  <div className="text-[10px] font-mono text-[#9CA3AF] uppercase">Monthly Volume</div>
                  <div className="text-xl font-bold font-mono text-white mt-0.5">CHF 4,892,100</div>
                  <div className="text-[10px] text-[#10B981] font-mono mt-0.5">+14.2% vs prev quarter</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#9CA3AF] uppercase">Throughput</div>
                  <div className="text-xl font-bold font-mono text-white mt-0.5">14,200 req/s</div>
                  <div className="text-[10px] text-[#9CA3AF] font-mono mt-0.5">Zero drop rate</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#9CA3AF] uppercase">Database Replication</div>
                  <div className="text-xl font-bold font-mono text-[#10B981] mt-0.5">Synchronous</div>
                  <div className="text-[10px] text-[#9CA3AF] font-mono mt-0.5">Zurich & Frankfurt</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#9CA3AF] uppercase">Availability SLA</div>
                  <div className="text-xl font-bold font-mono text-white mt-0.5">99.992%</div>
                  <div className="text-[10px] text-[#10B981] font-mono mt-0.5">Exceeds contract</div>
                </div>
              </div>

              {/* Data Table Preview */}
              <div className="bg-[#14181F] border border-[#262C36] overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="border-b border-[#262C36] text-[#9CA3AF] text-[10px] uppercase">
                    <tr>
                      <th className="p-3">Transaction Ref</th>
                      <th className="p-3">Counterparty / Tenant</th>
                      <th className="p-3">Value</th>
                      <th className="p-3">Settlement</th>
                      <th className="p-3">Audit Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F242D] text-[#D1D5DB]">
                    <tr>
                      <td className="p-3 text-white font-semibold">TX-CH-89210</td>
                      <td className="p-3">Swiss Alpine Asset Management</td>
                      <td className="p-3 font-semibold text-white">CHF 840,000.00</td>
                      <td className="p-3 text-[#10B981]">&bull; Cleared (Instant)</td>
                      <td className="p-3 text-[#9CA3AF]">SHA256: 9b2d...f41a</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">TX-CH-89211</td>
                      <td className="p-3">Helvetia Logistics Holding</td>
                      <td className="p-3 font-semibold text-white">CHF 125,400.00</td>
                      <td className="p-3 text-[#10B981]">&bull; Cleared (Instant)</td>
                      <td className="p-3 text-[#9CA3AF]">SHA256: 41ae...90c2</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white font-semibold">TX-CH-89212</td>
                      <td className="p-3">Vaud BioTech AG</td>
                      <td className="p-3 font-semibold text-white">CHF 310,950.00</td>
                      <td className="p-3 text-[#F59E0B]">&bull; In Queue (Batch 4)</td>
                      <td className="p-3 text-[#9CA3AF]">Pending Sign-Off</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "business-platforms" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#14181F] border border-[#262C36]">
                  <div className="text-[10px] font-mono text-[#9CA3AF]">ORGANIZATIONAL HIERARCHY</div>
                  <div className="text-sm font-bold text-white mt-1">Multi-Entity Governance</div>
                  <p className="text-xs text-[#9CA3AF] mt-2">
                    Unified permission trees covering 14 cantonal subsidiaries with strict data residency.
                  </p>
                </div>
                <div className="p-4 bg-[#14181F] border border-[#262C36]">
                  <div className="text-[10px] font-mono text-[#9CA3AF]">FINANCIAL RECONCILIATION</div>
                  <div className="text-sm font-bold text-white mt-1">Automated Ledger Feeds</div>
                  <p className="text-xs text-[#9CA3AF] mt-2">
                    Continuous matching against Swiss banking APIs (EBICS / ISO 20022 standard).
                  </p>
                </div>
                <div className="p-4 bg-[#14181F] border border-[#262C36]">
                  <div className="text-[10px] font-mono text-[#9CA3AF]">COMPLIANCE ENGINE</div>
                  <div className="text-sm font-bold text-white mt-1">nDSG / FADP Compliance</div>
                  <p className="text-xs text-[#9CA3AF] mt-2">
                    Cryptographic audit logs with automated data retention and export controllers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ai-interfaces" && (
            <div className="space-y-4 font-mono text-xs">
              <div className="bg-[#14181F] border border-[#262C36] p-4">
                <div className="flex items-center justify-between text-[#9CA3AF] text-[10px] pb-2 border-b border-[#262C36]">
                  <span>AI INFERENCE CONSOLE — RAG HYBRID ENGINE</span>
                  <span>CONFIDENCE: 98.4%</span>
                </div>
                <div className="mt-3 text-[#FAFAF8]">
                  <span className="text-[#E30613]">&gt; Query:</span> Analyze quarterly inventory discrepancy in canton Zurich hub...
                </div>
                <div className="mt-3 p-3 bg-[#0C0E11] border border-[#1F242D] text-[#D1D5DB] space-y-2">
                  <div className="text-[#10B981] text-[11px] font-semibold">
                    Synthesized Analysis (3 Verified Sources):
                  </div>
                  <p className="text-xs leading-relaxed">
                    Identified a 4.2% discrepancy localized to Warehouse ZRH-03 during the August 14 barcode cutover. 18 SKUs were logged under obsolete customs tariff codes. All batches quarantined pending export authorization.
                  </p>
                  <div className="flex gap-2 pt-2 text-[10px] text-[#9CA3AF]">
                    <span className="px-2 py-0.5 bg-[#1F242D] text-[#FAFAF8]">Source: ERP Ledger #401</span>
                    <span className="px-2 py-0.5 bg-[#1F242D] text-[#FAFAF8]">Source: ZRH-03 Scanner Log</span>
                    <span className="px-2 py-0.5 bg-[#1F242D] text-[#FAFAF8]">Latency: 310ms</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "internal-tools" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#14181F] border border-[#262C36] p-4">
                <div className="text-[10px] font-mono text-[#9CA3AF] mb-1">OPERATIONS DISPATCH</div>
                <div className="text-sm font-bold text-white mb-3">Service Dispatch Grid</div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between p-2 bg-[#0C0E11] border border-[#262C36]">
                    <span>Zurich Tech Squad #1</span>
                    <span className="text-[#10B981]">On-Site (St. Gallen)</span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#0C0E11] border border-[#262C36]">
                    <span>Basel Infrastructure Squad</span>
                    <span className="text-[#3B82F6]">Standby</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#14181F] border border-[#262C36] p-4">
                <div className="text-[10px] font-mono text-[#9CA3AF] mb-1">DATA PIPELINE STATUS</div>
                <div className="text-sm font-bold text-white mb-3">Sync Health & ETL Queues</div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between p-2 bg-[#0C0E11] border border-[#262C36]">
                    <span>SAP S/4HANA Connector</span>
                    <span className="text-[#10B981]">Active (0 errors)</span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#0C0E11] border border-[#262C36]">
                    <span>Swisscom IoT Broker</span>
                    <span className="text-[#10B981]">Streaming 4.2k evt/s</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "automated-workflows" && (
            <div className="bg-[#14181F] border border-[#262C36] p-5 font-mono text-xs">
              <div className="text-[10px] text-[#9CA3AF] mb-3">DAG WORKFLOW ORCHESTRATION</div>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="p-3 bg-[#0C0E11] border border-[#262C36] w-full sm:w-auto text-center">
                  <div className="text-[#9CA3AF] text-[10px]">EVENT TRIGGER</div>
                  <div className="text-white font-semibold">New Invoice Upload</div>
                </div>
                <span className="text-[#E30613] font-bold">&rarr;</span>
                <div className="p-3 bg-[#0C0E11] border border-[#262C36] w-full sm:w-auto text-center">
                  <div className="text-[#9CA3AF] text-[10px]">OCR & EXTRACTION</div>
                  <div className="text-white font-semibold">Vision Parser</div>
                </div>
                <span className="text-[#E30613] font-bold">&rarr;</span>
                <div className="p-3 bg-[#0C0E11] border border-[#262C36] w-full sm:w-auto text-center">
                  <div className="text-[#9CA3AF] text-[10px]">VERIFICATION</div>
                  <div className="text-white font-semibold">IBAN & QR Match</div>
                </div>
                <span className="text-[#E30613] font-bold">&rarr;</span>
                <div className="p-3 bg-[#0C0E11] border border-[#10B981] w-full sm:w-auto text-center">
                  <div className="text-[#10B981] text-[10px]">SETTLEMENT</div>
                  <div className="text-white font-semibold">ERP Execution</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "mobile-products" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#14181F] border border-[#262C36] p-4 font-mono text-xs">
                <div className="text-[10px] text-[#9CA3AF] mb-1">FIELD APPLICATION</div>
                <div className="text-sm font-bold text-white mb-2">Offline-First Mobile Client</div>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Engineered with SQLite local sync, biometric FaceID / TouchID authorization, and instantaneous background synchronization when reconnected to network.
                </p>
              </div>
              <div className="bg-[#14181F] border border-[#262C36] p-4 font-mono text-xs">
                <div className="text-[10px] text-[#9CA3AF] mb-1">EXECUTIVE COCKPIT</div>
                <div className="text-sm font-bold text-white mb-2">Real-Time Mobile Telemetry</div>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  High-frequency financial metrics, approval workflows, and immediate push notifications for critical threshold breaches.
                </p>
              </div>
            </div>
          )}

          {/* Interface Card Bottom Specs */}
          <div className="mt-6 pt-4 border-t border-[#1F242D] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#6B7280]">
            <div>ARCHITECTURE: Modular Microfrontends / Type-Safe REST & WebSocket Bus</div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></span>
              <span className="text-[#D1D5DB]">Production Grade</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
