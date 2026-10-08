import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import T from "@/components/i18n/T";
import MaskText from "@/components/ui/MaskText";
import { SERVICES } from "@/lib/content";

/** Large service rows that expand on hover / focus (always expanded on touch). */
export default function ServicesList({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section className="wrap py-28 sm:py-40" aria-labelledby={withHeading ? "services-title" : undefined}>
      {withHeading && (
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <p className="eyebrow text-stone-muted lg:col-span-3">
            (03) <T de="Leistungen" en="Services" />
          </p>
          <h2 id="services-title" className="font-display text-giant font-medium lg:col-span-9" data-reveal="mask">
            <MaskText
              lines={[
                <T key="a" de="Von der Idee" en="From first idea" />,
                <span key="b">
                  <span className="font-serif font-normal italic text-stone-muted"><T de="bis zum" en="to" /></span>{" "}
                  <T de="Betrieb." en="operations." />
                </span>,
              ]}
            />
          </h2>
        </div>
      )}

      <ul className="border-t border-ink/15">
        {SERVICES.map((s) => (
          <li key={s.slug} className="group border-b border-ink/15">
            <div className="relative grid grid-cols-12 gap-4 py-8 transition-colors duration-500 sm:py-10">
              <span className="eyebrow col-span-2 pt-3 text-stone-muted sm:col-span-1">{s.num}</span>
              <h3 className="col-span-9 font-display text-huge font-medium transition-transform duration-700 ease-out-expo group-hover:translate-x-2 sm:col-span-10">
                <T de={s.title.de} en={s.title.en} />
              </h3>
              <span className="col-span-1 flex justify-end pt-3" aria-hidden="true">
                <Plus className="h-6 w-6 transition-transform duration-700 ease-out-expo group-hover:rotate-45 group-hover:text-swiss-red" />
              </span>

              <div className="col-span-12 grid transition-[grid-template-rows] duration-700 ease-out-expo sm:col-span-11 sm:col-start-2 [@media(hover:hover)_and_(min-width:1024px)]:grid-rows-[0fr] [@media(hover:hover)_and_(min-width:1024px)]:group-hover:grid-rows-[1fr] [@media(hover:hover)_and_(min-width:1024px)]:group-focus-within:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="grid grid-cols-1 gap-8 pt-6 md:grid-cols-11">
                    <p className="text-lg leading-snug md:col-span-5">
                      <T de={s.lead.de} en={s.lead.en} />
                    </p>
                    <ul className="space-y-1.5 text-sm text-stone-muted md:col-span-3">
                      {s.items.de.map((item, i) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-swiss-red" aria-hidden="true">✚</span>
                          <T de={item} en={s.items.en[i]} />
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col items-start justify-between gap-4 md:col-span-3">
                      <p className="eyebrow text-stone-muted">{s.tech.join(" · ")}</p>
                      {s.href && (
                        <Link href={s.href} className="link-line flex items-center gap-1 text-sm">
                          <T de="Mehr erfahren" en="Learn more" />
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
