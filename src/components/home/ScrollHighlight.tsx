"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

/** Paragraph whose words fill in as the reader scrolls through it. */
export default function ScrollHighlight({ de, en, className = "" }: { de: string; en: string; className?: string }) {
  const { language } = useLanguage();
  const text = language === "en" ? en : de;
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-w]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => (w.style.color = ""));
      return;
    }
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const lit = progress * words.length;
      words.forEach((w, i) => {
        // 0 → dim grey (#86847E, 3.2:1 on paper), 1 → ink
        const t = Math.min(1, Math.max(0, lit - i));
        const c = Math.round(134 - t * (134 - 13));
        w.style.color = `rgb(${c}, ${Math.round(132 - t * 119)}, ${Math.round(126 - t * 113)})`;
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [text]);

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={`${language}-${i}`} data-w className="transition-colors duration-300">
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
