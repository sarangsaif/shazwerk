"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Layers, Cpu, Database, Network, ShieldCheck } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

export default function BlueprintHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    window.addEventListener("resize", handleResize);

    // Architectural System Blueprint Nodes
    const nodes = [
      { id: 0, label: "01. INGRESS / ROUTE", x: 0.18, y: 0.28, type: "gateway", latency: "1.2ms" },
      { id: 1, label: "02. INFERENCE BUS", x: 0.48, y: 0.22, type: "compute", latency: "14ms" },
      { id: 2, label: "03. STATE MACHINE", x: 0.82, y: 0.32, type: "logic", latency: "3.4ms" },
      { id: 3, label: "04. WORKFLOW ENGINE", x: 0.32, y: 0.68, type: "orchestration", latency: "8.1ms" },
      { id: 4, label: "05. RELATIONAL STORE", x: 0.68, y: 0.72, type: "data", latency: "2.8ms" },
    ];

    const connections = [
      [0, 1],
      [1, 2],
      [0, 3],
      [3, 4],
      [1, 4],
      [2, 4],
    ];

    let t = 0;

    const render = () => {
      t += 0.015;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      // Draw subtle architectural hairline grid
      ctx.strokeStyle = "rgba(17, 20, 24, 0.04)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw Connection lines with animated data pulses
      connections.forEach(([i, j], connIndex) => {
        const n1 = nodes[i];
        const n2 = nodes[j];
        const x1 = n1.x * w;
        const y1 = n1.y * h;
        const x2 = n2.x * w;
        const y2 = n2.y * h;

        ctx.strokeStyle = "rgba(17, 20, 24, 0.12)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated data packet dot along connection
        const progress = (t * 0.35 + connIndex * 0.25) % 1;
        const px = x1 + (x2 - x1) * progress;
        const py = y1 + (y2 - y1) * progress;

        ctx.fillStyle = connIndex % 2 === 0 ? "#E30613" : "#0C0E11";
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Nodes
      nodes.forEach((node) => {
        const nx = node.x * w;
        const ny = node.y * h;

        // Subtle oscillation
        const oscX = Math.sin(t + node.id) * 3;
        const oscY = Math.cos(t * 0.8 + node.id) * 3;
        const finalX = nx + oscX;
        const finalY = ny + oscY;

        // Node Box (Swiss minimalist blueprint block)
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = activeNode === node.id ? "#E30613" : "#D1D5DB";
        ctx.lineWidth = activeNode === node.id ? 1.5 : 1;

        const boxW = 140;
        const boxH = 46;
        ctx.fillRect(finalX - boxW / 2, finalY - boxH / 2, boxW, boxH);
        ctx.strokeRect(finalX - boxW / 2, finalY - boxH / 2, boxW, boxH);

        // Active indicator pip
        ctx.fillStyle = activeNode === node.id ? "#E30613" : "#10B981";
        ctx.beginPath();
        ctx.arc(finalX - boxW / 2 + 12, finalY - 8, 3, 0, Math.PI * 2);
        ctx.fill();

        // Node Label
        ctx.fillStyle = "#0C0E11";
        ctx.font = "600 10px monospace";
        ctx.fillText(node.label, finalX - boxW / 2 + 22, finalY - 5);

        // Subtext / Latency
        ctx.fillStyle = "#6B7280";
        ctx.font = "400 9px monospace";
        ctx.fillText(`SYS LATENCY: ${node.latency}`, finalX - boxW / 2 + 22, finalY + 12);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeNode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <section className="relative overflow-hidden border-b border-[#E5E5E0] bg-[#FAFAF8] pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Micro Grid */}
      <div className="absolute inset-0 grid-bg-hairline pointer-events-none opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Swiss Brand Positioning */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EFEFEA] border border-[#E0E0DA] text-[11px] font-mono uppercase tracking-[0.16em] text-[#4B5563] w-fit mb-6">
              <span className="w-1.5 h-1.5 bg-[#E30613] rounded-full"></span>
              <span>SWITZERLAND · DIGITAL PRODUCTS · SOFTWARE · AI</span>
            </div>

            {/* Large Headline */}
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-[#0C0E11] leading-[1.06] mb-6">
              Technology built around the way your business actually works.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-xl mb-8 font-normal">
              SHAZWERK designs and builds digital products, software and AI-powered systems for companies that want to move from idea to working product — engineered with Swiss precision.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <Link
                href="/contact"
                onClick={() => trackClientEvent("cta_click", { cta_id: "hero_primary_start" })}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#0C0E11] hover:bg-[#1F242D] text-[#FAFAF8] text-sm font-semibold tracking-wide transition-all shadow-[0_2px_4px_rgba(0,0,0,0.06)] active:scale-[0.98]"
              >
                <span>Start a project</span>
                <ArrowUpRight className="w-4 h-4 text-[#E30613]" />
              </Link>

              <Link
                href="/work"
                onClick={() => trackClientEvent("cta_click", { cta_id: "hero_secondary_work" })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent hover:bg-[#EFEFEA] text-[#0C0E11] border border-[#D5D5CF] text-sm font-semibold tracking-wide transition-colors"
              >
                <span>See our work</span>
                <ArrowRight className="w-4 h-4 text-[#4B5563]" />
              </Link>
            </div>

            {/* Engineering Metrics Indicator Bar */}
            <div className="pt-6 border-t border-[#E5E5E0] grid grid-cols-3 gap-4 font-mono text-[11px] text-[#4B5563]">
              <div>
                <span className="block text-[#9CA3AF] text-[10px] uppercase tracking-wider">METHODOLOGY</span>
                <span className="font-semibold text-[#0C0E11]">Swiss Precision</span>
              </div>
              <div>
                <span className="block text-[#9CA3AF] text-[10px] uppercase tracking-wider">EXECUTION</span>
                <span className="font-semibold text-[#0C0E11]">Senior-Led Squads</span>
              </div>
              <div>
                <span className="block text-[#9CA3AF] text-[10px] uppercase tracking-wider">CORE FOCUS</span>
                <span className="font-semibold text-[#0C0E11]">Production Reality</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Digital Engineering Blueprint */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="lg:col-span-6 relative bg-[#FFFFFF] border border-[#E0E0DA] shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-4 sm:p-6"
          >
            {/* Blueprint Header HUD */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EAEAE5] text-[11px] font-mono text-[#6B7280]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E30613]"></span>
                <span className="font-bold text-[#0C0E11]">ARCHITECTURAL BLUEPRINT</span>
                <span className="text-[#D1D5DB]">/</span>
                <span>SYS-TOPOLOGY v4.2</span>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <span>STATE: ACTIVE</span>
                <span>CH-ZURICH</span>
              </div>
            </div>

            {/* Interactive Canvas Canvas */}
            <div className="relative w-full h-[360px] sm:h-[420px] bg-[#FDFDFD] overflow-hidden border border-[#ECECE6]">
              <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />

              {/* Floating Architectural Overlay Fragments */}
              <div className="absolute top-3 left-3 bg-[#FFFFFF]/90 backdrop-blur-sm border border-[#E5E5E0] p-2.5 shadow-sm text-[10px] font-mono pointer-events-none">
                <div className="text-[#9CA3AF] text-[9px]">ACTIVE PROTOCOL</div>
                <div className="text-[#0C0E11] font-semibold">EVENT-DRIVEN ARCHITECTURE</div>
                <div className="text-[#6B7280] mt-0.5">ISOLATION: ZERO-TRUST</div>
              </div>

              <div className="absolute bottom-3 right-3 bg-[#FFFFFF]/90 backdrop-blur-sm border border-[#E5E5E0] p-2.5 shadow-sm text-[10px] font-mono pointer-events-none">
                <div className="text-[#9CA3AF] text-[9px]">LOCAL COORDINATES</div>
                <div className="text-[#0C0E11] font-semibold">
                  X: {mousePos.x}px · Y: {mousePos.y}px
                </div>
                <div className="text-[#10B981] mt-0.5">HEURISTIC: STABLE (99.99%)</div>
              </div>
            </div>

            {/* Blueprint Specs Footer */}
            <div className="pt-3 mt-3 border-t border-[#EAEAE5] flex items-center justify-between text-[11px] font-mono text-[#6B7280]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Verified Architecture</span>
                </span>
              </div>
              <span className="text-[10px] text-[#9CA3AF]">
                Hover nodes to inspect subsystem routing
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
