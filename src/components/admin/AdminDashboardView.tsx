"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Inbox,
  BarChart3,
  LogOut,
  Mail,
  CheckCircle2,
  Trash2,
  Send,
  ExternalLink,
  Download,
  Search,
  Filter,
  RefreshCw,
  Clock,
  Sparkles,
  ArrowUpRight,
  Shield,
  Save,
  Check,
  AlertCircle,
} from "lucide-react";
import {
  ContactSubmission,
  SubmissionStatus,
  AnalyticsSummary,
  EmailSettings,
} from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface Props {
  initialSubmissions: ContactSubmission[];
  analytics: AnalyticsSummary;
  initialEmailSettings: EmailSettings;
}

export default function AdminDashboardView({
  initialSubmissions,
  analytics,
  initialEmailSettings,
}: Props) {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(initialSubmissions);
  const [emailSettings, setEmailSettings] = useState<EmailSettings>(initialEmailSettings);
  const [activeTab, setActiveTab] = useState<"queries" | "analytics" | "email">("queries");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(
    initialSubmissions[0] || null
  );
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [forwardingId, setForwardingId] = useState<string | null>(null);
  const [forwardSuccess, setForwardSuccess] = useState<string | null>(null);

  // Email settings state
  const [savingSettings, setSavingSettings] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [testingEmail, setTestingEmail] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const router = useRouter();

  // Handle status update
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

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project query?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/submissions?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const next = submissions.filter((s) => s.id !== id);
        setSubmissions(next);
        if (selectedSubmission?.id === id) {
          setSelectedSubmission(next[0] || null);
        }
      }
    } catch (err) {
      console.error("Failed to delete submission:", err);
    } finally {
      setDeletingId(null);
    }
  };

  // Forward submission to email
  const handleForwardToEmail = async (id: string) => {
    setForwardingId(id);
    setForwardSuccess(null);
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setForwardSuccess(`Dispatched to ${emailSettings.notificationEmail}!`);
        setTimeout(() => setForwardSuccess(null), 4000);
      } else {
        alert("Forwarding failed: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      alert("Error forwarding to email: " + err.message);
    } finally {
      setForwardingId(null);
    }
  };

  // Save email settings
  const handleSaveEmailSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSaveMessage(null);
    try {
      const res = await fetch("/api/admin/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailSettings),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSaveMessage("Settings saved successfully.");
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        alert("Failed to save settings: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSavingSettings(false);
    }
  };

  // Test email notification
  const handleSendTestEmail = async () => {
    setTestingEmail(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/admin/email", { method: "PUT" });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestResult({
          success: true,
          message: `Test email dispatched to ${emailSettings.notificationEmail} via ${data.result?.provider || "console"}. Check your inbox!`,
        });
      } else {
        setTestResult({
          success: false,
          message: data.error || "Failed to dispatch test notification.",
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || "Network error sending test email.",
      });
    } finally {
      setTestingEmail(false);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Timestamp",
      "Name",
      "Company",
      "Email",
      "Phone",
      "Scope",
      "Budget",
      "Timeline",
      "Status",
      "Message",
    ];
    const rows = submissions.map((s) => [
      s.id,
      s.created_at,
      `"${(s.name || "").replace(/"/g, '""')}"`,
      `"${(s.company || "").replace(/"/g, '""')}"`,
      s.email,
      s.phone || "",
      `"${(s.project_type || "").replace(/"/g, '""')}"`,
      `"${(s.budget || "").replace(/"/g, '""')}"`,
      `"${(s.timeline || "").replace(/"/g, '""')}"`,
      s.status,
      `"${(s.message || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `shazwerk_queries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  // Filter & search submissions
  const filteredSubmissions = submissions.filter((s) => {
    if (statusFilter !== "all" && s.status !== statusFilter) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.company.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.project_type.toLowerCase().includes(q) ||
        s.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const counts = {
    all: submissions.length,
    new: submissions.filter((s) => s.status === "new").length,
    contacted: submissions.filter((s) => s.status === "contacted").length,
    qualified: submissions.filter((s) => s.status === "qualified").length,
    archived: submissions.filter((s) => s.status === "archived").length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-28 text-neutral-900">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-neutral-200 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-semibold text-lg text-neutral-950">shazwerk</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            <span className="text-xs font-mono text-neutral-400">/ Studio Console</span>
          </div>
          <p className="text-xs font-mono text-neutral-500">
            Internal Operations · Project Queries & Visitor Telemetry
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-mono transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-red-50 hover:text-red-700 text-neutral-700 text-xs font-mono transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-4 mb-8 text-xs font-mono">
        <button
          type="button"
          onClick={() => setActiveTab("queries")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
            activeTab === "queries"
              ? "bg-neutral-950 text-white shadow-xs"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Project Queries ({counts.new} new)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
            activeTab === "analytics"
              ? "bg-neutral-950 text-white shadow-xs"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Visits & Telemetry ({analytics.totalPageviews} views)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("email")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
            activeTab === "email"
              ? "bg-neutral-950 text-white shadow-xs"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Email Dispatch & Notifications</span>
        </button>
      </div>

      {/* TAB 1: PROJECT QUERIES */}
      {activeTab === "queries" && (
        <div className="space-y-6">
          {/* Controls Bar: Filter, Search, Export */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(["all", "new", "contacted", "qualified", "archived"] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-all ${
                    statusFilter === st
                      ? "bg-neutral-950 text-white font-semibold"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {st} ({counts[st]})
                </button>
              ))}
            </div>

            {/* Search & Export */}
            <div className="flex items-center gap-2">
              <div className="relative flex-grow sm:w-64">
                <input
                  type="text"
                  placeholder="Search queries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs font-mono bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-950"
                />
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
              </div>

              <button
                type="button"
                onClick={handleExportCSV}
                title="Export queries to CSV"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-mono transition-colors shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Export CSV</span>
              </button>
            </div>
          </div>

          {/* Master-Detail Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Queries List */}
            <div className="lg:col-span-5 bg-neutral-50 border border-neutral-200 rounded-2xl p-4 max-h-[750px] overflow-y-auto space-y-2">
              {filteredSubmissions.length === 0 ? (
                <div className="py-12 text-center text-xs font-mono text-neutral-400">
                  No project queries match the current filter.
                </div>
              ) : (
                filteredSubmissions.map((sub) => {
                  const isSelected = selectedSubmission?.id === sub.id;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedSubmission(sub)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-white border-neutral-950 shadow-sm"
                          : "bg-white/80 border-neutral-200/80 hover:border-neutral-300"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                        <span className="font-semibold text-neutral-950 truncate max-w-[180px]">
                          {sub.company}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                            sub.status === "new"
                              ? "bg-red-100 text-red-700"
                              : sub.status === "contacted"
                              ? "bg-blue-100 text-blue-700"
                              : sub.status === "qualified"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-neutral-100 text-neutral-600"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </div>

                      <div className="text-xs text-neutral-600 mb-2 truncate">
                        {sub.name} · {sub.email}
                      </div>

                      <div className="text-xs text-neutral-800 line-clamp-2 leading-relaxed mb-3">
                        {sub.message}
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-100">
                        <span>{sub.project_type}</span>
                        <span>{formatDate(sub.created_at)}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right Column: Query Detail View */}
            <div className="lg:col-span-7 bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8">
              {selectedSubmission ? (
                <div className="space-y-6">
                  {/* Top Bar: Company & Status Triage */}
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-neutral-200">
                    <div>
                      <div className="text-xs font-mono text-neutral-400 mb-1">
                        INQUIRY ID: {selectedSubmission.id.slice(0, 8).toUpperCase()}
                      </div>
                      <h3 className="text-2xl font-medium tracking-tight text-neutral-950">
                        {selectedSubmission.company}
                      </h3>
                      <div className="text-xs font-mono text-neutral-500 mt-1">
                        Submitted: {new Date(selectedSubmission.created_at).toLocaleString("en-GB")}
                      </div>
                    </div>

                    {/* Status Select */}
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-mono uppercase text-neutral-400">Status:</label>
                      <select
                        value={selectedSubmission.status}
                        disabled={updatingId === selectedSubmission.id}
                        onChange={(e) =>
                          handleStatusChange(selectedSubmission.id, e.target.value as SubmissionStatus)
                        }
                        className="px-3 py-1.5 text-xs font-mono bg-white border border-neutral-300 rounded-lg focus:border-neutral-950 font-semibold text-neutral-900"
                      >
                        <option value="new">NEW</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="qualified">QUALIFIED</option>
                        <option value="archived">ARCHIVED</option>
                      </select>
                    </div>
                  </div>

                  {/* Client Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="bg-white p-4 rounded-xl border border-neutral-200">
                      <span className="text-neutral-400 block mb-1">LEAD NAME</span>
                      <span className="font-semibold text-sm text-neutral-950">
                        {selectedSubmission.name}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-neutral-200">
                      <span className="text-neutral-400 block mb-1">WORK EMAIL</span>
                      <a
                        href={`mailto:${selectedSubmission.email}`}
                        className="font-semibold text-sm text-red-600 hover:underline"
                      >
                        {selectedSubmission.email}
                      </a>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-neutral-200">
                      <span className="text-neutral-400 block mb-1">PHONE NUMBER</span>
                      <span className="text-neutral-950 font-medium">
                        {selectedSubmission.phone || "Not specified"}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-neutral-200">
                      <span className="text-neutral-400 block mb-1">SCOPE OF ENGAGEMENT</span>
                      <span className="text-neutral-950 font-medium">
                        {selectedSubmission.project_type}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-neutral-200">
                      <span className="text-neutral-400 block mb-1">ESTIMATED BUDGET</span>
                      <span className="text-neutral-950 font-medium">
                        {selectedSubmission.budget || "Not specified"}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-neutral-200">
                      <span className="text-neutral-400 block mb-1">TARGET TIMELINE</span>
                      <span className="text-neutral-950 font-medium">
                        {selectedSubmission.timeline || "Not specified"}
                      </span>
                    </div>
                  </div>

                  {/* Message Brief */}
                  <div className="bg-white p-5 rounded-xl border border-neutral-200">
                    <span className="text-xs font-mono uppercase text-neutral-400 block mb-2">
                      Full Project Brief & Specifications
                    </span>
                    <p className="text-sm text-neutral-800 whitespace-pre-wrap leading-relaxed">
                      {selectedSubmission.message}
                    </p>
                  </div>

                  {/* Forward feedback */}
                  {forwardSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-mono flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{forwardSuccess}</span>
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={`mailto:${selectedSubmission.email}?subject=Re:%20Project%20Brief%20%E2%80%94%20SHAZWERK%20%2F%20${encodeURIComponent(
                          selectedSubmission.company
                        )}&body=Hi%20${encodeURIComponent(
                          selectedSubmission.name
                        )},%0A%0AThank%20you%20for%20contacting%20SHAZWERK%20regarding%20${encodeURIComponent(
                          selectedSubmission.project_type
                        )}.%20We%20have%20reviewed%20your%20brief%20and%20would%20like%20to%20schedule%20an%20initial%20technical%20discovery%20conversation.%0A%0ABest%20regards,%0ASHAZWERK%20Engineering%0AZ%C3%BCrich,%20Switzerland`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-mono transition-colors shadow-xs"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Reply via Email</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleForwardToEmail(selectedSubmission.id)}
                        disabled={forwardingId === selectedSubmission.id}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-mono transition-colors"
                      >
                        <Send className="w-3.5 h-3.5 text-neutral-400" />
                        <span>
                          {forwardingId === selectedSubmission.id
                            ? "Forwarding..."
                            : "Forward to My Inbox"}
                        </span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDelete(selectedSubmission.id)}
                      disabled={deletingId === selectedSubmission.id}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl hover:bg-red-50 text-neutral-400 hover:text-red-700 text-xs font-mono transition-colors"
                      title="Permanently delete query"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center text-xs font-mono text-neutral-400">
                  Select a query from the list to review specifications and respond.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VISITS & TELEMETRY */}
      {activeTab === "analytics" && (
        <div className="space-y-8">
          {/* Metrics Overview Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
              <span className="text-xs font-mono text-neutral-400 block mb-2">TOTAL PAGEVIEWS</span>
              <div className="text-3xl font-semibold text-neutral-950">
                {analytics.totalPageviews}
              </div>
              <span className="text-[11px] text-neutral-500 font-mono mt-1 block">
                Across all studio routes
              </span>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
              <span className="text-xs font-mono text-neutral-400 block mb-2">UNIQUE VISITORS (EST.)</span>
              <div className="text-3xl font-semibold text-neutral-950">
                {analytics.uniqueVisitorsEstimate}
              </div>
              <span className="text-[11px] text-neutral-500 font-mono mt-1 block">
                Zero-cookie privacy modeled
              </span>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
              <span className="text-xs font-mono text-neutral-400 block mb-2">PROJECT QUERIES</span>
              <div className="text-3xl font-semibold text-neutral-950">
                {analytics.formSubmissionsCount}
              </div>
              <span className="text-[11px] text-neutral-500 font-mono mt-1 block">
                Submissions received
              </span>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
              <span className="text-xs font-mono text-neutral-400 block mb-2">INQUIRY CONVERSION</span>
              <div className="text-3xl font-semibold text-neutral-950">
                {analytics.totalPageviews > 0
                  ? ((analytics.formSubmissionsCount / analytics.totalPageviews) * 100).toFixed(1)
                  : "0"}
                %
              </div>
              <span className="text-[11px] text-neutral-500 font-mono mt-1 block">
                Visitor-to-lead ratio
              </span>
            </div>
          </div>

          {/* Detailed Breakdown Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Visited Pages */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                Top Visited Studio Pages
              </h4>
              <div className="space-y-3">
                {analytics.topPages.length === 0 ? (
                  <div className="text-xs font-mono text-neutral-400 py-6 text-center">
                    No visit data recorded yet.
                  </div>
                ) : (
                  analytics.topPages.map((page) => {
                    const percent = Math.round((page.count / Math.max(1, analytics.totalPageviews)) * 100);
                    return (
                      <div key={page.path} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-neutral-900 font-medium">{page.path}</span>
                          <span className="text-neutral-500">
                            {page.count} visits ({percent}%)
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-neutral-900 h-1.5 rounded-full"
                            style={{ width: `${Math.max(4, percent)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Referrer Sources */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                Traffic Referral Channels
              </h4>
              <div className="space-y-3">
                {analytics.referrers.length === 0 ? (
                  <div className="text-xs font-mono text-neutral-400 py-6 text-center">
                    No referrers recorded yet.
                  </div>
                ) : (
                  analytics.referrers.map((ref) => {
                    const percent = Math.round((ref.count / Math.max(1, analytics.totalPageviews)) * 100);
                    return (
                      <div key={ref.source} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-neutral-900 font-medium">{ref.source}</span>
                          <span className="text-neutral-500">
                            {ref.count} ({percent}%)
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-red-600 h-1.5 rounded-full"
                            style={{ width: `${Math.max(4, percent)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Geographic Distribution */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                Regional Distribution
              </h4>
              <div className="space-y-3">
                {analytics.countries.length === 0 ? (
                  <div className="text-xs font-mono text-neutral-400 py-6 text-center">
                    No regional data available yet.
                  </div>
                ) : (
                  analytics.countries.map((c) => (
                    <div
                      key={c.country}
                      className="flex items-center justify-between text-xs font-mono py-1 border-b border-neutral-100 last:border-0"
                    >
                      <span className="text-neutral-900">{c.country}</span>
                      <span className="text-neutral-600 font-semibold">{c.count} sessions</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Interactive CTA Clicks */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                Interaction & Engagement Triggers
              </h4>
              <div className="space-y-3">
                {analytics.ctaClicks.length === 0 ? (
                  <div className="text-xs font-mono text-neutral-400 py-6 text-center">
                    No button interaction events captured yet.
                  </div>
                ) : (
                  analytics.ctaClicks.map((cta) => (
                    <div
                      key={cta.cta_id}
                      className="flex items-center justify-between text-xs font-mono py-1 border-b border-neutral-100 last:border-0"
                    >
                      <span className="text-neutral-900">{cta.cta_id}</span>
                      <span className="text-neutral-600 font-semibold">{cta.count} clicks</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: EMAIL DISPATCH & NOTIFICATIONS */}
      {activeTab === "email" && (
        <div className="max-w-3xl space-y-8">
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-neutral-200 mb-6">
              <div>
                <h3 className="text-xl font-medium tracking-tight text-neutral-950 mb-1">
                  Email Notification Routing
                </h3>
                <p className="text-xs font-mono text-neutral-500">
                  Configure where client project briefs are dispatched in real-time when submitted on https://shazwerk.ch/contact.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSendTestEmail}
                disabled={testingEmail}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-neutral-300 hover:border-neutral-950 text-neutral-900 text-xs font-mono transition-colors shrink-0 shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-red-600" />
                <span>{testingEmail ? "Dispatching..." : "Send Test Email"}</span>
              </button>
            </div>

            {testResult && (
              <div
                className={`p-4 mb-6 rounded-xl border text-xs font-mono flex items-start gap-2.5 ${
                  testResult.success
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-red-50 border-red-200 text-red-700"
                }`}
              >
                {testResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                )}
                <span>{testResult.message}</span>
              </div>
            )}

            {saveMessage && (
              <div className="p-4 mb-6 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-mono flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{saveMessage}</span>
              </div>
            )}

            <form onSubmit={handleSaveEmailSettings} className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-2">
                  Destination Notification Email (Your Email) *
                </label>
                <input
                  type="email"
                  required
                  value={emailSettings.notificationEmail}
                  onChange={(e) =>
                    setEmailSettings({ ...emailSettings, notificationEmail: e.target.value })
                  }
                  placeholder="e.g. sarang@shazwerk.ch or your-email@gmail.com"
                  className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs font-mono text-neutral-950 focus:outline-hidden focus:border-neutral-950"
                />
                <p className="text-[11px] font-mono text-neutral-500 mt-1">
                  All new project briefs submitted by visitors will be routed to this inbox immediately.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-2">
                    Sender Display Name
                  </label>
                  <input
                    type="text"
                    value={emailSettings.senderName}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, senderName: e.target.value })
                    }
                    placeholder="SHAZWERK Studio"
                    className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs font-mono text-neutral-950 focus:outline-hidden focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-2">
                    Sender From Email
                  </label>
                  <input
                    type="email"
                    value={emailSettings.senderEmail}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, senderEmail: e.target.value })
                    }
                    placeholder="notifications@shazwerk.ch"
                    className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs font-mono text-neutral-950 focus:outline-hidden focus:border-neutral-950"
                  />
                </div>
              </div>

              {/* Provider Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-2">
                  Delivery Method / Provider
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "auto", label: "Automatic" },
                    { id: "resend", label: "Resend API" },
                    { id: "smtp", label: "SMTP (Hostinger/Gmail)" },
                    { id: "webhook", label: "Webhook" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() =>
                        setEmailSettings({
                          ...emailSettings,
                          provider: p.id as EmailSettings["provider"],
                        })
                      }
                      className={`px-3 py-2 rounded-xl text-xs font-mono text-center border transition-all ${
                        emailSettings.provider === p.id
                          ? "bg-neutral-950 text-white border-neutral-950 font-semibold"
                          : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resend Section */}
              {(emailSettings.provider === "resend" || emailSettings.provider === "auto") && (
                <div className="bg-white p-5 rounded-xl border border-neutral-200 space-y-3">
                  <span className="text-xs font-mono uppercase text-neutral-500 block">
                    Resend Integration (Recommended for Vercel)
                  </span>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-600 mb-1">
                      Resend API Key (Optional if set in Vercel Env)
                    </label>
                    <input
                      type="password"
                      value={emailSettings.resendApiKey || ""}
                      onChange={(e) =>
                        setEmailSettings({ ...emailSettings, resendApiKey: e.target.value })
                      }
                      placeholder="re_xxxxxxxxxxxx..."
                      className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-900"
                    />
                  </div>
                </div>
              )}

              {/* SMTP Section */}
              {(emailSettings.provider === "smtp" || emailSettings.provider === "auto") && (
                <div className="bg-white p-5 rounded-xl border border-neutral-200 space-y-4">
                  <span className="text-xs font-mono uppercase text-neutral-500 block">
                    SMTP Configuration (Proton, Infomaniak, Hostinger, Gmail)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-mono text-neutral-600 mb-1">
                        SMTP Host
                      </label>
                      <input
                        type="text"
                        value={emailSettings.smtpHost || ""}
                        onChange={(e) =>
                          setEmailSettings({ ...emailSettings, smtpHost: e.target.value })
                        }
                        placeholder="smtp.mail.ch or smtp.gmail.com"
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-600 mb-1">
                        Port
                      </label>
                      <input
                        type="number"
                        value={emailSettings.smtpPort || 587}
                        onChange={(e) =>
                          setEmailSettings({ ...emailSettings, smtpPort: Number(e.target.value) })
                        }
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-neutral-600 mb-1">
                        SMTP Username / Email
                      </label>
                      <input
                        type="text"
                        value={emailSettings.smtpUser || ""}
                        onChange={(e) =>
                          setEmailSettings({ ...emailSettings, smtpUser: e.target.value })
                        }
                        placeholder="your-smtp-login@domain.ch"
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-600 mb-1">
                        SMTP Password / App Password
                      </label>
                      <input
                        type="password"
                        value={emailSettings.smtpPass || ""}
                        onChange={(e) =>
                          setEmailSettings({ ...emailSettings, smtpPass: e.target.value })
                        }
                        placeholder="••••••••••••"
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Webhook Section */}
              {(emailSettings.provider === "webhook" || emailSettings.provider === "auto") && (
                <div className="bg-white p-5 rounded-xl border border-neutral-200 space-y-3">
                  <span className="text-xs font-mono uppercase text-neutral-500 block">
                    Webhook Destination (Slack, Discord, Zapier)
                  </span>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-600 mb-1">
                      Webhook URL
                    </label>
                    <input
                      type="url"
                      value={emailSettings.webhookUrl || ""}
                      onChange={(e) =>
                        setEmailSettings({ ...emailSettings, webhookUrl: e.target.value })
                      }
                      placeholder="https://hooks.slack.com/services/... or https://maker.ifttt.com/..."
                      className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-900"
                    />
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-mono text-neutral-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailSettings.notifyOnNewLead}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, notifyOnNewLead: e.target.checked })
                    }
                    className="rounded text-neutral-950 focus:ring-0"
                  />
                  <span>Send immediate notification when a new inquiry arrives</span>
                </label>

                <button
                  type="submit"
                  disabled={savingSettings}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-mono transition-colors shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{savingSettings ? "Saving..." : "Save Configuration"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
