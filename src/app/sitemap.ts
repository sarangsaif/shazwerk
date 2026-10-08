import { MetadataRoute } from "next";
import { PROJECTS, SITE } from "@/lib/content";
import { LANDING_PAGES } from "@/lib/landing";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly") => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("", 1.0, "weekly"),
    ...LANDING_PAGES.map((p) => entry(`/${p.slug}`, 0.9, "monthly")),
    entry("/services", 0.9, "monthly"),
    entry("/work", 0.8, "monthly"),
    ...PROJECTS.map((p) => entry(`/work/${p.slug}`, 0.7, "yearly")),
    entry("/about", 0.7, "monthly"),
    entry("/contact", 0.8, "yearly"),
    entry("/imprint", 0.2, "yearly"),
    entry("/privacy", 0.2, "yearly"),
  ];
}
