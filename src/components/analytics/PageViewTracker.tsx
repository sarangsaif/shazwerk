"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackClientEvent } from "@/lib/analytics-client";

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track if not in admin portal to avoid skewing user metrics
    if (pathname && !pathname.startsWith("/admin")) {
      trackClientEvent("pageview", { path: pathname });
    }
  }, [pathname]);

  return null;
}
