import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import T from "@/components/i18n/T";
import SwissCross from "@/components/ui/SwissCross";
import Magnetic from "@/components/motion/Magnetic";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-8 pt-32" aria-labelledby="hero-title">
      {/* 12-column Swiss grid */}
      <div className="wrap pointer-events-none absolute inset-0 grid grid-cols-4 lg:grid-cols-12" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={`border-l hairline ${i >= 4 ? "hidden lg:block" : ""} ${i === 11 || i === 3 ? "border-r" : ""}`} />
        ))}
      </div>

      <div className="wrap relative">
        <h1 id="hero-title">
          <span className="eyebrow intro-fade mb-6 flex items-center gap-3 text-stone-muted" style={{ ["--d" as string]: "200ms" }}>
            <SwissCross className="h-3 w-3 text-swiss-red" />
            <T de="Webagentur & Software-Studio in Zürich" en="Web agency & software studio in Zurich" />
          </span>
          <span className="block font-display text-mega font-medium">
            <span className="mask intro-line" style={{ ["--i" as string]: 0 }}>
              <span>
                <T de="Digitale" en="Digital" />
              </span>
            </span>
            <span className="mask intro-line" style={{ ["--i" as string]: 1 }}>
              <span className="flex items-baseline gap-[0.18em] lg:pl-[16.66%]">
                <T de="Präzision" en="precision" />
                <span className="ml-[0.12em] font-serif text-[0.62em] font-normal italic tracking-[-0.02em] text-stone-muted">
                  <T de="aus" en="from" />
                </span>
              </span>
            </span>
            <span className="mask intro-line" style={{ ["--i" as string]: 2 }}>
              <span className="flex items-center gap-[0.12em]">
                Zürich
                <span className="inline-block h-[0.62em] w-[0.62em] translate-y-[0.04em] bg-swiss-red" aria-hidden="true">
                  <SwissCross className="h-full w-full text-swiss-red" />
                </span>
              </span>
            </span>
          </span>
        </h1>

        <div className="intro-fade mt-12 grid grid-cols-1 gap-8 border-t hairline pt-6 lg:grid-cols-12" style={{ ["--d" as string]: "900ms" }}>
          <p className="max-w-md text-lg leading-snug lg:col-span-5">
            <T
              de="Wir gestalten und entwickeln Websites, Software, Apps und KI für Schweizer Unternehmen, die keine Kompromisse machen. Präzise geplant, schnell geliefert, in der Schweiz gehostet."
              en="We design and build websites, software, apps and AI for Swiss companies that refuse to compromise. Precisely planned, delivered fast, hosted in Switzerland."
            />
          </p>
          <div className="flex flex-wrap items-center gap-4 lg:col-span-4 lg:col-start-7">
            <Magnetic strength={0.25}>
              <Link href="/contact" className="btn btn-ink">
                <span className="roll">
                  <span>
                    <span><T de="Projekt starten" en="Start a project" /></span>
                    <span aria-hidden="true"><T de="Projekt starten" en="Start a project" /></span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Magnetic>
            <Link href="/work" className="link-line text-sm">
              <T de="Arbeiten ansehen" en="See our work" />
            </Link>
          </div>
          <a href="#manifest" className="eyebrow hidden items-center justify-end gap-2 self-end text-stone-muted lg:col-span-2 lg:col-start-11 lg:flex">
            Scroll <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Rotating badge */}
      <div className="intro-fade absolute right-[var(--gutter)] top-28 hidden md:block" style={{ ["--d" as string]: "1100ms" }} aria-hidden="true">
        <div className="relative h-32 w-32">
          <svg viewBox="0 0 100 100" className="spin-slow h-full w-full">
            <defs>
              <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
            </defs>
            <text fontSize="9.2" letterSpacing="2.6" fontFamily="var(--font-mono)" fill="currentColor">
              <textPath href="#badge-circle">SWISS MADE · DIGITAL CRAFT · ZÜRICH · </textPath>
            </text>
          </svg>
          <SwissCross className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-swiss-red" />
        </div>
      </div>
    </section>
  );
}
