"use client";

import { usePathname } from "next/navigation";
import { useContent } from "@/components/cms/ContentProvider";
import { useLanguage } from "@/context/LanguageContext";
import { trackClientEvent } from "@/lib/analytics-client";

/** Floating WhatsApp button: the lowest-friction way for a visitor to get in touch. */
export default function QuickContact() {
  const pathname = usePathname();
  const { settings } = useContent();
  const { language } = useLanguage();
  if (pathname?.startsWith("/admin")) return null;
  const number = settings.phone.replace(/[^\d]/g, "");
  if (number.length < 9) return null;
  const text = encodeURIComponent(
    language === "en" ? "Hello SHAZWERK, I have a question about a website:" : "Grüezi SHAZWERK, ich habe eine Frage zu einer Website:"
  );
  return (
    <a
      href={`https://wa.me/${number}?text=${text}`}
      target="_blank"
      rel="noopener"
      onClick={() => trackClientEvent("cta_click", { cta_id: "whatsapp" })}
      aria-label={language === "en" ? "Chat on WhatsApp" : "Per WhatsApp schreiben"}
      className="fixed bottom-5 right-5 z-[65] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.1c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.7 12.7-12.7S23 3 16 3zm0 23.2c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4.1 1.2 1.3-4-.3-.4a10.5 10.5 0 1 1 8.9 4.9zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.8.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5l-.7-.4z" />
      </svg>
    </a>
  );
}
