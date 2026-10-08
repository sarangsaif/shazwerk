import type { Metadata } from "next";
import T from "@/components/i18n/T";
import PageHero from "@/components/page/PageHero";
import CtaLink from "@/components/page/CtaLink";
import Marquee from "@/components/ui/Marquee";
import SwissCross from "@/components/ui/SwissCross";
import { CLIENT_SECTORS, OG_IMAGES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Studio – Unabhängige Webagentur aus Winterthur",
  description:
    "SHAZWERK ist ein junges, unabhängiges Design- und Engineering-Studio aus Winterthur. Persönliche Betreuung, Schweizer Gestaltung, Datenhaltung in der Schweiz und 100 % Quellcode-Eigentum für unsere Kunden.",
  alternates: { canonical: "/about" },
  openGraph: {
      images: OG_IMAGES,
    title: "Studio | SHAZWERK Zürich",
    description: "Unabhängiges Design- und Engineering-Studio aus Winterthur.",
    url: "/about",
  },
};

const PRINCIPLES = [
  {
    title: { de: "Form folgt Funktion.", en: "Form follows function." },
    text: {
      de: "Wie im Schweizer Grafikdesign: Raster, Hierarchie, Weissraum. Jedes Element muss seinen Platz verdienen.",
      en: "Just like Swiss graphic design: grid, hierarchy, white space. Every element has to earn its place.",
    },
  },
  {
    title: { de: "Klein, nicht kleinlich.", en: "Small, not small-minded." },
    text: {
      de: "Als junges Studio haben wir keine Projektmanager-Schichten. Sie sprechen jede Woche direkt mit der Person, die Ihr Produkt baut.",
      en: "As a young studio we have no layers of project managers. Every week you talk directly to the person building your product.",
    },
  },
  {
    title: { de: "Millisekunden zählen.", en: "Milliseconds matter." },
    text: {
      de: "Performance ist Gestaltung. Wir budgetieren Ladezeiten so streng wie Kosten – für Nutzer und für Google.",
      en: "Performance is design. We budget load times as strictly as costs – for users and for Google.",
    },
  },
  {
    title: { de: "Ihr Code. Ihre Daten.", en: "Your code. Your data." },
    text: {
      de: "100 % IP-Übertragung, keine proprietären Baukästen, Hosting in der Schweiz. Kein Lock-in.",
      en: "100% IP transfer, no proprietary builders, hosting in Switzerland. No lock-in.",
    },
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Studio", href: "/about" }]}
        eyebrow={<T de="Studio · Winterthur" en="Studio · Winterthur" />}
        lines={[
          <T key="a" de="Schweizer Gestaltung." en="Swiss design." />,
          <span key="b" className="font-serif font-normal italic text-stone-muted">
            <T de="Digitales Handwerk." en="Digital craft." />
          </span>,
        ]}
        lead={
          <T
            de="SHAZWERK ist ein junges, unabhängiges Studio für Design und Engineering aus Winterthur. Wir arbeiten für KMU, Start-ups und Unternehmen in der Region Zürich und der ganzen Schweiz, die digital nicht Mittelmass sein wollen."
            en="SHAZWERK is a young, independent design and engineering studio from Winterthur. We work for SMEs, start-ups and companies around Zurich and across Switzerland that refuse to be average online."
          />
        }
      />

      <section className="wrap pb-28" aria-labelledby="principles-title">
        <h2 id="principles-title" className="eyebrow mb-10 text-stone-muted">
          <T de="Prinzipien" en="Principles" />
        </h2>
        <div className="grid grid-cols-1 border-t border-ink/15 md:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <div
              key={i}
              data-reveal="up"
              style={{ ["--d" as string]: `${(i % 2) * 100}ms` }}
              className={`border-b border-ink/15 py-12 md:pr-12 ${i % 2 === 1 ? "md:border-l md:pl-12" : ""}`}
            >
              <span className="font-display text-sm text-swiss-red">0{i + 1}</span>
              <h3 className="mt-6 font-display text-big font-medium"><T de={p.title.de} en={p.title.en} /></h3>
              <p className="mt-4 max-w-md text-lg text-stone-muted"><T de={p.text.de} en={p.text.en} /></p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-swiss-red py-28 text-white sm:py-40" aria-labelledby="swiss-title">
        <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-12">
          <SwissCross className="h-20 w-20 text-white [&_path]:fill-swiss-red lg:col-span-2" />
          <div className="lg:col-span-9 lg:col-start-4">
            <h2 id="swiss-title" className="font-display text-giant font-medium" data-reveal="up">
              <T de="Warum Swiss made zählt." en="Why Swiss made matters." />
            </h2>
            <p className="mt-10 max-w-2xl text-xl leading-relaxed text-white/85">
              <T
                de="Die Schweiz steht für Präzision, Verlässlichkeit und Diskretion. Genau das erwarten unsere Kunden auch von ihrer Software: Datenhaltung in der Schweiz, Konformität mit dem revidierten Datenschutzgesetz (nDSG), Verträge nach Schweizer Recht – und Ansprechpartner in derselben Zeitzone."
                en="Switzerland stands for precision, reliability and discretion. Our clients expect exactly that from their software: Swiss data residency, compliance with the revised Data Protection Act (nDSG), contracts under Swiss law – and people in the same time zone."
              />
            </p>
          </div>
        </div>
      </section>

      <section className="py-20" aria-label="Branchen">
        <p className="wrap eyebrow mb-8 text-stone-muted"><T de="Branchen, für die wir arbeiten" en="Industries we work in" /></p>
        <Marquee speed={45} className="font-display text-[clamp(2.5rem,6vw,6rem)] font-medium tracking-[-0.04em]" items={CLIENT_SECTORS} />
      </section>

      <section className="wrap flex flex-col items-start gap-8 pb-28 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-display text-huge font-medium" data-reveal="up">
          <T de="Lernen wir uns kennen." en="Let’s get to know each other." />
        </h2>
        <CtaLink href="/contact"><T de="Kontakt aufnehmen" en="Get in touch" /></CtaLink>
      </section>
    </>
  );
}
