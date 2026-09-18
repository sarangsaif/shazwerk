import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Impressum (Legal Notice)",
  description: "Statutory Swiss Impressum and company details for SHAZWERK.",
};

export default function ImprintPage() {
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
            [ STATUTORY SWISS NOTICE // IMPRESSUM ]
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-neutral-950 leading-tight mb-4">
            Impressum
          </h1>
          <p className="text-xs font-mono text-neutral-500">
            Mandatory Swiss Impressum in accordance with Swiss Commercial Law & UWG Art. 3 Abs. 1 Bst. s.
          </p>
        </div>

        <div className="space-y-10 text-base text-neutral-700 leading-relaxed font-normal">
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-medium text-neutral-950 mb-4">Company Entity & Headquarters</h2>
            <div className="font-mono text-xs text-neutral-800 space-y-3">
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase">Corporate Entity</span>
                <span className="text-neutral-950 font-bold text-sm">SHAZWERK GmbH</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase">Registered Address</span>
                <span>Gotthardstrasse 26, 8002 Zürich, Switzerland</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase">Commercial Register & UID</span>
                <span>CHE-419.820.104</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase">VAT / MWST</span>
                <span>CHE-419.820.104 MWST</span>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-medium text-neutral-950 mb-4">Direct Studio Communication</h2>
            <div className="font-mono text-xs text-neutral-800 space-y-3">
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase">General Inquiries</span>
                <a href="mailto:hello@shazwerk.ch" className="text-neutral-950 hover:text-red-600 transition-colors">
                  hello@shazwerk.ch
                </a>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase">Technical & Project Briefs</span>
                <a href="mailto:contact@shazwerk.ch" className="text-neutral-950 hover:text-red-600 transition-colors">
                  contact@shazwerk.ch
                </a>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase">Telephone</span>
                <span>+41 44 820 90 10</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase">Website & Canonical Domain</span>
                <span>https://shazwerk.ch</span>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-medium text-neutral-950 mb-3">Disclaimer & Intellectual Property</h2>
            <p className="text-sm text-neutral-600">
              The contents of this website have been created with the utmost care. However, SHAZWERK assumes no liability for the correctness, completeness, or topicality of the information provided. All trademarks, software architectures, logos, and code samples are the intellectual property of SHAZWERK GmbH or their respective clients and are protected under Swiss and international copyright conventions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
