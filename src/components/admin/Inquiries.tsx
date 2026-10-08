"use client";

import React, { useCallback, useEffect, useState } from "react";
import type { ContactSubmission, EmailSettings, SubmissionStatus } from "@/lib/types";
import { Btn, Field, Panel, fmtTime, inputCls } from "./ui";

const STATUS: { key: SubmissionStatus; label: string; cls: string }[] = [
  { key: "new", label: "Neu", cls: "bg-swiss-red text-white" },
  { key: "contacted", label: "Kontaktiert", cls: "bg-amber-400 text-ink" },
  { key: "qualified", label: "Qualifiziert", cls: "bg-emerald-600 text-white" },
  { key: "archived", label: "Archiviert", cls: "bg-ink/10 text-ink" },
];

export function Inquiries({ onCount }: { onCount: (n: number) => void }) {
  const [items, setItems] = useState<ContactSubmission[] | null>(null);
  const [filter, setFilter] = useState<SubmissionStatus | "all">("all");
  const [open, setOpen] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/submissions", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setItems(data.submissions);
      onCount(data.submissions.filter((s: ContactSubmission) => s.status === "new").length);
    }
  }, [onCount]);

  useEffect(() => {
    load();
    const id = setInterval(() => document.visibilityState === "visible" && load(), 60000);
    return () => clearInterval(id);
  }, [load]);

  const setStatus = async (id: string, status: SubmissionStatus) => {
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  };

  const remove = async (id: string) => {
    await fetch(`/api/admin/submissions?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    setOpen(null);
    load();
  };

  const forward = async (id: string) => {
    setMsg("Sende …");
    const res = await fetch("/api/admin/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    setMsg(res.ok && data.result?.success ? "Per E-Mail weitergeleitet." : `Fehler: ${data.result?.error || data.error || "unbekannt"}`);
  };

  if (!items) return <p className="text-sm text-stone-muted">Lade Anfragen …</p>;
  const list = filter === "all" ? items : items.filter((i) => i.status === filter);

  return (
    <Panel
      title={`Anfragen · ${list.length}`}
      action={
        <div className="flex flex-wrap gap-1">
          {[{ key: "all", label: "Alle" }, ...STATUS].map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setFilter(s.key as SubmissionStatus | "all")}
              className={`px-2.5 py-1 text-xs ${filter === s.key ? "bg-ink text-paper" : "border border-ink/15"}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      }
    >
      {msg && <p className="mb-4 text-sm">{msg}</p>}
      {list.length === 0 ? (
        <p className="text-sm text-stone-muted">Keine Anfragen in dieser Ansicht.</p>
      ) : (
        <ul className="-mx-5 divide-y divide-ink/5">
          {list.map((s) => {
            const st = STATUS.find((x) => x.key === s.status) || STATUS[0];
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setOpen(open === s.id ? null : s.id)}
                  className="grid w-full grid-cols-12 items-center gap-3 px-5 py-3 text-left text-sm hover:bg-paper"
                >
                  <span className="col-span-12 font-mono text-xs sm:col-span-2">{fmtTime(s.created_at)}</span>
                  <span className="col-span-6 min-w-0 truncate sm:col-span-3">
                    <strong className="font-medium">{s.name}</strong>
                    {s.company && <span className="text-stone-muted"> · {s.company}</span>}
                  </span>
                  <span className="col-span-6 min-w-0 truncate text-stone-muted sm:col-span-3">{s.project_type}</span>
                  <span className="col-span-8 min-w-0 truncate text-stone-muted sm:col-span-3">{s.message}</span>
                  <span className="col-span-4 text-right sm:col-span-1">
                    <span className={`px-2 py-0.5 text-[11px] ${st.cls}`}>{st.label}</span>
                  </span>
                </button>
                {open === s.id && (
                  <div className="space-y-4 bg-paper px-5 py-5 text-sm">
                    <dl className="grid gap-3 sm:grid-cols-4">
                      <div><dt className="eyebrow text-stone-muted">E-Mail</dt><dd><a className="underline" href={`mailto:${s.email}`}>{s.email}</a></dd></div>
                      <div><dt className="eyebrow text-stone-muted">Telefon</dt><dd>{s.phone ? <a className="underline" href={`tel:${s.phone}`}>{s.phone}</a> : "–"}</dd></div>
                      <div><dt className="eyebrow text-stone-muted">Art</dt><dd>{s.project_type}</dd></div>
                      <div><dt className="eyebrow text-stone-muted">Zeitrahmen</dt><dd>{s.budget || s.timeline || "–"}</dd></div>
                    </dl>
                    <p className="max-w-3xl whitespace-pre-wrap border-l-2 border-ink/20 pl-4 text-base">{s.message}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {STATUS.map((x) => (
                        <Btn key={x.key} variant={s.status === x.key ? "ink" : "ghost"} onClick={() => setStatus(s.id, x.key)}>
                          {x.label}
                        </Btn>
                      ))}
                      <a
                        href={`mailto:${s.email}?subject=${encodeURIComponent("Ihre Anfrage bei SHAZWERK")}`}
                        className="inline-flex items-center bg-swiss-red px-4 py-2 text-sm text-white hover:bg-ink"
                      >
                        Antworten
                      </a>
                      <Btn variant="ghost" onClick={() => forward(s.id)}>Per E-Mail weiterleiten</Btn>
                      <Btn variant="danger" onClick={() => remove(s.id)}>Löschen</Btn>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Panel>
  );
}

export function EmailSettingsForm() {
  const [s, setS] = useState<EmailSettings | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/email", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setS(d.settings));
  }, []);

  if (!s) return <p className="text-sm text-stone-muted">Lade …</p>;
  const set = (k: keyof EmailSettings, v: string | number | boolean) => setS({ ...s, [k]: v });

  const save = async () => {
    setMsg("Speichere …");
    const res = await fetch("/api/admin/email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(s) });
    setMsg(res.ok ? "Gespeichert." : "Speichern fehlgeschlagen.");
  };
  const test = async () => {
    setMsg("Sende Test-E-Mail …");
    const res = await fetch("/api/admin/email", { method: "PUT" });
    const d = await res.json();
    setMsg(d.result?.success ? `Test gesendet über ${d.result.provider}.` : `Fehler: ${d.result?.error || d.error || "unbekannt"}`);
  };

  return (
    <Panel title="Benachrichtigung bei neuen Anfragen">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Empfänger-E-Mail">
          <input className={inputCls} value={s.notificationEmail} onChange={(e) => set("notificationEmail", e.target.value)} />
        </Field>
        <Field label="Versand über">
          <select className={inputCls} value={s.provider} onChange={(e) => set("provider", e.target.value)}>
            <option value="auto">Automatisch</option>
            <option value="resend">Resend</option>
            <option value="smtp">SMTP</option>
            <option value="webhook">Webhook</option>
          </select>
        </Field>
        <Field label="Absendername"><input className={inputCls} value={s.senderName} onChange={(e) => set("senderName", e.target.value)} /></Field>
        <Field label="Absender-E-Mail"><input className={inputCls} value={s.senderEmail} onChange={(e) => set("senderEmail", e.target.value)} /></Field>
        <Field label="Resend API-Key" hint="resend.com – kostenlos bis 3000 E-Mails/Monat">
          <input className={inputCls} value={s.resendApiKey || ""} onChange={(e) => set("resendApiKey", e.target.value)} />
        </Field>
        <Field label="Webhook-URL (optional)"><input className={inputCls} value={s.webhookUrl || ""} onChange={(e) => set("webhookUrl", e.target.value)} /></Field>
        <Field label="SMTP-Server"><input className={inputCls} value={s.smtpHost || ""} onChange={(e) => set("smtpHost", e.target.value)} /></Field>
        <Field label="SMTP-Port"><input type="number" className={inputCls} value={s.smtpPort || 587} onChange={(e) => set("smtpPort", Number(e.target.value))} /></Field>
        <Field label="SMTP-Benutzer"><input className={inputCls} value={s.smtpUser || ""} onChange={(e) => set("smtpUser", e.target.value)} /></Field>
        <Field label="SMTP-Passwort"><input type="password" className={inputCls} value={s.smtpPass || ""} onChange={(e) => set("smtpPass", e.target.value)} /></Field>
      </div>
      <label className="mt-4 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={s.notifyOnNewLead} onChange={(e) => set("notifyOnNewLead", e.target.checked)} />
        Bei jeder neuen Anfrage eine E-Mail senden
      </label>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Btn onClick={save}>Speichern</Btn>
        <Btn variant="ghost" onClick={test}>Test-E-Mail senden</Btn>
        {msg && <span className="text-sm text-stone-muted">{msg}</span>}
      </div>
    </Panel>
  );
}
