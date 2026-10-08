"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: { offset: -80 },
      autoRaf: true,
    });
    lenisInstance = lenis;

    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    lenisInstance?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
