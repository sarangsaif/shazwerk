import React from "react";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSubmissions, getAnalyticsSummary } from "@/lib/db";
import AdminDashboardView from "@/components/admin/AdminDashboardView";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAuth = isAdminAuthenticated();

  if (!isAuth) {
    redirect("/admin/login");
  }

  const [submissions, analytics] = await Promise.all([
    getSubmissions(),
    getAnalyticsSummary(),
  ]);

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <AdminDashboardView initialSubmissions={submissions} analytics={analytics} />
    </div>
  );
}
