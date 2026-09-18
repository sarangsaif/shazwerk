"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

const NAV_ITEMS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [zurichTime, setZurichTime] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/Zurich",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
        setZurichTime(timeStr);
      } catch {
        setZurichTime("12:00");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 py-5">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 px-6 py-3.5 flex items-center justify-between border ${
          isScrolled
            ? "bg-[#0A0B0E]/85 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-transparent border-transparent"
        }`}
      >
        {/* Brand Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 focus:outline-none"
          onClick={() => trackClientEvent("cta_click", { cta_id: "logo_nav" })}
        >
          <span className="w-2 h-2 rounded-full bg-[#E30613] transition-transform group-hover:scale-125"></span>
          <span className="font-sans font-extrabold text-base tracking-[-0.03em] text-[#F5F5F3]">
            SHAZWERK
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-[0.16em] text-[#7E8494] pl-2 border-l border-white/10">
            CH — {zurichTime || "CET"}
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-mono uppercase tracking-wider">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 transition-colors duration-200 ${
                  isActive ? "text-[#F5F5F3] font-bold" : "text-[#8E94A0] hover:text-[#F5F5F3]"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-[#E30613]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            onClick={() => trackClientEvent("cta_click", { cta_id: "header_start_project" })}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F5F3] hover:bg-white text-[#080808] text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95"
          >
            <span>Start a project</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#E30613] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#F5F5F3] p-1.5 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Fullscreen Kinetic Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-0 bg-[#080808]/98 backdrop-blur-2xl z-40 px-6 py-24 flex flex-col justify-between">
          <div className="flex flex-col space-y-6">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#7E8494] mb-2">
              Menu
            </div>
            {NAV_ITEMS.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-extrabold tracking-[-0.03em] text-[#F5F5F3] flex items-center justify-between py-2 border-b border-white/5"
              >
                <span>{item.label}</span>
                <span className="text-sm font-mono text-[#7E8494]">0{idx + 1}</span>
              </Link>
            ))}
          </div>

          <div className="pt-8 flex flex-col gap-4">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 rounded-full bg-[#F5F5F3] text-[#080808] text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Start a project</span>
              <ArrowUpRight className="w-4 h-4 text-[#E30613]" />
            </Link>
            <div className="flex justify-between items-center text-xs font-mono text-[#7E8494] pt-2">
              <span>Zurich, Switzerland</span>
              <span>CET {zurichTime}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
