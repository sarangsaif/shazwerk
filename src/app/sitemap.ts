import { MetadataRoute } from "next";
import { SITE } from "@/lib/content";
import { getPublishedProjects } from "@/lib/cms";
import { LANDING_PAGES } from "@/lib/landing";
import { ARTICLES } from "@/lib/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const PROJECTS = await getPublishedProjects();
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
    entry("/website-check", 0.9, "monthly"),
    entry("/ratgeber", 0.7, "weekly"),
    ...ARTICLES.map((a) => entry(`/ratgeber/${a.slug}`, 0.7, "monthly")),
    entry("/services", 0.9, "monthly"),
    entry("/work", 0.8, "monthly"),
    ...PROJECTS.map((p) => entry(`/work/${p.slug}`, 0.7, "yearly")),
    entry("/about", 0.7, "monthly"),
    entry("/contact", 0.8, "yearly"),
    entry("/imprint", 0.2, "yearly"),
    entry("/privacy", 0.2, "yearly"),
  ];
}
