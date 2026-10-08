import React from "react";

export default function Marquee({
  items,
  speed = 40,
  reverse = false,
  className = "",
  separator = <span className="mx-[0.35em] inline-block text-swiss-red">✚</span>,
}: {
  items: React.ReactNode[];
  speed?: number;
  reverse?: boolean;
  className?: string;
  separator?: React.ReactNode;
}) {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          {item}
          {separator}
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee-host overflow-hidden ${className}`}>
      <div
        className="marquee"
        data-reverse={reverse || undefined}
        style={{ ["--speed" as string]: `${speed}s` } as React.CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
