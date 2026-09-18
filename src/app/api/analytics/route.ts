import { NextRequest, NextResponse } from "next/server";
import { recordAnalyticsEvent } from "@/lib/db";
import { AnalyticsEventType } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || !body.event_type) {
      return NextResponse.json({ error: "Missing event_type" }, { status: 400 });
    }

    const validTypes: AnalyticsEventType[] = [
      "pageview",
      "cta_click",
      "form_start",
      "form_submit",
      "scroll",
    ];

    if (!validTypes.includes(body.event_type)) {
      return NextResponse.json({ error: "Invalid event_type" }, { status: 400 });
    }

    // Geolocation from privacy-preserving Vercel/Cloudflare headers (never stores IP address)
    const country =
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      "CH";

    await recordAnalyticsEvent({
      event_type: body.event_type,
      path: typeof body.path === "string" ? body.path.slice(0, 150) : "/",
      referrer: typeof body.referrer === "string" ? body.referrer.slice(0, 200) : "direct",
      country,
      device: typeof body.device === "string" ? body.device : "Desktop",
      cta_id: typeof body.cta_id === "string" ? body.cta_id.slice(0, 100) : undefined,
      meta: body.meta,
    });

    return NextResponse.json({ ok: true });
  } catch {
    // Analytics endpoints should fail gracefully without disturbing client
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
