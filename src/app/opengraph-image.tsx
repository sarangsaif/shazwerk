import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SHAZWERK — Swiss Digital Products, Software & AI Engineering";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0B0D",
          padding: "80px",
          fontFamily: "sans-serif",
          color: "#FFFFFF",
        }}
      >
        {/* Subtle grid background simulation */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#FFFFFF",
              }}
            >
              shazwerk
            </span>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#DC2626",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "8px 20px",
              borderRadius: "999px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              fontSize: 18,
              fontFamily: "monospace",
              color: "#E2E8F0",
            }}
          >
            <span>Winterthur · Switzerland</span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "960px",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
            }}
          >
            Digital engineering studio for high-stakes software & sovereign AI.
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#94A3B8",
              lineHeight: 1.4,
            }}
          >
            Swiss precision engineering. 100% data residency and IP custody. Built for companies moving from concept to production reality.
          </div>
        </div>

        {/* Footer Metrics */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "32px",
            fontSize: 16,
            fontFamily: "monospace",
            color: "#64748B",
          }}
        >
          <div style={{ display: "flex", gap: "32px" }}>
            <span style={{ color: "#E2E8F0" }}>01 / Web Applications</span>
            <span style={{ color: "#E2E8F0" }}>02 / Private LLMs & AI</span>
            <span style={{ color: "#E2E8F0" }}>03 / Swiss Cloud eu-central-2</span>
          </div>
          <div style={{ color: "#E2E8F0", fontWeight: 700 }}>
            shazwerk.ch
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
