"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Inbox,
  BarChart3,
  LogOut,
  Globe,
  MousePointer,
  CheckCircle2,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-32 text-[#F5F5F3]">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-10 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#E30613]"></span>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#7E8494]">
              SHAZWERK STUDIO CONSOLE
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Inquiries & Telemetry
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full bg-white/5 border border-white/10 p-1 font-mono text-xs">
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-colors ${
                activeTab === "inquiries"
                  ? "bg-[#F5F5F3] text-[#080808] font-bold"
                  : "text-[#8E94A0] hover:text-white"
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Inquiries ({counts.new})</span>
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-colors ${
                activeTab === "analytics"
                  ? "bg-[#F5F5F3] text-[#080808] font-bold"
                  : "text-[#8E94A0] hover:text-white"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Telemetry</span>
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="p-2.5 rounded-full border border-white/10 hover:border-white/30 text-[#7E8494] hover:text-white transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tab 1: Inquiries */}
      {activeTab === "inquiries" && (
        <div>
          {/* Sub Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {(["all", "new", "contacted", "qualified", "archived"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
                  statusFilter === status
                    ? "bg-[#F5F5F3] text-[#080808] font-bold"
                    : "bg-white/5 text-[#8E94A0] hover:text-white border border-white/5"
                }`}
              >
                {status} ({counts[status]})
              </button>
            ))}
          </div>

          {filteredSubmissions.length === 0 ? (
            <div className="p-16 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
              <Inbox className="w-8 h-8 text-[#7E8494] mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1">No Inquiries</h3>
              <p className="text-xs text-[#7E8494] font-mono">
                No project briefs match the &quot;{statusFilter}&quot; filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* List */}
              <div className="lg:col-span-5 space-y-3">
                {filteredSubmissions.map((sub) => {
                  const isSelected = selectedSubmission?.id === sub.id;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedSubmission(sub)}
                      className={`p-5 rounded-xl cursor-pointer transition-all border ${
                        isSelected
                          ? "bg-white/10 border-white/30 shadow-lg"
                          : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-white tracking-tight">
                          {sub.company}
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                            sub.status === "new"
                              ? "bg-[#E30613]/20 text-[#E30613] font-bold border border-[#E30613]/40"
                              : sub.status === "contacted"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                              : sub.status === "qualified"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-white/10 text-white/50 border border-white/10"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </div>
                      <div className="text-xs text-[#A0A5B0] mb-2">{sub.name} · {sub.project_type}</div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#7E8494] pt-2 border-t border-white/5">
                        <span>{formatDate(sub.created_at)}</span>
                        <span>{sub.budget || "Unspecified"}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Detail */}
              {selectedSubmission && (
                <div className="lg:col-span-7 rounded-2xl bg-white/[0.02] border border-white/10 p-8 sticky top-32">
                  <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-white/10 gap-3">
                    <div>
                      <div className="text-[10px] font-mono text-[#7E8494] uppercase mb-1">
                        REF: {selectedSubmission.id.slice(0, 8).toUpperCase()}
                      </div>
                      <h2 className="text-2xl font-bold text-white">
                        {selectedSubmission.company}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      {selectedSubmission.status !== "contacted" && (
                        <button
                          disabled={updatingId === selectedSubmission.id}
                          onClick={() => handleStatusChange(selectedSubmission.id, "contacted")}
                          className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 text-white border border-white/10"
                        >
                          Contacted
                        </button>
                      )}
                      {selectedSubmission.status !== "qualified" && (
                        <button
                          disabled={updatingId === selectedSubmission.id}
                          onClick={() => handleStatusChange(selectedSubmission.id, "qualified")}
                          className="px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                        >
                          Qualify
                        </button>
                      )}
                      {selectedSubmission.status !== "archived" && (
                        <button
                          disabled={updatingId === selectedSubmission.id}
                          onClick={() => handleStatusChange(selectedSubmission.id, "archived")}
                          className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 text-[#7E8494] hover:text-white"
                        >
                          Archive
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs">
                    <div>
                      <div className="text-[10px] text-[#7E8494] uppercase">Contact</div>
                      <div className="font-bold text-white mt-0.5">{selectedSubmission.name}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#7E8494] uppercase">Email</div>
                      <a href={`mailto:${selectedSubmission.email}`} className="text-[#E30613] truncate block mt-0.5">
                        {selectedSubmission.email}
                      </a>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#7E8494] uppercase">Phone</div>
                      <div className="text-white mt-0.5">{selectedSubmission.phone || "None"}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#7E8494] uppercase">Scope</div>
                      <div className="text-white mt-0.5">{selectedSubmission.project_type}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#7E8494] uppercase">Budget</div>
                      <div className="text-white mt-0.5">{selectedSubmission.budget || "None"}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#7E8494] uppercase">Timeline</div>
                      <div className="text-white mt-0.5">{selectedSubmission.timeline || "None"}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#7E8494] mb-2 font-bold">
                      Message
                    </div>
                    <div className="p-5 rounded-xl bg-black/40 border border-white/5 text-sm text-[#D1D5DB] leading-relaxed whitespace-pre-wrap font-sans">
                      {selectedSubmission.message}
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#7E8494]">RECEIVED: {formatDate(selectedSubmission.created_at)}</span>
                    <a
                      href={`mailto:${selectedSubmission.email}?subject=Regarding%20your%20inquiry%20with%20SHAZWERK`}
                      className="px-4 py-2 rounded-full bg-[#F5F5F3] text-[#080808] font-bold tracking-wider hover:bg-white"
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

      {/* Tab 2: Analytics */}
      {activeTab === "analytics" && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-[10px] font-mono text-[#7E8494] uppercase">Total Views</div>
              <div className="text-4xl font-extrabold font-mono text-white mt-1">
                {analytics.totalPageviews}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-[10px] font-mono text-[#7E8494] uppercase">Est. Unique Visitors</div>
              <div className="text-4xl font-extrabold font-mono text-white mt-1">
                {analytics.uniqueVisitorsEstimate}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-[10px] font-mono text-[#7E8494] uppercase">Inquiries</div>
              <div className="text-4xl font-extrabold font-mono text-white mt-1">
                {submissions.length}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-[10px] font-mono text-[#7E8494] uppercase">Conversion Rate</div>
              <div className="text-4xl font-extrabold font-mono text-white mt-1">
                {analytics.totalPageviews > 0
                  ? `${((submissions.length / analytics.totalPageviews) * 100).toFixed(1)}%`
                  : "0.0%"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-sm font-bold text-white mb-4 font-mono uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#E30613]" />
                <span>Top Routes</span>
              </h3>
              {analytics.topPages.length === 0 ? (
                <div className="text-xs text-[#7E8494] font-mono py-4">No data recorded yet.</div>
              ) : (
                <div className="space-y-2 font-mono text-xs">
                  {analytics.topPages.map((p) => (
                    <div key={p.path} className="flex justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <span className="font-semibold text-white">{p.path}</span>
                      <span className="text-[#7E8494]">{p.count} views</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-sm font-bold text-white mb-4 font-mono uppercase tracking-wider flex items-center gap-2">
                <MousePointer className="w-4 h-4 text-[#E30613]" />
                <span>CTA Interactions</span>
              </h3>
              {analytics.ctaClicks.length === 0 ? (
                <div className="text-xs text-[#7E8494] font-mono py-4">No CTA data yet.</div>
              ) : (
                <div className="space-y-2 font-mono text-xs">
                  {analytics.ctaClicks.map((c) => (
                    <div key={c.cta_id} className="flex justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <span className="font-semibold text-white">{c.cta_id}</span>
                      <span className="text-[#7E8494]">{c.count}</span>
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
