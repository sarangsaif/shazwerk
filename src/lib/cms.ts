import { unstable_cache } from "next/cache";
import { getJSON, setJSON } from "./store";
import { DEFAULT_CONTENT, DEFAULT_SETTINGS, SiteContent } from "./content";

export const CONTENT_KEY = "sw:content";
export const CONTENT_TAG = "site-content";

function merge(stored: Partial<SiteContent> | null): SiteContent {
  if (!stored) return DEFAULT_CONTENT;
  return {
    settings: {
      ...DEFAULT_SETTINGS,
      ...(stored.settings || {}),
      geo: { ...DEFAULT_SETTINGS.geo, ...(stored.settings?.geo || {}) },
      social: { ...DEFAULT_SETTINGS.social, ...(stored.settings?.social || {}) },
    },
    projects: stored.projects ?? DEFAULT_CONTENT.projects,
    services: stored.services ?? DEFAULT_CONTENT.services,
    faq: stored.faq ?? DEFAULT_CONTENT.faq,
    updatedAt: stored.updatedAt,
  };
}

/** Uncached read, for the admin portal. */
export async function readContent(): Promise<SiteContent> {
  try {
    return merge(await getJSON<Partial<SiteContent>>(CONTENT_KEY));
  } catch (err) {
    console.error("cms: falling back to defaults", err);
    return DEFAULT_CONTENT;
  }
}

/** Cached read for public pages; invalidated by tag when the admin saves. */
export const getContent = unstable_cache(readContent, [CONTENT_KEY], { tags: [CONTENT_TAG] });

export async function getPublishedProjects() {
  return (await getContent()).projects.filter((p) => !p.hidden);
}

export async function saveContent(content: SiteContent): Promise<SiteContent> {
  const next = { ...content, updatedAt: new Date().toISOString() };
  await setJSON(CONTENT_KEY, next);
  return next;
}
