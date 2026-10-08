"use client";

import { useEffect, useRef } from "react";

/**
 * Swiss railway clock (after Hans Hilfiker's 1944 design): the red second hand
 * sweeps a full turn in 58.5 s, then pauses at twelve until the minute hand jumps.
 */
export default function SbbClock({ className = "" }: { className?: string }) {
  const hour = useRef<SVGGElement>(null);
  const minute = useRef<SVGGElement>(null);
  const second = useRef<SVGGElement>(null);

  useEffect(() => {
    let raf = 0;
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Zurich",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });
    const tick = () => {
      const now = new Date();
      const [h, m, s] = fmt.format(now).split(":").map(Number);
      const secs = s + now.getMilliseconds() / 1000;
      const secAngle = Math.min(360, (secs / 58.5) * 360);
      hour.current?.setAttribute("transform", `rotate(${(h % 12) * 30 + m * 0.5} 50 50)`);
      minute.current?.setAttribute("transform", `rotate(${m * 6} 50 50)`);
      second.current?.setAttribute("transform", `rotate(${secAngle} 50 50)`);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Bahnhofsuhr, Schweizer Zeit">
      <circle cx="50" cy="50" r="49" fill="#F1EFEA" />
      {Array.from({ length: 60 }).map((_, i) => (
        <rect
          key={i}
          x={i % 5 === 0 ? 48.6 : 49.4}
          y={i % 5 === 0 ? 4 : 4}
          width={i % 5 === 0 ? 2.8 : 1.2}
          height={i % 5 === 0 ? 10 : 3.5}
          fill="#0D0D0D"
          transform={`rotate(${i * 6} 50 50)`}
        />
      ))}
      <g ref={hour}>
        <rect x="47.2" y="22" width="5.6" height="36" fill="#0D0D0D" />
      </g>
      <g ref={minute}>
        <rect x="47.9" y="8" width="4.2" height="50" fill="#0D0D0D" />
      </g>
      <g ref={second}>
        <rect x="49.4" y="16" width="1.2" height="47" fill="#E30613" />
        <circle cx="50" cy="16" r="5.2" fill="#E30613" />
      </g>
      <circle cx="50" cy="50" r="1.2" fill="#0D0D0D" />
    </svg>
  );
}
