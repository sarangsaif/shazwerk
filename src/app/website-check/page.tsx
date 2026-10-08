import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SiteCheckTool from "@/components/sitecheck/SiteCheckTool";
import Faq from "@/components/home/Faq";
import { OG_IMAGES, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Website-Check kostenlos – Geschwindigkeit, SEO & Handy | SHAZWERK" },
  description:
    "Kostenloser Website-Check aus Winterthur: Prüfen Sie in 30 Sekunden Ladezeit, Google-Sichtbarkeit, Handy-Tauglichkeit und Sicherheit Ihrer Website – mit konkreten Verbesserungsvorschlägen.",
  keywords: ["Website Check kostenlos", "Website testen", "SEO Check Schweiz", "Website Analyse", "Pagespeed Test", "Webseite prüfen"],
  alternates: { canonical: "/website-check" },
  openGraph: {
    images: OG_IMAGES,
    title: "Kostenloser Website-Check | SHAZWERK",
    description: "Wie gut ist Ihre Website? Ladezeit, Google, Handy und Sicherheit in 30 Sekunden prüfen.",
    url: "/website-check",
  },
};

const FAQ = [
  {
    q: { de: "Ist der Website-Check wirklich kostenlos?", en: "Is the website check really free?" },
    a: { de: "Ja. Der automatische Check und der persönliche Verbesserungsplan sind kostenlos und unverbindlich.", en: "Yes. Both the automatic check and the personal improvement plan are free." },
  },
  {
    q: { de: "Was wird geprüft?", en: "What is checked?" },
    a: {
      de: "Über 20 Punkte in vier Bereichen: Geschwindigkeit (inkl. Google Lighthouse), Handy-Tauglichkeit, Google-Sichtbarkeit (Titel, Beschreibung, strukturierte Daten, Sitemap) und Sicherheit (HTTPS, Header).",
      en: "More than 20 points in four areas: speed (incl. Google Lighthouse), mobile, Google visibility and security.",
    },
  },
  {
    q: { de: "Warum ist meine Punktzahl tief?", en: "Why is my score low?" },
    a: {
      de: "Meist sind es wenige Ursachen: zu grosse Bilder, fehlende Angaben für Google oder ein veraltetes System. Im Verbesserungsplan zeigen wir Ihnen, was am meisten bringt.",
      en: "Usually a few causes: oversized images, missing data for Google or an outdated system.",
    },
  },
];

export default function WebsiteCheckPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SHAZWERK Website-Check",
    url: `${SITE.url}/website-check`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CHF" },
    provider: { "@id": `${SITE.url}/#organization` },
    inLanguage: "de-CH",
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        crumbs={[{ name: "Website-Check", href: "/website-check" }]}
        eyebrow="Kostenlos · 30 Sekunden"
        lines={["Wie gut ist", <span key="a" className="font-serif font-normal italic text-stone-muted">Ihre Website?</span>]}
        lead="Geschwindigkeit, Google-Sichtbarkeit, Handy und Sicherheit – automatisch geprüft, verständlich erklärt."
      />
      <section className="wrap pb-28">
        <SiteCheckTool />
      </section>
      <Faq index="(FAQ)" items={FAQ} />
    </>
  );
}
