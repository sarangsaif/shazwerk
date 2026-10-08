"use client";

import React from "react";

export function Panel({
  title,
  action,
  children,
  className = "",
}: {
  title?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`min-w-0 border border-ink/10 bg-white ${className}`}>
      {(title || action) && (
        <header className="flex items-center justify-between gap-4 border-b border-ink/10 px-5 py-3">
          {title && <h2 className="eyebrow text-stone-muted">{title}</h2>}
          {action}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function Kpi({ label, value, hint, accent = false }: { label: string; value: React.ReactNode; hint?: string; accent?: boolean }) {
  return (
    <div className={`min-w-0 border border-ink/10 p-5 ${accent ? "bg-ink text-paper" : "bg-white"}`}>
      <p className={`eyebrow ${accent ? "text-paper/60" : "text-stone-muted"}`}>{label}</p>
      <p className="mt-3 font-display text-4xl font-medium tabular-nums tracking-[-0.03em]">{value}</p>
      {hint && <p className={`mt-1 text-xs ${accent ? "text-paper/60" : "text-stone-muted"}`}>{hint}</p>}
    </div>
  );
}

/** Horizontal bar list for ranked counts. */
export function BarList({ rows, empty = "Noch keine Daten", format }: { rows: { key: string; count: number }[]; empty?: string; format?: (k: string) => React.ReactNode }) {
  if (!rows.length) return <p className="text-sm text-stone-muted">{empty}</p>;
  const max = Math.max(...rows.map((r) => r.count));
  return (
    <ul className="space-y-1.5">
      {rows.map((r) => (
        <li key={r.key} className="relative flex items-center justify-between gap-3 px-2 py-1.5 text-sm">
          <span className="absolute inset-y-0 left-0 bg-swiss-red/10" style={{ width: `${(r.count / max) * 100}%` }} aria-hidden="true" />
          <span className="relative min-w-0 truncate">{format ? format(r.key) : r.key}</span>
          <span className="relative font-mono text-xs tabular-nums">{r.count}</span>
        </li>
      ))}
    </ul>
  );
}

export function Field({
  label,
  children,
  hint,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
  className?: string;
}) {
  return (
    <label className={`block min-w-0 ${className}`}>
      <span className="eyebrow mb-1.5 block text-stone-muted">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-stone-muted">{hint}</span>}
    </label>
  );
}

export const inputCls =
  "w-full border border-ink/15 bg-white px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none focus:ring-0";

export function Btn({
  children,
  variant = "ink",
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "ink" | "red" | "ghost" | "danger" }) {
  const styles = {
    ink: "bg-ink text-paper hover:bg-swiss-red",
    red: "bg-swiss-red text-white hover:bg-ink",
    ghost: "border border-ink/20 hover:border-ink",
    danger: "border border-swiss-red/40 text-swiss-red hover:bg-swiss-red hover:text-white",
  }[variant];
  return (
    <button
      type="button"
      {...rest}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors disabled:opacity-40 ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

export function fmtDuration(sec: number) {
  if (!sec) return "0s";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m ? `${m}m ${s}s` : `${s}s`;
}

export function fmtTime(iso: string, withDate = true) {
  return new Intl.DateTimeFormat("de-CH", {
    timeZone: "Europe/Zurich",
    ...(withDate ? { day: "2-digit", month: "2-digit" } : {}),
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function flag(cc: string) {
  if (!cc || cc.length !== 2) return "🌐";
  return String.fromCodePoint(...cc.toUpperCase().split("").map((c) => 127397 + c.charCodeAt(0)));
}
