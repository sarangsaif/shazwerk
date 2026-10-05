"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Copy, Send } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";
import { useLanguage } from "@/context/LanguageContext";

const PROJECT_TYPES_DE = [
  "Neues digitales Produkt & Plattform",
  "Enterprise AI & Private LLMs",
  "Software-Modernisierung & Scale",
  "Architektur- & Security-Audit",
  "Dediziertes Senior Pod Mandat",
];

const PROJECT_TYPES_EN = [
  "New digital platform",
  "Enterprise AI & Private LLM",
  "Software modernization",
  "Architecture & Security Audit",
  "Ongoing Engineering Pod",
];

const SCOPES_DE = [
  "MVP / Erste Produktionsversion (4–6 Wochen)",
  "Vollständige Plattform (8–12 Wochen)",
  "Enterprise System Modernisierung",
  "Laufendes Quartalsmandat",
];

const SCOPES_EN = [
  "MVP / Initial Release (4–6 Weeks)",
  "Full Platform Launch (8–12 Weeks)",
  "Enterprise System Modernization",
  "Ongoing Retained Pod",
];

export default function ContactPage() {
  const { language } = useLanguage();
  const isDe = language === "de";

  const projectTypes = isDe ? PROJECT_TYPES_DE : PROJECT_TYPES_EN;
  const projectScopes = isDe ? SCOPES_DE : SCOPES_EN;

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    project_type: projectTypes[0],
    budget: projectScopes[1],
    message: "",
    honeypot: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@shazwerk.ch");
    setCopied(true);
    trackClientEvent("copy_email", { source: "contact_page" });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit project inquiry.");
      }

      // Immediately cache submission into client vault for admin durability
      if (data.submission) {
        try {
          const VAULT_KEY = "_sw_admin_vault_submissions_v1";
          const stored = localStorage.getItem(VAULT_KEY);
          const existing = stored ? JSON.parse(stored) : [];
          const updated = [
            data.submission,
            ...existing.filter((s: any) => s.id !== data.submission.id),
          ];
          localStorage.setItem(VAULT_KEY, JSON.stringify(updated.slice(0, 200)));
          window.dispatchEvent(new Event("storage"));
        } catch {}
      }

      setSubmitted(true);
      trackClientEvent("form_submit_success", { 
        project_type: formData.project_type,
        company: formData.company,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
      trackClientEvent("form_submit_error", { error: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-neutral-900 min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-950 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isDe ? "Zurück zum Studio" : "Back to Studio"}</span>
          </Link>
        </div>

        {/* Header - Crisp & Direct */}
        <div className="pb-12 border-b border-neutral-200">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-2">
            [ {isDe ? "PROJEKTANFRAGE // ZÜRICH" : "DIRECT STUDIO INQUIRY"} ]
          </span>
          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-neutral-950 leading-[1.05] max-w-4xl">
            {isDe ? "Lassen Sie uns Ihr Vorhaben besprechen." : "Start a project brief."}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl font-normal leading-relaxed">
            {isDe
              ? "Prüfung direkt durch leitende Systemarchitekten in Zürich. Vertraulich, technisch fundiert und innerhalb von 24 Stunden."
              : "Every brief is assessed directly by principal systems engineers in Zurich. Confidential and actionable within 24 hours."}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8">
              <span className="text-xs font-mono uppercase text-neutral-500 block mb-2">
                {isDe ? "Direktkontakt" : "Direct Channel"}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group flex items-center gap-3 text-xl sm:text-2xl font-medium tracking-tight text-neutral-950 hover:text-red-600 transition-colors"
              >
                <span>hello@shazwerk.ch</span>
                <span className="p-1 rounded-lg bg-neutral-200 text-neutral-700 group-hover:text-red-600">
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </span>
              </button>
              <div className="text-xs font-mono text-neutral-500 mt-2">
                {copied ? <span className="text-emerald-600 font-medium">✓ In Zwischenablage kopiert!</span> : "hello@shazwerk.ch"}
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-200 text-xs font-mono space-y-3 text-neutral-700">
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase">Telefon (Direkt)</span>
                  <span className="text-neutral-900">+41 44 820 90 10</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase">Zürich Studio</span>
                  <span>Gotthardstrasse 26 · 8002 Zürich</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase">Zug Presence</span>
                  <span>Baarerstrasse 82 · 6300 Zug</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs font-mono space-y-2 text-neutral-600">
              <div className="text-neutral-950 font-semibold uppercase">{isDe ? "Schweizer Standards" : "Our Standards"}</div>
              <div>• {isDe ? "Gegenseitiges NDA vor Detailgesprächen" : "Mutual NDA prior to deep-dive"}</div>
              <div>• {isDe ? "Festpreisige Meilenstein-Sprints" : "Fixed-milestone proposals"}</div>
              <div>• {isDe ? "100% IP- & Quellcode-Übergabe" : "100% IP & source handover"}</div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 sm:p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-medium tracking-tight text-neutral-950 mb-2">
                  {isDe ? "Vielen Dank. Ihre Anfrage ist eingegangen." : "Thank you. Your brief has been received."}
                </h3>
                <p className="text-neutral-600 text-sm max-w-md mx-auto mb-6">
                  {isDe
                    ? "Ein leitender Partner wird sich innerhalb eines Werktags bei Ihnen melden."
                    : "A senior partner will reach out within 24 business hours to discuss your system requirements."}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-mono hover:bg-neutral-800 transition-colors"
                >
                  {isDe ? "Weitere Anfrage senden" : "Submit another brief"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 flex flex-col gap-5">
                <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0, overflow: "hidden", pointerEvents: "none" }} aria-hidden="true">
                  <input
                    type="text"
                    name="hp_validation_studio"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
                      {isDe ? "Name *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Marc Hürzeler"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-950 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
                      {isDe ? "Unternehmen *" : "Company *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Helvetia Digital AG"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-950 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
                      {isDe ? "Geschäftliche E-Mail *" : "Work Email *"}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.ch"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-950 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
                      {isDe ? "Telefon" : "Phone"}
                    </label>
                    <input
                      type="tel"
                      placeholder="+41 44 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-950 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
                    {isDe ? "System-Schwerpunkt" : "Core Focus"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, project_type: type })}
                        className={`px-3.5 py-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                          formData.project_type === type
                            ? "bg-neutral-950 text-white border-neutral-950 shadow-xs"
                            : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
                    {isDe ? "Projektumfang" : "Engagement Scope"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {projectScopes.map((scope) => (
                      <button
                        key={scope}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: scope })}
                        className={`px-3.5 py-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                          formData.budget === scope
                            ? "bg-neutral-950 text-white border-neutral-950 shadow-xs"
                            : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        {scope}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
                    {isDe ? "Projekt-Briefing *" : "Project Brief *"}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={
                      isDe
                        ? "Beschreiben Sie kurz Ihr Systemziel, existierende Stacks oder Zeithorizont..."
                        : "Describe the platform goals, existing technical setup, or timeline..."
                    }
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-950 text-xs font-mono resize-none"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
                    {error}
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-neutral-500">
                    {isDe ? "Geschützt nach Schweizer Datenschutz (nDSG)." : "Protected under Swiss FADP / nDSG."}
                  </span>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-neutral-950 text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 disabled:opacity-50 transition-colors shadow-sm"
                  >
                    <span>{loading ? (isDe ? "Wird gesendet..." : "Submitting...") : (isDe ? "Briefing absenden" : "Submit Brief")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
