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
  | "scroll";

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  event_type: AnalyticsEventType;
  path: string;
  referrer?: string;
  country?: string;
  device?: string;
  cta_id?: string;
  meta?: Record<string, string | number | boolean>;
}

export interface AnalyticsSummary {
  totalPageviews: number;
  uniqueVisitorsEstimate: number;
  topPages: { path: string; count: number }[];
  referrers: { source: string; count: number }[];
  countries: { country: string; count: number }[];
  ctaClicks: { cta_id: string; count: number }[];
  formSubmissionsCount: number;
}
