"use client";

import { useEffect, useRef } from "react";

/**
 * Swisstopo-style contour lines drawn with marching squares over drifting value noise.
 * The pointer raises a "peak" that the lines flow around. Static on reduced motion.
 */

// Small deterministic value noise
function makeNoise(seed = 7) {
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256).map((_, i) => i);
  let s = seed;
  for (let i = 255; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const grad = (h: number, x: number, y: number) => ((h & 1 ? -x : x) + (h & 2 ? -y : y));
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  return (x: number, y: number) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = fade(x);
    const v = fade(y);
    const a = perm[X] + Y;
    const b = perm[X + 1] + Y;
    return lerp(
      lerp(grad(perm[a], x, y), grad(perm[b], x - 1, y), u),
      lerp(grad(perm[a + 1], x, y - 1), grad(perm[b + 1], x - 1, y - 1), u),
      v
    );
  };
}

export default function HeroContours() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const noise = makeNoise(11);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const CELL = fine ? 14 : 22;
    const LEVELS = 11;

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let field = new Float32Array(0);
    let raf = 0;
    let visible = true;
    let t = Math.random() * 100;
    const pointer = { x: -9999, y: -9999, px: -9999, py: -9999, strength: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL) + 1;
      rows = Math.ceil(h / CELL) + 1;
      field = new Float32Array(cols * rows);
    };

    const draw = () => {
      pointer.px += (pointer.x - pointer.px) * 0.08;
      pointer.py += (pointer.y - pointer.py) * 0.08;
      const R = Math.max(w, h) * 0.18;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * CELL;
          const y = j * CELL;
          let v = noise(x * 0.0026 + t * 0.05, y * 0.0032 - t * 0.03) + 0.5 * noise(x * 0.006 - t * 0.02, y * 0.006 + 40);
          const dx = x - pointer.px;
          const dy = y - pointer.py;
          v += pointer.strength * 0.9 * Math.exp(-(dx * dx + dy * dy) / (R * R));
          field[j * cols + i] = v;
        }
      }

      ctx.clearRect(0, 0, w, h);
      for (let l = 0; l < LEVELS; l++) {
        const iso = -0.75 + (l / (LEVELS - 1)) * 1.6;
        const major = l % 5 === 0;
        ctx.beginPath();
        ctx.lineWidth = major ? 1.1 : 0.6;
        ctx.strokeStyle = major ? "rgba(13,13,13,0.16)" : "rgba(13,13,13,0.09)";
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const a = field[j * cols + i];
            const b = field[j * cols + i + 1];
            const c = field[(j + 1) * cols + i + 1];
            const d = field[(j + 1) * cols + i];
            const idx = (a > iso ? 8 : 0) | (b > iso ? 4 : 0) | (c > iso ? 2 : 0) | (d > iso ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            const x = i * CELL;
            const y = j * CELL;
            const top = () => [x + CELL * ((iso - a) / (b - a)), y] as const;
            const right = () => [x + CELL, y + CELL * ((iso - b) / (c - b))] as const;
            const bottom = () => [x + CELL * ((iso - d) / (c - d)), y + CELL] as const;
            const left = () => [x, y + CELL * ((iso - a) / (d - a))] as const;
            const seg = (p: readonly [number, number], q: readonly [number, number]) => {
              ctx.moveTo(p[0], p[1]);
              ctx.lineTo(q[0], q[1]);
            };
            switch (idx) {
              case 1: case 14: seg(left(), bottom()); break;
              case 2: case 13: seg(bottom(), right()); break;
              case 3: case 12: seg(left(), right()); break;
              case 4: case 11: seg(top(), right()); break;
              case 5: seg(left(), top()); seg(bottom(), right()); break;
              case 6: case 9: seg(top(), bottom()); break;
              case 7: case 8: seg(left(), top()); break;
              case 10: seg(left(), bottom()); seg(top(), right()); break;
            }
          }
        }
        ctx.stroke();
      }
    };

    let last = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      // ~30fps is plenty for slow drift
      if (now - last < 33) return;
      last = now;
      t += 0.016;
      pointer.strength += ((pointer.x > -999 ? 1 : 0) - pointer.strength) * 0.05;
      draw();
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      if (pointer.px < -999) {
        pointer.px = pointer.x;
        pointer.py = pointer.y;
      }
    };
    const onLeave = () => {
      pointer.x = -9999;
    };

    resize();
    draw();
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener("resize", onResize);
    // Animate on desktop only; phones get a single static map
    if (!reduced && fine) {
      raf = requestAnimationFrame(loop);
      canvas.parentElement?.addEventListener("pointermove", onMove);
      canvas.parentElement?.addEventListener("pointerleave", onLeave);
    }
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      canvas.parentElement?.removeEventListener("pointermove", onMove);
      canvas.parentElement?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}
