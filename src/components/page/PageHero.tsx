import React from "react";
import Breadcrumbs, { Crumb } from "@/components/ui/Breadcrumbs";
import MaskText from "@/components/ui/MaskText";

/** Large editorial header used on all subpages. */
export default function PageHero({
  crumbs,
  eyebrow,
  lines,
  lead,
  aside,
}: {
  crumbs: Crumb[];
  eyebrow: React.ReactNode;
  lines: React.ReactNode[];
  lead?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="wrap pb-16 pt-36 sm:pb-24 sm:pt-44">
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-14">
        <span className="eyebrow intro-fade mb-6 block text-stone-muted" style={{ ["--d" as string]: "100ms" }}>
          {eyebrow}
        </span>
        <span className="block font-display text-giant font-medium">
          <MaskText lines={lines} intro />
        </span>
      </h1>
      {(lead || aside) && (
        <div className="intro-fade mt-14 grid grid-cols-1 gap-8 border-t hairline pt-6 lg:grid-cols-12" style={{ ["--d" as string]: "600ms" }}>
          {lead && <p className="max-w-xl text-xl leading-snug lg:col-span-6">{lead}</p>}
          {aside && <div className="lg:col-span-5 lg:col-start-8">{aside}</div>}
        </div>
      )}
    </section>
  );
}
