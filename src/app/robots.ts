import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/admin/*"],
      },
      {
        userAgent: ["Googlebot", "Bingbot", "Applebot"],
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/admin/*"],
      },
      // Generative AI & Search Engine Bots (ChatGPT Search, Perplexity, Claude)
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "cohere-ai"],
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/admin/*"],
      },
    ],
    sitemap: "https://shazwerk.ch/sitemap.xml",
  };
}
