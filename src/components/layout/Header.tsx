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
  const [zurichTime, setZurichTime] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Zurich Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/Zurich",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date());
        setZurichTime(timeStr);
      } catch {
        setZurichTime("12:00:00");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleCtaClick = (source: string) => {
    trackClientEvent("cta_click", { cta_id: `header_start_project_${source}` });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
          isScrolled
            ? "bg-[#FAFAF8]/95 backdrop-blur-md border-[#E5E5E0] shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
            : "bg-[#FAFAF8] border-[#ECECE6]"
        }`}
      >
        {/* Top Precision Bar */}
        <div className="hidden lg:flex items-center justify-between px-6 py-1.5 border-b border-[#F0F0EB] text-[11px] font-mono text-[#6B7280] tracking-wider uppercase">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E30613] animate-pulse"></span>
              <span>Zurich, CH — {zurichTime || "CET"}</span>
            </span>
            <span className="text-[#D1D5DB]">/</span>
            <span>Digital Products · Software · AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[#374151] font-medium">Engineered for real business</span>
            <span className="text-[#D1D5DB]">/</span>
            <span className="text-[#111418] font-semibold">Q3/Q4 Capacity: Open</span>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-none"
            onClick={() => trackClientEvent("cta_click", { cta_id: "logo_nav" })}
          >
            <div className="w-7 h-7 bg-[#0C0E11] text-[#FAFAF8] flex items-center justify-center font-mono font-bold text-xs tracking-tight transition-transform group-hover:scale-95">
              <span className="text-[#E30613] mr-0.5">/</span>S
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-extrabold text-base tracking-[-0.03em] text-[#0C0E11] leading-none">
                SHAZWERK
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#6B7280] mt-0.5">
                Switzerland
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                    isActive
                      ? "text-[#0C0E11] font-semibold bg-[#EFEFEA]"
                      : "text-[#4B5563] hover:text-[#0C0E11] hover:bg-[#F4F4F0]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Action */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              onClick={() => handleCtaClick("desktop")}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#0C0E11] hover:bg-[#1F242D] text-[#FAFAF8] text-xs font-medium tracking-wide transition-all duration-150 active:scale-[0.98]"
            >
              <span>Start a project</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#E30613]" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/contact"
              onClick={() => handleCtaClick("mobile_quick")}
              className="px-3 py-1.5 bg-[#0C0E11] text-[#FAFAF8] text-[11px] font-medium tracking-wide"
            >
              Start
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0C0E11] hover:bg-[#F0F0EB] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E5E5E0] bg-[#FAFAF8] px-6 py-6 animate-fade-in shadow-xl">
            <div className="flex flex-col space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#9CA3AF] mb-1">
                Navigation
              </div>
              {NAV_ITEMS.map((item, idx) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between py-2.5 text-base font-medium text-[#0C0E11] border-b border-[#F0F0EB]"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-[#9CA3AF]">0{idx + 1}</span>
                </Link>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <Link
                  href="/contact"
                  onClick={() => handleCtaClick("mobile_drawer")}
                  className="w-full py-3 bg-[#0C0E11] text-[#FAFAF8] text-center text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Start a project</span>
                  <ArrowUpRight className="w-4 h-4 text-[#E30613]" />
                </Link>

                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#6B7280]">
                  <span>Zurich, Switzerland</span>
                  <span>{zurichTime}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      {/* Header Spacer */}
      <div className="h-18 lg:h-[97px]" />
    </>
  );
}
