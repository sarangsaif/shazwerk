import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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
        sans: [
          "var(--font-sans)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      fontSize: {
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "0.95" }],
        "9xl": ["8rem", { lineHeight: "0.92" }],
      },
      letterSpacing: {
        editorial: "-0.04em",
        tightest: "-0.03em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
