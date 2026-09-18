"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";
import { trackClientEvent } from "@/lib/analytics-client";

const NAV_ITEMS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [zurichTime, setZurichTime] = useState("18:00");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
          second: "2-digit",
          hour12: false,
        }).format(new Date());
        setZurichTime(timeStr);
      } catch {
        setZurichTime("18:00:00");
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
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none p-3 sm:p-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left floating badge / Logo dock */}
        <div
          className={`pointer-events-auto flex items-center gap-3 bg-white/90 backdrop-blur-md border border-neutral-200/80 rounded-full px-4 py-2.5 shadow-sm transition-all duration-300 ${
            isScrolled ? "shadow-md border-neutral-300/90" : ""
          }`}
        >
          <Link
            href="/"
            onClick={() => trackClientEvent("nav_click", { destination: "home_logo" })}
            className="flex items-center gap-2 group"
          >
            <span className="font-semibold text-neutral-900 tracking-tight text-base hover:text-black transition-colors">
              shazwerk
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-600"></span>
          </Link>

          <span className="hidden md:inline-block text-neutral-300">|</span>

          {/* Zurich Time & Status */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-600">
            <span>Zürich {zurichTime} CET</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] text-neutral-500 hidden lg:inline">Available Q3/Q4</span>
          </div>
        </div>

        {/* Right floating Navigation pill */}
        <div
          className={`pointer-events-auto hidden md:flex items-center gap-1 bg-white/90 backdrop-blur-md border border-neutral-200/80 rounded-full p-1.5 shadow-sm transition-all duration-300 ${
            isScrolled ? "shadow-md border-neutral-300/90" : ""
          }`}
        >
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => trackClientEvent("nav_click", { destination: item.href })}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "bg-neutral-900 text-white font-semibold shadow-xs"
                      : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/contact"
            onClick={() => trackClientEvent("cta_click", { location: "header_pill" })}
            className="ml-1 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-xs"
          >
            <span>Start a brief</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="pointer-events-auto md:hidden p-2.5 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200 text-neutral-900 shadow-sm"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden fixed inset-x-3 top-20 bg-white/98 backdrop-blur-xl border border-neutral-200 rounded-2xl p-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 text-xs font-mono text-neutral-500">
              <span>Zürich {zurichTime} CET</span>
              <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                Available for briefs
              </span>
            </div>

            <nav className="flex flex-col gap-2 pt-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-2xl font-medium tracking-tight text-neutral-900 hover:text-red-600 py-1 transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-neutral-400" />
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-neutral-100 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full py-3 text-center rounded-xl bg-neutral-950 text-white font-medium text-sm hover:bg-neutral-800 transition-colors"
              >
                Get in touch
              </Link>
              <div className="text-center text-xs text-neutral-500 font-mono">
                hello@shazwerk.ch · Switzerland
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
