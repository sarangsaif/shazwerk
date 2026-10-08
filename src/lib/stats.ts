import type { AnalyticsEvent } from "./types";

export interface Count {
  key: string;
  count: number;
}

export interface JourneyStep {
  t: string;
  type: string;
  path: string;
  label?: string;
  href?: string;
  scroll?: number;
  duration?: number;
}

export interface SessionSummary {
  session_id: string;
  visitor_id: string;
  start: string;
  end: string;
  duration: number;
  pageviews: number;
  clicks: number;
  landing: string;
  exit: string;
  referrer: string;
  country: string;
  country_code: string;
  city: string;
  region: string;
  device: string;
  browser: string;
  os: string;
  screen: string;
  language: string;
  ip: string;
  returning: boolean;
  converted: boolean;
  campaign?: string;
  journey: JourneyStep[];
}

export interface ClickRow {
  label: string;
  path: string;
  href: string;
  count: number;
  last: string;
}

export interface Stats {
  generatedAt: string;
  rangeDays: number;
  totals: {
    visitors: number;
    sessions: number;
    pageviews: number;
    clicks: number;
    inquiries: number;
    avgDuration: number;
    avgScroll: number;
    bounceRate: number;
    live: number;
    returning: number;
  };
  daily: { date: string; pageviews: number; visitors: number }[];
  hours: number[];
  topPages: Count[];
  entryPages: Count[];
  referrers: Count[];
  campaigns: Count[];
  countries: Count[];
  cities: Count[];
  devices: Count[];
  browsers: Count[];
  os: Count[];
  languages: Count[];
  clicks: ClickRow[];
  ctaClicks: Count[];
  sessions: SessionSummary[];
  liveSessions: SessionSummary[];
}

const DAY = 86400000;

function tally(map: Map<string, number>, key: string | undefined, by = 1) {
  if (!key) return;
  map.set(key, (map.get(key) || 0) + by);
}

function top(map: Map<string, number>, n = 12): Count[] {
  return Array.from(map.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

function refHost(ref?: string): string {
  if (!ref || ref === "direct") return "Direkt";
  try {
    const host = new URL(ref).hostname.replace(/^www\./, "");
    if (host.endsWith("shazwerk.ch")) return "";
    return host;
  } catch {
    return ref.slice(0, 60);
  }
}

function zurichDate(iso: string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Zurich" }).format(new Date(iso));
}
function zurichHour(iso: string) {
  return Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Zurich", hour: "2-digit", hour12: false }).format(new Date(iso))) % 24;
}

export function computeStats(all: AnalyticsEvent[], inquiries: number, rangeDays = 30): Stats {
  const now = Date.now();
  const since = now - rangeDays * DAY;
  // Oldest → newest, human visitors only, admin pages excluded
  const events = all
    .filter((e) => e.device !== "Bot" && !(e.path || "").startsWith("/admin") && Date.parse(e.timestamp) >= since)
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  const pages = new Map<string, number>();
  const entries = new Map<string, number>();
  const refs = new Map<string, number>();
  const camps = new Map<string, number>();
  const countries = new Map<string, number>();
  const cities = new Map<string, number>();
  const devices = new Map<string, number>();
  const browsers = new Map<string, number>();
  const oses = new Map<string, number>();
  const langs = new Map<string, number>();
  const ctas = new Map<string, number>();
  const clickMap = new Map<string, ClickRow>();
  const visitors = new Set<string>();
  const hours = new Array(24).fill(0);
  const dailyPv = new Map<string, number>();
  const dailyVis = new Map<string, Set<string>>();
  const sessions = new Map<string, SessionSummary & { maxScroll: Map<string, number>; durations: Map<string, number> }>();
  const visitorFirstSeen = new Map<string, string>();

  for (const e of all) {
    const v = e.visitor_id;
    if (v && (!visitorFirstSeen.has(v) || e.timestamp < visitorFirstSeen.get(v)!)) visitorFirstSeen.set(v, e.timestamp);
  }

  let pageviews = 0;
  let clicks = 0;

  for (const e of events) {
    const sid = e.session_id || e.visitor_id || e.id;
    let s = sessions.get(sid);
    if (!s) {
      s = {
        session_id: sid,
        visitor_id: e.visitor_id || "",
        start: e.timestamp,
        end: e.timestamp,
        duration: 0,
        pageviews: 0,
        clicks: 0,
        landing: e.path,
        exit: e.path,
        referrer: refHost(e.referrer) || "Direkt",
        country: e.country || "",
        country_code: e.country_code || "",
        city: e.city || "",
        region: e.region || "",
        device: e.device || "",
        browser: [e.browser, e.browser_version].filter(Boolean).join(" "),
        os: [e.os, e.os_version].filter(Boolean).join(" "),
        screen: e.screen_resolution || "",
        language: e.language || "",
        ip: e.ip || "",
        returning: false,
        converted: false,
        campaign: e.marketing?.utm_campaign || e.marketing?.utm_source || e.marketing?.ad_source,
        journey: [],
        maxScroll: new Map(),
        durations: new Map(),
      };
      sessions.set(sid, s);
    }
    s.end = e.timestamp;
    const label = typeof e.meta?.label === "string" ? e.meta.label : e.cta_id;
    const href = typeof e.meta?.href === "string" ? e.meta.href : undefined;

    switch (e.event_type) {
      case "pageview": {
        pageviews++;
        s.pageviews++;
        s.exit = e.path;
        tally(pages, e.path);
        if (s.pageviews === 1) tally(entries, e.path);
        const d = zurichDate(e.timestamp);
        dailyPv.set(d, (dailyPv.get(d) || 0) + 1);
        if (!dailyVis.has(d)) dailyVis.set(d, new Set());
        dailyVis.get(d)!.add(e.visitor_id || sid);
        hours[zurichHour(e.timestamp)]++;
        s.journey.push({ t: e.timestamp, type: "pageview", path: e.path });
        break;
      }
      case "scroll": {
        s.maxScroll.set(e.path, Math.max(s.maxScroll.get(e.path) || 0, e.scroll_depth || 0));
        s.durations.set(e.path, Math.max(s.durations.get(e.path) || 0, e.duration_seconds || 0));
        break;
      }
      case "click": {
        clicks++;
        s.clicks++;
        const key = `${e.path}|${label}|${href || ""}`;
        const row = clickMap.get(key) || { label: label || "(ohne Text)", path: e.path, href: href || "", count: 0, last: e.timestamp };
        row.count++;
        row.last = e.timestamp;
        clickMap.set(key, row);
        s.journey.push({ t: e.timestamp, type: "click", path: e.path, label, href });
        break;
      }
      default: {
        if (e.event_type === "form_submit_success") s.converted = true;
        if (e.cta_id && e.event_type !== "pageview") tally(ctas, `${e.event_type}: ${e.cta_id}`);
        if (["form_submit_success", "form_submit_error", "copy_email", "lang_switch", "sound_toggle"].includes(e.event_type)) {
          s.journey.push({ t: e.timestamp, type: e.event_type, path: e.path, label });
        }
      }
    }
  }

  let durSum = 0;
  let scrollSum = 0;
  let scrollN = 0;
  let bounces = 0;
  let returning = 0;
  const live: SessionSummary[] = [];
  const finished: SessionSummary[] = [];

  for (const s of Array.from(sessions.values())) {
    if (s.pageviews === 0 && s.clicks === 0) continue;
    const spanSec = (Date.parse(s.end) - Date.parse(s.start)) / 1000;
    const pageSec = Array.from(s.durations.values()).reduce((a, b) => a + b, 0);
    s.duration = Math.round(Math.max(spanSec, pageSec));
    s.maxScroll.forEach((v) => {
      scrollSum += v;
      scrollN++;
    });
    // attach scroll depth to pageview steps
    for (const step of s.journey) {
      if (step.type === "pageview") {
        step.scroll = s.maxScroll.get(step.path);
        step.duration = s.durations.get(step.path);
      }
    }
    s.returning = (visitorFirstSeen.get(s.visitor_id) || s.start) < s.start.slice(0, 10);
    if (s.returning) returning++;
    durSum += s.duration;
    if (s.pageviews <= 1) bounces++;
    if (s.visitor_id) visitors.add(s.visitor_id);

    tally(refs, s.referrer);
    tally(camps, s.campaign);
    tally(countries, s.country || "Unbekannt");
    tally(cities, s.city ? `${s.city}${s.country_code ? `, ${s.country_code}` : ""}` : undefined);
    tally(devices, s.device);
    tally(browsers, s.browser.split(" ")[0]);
    tally(oses, s.os.split(" ")[0]);
    tally(langs, (s.language || "").slice(0, 2).toLowerCase() || undefined);

    const { maxScroll: _m, durations: _d, ...clean } = s;
    void _m;
    void _d;
    finished.push(clean);
    if (now - Date.parse(s.end) < 5 * 60000) live.push(clean);
  }

  const sessionCount = finished.length || 1;
  const daily: Stats["daily"] = [];
  for (let i = Math.min(rangeDays, 30) - 1; i >= 0; i--) {
    const d = zurichDate(new Date(now - i * DAY).toISOString());
    daily.push({ date: d, pageviews: dailyPv.get(d) || 0, visitors: dailyVis.get(d)?.size || 0 });
  }

  finished.sort((a, b) => b.end.localeCompare(a.end));

  return {
    generatedAt: new Date().toISOString(),
    rangeDays,
    totals: {
      visitors: visitors.size,
      sessions: finished.length,
      pageviews,
      clicks,
      inquiries,
      avgDuration: Math.round(durSum / sessionCount),
      avgScroll: scrollN ? Math.round(scrollSum / scrollN) : 0,
      bounceRate: finished.length ? Math.round((bounces / finished.length) * 100) : 0,
      live: live.length,
      returning,
    },
    daily,
    hours,
    topPages: top(pages, 15),
    entryPages: top(entries, 10),
    referrers: top(refs, 12),
    campaigns: top(camps, 10),
    countries: top(countries, 15),
    cities: top(cities, 15),
    devices: top(devices),
    browsers: top(browsers),
    os: top(oses),
    languages: top(langs),
    clicks: Array.from(clickMap.values()).sort((a, b) => b.count - a.count).slice(0, 100),
    ctaClicks: top(ctas, 15),
    sessions: finished.slice(0, 200),
    liveSessions: live,
  };
}
