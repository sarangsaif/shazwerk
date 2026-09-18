import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy (Datenschutzerklärung)",
  description:
    "Privacy Policy of SHAZWERK in accordance with the Swiss Federal Act on Data Protection (nDSG / FADP) and EU GDPR.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white text-neutral-900 min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-950 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Studio</span>
          </Link>
        </div>

        <div className="pb-12 mb-12 border-b border-neutral-200">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-3">
            [ COMPLIANCE // SWISS FADP & GDPR ]
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-neutral-950 leading-tight mb-4">
            Datenschutzerklärung (Privacy Policy)
          </h1>
          <p className="text-xs font-mono text-neutral-500">
            Swiss Federal Act on Data Protection (nDSG / FADP) & European GDPR standard. Updated: September 2026.
          </p>
        </div>

        <div className="space-y-10 text-base text-neutral-700 leading-relaxed font-normal">
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-medium text-neutral-950 mb-3">1. Data Controller</h2>
            <p className="mb-3">
              SHAZWERK operates <span className="font-mono text-neutral-900">https://shazwerk.ch</span> and <span className="font-mono text-neutral-900">https://www.shazwerk.ch</span>. We process personal data responsibly, transparently, and in strict accordance with the Swiss Federal Act on Data Protection (nDSG / FADP) and European GDPR.
            </p>
            <div className="font-mono text-xs text-neutral-600 space-y-1">
              <div>SHAZWERK GmbH</div>
              <div>Gotthardstrasse 26 · 8002 Zürich, Switzerland</div>
              <div>Contact: privacy@shazwerk.ch · +41 44 820 90 10</div>
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-medium text-neutral-950 mb-3">
              2. Privacy-Conscious Telemetry (Zero-Cookie & No Fingerprinting)
            </h2>
            <p className="mb-3">
              We reject invasive tracking networks. Our website employs a first-party, zero-cookie telemetry architecture:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-neutral-600">
              <li>No persistent tracking cookies or cross-site ad identifiers are stored on your device.</li>
              <li>No canvas fingerprinting, battery profiling, or device probing.</li>
              <li>IP addresses are processed ephemerally at the server edge solely for regional routing, and are never written to database storage.</li>
              <li>Aggregated metrics are limited to broad device categories, page views, and direct referrers.</li>
            </ul>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-medium text-neutral-950 mb-3">3. Project Inquiries & Your Rights</h2>
            <p className="text-sm text-neutral-600">
              Inquiry data submitted through our contact form is used solely to evaluate technical feasibility and prepare bilateral non-disclosure agreements or commercial proposals. You maintain complete statutory rights to access, rectification, and deletion of your data under Swiss law by emailing <span className="font-mono text-neutral-900">privacy@shazwerk.ch</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
