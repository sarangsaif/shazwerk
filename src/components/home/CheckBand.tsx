import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import T from "@/components/i18n/T";

/** Homepage call-to-action for the free website check. */
export default function CheckBand() {
  return (
    <section className="bg-swiss-red text-white" aria-labelledby="check-band">
      <Link
        href="/website-check"
        data-cursor="Check"
        className="wrap group grid grid-cols-1 items-end gap-8 py-20 sm:py-28 lg:grid-cols-12"
      >
        <div className="lg:col-span-8">
          <p className="eyebrow text-white/70">
            <T de="Gratis · 30 Sekunden" en="Free · 30 seconds" />
          </p>
          <h2 id="check-band" className="mt-4 font-display text-giant font-medium" data-reveal="up">
            <T de="Wie gut ist Ihre Website?" en="How good is your website?" />
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/85">
            <T
              de="Ladezeit, Google-Sichtbarkeit, Handy und Sicherheit – automatisch geprüft, mit konkreten Verbesserungen."
              en="Speed, Google visibility, mobile and security – checked automatically, with concrete improvements."
            />
          </p>
        </div>
        <span className="flex items-center gap-3 font-display text-2xl lg:col-span-4 lg:justify-end">
          <T de="Jetzt prüfen" en="Check now" />
          <ArrowUpRight className="h-10 w-10 transition-transform duration-500 ease-out-expo group-hover:rotate-45" aria-hidden="true" />
        </span>
      </Link>
    </section>
  );
}
