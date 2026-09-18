import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-[#080808] text-[#F5F5F3] min-h-[80vh] flex items-center justify-center px-4 py-32">
      <div className="max-w-md w-full text-center space-y-6">
        <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-[0.2em] text-[#E30613]">
          HTTP 404 // NOT FOUND
        </span>

        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-[-0.04em] text-white">
          Route Missing.
        </h1>

        <p className="text-sm text-[#8E94A0] leading-relaxed">
          The requested coordinate does not map to an active architectural subsystem or resource on the SHAZWERK platform.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5F5F3] text-[#080808] text-xs font-mono uppercase font-bold tracking-wider hover:bg-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Core</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
