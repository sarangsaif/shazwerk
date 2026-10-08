import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAnalyticsEvents, getSubmissions } from "@/lib/db";
import { computeStats } from "@/lib/stats";
import { storeBackend } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAdminAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const days = Math.min(365, Math.max(1, Number(req.nextUrl.searchParams.get("days")) || 30));
  const [events, submissions] = await Promise.all([getAnalyticsEvents(), getSubmissions()]);
  const since = Date.now() - days * 86400000;
  const inquiries = submissions.filter((s) => Date.parse(s.created_at) >= since).length;
  return NextResponse.json({ stats: computeStats(events, inquiries, days), storeBackend });
}
