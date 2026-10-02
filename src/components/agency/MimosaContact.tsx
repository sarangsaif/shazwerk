"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Copy, Send } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";
import { useLanguage } from "@/context/LanguageContext";

const PROJECT_TYPES_EN = [
  "New digital platform",
  "Enterprise AI & LLM",
  "Software modernization",
  "Architecture & Security Audit",
];

const PROJECT_TYPES_DE = [
  "Neues digitales Produkt & Plattform",
  "Enterprise AI & Private LLMs",
  "Software-Modernisierung & Scale",
  "Architektur- & Security-Audit",
];

const SCOPES_EN = [
  "MVP / Initial Release (4–6 Weeks)",
  "Full Platform Launch (8–12 Weeks)",
  "Enterprise System Modernization",
  "Dedicated Senior Pod Retainer",
];

const SCOPES_DE = [
  "MVP / Erste Produktionsversion (4–6 Wochen)",
  "Vollständige Plattform (8–12 Wochen)",
  "Enterprise Modernisierung & Skalierung",
  "Dediziertes Senior Pod Mandat",
];

export default function MimosaContact() {
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
    trackClientEvent("copy_email", { source: "contact_section" });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;

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

      setSubmitted(true);
      trackClientEvent("form_submit_success", { project_type: formData.project_type });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
      trackClientEvent("form_submit_error", { error: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-section" className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-6">
            <div>
              <span className="text-xs font-mono tracking-wider text-neutral-500 uppercase block mb-3">
                [ {isDe ? "05 / PROJEKTANFRAGEN" : "05 / INQUIRIES"} ]
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950 leading-[1.08]">
                {isDe ? "Starten Sie Ihr Vorhaben." : "Start a conversation."}
              </h2>
            </div>

            <p className="text-neutral-600 text-sm leading-relaxed">
              {isDe
                ? "Jedes Briefing wird direkt von leitenden Systemarchitekten in Zürich geprüft. Vertraulich, verbindlich und innerhalb von 24 Stunden."
                : "Every brief is assessed directly by principal systems engineers in Zurich. Confidential, actionable, and within 24 hours."}
            </p>

            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5">
              <div className="text-xs font-mono text-neutral-500 mb-2">
                {isDe ? "Direkter E-Mail-Kanal" : "Direct Channel"}
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group flex items-center gap-3 text-lg font-medium tracking-tight text-neutral-950 hover:text-red-600 transition-colors"
              >
                <span>hello@shazwerk.ch</span>
                <span className="p-1 rounded-md bg-neutral-200 text-neutral-700 group-hover:text-red-600">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </span>
              </button>
              <div className="text-[11px] font-mono text-neutral-500 mt-1.5">
                {copied ? (
                  <span className="text-emerald-600 font-medium">✓ In Zwischenablage kopiert</span>
                ) : (
                  <span>Gotthardstrasse 26 · 8002 Zürich · +41 44 820 90 10</span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-mono text-neutral-600 space-y-1.5">
              <div className="font-semibold text-neutral-950 uppercase">{isDe ? "Schweizer Standard" : "Our Standard"}</div>
              <div>• {isDe ? "Gegenseitiges NDA vor technischer Vertiefung" : "Mutual NDA prior to deep-dive"}</div>
              <div>• {isDe ? "Direkter Kontakt mit Senior Architects" : "Direct access to senior architects"}</div>
              <div>• {isDe ? "100% Quellcode- & IP-Handover" : "100% source code & IP handover"}</div>
            </div>
          </div>

          {/* Right Column: Briefing Form */}
          <div className="lg:col-span-8">
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
                    ? "Ein leitender Partner wird sich innerhalb eines Werktags bei Ihnen melden, um das weitere Vorgehen zu besprechen."
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
              <form onSubmit={handleSubmit} className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-9 flex flex-col gap-5">
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
                      {isDe ? "Name *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isDe ? "z.B. Marc Hürzeler" : "e.g. Marc Hürzeler"}
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
                      placeholder={isDe ? "z.B. Alpine Health AG" : "e.g. Alpine Health AG"}
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
                      {isDe ? "Telefon (Optional)" : "Phone (Optional)"}
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

                {/* Project Type */}
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

                {/* Project Scale (NO exposed pricing!) */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
                    {isDe ? "Geplanter Projektumfang" : "Planned Engagement Scope"}
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

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
                    {isDe ? "Projekt-Briefing / Anforderungen *" : "Project Brief & Requirements *"}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={
                      isDe
                        ? "Beschreiben Sie kurz Ihr Ziel, existierende Systeme oder den gewünschten Zeitrahmen..."
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
                    {isDe ? "Geschützt durch Schweizer Recht & nDSG." : "Protected by Swiss confidentiality laws."}
                  </span>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-neutral-950 text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 disabled:opacity-50 transition-colors shadow-sm"
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
    </section>
  );
}
