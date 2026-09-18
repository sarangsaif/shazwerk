import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-white text-neutral-900 min-h-[80vh] flex items-center justify-center px-6 py-32">
      <div className="max-w-md w-full text-center space-y-6">
        <span className="inline-block px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-600">
          [ 404 // NOT FOUND ]
        </span>

        <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-neutral-950">
          Page Not Found
        </h1>

        <p className="text-base text-neutral-600 leading-relaxed font-normal">
          The requested address does not exist or has been relocated to another part of the studio archive.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-950 text-white text-xs font-mono font-medium hover:bg-neutral-800 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Studio Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
