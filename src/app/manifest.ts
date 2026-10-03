import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SHAZWERK — Software Agentur Zürich & Digital Product Studio",
    short_name: "SHAZWERK",
    description:
      "Schweizer Softwareentwicklung & souveräne Enterprise AI mit Schweizer Präzision und 100% Datensouveränität.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#0A0B0D",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
