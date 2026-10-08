"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackClientEvent, resetPageMetrics } from "@/lib/analytics-client";

export default function PageViewTracker() {
  const pathname = usePathname();
  const currentPathRef = useRef(pathname);

  useEffect(() => {
    currentPathRef.current = pathname;

    // Only track if not in admin portal to avoid skewing user metrics
    if (pathname && !pathname.startsWith("/admin")) {
      resetPageMetrics();
      trackClientEvent("pageview", { path: pathname });
    }

    // Flush scroll depth and active duration when leaving page or switching tabs
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && currentPathRef.current && !currentPathRef.current.startsWith("/admin")) {
        trackClientEvent("scroll", { path: currentPathRef.current });
      }
    };

    const handleBeforeUnload = () => {
      if (currentPathRef.current && !currentPathRef.current.startsWith("/admin")) {
        trackClientEvent("scroll", { path: currentPathRef.current });
      }
    };

    // Record every click on an interactive element (links, buttons, form controls)
    const handleClick = (e: MouseEvent) => {
      const path = currentPathRef.current;
      if (!path || path.startsWith("/admin")) return;
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, summary, label, input, select, textarea, [role='button'], [data-track]"
      );
      if (!el) return;
      const label = (
        el.dataset.track ||
        el.getAttribute("aria-label") ||
        el.innerText ||
        el.getAttribute("placeholder") ||
        el.getAttribute("name") ||
        el.tagName
      )
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 80);
      const href = el instanceof HTMLAnchorElement ? el.getAttribute("href") || "" : "";
      trackClientEvent("click", {
        path,
        meta: {
          label,
          href: href.slice(0, 200),
          tag: el.tagName.toLowerCase(),
          x: Math.round((e.clientX / window.innerWidth) * 100),
          y: Math.round(((e.clientY + window.scrollY) / document.documentElement.scrollHeight) * 100),
        },
      });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleClick, true);
    };
  }, [pathname]);

  return null;
}
