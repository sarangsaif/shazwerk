import { Plus } from "lucide-react";
import T from "@/components/i18n/T";
import { SITE, FaqItem } from "@/lib/content";

/** Visible FAQ with matching FAQPage structured data. */
export default function Faq({ items, index = "(05)" }: { items: FaqItem[]; index?: string }) {
  if (!items.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "de-CH",
    publisher: { "@id": `${SITE.url}/#organization` },
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q.de,
      acceptedAnswer: { "@type": "Answer", text: f.a.de },
    })),
  };

  return (
    <section className="wrap py-28 sm:py-40" aria-labelledby="faq-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-stone-muted">
            {index} <T de="Fragen" en="Questions" />
          </p>
          <h2 id="faq-title" className="mt-6 font-display text-huge font-medium lg:sticky lg:top-28">
            <T de="Häufige Fragen." en="Frequently asked." />
          </h2>
        </div>
        <div className="border-t border-ink/15 lg:col-span-8">
          {items.map((f, i) => (
            <details key={i} className="group border-b border-ink/15" data-reveal="up" style={{ ["--d" as string]: `${i * 60}ms` }}>
              <summary className="flex cursor-pointer items-start justify-between gap-6 py-7 font-display text-xl font-medium tracking-[-0.02em] sm:text-2xl">
                <span>
                  <T de={f.q.de} en={f.q.en} />
                </span>
                <Plus className="faq-icon mt-1 h-6 w-6 shrink-0 transition-transform duration-500 ease-out-expo" aria-hidden="true" />
              </summary>
              <p className="max-w-2xl pb-8 text-lg leading-relaxed text-stone-muted">
                <T de={f.a.de} en={f.a.en} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
