import T from "@/components/i18n/T";
import ScrollHighlight from "./ScrollHighlight";
import type { Bi } from "@/lib/content";

const STATS = [
  { value: "4–12", unit: { de: "Wochen", en: "weeks" }, label: { de: "von der Idee bis Go-Live", en: "from idea to launch" } },
  { value: "100", unit: { de: "%", en: "%" }, label: { de: "Quellcode-Eigentum für Sie", en: "source code ownership" } },
  { value: "0", unit: { de: "Bytes", en: "bytes" }, label: { de: "Ihrer Daten ausserhalb der Schweiz", en: "of your data outside Switzerland" } },
  { value: "<1", unit: { de: "Sek.", en: "sec" }, label: { de: "Ladezeit, grüne Core Web Vitals", en: "load time, green Core Web Vitals" } },
];

export default function Manifest({ manifesto }: { manifesto: Bi }) {
  return (
    <section id="manifest" className="wrap py-28 sm:py-40" aria-labelledby="manifest-title">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <h2 id="manifest-title" className="eyebrow text-stone-muted lg:col-span-3">
          (01) <T de="Das Studio" en="The studio" />
        </h2>
        <ScrollHighlight
          className="font-display text-big font-medium lg:col-span-9"
          de={manifesto.de}
          en={manifesto.en}
        />
      </div>

      <dl className="mt-24 grid grid-cols-2 border-t hairline lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={i}
            data-reveal="up"
            style={{ ["--d" as string]: `${i * 90}ms` }}
            className={`flex flex-col border-b hairline py-8 pr-4 lg:border-b-0 ${i > 0 ? "lg:border-l lg:pl-6" : ""} ${i % 2 === 1 ? "border-l pl-4 lg:pl-6" : ""}`}
          >
            <dt className="order-2 mt-3 text-sm text-stone-muted">
              <T de={s.label.de} en={s.label.en} />
            </dt>
            <dd className="order-1 font-display text-huge font-medium">
              {s.value}
              <span className="ml-1 font-serif text-[0.45em] font-normal italic text-stone-muted">
                <T de={s.unit.de} en={s.unit.en} />
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
