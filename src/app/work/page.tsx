import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import T from "@/components/i18n/T";
import PageHero from "@/components/page/PageHero";
import ProjectPoster from "@/components/ui/ProjectPoster";
import { PROJECTS, SITE, OG_IMAGES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Referenzen & Projekte – Websites, Software & AI aus Zürich",
  description:
    "Ausgewählte Projekte von SHAZWERK: Webplattformen, Individualsoftware und Enterprise AI für Schweizer Unternehmen aus Logistik, Finanz, Legal, Life Sciences und öffentlichem Verkehr.",
  alternates: { canonical: "/work" },
  openGraph: {
      images: OG_IMAGES,
    title: "Referenzen & Projekte | SHAZWERK Zürich",
    description: "Webplattformen, Individualsoftware und Enterprise AI für Schweizer Unternehmen.",
    url: "/work",
  },
};

export default function WorkPage() {
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SHAZWERK Referenzen",
    itemListElement: PROJECTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/work/${p.slug}`,
      name: `${p.client} – ${p.title.de}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />
      <PageHero
        crumbs={[{ name: "Arbeiten", href: "/work" }]}
        eyebrow={<T de="Referenzen · 2024–2026" en="Selected work · 2024–2026" />}
        lines={[
          <T key="a" de="Arbeiten," en="Work that" />,
          <span key="b" className="font-serif font-normal italic text-stone-muted">
            <T de="die bleiben." en="lasts." />
          </span>,
        ]}
        lead={
          <T
            de="Plattformen, Software und KI-Systeme für Schweizer Unternehmen – im produktiven Einsatz, jeden Tag."
            en="Platforms, software and AI systems for Swiss companies – in production, every day."
          />
        }
      />

      <section className="wrap pb-28" aria-label="Projekte">
        <div className="grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <article key={p.slug} className={i % 2 === 1 ? "md:mt-40" : ""} data-reveal="up">
              <Link href={`/work/${p.slug}`} data-cursor="View" className="group block">
                <div className="overflow-hidden" data-reveal="clip">
                  <ProjectPoster
                    project={p}
                    className="aspect-[4/5] h-auto w-full transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.06]"
                  />
                </div>
                <div className="mt-5 grid grid-cols-12 gap-4 border-t border-ink/15 pt-4">
                  <span className="eyebrow col-span-2 pt-2 text-stone-muted">{p.num}</span>
                  <div className="col-span-8">
                    <h2 className="font-display text-3xl font-medium tracking-[-0.03em]">{p.client}</h2>
                    <p className="mt-1 text-stone-muted">
                      <T de={p.title.de} en={p.title.en} />
                    </p>
                  </div>
                  <span className="col-span-2 flex justify-end pt-2">
                    <ArrowUpRight className="h-6 w-6 transition-transform duration-500 group-hover:rotate-45 group-hover:text-swiss-red" aria-hidden="true" />
                  </span>
                </div>
                <p className="eyebrow mt-3 pl-[16.66%] text-stone-muted">
                  <T de={p.sector.de} en={p.sector.en} /> · {p.location} · {p.year}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
