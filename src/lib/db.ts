import fs from "fs";
import path from "path";
import crypto from "crypto";
import { ContactSubmission, SubmissionStatus, AnalyticsEvent, AnalyticsSummary, VisitorSessionRecord, EmailSettings } from "./types";

// Choose directory: fallback to /tmp in read-only serverless environments
function getStorageDir(): string {
  const localDir = path.join(process.cwd(), "data");
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    // Test write permission
    const testFile = path.join(localDir, ".test-write");
    fs.writeFileSync(testFile, "ok");
    fs.unlinkSync(testFile);
    return localDir;
  } catch {
    const tmpDir = path.join("/tmp", "shazwerk-data");
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    return tmpDir;
  }
}

const STORAGE_DIR = getStorageDir();
const SUBMISSIONS_FILE = path.join(STORAGE_DIR, "contact_submissions.json");
const ANALYTICS_FILE = path.join(STORAGE_DIR, "analytics_events.json");
const SETTINGS_FILE = path.join(STORAGE_DIR, "email_settings.json");

// Default Email Settings
const DEFAULT_EMAIL_SETTINGS: EmailSettings = {
  notificationEmail: process.env.NOTIFICATION_EMAIL || "hello@shazwerk.ch",
  senderName: "SHAZWERK Studio",
  senderEmail: process.env.SENDER_EMAIL || "notifications@shazwerk.ch",
  provider: "auto",
  smtpHost: process.env.SMTP_HOST || "",
  smtpPort: Number(process.env.SMTP_PORT) || 587,
  smtpUser: process.env.SMTP_USER || "",
  smtpPass: process.env.SMTP_PASS || "",
  smtpSecure: process.env.SMTP_SECURE === "true",
  resendApiKey: process.env.RESEND_API_KEY || "",
  webhookUrl: process.env.NOTIFICATION_WEBHOOK_URL || "",
  notifyOnNewLead: true,
};

// In-memory fallback / cache
let memorySubmissions: ContactSubmission[] = [];
let memoryAnalytics: AnalyticsEvent[] = [];
let memorySettings: EmailSettings = { ...DEFAULT_EMAIL_SETTINGS };

// Initialize files if they don't exist
function readSubmissions(): ContactSubmission[] {
  try {
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const content = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("Error reading submissions file:", err);
  }
  return memorySubmissions;
}

function writeSubmissions(submissions: ContactSubmission[]): void {
  memorySubmissions = submissions;
  try {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing submissions file:", err);
  }
}

function readAnalytics(): AnalyticsEvent[] {
  try {
    if (fs.existsSync(ANALYTICS_FILE)) {
      const content = fs.readFileSync(ANALYTICS_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("Error reading analytics file:", err);
  }
  return memoryAnalytics;
}

function writeAnalytics(events: AnalyticsEvent[]): void {
  // Cap at last 5000 events to prevent unbounded growth
  const capped = events.slice(-5000);
  memoryAnalytics = capped;
  try {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(capped, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing analytics file:", err);
  }
}

export async function createSubmission(
  input: Omit<ContactSubmission, "id" | "created_at" | "status">
): Promise<ContactSubmission> {
  const submissions = readSubmissions();
  const newSubmission: ContactSubmission = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    name: input.name.trim(),
    company: input.company.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone ? input.phone.trim() : undefined,
    project_type: input.project_type,
    budget: input.budget || undefined,
    timeline: input.timeline || undefined,
    message: input.message.trim(),
    status: "new",
  };

  submissions.unshift(newSubmission);
  writeSubmissions(submissions);
  return newSubmission;
}

export async function getSubmissions(): Promise<ContactSubmission[]> {
  return readSubmissions();
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus
): Promise<ContactSubmission | null> {
  const submissions = readSubmissions();
  const index = submissions.findIndex((s) => s.id === id);
  if (index === -1) return null;

  submissions[index].status = status;
  writeSubmissions(submissions);
  return submissions[index];
}

export async function deleteSubmission(id: string): Promise<boolean> {
  const submissions = readSubmissions();
  const filtered = submissions.filter((s) => s.id !== id);
  if (filtered.length === submissions.length) return false;
  writeSubmissions(filtered);
  return true;
}

export async function getEmailSettings(): Promise<EmailSettings> {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const content = fs.readFileSync(SETTINGS_FILE, "utf-8");
      return { ...DEFAULT_EMAIL_SETTINGS, ...JSON.parse(content) };
    }
  } catch (err) {
    console.error("Error reading settings file:", err);
  }
  return memorySettings;
}

export async function updateEmailSettings(settings: Partial<EmailSettings>): Promise<EmailSettings> {
  const current = await getEmailSettings();
  const updated: EmailSettings = { ...current, ...settings };
  memorySettings = updated;
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing settings file:", err);
  }
  return updated;
}

export async function recordAnalyticsEvent(
  event: Omit<AnalyticsEvent, "id" | "timestamp">
): Promise<AnalyticsEvent> {
  const events = readAnalytics();

  // If this is a scroll/update event for an existing session and path, update the latest event
  if (event.event_type === "scroll" && event.session_id) {
    const existingIndex = events.slice().reverse().findIndex(
      (e) => e.session_id === event.session_id && e.path === event.path
    );
    if (existingIndex !== -1) {
      const realIndex = events.length - 1 - existingIndex;
      events[realIndex].scroll_depth = Math.max(events[realIndex].scroll_depth || 0, event.scroll_depth || 0);
      events[realIndex].duration_seconds = Math.max(events[realIndex].duration_seconds || 0, event.duration_seconds || 0);
      writeAnalytics(events);
      return events[realIndex];
    }
  }

  const newEvent: AnalyticsEvent = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    event_type: event.event_type,
    path: event.path,
    referrer: event.referrer,
    ip: event.ip || "127.0.0.1",
    country: event.country || "Switzerland",
    country_code: event.country_code || "CH",
    city: event.city || "Zurich",
    region: event.region || "ZH",
    timezone: event.timezone || "Europe/Zurich",
    device: event.device || "Desktop",
    browser: event.browser || "Unknown",
    browser_version: event.browser_version || "",
    os: event.os || "Unknown",
    os_version: event.os_version || "",
    screen_resolution: event.screen_resolution || "1920x1080",
    viewport_size: event.viewport_size,
    device_pixel_ratio: event.device_pixel_ratio,
    color_depth: event.color_depth,
    language: event.language || "en",
    cpu_cores: event.cpu_cores,
    ram_gb: event.ram_gb,
    connection_type: event.connection_type,
    touch_support: event.touch_support,
    visitor_id: event.visitor_id || "v_" + crypto.randomUUID().slice(0, 8),
    session_id: event.session_id || "s_" + crypto.randomUUID().slice(0, 8),
    visit_count: event.visit_count || 1,
    duration_seconds: event.duration_seconds || 0,
    scroll_depth: event.scroll_depth || 0,
    cta_id: event.cta_id,
    marketing: event.marketing,
    user_agent: event.user_agent,
    meta: event.meta,
  };

  events.push(newEvent);
  writeAnalytics(events);
  return newEvent;
}

export async function getAllAnalyticsEvents(): Promise<AnalyticsEvent[]> {
  return readAnalytics();
}

export async function rehydrateAnalyticsEvents(rehydrateItems: Partial<AnalyticsEvent>[]): Promise<void> {
  if (!rehydrateItems || !Array.isArray(rehydrateItems) || rehydrateItems.length === 0) return;
  const existing = readAnalytics();
  const existingIds = new Set(existing.map((e) => e.session_id || e.id));

  let added = false;
  for (const item of rehydrateItems) {
    const key = item.session_id || item.id;
    if (key && !existingIds.has(key)) {
      existing.push({
        id: item.id || crypto.randomUUID(),
        timestamp: item.timestamp || new Date().toISOString(),
        event_type: item.event_type || "pageview",
        path: item.path || "/",
        referrer: item.referrer || "direct",
        ip: item.ip || "127.0.0.1",
        country: item.country || "Switzerland",
        country_code: item.country_code || "CH",
        city: item.city || "Zurich",
        region: item.region || "ZH",
        timezone: item.timezone || "Europe/Zurich",
        device: item.device || "Desktop",
        browser: item.browser || "Unknown",
        browser_version: item.browser_version || "",
        os: item.os || "Unknown",
        os_version: item.os_version || "",
        screen_resolution: item.screen_resolution || "1920x1080",
        visitor_id: item.visitor_id || "v_" + crypto.randomUUID().slice(0, 8),
        session_id: item.session_id || "s_" + crypto.randomUUID().slice(0, 8),
        visit_count: item.visit_count || 1,
        duration_seconds: item.duration_seconds || 0,
        scroll_depth: item.scroll_depth || 0,
        marketing: item.marketing,
        user_agent: item.user_agent,
      });
      existingIds.add(key);
      added = true;
    }
  }

  if (added) {
    writeAnalytics(existing);
  }
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const events = readAnalytics();
  const pageviews = events.filter((e) => e.event_type === "pageview");

  const pageCounts: Record<string, number> = {};
  const referrerCounts: Record<string, number> = {};
  const countryCounts: Record<string, number> = {};
  const cityCounts: Record<string, { city: string; country: string; count: number }> = {};
  const browserCounts: Record<string, number> = {};
  const osCounts: Record<string, number> = {};
  const deviceCounts: Record<string, number> = {};
  const screenCounts: Record<string, number> = {};
  const ctaCounts: Record<string, number> = {};
  const campaignsMap: Record<string, { campaign: string; source: string; medium: string; visitors: Set<string> }> = {};
  const adClickCounts: Record<string, number> = {};

  const uniqueVisitorIds = new Set<string>();
  const sessionMap: Record<string, {
    events: AnalyticsEvent[];
    firstSeen: string;
    lastSeen: string;
  }> = {};

  const now = Date.now();
  const FIFTEEN_MINUTES = 15 * 60 * 1000;
  let totalScrollDepth = 0;
  let scrollCount = 0;

  for (const evt of events) {
    const vid = evt.visitor_id || evt.ip || "unknown";
    uniqueVisitorIds.add(vid);

    const sid = evt.session_id || `${evt.ip}_${evt.visitor_id || "anon"}`;
    if (!sessionMap[sid]) {
      sessionMap[sid] = {
        events: [evt],
        firstSeen: evt.timestamp,
        lastSeen: evt.timestamp,
      };
    } else {
      sessionMap[sid].events.push(evt);
      if (new Date(evt.timestamp) > new Date(sessionMap[sid].lastSeen)) {
        sessionMap[sid].lastSeen = evt.timestamp;
      }
    }

    if (evt.scroll_depth && evt.scroll_depth > 0) {
      totalScrollDepth += evt.scroll_depth;
      scrollCount++;
    }

    if (evt.marketing) {
      const { utm_campaign, utm_source, utm_medium, gclid, fbclid, ttclid, msclkid, li_fat_id } = evt.marketing;
      if (utm_campaign || utm_source) {
        const campKey = `${utm_campaign || "none"}|${utm_source || "direct"}|${utm_medium || "none"}`;
        if (!campaignsMap[campKey]) {
          campaignsMap[campKey] = {
            campaign: utm_campaign || "Unassigned Campaign",
            source: utm_source || "direct",
            medium: utm_medium || "organic",
            visitors: new Set([vid]),
          };
        } else {
          campaignsMap[campKey].visitors.add(vid);
        }
      }

      if (gclid) adClickCounts["Google Ads"] = (adClickCounts["Google Ads"] || 0) + 1;
      if (fbclid) adClickCounts["Meta / Instagram"] = (adClickCounts["Meta / Instagram"] || 0) + 1;
      if (ttclid) adClickCounts["TikTok Ads"] = (adClickCounts["TikTok Ads"] || 0) + 1;
      if (msclkid) adClickCounts["Microsoft Ads"] = (adClickCounts["Microsoft Ads"] || 0) + 1;
      if (li_fat_id) adClickCounts["LinkedIn Ads"] = (adClickCounts["LinkedIn Ads"] || 0) + 1;
    }
  }

  for (const pv of pageviews) {
    pageCounts[pv.path] = (pageCounts[pv.path] || 0) + 1;

    if (pv.referrer && pv.referrer !== "direct") {
      try {
        const domain = new URL(pv.referrer).hostname;
        referrerCounts[domain] = (referrerCounts[domain] || 0) + 1;
      } catch {
        referrerCounts[pv.referrer] = (referrerCounts[pv.referrer] || 0) + 1;
      }
    } else {
      referrerCounts["Direct Traffic"] = (referrerCounts["Direct Traffic"] || 0) + 1;
    }

    const country = pv.country || "Switzerland";
    countryCounts[country] = (countryCounts[country] || 0) + 1;

    const city = pv.city || "Zurich";
    const cityKey = `${city}, ${country}`;
    if (!cityCounts[cityKey]) {
      cityCounts[cityKey] = { city, country, count: 1 };
    } else {
      cityCounts[cityKey].count += 1;
    }

    const browser = pv.browser || "Unknown";
    browserCounts[browser] = (browserCounts[browser] || 0) + 1;

    const os = pv.os || "Unknown";
    osCounts[os] = (osCounts[os] || 0) + 1;

    const device = pv.device || "Desktop";
    deviceCounts[device] = (deviceCounts[device] || 0) + 1;

    if (pv.screen_resolution) {
      screenCounts[pv.screen_resolution] = (screenCounts[pv.screen_resolution] || 0) + 1;
    }
  }

  for (const evt of events) {
    if (evt.event_type === "cta_click" && evt.cta_id) {
      ctaCounts[evt.cta_id] = (ctaCounts[evt.cta_id] || 0) + 1;
    }
  }

  // Construct individual visitor session records
  const recentVisitors: VisitorSessionRecord[] = Object.entries(sessionMap).map(([sid, session]) => {
    const primary = session.events[0];
    const latest = session.events[session.events.length - 1];
    const pages = Array.from(new Set(session.events.map((e) => e.path)));
    const maxScroll = Math.max(...session.events.map((e) => e.scroll_depth || 0), 0);
    const maxDuration = Math.max(...session.events.map((e) => e.duration_seconds || 0), 0);
    const isOnline = now - new Date(session.lastSeen).getTime() < FIFTEEN_MINUTES;

    return {
      id: sid,
      timestamp: session.firstSeen,
      last_active: session.lastSeen,
      visitor_id: primary.visitor_id || "v_anon",
      session_id: sid,
      ip: primary.ip || "127.0.0.1",
      country: primary.country || "Switzerland",
      country_code: primary.country_code || "CH",
      city: primary.city || "Zurich",
      region: primary.region || "ZH",
      timezone: primary.timezone || "Europe/Zurich",
      device: primary.device || "Desktop",
      browser: primary.browser || "Unknown",
      browser_version: primary.browser_version || "",
      os: primary.os || "Unknown",
      os_version: primary.os_version || "",
      screen_resolution: primary.screen_resolution || "1920x1080",
      viewport_size: primary.viewport_size || "",
      language: primary.language || "en",
      cpu_cores: primary.cpu_cores,
      ram_gb: primary.ram_gb,
      connection_type: primary.connection_type,
      landing_path: primary.path || "/",
      current_path: latest.path || "/",
      pages_viewed: pages,
      pageviews_count: session.events.filter((e) => e.event_type === "pageview").length || 1,
      referrer: primary.referrer || "direct",
      marketing: primary.marketing || latest.marketing,
      scroll_depth_max: maxScroll,
      duration_seconds: maxDuration,
      is_online: isOnline,
      user_agent: primary.user_agent,
    };
  }).sort((a, b) => new Date(b.last_active).getTime() - new Date(a.last_active).getTime());

  const liveVisitorsCount = recentVisitors.filter((v) => v.is_online).length;
  const formSubmissions = events.filter((e) => e.event_type === "form_submit").length;
  const avgScroll = scrollCount > 0 ? Math.round(totalScrollDepth / scrollCount) : 58;

  return {
    totalPageviews: pageviews.length,
    uniqueVisitorsEstimate: Math.max(uniqueVisitorIds.size, pageviews.length > 0 ? Math.round(pageviews.length * 0.72) : 0),
    uniqueVisitorsCount: uniqueVisitorIds.size,
    liveVisitorsCount,
    avgScrollDepth: avgScroll,
    recentVisitors: recentVisitors.slice(0, 100),
    topPages: Object.entries(pageCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
    referrers: Object.entries(referrerCounts)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8),
    countries: Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8),
    cities: Object.values(cityCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
    browsers: Object.entries(browserCounts)
      .map(([browser, count]) => ({ browser, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8),
    operatingSystems: Object.entries(osCounts)
      .map(([os, count]) => ({ os, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8),
    devices: Object.entries(deviceCounts)
      .map(([device, count]) => ({ device, count }))
      .sort((a, b) => b.count - a.count),
    screenResolutions: Object.entries(screenCounts)
      .map(([resolution, count]) => ({ resolution, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8),
    marketingCampaigns: Object.values(campaignsMap)
      .map((c) => ({
        campaign: c.campaign,
        source: c.source,
        medium: c.medium,
        visitors: c.visitors.size,
      }))
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 10),
    adClickSummary: Object.entries(adClickCounts)
      .map(([provider, count]) => ({ provider, count }))
      .sort((a, b) => b.count - a.count),
    ctaClicks: Object.entries(ctaCounts)
      .map(([cta_id, count]) => ({ cta_id, count }))
      .sort((a, b) => b.count - a.count),
    formSubmissionsCount: formSubmissions,
  };
}
