import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/page/PageHero";
import { ARTICLES } from "@/lib/articles";
import { OG_IMAGES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ratgeber – Websites, SEO & Digitales für KMU",
  description: "Praxisnahe Antworten für Schweizer KMU: Was kostet eine Website, warum bringt sie keine Anfragen, wie wird man bei Google gefunden?",
  alternates: { canonical: "/ratgeber" },
  openGraph: { images: OG_IMAGES, title: "Ratgeber | SHAZWERK", url: "/ratgeber" },
};

export default function RatgeberPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Ratgeber", href: "/ratgeber" }]}
        eyebrow="Ratgeber · für KMU"
        lines={["Klare Antworten.", <span key="a" className="font-serif font-normal italic text-stone-muted">Ohne Fachchinesisch.</span>]}
        lead="Was eine Website kostet, warum sie keine Anfragen bringt und wie Sie bei Google gefunden werden."
      />
      <section className="wrap pb-28">
        <ul className="border-t border-ink/15">
          {ARTICLES.map((a, i) => (
            <li key={a.slug} className="border-b border-ink/15">
              <Link href={`/ratgeber/${a.slug}`} className="group grid grid-cols-12 items-baseline gap-4 py-8">
                <span className="eyebrow col-span-2 text-stone-muted sm:col-span-1">0{i + 1}</span>
                <span className="col-span-10 sm:col-span-8">
                  <span className="block font-display text-big font-medium transition-transform duration-700 ease-out-expo group-hover:translate-x-2">
                    {a.title}
                  </span>
                  <span className="mt-2 block text-stone-muted">{a.description}</span>
                </span>
                <span className="col-span-12 flex items-center justify-end gap-3 text-sm text-stone-muted sm:col-span-3">
                  {a.readingMinutes} Min.
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45 group-hover:text-swiss-red" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
