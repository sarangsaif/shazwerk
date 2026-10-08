"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Anmeldung fehlgeschlagen.");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Anmeldung fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-4 text-paper">
      <form onSubmit={submit} className="w-full max-w-sm space-y-8">
        <div className="flex items-center gap-2 font-display text-lg font-semibold tracking-[-0.04em]">
          SHAZWERK <span className="inline-block h-2 w-2 bg-swiss-red" />
          <span className="eyebrow ml-2 text-paper/60">Admin</span>
        </div>
        <h1 className="font-display text-4xl font-medium tracking-[-0.03em]">Anmelden</h1>
        <div>
          <label htmlFor="admin-username" className="eyebrow mb-2 block text-paper/60">
            Benutzername
          </label>
          <input
            id="admin-username"
            type="text"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            required
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border-0 border-b border-paper/30 bg-transparent px-0 py-3 text-xl text-paper focus:border-paper focus:outline-none focus:ring-0"
          />
        </div>
        <div>
          <label htmlFor="admin-password" className="eyebrow mb-2 block text-paper/60">
            Passwort
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-0 border-b border-paper/30 bg-transparent px-0 py-3 text-xl text-paper focus:border-paper focus:outline-none focus:ring-0"
          />
        </div>
        {error && (
          <p role="alert" className="border-l-2 border-swiss-red pl-3 text-sm text-paper/80">
            {error}
          </p>
        )}
        <button type="submit" disabled={loading} className="btn btn-red w-full justify-center disabled:opacity-50">
          {loading ? "Prüfe …" : "Weiter"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </main>
  );
}
