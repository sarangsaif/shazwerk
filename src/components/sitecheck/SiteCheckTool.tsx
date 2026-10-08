"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import type { CheckResult } from "@/lib/sitecheck";
import { trackClientEvent, getVisitorId, getSessionId } from "@/lib/analytics-client";

const GROUPS: { key: keyof CheckResult["groups"]; label: string }[] = [
  { key: "speed", label: "Geschwindigkeit" },
  { key: "mobile", label: "Handy & Nutzer" },
  { key: "seo", label: "Google-Sichtbarkeit" },
  { key: "security", label: "Sicherheit" },
];

const STEPS = ["Verbinde mit der Website …", "Messe die Ladezeit …", "Prüfe Google-Signale …", "Frage Google Lighthouse ab …", "Erstelle den Bericht …"];

function verdict(score: number) {
  if (score >= 85) return { text: "Sehr gut", tone: "text-emerald-700" };
  if (score >= 65) return { text: "Ausbaufähig", tone: "text-amber-600" };
  return { text: "Dringender Handlungsbedarf", tone: "text-swiss-red" };
}

export default function SiteCheckTool() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);

  const [lead, setLead] = useState({ name: "", email: "", phone: "", note: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [leadError, setLeadError] = useState("");

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setSent(false);
    setStep(0);
    const timer = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 4500);
    trackClientEvent("site_check_start", { meta: { label: url } });
    try {
      const res = await fetch("/api/site-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, visitor_id: getVisitorId(), session_id: getSessionId().sessionId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Prüfung fehlgeschlagen.");
      setResult(data.result);
      setTimeout(() => document.getElementById("check-result")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Prüfung fehlgeschlagen.");
    } finally {
      clearInterval(timer);
      setLoading(false);
    }
  };

  const sendLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result) return;
    setSending(true);
    setLeadError("");
    const failed = result.items.filter((i) => !i.ok);
    const message = [
      `Website-Check für ${result.finalUrl}`,
      `Gesamtwert: ${result.score}/100 (Geschwindigkeit ${result.groups.speed}, Handy ${result.groups.mobile}, Google ${result.groups.seo}, Sicherheit ${result.groups.security})`,
      result.performance != null ? `Google Lighthouse (Handy): ${result.performance}/100` : "",
      "",
      `Gefundene Probleme (${failed.length}):`,
      ...failed.map((i) => `– ${i.title}: ${i.detail}`),
      lead.note ? `\nNachricht: ${lead.note}` : "",
    ]
      .filter((l) => l !== undefined)
      .join("\n");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.name,
          company: new URL(result.finalUrl).hostname.replace(/^www\./, ""),
          email: lead.email,
          phone: lead.phone,
          project_type: "Website-Check",
          budget: `Score ${result.score}/100`,
          message: message.slice(0, 9000),
          honeypot: "",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Senden fehlgeschlagen.");
      setSent(true);
      trackClientEvent("form_submit_success", { project_type: "Website-Check" });
    } catch (err) {
      setLeadError(err instanceof Error ? err.message : "Senden fehlgeschlagen.");
    } finally {
      setSending(false);
    }
  };

  const v = result ? verdict(result.score) : null;
  const failed = result?.items.filter((i) => !i.ok) || [];
  const passed = result?.items.filter((i) => i.ok) || [];

  return (
    <div>
      <form onSubmit={run} className="flex flex-col gap-3 border-b-2 border-ink pb-3 sm:flex-row sm:items-end">
        <label className="min-w-0 flex-1">
          <span className="eyebrow mb-2 block text-stone-muted">Ihre Website-Adresse</span>
          <input
            id="check-url"
            type="text"
            inputMode="url"
            autoComplete="url"
            required
            placeholder="www.ihre-firma.ch"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border-0 bg-transparent px-0 py-2 font-display text-[clamp(1.6rem,4vw,3rem)] tracking-[-0.03em] placeholder:text-ink/25 focus:outline-none focus:ring-0"
          />
        </label>
        <button type="submit" disabled={loading} className="btn btn-red shrink-0 justify-center disabled:opacity-60">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {loading ? "Prüfe …" : "Jetzt gratis prüfen"}
          {!loading && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </button>
      </form>
      <p className="mt-3 text-sm text-stone-muted" aria-live="polite">
        {loading ? STEPS[step] : "Dauert 10–40 Sekunden. Kostenlos, ohne Anmeldung."}
      </p>
      {error && (
        <p role="alert" className="mt-4 border-l-2 border-swiss-red pl-4 text-swiss-red">
          {error}
        </p>
      )}

      {result && v && (
        <div id="check-result" className="mt-16 scroll-mt-28 space-y-14">
          <div className="grid grid-cols-1 gap-10 border-t border-ink/15 pt-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow text-stone-muted">{new URL(result.finalUrl).hostname}</p>
              <p className="mt-4 font-display text-[clamp(6rem,16vw,12rem)] font-medium leading-[0.8] tracking-[-0.06em]">
                {result.score}
                <span className="font-serif text-[0.3em] font-normal italic text-stone-muted">/100</span>
              </p>
              <p className={`mt-4 font-display text-2xl ${v.tone}`}>{v.text}</p>
              <p className="mt-2 text-stone-muted">
                {failed.length} von {result.items.length} Punkten brauchen Verbesserung.
              </p>
            </div>
            <dl className="space-y-5 lg:col-span-6 lg:col-start-7">
              {GROUPS.map((g) => (
                <div key={g.key}>
                  <div className="flex justify-between text-sm">
                    <dt>{g.label}</dt>
                    <dd className="font-mono tabular-nums">{result.groups[g.key]}</dd>
                  </div>
                  <div className="mt-1.5 h-2 bg-ink/10">
                    <div
                      className={`h-2 ${result.groups[g.key] >= 85 ? "bg-emerald-600" : result.groups[g.key] >= 65 ? "bg-amber-500" : "bg-swiss-red"}`}
                      style={{ width: `${result.groups[g.key]}%` }}
                    />
                  </div>
                </div>
              ))}
              <p className="pt-2 text-sm text-stone-muted">
                Antwortzeit {result.timing.ttfbMs} ms · Seitengrösse {result.timing.htmlKb} KB
                {result.performance != null && <> · Lighthouse {result.performance}/100</>}
              </p>
            </dl>
          </div>

          {failed.length > 0 && (
            <section>
              <h2 className="font-display text-big font-medium">Das kostet Sie Kunden</h2>
              <ul className="mt-6 border-t border-ink/15">
                {failed.map((i) => (
                  <li key={i.id} className="grid grid-cols-[auto_1fr] gap-4 border-b border-ink/15 py-4">
                    <X className="mt-1 h-5 w-5 text-swiss-red" aria-label="Problem" />
                    <div>
                      <p className="font-medium">{i.title}</p>
                      <p className="text-stone-muted">{i.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="bg-ink p-6 text-paper sm:p-10" aria-labelledby="lead-title">
            {sent ? (
              <div role="status" className="space-y-3">
                <p className="eyebrow text-paper/60">Erhalten</p>
                <h2 id="lead-title" className="font-display text-big font-medium">Danke! Ihr Verbesserungsplan ist unterwegs.</h2>
                <p className="max-w-xl text-paper/70">
                  Wir melden uns innerhalb eines Werktags mit konkreten Vorschlägen für {new URL(result.finalUrl).hostname} – kostenlos und
                  unverbindlich.
                </p>
              </div>
            ) : (
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p className="eyebrow text-paper/60">Gratis</p>
                  <h2 id="lead-title" className="mt-3 font-display text-big font-medium">
                    Persönlichen Verbesserungsplan erhalten
                  </h2>
                  <p className="mt-4 text-paper/70">
                    Wir sehen uns Ihre Website persönlich an und schicken Ihnen eine priorisierte Liste mit Massnahmen – plus einen
                    Entwurf, wie Ihre Startseite besser aussehen könnte. Kostenlos und ohne Verpflichtung.
                  </p>
                </div>
                <form onSubmit={sendLead} className="grid gap-5 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
                  {(
                    [
                      { k: "name", label: "Name *", type: "text", req: true, auto: "name" },
                      { k: "email", label: "E-Mail *", type: "email", req: true, auto: "email" },
                      { k: "phone", label: "Telefon (optional)", type: "tel", req: false, auto: "tel" },
                    ] as const
                  ).map((f) => (
                    <label key={f.k} className={f.k === "phone" ? "sm:col-span-2" : ""}>
                      <span className="eyebrow mb-1 block text-paper/60">{f.label}</span>
                      <input
                        id={`lead-${f.k}`}
                        type={f.type}
                        required={f.req}
                        autoComplete={f.auto}
                        value={lead[f.k]}
                        onChange={(e) => setLead({ ...lead, [f.k]: e.target.value })}
                        className="w-full border-0 border-b border-paper/30 bg-transparent px-0 py-2 text-lg text-paper focus:border-paper focus:outline-none focus:ring-0"
                      />
                    </label>
                  ))}
                  <label className="sm:col-span-2">
                    <span className="eyebrow mb-1 block text-paper/60">Was ist Ihnen wichtig? (optional)</span>
                    <textarea
                      id="lead-note"
                      rows={2}
                      value={lead.note}
                      onChange={(e) => setLead({ ...lead, note: e.target.value })}
                      className="w-full resize-none border-0 border-b border-paper/30 bg-transparent px-0 py-2 text-lg text-paper focus:border-paper focus:outline-none focus:ring-0"
                    />
                  </label>
                  {leadError && (
                    <p role="alert" className="text-sm text-paper sm:col-span-2">
                      {leadError}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                    <button type="submit" disabled={sending} className="btn btn-red disabled:opacity-60">
                      {sending ? "Sende …" : "Plan kostenlos anfordern"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="text-xs text-paper/60">Vertraulich, gemäss Schweizer Datenschutzgesetz.</span>
                  </div>
                </form>
              </div>
            )}
          </section>

          {passed.length > 0 && (
            <section>
              <h2 className="eyebrow text-stone-muted">Was bereits gut ist</h2>
              <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                {passed.map((i) => (
                  <li key={i.id} className="flex gap-3 border-b border-ink/10 py-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-label="In Ordnung" />
                    <span>
                      <strong className="font-medium">{i.title}.</strong> <span className="text-stone-muted">{i.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
