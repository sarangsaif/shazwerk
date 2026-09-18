"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

const PROJECT_TYPES = [
  "New digital product",
  "Web application",
  "Mobile application",
  "AI / automation",
  "UX/UI architecture",
  "Software development",
  "Other",
];

const BUDGET_RANGES = [
  "< CHF 25k (Sprint / MVP)",
  "CHF 25k – 60k (New Platform)",
  "CHF 60k – 120k (Full-Scale System)",
  "CHF 120k+ (Enterprise Squad)",
  "To be scoped",
];

const TIMELINES = [
  "Immediate (< 1 month)",
  "1 – 3 months",
  "3 – 6 months",
  "Flexible / Roadmap",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    project_type: "New digital product",
    budget: "CHF 25k – 60k (New Platform)",
    timeline: "1 – 3 months",
    message: "",
    honeypot: "",
  });

  const [hasStartedForm, setHasStartedForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!hasStartedForm) {
      setHasStartedForm(true);
      trackClientEvent("form_start", { cta_id: "contact_form" });
    }
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.company.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please complete all required fields (Name, Company, Email, Message).");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to transmit inquiry. Please try again.");
      }

      setSubmissionSuccess(data.id || "CONFIRMED");
      trackClientEvent("form_submit", {
        cta_id: "contact_form_success",
        meta: { project_type: formData.project_type },
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred. Please contact us directly.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#080808] text-[#F5F5F3] min-h-screen pt-32 pb-28 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="pb-12 mb-16 border-b border-white/10">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#7E8494] block mb-4">
            INITIATE ENGAGEMENT
          </span>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-[-0.04em] text-[#F5F5F3] leading-[0.98] mb-6">
            Start a project with SHAZWERK.
          </h1>
          <p className="text-lg text-[#8E94A0] max-w-2xl leading-relaxed">
            We work with founders, executives, and engineering leads to architect and build durable software platforms and digital products. Share your scope below for a direct, confidential technical briefing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Direct Contact</h3>
              <p className="text-sm text-[#8E94A0] leading-relaxed mb-6">
                Every inquiry is reviewed directly by senior engineering leadership in Zurich. Mutual NDAs provided upon request.
              </p>
              <div className="space-y-3 font-mono text-xs">
                <a
                  href="mailto:contact@shazwerk.ch"
                  className="block text-[#F5F5F3] hover:text-[#E30613] transition-colors py-2 border-b border-white/10"
                >
                  contact@shazwerk.ch
                </a>
                <div className="text-[#8E94A0] py-2 border-b border-white/10">
                  Zurich, Switzerland (CET / CEST)
                </div>
                <div className="text-[#8E94A0] py-2 border-b border-white/10">
                  Response Commitment: &le; 24h
                </div>
              </div>
            </div>

            <div className="text-xs font-mono text-[#7E8494] space-y-1">
              <div>ENCRYPTION: End-to-end TLS 1.3</div>
              <div>PRIVACY: Swiss FADP / nDSG compliant</div>
            </div>
          </div>

          {/* Right Column: Luxury Minimalist Form */}
          <div className="lg:col-span-8">
            {submissionSuccess ? (
              <div className="p-12 rounded-2xl bg-white/[0.02] border border-[#10B981]/30 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-extrabold text-white tracking-tight">
                  Inquiry Transmitted Successfully.
                </h3>
                <p className="text-sm text-[#A0A5B0] max-w-md mx-auto leading-relaxed">
                  Thank you. Your project brief has been logged into our secure studio triage system. A senior technical partner from SHAZWERK will review your requirements and reach out within 24 business hours.
                </p>
                <div className="inline-block p-3 rounded-md bg-white/5 border border-white/10 font-mono text-xs text-[#8E94A0]">
                  REFERENCE ID: <span className="text-white font-bold">{submissionSuccess}</span>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmissionSuccess(null);
                      setFormData({
                        name: "",
                        company: "",
                        email: "",
                        phone: "",
                        project_type: "New digital product",
                        budget: "CHF 25k – 60k (New Platform)",
                        timeline: "1 – 3 months",
                        message: "",
                        honeypot: "",
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-white/10 text-white text-xs font-mono uppercase tracking-wider hover:bg-white/20"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Honeypot field */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleInputChange}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {errorMessage && (
                  <div className="p-4 rounded-lg bg-[#FEF2F2]/10 border border-[#F87171] text-xs text-[#FCA5A5] flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="relative">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7E8494] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Adrian Meier"
                      className="w-full pb-3 pt-1 bg-transparent border-b border-white/20 focus:border-[#F5F5F3] text-base text-white placeholder-white/20 transition-colors outline-none font-sans"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7E8494] mb-2">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Helvetia Digital AG"
                      className="w-full pb-3 pt-1 bg-transparent border-b border-white/20 focus:border-[#F5F5F3] text-base text-white placeholder-white/20 transition-colors outline-none font-sans"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="relative">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7E8494] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="adrian@company.ch"
                      className="w-full pb-3 pt-1 bg-transparent border-b border-white/20 focus:border-[#F5F5F3] text-base text-white placeholder-white/20 transition-colors outline-none font-sans"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7E8494] mb-2">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+41 44 000 00 00"
                      className="w-full pb-3 pt-1 bg-transparent border-b border-white/20 focus:border-[#F5F5F3] text-base text-white placeholder-white/20 transition-colors outline-none font-sans"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7E8494] mb-3">
                    Project Scope
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, project_type: type }))}
                        className={`px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-all ${
                          formData.project_type === type
                            ? "bg-[#F5F5F3] text-[#080808] font-bold"
                            : "bg-white/5 text-[#8E94A0] hover:text-white hover:bg-white/10 border border-white/5"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7E8494] mb-2">
                      Target Budget (CHF)
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full pb-3 pt-1 bg-transparent border-b border-white/20 focus:border-[#F5F5F3] text-xs font-mono text-white outline-none"
                    >
                      {BUDGET_RANGES.map((b) => (
                        <option key={b} value={b} className="bg-[#111215] text-white">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7E8494] mb-2">
                      Target Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full pb-3 pt-1 bg-transparent border-b border-white/20 focus:border-[#F5F5F3] text-xs font-mono text-white outline-none"
                    >
                      {TIMELINES.map((t) => (
                        <option key={t} value={t} className="bg-[#111215] text-white">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7E8494] mb-2">
                    Project Requirements & Business Objectives *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Briefly describe the business problem, target users, current systems, and key milestones..."
                    className="w-full pb-3 pt-1 bg-transparent border-b border-white/20 focus:border-[#F5F5F3] text-base text-white placeholder-white/20 transition-colors outline-none font-sans resize-none"
                  ></textarea>
                </div>

                {/* Submit Action */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#F5F5F3] hover:bg-white text-[#080808] text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Transmitting Brief..." : "Start the conversation"}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#E30613]" />
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
