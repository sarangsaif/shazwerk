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

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]);

  return null;
}
