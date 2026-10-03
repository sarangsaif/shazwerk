import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAnalyticsSummary, rehydrateAnalyticsEvents } from "@/lib/db";
import { VisitorSessionRecord } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const analytics = await getAnalyticsSummary();
  return NextResponse.json({ analytics });
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const visitors: VisitorSessionRecord[] = body?.rehydrateVisitors || [];

    if (Array.isArray(visitors) && visitors.length > 0) {
      await rehydrateAnalyticsEvents(
        visitors.map((v) => ({
          session_id: v.session_id,
          visitor_id: v.visitor_id,
          ip: v.ip,
          country: v.country,
          country_code: v.country_code,
          city: v.city,
          region: v.region,
          timezone: v.timezone,
          device: v.device,
          browser: v.browser,
          browser_version: v.browser_version,
          os: v.os,
          os_version: v.os_version,
          screen_resolution: v.screen_resolution,
          path: v.current_path || v.landing_path || "/",
          referrer: v.referrer,
          timestamp: v.timestamp,
          duration_seconds: v.duration_seconds,
          scroll_depth: v.scroll_depth_max,
          marketing: v.marketing,
          user_agent: v.user_agent,
        }))
      );
    }

    const updated = await getAnalyticsSummary();
    return NextResponse.json({ ok: true, analytics: updated });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
