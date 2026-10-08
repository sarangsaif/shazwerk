import Link from "next/link";
import { SITE } from "@/lib/content";

export interface Crumb {
  name: string;
  href: string;
}

/** Visible breadcrumb trail + matching BreadcrumbList JSON-LD. */
export default function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE.url}${c.href === "/" ? "" : c.href}`,
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className={`eyebrow ${light ? "text-paper/60" : "text-stone-muted"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ol className="flex flex-wrap items-center gap-2">
        {all.map((c, i) => (
          <li key={c.href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === all.length - 1 ? (
              <span aria-current="page" className={light ? "text-paper" : "text-ink"}>
                {c.name}
              </span>
            ) : (
              <Link href={c.href} className="link-line">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
