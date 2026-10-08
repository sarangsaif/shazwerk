import type { Metadata } from "next";
import T from "@/components/i18n/T";
import PageHero from "@/components/page/PageHero";
import ContactForm from "@/components/page/ContactForm";
import ZurichClock from "@/components/ui/ZurichClock";
import { SITE, OG_IMAGES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Kontakt – Projekt anfragen bei der Webagentur in Zürich",
  description:
    "Projekt anfragen bei SHAZWERK in Zürich: Website, Software, App oder Enterprise AI. Kostenloses Erstgespräch und Antwort innerhalb eines Werktags. Gotthardstrasse 26, 8002 Zürich.",
  alternates: { canonical: "/contact" },
  openGraph: {
      images: OG_IMAGES,
    title: "Kontakt | SHAZWERK Zürich",
    description: "Kostenloses Erstgespräch und Antwort innerhalb eines Werktags.",
    url: "/contact",
  },
};

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE.url}/contact`,
    name: "Kontakt SHAZWERK",
    inLanguage: "de-CH",
    about: { "@id": `${SITE.url}/#localbusiness` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        crumbs={[{ name: "Kontakt", href: "/contact" }]}
        eyebrow={<T de="Kontakt · Zürich" en="Contact · Zurich" />}
        lines={[
          <T key="a" de="Erzählen Sie uns" en="Tell us about" />,
          <span key="b" className="font-serif font-normal italic text-stone-muted">
            <T de="von Ihrem Vorhaben." en="your project." />
          </span>,
        ]}
      />

      <section className="wrap grid grid-cols-1 gap-16 pb-28 lg:grid-cols-12" aria-label="Kontaktformular">
        <aside className="space-y-10 text-lg lg:col-span-4">
          <div>
            <p className="eyebrow mb-3 text-stone-muted">E-Mail</p>
            <a href={`mailto:${SITE.email}`} className="link-line font-display text-2xl tracking-[-0.02em]">
              {SITE.email}
            </a>
          </div>
          <div>
            <p className="eyebrow mb-3 text-stone-muted"><T de="Telefon" en="Phone" /></p>
            <a href={`tel:${SITE.phoneE164}`} className="link-line font-display text-2xl tracking-[-0.02em]">
              {SITE.phone}
            </a>
          </div>
          <div>
            <p className="eyebrow mb-3 text-stone-muted">Studio</p>
            <address className="not-italic">
              {SITE.legalName}
              <br />
              {SITE.street}
              <br />
              {SITE.zip} {SITE.city}
            </address>
          </div>
          <div>
            <p className="eyebrow mb-3 text-stone-muted"><T de="Ortszeit Zürich" en="Local time Zurich" /></p>
            <p className="font-display text-2xl"><ZurichClock /></p>
          </div>
          <ul className="space-y-2 border-t border-ink/15 pt-8 text-base text-stone-muted">
            <li>✚ <T de="Kostenloses Erstgespräch" en="Free intro call" /></li>
            <li>✚ <T de="Antwort innerhalb eines Werktags" en="Reply within one business day" /></li>
            <li>✚ <T de="NDA auf Wunsch vor dem ersten Gespräch" en="NDA before the first call on request" /></li>
          </ul>
        </aside>
        <div className="lg:col-span-7 lg:col-start-6">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
