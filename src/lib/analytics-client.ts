"use client";

export function trackClientEvent(
  eventType: "pageview" | "cta_click" | "form_start" | "form_submit" | "scroll",
  payload: {
    path?: string;
    cta_id?: string;
    meta?: Record<string, string | number | boolean>;
  } = {}
) {
  if (typeof window === "undefined") return;

  const path = payload.path || window.location.pathname;
  const referrer = document.referrer ? document.referrer : "direct";
  const device = window.innerWidth < 768 ? "Mobile" : window.innerWidth < 1024 ? "Tablet" : "Desktop";

  const body = {
    event_type: eventType,
    path,
    referrer,
    device,
    cta_id: payload.cta_id,
    meta: payload.meta,
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
