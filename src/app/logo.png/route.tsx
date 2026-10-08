import { ImageResponse } from "next/og";

export const runtime = "edge";

/** 512×512 brand mark for structured data and the web app manifest. */
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#E30613",
        }}
      >
        <div style={{ position: "relative", width: 300, height: 300, display: "flex" }}>
          <div style={{ position: "absolute", left: 100, top: 0, width: 100, height: 300, background: "#FFFFFF" }} />
          <div style={{ position: "absolute", left: 0, top: 100, width: 300, height: 100, background: "#FFFFFF" }} />
        </div>
      </div>
    ),
    { width: 512, height: 512 }
  );
}
