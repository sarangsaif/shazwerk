"use client";

import { AnalyticsEventType, MarketingAttribution } from "./types";

const COOKIE_VID = "_sw_vid";
const COOKIE_SID = "_sw_sid";
const COOKIE_MKT = "_sw_mkt";
const COOKIE_VC = "_sw_vc";

// Safe Cookie Helpers
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
  return match ? decodeURIComponent(match[3]) : null;
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/; SameSite=Lax${secure}`;
}

// Generate random UUID
function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Get or initialize persistent visitor ID
export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let vid = getCookie(COOKIE_VID);
  if (!vid) {
    try {
      vid = localStorage.getItem(COOKIE_VID);
    } catch {}
  }
  if (!vid) {
    vid = "v_" + generateUUID();
  }
  setCookie(COOKIE_VID, vid, 365);
  try {
    localStorage.setItem(COOKIE_VID, vid);
  } catch {}
  return vid;
}

// Get or initialize session ID (expires in 30 mins)
export function getSessionId(): { sessionId: string; isNewSession: boolean } {
  if (typeof window === "undefined") return { sessionId: "", isNewSession: false };
  let sid = getCookie(COOKIE_SID);
  let isNewSession = false;

  if (!sid) {
    try {
      sid = sessionStorage.getItem(COOKIE_SID);
    } catch {}
  }

  if (!sid) {
    sid = "s_" + generateUUID();
    isNewSession = true;

    // Increment visit count
    let vc = parseInt(getCookie(COOKIE_VC) || "0", 10);
    vc = isNaN(vc) ? 1 : vc + 1;
    setCookie(COOKIE_VC, vc.toString(), 365);
  }

  // Set session cookie (30 min expiry)
  const date = new Date();
  date.setTime(date.getTime() + 30 * 60 * 1000);
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_SID}=${encodeURIComponent(sid)}; expires=${date.toUTCString()}; path=/; SameSite=Lax${secure}`;
  try {
    sessionStorage.setItem(COOKIE_SID, sid);
  } catch {}

  return { sessionId: sid, isNewSession };
}

// Extract and persist marketing attribution cookies (UTMs, Ad tags)
export function getMarketingAttribution(): MarketingAttribution {
  if (typeof window === "undefined") return {};

  let storedMarketing: MarketingAttribution = {};
  try {
    const cookieVal = getCookie(COOKIE_MKT);
    if (cookieVal) {
      storedMarketing = JSON.parse(cookieVal);
    } else {
      const localVal = localStorage.getItem(COOKIE_MKT);
      if (localVal) storedMarketing = JSON.parse(localVal);
    }
  } catch {}

  try {
    const params = new URLSearchParams(window.location.search);
    const utm_source = params.get("utm_source") || undefined;
    const utm_medium = params.get("utm_medium") || undefined;
    const utm_campaign = params.get("utm_campaign") || undefined;
    const utm_term = params.get("utm_term") || undefined;
    const utm_content = params.get("utm_content") || undefined;

    // Ad Click IDs
    const gclid = params.get("gclid") || undefined;
    const fbclid = params.get("fbclid") || undefined;
    const ttclid = params.get("ttclid") || undefined;
    const msclkid = params.get("msclkid") || undefined;
    const li_fat_id = params.get("li_fat_id") || undefined;

    let ad_source: string | undefined = undefined;
    if (gclid) ad_source = "Google Ads";
    else if (fbclid) ad_source = "Meta / Instagram";
    else if (ttclid) ad_source = "TikTok Ads";
    else if (msclkid) ad_source = "Microsoft Ads";
    else if (li_fat_id) ad_source = "LinkedIn Ads";

    const freshMarketing: MarketingAttribution = {
      utm_source: utm_source || storedMarketing.utm_source,
      utm_medium: utm_medium || storedMarketing.utm_medium,
      utm_campaign: utm_campaign || storedMarketing.utm_campaign,
      utm_term: utm_term || storedMarketing.utm_term,
      utm_content: utm_content || storedMarketing.utm_content,
      gclid: gclid || storedMarketing.gclid,
      fbclid: fbclid || storedMarketing.fbclid,
      ttclid: ttclid || storedMarketing.ttclid,
      msclkid: msclkid || storedMarketing.msclkid,
      li_fat_id: li_fat_id || storedMarketing.li_fat_id,
      ad_source: ad_source || storedMarketing.ad_source,
    };

    // If new marketing info is detected, persist it
    if (utm_source || utm_campaign || gclid || fbclid) {
      setCookie(COOKIE_MKT, JSON.stringify(freshMarketing), 90);
      try {
        localStorage.setItem(COOKIE_MKT, JSON.stringify(freshMarketing));
      } catch {}
    }

    return freshMarketing;
  } catch {
    return storedMarketing;
  }
}

// Gather all out-of-the-box hardware & environment signals
export function collectDeviceFootprint() {
  if (typeof window === "undefined") return {};

  const width = window.screen?.width || window.innerWidth || 0;
  const height = window.screen?.height || window.innerHeight || 0;
  const viewportWidth = window.innerWidth || 0;
  const viewportHeight = window.innerHeight || 0;
  const dpr = window.devicePixelRatio || 1;
  const colorDepth = window.screen?.colorDepth || 24;

  const device =
    width < 768
      ? "Mobile"
      : width < 1024
      ? "Tablet"
      : "Desktop";

  let timezone = "UTC";
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {}

  const language = (navigator.language || (navigator as any).userLanguage || "en").toLowerCase();

  // Advanced hardware concurrency & memory signals
  const cpuCores = navigator.hardwareConcurrency || undefined;
  const ramGb = (navigator as any).deviceMemory || undefined;
  const connection = (navigator as any).connection;
  const connectionType = connection?.effectiveType || undefined;
  const touchSupport = ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);

  return {
    device,
    screen_resolution: `${width}x${height}`,
    viewport_size: `${viewportWidth}x${viewportHeight}`,
    device_pixel_ratio: dpr,
    color_depth: colorDepth,
    timezone,
    language,
    cpu_cores: cpuCores,
    ram_gb: ramGb,
    connection_type: connectionType,
    touch_support: touchSupport,
  };
}

// Track max scroll depth on page
let maxScrollDepth = 0;
let pageStartTime = typeof window !== "undefined" ? Date.now() : 0;

if (typeof window !== "undefined") {
  const updateScrollDepth = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const currentPercent = Math.min(100, Math.round((scrollTop / docHeight) * 100));
      if (currentPercent > maxScrollDepth) {
        maxScrollDepth = currentPercent;
      }
    }
  };

  window.addEventListener("scroll", updateScrollDepth, { passive: true });
}

// Reset scroll and timer on route change
export function resetPageMetrics() {
  maxScrollDepth = 0;
  pageStartTime = Date.now();
}

export function trackClientEvent(
  eventType: AnalyticsEventType,
  payload: {
    path?: string;
    cta_id?: string;
    meta?: Record<string, string | number | boolean>;
    [key: string]: any;
  } = {}
) {
  if (typeof window === "undefined") return;

  const path = payload.path || window.location.pathname;
  const referrer = document.referrer ? document.referrer : "direct";

  const visitorId = getVisitorId();
  const { sessionId } = getSessionId();
  const visitCount = parseInt(getCookie(COOKIE_VC) || "1", 10);
  const marketing = getMarketingAttribution();
  const footprint = collectDeviceFootprint();

  const durationSeconds = Math.max(0, Math.round((Date.now() - pageStartTime) / 1000));

  const { cta_id, meta, ...rest } = payload;
  const combinedMeta = { ...meta, ...rest };

  const body = {
    event_type: eventType,
    path,
    referrer,
    visitor_id: visitorId,
    session_id: sessionId,
    visit_count: visitCount,
    marketing,
    duration_seconds: durationSeconds,
    scroll_depth: maxScrollDepth,
    cta_id,
    meta: combinedMeta,
    ...footprint,
  };

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(body)], { type: "application/json" });
      navigator.sendBeacon("/api/analytics", blob);
    } else {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Fail silently in restricted sandbox
  }
}
