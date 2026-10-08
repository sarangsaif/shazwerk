import Link from "next/link";
import type { Metadata } from "next";
import CtaLink from "@/components/page/CtaLink";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[90vh] flex-col justify-end pb-20 pt-40">
      <p className="eyebrow text-stone-muted">Fehler 404</p>
      <h1 className="mt-6 font-display text-mega font-medium">
        <span className="mask intro-line"><span>Verirrt?</span></span>
      </h1>
      <div className="mt-12 flex flex-col gap-8 border-t hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-lg">
          Diese Seite gibt es nicht (mehr). Vielleicht finden Sie unter{" "}
          <Link href="/work" className="link-line">Arbeiten</Link> oder{" "}
          <Link href="/services" className="link-line">Leistungen</Link>, was Sie suchen.
        </p>
        <CtaLink href="/">Zur Startseite</CtaLink>
      </div>
    </section>
  );
}
