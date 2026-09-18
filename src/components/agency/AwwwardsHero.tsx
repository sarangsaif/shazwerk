"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

export default function AwwwardsHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetX = mouseX;
    let targetY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let t = 0;

    const render = () => {
      t += 0.008;
      // Smooth lerp mouse
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Subtle luminous ambient gradient glow centered near mouse
      const grad = ctx.createRadialGradient(
        mouseX,
        mouseY,
        10,
        mouseX,
        mouseY,
        Math.max(width, height) * 0.55
      );
      grad.addColorStop(0, "rgba(227, 6, 19, 0.05)"); // faint Swiss red ambient
      grad.addColorStop(0.4, "rgba(30, 35, 45, 0.12)");
      grad.addColorStop(1, "rgba(8, 8, 8, 0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Elegant organic harmonic sine waves
      ctx.lineWidth = 1;
      const lineCount = 4;
      for (let i = 0; i < lineCount; i++) {
        ctx.beginPath();
        const lineOffset = i * 60;
        const opacity = 0.04 + i * 0.025;
        ctx.strokeStyle = `rgba(245, 245, 243, ${opacity})`;

        for (let x = 0; x < width; x += 30) {
          const wave1 = Math.sin(x * 0.002 + t + i * 0.5) * 45;
          const wave2 = Math.cos(x * 0.004 - t * 0.8) * 25;
          const distFromMouse = Math.abs(x - mouseX);
          const mouseLift = Math.max(0, (400 - distFromMouse) / 400) * (mouseY * 0.08);
          const y = height * 0.65 + wave1 + wave2 - lineOffset - mouseLift;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-36 pb-16 px-4 sm:px-8 overflow-hidden">
      {/* Ambient Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-[0.2em] text-[#A0A5B0] uppercase mb-8 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E30613] animate-pulse"></span>
          <span>SWITZERLAND // DIGITAL PRODUCTS · SOFTWARE · AI</span>
        </div>

        {/* Monumental Headline */}
        <h1 className="font-sans font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-[-0.045em] text-[#F5F5F3] leading-[0.98] max-w-5xl mb-8">
          Technology built around the way your business actually works.
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-[#8E94A0] max-w-2xl leading-relaxed font-normal mb-12">
          SHAZWERK designs and builds digital products, software and AI-powered systems for companies that want to move from idea to working product — with Swiss precision.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            onClick={() => trackClientEvent("cta_click", { cta_id: "hero_start_project" })}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#F5F5F3] hover:bg-white text-[#080808] text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            <span>Start a project</span>
            <ArrowUpRight className="w-4 h-4 text-[#E30613] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-transparent hover:bg-white/5 border border-white/10 text-[#F5F5F3] text-xs font-mono uppercase tracking-wider transition-colors"
          >
            <span>Selected Work</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#7E8494]" />
          </Link>
        </div>
      </div>

      {/* Bottom Subtle Coordinates & Focus Bar */}
      <div className="max-w-7xl mx-auto w-full relative z-10 pt-12 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-[#7E8494] gap-4">
        <div className="flex items-center gap-4">
          <span>PRECISION OVER NOISE</span>
          <span className="text-white/20">/</span>
          <span>ARCHITECTURE OVER TEMPLATES</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
          <span className="text-[#D1D5DB]">Q3/Q4 Studio Availability: Confirmed</span>
        </div>
      </div>
    </section>
  );
}
