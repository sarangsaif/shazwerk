"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, AlertCircle } from "lucide-react";

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
        throw new Error(data.error || "Authentication failed.");
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
    <div className="bg-[#FAFAF8] min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-sm w-full bg-[#FFFFFF] border border-[#E0E0DA] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 bg-[#0C0E11] text-[#FAFAF8] flex items-center justify-center font-mono text-xs font-bold">
            <span className="text-[#E30613] mr-0.5">/</span>S
          </div>
          <span className="font-sans font-extrabold text-sm tracking-tight text-[#0C0E11]">
            SHAZWERK STUDIO CONSOLE
          </span>
        </div>

        <div className="text-[11px] font-mono text-[#6B7280] mb-6 pb-3 border-b border-[#F0F0EB]">
          RESTRICTED ACCESS // INTERNAL TRIAGE & TELEMETRY
        </div>

        {error && (
          <div className="p-3 mb-4 bg-[#FEF2F2] border border-[#F87171] text-xs text-[#B91C1C] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#0C0E11] font-semibold mb-1.5">
              Passphrase
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full px-3.5 py-2.5 bg-[#FAFAF8] border border-[#D5D5CF] focus:border-[#0C0E11] text-xs font-mono text-[#0C0E11] outline-none"
              />
              <Lock className="w-3.5 h-3.5 text-[#9CA3AF] absolute right-3 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#0C0E11] hover:bg-[#1F242D] text-[#FAFAF8] text-xs font-mono uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? "Authenticating..." : "Access Console"}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E30613]" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#F0F0EB] text-[10px] font-mono text-[#9CA3AF] text-center">
          Default session security: 7 days · TLS 1.3
        </div>
      </div>
    </div>
  );
}
