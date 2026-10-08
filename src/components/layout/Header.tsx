"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackClientEvent } from "@/lib/analytics-client";
import { useLanguage } from "@/context/LanguageContext";
import { getLenis } from "@/components/motion/SmoothScroll";
import ZurichClock from "@/components/ui/ZurichClock";
import { LANDING_PAGES } from "@/lib/landing";
import { SITE } from "@/lib/content";

const NAV = [
  { de: "Arbeiten", en: "Work", href: "/work" },
  { de: "Leistungen", en: "Services", href: "/services" },
  { de: "Studio", en: "Studio", href: "/about" },
  { de: "Kontakt", en: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const isDe = language === "de";
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (pathname?.startsWith("/admin")) return null;

  const switchLang = (lang: "de" | "en") => {
    setLanguage(lang);
    trackClientEvent("lang_switch", { lang });
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        {isDe ? "Zum Inhalt springen" : "Skip to content"}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[80] text-white mix-blend-difference transition-transform duration-700 ease-out-expo ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="wrap grid grid-cols-2 items-center py-5 lg:grid-cols-12">
          <Link
            href="/"
            aria-label="SHAZWERK – Startseite"
            onClick={() => trackClientEvent("nav_click", { destination: "home_logo" })}
            className="col-span-1 flex items-center gap-2 font-display text-lg font-semibold tracking-[-0.04em] lg:col-span-3"
          >
            <span>SHAZWERK</span>
            <span className="inline-block h-2 w-2 bg-white" aria-hidden="true" />
          </Link>

          <div className="eyebrow hidden items-center gap-3 lg:col-span-3 lg:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            <span>
              Zürich <ZurichClock />
            </span>
          </div>

          <nav aria-label={isDe ? "Hauptnavigation" : "Main navigation"} className="hidden lg:col-span-4 lg:block">
            <ul className="flex items-center gap-7 text-sm">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => trackClientEvent("nav_click", { destination: item.href })}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="roll"
                  >
                    <span>
                      <span>{isDe ? item.de : item.en}</span>
                      <span aria-hidden="true">{isDe ? item.de : item.en}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-1 flex items-center justify-end gap-5 lg:col-span-2">
            <div className="eyebrow flex items-center gap-1" role="group" aria-label="Sprache / Language">
              <button
                type="button"
                onClick={() => switchLang("de")}
                aria-pressed={isDe}
                className={isDe ? "opacity-100" : "opacity-50 hover:opacity-100"}
              >
                DE
              </button>
              <span className="opacity-50">/</span>
              <button
                type="button"
                onClick={() => switchLang("en")}
                aria-pressed={!isDe}
                className={!isDe ? "opacity-100" : "opacity-50 hover:opacity-100"}
              >
                EN
              </button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group flex items-center gap-3 text-sm"
            >
              <span className="hidden sm:inline">{open ? (isDe ? "Schliessen" : "Close") : isDe ? "Menü" : "Menu"}</span>
              <span className="relative block h-3 w-7" aria-hidden="true">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-white transition-transform duration-500 ease-out-expo ${
                    open ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full bg-white transition-transform duration-500 ease-out-expo ${
                    open ? "-translate-y-[5px] -rotate-45" : "group-hover:scale-x-75 origin-right"
                  }`}
                />
              </span>
              <span className="sr-only">{isDe ? "Menü umschalten" : "Toggle menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen menu */}
      <div
        id="site-menu"
        className={`fixed inset-0 z-[75] bg-ink text-paper transition-[clip-path] duration-[900ms] ease-in-out-quart ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
        // @ts-expect-error -- inert is valid HTML, React 18 types lag behind
        inert={!open ? "" : undefined}
      >
        <div className="wrap flex h-full flex-col justify-between pb-8 pt-28">
          <nav aria-label={isDe ? "Menü" : "Menu"}>
            <ul>
              {[{ de: "Start", en: "Home", href: "/" }, ...NAV].map((item, i) => (
                <li key={item.href} className="overflow-hidden border-b border-paper/15">
                  <Link
                    href={item.href}
                    className={`group flex items-baseline justify-between py-2 font-display text-[clamp(2.75rem,8vw,7.5rem)] font-medium leading-[1] tracking-[-0.05em] transition-transform duration-700 ease-out-expo ${
                      open ? "translate-y-0" : "translate-y-full"
                    }`}
                    style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}
                  >
                    <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-4 group-hover:text-swiss-red">
                      {isDe ? item.de : item.en}
                    </span>
                    <span className="eyebrow text-paper/50">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-8 pt-10 text-sm text-paper/70 md:grid-cols-3">
            <div>
              <p className="eyebrow mb-3 text-paper/40">{isDe ? "Schwerpunkte" : "Focus"}</p>
              <ul className="space-y-1">
                {LANDING_PAGES.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/${p.slug}`} className="link-line hover:text-paper">
                      {p.eyebrow.replace(" · ", " ")}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-3 text-paper/40">Studio</p>
              <p>
                {SITE.street}
                <br />
                {SITE.zip} {SITE.city}
              </p>
            </div>
            <div className="md:text-right">
              <p className="eyebrow mb-3 text-paper/40">{isDe ? "Neues Projekt" : "New project"}</p>
              <a href={`mailto:${SITE.email}`} className="link-line font-display text-2xl text-paper">
                {SITE.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
