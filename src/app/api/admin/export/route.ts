import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAnalyticsEvents } from "@/lib/db";

export const dynamic = "force-dynamic";

const COLS = [
  "timestamp", "event_type", "path", "visitor_id", "session_id", "ip", "country", "region", "city",
  "device", "browser", "os", "screen_resolution", "language", "referrer", "duration_seconds", "scroll_depth",
] as const;

function cell(v: unknown) {
  const s = v === undefined || v === null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** All raw events as CSV (newest first). */
export async function GET() {
  if (!isAdminAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const events = await getAnalyticsEvents();
  const lines = [[...COLS, "label", "href", "utm"].join(",")];
  for (const e of events) {
    lines.push(
      [
        ...COLS.map((c) => cell(e[c])),
        cell(e.meta?.label ?? e.cta_id),
        cell(e.meta?.href),
        cell(e.marketing?.utm_campaign || e.marketing?.utm_source),
      ].join(",")
    );
  }
  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="shazwerk-analytics-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
