"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] text-[#F5F5F3] pt-24 pb-12 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-20">
          <div className="md:col-span-6">
            <div className="text-xs font-mono uppercase tracking-[0.16em] text-[#7E8494] mb-4">
              SHAZWERK // SWITZERLAND
            </div>
            <p className="text-xl sm:text-2xl text-[#D1D5DB] font-normal leading-relaxed max-w-lg">
              Digital products, software platforms, and machine intelligence engineered with Swiss architectural precision.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-mono uppercase tracking-[0.16em] text-[#7E8494] mb-4">
              Navigation
            </div>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <Link href="/work" className="hover:text-white transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Capabilities
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Studio Ethos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors text-[#E30613] font-medium">
                  Start an Inquiry &rarr;
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-mono uppercase tracking-[0.16em] text-[#7E8494] mb-4">
              Direct Contact
            </div>
            <a
              href="mailto:contact@shazwerk.ch"
              onClick={() => trackClientEvent("cta_click", { cta_id: "footer_mailto" })}
              className="inline-flex items-center gap-1.5 text-base font-mono text-[#F5F5F3] hover:text-[#E30613] transition-colors"
            >
              <span>contact@shazwerk.ch</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <div className="mt-4 text-xs font-mono text-[#7E8494]">
              Zurich, Switzerland
              <br />
              CET / CEST Timezone
            </div>
          </div>
        </div>

        {/* Monumental Brand Typography */}
        <div className="border-t border-b border-white/5 py-8 my-8 select-none">
          <div className="font-sans font-extrabold text-[15vw] leading-[0.82] tracking-[-0.06em] text-[#141518] hover:text-[#1A1C21] transition-colors duration-500 text-center uppercase">
            SHAZWERK
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#7E8494] gap-4">
          <div className="flex items-center gap-3">
            <span>&copy; {currentYear} SHAZWERK</span>
            <span>·</span>
            <span>47.3769° N, 8.5417° E</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/imprint" className="hover:text-[#F5F5F3] transition-colors">
              Imprint
            </Link>
            <Link href="/privacy" className="hover:text-[#F5F5F3] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/admin/login" className="hover:text-[#F5F5F3] opacity-30 hover:opacity-100 transition-opacity">
              Console
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
