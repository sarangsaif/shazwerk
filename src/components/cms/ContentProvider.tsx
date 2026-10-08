"use client";

import { createContext, useContext } from "react";
import { DEFAULT_PROJECTS, DEFAULT_SETTINGS, Project, SiteSettings } from "@/lib/content";

interface ClientContent {
  settings: SiteSettings;
  projects: Project[];
}

const Ctx = createContext<ClientContent>({ settings: DEFAULT_SETTINGS, projects: DEFAULT_PROJECTS });

/** Makes CMS content available to client components (header, footer, work index). */
export function ContentProvider({ value, children }: { value: ClientContent; children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useContent() {
  return useContext(Ctx);
}
