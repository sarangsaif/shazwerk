"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Copy, Send, Sparkles } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

const PROJECT_TYPES = [
  "New digital product",
  "Enterprise AI & LLM",
  "Software modernization",
  "Architecture & Security Audit",
];

const BUDGET_RANGES = [
  "CHF 25k – 50k",
  "CHF 50k – 100k",
  "CHF 100k – 200k+",
  "Ongoing Engineering Retainer",
];

export default function MimosaContact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    project_type: PROJECT_TYPES[0],
    budget: BUDGET_RANGES[1],
    timeline: "1 – 3 months",
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
    if (formData.honeypot) return; // Silent bot rejection

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
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please write directly to hello@shazwerk.ch.");
      trackClientEvent("form_submit_error", { error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-section" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Sticky Section Marker */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">
              <div>
                <span className="text-xs font-mono tracking-wider text-neutral-500 uppercase block mb-3">
                  [ 05 / INQUIRIES ]
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950 leading-[1.1]">
                  Tell us about your project.
                </h2>
              </div>

              <p className="text-neutral-600 text-base leading-relaxed">
                Whether you are scoping a greenfield digital product, modernizing high-risk legacy software, or architecting a private AI model, our team is ready to evaluate your requirements.
              </p>

              {/* Direct email card */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 text-xs font-mono">
                <div className="text-neutral-500 mb-1.5 uppercase tracking-wider">Direct Studio Channel</div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-red-600 transition-colors"
                >
                  <span>hello@shazwerk.ch</span>
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <div className="text-neutral-400 mt-2">
                  {copied ? "Copied to clipboard!" : "Response guaranteed within 24 hours"}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-8">
            {submitted ? (
              <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 sm:p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950 mb-3">
                  Inquiry received.
                </h3>
                <p className="text-neutral-600 text-base max-w-md mx-auto mb-8">
                  Thank you for contacting SHAZWERK. A senior engineering strategist will review your technical specifications and contact you within 24 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-mono hover:bg-neutral-800 transition-colors"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-10 flex flex-col gap-6"
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marc Hürzeler"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-950 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Helvetia Digital AG"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-950 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="m.huerzeler@helvetia.ch"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-950 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+41 44 123 45 67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-950 text-sm"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2">
                    Scope of Engagement
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PROJECT_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, project_type: type })}
                        className={`px-4 py-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
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

                {/* Budget Range */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2">
                    Anticipated Budget Range
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {BUDGET_RANGES.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: b })}
                        className={`px-4 py-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                          formData.budget === b
                            ? "bg-neutral-950 text-white border-neutral-950 shadow-xs"
                            : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2">
                    Project Brief & Technical Overview *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe the product vision, core technical requirements, or immediate obstacles you are solving..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-950 text-sm resize-none"
                  />
                </div>

                {error && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
                    {error}
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-neutral-500 font-mono">
                    Protected by Swiss confidentiality. Non-disclosure agreements honored.
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-neutral-950 text-white text-sm font-medium hover:bg-neutral-800 disabled:opacity-50 transition-colors shadow-sm"
                  >
                    {loading ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
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
