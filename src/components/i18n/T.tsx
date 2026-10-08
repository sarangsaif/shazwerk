"use client";

import { useLanguage } from "@/context/LanguageContext";

/**
 * Inline bilingual text. Server-renders German (de-CH) for search engines,
 * switches to English client-side when the visitor toggles the language.
 */
export default function T({ de, en }: { de: string; en: string }) {
  const { language } = useLanguage();
  return <>{language === "en" ? en : de}</>;
}
