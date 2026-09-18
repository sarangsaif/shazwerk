"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0C0E11] text-[#FAFAF8] border-t border-[#1F242D] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#1F242D]">
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#FAFAF8] text-[#0C0E11] flex items-center justify-center font-mono font-bold text-xs tracking-tight">
                  <span className="text-[#E30613] mr-0.5">/</span>S
                </div>
                <span className="font-sans font-extrabold text-xl tracking-[-0.03em] text-[#FAFAF8]">
                  SHAZWERK
                </span>
              </div>
              <p className="text-sm text-[#9CA3AF] max-w-sm leading-relaxed mb-6">
                Digital products, software and AI systems engineered for real business. Grounded in Swiss precision, modern architecture, and uncompromising technical execution.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#161920] border border-[#262C36] text-[11px] font-mono text-[#D1D5DB]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E30613]"></span>
                <span>ZURICH · BASEL · GENEVA · DACH</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1A1F27] text-[12px] font-mono text-[#6B7280]">
              <div>COORDINATES: 47.3769° N, 8.5417° E</div>
              <div className="mt-1">CURRENCY: CHF (SWISS FRANCS)</div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#6B7280] mb-5">
              Capabilities
            </h4>
            <ul className="space-y-3 text-sm text-[#D1D5DB]">
              <li>
                <Link href="/services#digital-products" className="hover:text-white transition-colors">
                  Digital Products
                </Link>
              </li>
              <li>
                <Link href="/services#software-dev" className="hover:text-white transition-colors">
                  Software Engineering
                </Link>
              </li>
              <li>
                <Link href="/services#ai-automation" className="hover:text-white transition-colors">
                  AI & Workflow Automation
                </Link>
              </li>
              <li>
                <Link href="/services#ux-ui" className="hover:text-white transition-colors">
                  UX / UI Architecture
                </Link>
              </li>
              <li>
                <Link href="/services#product-strategy" className="hover:text-white transition-colors">
                  Product Strategy
                </Link>
              </li>
              <li>
                <Link href="/services#continuous-dev" className="hover:text-white transition-colors">
                  Continuous Delivery
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#6B7280] mb-5">
              Studio
            </h4>
            <ul className="space-y-3 text-sm text-[#D1D5DB]">
              <li>
                <Link href="/work" className="hover:text-white transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About SHAZWERK
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors text-[#E30613] font-medium">
                  Start a Project &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Inquiries */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#6B7280] mb-5">
              Direct Channel
            </h4>
            <p className="text-xs text-[#9CA3AF] mb-3 leading-relaxed">
              For initial project consultations and technical briefings:
            </p>
            <a
              href="mailto:contact@shazwerk.ch"
              onClick={() => trackClientEvent("cta_click", { cta_id: "footer_mailto" })}
              className="inline-flex items-center gap-1.5 text-xs text-[#FAFAF8] font-mono hover:text-[#E30613] transition-colors"
            >
              <span>contact@shazwerk.ch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <div className="mt-6">
              <span className="text-[11px] font-mono text-[#6B7280] block">RESPONSE TIME</span>
              <span className="text-xs text-[#D1D5DB]">&le; 24 Business Hours</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7280] font-mono gap-4">
          <div className="flex items-center gap-4">
            <span>&copy; {currentYear} SHAZWERK. All rights reserved.</span>
            <span>·</span>
            <span>Switzerland</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/imprint" className="hover:text-[#FAFAF8] transition-colors">
              Imprint / Impressum
            </Link>
            <Link href="/privacy" className="hover:text-[#FAFAF8] transition-colors">
              Privacy Policy (nDSG)
            </Link>
            <Link href="/admin/login" className="hover:text-[#FAFAF8] transition-colors opacity-40 hover:opacity-100" title="Studio Admin">
              Console
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
