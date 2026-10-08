import crypto from "crypto";
import { ContactSubmission, SubmissionStatus, AnalyticsEvent, EmailSettings } from "./types";
import { getJSON, setJSON, listPush, listRange } from "./store";

const K = {
  submissions: "sw:submissions",
  events: "sw:events",
  email: "sw:email-settings",
};

const EVENT_CAP = 15000;

const DEFAULT_EMAIL_SETTINGS: EmailSettings = {
  notificationEmail: process.env.NOTIFICATION_EMAIL || "hello@shazwerk.ch",
  senderName: "SHAZWERK",
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

// ---------- Inquiries ----------

export async function getSubmissions(): Promise<ContactSubmission[]> {
  return (await getJSON<ContactSubmission[]>(K.submissions)) || [];
}

export async function createSubmission(
  input: Omit<ContactSubmission, "id" | "created_at" | "status">
): Promise<ContactSubmission> {
  const submissions = await getSubmissions();
  const submission: ContactSubmission = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    name: input.name.trim(),
    company: (input.company || "").trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone ? input.phone.trim() : undefined,
    project_type: input.project_type,
    budget: input.budget || undefined,
    timeline: input.timeline || undefined,
    message: input.message.trim(),
    status: "new",
  };
  await setJSON(K.submissions, [submission, ...submissions].slice(0, 2000));
  return submission;
}

export async function updateSubmissionStatus(id: string, status: SubmissionStatus): Promise<ContactSubmission | null> {
  const submissions = await getSubmissions();
  const item = submissions.find((s) => s.id === id);
  if (!item) return null;
  item.status = status;
  await setJSON(K.submissions, submissions);
  return item;
}

export async function deleteSubmission(id: string): Promise<boolean> {
  const submissions = await getSubmissions();
  const next = submissions.filter((s) => s.id !== id);
  if (next.length === submissions.length) return false;
  await setJSON(K.submissions, next);
  return true;
}

// ---------- Email settings ----------

export async function getEmailSettings(): Promise<EmailSettings> {
  const stored = await getJSON<Partial<EmailSettings>>(K.email);
  return { ...DEFAULT_EMAIL_SETTINGS, ...(stored || {}) };
}

export async function updateEmailSettings(settings: Partial<EmailSettings>): Promise<EmailSettings> {
  const next = { ...(await getEmailSettings()), ...settings };
  await setJSON(K.email, next);
  return next;
}

// ---------- Analytics ----------

export async function recordAnalyticsEvent(event: Omit<AnalyticsEvent, "id" | "timestamp">): Promise<AnalyticsEvent> {
  const full: AnalyticsEvent = {
    ...event,
    id: crypto.randomUUID().slice(0, 12),
    timestamp: new Date().toISOString(),
    visitor_id: event.visitor_id || "v_" + crypto.randomUUID().slice(0, 8),
    session_id: event.session_id || "s_" + crypto.randomUUID().slice(0, 8),
  };
  // Drop empty fields to keep the list compact
  for (const k of Object.keys(full) as (keyof AnalyticsEvent)[]) {
    const v = full[k];
    if (v === undefined || v === null || v === "") delete full[k];
  }
  await listPush(K.events, full, EVENT_CAP);
  return full;
}

/** Newest first. */
export async function getAnalyticsEvents(limit = EVENT_CAP): Promise<AnalyticsEvent[]> {
  return listRange<AnalyticsEvent>(K.events, limit);
}
