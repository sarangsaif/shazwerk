import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy (Datenschutzerklärung)",
  description:
    "Privacy Policy of SHAZWERK in accordance with the Swiss Federal Act on Data Protection (nDSG / FADP) and EU GDPR.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-[#E5E5E0] pb-8 mb-12">
          <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#6B7280] mb-2">
            LEGAL / COMPLIANCE
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0C0E11] tracking-tight mb-4">
            Privacy Policy (Datenschutzerklärung)
          </h1>
          <p className="text-xs font-mono text-[#6B7280]">
            Compliance standard: Swiss Federal Act on Data Protection (nDSG / FADP) & General Data Protection Regulation (EU GDPR).
            <br />
            Last updated: September 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-sm max-w-none text-[#374151] space-y-8 text-xs leading-relaxed font-sans">
          <section className="bg-[#FFFFFF] p-6 border border-[#E0E0DA]">
            <h2 className="text-base font-bold text-[#0C0E11] mb-2 font-mono uppercase tracking-wider">
              1. General Principles & Data Controller
            </h2>
            <p className="mb-2">
              SHAZWERK (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website{" "}
              <a href="https://shazwerk.ch" className="text-[#0C0E11] underline font-mono">
                https://shazwerk.ch
              </a>
              . We are committed to processing personal data responsibly, transparently, and in strict accordance with the Swiss Federal Act on Data Protection (nDSG) and applicable European data protection legislation.
            </p>
            <p>
              Responsible entity for data processing:
              <br />
              <span className="font-mono text-[#0C0E11] font-semibold">[LEGAL COMPANY NAME]</span>
              <br />
              <span className="font-mono">[REGISTERED ADDRESS]</span>
              <br />
              Switzerland
              <br />
              Contact: <a href="mailto:privacy@shazwerk.ch" className="text-[#E30613] font-mono font-semibold">[EMAIL] / privacy@shazwerk.ch</a>
            </p>
          </section>

          <section className="bg-[#FFFFFF] p-6 border border-[#E0E0DA]">
            <h2 className="text-base font-bold text-[#0C0E11] mb-2 font-mono uppercase tracking-wider">
              2. Privacy-Conscious Analytics (Zero-Cookie & No Fingerprinting)
            </h2>
            <p className="mb-2">
              We reject invasive third-party ad networks and cross-site tracking. Our site employs a privacy-first, first-party telemetry architecture:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>No persistent tracking cookies or cross-domain advertising identifiers are set.</li>
              <li>No browser canvas fingerprinting, battery status probing, or hardware profiling is conducted.</li>
              <li>IP addresses are processed ephemerally at the server edge solely to detect country origin for Swiss/DACH latency routing, and are never written to database storage.</li>
              <li>Aggregated metrics are limited to page view counts, broad device category (Desktop/Mobile), and general referral sources.</li>
            </ul>
          </section>

          <section className="bg-[#FFFFFF] p-6 border border-[#E0E0DA]">
            <h2 className="text-base font-bold text-[#0C0E11] mb-2 font-mono uppercase tracking-wider">
              3. Project Inquiry Submissions
            </h2>
            <p className="mb-2">
              When you submit a project brief or contact inquiry via our website, we collect the details you provide: your name, company name, email address, optional telephone number, project specifications, and message content.
            </p>
            <p>
              <strong>Purpose & Legal Basis:</strong> This data is processed exclusively to evaluate technical feasibility, respond to your inquiry, prepare bilateral non-disclosure agreements (NDAs), or negotiate software development contracts. We do not sell, rent, or monetize your contact information.
            </p>
          </section>

          <section className="bg-[#FFFFFF] p-6 border border-[#E0E0DA]">
            <h2 className="text-base font-bold text-[#0C0E11] mb-2 font-mono uppercase tracking-wider">
              4. Data Retention & Hosting Sovereignty
            </h2>
            <p className="mb-2">
              Our website infrastructure is hosted with modern, ISO/IEC 27001 certified cloud providers (Vercel edge network) with strict data isolation. Project inquiry records are retained only as long as necessary to fulfill commercial communication or statutory corporate accounting obligations under Swiss law (CO Art. 958f).
            </p>
          </section>

          <section className="bg-[#FFFFFF] p-6 border border-[#E0E0DA]">
            <h2 className="text-base font-bold text-[#0C0E11] mb-2 font-mono uppercase tracking-wider">
              5. Your Rights as a Data Subject
            </h2>
            <p className="mb-2">
              Under the Swiss Federal Act on Data Protection (nDSG) and EU GDPR, you are entitled to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Request information regarding personal data held about you (Right to Access).</li>
              <li>Request rectification of incorrect personal information.</li>
              <li>Request deletion or restriction of processing of your personal data, subject to statutory retention mandates.</li>
              <li>Revoke consent for future processing at any time.</li>
            </ul>
            <p className="mt-3">
              To exercise your statutory rights, please send an inquiry to <a href="mailto:privacy@shazwerk.ch" className="text-[#0C0E11] font-mono font-bold underline">privacy@shazwerk.ch</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
