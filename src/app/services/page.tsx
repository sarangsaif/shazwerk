import type { Metadata } from "next";
import T from "@/components/i18n/T";
import PageHero from "@/components/page/PageHero";
import CtaLink from "@/components/page/CtaLink";
import ServicesList from "@/components/home/ServicesList";
import Process from "@/components/home/Process";
import { SITE, OG_IMAGES } from "@/lib/content";
import { getContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Leistungen – Webdesign, Webentwicklung, Software & AI",
  description:
    "Webdesign, Webentwicklung, Software- und App-Entwicklung, Enterprise AI sowie Cloud-Hosting in der Schweiz. Festpreis pro Meilenstein, persönliche Betreuung und 100 % Quellcode-Eigentum.",
  alternates: { canonical: "/services" },
  openGraph: {
      images: OG_IMAGES,
    title: "Leistungen | SHAZWERK Zürich",
    description: "Webdesign, Webentwicklung, Software, Apps und Enterprise AI aus Zürich.",
    url: "/services",
  },
};

const MODELS = [
  {
    title: { de: "Projekt", en: "Project" },
    lead: { de: "Neue Website, Plattform oder MVP mit klarem Ziel.", en: "A new website, platform or MVP with a clear goal." },
    detail: { de: "Festpreis pro Meilenstein · 4–12 Wochen", en: "Fixed price per milestone · 4–12 weeks" },
  },
  {
    title: { de: "Partnerschaft", en: "Partnership" },
    lead: { de: "Feste Betreuung für die laufende Weiterentwicklung.", en: "Dedicated support for continuous development." },
    detail: { de: "Monatliches Mandat · zweiwöchige Sprints", en: "Monthly retainer · two-week sprints" },
  },
  {
    title: { de: "Audit", en: "Audit" },
    lead: { de: "Code, Performance, SEO und Datenschutz auf dem Prüfstand.", en: "Code, performance, SEO and privacy under review." },
    detail: { de: "1–2 Wochen · priorisierte Roadmap", en: "1–2 weeks · prioritised roadmap" },
  },
];

export default async function ServicesPage() {
  const { services: SERVICES } = await getContent();
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Leistungen von SHAZWERK",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title.de,
        description: s.lead.de,
        provider: { "@id": `${SITE.url}/#localbusiness` },
        areaServed: { "@type": "Country", name: "Schweiz" },
        ...(s.href ? { url: `${SITE.url}${s.href}` } : {}),
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        crumbs={[{ name: "Leistungen", href: "/services" }]}
        eyebrow={<T de="Leistungen · Zürich" en="Services · Zurich" />}
        lines={[
          <T key="a" de="Alles, was ein" en="Everything a" />,
          <span key="b">
            <T de="digitales Produkt" en="digital product" />{" "}
            <span className="font-serif font-normal italic text-stone-muted"><T de="braucht." en="needs." /></span>
          </span>,
        ]}
        lead={
          <T
            de="Strategie, Design, Entwicklung und Betrieb aus einer Hand – ohne Übergaben zwischen Agenturen, ohne Junior-Teams."
            en="Strategy, design, engineering and operations under one roof – no hand-offs between agencies, no junior teams."
          />
        }
      />
      <ServicesList services={SERVICES} withHeading={false} />

      <section className="wrap pb-28" aria-labelledby="models-title">
        <h2 id="models-title" className="font-display text-huge font-medium" data-reveal="up">
          <T de="Zusammenarbeit" en="Ways to work" />
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-px bg-ink/15 md:grid-cols-3">
          {MODELS.map((m, i) => (
            <div key={i} className="flex min-h-[300px] flex-col justify-between bg-paper p-8" data-reveal="up" style={{ ["--d" as string]: `${i * 100}ms` }}>
              <span className="eyebrow text-stone-muted">0{i + 1}</span>
              <div>
                <h3 className="font-display text-big font-medium"><T de={m.title.de} en={m.title.en} /></h3>
                <p className="mt-3 text-lg"><T de={m.lead.de} en={m.lead.en} /></p>
                <p className="eyebrow mt-6 text-stone-muted"><T de={m.detail.de} en={m.detail.en} /></p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <CtaLink href="/contact"><T de="Erstgespräch vereinbaren" en="Book an intro call" /></CtaLink>
        </div>
      </section>

      <Process />
    </>
  );
}
