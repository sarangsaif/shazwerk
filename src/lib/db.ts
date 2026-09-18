import fs from "fs";
import path from "path";
import crypto from "crypto";
import { ContactSubmission, SubmissionStatus, AnalyticsEvent, AnalyticsSummary, EmailSettings } from "./types";

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
  const newEvent: AnalyticsEvent = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    event_type: event.event_type,
    path: event.path,
    referrer: event.referrer,
    country: event.country || "Unknown",
    device: event.device || "Desktop",
    cta_id: event.cta_id,
    meta: event.meta,
  };

  events.push(newEvent);
  writeAnalytics(events);
  return newEvent;
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const events = readAnalytics();
  const pageviews = events.filter((e) => e.event_type === "pageview");

  const pageCounts: Record<string, number> = {};
  const referrerCounts: Record<string, number> = {};
  const countryCounts: Record<string, number> = {};
  const ctaCounts: Record<string, number> = {};

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
      referrerCounts["Direct"] = (referrerCounts["Direct"] || 0) + 1;
    }

    const country = pv.country || "CH (Estimated)";
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  }

  for (const evt of events) {
    if (evt.event_type === "cta_click" && evt.cta_id) {
      ctaCounts[evt.cta_id] = (ctaCounts[evt.cta_id] || 0) + 1;
    }
  }

  const formSubmissions = events.filter((e) => e.event_type === "form_submit").length;

  return {
    totalPageviews: pageviews.length,
    uniqueVisitorsEstimate: Math.max(1, Math.round(pageviews.length * 0.72)),
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
    ctaClicks: Object.entries(ctaCounts)
      .map(([cta_id, count]) => ({ cta_id, count }))
      .sort((a, b) => b.count - a.count),
    formSubmissionsCount: formSubmissions,
  };
}
