import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Swiss editorial palette (public site)
        ink: {
          DEFAULT: "#0D0D0D",
          soft: "#1A1A1A",
          line: "#2A2A2A",
        },
        paper: {
          DEFAULT: "#F1EFEA",
          deep: "#E7E4DD",
        },
        swiss: {
          red: "#E30613",
          redDark: "#B8050F",
        },
        stone: {
          muted: "#5E5D59",
        },
        // Legacy tokens (admin console)
        mimosa: {
          bg: "#FFFFFF",
          surface: "#F8F8F7",
          surfaceHover: "#F1F1EE",
          border: "#E8E8E5",
          borderDark: "#D2D2CD",
          text: "#141416",
          muted: "#6A6A70",
          light: "#8E8E93",
          yellow: "#FFE252",
          lime: "#44F33E",
          cyan: "#2CC5F9",
          orange: "#FF8E1D",
          red: "#E30613",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "0.95" }],
        "9xl": ["8rem", { lineHeight: "0.92" }],
        mega: ["clamp(3.9rem, 11.5vw, 13.5rem)", { lineHeight: "0.86", letterSpacing: "-0.055em" }],
        giant: ["clamp(2.75rem, 7.6vw, 8.75rem)", { lineHeight: "0.92", letterSpacing: "-0.045em" }],
        huge: ["clamp(2.25rem, 5.2vw, 5.75rem)", { lineHeight: "0.98", letterSpacing: "-0.04em" }],
        big: ["clamp(1.75rem, 3.2vw, 3.25rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
      },
      letterSpacing: {
        editorial: "-0.04em",
        tightest: "-0.03em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
