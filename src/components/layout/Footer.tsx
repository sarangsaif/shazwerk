"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Copy, Check, ExternalLink } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

export default function Footer() {
  const [copied, setCopied] = useState(false);

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
              [ 05 / GET IN TOUCH ]
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-neutral-950 leading-[1.05] max-w-2xl">
              We would love to hear your ideas.
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-neutral-600 font-normal leading-relaxed max-w-xl">
              We partner with ambitious founders, technology leaders, and established enterprises across Switzerland and Europe to build digital products that move the needle.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between items-start lg:items-end gap-8">
            <div className="w-full sm:w-auto">
              {/* One-click email copy card */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 transition-all hover:border-neutral-400">
                <div className="text-xs font-mono text-neutral-500 mb-2">Direct Inquiries</div>
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
                    <span className="text-emerald-600 font-semibold">✓ Copied to clipboard!</span>
                  ) : (
                    "Click to copy address"
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
                <span>Tell us about your project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Directory & Coordinates */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 py-16 border-b border-neutral-200 text-sm">
          {/* Navigation */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">Explore</div>
            <Link href="/work" className="text-neutral-700 hover:text-neutral-950 hover:underline transition-colors">
              Selected Work
            </Link>
            <Link href="/services" className="text-neutral-700 hover:text-neutral-950 hover:underline transition-colors">
              Capabilities & Services
            </Link>
            <Link href="/about" className="text-neutral-700 hover:text-neutral-950 hover:underline transition-colors">
              Studio & Ethos
            </Link>
            <Link href="/contact" className="text-neutral-700 hover:text-neutral-950 hover:underline transition-colors">
              Contact & Inquiries
            </Link>
          </div>

          {/* Capabilities */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">Capabilities</div>
            <span className="text-neutral-600">Digital Product Engineering</span>
            <span className="text-neutral-600">Enterprise AI & Private LLMs</span>
            <span className="text-neutral-600">Cloud Infrastructure & DevOps</span>
            <span className="text-neutral-600">Design Systems & Motion</span>
          </div>

          {/* Swiss Studio Locations */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">Locations</div>
            <div className="text-neutral-700 leading-relaxed">
              <span className="font-semibold block text-neutral-900">Zürich Studio</span>
              Gotthardstrasse 26<br />
              8002 Zürich, Switzerland
            </div>
            <div className="text-neutral-700 leading-relaxed mt-2">
              <span className="font-semibold block text-neutral-900">Zug Presence</span>
              Baarerstrasse 82<br />
              6300 Zug, Switzerland
            </div>
          </div>

          {/* Connect & Social */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">Network</div>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-neutral-700 hover:text-neutral-950 hover:underline transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-neutral-700 hover:text-neutral-950 hover:underline transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-neutral-700 hover:text-neutral-950 hover:underline transition-colors"
            >
              <span>X (Twitter)</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} SHAZWERK GmbH · Swiss Digital Engineering & AI Studio.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-neutral-900 hover:underline transition-colors">
              Privacy Policy (FADP / nDSG)
            </Link>
            <Link href="/imprint" className="hover:text-neutral-900 hover:underline transition-colors">
              Impressum
            </Link>
            <Link href="/admin/login" className="text-neutral-400 hover:text-neutral-600 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
