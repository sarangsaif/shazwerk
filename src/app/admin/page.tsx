import React from "react";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSubmissions, getAnalyticsSummary, getEmailSettings } from "@/lib/db";
import AdminDashboardView from "@/components/admin/AdminDashboardView";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAuth = isAdminAuthenticated();

  if (!isAuth) {
    redirect("/admin/login");
  }

  const [submissions, analytics, emailSettings] = await Promise.all([
    getSubmissions(),
    getAnalyticsSummary(),
    getEmailSettings(),
  ]);

  return (
    <div className="bg-white min-h-screen text-neutral-900">
      <AdminDashboardView
        initialSubmissions={submissions}
        analytics={analytics}
        initialEmailSettings={emailSettings}
      />
    </div>
  );
}
