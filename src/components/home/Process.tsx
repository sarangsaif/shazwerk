"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PROCESS } from "@/lib/content";

/** Pinned section that scrolls the process cards horizontally on large screens. */
export default function Process() {
  const { language } = useLanguage();
  const isDe = language === "de";
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let raf = 0;

    const layout = () => {
      const o = outer.current;
      const t = track.current;
      if (!o || !t) return;
      if (!mq.matches) {
        o.style.height = "";
        t.style.transform = "";
        return;
      }
      const distance = t.scrollWidth - window.innerWidth;
      o.style.height = `${window.innerHeight + Math.max(0, distance)}px`;
      update();
    };
    const update = () => {
      const o = outer.current;
      const t = track.current;
      if (!o || !t || !mq.matches) return;
      const distance = t.scrollWidth - window.innerWidth;
      const r = o.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, distance)));
      t.style.transform = `translate3d(${-p * distance}px, 0, 0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    layout();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    mq.addEventListener("change", layout);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      mq.removeEventListener("change", layout);
    };
  }, []);

  return (
    <section ref={outer} className="relative bg-paper-deep" aria-labelledby="process-title">
      <div className="overflow-hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center">
        <div ref={track} className="flex flex-col gap-6 px-[var(--gutter)] py-28 will-change-transform lg:w-max lg:flex-row lg:items-stretch lg:py-0">
          <div className="flex flex-col justify-between lg:w-[38vw] lg:pr-16">
            <p className="eyebrow text-stone-muted">(04) {isDe ? "Vorgehen" : "Process"}</p>
            <h2 id="process-title" className="mt-6 font-display text-giant font-medium">
              {isDe ? "Vier Schritte." : "Four steps."}
              <br />
              <span className="font-serif font-normal italic text-stone-muted">{isDe ? "Null Blindflug." : "Zero guesswork."}</span>
            </h2>
            <p className="mt-6 max-w-sm text-stone-muted">
              {isDe
                ? "Festpreis pro Meilenstein, jeden Freitag eine Live-Version und ein Senior-Team, das von Anfang bis Ende dabei bleibt."
                : "Fixed price per milestone, a live version every Friday and a senior team that stays from start to finish."}
            </p>
          </div>
          {PROCESS.map((step) => (
            <article
              key={step.num}
              className="flex min-h-[340px] flex-col justify-between bg-paper p-8 lg:h-[64vh] lg:w-[30vw] lg:min-w-[360px]"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-[clamp(4rem,9vw,9rem)] font-medium leading-none tracking-[-0.06em] text-swiss-red">
                  {step.num}
                </span>
                <span className="eyebrow text-stone-muted">{isDe ? step.time.de : step.time.en}</span>
              </div>
              <div>
                <h3 className="font-display text-big font-medium">{isDe ? step.title.de : step.title.en}</h3>
                <p className="mt-3 max-w-xs text-stone-muted">{isDe ? step.text.de : step.text.en}</p>
              </div>
            </article>
          ))}
          <div className="hidden w-[10vw] lg:block" aria-hidden="true" />
        </div>
        <div className="absolute inset-x-[var(--gutter)] bottom-10 hidden h-px bg-ink/15 lg:block" aria-hidden="true">
          <div ref={bar} className="h-px origin-left scale-x-0 bg-ink" />
        </div>
      </div>
    </section>
  );
}
