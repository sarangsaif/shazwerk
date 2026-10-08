"use client";

import { useEffect } from "react";

/**
 * Adds `.is-in` to every `[data-reveal]` element once it enters the viewport.
 * Works with server components: they only need the data attribute.
 */
export default function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const scan = () => {
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    };
    scan();

    let frame = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
