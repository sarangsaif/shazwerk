import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum (Legal Notice)",
  description: "Statutory Swiss Impressum and company details for SHAZWERK.",
};

export default function ImprintPage() {
  return (
    <div className="bg-[#080808] text-[#F5F5F3] min-h-screen pt-32 pb-28 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="pb-12 mb-16 border-b border-white/10">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#7E8494] block mb-4">
            LEGAL NOTICE // IMPRESSUM
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] text-[#F5F5F3] leading-[1] mb-6">
            Impressum
          </h1>
          <p className="text-xs font-mono text-[#7E8494]">
            Statutory Swiss Impressum in accordance with Swiss Commercial Law & UWG Art. 3 Abs. 1 Bst. s.
          </p>
        </div>

        <div className="space-y-12 text-sm text-[#8E94A0] leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Company Details</h2>
            <div className="font-mono text-xs text-[#D1D5DB] space-y-2">
              <div>
                <span className="text-[#7E8494] block text-[10px] uppercase">Corporate Entity</span>
                <span className="text-white font-bold text-sm">[LEGAL COMPANY NAME]</span>
              </div>
              <div>
                <span className="text-[#7E8494] block text-[10px] uppercase">Registered Address</span>
                <span>[REGISTERED ADDRESS], Switzerland</span>
              </div>
              <div>
                <span className="text-[#7E8494] block text-[10px] uppercase">Company Identification (UID)</span>
                <span>[UID/VAT NUMBER]</span>
              </div>
              <div>
                <span className="text-[#7E8494] block text-[10px] uppercase">VAT / MWST</span>
                <span>[UID/VAT NUMBER] MWST</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">Direct Communication</h2>
            <div className="font-mono text-xs text-[#D1D5DB] space-y-2">
              <div>
                <span className="text-[#7E8494] block text-[10px] uppercase">Email</span>
                <a href="mailto:contact@shazwerk.ch" className="text-white hover:text-[#E30613] transition-colors">
                  [EMAIL] / contact@shazwerk.ch
                </a>
              </div>
              <div>
                <span className="text-[#7E8494] block text-[10px] uppercase">Domain</span>
                <span>https://shazwerk.ch</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">Disclaimer & Intellectual Property</h2>
            <p className="text-xs leading-relaxed">
              All contents, system architecture diagrams, and interface designs on this website are protected under Swiss and international copyright laws. Reproduction of any components requires prior written authorization from SHAZWERK.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
