"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Blend-mode cursor. Grows over links; shows a label over `[data-cursor]` elements.
 * Only active on fine pointers with motion allowed.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const isAdmin = usePathname()?.startsWith("/admin") ?? false;

  useEffect(() => {
    if (isAdmin) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = ref.current;
      if (!el) return;
      el.style.opacity = "1";
      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        el.dataset.state = "view";
        setLabel(labelled.dataset.cursor || "");
      } else if (target?.closest("a, button, summary, [role='button'], label")) {
        el.dataset.state = "link";
      } else {
        el.dataset.state = "";
      }
    };
    const leave = () => {
      if (ref.current) ref.current.style.opacity = "0";
    };
    const tick = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      if (ref.current) ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
      setEnabled(false);
    };
  }, [isAdmin]);

  if (!enabled) return null;
  return (
    <div ref={ref} className="cursor" style={{ opacity: 0 }} aria-hidden="true">
      <span className="cursor-label">{label}</span>
    </div>
  );
}
