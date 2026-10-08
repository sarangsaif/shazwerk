"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PROJECTS } from "@/lib/content";
import ProjectPoster from "@/components/ui/ProjectPoster";
import { trackClientEvent } from "@/lib/analytics-client";

/** Index-style project list with a floating poster that follows the pointer. */
export default function WorkIndex() {
  const { language } = useLanguage();
  const isDe = language === "de";
  const [active, setActive] = useState<number | null>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, cx: 0, cy: 0 });

  const raf = useRef(0);

  const tick = () => {
    const p = pos.current;
    p.cx += (p.x - p.cx) * 0.12;
    p.cy += (p.y - p.cy) * 0.12;
    const rot = Math.max(-8, Math.min(8, (p.x - p.cx) * 0.04));
    if (floatRef.current) {
      floatRef.current.style.transform = `translate3d(${p.cx}px, ${p.cy}px, 0) translate(-50%, -50%) rotate(${rot}deg)`;
    }
    raf.current = Math.abs(p.x - p.cx) + Math.abs(p.y - p.cy) > 0.5 ? requestAnimationFrame(tick) : 0;
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    pos.current.x = e.clientX;
    pos.current.y = e.clientY;
    if (!raf.current) raf.current = requestAnimationFrame(tick);
  };

  return (
    <div onPointerMove={onMove} onPointerLeave={() => setActive(null)} className="relative">
      <ul className="border-t border-paper/15">
        {PROJECTS.map((p, i) => (
          <li key={p.slug} className="border-b border-paper/15">
            <Link
              href={`/work/${p.slug}`}
              data-cursor={isDe ? "Ansehen" : "View"}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              onClick={() => trackClientEvent("nav_click", { destination: `/work/${p.slug}` })}
              className="group grid grid-cols-12 items-center gap-4 py-6 sm:py-9"
            >
              <span className="eyebrow col-span-2 text-paper/60 sm:col-span-1">{p.num}</span>
              <span className="col-span-10 sm:col-span-6">
                <span
                  className={`block font-display text-big font-medium transition-all duration-700 ease-out-expo group-hover:translate-x-3 ${
                    active !== null && active !== i ? "opacity-30" : ""
                  }`}
                >
                  {p.client}
                </span>
                <span className="mt-1 block text-sm text-paper/60">{isDe ? p.title.de : p.title.en}</span>
              </span>
              <span className="col-span-6 col-start-3 text-sm text-paper/60 sm:col-span-3 sm:col-start-auto">
                {isDe ? p.sector.de : p.sector.en} · {p.location}
              </span>
              <span className="col-span-4 flex items-center justify-end gap-3 text-sm text-paper/60 sm:col-span-2">
                {p.year}
                <ArrowUpRight
                  className="h-5 w-5 transition-transform duration-500 ease-out-expo group-hover:rotate-45 group-hover:text-swiss-red"
                  aria-hidden="true"
                />
              </span>
              <span className="col-span-12 mt-2 block overflow-hidden rounded-sm sm:hidden">
                <ProjectPoster project={p} className="aspect-[4/3] h-auto w-full" label={false} />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Floating preview (desktop) */}
      <div
        ref={floatRef}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[22vw] max-w-[340px] sm:block"
        aria-hidden="true"
      >
        <div
          className={`aspect-[4/5] overflow-hidden transition-[clip-path,opacity] duration-700 ease-out-expo ${
            active !== null ? "opacity-100 [clip-path:inset(0_0_0_0)]" : "opacity-0 [clip-path:inset(50%_0_50%_0)]"
          }`}
        >
          <div
            className="flex flex-col transition-transform duration-700 ease-out-expo"
            style={{ transform: `translateY(-${((active ?? 0) * 100) / PROJECTS.length}%)` }}
          >
            {PROJECTS.map((p) => (
              <ProjectPoster key={p.slug} project={p} className="aspect-[4/5] h-auto w-full shrink-0" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
