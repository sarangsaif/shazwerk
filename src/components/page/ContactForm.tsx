"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";
import { useLanguage } from "@/context/LanguageContext";

const TYPES = [
  { de: "Website", en: "Website" },
  { de: "Webplattform / SaaS", en: "Web platform / SaaS" },
  { de: "App", en: "App" },
  { de: "Enterprise AI", en: "Enterprise AI" },
  { de: "Audit / Beratung", en: "Audit / advisory" },
];

const SCOPES = [
  { de: "Unter 4 Wochen", en: "Under 4 weeks" },
  { de: "4–12 Wochen", en: "4–12 weeks" },
  { de: "Laufende Partnerschaft", en: "Ongoing partnership" },
  { de: "Noch offen", en: "Not sure yet" },
];

const field =
  "peer w-full border-0 border-b border-ink/25 bg-transparent px-0 pb-3 pt-6 text-xl placeholder-transparent transition-colors focus:border-ink focus:outline-none focus:ring-0";
const floatLabel =
  "pointer-events-none absolute left-0 top-6 text-xl text-stone-muted transition-all duration-300 ease-out-expo peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs";

export default function ContactForm() {
  const { language } = useLanguage();
  const isDe = language === "de";
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    project_type: TYPES[0].de,
    budget: SCOPES[1].de,
    message: "",
    honeypot: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit project inquiry.");

      // Cache the submission client-side so the admin console survives store resets
      if (data.submission) {
        try {
          const VAULT_KEY = "_sw_admin_vault_submissions_v1";
          const stored = localStorage.getItem(VAULT_KEY);
          const existing = stored ? JSON.parse(stored) : [];
          const updated = [data.submission, ...existing.filter((s: { id: string }) => s.id !== data.submission.id)];
          localStorage.setItem(VAULT_KEY, JSON.stringify(updated.slice(0, 200)));
          window.dispatchEvent(new Event("storage"));
        } catch {}
      }

      setSubmitted(true);
      trackClientEvent("form_submit_success", { project_type: form.project_type, company: form.company });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
      trackClientEvent("form_submit_error", { error: message });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center gap-6" role="status">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-swiss-red text-white">
          <Check className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="font-display text-huge font-medium">{isDe ? "Danke. Wir melden uns." : "Thank you. We’ll be in touch."}</h2>
        <p className="max-w-md text-lg text-stone-muted">
          {isDe
            ? "Eine verantwortliche Person aus dem Studio meldet sich innerhalb eines Werktags bei Ihnen."
            : "Someone from the studio will get back to you within one business day."}
        </p>
        <button type="button" onClick={() => setSubmitted(false)} className="link-line text-sm">
          {isDe ? "Weitere Anfrage senden" : "Send another request"}
        </button>
      </div>
    );
  }

  const Chips = ({
    legend,
    options,
    value,
    onPick,
  }: {
    legend: string;
    options: { de: string; en: string }[];
    value: string;
    onPick: (v: string) => void;
  }) => (
    <fieldset>
      <legend className="eyebrow mb-4 text-stone-muted">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const selected = value === o.de;
          return (
            <button
              key={o.de}
              type="button"
              aria-pressed={selected}
              onClick={() => onPick(o.de)}
              className={`rounded-full border px-5 py-2.5 text-sm transition-colors duration-300 ${
                selected ? "border-ink bg-ink text-paper" : "border-ink/25 hover:border-ink"
              }`}
            >
              {isDe ? o.de : o.en}
            </button>
          );
        })}
      </div>
    </fieldset>
  );

  return (
    <form onSubmit={submit} className="flex flex-col gap-12" noValidate={false}>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0">
        <input type="text" name="hp_validation_studio" tabIndex={-1} autoComplete="off" value={form.honeypot} onChange={set("honeypot")} />
      </div>

      <Chips
        legend={isDe ? "Was dürfen wir für Sie bauen?" : "What can we build for you?"}
        options={TYPES}
        value={form.project_type}
        onPick={(v) => setForm({ ...form, project_type: v })}
      />
      <Chips
        legend={isDe ? "Zeitrahmen" : "Timeline"}
        options={SCOPES}
        value={form.budget}
        onPick={(v) => setForm({ ...form, budget: v })}
      />

      <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
        {(
          [
            { k: "name", label: isDe ? "Ihr Name *" : "Your name *", type: "text", required: true, auto: "name" },
            { k: "company", label: isDe ? "Unternehmen" : "Company", type: "text", required: false, auto: "organization" },
            { k: "email", label: isDe ? "E-Mail *" : "Email *", type: "email", required: true, auto: "email" },
            { k: "phone", label: isDe ? "Telefon" : "Phone", type: "tel", required: false, auto: "tel" },
          ] as const
        ).map((f) => (
          <div key={f.k} className="relative">
            <input
              id={`cf-${f.k}`}
              type={f.type}
              required={f.required}
              autoComplete={f.auto}
              placeholder={f.label}
              value={form[f.k]}
              onChange={set(f.k)}
              className={field}
            />
            <label htmlFor={`cf-${f.k}`} className={floatLabel}>
              {f.label}
            </label>
          </div>
        ))}
      </div>

      <div className="relative">
        <textarea
          id="cf-message"
          required
          rows={4}
          placeholder="msg"
          value={form.message}
          onChange={set("message")}
          className={`${field} resize-none`}
        />
        <label htmlFor="cf-message" className={floatLabel}>
          {isDe ? "Erzählen Sie uns von Ihrem Vorhaben *" : "Tell us about your project *"}
        </label>
      </div>

      {error && (
        <p role="alert" className="border-l-2 border-swiss-red pl-4 text-sm text-swiss-red">
          {error}
        </p>
      )}

      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs text-stone-muted">
          {isDe
            ? "Ihre Angaben werden vertraulich und gemäss Schweizer Datenschutzgesetz (nDSG) behandelt."
            : "Your details are handled confidentially under the Swiss Data Protection Act (nDSG)."}
        </p>
        <button type="submit" disabled={loading} className="btn btn-red disabled:opacity-50">
          <span>{loading ? (isDe ? "Wird gesendet …" : "Sending …") : isDe ? "Anfrage senden" : "Send request"}</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
