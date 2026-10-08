import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/page/PageHero";
import CtaLink from "@/components/page/CtaLink";
import { ARTICLES, getArticle } from "@/lib/articles";
import { OG_IMAGES, SITE } from "@/lib/content";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = getArticle(params.slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    keywords: a.keywords,
    alternates: { canonical: `/ratgeber/${a.slug}` },
    openGraph: { images: OG_IMAGES, title: a.title, description: a.description, url: `/ratgeber/${a.slug}`, type: "article" },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const a = getArticle(params.slug);
  if (!a) notFound();
  const others = ARTICLES.filter((x) => x.slug !== a.slug);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.published,
    dateModified: a.published,
    inLanguage: "de-CH",
    mainEntityOfPage: `${SITE.url}/ratgeber/${a.slug}`,
    image: `${SITE.url}/opengraph-image`,
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        crumbs={[
          { name: "Ratgeber", href: "/ratgeber" },
          { name: a.title, href: `/ratgeber/${a.slug}` },
        ]}
        eyebrow={`Ratgeber · ${a.readingMinutes} Min. Lesezeit`}
        lines={[a.title]}
        lead={a.intro}
      />
      <article className="wrap grid grid-cols-1 pb-20 lg:grid-cols-12">
        <div className="max-w-[68ch] space-y-12 text-lg leading-relaxed lg:col-span-8 lg:col-start-3">
          {a.sections.map((s) => (
            <section key={s.h} className="space-y-4">
              <h2 className="font-display text-3xl font-medium tracking-[-0.02em]">{s.h}</h2>
              {s.p.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {s.list && (
                <ul className="space-y-2 border-t border-ink/15 pt-4">
                  {s.list.map((l) => (
                    <li key={l} className="flex gap-3">
                      <span className="text-swiss-red" aria-hidden="true">✚</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <div className="flex flex-wrap gap-4 border-t border-ink/15 pt-10">
            <CtaLink href="/website-check" variant="red">Website kostenlos prüfen</CtaLink>
            <CtaLink href="/contact" variant="ghost">Erstgespräch vereinbaren</CtaLink>
          </div>
        </div>
      </article>
      <nav className="wrap pb-28" aria-label="Weitere Artikel">
        <p className="eyebrow mb-4 text-stone-muted">Weiterlesen</p>
        <ul className="grid gap-6 md:grid-cols-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/ratgeber/${o.slug}`} className="link-line font-display text-2xl tracking-[-0.02em]">
                {o.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
