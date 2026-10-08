import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import T from "@/components/i18n/T";
import PageHero from "@/components/page/PageHero";
import CtaLink from "@/components/page/CtaLink";
import ProjectPoster from "@/components/ui/ProjectPoster";
import { SITE, OG_IMAGES } from "@/lib/content";
import { getPublishedProjects } from "@/lib/cms";

export async function generateStaticParams() {
  return (await getPublishedProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = (await getPublishedProjects()).find((x) => x.slug === params.slug);
  if (!p) return {};
  const title = `${p.client}: ${p.title.de}`;
  return {
    title,
    description: p.summary.de,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      images: OG_IMAGES,
      title: `${title} | SHAZWERK`,
      description: p.summary.de,
      url: `/work/${p.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const PROJECTS = await getPublishedProjects();
  const idx = PROJECTS.findIndex((x) => x.slug === params.slug);
  if (idx === -1) notFound();
  const p = PROJECTS[idx];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE.url}/work/${p.slug}#work`,
    name: `${p.client} – ${p.title.de}`,
    headline: p.title.de,
    abstract: p.summary.de,
    url: `${SITE.url}/work/${p.slug}`,
    inLanguage: "de-CH",
    dateCreated: p.year,
    keywords: p.tech.join(", "),
    creator: { "@id": `${SITE.url}/#organization` },
    about: p.sector.de,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        crumbs={[
          { name: "Arbeiten", href: "/work" },
          { name: p.client, href: `/work/${p.slug}` },
        ]}
        eyebrow={
          <>
            {p.client} · <T de={p.sector.de} en={p.sector.en} /> · {p.year}
          </>
        }
        lines={[<T key="t" de={p.title.de} en={p.title.en} />]}
        lead={<T de={p.summary.de} en={p.summary.en} />}
        aside={
          <dl className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <dt className="eyebrow text-stone-muted"><T de="Kunde" en="Client" /></dt>
              <dd className="mt-1">{p.client}</dd>
            </div>
            <div>
              <dt className="eyebrow text-stone-muted"><T de="Ort" en="Location" /></dt>
              <dd className="mt-1">{p.location}</dd>
            </div>
            <div className="col-span-2">
              <dt className="eyebrow text-stone-muted">Stack</dt>
              <dd className="mt-1">{p.tech.join(" · ")}</dd>
            </div>
          </dl>
        }
      />

      <div className="wrap" data-reveal="clip">
        <ProjectPoster project={p} className="aspect-[16/9] h-auto w-full" />
      </div>

      <section className="wrap grid grid-cols-1 gap-16 py-28 lg:grid-cols-12" aria-label="Case Study">
        <div className="lg:col-span-5">
          <h2 className="eyebrow text-stone-muted"><T de="Ausgangslage" en="Challenge" /></h2>
          <p className="mt-6 font-display text-big font-medium" data-reveal="up">
            <T de={p.challenge.de} en={p.challenge.en} />
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 className="eyebrow text-stone-muted"><T de="Lösung" en="Solution" /></h2>
          <p className="mt-6 text-xl leading-relaxed" data-reveal="up">
            <T de={p.solution.de} en={p.solution.en} />
          </p>
          <h2 className="eyebrow mt-14 text-stone-muted"><T de="Ergebnis" en="Outcome" /></h2>
          <ul className="mt-6 border-t border-ink/15">
            {p.outcomes.de.map((o, i) => (
              <li key={o} className="flex gap-4 border-b border-ink/15 py-4 text-lg">
                <span className="text-swiss-red" aria-hidden="true">✚</span>
                <T de={o} en={p.outcomes.en[i]} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink py-24 text-paper" aria-label="Kennzahlen">
        <dl className="wrap grid grid-cols-1 gap-10 sm:grid-cols-3">
          {p.metrics.map((m, i) => (
            <div key={i} className="flex flex-col border-t border-paper/20 pt-6" data-reveal="up" style={{ ["--d" as string]: `${i * 100}ms` }}>
              <dt className="order-2 mt-2 text-paper/60"><T de={m.label.de} en={m.label.en} /></dt>
              <dd className="order-1 font-display text-giant font-medium">{m.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap py-28" aria-label="Nächstes Projekt">
        <p className="eyebrow text-stone-muted"><T de="Nächstes Projekt" en="Next project" /></p>
        <Link href={`/work/${next.slug}`} data-cursor="Next" className="group mt-6 flex items-end justify-between gap-6 border-b border-ink/15 pb-8">
          <span className="font-display text-giant font-medium transition-transform duration-700 ease-out-expo group-hover:translate-x-4">
            {next.client}
          </span>
          <ArrowUpRight className="mb-4 h-12 w-12 shrink-0 transition-transform duration-500 group-hover:rotate-45 group-hover:text-swiss-red" aria-hidden="true" />
        </Link>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          {p.link && (
            <a href={p.link} target="_blank" rel="noopener" className="link-line">
              <T de="Projekt live ansehen ↗" en="View live project ↗" />
            </a>
          )}
          <CtaLink href="/contact">
            <T de="Ähnliches Projekt besprechen" en="Discuss a similar project" />
          </CtaLink>
        </div>
      </section>
    </>
  );
}
