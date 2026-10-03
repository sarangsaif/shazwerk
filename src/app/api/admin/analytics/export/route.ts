import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAnalyticsSummary } from "@/lib/db";

export const dynamic = "force-dynamic";

function escapeCsv(val: any): string {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET() {
  const isAuth = isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const summary = await getAnalyticsSummary();
  const visitors = summary.recentVisitors;

  const headers = [
    "Session ID",
    "Visitor ID",
    "IP Address",
    "Country",
    "Country Code",
    "City",
    "Region",
    "Timezone",
    "Device",
    "Browser",
    "Browser Version",
    "OS",
    "OS Version",
    "Screen Resolution",
    "Viewport Size",
    "Language",
    "CPU Cores",
    "RAM (GB)",
    "Connection Type",
    "Landing Page",
    "Current Page",
    "Pages Visited",
    "Total Pageviews",
    "Referrer",
    "UTM Source",
    "UTM Medium",
    "UTM Campaign",
    "UTM Term",
    "UTM Content",
    "Ad Provider",
    "Google Click ID (gclid)",
    "Meta Click ID (fbclid)",
    "Max Scroll Depth (%)",
    "Active Duration (s)",
    "First Seen",
    "Last Active",
    "Is Online",
  ];

  const rows = visitors.map((v) => [
    escapeCsv(v.session_id),
    escapeCsv(v.visitor_id),
    escapeCsv(v.ip),
    escapeCsv(v.country),
    escapeCsv(v.country_code),
    escapeCsv(v.city),
    escapeCsv(v.region),
    escapeCsv(v.timezone),
    escapeCsv(v.device),
    escapeCsv(v.browser),
    escapeCsv(v.browser_version),
    escapeCsv(v.os),
    escapeCsv(v.os_version),
    escapeCsv(v.screen_resolution),
    escapeCsv(v.viewport_size),
    escapeCsv(v.language),
    escapeCsv(v.cpu_cores || ""),
    escapeCsv(v.ram_gb || ""),
    escapeCsv(v.connection_type || ""),
    escapeCsv(v.landing_path),
    escapeCsv(v.current_path),
    escapeCsv(v.pages_viewed.join(" | ")),
    escapeCsv(v.pageviews_count),
    escapeCsv(v.referrer),
    escapeCsv(v.marketing?.utm_source || ""),
    escapeCsv(v.marketing?.utm_medium || ""),
    escapeCsv(v.marketing?.utm_campaign || ""),
    escapeCsv(v.marketing?.utm_term || ""),
    escapeCsv(v.marketing?.utm_content || ""),
    escapeCsv(v.marketing?.ad_source || ""),
    escapeCsv(v.marketing?.gclid || ""),
    escapeCsv(v.marketing?.fbclid || ""),
    escapeCsv(v.scroll_depth_max),
    escapeCsv(v.duration_seconds),
    escapeCsv(v.timestamp),
    escapeCsv(v.last_active),
    escapeCsv(v.is_online ? "YES" : "NO"),
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

  const filename = `shazwerk_visitors_${new Date().toISOString().split("T")[0]}.csv`;

  return new NextResponse(csvContent, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
