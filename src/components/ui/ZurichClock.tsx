"use client";

import { useEffect, useState } from "react";

const fmt = () =>
  new Intl.DateTimeFormat("de-CH", {
    timeZone: "Europe/Zurich",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());

export default function ZurichClock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <time className={`tabular-nums ${className}`} suppressHydrationWarning>
      {time}
    </time>
  );
}
