"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { BarChart3, Download, FileText, Inbox, LogOut, Menu, MousePointerClick, Settings, Users, X } from "lucide-react";
import type { Stats } from "@/lib/stats";
import { Clicks, Overview, Visitors } from "./Analytics";
import { EmailSettingsForm, Inquiries } from "./Inquiries";
import ContentEditor from "./ContentEditor";

type Section = "overview" | "visitors" | "clicks" | "inquiries" | "content" | "settings";

const NAV: { key: Section; label: string; icon: React.ElementType }[] = [
  { key: "overview", label: "Übersicht", icon: BarChart3 },
  { key: "visitors", label: "Besucher & Wege", icon: Users },
  { key: "clicks", label: "Klicks", icon: MousePointerClick },
  { key: "inquiries", label: "Anfragen", icon: Inbox },
  { key: "content", label: "Inhalte bearbeiten", icon: FileText },
  { key: "settings", label: "Einstellungen", icon: Settings },
];

const RANGES = [
  { days: 1, label: "24 Std." },
  { days: 7, label: "7 Tage" },
  { days: 30, label: "30 Tage" },
  { days: 90, label: "90 Tage" },
];

export default function AdminPortal({ storeBackend }: { storeBackend: "redis" | "file" }) {
  const [section, setSection] = useState<Section>("overview");
  const [days, setDays] = useState(30);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [newInquiries, setNewInquiries] = useState(0);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.slice(1) as Section;
    if (NAV.some((n) => n.key === hash)) setSection(hash);
  }, []);

  const go = (s: Section) => {
    setSection(s);
    setNavOpen(false);
    history.replaceState(null, "", `#${s}`);
  };

  const loadStats = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/stats?days=${days}`, { cache: "no-store" });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const d = await res.json();
      setStats(d.stats);
      setError("");
    } catch {
      setError("Statistik konnte nicht geladen werden.");
    }
  }, [days]);

  useEffect(() => {
    loadStats();
    // Refresh while the tab is visible (keeps database usage low)
    const id = setInterval(() => document.visibilityState === "visible" && loadStats(), 60000);
    return () => clearInterval(id);
  }, [loadStats]);

  // Keep the inquiry badge current even when another section is open
  const countInquiries = useCallback((n: number) => setNewInquiries(n), []);
  useEffect(() => {
    fetch("/api/admin/submissions", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setNewInquiries((d.submissions || []).filter((s: { status: string }) => s.status === "new").length))
      .catch(() => {});
  }, []);

  const logout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.href = "/admin/login";
  };

  const showRange = ["overview", "visitors", "clicks"].includes(section);
  const current = NAV.find((n) => n.key === section)!;

  return (
    <div className="min-h-screen bg-paper text-ink lg:grid lg:grid-cols-[240px_1fr]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-ink text-paper transition-transform lg:sticky lg:top-0 lg:h-screen lg:w-auto lg:translate-x-0 ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-5">
          <div className="mb-10 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-[-0.04em]">
              SHAZWERK <span className="inline-block h-2 w-2 bg-swiss-red" />
            </Link>
            <button type="button" className="lg:hidden" onClick={() => setNavOpen(false)} aria-label="Menü schliessen">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 space-y-1" aria-label="Admin">
            {NAV.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => go(key)}
                aria-current={section === key ? "page" : undefined}
                className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors ${
                  section === key ? "bg-paper text-ink" : "text-paper/70 hover:bg-paper/10 hover:text-paper"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1">{label}</span>
                {key === "inquiries" && newInquiries > 0 && (
                  <span className="bg-swiss-red px-1.5 text-[11px] text-white">{newInquiries}</span>
                )}
                {key === "visitors" && stats && stats.totals.live > 0 && (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {stats.totals.live}
                  </span>
                )}
              </button>
            ))}
          </nav>
          <div className="space-y-1 border-t border-paper/15 pt-4 text-sm">
            <a href="/api/admin/export" className="flex items-center gap-3 px-3 py-2 text-paper/70 hover:text-paper">
              <Download className="h-4 w-4" /> Rohdaten (CSV)
            </a>
            <button type="button" onClick={logout} className="flex w-full items-center gap-3 px-3 py-2 text-paper/70 hover:text-paper">
              <LogOut className="h-4 w-4" /> Abmelden
            </button>
          </div>
        </div>
      </aside>
      {navOpen && <div className="fixed inset-0 z-20 bg-ink/40 lg:hidden" onClick={() => setNavOpen(false)} aria-hidden="true" />}

      <div className="min-w-0 px-4 pb-16 sm:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4 py-6">
          <div className="flex items-center gap-3">
            <button type="button" className="lg:hidden" onClick={() => setNavOpen(true)} aria-label="Menü öffnen">
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="font-display text-3xl font-medium tracking-[-0.03em]">{current.label}</h1>
          </div>
          {showRange && (
            <div className="flex items-center gap-3">
              <div className="flex border border-ink/15 bg-white">
                {RANGES.map((r) => (
                  <button
                    key={r.days}
                    type="button"
                    onClick={() => setDays(r.days)}
                    className={`px-3 py-1.5 text-sm ${days === r.days ? "bg-ink text-paper" : ""}`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              <button type="button" onClick={loadStats} className="eyebrow hidden text-stone-muted hover:text-ink sm:inline">Live · ↻ Aktualisieren</button>
            </div>
          )}
        </header>

        {storeBackend === "file" && (
          <div role="alert" className="mb-6 border-l-4 border-swiss-red bg-white p-4 text-sm">
            <strong>Keine dauerhafte Datenbank verbunden.</strong> Besuche, Anfragen und Inhalte werden nur temporär
            gespeichert und gehen auf Vercel verloren. Verbinden Sie in Vercel → Storage eine kostenlose{" "}
            <em>Upstash Redis</em>-Datenbank mit diesem Projekt und deployen Sie neu.
          </div>
        )}
        {error && <p className="mb-6 text-sm text-swiss-red">{error}</p>}

        {showRange && !stats && <p className="text-sm text-stone-muted">Lade Statistik …</p>}
        {section === "overview" && stats && <Overview stats={stats} />}
        {section === "visitors" && stats && <Visitors stats={stats} />}
        {section === "clicks" && stats && <Clicks stats={stats} />}
        {section === "inquiries" && <Inquiries onCount={countInquiries} />}
        {section === "content" && <ContentEditor />}
        {section === "settings" && <EmailSettingsForm />}
      </div>
    </div>
  );
}
