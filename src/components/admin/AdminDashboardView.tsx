"use client";

import React, { useState, useEffect } from "react";
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
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Cpu,
  Eye,
  Activity,
  UserCheck,
  Copy,
  Tag,
  Share2,
  X,
  Compass,
  Zap,
  MapPin,
  Laptop,
  Terminal,
  Calendar,
} from "lucide-react";
import {
  ContactSubmission,
  SubmissionStatus,
  AnalyticsSummary,
  VisitorSessionRecord,
  EmailSettings,
} from "@/lib/types";
import { formatDate } from "@/lib/utils";

// Helper for relative time display
function formatRelativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// Country code to flag emoji helper
function getCountryFlag(countryCode?: string) {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const VAULT_VISITORS_KEY = "_sw_admin_vault_visitors_v1";

function mergeVisitorRecords(
  serverList: VisitorSessionRecord[] = [],
  cachedList: VisitorSessionRecord[] = []
): VisitorSessionRecord[] {
  const map = new Map<string, VisitorSessionRecord>();

  for (const item of cachedList) {
    if (item && (item.id || item.session_id)) {
      const key = item.id || item.session_id;
      map.set(key, item);
    }
  }

  for (const item of serverList) {
    if (item && (item.id || item.session_id)) {
      const key = item.id || item.session_id;
      const existing = map.get(key);
      if (!existing) {
        map.set(key, item);
      } else {
        const pages = Array.from(new Set([...(existing.pages_viewed || []), ...(item.pages_viewed || [])]));
        const isItemNewer = new Date(item.last_active).getTime() >= new Date(existing.last_active).getTime();
        map.set(key, {
          ...(isItemNewer ? existing : item),
          ...(isItemNewer ? item : existing),
          pages_viewed: pages,
          pageviews_count: Math.max(existing.pageviews_count || 1, item.pageviews_count || 1),
          scroll_depth_max: Math.max(existing.scroll_depth_max || 0, item.scroll_depth_max || 0),
          duration_seconds: Math.max(existing.duration_seconds || 0, item.duration_seconds || 0),
          last_active: isItemNewer ? item.last_active : existing.last_active,
        });
      }
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.last_active).getTime() - new Date(a.last_active).getTime()
  );
}

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
  const router = useRouter();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(initialSubmissions);
  const [emailSettings, setEmailSettings] = useState<EmailSettings>(initialEmailSettings);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsSummary>(analytics);
  const [isRefreshingAnalytics, setIsRefreshingAnalytics] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<VisitorSessionRecord | null>(null);
  const [visitorSearch, setVisitorSearch] = useState("");
  const [visitorDeviceFilter, setVisitorDeviceFilter] = useState("all");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"queries" | "analytics" | "email">("queries");
  const [liveAutoRefresh, setLiveAutoRefresh] = useState(true);

  // Queries tab state
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(
    initialSubmissions[0] || null
  );
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [forwardingId, setForwardingId] = useState<string | null>(null);
  const [forwardSuccess, setForwardSuccess] = useState<string | null>(null);

  // Settings tab state
  const [savingSettings, setSavingSettings] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [testingEmail, setTestingEmail] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleCopy = (text: string, label: string) => {
    if (typeof navigator !== "undefined" && navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    }
  };

  // Sync helper that updates state, persists to localStorage vault, and re-seeds server if needed
  const syncWithVault = (serverAnalytics: AnalyticsSummary) => {
    let cached: VisitorSessionRecord[] = [];
    try {
      const stored = localStorage.getItem(VAULT_VISITORS_KEY);
      if (stored) cached = JSON.parse(stored);
    } catch {}

    const mergedVisitors = mergeVisitorRecords(serverAnalytics.recentVisitors || [], cached);

    try {
      localStorage.setItem(VAULT_VISITORS_KEY, JSON.stringify(mergedVisitors.slice(0, 500)));
    } catch {}

    const updatedSummary: AnalyticsSummary = {
      ...serverAnalytics,
      totalPageviews: Math.max(
        serverAnalytics.totalPageviews,
        mergedVisitors.reduce((acc, v) => acc + (v.pageviews_count || 1), 0)
      ),
      uniqueVisitorsCount: Math.max(
        serverAnalytics.uniqueVisitorsCount,
        new Set(mergedVisitors.map((v) => v.visitor_id || v.ip)).size
      ),
      recentVisitors: mergedVisitors,
    };

    setAnalyticsData(updatedSummary);

    // If server returned fewer visitors (serverless cold start / instance recycle), re-seed server!
    if ((serverAnalytics.recentVisitors?.length || 0) < mergedVisitors.length) {
      fetch("/api/admin/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rehydrateVisitors: mergedVisitors.slice(0, 50) }),
      }).catch(() => {});
    }

    return updatedSummary;
  };

  // On mount: hydrate from Local Vault immediately so logs NEVER start empty or reset
  useEffect(() => {
    try {
      const stored = localStorage.getItem(VAULT_VISITORS_KEY);
      if (stored) {
        const cached: VisitorSessionRecord[] = JSON.parse(stored);
        if (Array.isArray(cached) && cached.length > 0) {
          syncWithVault(analytics);
        }
      }
    } catch {}
  }, []);

  // Auto-refresh telemetry stream every 8 seconds when on analytics tab
  useEffect(() => {
    if (activeTab !== "analytics" || !liveAutoRefresh) return;
    const interval = setInterval(() => {
      fetch("/api/admin/analytics")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.analytics) {
            syncWithVault(data.analytics);
          }
        })
        .catch(() => {});
    }, 8000);

    return () => clearInterval(interval);
  }, [activeTab, liveAutoRefresh]);

  const refreshAnalytics = async () => {
    setIsRefreshingAnalytics(true);
    try {
      const res = await fetch("/api/admin/analytics");
      if (res.ok) {
        const data = await res.json();
        if (data.analytics) {
          const updated = syncWithVault(data.analytics);
          if (selectedVisitor) {
            const updatedVisitor = updated.recentVisitors?.find(
              (v: VisitorSessionRecord) => v.id === selectedVisitor.id
            );
            if (updatedVisitor) setSelectedVisitor(updatedVisitor);
          }
        }
      }
    } catch (err) {
      console.error("Failed to refresh analytics:", err);
    } finally {
      setIsRefreshingAnalytics(false);
    }
  };

  const handleClearVault = () => {
    if (confirm("Reset local visitor vault and re-sync with server?")) {
      try {
        localStorage.removeItem(VAULT_VISITORS_KEY);
      } catch {}
      refreshAnalytics();
    }
  };

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
          <span>Visitor Intelligence ({analyticsData.totalPageviews} views)</span>
          {analyticsData.liveVisitorsCount > 0 && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-semibold border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {analyticsData.liveVisitorsCount} live
            </span>
          )}
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
          {/* Header Action Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-medium tracking-tight text-neutral-950">
                  Visitor Intelligence & Real-Time Telemetry
                </h3>
                {analyticsData.liveVisitorsCount > 0 ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-mono font-medium border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {analyticsData.liveVisitorsCount} Active Now
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-200/60 text-neutral-600 text-xs font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    Idle Pulse
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-neutral-500">
                Live visitor session logs, true client IP, geolocation, hardware footprint, and marketing cookie attribution.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setLiveAutoRefresh(!liveAutoRefresh)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-mono transition-colors shadow-xs ${
                  liveAutoRefresh
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                    : "bg-white text-neutral-600 border-neutral-300 hover:text-neutral-900"
                }`}
                title="Toggle real-time auto-refresh (polls every 8s)"
              >
                <span className={`w-2 h-2 rounded-full ${liveAutoRefresh ? "bg-emerald-500 animate-pulse" : "bg-neutral-400"}`} />
                <span>{liveAutoRefresh ? "Live Stream: ON" : "Live: Paused"}</span>
              </button>

              <button
                type="button"
                onClick={refreshAnalytics}
                disabled={isRefreshingAnalytics}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-neutral-300 hover:border-neutral-950 text-neutral-900 text-xs font-mono transition-colors shadow-xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-neutral-600 ${isRefreshingAnalytics ? "animate-spin" : ""}`} />
                <span>{isRefreshingAnalytics ? "Refreshing..." : "Refresh"}</span>
              </button>

              <a
                href="/api/admin/analytics/export"
                download
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-mono transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-neutral-400" />
                <span>Export CSV</span>
              </a>
            </div>
          </div>

          {/* Metrics Overview Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5">
              <span className="text-xs font-mono text-neutral-400 block mb-1">TOTAL PAGEVIEWS</span>
              <div className="text-3xl font-semibold text-neutral-950">
                {analyticsData.totalPageviews}
              </div>
              <span className="text-[11px] text-neutral-500 font-mono mt-1 block">
                Across all studio routes
              </span>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5">
              <span className="text-xs font-mono text-neutral-400 block mb-1">UNIQUE VISITORS</span>
              <div className="text-3xl font-semibold text-neutral-950">
                {analyticsData.uniqueVisitorsCount || analyticsData.uniqueVisitorsEstimate}
              </div>
              <span className="text-[11px] text-neutral-500 font-mono mt-1 block">
                Persistent cookie (`_sw_vid`)
              </span>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5">
              <span className="text-xs font-mono text-neutral-400 block mb-1">LIVE ACTIVE (15M)</span>
              <div className="text-3xl font-semibold text-emerald-600 flex items-center gap-2">
                <span>{analyticsData.liveVisitorsCount}</span>
                {analyticsData.liveVisitorsCount > 0 && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                )}
              </div>
              <span className="text-[11px] text-neutral-500 font-mono mt-1 block">
                Real-time active visitors
              </span>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5">
              <span className="text-xs font-mono text-neutral-400 block mb-1">AVG SCROLL DEPTH</span>
              <div className="text-3xl font-semibold text-neutral-950">
                {analyticsData.avgScrollDepth}%
              </div>
              <span className="text-[11px] text-neutral-500 font-mono mt-1 block">
                Reading engagement depth
              </span>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 col-span-2 lg:col-span-1">
              <span className="text-xs font-mono text-neutral-400 block mb-1">LEAD CONVERSION</span>
              <div className="text-3xl font-semibold text-neutral-950">
                {analyticsData.totalPageviews > 0
                  ? ((analyticsData.formSubmissionsCount / analyticsData.totalPageviews) * 100).toFixed(1)
                  : "0"}%
              </div>
              <span className="text-[11px] text-neutral-500 font-mono mt-1 block">
                Visitor-to-inquiry ratio
              </span>
            </div>
          </div>

          {/* SECTION: LIVE VISITOR STREAM & FORENSIC LOG */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-7 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
              <div>
                <h4 className="text-base font-medium text-neutral-950 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-red-600" />
                  <span>Live Visitor Telemetry Stream</span>
                </h4>
                <p className="text-xs font-mono text-neutral-500 mt-0.5">
                  Detailed profile of every visitor session. Click "Inspect" for complete hardware & marketing attribution.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search IP, city, country, path, campaign..."
                    value={visitorSearch}
                    onChange={(e) => setVisitorSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-white border border-neutral-300 text-xs font-mono text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-950 w-60 sm:w-72"
                  />
                  {visitorSearch && (
                    <button
                      type="button"
                      onClick={() => setVisitorSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1 bg-white border border-neutral-300 rounded-xl p-0.5 text-xs font-mono">
                  {(["all", "Desktop", "Mobile", "Tablet"] as const).map((dev) => (
                    <button
                      key={dev}
                      type="button"
                      onClick={() => setVisitorDeviceFilter(dev)}
                      className={`px-2.5 py-1 rounded-lg transition-colors ${
                        visitorDeviceFilter === dev
                          ? "bg-neutral-950 text-white font-medium shadow-xs"
                          : "text-neutral-600 hover:text-neutral-950"
                      }`}
                    >
                      {dev === "all" ? "All Devices" : dev}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filtered Count Tag */}
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>
                Displaying{" "}
                {(analyticsData.recentVisitors || []).filter((v) => {
                  if (visitorDeviceFilter !== "all" && v.device.toLowerCase() !== visitorDeviceFilter.toLowerCase()) return false;
                  if (!visitorSearch.trim()) return true;
                  const q = visitorSearch.toLowerCase();
                  return (
                    v.ip.toLowerCase().includes(q) ||
                    v.city.toLowerCase().includes(q) ||
                    v.country.toLowerCase().includes(q) ||
                    v.current_path.toLowerCase().includes(q) ||
                    v.landing_path.toLowerCase().includes(q) ||
                    (v.marketing?.utm_campaign && v.marketing.utm_campaign.toLowerCase().includes(q)) ||
                    (v.marketing?.utm_source && v.marketing.utm_source.toLowerCase().includes(q)) ||
                    (v.browser && v.browser.toLowerCase().includes(q)) ||
                    (v.os && v.os.toLowerCase().includes(q))
                  );
                }).length}{" "}
                of {analyticsData.recentVisitors?.length || 0} recorded visitor sessions
              </span>
              {copiedText && (
                <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {copiedText} copied to clipboard!
                </span>
              )}
            </div>

            {/* Visitors Table */}
            <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-neutral-100/70 border-b border-neutral-200 text-neutral-500 uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4 font-medium">Activity</th>
                    <th className="py-3 px-4 font-medium">Visitor IP & ID</th>
                    <th className="py-3 px-4 font-medium">Location</th>
                    <th className="py-3 px-4 font-medium">Device & System</th>
                    <th className="py-3 px-4 font-medium">Marketing Attribution</th>
                    <th className="py-3 px-4 font-medium">Page & Scroll</th>
                    <th className="py-3 px-4 font-medium text-right">Dossier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {(!analyticsData.recentVisitors || analyticsData.recentVisitors.length === 0) ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-neutral-400">
                        No visitor telemetry captured yet. Browse the studio site to view real-time data stream.
                      </td>
                    </tr>
                  ) : (
                    analyticsData.recentVisitors
                      .filter((v) => {
                        if (visitorDeviceFilter !== "all" && v.device.toLowerCase() !== visitorDeviceFilter.toLowerCase()) return false;
                        if (!visitorSearch.trim()) return true;
                        const q = visitorSearch.toLowerCase();
                        return (
                          v.ip.toLowerCase().includes(q) ||
                          v.city.toLowerCase().includes(q) ||
                          v.country.toLowerCase().includes(q) ||
                          v.current_path.toLowerCase().includes(q) ||
                          v.landing_path.toLowerCase().includes(q) ||
                          (v.marketing?.utm_campaign && v.marketing.utm_campaign.toLowerCase().includes(q)) ||
                          (v.marketing?.utm_source && v.marketing.utm_source.toLowerCase().includes(q)) ||
                          (v.browser && v.browser.toLowerCase().includes(q)) ||
                          (v.os && v.os.toLowerCase().includes(q))
                        );
                      })
                      .map((visitor) => {
                        const flag = getCountryFlag(visitor.country_code);
                        const isOnline = visitor.is_online;
                        const marketingTag =
                          visitor.marketing?.utm_campaign ||
                          visitor.marketing?.utm_source ||
                          visitor.marketing?.ad_source ||
                          (visitor.referrer && visitor.referrer !== "direct" ? visitor.referrer : "Direct");

                        return (
                          <tr key={visitor.id} className="hover:bg-neutral-50/80 transition-colors">
                            {/* Activity */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-2 h-2 rounded-full ${
                                    isOnline ? "bg-emerald-500 animate-pulse" : "bg-neutral-300"
                                  }`}
                                  title={isOnline ? "Active in last 15m" : "Offline"}
                                />
                                <div>
                                  <div className="text-neutral-950 font-medium">
                                    {formatRelativeTime(visitor.last_active)}
                                  </div>
                                  <div className="text-[10px] text-neutral-400">
                                    {formatDate(visitor.last_active)}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* IP & Visitor ID */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleCopy(visitor.ip, "IP")}
                                  className="font-medium text-neutral-900 hover:text-red-600 transition-colors flex items-center gap-1"
                                  title="Click to copy IP"
                                >
                                  <span>{visitor.ip}</span>
                                  <Copy className="w-3 h-3 text-neutral-400 hover:text-neutral-700" />
                                </button>
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[10px] text-neutral-400 font-mono">
                                  {visitor.visitor_id ? visitor.visitor_id.slice(0, 10) + "..." : "anon"}
                                </span>
                                {visitor.pageviews_count > 1 && (
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-200/70 text-neutral-700">
                                    {visitor.pageviews_count} views
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Location */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <span className="text-base">{flag}</span>
                                <div>
                                  <div className="text-neutral-900 font-medium">
                                    {visitor.city || "Unknown City"}
                                  </div>
                                  <div className="text-[10px] text-neutral-400">
                                    {visitor.country} {visitor.region ? `(${visitor.region})` : ""}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Device & System */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                {visitor.device === "Mobile" ? (
                                  <Smartphone className="w-3.5 h-3.5 text-neutral-400" />
                                ) : visitor.device === "Tablet" ? (
                                  <Tablet className="w-3.5 h-3.5 text-neutral-400" />
                                ) : (
                                  <Monitor className="w-3.5 h-3.5 text-neutral-400" />
                                )}
                                <div>
                                  <div className="text-neutral-900">
                                    {visitor.os} {visitor.os_version ? `v${visitor.os_version}` : ""}
                                  </div>
                                  <div className="text-[10px] text-neutral-400">
                                    {visitor.browser} {visitor.browser_version} · {visitor.screen_resolution}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Marketing & Attribution */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                                  visitor.marketing?.gclid || visitor.marketing?.ad_source
                                    ? "bg-amber-50 text-amber-800 border-amber-200"
                                    : visitor.marketing?.utm_campaign
                                    ? "bg-blue-50 text-blue-800 border-blue-200"
                                    : "bg-neutral-100 text-neutral-700 border-neutral-200"
                                }`}
                              >
                                <Tag className="w-2.5 h-2.5" />
                                {marketingTag.length > 24 ? marketingTag.slice(0, 24) + "..." : marketingTag}
                              </span>
                            </td>

                            {/* Page & Scroll */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="text-neutral-900 font-medium">
                                {visitor.current_path}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="w-16 bg-neutral-200 rounded-full h-1 overflow-hidden">
                                  <div
                                    className="bg-neutral-900 h-1 rounded-full"
                                    style={{ width: `${Math.max(5, visitor.scroll_depth_max)}%` }}
                                  />
                                </div>
                                <span className="text-[10px] text-neutral-400">
                                  {visitor.scroll_depth_max}% · {visitor.duration_seconds}s
                                </span>
                              </div>
                            </td>

                            {/* Dossier action */}
                            <td className="py-3.5 px-4 whitespace-nowrap text-right">
                              <button
                                type="button"
                                onClick={() => setSelectedVisitor(visitor)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-neutral-300 hover:border-neutral-950 text-neutral-900 text-xs font-mono transition-colors shadow-2xs"
                              >
                                <Eye className="w-3 h-3 text-neutral-500" />
                                <span>Inspect</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* FORENSIC INSPECTOR MODAL */}
          {selectedVisitor && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <div className="bg-white rounded-3xl border border-neutral-200 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
                {/* Modal Header */}
                <div className="flex items-start justify-between pb-6 border-b border-neutral-200 gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{getCountryFlag(selectedVisitor.country_code)}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-medium tracking-tight text-neutral-950">
                          {selectedVisitor.city}, {selectedVisitor.country}
                        </h3>
                        {selectedVisitor.is_online ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-mono font-medium border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live Online
                          </span>
                        ) : (
                          <span className="text-xs font-mono text-neutral-400">
                            Last seen {formatRelativeTime(selectedVisitor.last_active)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-mono text-neutral-600 font-semibold">
                          IP: {selectedVisitor.ip}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(selectedVisitor.ip, "Visitor IP")}
                          className="text-neutral-400 hover:text-neutral-800 transition-colors"
                          title="Copy IP"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <span className="text-neutral-300">·</span>
                        <span className="text-xs font-mono text-neutral-500">
                          Region: {selectedVisitor.region || "N/A"}
                        </span>
                        <span className="text-neutral-300">·</span>
                        <span className="text-xs font-mono text-neutral-500">
                          TZ: {selectedVisitor.timezone || "Europe/Zurich"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedVisitor(null)}
                    className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* 4 Forensic Analytical Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Card 1: Identity & Persistence Cookies */}
                  <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold border-b border-neutral-200 pb-2">
                      <UserCheck className="w-4 h-4 text-red-600" />
                      <span>Digital Identity & Cookies</span>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Visitor Cookie ID (`_sw_vid`):</span>
                        <span className="text-neutral-900 font-semibold break-all text-right max-w-[200px]">
                          {selectedVisitor.visitor_id}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Session Cookie ID (`_sw_sid`):</span>
                        <span className="text-neutral-900 font-semibold break-all text-right max-w-[200px]">
                          {selectedVisitor.session_id}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">First Interaction:</span>
                        <span className="text-neutral-900">{formatDate(selectedVisitor.timestamp)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Latest Pulse:</span>
                        <span className="text-neutral-900">{formatDate(selectedVisitor.last_active)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Pages In Session:</span>
                        <span className="text-neutral-900 font-semibold">{selectedVisitor.pageviews_count} views</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Hardware Footprint & Specs */}
                  <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold border-b border-neutral-200 pb-2">
                      <Cpu className="w-4 h-4 text-neutral-700" />
                      <span>Device & Hardware Footprint</span>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Device Category:</span>
                        <span className="text-neutral-900 font-semibold">{selectedVisitor.device}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Operating System:</span>
                        <span className="text-neutral-900 font-semibold">
                          {selectedVisitor.os} {selectedVisitor.os_version ? `(${selectedVisitor.os_version})` : ""}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Web Browser:</span>
                        <span className="text-neutral-900 font-semibold">
                          {selectedVisitor.browser} {selectedVisitor.browser_version}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Screen Resolution:</span>
                        <span className="text-neutral-900">{selectedVisitor.screen_resolution}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Viewport Window:</span>
                        <span className="text-neutral-900">{selectedVisitor.viewport_size || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">CPU Threads / RAM:</span>
                        <span className="text-neutral-900">
                          {selectedVisitor.cpu_cores ? `${selectedVisitor.cpu_cores} Cores` : "Undetected"} ·{" "}
                          {selectedVisitor.ram_gb ? `${selectedVisitor.ram_gb} GB RAM` : "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Network / Connection:</span>
                        <span className="text-neutral-900 uppercase">
                          {selectedVisitor.connection_type || "Wi-Fi / Ethernet"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Language:</span>
                        <span className="text-neutral-900 uppercase">{selectedVisitor.language || "en"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Marketing Attribution & Advertising Tagging */}
                  <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold border-b border-neutral-200 pb-2">
                      <Tag className="w-4 h-4 text-blue-600" />
                      <span>Marketing Attribution & Cookies</span>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">UTM Campaign:</span>
                        <span className="text-neutral-900 font-semibold">
                          {selectedVisitor.marketing?.utm_campaign || "None (Direct / Organic)"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">UTM Source:</span>
                        <span className="text-neutral-900">
                          {selectedVisitor.marketing?.utm_source || "direct"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">UTM Medium:</span>
                        <span className="text-neutral-900">
                          {selectedVisitor.marketing?.utm_medium || "organic"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">UTM Term / Keywords:</span>
                        <span className="text-neutral-900">
                          {selectedVisitor.marketing?.utm_term || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Google Click ID (`gclid`):</span>
                        <span className="text-neutral-900 break-all text-right max-w-[200px]">
                          {selectedVisitor.marketing?.gclid || "None"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Meta Click ID (`fbclid`):</span>
                        <span className="text-neutral-900 break-all text-right max-w-[200px]">
                          {selectedVisitor.marketing?.fbclid || "None"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Traffic Referrer:</span>
                        <span className="text-neutral-900 truncate max-w-[200px]" title={selectedVisitor.referrer}>
                          {selectedVisitor.referrer}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Session Navigation & Behavior Journey */}
                  <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold border-b border-neutral-200 pb-2">
                      <Compass className="w-4 h-4 text-emerald-600" />
                      <span>Session Engagement & Route Journey</span>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Landing Page:</span>
                        <span className="text-neutral-900 font-semibold">{selectedVisitor.landing_path}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Current / Exit Route:</span>
                        <span className="text-neutral-900 font-semibold">{selectedVisitor.current_path}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Max Scroll Depth:</span>
                        <span className="text-neutral-900 font-semibold">{selectedVisitor.scroll_depth_max}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Active Reading Time:</span>
                        <span className="text-neutral-900">{selectedVisitor.duration_seconds} seconds</span>
                      </div>

                      <div className="pt-2 border-t border-neutral-200">
                        <span className="text-neutral-500 block mb-1.5">Visited Routes Trail:</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedVisitor.pages_viewed.map((pg, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded bg-white border border-neutral-200 text-neutral-900 text-[11px]"
                            >
                              {pg}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Raw User Agent Footprint */}
                {selectedVisitor.user_agent && (
                  <div className="bg-neutral-900 text-neutral-200 rounded-2xl p-4 font-mono text-xs">
                    <div className="flex items-center justify-between text-neutral-400 mb-2">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                        Raw User-Agent Header
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(selectedVisitor.user_agent || "", "User Agent")}
                        className="hover:text-white transition-colors flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy UA</span>
                      </button>
                    </div>
                    <p className="break-all text-[11px] text-neutral-300 bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                      {selectedVisitor.user_agent}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* MACRO BREAKDOWN GRIDS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Visited Pages */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                Top Visited Studio Pages
              </h4>
              <div className="space-y-3">
                {analyticsData.topPages.length === 0 ? (
                  <div className="text-xs font-mono text-neutral-400 py-6 text-center">
                    No visit data recorded yet.
                  </div>
                ) : (
                  analyticsData.topPages.map((page) => {
                    const percent = Math.round((page.count / Math.max(1, analyticsData.totalPageviews)) * 100);
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
                {analyticsData.referrers.length === 0 ? (
                  <div className="text-xs font-mono text-neutral-400 py-6 text-center">
                    No referrers recorded yet.
                  </div>
                ) : (
                  analyticsData.referrers.map((ref) => {
                    const percent = Math.round((ref.count / Math.max(1, analyticsData.totalPageviews)) * 100);
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

            {/* Top Cities */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4 flex items-center justify-between">
                <span>Top Visitor Cities</span>
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              </h4>
              <div className="space-y-2.5">
                {(!analyticsData.cities || analyticsData.cities.length === 0) ? (
                  <div className="text-xs font-mono text-neutral-400 py-6 text-center">
                    No city data available yet.
                  </div>
                ) : (
                  analyticsData.cities.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs font-mono py-1 border-b border-neutral-100 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-900 font-medium">{item.city}</span>
                        <span className="text-neutral-400 text-[11px]">({item.country})</span>
                      </div>
                      <span className="text-neutral-700 font-semibold">{item.count} sessions</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Top Countries */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4 flex items-center justify-between">
                <span>Regional Distribution</span>
                <Globe className="w-3.5 h-3.5 text-neutral-400" />
              </h4>
              <div className="space-y-2.5">
                {analyticsData.countries.length === 0 ? (
                  <div className="text-xs font-mono text-neutral-400 py-6 text-center">
                    No regional data available yet.
                  </div>
                ) : (
                  analyticsData.countries.map((c) => (
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

            {/* Operating Systems & Browsers */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                Operating Systems & Platforms
              </h4>
              <div className="space-y-2">
                {(!analyticsData.operatingSystems || analyticsData.operatingSystems.length === 0) ? (
                  <div className="text-xs font-mono text-neutral-400 py-4 text-center">
                    No OS data recorded yet.
                  </div>
                ) : (
                  analyticsData.operatingSystems.map((os) => (
                    <div
                      key={os.os}
                      className="flex items-center justify-between text-xs font-mono py-1 border-b border-neutral-100 last:border-0"
                    >
                      <span className="text-neutral-900">{os.os}</span>
                      <span className="text-neutral-600 font-semibold">{os.count} sessions</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Browsers */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                Browser Distribution
              </h4>
              <div className="space-y-2">
                {(!analyticsData.browsers || analyticsData.browsers.length === 0) ? (
                  <div className="text-xs font-mono text-neutral-400 py-4 text-center">
                    No browser data recorded yet.
                  </div>
                ) : (
                  analyticsData.browsers.map((b) => (
                    <div
                      key={b.browser}
                      className="flex items-center justify-between text-xs font-mono py-1 border-b border-neutral-100 last:border-0"
                    >
                      <span className="text-neutral-900">{b.browser}</span>
                      <span className="text-neutral-600 font-semibold">{b.count} sessions</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Marketing Campaigns Breakdown */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                Marketing UTM Campaigns
              </h4>
              <div className="space-y-2">
                {(!analyticsData.marketingCampaigns || analyticsData.marketingCampaigns.length === 0) ? (
                  <div className="text-xs font-mono text-neutral-400 py-4 text-center">
                    No active campaign parameters captured yet.
                  </div>
                ) : (
                  analyticsData.marketingCampaigns.map((camp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs font-mono py-1 border-b border-neutral-100 last:border-0"
                    >
                      <div>
                        <div className="text-neutral-900 font-medium">{camp.campaign}</div>
                        <div className="text-[10px] text-neutral-400">
                          {camp.source} / {camp.medium}
                        </div>
                      </div>
                      <span className="text-neutral-700 font-semibold">{camp.visitors} visitors</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Advertising Click Identifiers */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                Paid Ads Attribution (Click IDs)
              </h4>
              <div className="space-y-2">
                {(!analyticsData.adClickSummary || analyticsData.adClickSummary.length === 0) ? (
                  <div className="text-xs font-mono text-neutral-400 py-4 text-center">
                    No ad click IDs (`gclid`, `fbclid`, etc.) logged yet.
                  </div>
                ) : (
                  analyticsData.adClickSummary.map((ad) => (
                    <div
                      key={ad.provider}
                      className="flex items-center justify-between text-xs font-mono py-1 border-b border-neutral-100 last:border-0"
                    >
                      <span className="text-neutral-900 font-medium">{ad.provider}</span>
                      <span className="text-neutral-600 font-semibold">{ad.count} clicks</span>
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
