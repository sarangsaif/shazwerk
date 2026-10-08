"use client";

import React, { useMemo, useState } from "react";
import type { SessionSummary, Stats } from "@/lib/stats";
import { BarList, Kpi, Panel, fmtDuration, fmtTime, flag } from "./ui";

/** Daily pageviews (bars) with visitors (dots), drawn to one scale. */
function DailyChart({ data }: { data: Stats["daily"] }) {
  const max = Math.max(1, ...data.map((d) => d.pageviews));
  const W = 720;
  const H = 180;
  const bw = W / data.length;
  const ticks = [0, Math.round(max / 2), max];
  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 -12 ${W + 36} ${H + 38}`} className="h-auto w-full min-w-[520px]" role="img" aria-label="Seitenaufrufe pro Tag">
        {ticks.map((t) => {
          const y = H - (t / max) * H;
          return (
            <g key={t}>
              <line x1="32" x2={W + 36} y1={y} y2={y} stroke="#0D0D0D" strokeOpacity="0.08" />
              <text x="26" y={y + 3} textAnchor="end" fontSize="10" fill="#5E5D59" fontFamily="var(--font-mono)">
                {t}
              </text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const h = (d.pageviews / max) * H;
          const vy = H - (d.visitors / max) * H;
          const x = 36 + i * bw;
          return (
            <g key={d.date}>
              <title>{`${d.date}: ${d.pageviews} Aufrufe, ${d.visitors} Besucher`}</title>
              <rect x={x + bw * 0.15} y={H - h} width={bw * 0.7} height={Math.max(h, d.pageviews ? 1 : 0)} fill="#0D0D0D" />
              {d.visitors > 0 && <circle cx={x + bw / 2} cy={vy} r="3" fill="#E30613" />}
              {(data.length - 1 - i) % Math.ceil(data.length / 8) === 0 && (
                <text x={x + bw / 2} y={H + 16} textAnchor="middle" fontSize="10" fill="#5E5D59" fontFamily="var(--font-mono)">
                  {d.date.slice(8)}.{d.date.slice(5, 7)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <p className="mt-2 flex gap-5 text-xs text-stone-muted">
        <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 bg-ink" /> Seitenaufrufe</span>
        <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-swiss-red" /> Besucher</span>
      </p>
    </div>
  );
}

function HourStrip({ hours }: { hours: number[] }) {
  const max = Math.max(1, ...hours);
  return (
    <div>
      <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}>
        {hours.map((h, i) => (
          <div key={i} title={`${i}:00 – ${h} Aufrufe`} className="aspect-square bg-swiss-red" style={{ opacity: 0.08 + (h / max) * 0.92 }} />
        ))}
      </div>
      <div className="mt-1 flex justify-between font-mono text-[10px] text-stone-muted">
        <span>00</span>
        <span>06</span>
        <span>12</span>
        <span>18</span>
        <span>23</span>
      </div>
    </div>
  );
}

export function Overview({ stats }: { stats: Stats }) {
  const t = stats.totals;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-px bg-ink/10 lg:grid-cols-4">
        <Kpi label="Jetzt online" value={t.live} hint="aktiv in den letzten 5 Min." accent />
        <Kpi label="Besucher" value={t.visitors} hint={`${t.returning} wiederkehrend`} />
        <Kpi label="Seitenaufrufe" value={t.pageviews} hint={`${t.sessions} Sitzungen`} />
        <Kpi label="Anfragen" value={t.inquiries} hint="über das Kontaktformular" />
        <Kpi label="Ø Verweildauer" value={fmtDuration(t.avgDuration)} />
        <Kpi label="Ø Scrolltiefe" value={`${t.avgScroll}%`} />
        <Kpi label="Absprungrate" value={`${t.bounceRate}%`} hint="nur 1 Seite angesehen" />
        <Kpi label="Klicks" value={t.clicks} />
      </div>

      <Panel title={`Verlauf · letzte ${stats.daily.length} Tage`}>
        <DailyChart data={stats.daily} />
      </Panel>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Beliebteste Seiten"><BarList rows={stats.topPages} /></Panel>
        <Panel title="Einstiegsseiten"><BarList rows={stats.entryPages} /></Panel>
        <Panel title="Herkunft"><BarList rows={stats.referrers} /></Panel>
        <Panel title="Länder"><BarList rows={stats.countries} /></Panel>
        <Panel title="Städte"><BarList rows={stats.cities} /></Panel>
        <Panel title="Kampagnen (UTM)"><BarList rows={stats.campaigns} empty="Keine Kampagnen-Besuche" /></Panel>
        <Panel title="Geräte"><BarList rows={stats.devices} /></Panel>
        <Panel title="Browser"><BarList rows={stats.browsers} /></Panel>
        <Panel title="Betriebssysteme"><BarList rows={stats.os} /></Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Aufrufe nach Uhrzeit (Schweiz)"><HourStrip hours={stats.hours} /></Panel>
        <Panel title="Geprüfte Websites (Website-Check)"><BarList rows={stats.siteChecks} empty="Noch keine Website-Checks" /></Panel>
        <Panel title="Meistgeklickt"><BarList rows={stats.clicks.slice(0, 10).map((c) => ({ key: `${c.label} · ${c.path}`, count: c.count }))} /></Panel>
      </div>
    </div>
  );
}

const STEP_LABEL: Record<string, string> = {
  pageview: "Seite",
  click: "Klick",
  form_submit_success: "Anfrage gesendet ✓",
  form_submit_error: "Formularfehler",
  copy_email: "E-Mail kopiert",
  lang_switch: "Sprache gewechselt",
  sound_toggle: "Sound umgeschaltet",
  site_check: "Website geprüft",
};

function Journey({ s }: { s: SessionSummary }) {
  return (
    <ol className="relative ml-2 space-y-2 border-l border-ink/15 py-1 pl-5">
      {s.journey.map((step, i) => (
        <li key={i} className="relative text-sm">
          <span
            className={`absolute -left-[25px] top-1.5 h-2 w-2 rounded-full ${
              step.type === "pageview" ? "bg-ink" : step.type === "click" ? "bg-swiss-red" : "bg-emerald-600"
            }`}
          />
          <span className="font-mono text-xs text-stone-muted">{fmtTime(step.t, false)}</span>{" "}
          <span className="eyebrow text-stone-muted">{STEP_LABEL[step.type] || step.type}</span>{" "}
          {step.type === "pageview" ? (
            <>
              <strong className="font-medium">{step.path}</strong>
              {(step.duration || step.scroll) && (
                <span className="text-stone-muted"> · {fmtDuration(step.duration || 0)} · {step.scroll ?? 0}% gescrollt</span>
              )}
            </>
          ) : (
            <>
              <strong className="font-medium">„{step.label}“</strong>
              {step.href && <span className="text-stone-muted"> → {step.href}</span>}
              <span className="text-stone-muted"> auf {step.path}</span>
            </>
          )}
        </li>
      ))}
    </ol>
  );
}

export function Visitors({ stats }: { stats: Stats }) {
  const [open, setOpen] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return stats.sessions;
    return stats.sessions.filter((s) =>
      [s.city, s.country, s.ip, s.referrer, s.device, s.browser, s.landing, s.visitor_id, ...s.journey.map((j) => j.path)]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [q, stats.sessions]);

  return (
    <div className="space-y-6">
      {stats.liveSessions.length > 0 && (
        <Panel title={`Jetzt online · ${stats.liveSessions.length}`}>
          <ul className="flex flex-wrap gap-2">
            {stats.liveSessions.map((s) => (
              <li key={s.session_id} className="flex items-center gap-2 border border-ink/10 px-3 py-1.5 text-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                {flag(s.country_code)} {s.city || s.country} · {s.exit}
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <Panel
        title={`Sitzungen · ${list.length}`}
        action={
          <input
            type="search"
            placeholder="Suchen: Stadt, IP, Seite …"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-48 border border-ink/15 px-2 py-1 text-sm focus:border-ink focus:outline-none sm:w-64"
            aria-label="Sitzungen durchsuchen"
          />
        }
      >
        {list.length === 0 ? (
          <p className="text-sm text-stone-muted">Noch keine Besuche erfasst.</p>
        ) : (
          <div className="-mx-5 overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="eyebrow text-stone-muted">
                <tr className="border-b border-ink/10">
                  <th className="px-5 py-2 font-normal">Zeit</th>
                  <th className="py-2 font-normal">Ort</th>
                  <th className="py-2 font-normal">Gerät</th>
                  <th className="py-2 font-normal">Herkunft</th>
                  <th className="py-2 font-normal">Einstieg</th>
                  <th className="py-2 text-right font-normal">Seiten</th>
                  <th className="py-2 text-right font-normal">Klicks</th>
                  <th className="px-5 py-2 text-right font-normal">Dauer</th>
                </tr>
              </thead>
              <tbody>
                {list.map((s) => (
                  <React.Fragment key={s.session_id}>
                    <tr
                      className={`cursor-pointer border-b border-ink/5 hover:bg-paper ${open === s.session_id ? "bg-paper" : ""}`}
                      onClick={() => setOpen(open === s.session_id ? null : s.session_id)}
                    >
                      <td className="px-5 py-2.5 font-mono text-xs tabular-nums">
                        {fmtTime(s.start)}
                        {s.converted && <span className="ml-2 bg-emerald-600 px-1.5 py-0.5 text-[10px] text-white">ANFRAGE</span>}
                        {s.returning && <span className="ml-2 border border-ink/20 px-1.5 py-0.5 text-[10px]">WIEDER</span>}
                      </td>
                      <td className="py-2.5">
                        {flag(s.country_code)} {[s.city, s.region].filter(Boolean).join(", ") || s.country || "–"}
                        <span className="block font-mono text-[11px] text-stone-muted">{s.ip}</span>
                      </td>
                      <td className="py-2.5">
                        {s.device} · {s.browser.split(" ")[0]}
                        <span className="block text-xs text-stone-muted">{s.os} · {s.screen}</span>
                      </td>
                      <td className="py-2.5">
                        {s.referrer}
                        {s.campaign && <span className="block text-xs text-swiss-red">{s.campaign}</span>}
                      </td>
                      <td className="max-w-[180px] truncate py-2.5">{s.landing}</td>
                      <td className="py-2.5 text-right tabular-nums">{s.pageviews}</td>
                      <td className="py-2.5 text-right tabular-nums">{s.clicks}</td>
                      <td className="px-5 py-2.5 text-right tabular-nums">{fmtDuration(s.duration)}</td>
                    </tr>
                    {open === s.session_id && (
                      <tr className="border-b border-ink/10 bg-paper">
                        <td colSpan={8} className="px-5 py-4">
                          <p className="eyebrow mb-3 text-stone-muted">
                            Weg durch die Website · Besucher {s.visitor_id.slice(0, 10)} · Sprache {s.language || "–"}
                          </p>
                          <Journey s={s} />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}

export function Clicks({ stats }: { stats: Stats }) {
  const pages = useMemo(() => Array.from(new Set(stats.clicks.map((c) => c.path))), [stats.clicks]);
  const [page, setPage] = useState("");
  const rows = page ? stats.clicks.filter((c) => c.path === page) : stats.clicks;
  return (
    <Panel
      title={`Klicks · ${rows.reduce((a, b) => a + b.count, 0)}`}
      action={
        <select value={page} onChange={(e) => setPage(e.target.value)} className="border border-ink/15 px-2 py-1 text-sm" aria-label="Seite filtern">
          <option value="">Alle Seiten</option>
          {pages.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      }
    >
      {rows.length === 0 ? (
        <p className="text-sm text-stone-muted">Noch keine Klicks erfasst.</p>
      ) : (
        <div className="-mx-5 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="eyebrow text-stone-muted">
              <tr className="border-b border-ink/10">
                <th className="px-5 py-2 font-normal">Element</th>
                <th className="py-2 font-normal">Ziel</th>
                <th className="py-2 font-normal">Seite</th>
                <th className="py-2 font-normal">Zuletzt</th>
                <th className="px-5 py-2 text-right font-normal">Anzahl</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c, i) => (
                <tr key={i} className="border-b border-ink/5">
                  <td className="max-w-[260px] truncate px-5 py-2">{c.label}</td>
                  <td className="max-w-[200px] truncate py-2 text-stone-muted">{c.href || "–"}</td>
                  <td className="py-2">{c.path}</td>
                  <td className="py-2 font-mono text-xs">{fmtTime(c.last)}</td>
                  <td className="px-5 py-2 text-right font-mono tabular-nums">{c.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  );
}
