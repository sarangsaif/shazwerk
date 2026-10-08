import React from "react";
import PageHero from "./PageHero";

/** Plain, readable layout for legal pages. */
export default function LegalPage({
  crumb,
  href,
  title,
  updated,
  children,
}: {
  crumb: string;
  href: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero crumbs={[{ name: crumb, href }]} eyebrow={`Stand: ${updated}`} lines={[title]} />
      <article className="wrap grid grid-cols-1 pb-28 lg:grid-cols-12">
        <div className="legal max-w-[68ch] space-y-10 text-lg leading-relaxed lg:col-span-8 lg:col-start-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-[-0.02em] [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-4 [&_section>*+*]:mt-4 [&_a]:underline [&_a]:underline-offset-4">
          {children}
        </div>
      </article>
    </>
  );
}
