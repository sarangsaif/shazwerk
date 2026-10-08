import React from "react";
import type { Project } from "@/lib/content";

/**
 * Generative Swiss-poster artwork for a project (pure SVG, no image requests).
 */
export default function ProjectPoster({
  project,
  className = "",
  label = true,
}: {
  project: Project;
  className?: string;
  label?: boolean;
}) {
  const { hue, motif, num, client } = project;
  const dark = hue === "#141414";
  const bg = dark ? "#141414" : hue;
  const fg = "#F1EFEA";

  let art: React.ReactNode = null;
  switch (motif) {
    case "wave":
      art = (
        <g fill="none" stroke={fg} strokeWidth="2">
          {Array.from({ length: 18 }).map((_, i) => (
            <path
              key={i}
              d={`M-20 ${150 + i * 14} C 120 ${70 + i * 14}, 260 ${250 + i * 10}, 420 ${120 + i * 15}`}
              opacity={0.25 + (i / 18) * 0.75}
            />
          ))}
        </g>
      );
      break;
    case "bars":
      art = (
        <g fill={fg}>
          {Array.from({ length: 22 }).map((_, i) => {
            const h = 40 + ((i * 37) % 180);
            return <rect key={i} x={24 + i * 16} y={420 - h} width="9" height={h} opacity={i % 5 === 0 ? 1 : 0.55} />;
          })}
          <rect x="24" y="96" width="120" height="6" fill="#E30613" />
        </g>
      );
      break;
    case "rings":
      art = (
        <g fill="none" stroke={fg} strokeWidth="1.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <circle key={i} cx="250" cy="250" r={18 + i * 17} opacity={1 - i * 0.06} />
          ))}
          <circle cx="250" cy="250" r="18" fill={fg} />
        </g>
      );
      break;
    case "grid":
      art = (
        <g fill={fg}>
          {Array.from({ length: 10 }).map((_, r) =>
            Array.from({ length: 10 }).map((__, c) => {
              const s = 4 + ((r * 7 + c * 3) % 9) * 2.2;
              return <circle key={`${r}-${c}`} cx={60 + c * 32} cy={110 + r * 30} r={s / 2} opacity={0.4 + ((r + c) % 4) * 0.2} />;
            })
          )}
        </g>
      );
      break;
    case "cross":
      art = (
        <g>
          <rect x="140" y="150" width="120" height="300" fill={fg} />
          <rect x="50" y="240" width="300" height="120" fill={fg} />
          <rect x="140" y="240" width="120" height="120" fill="#0D0D0D" />
        </g>
      );
      break;
  }

  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      role="img"
      aria-label={`${client} – Projektvisual`}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="500" fill={bg} />
      {art}
      {label && (
        <g fill={fg} fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="1.5">
          <text x="24" y="36">{`SHAZWERK / ${num}`}</text>
          <text x="376" y="36" textAnchor="end">
            {project.year}
          </text>
          <text x="24" y="478">
            {client.toUpperCase()}
          </text>
        </g>
      )}
    </svg>
  );
}
