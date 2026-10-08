import { NextRequest, NextResponse } from "next/server";
import { recordAnalyticsEvent } from "@/lib/db";
import { AnalyticsEventType, MarketingAttribution } from "@/lib/types";

export const dynamic = "force-dynamic";

// Country code to friendly name map
const COUNTRY_NAMES: Record<string, string> = {
  CH: "Switzerland",
  DE: "Germany",
  FR: "France",
  IT: "Italy",
  AT: "Austria",
  GB: "United Kingdom",
  US: "United States",
  CA: "Canada",
  AE: "United Arab Emirates",
  SG: "Singapore",
  AU: "Australia",
  NL: "Netherlands",
  SE: "Sweden",
  ES: "Spain",
  IN: "India",
  JP: "Japan",
};

// Parse User Agent string into device, OS, and browser
function parseUserAgent(uaString: string | null) {
  if (!uaString) {
    return {
      browser: "Unknown",
      browserVersion: "",
      os: "Unknown",
      osVersion: "",
      device: "Desktop",
    };
  }

  const ua = uaString;
  let browser = "Other";
  let browserVersion = "";
  let os = "Other";
  let osVersion = "";
  let device = "Desktop";

  // Device Category
  if (/mobile/i.test(ua) && !/ipad|tablet/i.test(ua)) {
    device = "Mobile";
  } else if (/ipad|tablet|playbook|silk/i.test(ua)) {
    device = "Tablet";
  } else if (/bot|crawler|spider|googlebot|bingbot|yandex/i.test(ua)) {
    device = "Bot";
  }

  // Operating System (check iOS before macOS: iPhone UAs contain "like Mac OS X")
  if (/iphone|ipad|ipod/i.test(ua)) {
    os = "iOS";
    const match = ua.match(/OS ([0-9_]+)/);
    if (match) osVersion = match[1].replace(/_/g, ".");
  } else if (/macintosh|mac os x/i.test(ua)) {
    os = "macOS";
    const match = ua.match(/Mac OS X ([0-9_]+)/);
    if (match) osVersion = match[1].replace(/_/g, ".");
  } else if (/windows nt/i.test(ua)) {
    os = "Windows";
    if (/Windows NT 10.0/i.test(ua)) osVersion = "10/11";
    else if (/Windows NT 6.3/i.test(ua)) osVersion = "8.1";
    else if (/Windows NT 6.1/i.test(ua)) osVersion = "7";
  } else if (/android/i.test(ua)) {
    os = "Android";
    const match = ua.match(/Android ([0-9.]+)/);
    if (match) osVersion = match[1];
  } else if (/linux/i.test(ua)) {
    os = "Linux";
  }

  // Browser
  if (/edg/i.test(ua)) {
    browser = "Edge";
    const match = ua.match(/Edg\/([0-9.]+)/);
    if (match) browserVersion = match[1].split(".")[0];
  } else if (/opr|opera/i.test(ua)) {
    browser = "Opera";
    const match = ua.match(/OPR\/([0-9.]+)/);
    if (match) browserVersion = match[1].split(".")[0];
  } else if (/samsungbrowser/i.test(ua)) {
    browser = "Samsung Internet";
    const match = ua.match(/SamsungBrowser\/([0-9.]+)/);
    if (match) browserVersion = match[1].split(".")[0];
  } else if (/chrome|crios/i.test(ua) && !/edg/i.test(ua)) {
    browser = "Chrome";
    const match = ua.match(/Chrome\/([0-9.]+)/) || ua.match(/CriOS\/([0-9.]+)/);
    if (match) browserVersion = match[1].split(".")[0];
  } else if (/firefox|fxios/i.test(ua)) {
    browser = "Firefox";
    const match = ua.match(/Firefox\/([0-9.]+)/) || ua.match(/FxiOS\/([0-9.]+)/);
    if (match) browserVersion = match[1].split(".")[0];
  } else if (/safari/i.test(ua) && !/chrome/i.test(ua)) {
    browser = "Safari";
    const match = ua.match(/Version\/([0-9.]+)/);
    if (match) browserVersion = match[1].split(".")[0];
  } else if (/bot|crawler|spider/i.test(ua)) {
    browser = "Bot / Spider";
  }

  return { browser, browserVersion, os, osVersion, device };
}

// Client IP resolver
function extractClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0].trim();
    if (ip) return ip;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  return req.ip || "127.0.0.1";
}

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
      "form_submit_success",
      "form_submit_error",
      "scroll",
      "nav_click",
      "copy_email",
      "project_toggle",
      "filter_work",
      "filter_archive",
      "faq_toggle",
    ];

    if (!validTypes.includes(body.event_type) && typeof body.event_type !== "string") {
      return NextResponse.json({ error: "Invalid event_type" }, { status: 400 });
    }

    // Extract Network & IP Address
    const clientIp = extractClientIp(req);

    // Geolocation from Vercel / Cloudflare edge headers
    const rawCountryCode =
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      "";

    let countryCode = rawCountryCode.toUpperCase();
    let country = COUNTRY_NAMES[countryCode] || countryCode;
    let city = req.headers.get("x-vercel-ip-city") || req.headers.get("cf-ipcity") || "";
    try {
      city = decodeURIComponent(city);
    } catch {}
    let region = req.headers.get("x-vercel-ip-country-region") || req.headers.get("cf-region") || "";
    const timezone = req.headers.get("x-vercel-ip-timezone") || body.timezone || "Europe/Zurich";

    // Fallback for local development or non-edge environments
    if (!countryCode || clientIp === "127.0.0.1" || clientIp === "::1" || clientIp.startsWith("192.168.")) {
      if (!countryCode) {
        countryCode = "CH";
        country = "Switzerland (Local)";
      }
      if (!city) {
        city = "Lokal";
      }
      if (!region) {
        region = "ZH";
      }
    }

    // User Agent intelligence
    const userAgent = req.headers.get("user-agent") || "";
    const uaInfo = parseUserAgent(userAgent);

    // Device override if client provided explicit screen-based device
    const device = body.device || uaInfo.device;

    // Cookie identifiers
    const cookieVid = req.cookies.get("_sw_vid")?.value || body.visitor_id;
    const cookieSid = req.cookies.get("_sw_sid")?.value || body.session_id;

    // Marketing Cookies & Attribution
    let marketing: MarketingAttribution = body.marketing || {};
    const cookieMkt = req.cookies.get("_sw_mkt")?.value;
    if (cookieMkt) {
      try {
        const parsed = JSON.parse(cookieMkt);
        marketing = { ...parsed, ...marketing };
      } catch {}
    }

    await recordAnalyticsEvent({
      event_type: body.event_type,
      path: typeof body.path === "string" ? body.path.slice(0, 200) : "/",
      referrer: typeof body.referrer === "string" ? body.referrer.slice(0, 300) : "direct",
      ip: clientIp,
      country,
      country_code: countryCode,
      city,
      region,
      timezone,
      device,
      browser: uaInfo.browser,
      browser_version: uaInfo.browserVersion,
      os: uaInfo.os,
      os_version: uaInfo.osVersion,
      screen_resolution: body.screen_resolution,
      viewport_size: body.viewport_size,
      device_pixel_ratio: body.device_pixel_ratio,
      color_depth: body.color_depth,
      language: body.language,
      cpu_cores: body.cpu_cores,
      ram_gb: body.ram_gb,
      connection_type: body.connection_type,
      touch_support: body.touch_support,
      visitor_id: cookieVid,
      session_id: cookieSid,
      visit_count: body.visit_count || 1,
      duration_seconds: body.duration_seconds || 0,
      scroll_depth: body.scroll_depth || 0,
      cta_id: typeof body.cta_id === "string" ? body.cta_id.slice(0, 100) : undefined,
      marketing,
      user_agent: userAgent.slice(0, 350),
      meta: body.meta,
    });

    const response = NextResponse.json({ ok: true });

    // Set first-party persistent cookie if not already set
    if (cookieVid && !req.cookies.get("_sw_vid")) {
      response.cookies.set("_sw_vid", cookieVid, {
        maxAge: 365 * 24 * 60 * 60,
        path: "/",
        sameSite: "lax",
      });
    }

    return response;
  } catch (err) {
    console.error("Analytics collection error:", err);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
