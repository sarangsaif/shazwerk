import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getLanding, LANDING_PAGES, AREA_SERVED } from "@/lib/landing";
import { SITE, OG_IMAGES } from "@/lib/content";
import { getPublishedProjects } from "@/lib/cms";
import PageHero from "./PageHero";
import CtaLink from "./CtaLink";
import ProjectPoster from "@/components/ui/ProjectPoster";
import Marquee from "@/components/ui/Marquee";
import Faq from "@/components/home/Faq";

export function landingMetadata(slug: string): Metadata {
  const p = getLanding(slug);
  return {
    title: { absolute: `${p.metaTitle} | SHAZWERK` },
    description: p.metaDescription,
    keywords: p.keywords,
    alternates: { canonical: `/${p.slug}` },
    openGraph: {
      images: OG_IMAGES,
      title: p.metaTitle,
      description: p.metaDescription,
      url: `/${p.slug}`,
      type: "website",
      locale: "de_CH",
    },
    twitter: { title: p.metaTitle, description: p.metaDescription, images: ["/twitter-image"] },
  };
}

/** Shared layout for the German high-intent SEO landing pages. */
export default async function LandingTemplate({ slug }: { slug: string }) {
  const p = getLanding(slug);
  const all = await getPublishedProjects();
  const linked = all.filter((x) => p.projects.includes(x.slug));
  const projects = linked.length ? linked : all.slice(0, 2);
  const related = LANDING_PAGES.filter((x) => x.slug !== p.slug);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.url}/${p.slug}#service`,
    name: p.serviceName,
    serviceType: p.serviceName,
    description: p.metaDescription,
    url: `${SITE.url}/${p.slug}`,
    provider: { "@id": `${SITE.url}/#localbusiness` },
    areaServed: AREA_SERVED.map((name) => ({ "@type": "City", name })),
    availableLanguage: ["de", "en", "fr"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <PageHero
        crumbs={[{ name: p.eyebrow.split(" · ")[0], href: `/${p.slug}` }]}
        eyebrow={p.eyebrow}
        lines={[p.h1, <span key="a" className="font-serif font-normal italic text-stone-muted">{p.h1Accent}</span>]}
        lead={p.lead}
        aside={
          <div className="flex flex-wrap items-center gap-4 lg:justify-end">
            <CtaLink href="/contact">{p.cta}</CtaLink>
          </div>
        }
      />

      <section className="wrap pb-28" aria-labelledby="pillars">
        <h2 id="pillars" className="sr-only">Unsere Stärken</h2>
        <div className="grid grid-cols-1 border-t border-ink/15 md:grid-cols-3">
          {p.pillars.map((pl, i) => (
            <div
              key={pl.title}
              data-reveal="up"
              style={{ ["--d" as string]: `${i * 100}ms` }}
              className={`border-b border-ink/15 py-10 md:border-b-0 md:px-8 ${i === 0 ? "md:pl-0" : "md:border-l"}`}
            >
              <span className="font-display text-6xl font-medium tracking-[-0.05em] text-swiss-red">0{i + 1}</span>
              <h3 className="mt-8 font-display text-2xl font-medium tracking-[-0.02em]">{pl.title}</h3>
              <p className="mt-3 text-stone-muted">{pl.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink py-28 text-paper sm:py-36" aria-labelledby="body-title">
        <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-12">
          <h2 id="body-title" className="font-display text-huge font-medium lg:col-span-6" data-reveal="up">
            {p.bodyTitle}
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-paper/75 lg:col-span-5 lg:col-start-8">
            {p.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <ul className="grid grid-cols-1 gap-x-6 gap-y-3 border-t border-paper/15 pt-8 text-base text-paper sm:grid-cols-2">
              {p.checklist.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="text-swiss-red" aria-hidden="true">✚</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="border-b border-ink/15 py-6">
        <Marquee
          speed={50}
          className="font-display text-4xl font-medium tracking-[-0.03em] text-ink/80"
          items={AREA_SERVED.map((c) => c)}
        />
      </div>

      {projects.length > 0 && (
        <section className="wrap py-28" aria-labelledby="refs">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 id="refs" className="font-display text-huge font-medium">
              Referenzen
            </h2>
            <Link href="/work" className="link-line text-sm">
              Alle Projekte
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((pr) => (
              <Link key={pr.slug} href={`/work/${pr.slug}`} data-cursor="Ansehen" className="group block">
                <div className="overflow-hidden">
                  <ProjectPoster
                    project={pr}
                    className="aspect-[4/3] h-auto w-full transition-transform duration-[1200ms] ease-out-expo group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-medium tracking-[-0.02em]">{pr.client}</h3>
                    <p className="text-stone-muted">{pr.title.de}</p>
                  </div>
                  <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Faq index="(FAQ)" items={p.faq.map((f) => ({ q: { de: f.q, en: f.q }, a: { de: f.a, en: f.a } }))} />

      <nav className="wrap pb-28" aria-label="Weitere Leistungen">
        <p className="eyebrow mb-6 text-stone-muted">Weitere Leistungen</p>
        <ul className="flex flex-wrap gap-3">
          {related.map((r) => (
            <li key={r.slug}>
              <Link href={`/${r.slug}`} className="btn btn-ghost !px-5 !py-2.5">
                {r.metaTitle.split(" – ")[0]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
