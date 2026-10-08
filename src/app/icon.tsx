import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#E30613" }}>
        <div style={{ position: "relative", width: 20, height: 20, display: "flex" }}>
          <div style={{ position: "absolute", left: 7, top: 0, width: 6, height: 20, background: "#FFFFFF" }} />
          <div style={{ position: "absolute", left: 0, top: 7, width: 20, height: 6, background: "#FFFFFF" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
