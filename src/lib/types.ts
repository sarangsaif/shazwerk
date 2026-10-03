export type SubmissionStatus = "new" | "contacted" | "qualified" | "archived";

export interface ContactSubmission {
  id: string;
  created_at: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  project_type: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: SubmissionStatus;
}

export type AnalyticsEventType =
  | "pageview"
  | "cta_click"
  | "form_start"
  | "form_submit"
  | "form_submit_success"
  | "form_submit_error"
  | "nav_click"
  | "copy_email"
  | "project_toggle"
  | "filter_work"
  | "filter_archive"
  | "faq_toggle"
  | "scroll"
  | (string & {});

export interface MarketingAttribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  ttclid?: string;
  msclkid?: string;
  li_fat_id?: string;
  ad_source?: string;
}

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  event_type: AnalyticsEventType;
  path: string;
  referrer?: string;
  ip?: string;
  country?: string;
  country_code?: string;
  city?: string;
  region?: string;
  timezone?: string;
  device?: string;
  browser?: string;
  browser_version?: string;
  os?: string;
  os_version?: string;
  screen_resolution?: string;
  viewport_size?: string;
  device_pixel_ratio?: number;
  color_depth?: number;
  language?: string;
  cpu_cores?: number;
  ram_gb?: number;
  connection_type?: string;
  touch_support?: boolean;
  visitor_id?: string;
  session_id?: string;
  visit_count?: number;
  duration_seconds?: number;
  scroll_depth?: number;
  cta_id?: string;
  marketing?: MarketingAttribution;
  user_agent?: string;
  meta?: Record<string, string | number | boolean>;
}

export interface VisitorSessionRecord {
  id: string;
  timestamp: string;
  last_active: string;
  visitor_id: string;
  session_id: string;
  ip: string;
  country: string;
  country_code: string;
  city: string;
  region: string;
  timezone: string;
  device: string;
  browser: string;
  browser_version: string;
  os: string;
  os_version: string;
  screen_resolution: string;
  viewport_size: string;
  language: string;
  cpu_cores?: number;
  ram_gb?: number;
  connection_type?: string;
  landing_path: string;
  current_path: string;
  pages_viewed: string[];
  pageviews_count: number;
  referrer: string;
  marketing?: MarketingAttribution;
  scroll_depth_max: number;
  duration_seconds: number;
  is_online: boolean;
  user_agent?: string;
}

export interface AnalyticsSummary {
  totalPageviews: number;
  uniqueVisitorsEstimate: number;
  uniqueVisitorsCount: number;
  liveVisitorsCount: number;
  avgScrollDepth: number;
  recentVisitors: VisitorSessionRecord[];
  topPages: { path: string; count: number }[];
  referrers: { source: string; count: number }[];
  countries: { country: string; count: number }[];
  cities: { city: string; country: string; count: number }[];
  browsers: { browser: string; count: number }[];
  operatingSystems: { os: string; count: number }[];
  devices: { device: string; count: number }[];
  screenResolutions: { resolution: string; count: number }[];
  marketingCampaigns: { campaign: string; source: string; medium: string; visitors: number }[];
  adClickSummary: { provider: string; count: number }[];
  ctaClicks: { cta_id: string; count: number }[];
  formSubmissionsCount: number;
}

export interface EmailSettings {
  notificationEmail: string;
  senderName: string;
  senderEmail: string;
  provider: "auto" | "resend" | "smtp" | "webhook";
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPass?: string;
  smtpSecure?: boolean;
  resendApiKey?: string;
  webhookUrl?: string;
  notifyOnNewLead: boolean;
}

export interface EmailNotificationResult {
  success: boolean;
  provider: string;
  messageId?: string;
  error?: string;
  timestamp: string;
}
