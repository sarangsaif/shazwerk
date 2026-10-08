import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import AdminPortal from "@/components/admin/AdminPortal";
import { storeBackend } from "@/lib/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default function AdminPage() {
  if (!isAdminAuthenticated()) redirect("/admin/login");
  return <AdminPortal storeBackend={storeBackend} />;
}
