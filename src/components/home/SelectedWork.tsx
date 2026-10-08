import Link from "next/link";
import T from "@/components/i18n/T";
import WorkIndex from "./WorkIndex";
import MaskText from "@/components/ui/MaskText";

export default function SelectedWork() {
  return (
    <section className="bg-ink py-28 text-paper sm:py-40" aria-labelledby="work-title">
      <div className="wrap">
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <p className="eyebrow text-paper/50 lg:col-span-3">
            (02) <T de="Ausgewählte Arbeiten" en="Selected work" />
          </p>
          <h2 id="work-title" className="font-display text-giant font-medium lg:col-span-9" data-reveal="mask">
            <MaskText
              lines={[
                <T key="a" de="Systeme, die" en="Systems that" />,
                <span key="b" className="font-serif font-normal italic text-paper/60">
                  <T de="täglich liefern." en="deliver daily." />
                </span>,
              ]}
            />
          </h2>
        </div>
        <WorkIndex />
        <div className="mt-12 flex justify-end">
          <Link href="/work" className="btn btn-ghost-light">
            <span className="roll">
              <span>
                <span><T de="Alle Projekte" en="All projects" /></span>
                <span aria-hidden="true"><T de="Alle Projekte" en="All projects" /></span>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
