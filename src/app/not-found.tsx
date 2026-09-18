import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-[#FAFAF8] min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full border border-[#E0E0DA] bg-[#FFFFFF] p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] text-center">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#FEF2F2] border border-[#FCA5A5] text-[#E30613] font-mono text-xs font-bold mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E30613]"></span>
          <span>HTTP ERROR 404 // ROUTE NOT FOUND</span>
        </div>

        <h1 className="text-3xl font-extrabold text-[#0C0E11] tracking-tight mb-3">
          System Endpoint Missing
        </h1>
        <p className="text-xs text-[#6B7280] leading-relaxed mb-8">
          The requested coordinate does not map to an active architectural subsystem or published resource on the SHAZWERK platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center font-mono text-xs">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0C0E11] text-[#FAFAF8] font-bold uppercase tracking-wider hover:bg-[#1F242D] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Core</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-transparent text-[#0C0E11] border border-[#D5D5CF] font-bold uppercase tracking-wider hover:bg-[#F4F4F0] transition-colors"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-[#F0F0EB] text-[10px] font-mono text-[#9CA3AF]">
          DNS: SHAZWERK.CH · STATUS: UNRESOLVED PATH
        </div>
      </div>
    </div>
  );
}
