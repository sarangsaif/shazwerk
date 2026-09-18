import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy (Datenschutzerklärung)",
  description:
    "Privacy Policy of SHAZWERK in accordance with the Swiss Federal Act on Data Protection (nDSG / FADP) and EU GDPR.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#080808] text-[#F5F5F3] min-h-screen pt-32 pb-28 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="pb-12 mb-16 border-b border-white/10">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#7E8494] block mb-4">
            COMPLIANCE // SWISS FADP & GDPR
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] text-[#F5F5F3] leading-[1] mb-6">
            Datenschutzerklärung (Privacy Policy)
          </h1>
          <p className="text-xs font-mono text-[#7E8494]">
            Swiss Federal Act on Data Protection (nDSG) & EU GDPR standard. Last updated: September 2026.
          </p>
        </div>

        <div className="space-y-12 text-sm text-[#8E94A0] leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-white mb-3">1. Data Controller</h2>
            <p className="mb-2">
              SHAZWERK operates <span className="text-white font-mono">https://shazwerk.ch</span>. We process personal data responsibly, transparently, and in strict accordance with the Swiss Federal Act on Data Protection (nDSG) and European GDPR.
            </p>
            <div className="font-mono text-xs text-[#D1D5DB] mt-2 space-y-1">
              <div>[LEGAL COMPANY NAME]</div>
              <div>[REGISTERED ADDRESS], Switzerland</div>
              <div>Contact: [EMAIL] / privacy@shazwerk.ch</div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">2. Privacy-Conscious Telemetry (Zero-Cookie & No Fingerprinting)</h2>
            <p className="mb-2">
              We reject invasive tracking networks. Our website employs a first-party, zero-cookie telemetry architecture:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>No persistent tracking cookies or cross-site ad identifiers are stored.</li>
              <li>No canvas fingerprinting, battery profiling, or device probing.</li>
              <li>IP addresses are processed ephemerally at the server edge solely for regional routing, and are never written to database storage.</li>
              <li>Aggregated metrics are limited to broad device category, page views, and general referrers.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">3. Project Inquiries & Rights</h2>
            <p>
              Inquiry data submitted through our contact form is used solely to evaluate technical feasibility and prepare bilateral non-disclosure agreements or commercial proposals. You maintain complete statutory rights to access, rectification, and deletion of your data under Swiss law by emailing <span className="text-white font-mono">privacy@shazwerk.ch</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
