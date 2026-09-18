"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, Clock, Mail, MapPin, ShieldCheck, AlertCircle } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

const PROJECT_TYPES = [
  "New digital product",
  "Web application",
  "Mobile application",
  "AI / automation",
  "UX/UI",
  "Software development",
  "Other",
];

const BUDGET_RANGES = [
  "< CHF 25k (Sprint / MVP)",
  "CHF 25k – 60k (New Platform)",
  "CHF 60k – 120k (Full-Scale System)",
  "CHF 120k+ (Enterprise / Dedicated Squad)",
  "To be scoped",
];

const TIMELINES = [
  "Immediate (< 1 month)",
  "1 – 3 months",
  "3 – 6 months",
  "Flexible / Long-term",
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
    // Honeypot field for spam prevention
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

    // Basic Client validation
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
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Contact Hero */}
      <section className="border-b border-[#E5E5E0] pt-16 pb-20 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFEFEA] border border-[#E0E0DA] text-[11px] font-mono uppercase tracking-[0.16em] text-[#4B5563] mb-6">
              <span className="w-1.5 h-1.5 bg-[#E30613] rounded-full"></span>
              <span>PROJECT INQUIRY & ENGAGEMENT</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-[#0C0E11] leading-[1.08] mb-6">
              Start a project with SHAZWERK.
            </h1>
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
              We work with founders, executives, and engineering leads to design and build durable software platforms and digital products. Share your scope below for a direct, confidential technical consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Contact Info Section */}
      <section className="py-20 bg-[#FFFFFF] border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Communication Specs */}
            <div className="lg:col-span-4 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-[#0C0E11] mb-3 tracking-tight">
                  Direct Engineering Inquiries
                </h3>
                <p className="text-xs text-[#6B7280] leading-relaxed mb-6">
                  Every inquiry is reviewed directly by our senior engineering leadership. We evaluate technical feasibility, architecture requirements, and milestone commitments within 24 hours.
                </p>

                <div className="space-y-4 text-xs font-mono">
                  <div className="p-4 bg-[#FAFAF8] border border-[#E0E0DA]">
                    <div className="text-[#9CA3AF] text-[10px] uppercase mb-1">Direct Email</div>
                    <a
                      href="mailto:contact@shazwerk.ch"
                      className="text-[#0C0E11] font-bold hover:text-[#E30613] transition-colors flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>contact@shazwerk.ch</span>
                    </a>
                  </div>

                  <div className="p-4 bg-[#FAFAF8] border border-[#E0E0DA]">
                    <div className="text-[#9CA3AF] text-[10px] uppercase mb-1">Location & Hub</div>
                    <div className="text-[#0C0E11] font-medium flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#E30613]" />
                      <span>Zurich, Switzerland (CET / CEST)</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#FAFAF8] border border-[#E0E0DA]">
                    <div className="text-[#9CA3AF] text-[10px] uppercase mb-1">Confidentiality</div>
                    <div className="text-[#0C0E11] font-medium flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Mutual NDAs executed before deep briefing</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#E5E5E0] pt-6 text-[11px] font-mono text-[#6B7280] space-y-1">
                <div>SECURITY: End-to-end encrypted transport (TLS 1.3)</div>
                <div>DATA PRIVACY: Swiss nDSG compliant retention</div>
                <div>RESPONSE SLA: &le; 24 business hours</div>
              </div>
            </div>

            {/* Right Column: Premium Inquiry Form */}
            <div className="lg:col-span-8 bg-[#FAFAF8] border border-[#E0E0DA] p-6 sm:p-10">
              {submissionSuccess ? (
                /* Success State */
                <div className="p-8 bg-[#FFFFFF] border border-[#10B981] text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0C0E11] tracking-tight">
                    Inquiry Transmitted Successfully.
                  </h3>
                  <p className="text-xs text-[#4B5563] max-w-md mx-auto leading-relaxed">
                    Thank you. Your project brief has been logged into our secure triage system. A senior technical partner from SHAZWERK will review your requirements and reach out within 24 business hours.
                  </p>
                  <div className="inline-block p-3 bg-[#FAFAF8] border border-[#E5E5E0] font-mono text-[11px] text-[#6B7280]">
                    REFERENCE ID: <span className="text-[#0C0E11] font-bold">{submissionSuccess}</span>
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
                      className="px-6 py-2.5 bg-[#0C0E11] text-[#FAFAF8] text-xs font-mono uppercase tracking-wider hover:bg-[#1F242D]"
                    >
                      Submit another brief
                    </button>
                  </div>
                </div>
              ) : (
                /* Main Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot Spam Trap (hidden from real users) */}
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
                    <div className="p-4 bg-[#FEF2F2] border border-[#F87171] text-xs text-[#B91C1C] flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Row 1: Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-xs font-semibold text-[#0C0E11] uppercase tracking-wider mb-2">
                        Your Name <span className="text-[#E30613]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Adrian Meier"
                        className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#D5D5CF] focus:border-[#0C0E11] focus:ring-0 text-sm text-[#0C0E11] placeholder-[#9CA3AF] transition-colors outline-none font-sans"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-semibold text-[#0C0E11] uppercase tracking-wider mb-2">
                        Company / Organization <span className="text-[#E30613]">*</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="e.g. Helvetia Digital AG"
                        className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#D5D5CF] focus:border-[#0C0E11] focus:ring-0 text-sm text-[#0C0E11] placeholder-[#9CA3AF] transition-colors outline-none font-sans"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-xs font-semibold text-[#0C0E11] uppercase tracking-wider mb-2">
                        Email Address <span className="text-[#E30613]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="adrian@company.ch"
                        className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#D5D5CF] focus:border-[#0C0E11] focus:ring-0 text-sm text-[#0C0E11] placeholder-[#9CA3AF] transition-colors outline-none font-sans"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-semibold text-[#0C0E11] uppercase tracking-wider mb-2">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+41 44 000 00 00"
                        className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#D5D5CF] focus:border-[#0C0E11] focus:ring-0 text-sm text-[#0C0E11] placeholder-[#9CA3AF] transition-colors outline-none font-sans"
                      />
                    </div>
                  </div>

                  {/* Row 3: Project Type */}
                  <div>
                    <label className="block font-mono text-xs font-semibold text-[#0C0E11] uppercase tracking-wider mb-2">
                      Project Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {PROJECT_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, project_type: type }))}
                          className={`p-2.5 text-xs text-left font-mono border transition-all ${
                            formData.project_type === type
                              ? "bg-[#0C0E11] text-[#FAFAF8] border-[#0C0E11] font-bold"
                              : "bg-[#FFFFFF] text-[#4B5563] border-[#D5D5CF] hover:border-[#9CA3AF]"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Row 4: Budget Range & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-xs font-semibold text-[#0C0E11] uppercase tracking-wider mb-2">
                        Target Budget (CHF)
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#D5D5CF] focus:border-[#0C0E11] text-xs font-mono text-[#0C0E11] outline-none"
                      >
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-semibold text-[#0C0E11] uppercase tracking-wider mb-2">
                        Target Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#D5D5CF] focus:border-[#0C0E11] text-xs font-mono text-[#0C0E11] outline-none"
                      >
                        {TIMELINES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Project Description */}
                  <div>
                    <label className="block font-mono text-xs font-semibold text-[#0C0E11] uppercase tracking-wider mb-2">
                      Project Description & Technical Requirements <span className="text-[#E30613]">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Briefly describe the business problem, target users, current systems, and key milestones..."
                      className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#D5D5CF] focus:border-[#0C0E11] focus:ring-0 text-sm text-[#0C0E11] placeholder-[#9CA3AF] transition-colors outline-none font-sans"
                    ></textarea>
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0C0E11] hover:bg-[#1F242D] text-[#FAFAF8] text-xs font-mono uppercase font-bold tracking-widest transition-all disabled:opacity-50"
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
      </section>
    </div>
  );
}
