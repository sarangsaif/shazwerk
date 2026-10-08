import React from "react";

/**
 * Splits text into masked lines that slide up when the parent `[data-reveal="mask"]`
 * enters the viewport (or immediately with `intro`).
 */
export default function MaskText({
  lines,
  intro = false,
  startIndex = 0,
}: {
  lines: React.ReactNode[];
  intro?: boolean;
  startIndex?: number;
}) {
  return (
    <>
      {lines.map((line, i) => (
        <span
          key={i}
          className={`mask ${intro ? "intro-line" : ""}`}
          style={{ ["--i" as string]: i + startIndex } as React.CSSProperties}
        >
          <span>{line}</span>
        </span>
      ))}
    </>
  );
}
