import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAnalyticsSummary } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const analytics = await getAnalyticsSummary();
  return NextResponse.json({ analytics });
}
