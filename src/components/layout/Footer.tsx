"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";
import { useLanguage } from "@/context/LanguageContext";
import { LANDING_PAGES } from "@/lib/landing";
import { SITE } from "@/lib/content";
import ZurichClock from "@/components/ui/ZurichClock";
import Magnetic from "@/components/motion/Magnetic";

export default function Footer() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const isDe = language === "de";
  const [copied, setCopied] = useState(false);

  if (pathname?.startsWith("/admin")) return null;

  const copyEmail = () => {
    navigator.clipboard?.writeText(SITE.email);
    setCopied(true);
    trackClientEvent("copy_email", { source: "footer" });
    setTimeout(() => setCopied(false), 2200);
  };

  const showCta = pathname !== "/contact";

  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      {showCta && (
        <section className="wrap border-b border-paper/15 pb-20 pt-28 sm:pt-40" aria-labelledby="footer-cta">
          <p className="eyebrow mb-8 text-paper/60">{isDe ? "Neues Projekt" : "New project"}</p>
          <h2 id="footer-cta" className="font-display text-giant font-medium" data-reveal="up">
            {isDe ? "Haben Sie ein Vorhaben?" : "Got something in mind?"}
            <br />
            <span className="font-serif font-normal italic text-paper/60">
              {isDe ? "Lassen Sie uns reden." : "Let’s talk."}
            </span>
          </h2>
          <div className="mt-14 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <button
              type="button"
              onClick={copyEmail}
              className="group text-left font-display text-big tracking-[-0.03em]"
            >
              <span className="link-line">{SITE.email}</span>
              <span className="eyebrow mt-2 block text-paper/60">
                {copied ? (isDe ? "✓ Kopiert" : "✓ Copied") : isDe ? "Klicken zum Kopieren" : "Click to copy"}
              </span>
            </button>
            <Magnetic>
              <Link
                href="/contact"
                onClick={() => trackClientEvent("cta_click", { location: "footer_button" })}
                className="relative flex h-36 w-36 items-center justify-center rounded-full bg-swiss-red text-center text-sm font-medium text-white transition-transform duration-500 ease-out-expo hover:scale-105 sm:h-44 sm:w-44"
              >
                <span>
                  {isDe ? "Projekt starten" : "Start a project"}
                  <ArrowUpRight className="mx-auto mt-1 h-5 w-5" aria-hidden="true" />
                </span>
              </Link>
            </Magnetic>
          </div>
        </section>
      )}

      <div className="wrap grid grid-cols-2 gap-10 py-16 text-sm md:grid-cols-4">
        <div>
          <p className="eyebrow mb-4 text-paper/60">Studio</p>
          <address className="not-italic leading-relaxed text-paper/80">
            {SITE.legalName}
            <br />
            {SITE.street}
            <br />
            {SITE.zip} {SITE.city}, {isDe ? "Schweiz" : "Switzerland"}
            <br />
            <a href={`tel:${SITE.phoneE164}`} className="link-line">
              {SITE.phone}
            </a>
          </address>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow mb-4 text-paper/60">{isDe ? "Navigation" : "Navigate"}</p>
          <ul className="space-y-1.5 text-paper/80">
            <li><Link href="/work" className="link-line">{isDe ? "Arbeiten" : "Work"}</Link></li>
            <li><Link href="/services" className="link-line">{isDe ? "Leistungen" : "Services"}</Link></li>
            <li><Link href="/about" className="link-line">Studio</Link></li>
            <li><Link href="/contact" className="link-line">{isDe ? "Kontakt" : "Contact"}</Link></li>
          </ul>
        </nav>
        <nav aria-label={isDe ? "Schwerpunkte" : "Focus areas"}>
          <p className="eyebrow mb-4 text-paper/60">{isDe ? "Schwerpunkte" : "Focus"}</p>
          <ul className="space-y-1.5 text-paper/80">
            {LANDING_PAGES.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className="link-line">
                  {p.eyebrow.replace(" · ", " ")}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow mb-4 text-paper/60">{isDe ? "Ortszeit" : "Local time"}</p>
          <p className="font-display text-3xl tracking-[-0.03em]">
            <ZurichClock />
          </p>
          <p className="mt-1 text-paper/60">Zürich, CET</p>
        </div>
      </div>

      {/* Giant wordmark, stretched to the exact column width */}
      <div className="wrap select-none pb-4" aria-hidden="true" data-reveal="up">
        <svg viewBox="0 0 1000 152" className="block h-auto w-full">
          <text
            x="0"
            y="146"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fill="currentColor"
            style={{ fontFamily: "var(--font-display)", fontSize: 200, fontWeight: 600, letterSpacing: "-0.06em" }}
          >
            SHAZWERK
          </text>
        </svg>
      </div>

      <div className="wrap flex flex-col gap-4 border-t border-paper/15 py-6 text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {SITE.legalName} · UID {SITE.uid} ·{" "}
          {isDe ? "Webagentur & Software Studio Zürich" : "Web agency & software studio Zurich"}
        </p>
        <ul className="flex flex-wrap items-center gap-5">
          <li><Link href="/privacy" className="link-line hover:text-paper">{isDe ? "Datenschutz" : "Privacy"}</Link></li>
          <li><Link href="/imprint" className="link-line hover:text-paper">Impressum</Link></li>
          <li><a href="/feed.xml" className="link-line hover:text-paper">RSS</a></li>
          <li><Link href="/admin/login" rel="nofollow" className="text-paper/60 hover:text-paper">Staff</Link></li>
        </ul>
      </div>
    </footer>
  );
}
