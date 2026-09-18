"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowRight, AlertCircle, ArrowLeft, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Authentication failed. Invalid master password.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center px-6 py-24 text-neutral-900">
      <div className="max-w-md w-full">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-950 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to public website</span>
          </Link>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 sm:p-10 shadow-sm">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-200">
            <div className="flex items-center gap-2.5">
              <span className="font-semibold text-base tracking-tight text-neutral-950">
                shazwerk
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              <span className="text-xs font-mono text-neutral-400">/ admin</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-neutral-200 text-[11px] font-mono text-neutral-700">
              Staff Portal
            </span>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-medium tracking-tight text-neutral-950 mb-2">
              Studio Admin Console
            </h1>
            <p className="text-xs text-neutral-600 leading-relaxed font-mono">
              Access project briefs, triage incoming client queries, manage traffic telemetry, and configure email notifications.
            </p>
          </div>

          {error && (
            <div className="p-3.5 mb-6 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2.5 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-2">
                Console Passphrase
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-xs font-mono text-neutral-950 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-950"
                />
                <Lock className="w-4 h-4 text-neutral-400 absolute right-3.5 top-3.5" />
              </div>
              <p className="text-[11px] text-neutral-500 font-mono mt-1.5">
                Default: <code className="text-neutral-800 bg-neutral-200/70 px-1 py-0.5 rounded">shazwerk2026!admin</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-mono uppercase font-semibold tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-xs"
            >
              <span>{loading ? "Authenticating..." : "Unlock Studio Console"}</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Session: 7 Days TLS 1.3</span>
            </span>
            <span>Zurich Data Center</span>
          </div>
        </div>
      </div>
    </div>
  );
}
