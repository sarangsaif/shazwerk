"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Inbox,
  BarChart3,
  LogOut,
  Mail,
  Building,
  Calendar,
  DollarSign,
  Tag,
  CheckCircle2,
  Clock,
  Archive,
  Eye,
  Activity,
  Globe,
  MousePointer,
} from "lucide-react";
import { ContactSubmission, SubmissionStatus, AnalyticsSummary } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface Props {
  initialSubmissions: ContactSubmission[];
  analytics: AnalyticsSummary;
}

export default function AdminDashboardView({ initialSubmissions, analytics }: Props) {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(initialSubmissions);
  const [activeTab, setActiveTab] = useState<"inquiries" | "analytics">("inquiries");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(
    initialSubmissions[0] || null
  );
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const router = useRouter();

  const handleStatusChange = async (id: string, newStatus: SubmissionStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setSubmissions((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
        );
        if (selectedSubmission?.id === id) {
          setSelectedSubmission((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  const filteredSubmissions = submissions.filter((s) => {
    if (statusFilter === "all") return true;
    return s.status === statusFilter;
  });

  const counts = {
    all: submissions.length,
    new: submissions.filter((s) => s.status === "new").length,
    contacted: submissions.filter((s) => s.status === "contacted").length,
    qualified: submissions.filter((s) => s.status === "qualified").length,
    archived: submissions.filter((s) => s.status === "archived").length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E5E5E0] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#E30613]"></span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              SHAZWERK INTERNAL
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0C0E11] tracking-tight">
            Studio Management Console
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* View Tab Buttons */}
          <div className="flex items-center bg-[#FFFFFF] border border-[#E0E0DA] p-1 font-mono text-xs">
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
                activeTab === "inquiries"
                  ? "bg-[#0C0E11] text-[#FAFAF8] font-bold"
                  : "text-[#4B5563] hover:text-[#0C0E11]"
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Inquiries ({counts.new} new)</span>
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
                activeTab === "analytics"
                  ? "bg-[#0C0E11] text-[#FAFAF8] font-bold"
                  : "text-[#4B5563] hover:text-[#0C0E11]"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Telemetry</span>
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 border border-[#E0E0DA] hover:border-[#0C0E11] hover:bg-[#FFFFFF] text-[#6B7280] hover:text-[#0C0E11] transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tab 1: Inquiries Triage */}
      {activeTab === "inquiries" && (
        <div>
          {/* Sub-Filter Bar */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(["all", "new", "contacted", "qualified", "archived"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 text-xs font-mono uppercase tracking-wider border transition-colors ${
                  statusFilter === status
                    ? "bg-[#0C0E11] text-[#FAFAF8] border-[#0C0E11] font-bold"
                    : "bg-[#FFFFFF] text-[#4B5563] border-[#E0E0DA] hover:border-[#9CA3AF]"
                }`}
              >
                {status} ({counts[status]})
              </button>
            ))}
          </div>

          {filteredSubmissions.length === 0 ? (
            /* Empty State */
            <div className="bg-[#FFFFFF] border border-[#E0E0DA] p-12 text-center">
              <Inbox className="w-8 h-8 text-[#9CA3AF] mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#0C0E11] mb-1">No Inquiries Found</h3>
              <p className="text-xs text-[#6B7280] font-mono">
                No project briefs match the &quot;{statusFilter}&quot; filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Submissions List */}
              <div className="lg:col-span-5 space-y-3">
                {filteredSubmissions.map((sub) => {
                  const isSelected = selectedSubmission?.id === sub.id;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedSubmission(sub)}
                      className={`p-4 border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-[#FFFFFF] border-[#0C0E11] shadow-sm ring-1 ring-[#0C0E11]"
                          : "bg-[#FFFFFF] border-[#E0E0DA] hover:border-[#9CA3AF]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-sm text-[#0C0E11] tracking-tight">
                          {sub.company}
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 ${
                            sub.status === "new"
                              ? "bg-[#FEF2F2] text-[#E30613] font-bold border border-[#FCA5A5]"
                              : sub.status === "contacted"
                              ? "bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]"
                              : sub.status === "qualified"
                              ? "bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]"
                              : "bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </div>

                      <div className="text-xs text-[#4B5563] mb-2">{sub.name} · {sub.project_type}</div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-[#9CA3AF] pt-2 border-t border-[#F0F0EB]">
                        <span>{formatDate(sub.created_at)}</span>
                        <span>{sub.budget || "No budget specified"}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Selected Submission Detail */}
              {selectedSubmission && (
                <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E0E0DA] p-6 sm:p-8 sticky top-24">
                  <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-[#E5E5E0] gap-3">
                    <div>
                      <div className="text-[10px] font-mono text-[#9CA3AF] uppercase mb-1">
                        INQUIRY REF: {selectedSubmission.id.slice(0, 8).toUpperCase()}
                      </div>
                      <h2 className="text-xl font-bold text-[#0C0E11]">
                        {selectedSubmission.company}
                      </h2>
                    </div>

                    {/* Action Buttons to update status */}
                    <div className="flex items-center gap-1.5 font-mono text-xs">
                      {selectedSubmission.status !== "contacted" && (
                        <button
                          disabled={updatingId === selectedSubmission.id}
                          onClick={() => handleStatusChange(selectedSubmission.id, "contacted")}
                          className="px-2.5 py-1 bg-[#F4F4F0] hover:bg-[#E5E5E0] text-[#0C0E11] border border-[#D5D5CF] transition-colors"
                        >
                          Mark Contacted
                        </button>
                      )}
                      {selectedSubmission.status !== "qualified" && (
                        <button
                          disabled={updatingId === selectedSubmission.id}
                          onClick={() => handleStatusChange(selectedSubmission.id, "qualified")}
                          className="px-2.5 py-1 bg-[#059669] hover:bg-[#047857] text-white transition-colors"
                        >
                          Qualify
                        </button>
                      )}
                      {selectedSubmission.status !== "archived" && (
                        <button
                          disabled={updatingId === selectedSubmission.id}
                          onClick={() => handleStatusChange(selectedSubmission.id, "archived")}
                          className="px-2.5 py-1 bg-[#FFFFFF] hover:bg-[#FEF2F2] text-[#6B7280] hover:text-[#B91C1C] border border-[#D5D5CF] transition-colors"
                        >
                          Archive
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Metadata Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 p-4 bg-[#FAFAF8] border border-[#E5E5E0] font-mono text-xs">
                    <div>
                      <div className="text-[10px] text-[#9CA3AF] uppercase">Contact Person</div>
                      <div className="font-bold text-[#0C0E11] mt-0.5">{selectedSubmission.name}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#9CA3AF] uppercase">Direct Email</div>
                      <a
                        href={`mailto:${selectedSubmission.email}`}
                        className="text-[#E30613] underline truncate block mt-0.5"
                      >
                        {selectedSubmission.email}
                      </a>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#9CA3AF] uppercase">Phone</div>
                      <div className="text-[#0C0E11] mt-0.5">{selectedSubmission.phone || "Not provided"}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#9CA3AF] uppercase">Project Scope</div>
                      <div className="text-[#0C0E11] font-semibold mt-0.5">{selectedSubmission.project_type}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#9CA3AF] uppercase">Target Budget</div>
                      <div className="text-[#0C0E11] font-semibold mt-0.5">{selectedSubmission.budget || "Unspecified"}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#9CA3AF] uppercase">Target Timeline</div>
                      <div className="text-[#0C0E11] font-semibold mt-0.5">{selectedSubmission.timeline || "Unspecified"}</div>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#6B7280] mb-2 font-bold">
                      Project Brief & Technical Scope
                    </div>
                    <div className="p-5 bg-[#FAFAF8] border border-[#E5E5E0] text-xs text-[#1F242D] leading-relaxed whitespace-pre-wrap font-sans">
                      {selectedSubmission.message}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#F0F0EB] flex items-center justify-between text-[11px] font-mono text-[#9CA3AF]">
                    <span>RECEIVED: {formatDate(selectedSubmission.created_at)}</span>
                    <a
                      href={`mailto:${selectedSubmission.email}?subject=Regarding%20your%20inquiry%20with%20SHAZWERK`}
                      className="px-4 py-2 bg-[#0C0E11] text-[#FAFAF8] hover:bg-[#1F242D] font-bold tracking-wider"
                    >
                      Reply via Email &rarr;
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Privacy-Conscious Telemetry & Analytics */}
      {activeTab === "analytics" && (
        <div className="space-y-8">
          {/* High-Level Overview Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#FFFFFF] border border-[#E0E0DA] p-5">
              <div className="text-[10px] font-mono text-[#6B7280] uppercase">Total Pageviews</div>
              <div className="text-3xl font-extrabold font-mono text-[#0C0E11] mt-1">
                {analytics.totalPageviews}
              </div>
              <div className="text-[10px] font-mono text-[#9CA3AF] mt-1">First-party edge telemetry</div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E0E0DA] p-5">
              <div className="text-[10px] font-mono text-[#6B7280] uppercase">Estimated Unique Visitors</div>
              <div className="text-3xl font-extrabold font-mono text-[#0C0E11] mt-1">
                {analytics.uniqueVisitorsEstimate}
              </div>
              <div className="text-[10px] font-mono text-[#9CA3AF] mt-1">Zero-fingerprinting heuristic</div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E0E0DA] p-5">
              <div className="text-[10px] font-mono text-[#6B7280] uppercase">Inquiries Transmitted</div>
              <div className="text-3xl font-extrabold font-mono text-[#0C0E11] mt-1">
                {submissions.length}
              </div>
              <div className="text-[10px] font-mono text-[#10B981] mt-1">Active project pipeline</div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E0E0DA] p-5">
              <div className="text-[10px] font-mono text-[#6B7280] uppercase">Conversion Rate</div>
              <div className="text-3xl font-extrabold font-mono text-[#0C0E11] mt-1">
                {analytics.totalPageviews > 0
                  ? `${((submissions.length / analytics.totalPageviews) * 100).toFixed(1)}%`
                  : "0.0%"}
              </div>
              <div className="text-[10px] font-mono text-[#9CA3AF] mt-1">Inquiry / view ratio</div>
            </div>
          </div>

          {/* Breakdown Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Pages */}
            <div className="bg-[#FFFFFF] border border-[#E0E0DA] p-6">
              <h3 className="text-sm font-bold text-[#0C0E11] mb-4 font-mono uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#E30613]" />
                <span>Top Viewed Routes</span>
              </h3>
              {analytics.topPages.length === 0 ? (
                <div className="text-xs text-[#9CA3AF] font-mono py-4">
                  No telemetry recorded yet. Live visits will register automatically.
                </div>
              ) : (
                <div className="space-y-2 font-mono text-xs">
                  {analytics.topPages.map((p) => (
                    <div key={p.path} className="flex justify-between p-2.5 bg-[#FAFAF8] border border-[#EAEAE5]">
                      <span className="font-semibold text-[#0C0E11]">{p.path}</span>
                      <span className="text-[#6B7280]">{p.count} views</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Click Interactions */}
            <div className="bg-[#FFFFFF] border border-[#E0E0DA] p-6">
              <h3 className="text-sm font-bold text-[#0C0E11] mb-4 font-mono uppercase tracking-wider flex items-center gap-2">
                <MousePointer className="w-4 h-4 text-[#E30613]" />
                <span>Most Interacted Actions (CTAs)</span>
              </h3>
              {analytics.ctaClicks.length === 0 ? (
                <div className="text-xs text-[#9CA3AF] font-mono py-4">
                  No CTA interactions recorded yet.
                </div>
              ) : (
                <div className="space-y-2 font-mono text-xs">
                  {analytics.ctaClicks.map((c) => (
                    <div key={c.cta_id} className="flex justify-between p-2.5 bg-[#FAFAF8] border border-[#EAEAE5]">
                      <span className="font-semibold text-[#0C0E11]">{c.cta_id}</span>
                      <span className="text-[#6B7280]">{c.count} clicks</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Geographic Distribution (Edge Country Headers) */}
            <div className="bg-[#FFFFFF] border border-[#E0E0DA] p-6">
              <h3 className="text-sm font-bold text-[#0C0E11] mb-4 font-mono uppercase tracking-wider">
                Geographic Traffic (Edge Headers)
              </h3>
              {analytics.countries.length === 0 ? (
                <div className="text-xs text-[#9CA3AF] font-mono py-4">
                  No regional data yet.
                </div>
              ) : (
                <div className="space-y-2 font-mono text-xs">
                  {analytics.countries.map((c) => (
                    <div key={c.country} className="flex justify-between p-2.5 bg-[#FAFAF8] border border-[#EAEAE5]">
                      <span>{c.country}</span>
                      <span className="text-[#6B7280]">{c.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Referrers */}
            <div className="bg-[#FFFFFF] border border-[#E0E0DA] p-6">
              <h3 className="text-sm font-bold text-[#0C0E11] mb-4 font-mono uppercase tracking-wider">
                Traffic Sources & Referrers
              </h3>
              {analytics.referrers.length === 0 ? (
                <div className="text-xs text-[#9CA3AF] font-mono py-4">
                  No external referral sources recorded yet.
                </div>
              ) : (
                <div className="space-y-2 font-mono text-xs">
                  {analytics.referrers.map((r) => (
                    <div key={r.source} className="flex justify-between p-2.5 bg-[#FAFAF8] border border-[#EAEAE5]">
                      <span>{r.source}</span>
                      <span className="text-[#6B7280]">{r.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
