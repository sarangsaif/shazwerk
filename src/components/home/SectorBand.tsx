import Marquee from "@/components/ui/Marquee";
import T from "@/components/i18n/T";

const WORDS = [
  { de: "Webdesign", en: "Web design" },
  { de: "Webentwicklung", en: "Web development" },
  { de: "Software", en: "Software" },
  { de: "Apps", en: "Apps" },
  { de: "Enterprise AI", en: "Enterprise AI" },
  { de: "Swiss Hosting", en: "Swiss hosting" },
  { de: "SEO", en: "SEO" },
];

export default function SectorBand() {
  return (
    <div className="border-y border-ink bg-swiss-red py-5 text-white" aria-label="Leistungen">
      <Marquee
        speed={36}
        className="font-display text-[clamp(2rem,5vw,4.5rem)] font-medium tracking-[-0.04em]"
        separator={<span className="mx-[0.4em] inline-block font-serif font-normal italic">✚</span>}
        items={WORDS.map((w) => (
          <T key={w.de} de={w.de} en={w.en} />
        ))}
      />
    </div>
  );
}
