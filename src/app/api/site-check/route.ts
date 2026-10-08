import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { runSiteCheck, normalizeUrl, CheckResult } from "@/lib/sitecheck";
import { getJSON, setJSON } from "@/lib/store";
import { recordAnalyticsEvent } from "@/lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const LIMIT_PER_HOUR = 12;

function ipOf(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "local";
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const input = typeof body?.url === "string" ? body.url.slice(0, 300) : "";
  if (!input) return NextResponse.json({ error: "Bitte eine Website-Adresse eingeben." }, { status: 400 });

  let host: string;
  try {
    host = normalizeUrl(input).hostname;
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Ungültige Adresse." }, { status: 400 });
  }

  // Simple per-IP rate limit
  const ip = ipOf(req);
  const rlKey = `sw:sitecheck-rl:${crypto.createHash("sha256").update(ip).digest("hex").slice(0, 24)}`;
  const rl = (await getJSON<{ n: number; until: number }>(rlKey).catch(() => null)) || { n: 0, until: 0 };
  const fresh = Date.now() > rl.until;
  if (!fresh && rl.n >= LIMIT_PER_HOUR) {
    return NextResponse.json({ error: "Zu viele Prüfungen. Bitte in einer Stunde erneut versuchen." }, { status: 429 });
  }
  await setJSON(rlKey, { n: fresh ? 1 : rl.n + 1, until: fresh ? Date.now() + 3600000 : rl.until }, 3600).catch(() => {});

  // Cache per host for one hour
  const cacheKey = `sw:sitecheck:${host}`;
  let result = await getJSON<CheckResult>(cacheKey).catch(() => null);
  if (!result) {
    try {
      result = await runSiteCheck(input);
    } catch (err) {
      return NextResponse.json({ error: err instanceof Error ? err.message : "Prüfung fehlgeschlagen." }, { status: 422 });
    }
    await setJSON(cacheKey, result, 3600).catch(() => {});
  }

  await recordAnalyticsEvent({
    event_type: "site_check",
    path: "/website-check",
    session_id: typeof body?.session_id === "string" ? body.session_id : undefined,
    visitor_id: typeof body?.visitor_id === "string" ? body.visitor_id : undefined,
    meta: { label: host, score: result.score },
  }).catch(() => {});

  return NextResponse.json({ result });
}
