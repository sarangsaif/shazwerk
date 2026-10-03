"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();
  const isDe = language === "de";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@shazwerk.ch");
    setCopied(true);
    trackClientEvent("copy_email", { source: "footer" });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="bg-white border-t border-neutral-200 text-neutral-900 pt-20 pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Main Agency Statement / CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-neutral-200">
          <div className="lg:col-span-7">
            <span className="text-xs font-mono tracking-wider text-neutral-500 uppercase block mb-4">
              [ {isDe ? "05 / KONTAKT" : "05 / GET IN TOUCH"} ]
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-neutral-950 leading-[1.05] max-w-2xl">
              {isDe ? "Lassen Sie uns über Ihr Vorhaben sprechen." : "We would love to hear your ideas."}
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-neutral-600 font-normal leading-relaxed max-w-xl">
              {isDe
                ? "Wir begleiten ambitionierte Gründer, CTOs und etablierte Unternehmen in der Schweiz und DACH-Region bei der Entwicklung digitaler Hochleistungssysteme."
                : "We partner with ambitious founders, technology leaders, and established enterprises across Switzerland and Europe to build digital products that move the needle."}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between items-start lg:items-end gap-8">
            <div className="w-full sm:w-auto">
              {/* One-click email copy card */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 transition-all hover:border-neutral-400">
                <div className="text-xs font-mono text-neutral-500 mb-2">
                  {isDe ? "Direkter Kontakt" : "Direct Inquiries"}
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="group flex items-center gap-3 text-xl sm:text-2xl font-medium tracking-tight text-neutral-950 hover:text-red-600 transition-colors"
                >
                  <span>hello@shazwerk.ch</span>
                  <span className="p-1.5 rounded-lg bg-neutral-200/70 group-hover:bg-red-50 text-neutral-700 group-hover:text-red-600 transition-colors">
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </span>
                </button>
                <div className="mt-2 text-xs font-mono text-neutral-500">
                  {copied ? (
                    <span className="text-emerald-600 font-semibold">
                      {isDe ? "✓ In Zwischenablage kopiert!" : "✓ Copied to clipboard!"}
                    </span>
                  ) : (
                    isDe ? "Klicken zum Kopieren" : "Click to copy address"
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                onClick={() => trackClientEvent("cta_click", { location: "footer_button" })}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-neutral-950 text-white font-medium text-sm hover:bg-neutral-800 transition-colors shadow-sm"
              >
                <span>{isDe ? "Projekt unverbindlich anfragen" : "Tell us about your project"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Directory & Coordinates */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 py-16 border-b border-neutral-200 text-sm">
          {/* Navigation */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">
              {isDe ? "Navigation" : "Explore"}
            </div>
            <Link href="/work" className="text-neutral-700 hover:text-neutral-950 hover:underline transition-colors">
              {isDe ? "Ausgewählte Arbeiten" : "Selected Work"}
            </Link>
            <Link href="/services" className="text-neutral-700 hover:text-neutral-950 hover:underline transition-colors">
              {isDe ? "Leistungen & Stack" : "Capabilities & Services"}
            </Link>
            <Link href="/about" className="text-neutral-700 hover:text-neutral-950 hover:underline transition-colors">
              {isDe ? "Studio & Philosophie" : "Studio & Ethos"}
            </Link>
            <Link href="/contact" className="text-neutral-700 hover:text-neutral-950 hover:underline transition-colors">
              {isDe ? "Kontakt & Briefing" : "Contact & Inquiries"}
            </Link>
          </div>

          {/* Capabilities & SEO Landing Pages */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">
              {isDe ? "Schwerpunkte" : "Focus Areas"}
            </div>
            <Link href="/software-agentur-zuerich" className="text-neutral-700 hover:text-neutral-950 hover:underline transition-colors">
              Software Agentur Zürich
            </Link>
            <Link href="/webagentur-zuerich" className="text-neutral-700 hover:text-neutral-950 hover:underline transition-colors">
              Webagentur Zürich
            </Link>
            <Link href="/enterprise-ai-schweiz" className="text-neutral-700 hover:text-neutral-950 hover:underline transition-colors">
              Enterprise AI Schweiz
            </Link>
            <Link href="/services" className="text-neutral-700 hover:text-neutral-950 hover:underline transition-colors">
              Next.js & Cloud Stack
            </Link>
          </div>

          {/* Swiss Studio Locations */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">
              {isDe ? "Standorte" : "Locations"}
            </div>
            <div className="text-neutral-700 leading-relaxed font-mono text-xs">
              <span className="font-semibold block text-neutral-950">Zürich Studio</span>
              Gotthardstrasse 26<br />
              8002 Zürich, Switzerland<br />
              <span className="text-neutral-500">+41 44 820 90 10</span>
            </div>
            <div className="text-neutral-700 leading-relaxed font-mono text-xs mt-1">
              <span className="font-semibold block text-neutral-950">Zug Presence</span>
              Baarerstrasse 82<br />
              6300 Zug, Switzerland
            </div>
          </div>

          {/* Swiss Legal Registry */}
          <div className="lg:col-span-3 flex flex-col gap-3 font-mono text-xs">
            <div className="uppercase tracking-wider text-neutral-500 mb-1">
              {isDe ? "Schweizer Register" : "Swiss Registry"}
            </div>
            <div className="text-neutral-600 space-y-1">
              <div>UID: <span className="text-neutral-900 font-medium">CHE-419.820.104</span></div>
              <div>MWST: <span className="text-neutral-900 font-medium">CHE-419.820.104 MWST</span></div>
              <div>Rechtsform: <span className="text-neutral-900 font-medium">GmbH</span></div>
              <div className="pt-2 text-neutral-500">Kanton Zürich · Schweiz</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} SHAZWERK GmbH · Swiss Digital Engineering & AI Studio Zürich.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-neutral-900 hover:underline transition-colors">
              {isDe ? "Datenschutz (nDSG / DSGVO)" : "Privacy Policy (FADP / nDSG)"}
            </Link>
            <Link href="/imprint" className="hover:text-neutral-900 hover:underline transition-colors">
              Impressum
            </Link>
            <a href="/feed.xml" target="_blank" className="hover:text-neutral-900 hover:underline transition-colors">
              RSS Feed
            </a>
            <Link href="/admin/login" className="text-neutral-400 hover:text-neutral-600 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
