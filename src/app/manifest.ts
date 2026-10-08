import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SHAZWERK – Webagentur & Software Studio Zürich",
    short_name: "SHAZWERK",
    description: "Webdesign, Webentwicklung, Software und Enterprise AI aus Zürich.",
    start_url: "/",
    display: "standalone",
    background_color: "#F1EFEA",
    theme_color: "#0D0D0D",
    lang: "de-CH",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/logo.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
