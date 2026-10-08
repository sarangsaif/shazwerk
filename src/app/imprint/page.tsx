import type { Metadata } from "next";
import LegalPage from "@/components/page/LegalPage";
import { getContent } from "@/lib/cms";
import { SITE, toE164 } from "@/lib/content";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von SHAZWERK, Webdesign- und Software-Studio in Winterthur.",
  alternates: { canonical: "/imprint" },
};

export default async function ImprintPage() {
  const { settings: st } = await getContent();
  return (
    <LegalPage crumb="Impressum" href="/imprint" title="Impressum" updated="Oktober 2026">
      <section>
        <h2>Anbieterin dieser Website</h2>
        <p>
          SHAZWERK
          {st.ownerName && (
            <>
              <br />
              Inhaber/in: {st.ownerName}
            </>
          )}
          <br />
          {st.street}
          <br />
          {st.zip} {st.city}
          <br />
          Schweiz
        </p>
        <p>
          SHAZWERK ist ein junges, nicht im Handelsregister eingetragenes Unternehmen (Start-up) und daher ohne
          UID- oder MWST-Nummer.
        </p>
      </section>
      <section>
        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href={`mailto:${st.email}`}>{st.email}</a>
          <br />
          Telefon: <a href={`tel:${toE164(st.phone)}`}>{st.phone}</a>
          <br />
          Website: {SITE.url.replace("https://", "")}
        </p>
      </section>
      <section>
        <h2>Haftungsausschluss</h2>
        <p>
          Wir prüfen die Inhalte dieser Website sorgfältig, übernehmen aber keine Gewähr für Richtigkeit,
          Vollständigkeit und Aktualität. Für Inhalte externer Links sind ausschliesslich deren Betreiber
          verantwortlich.
        </p>
      </section>
      <section>
        <h2>Urheberrecht</h2>
        <p>
          Texte, Gestaltung, Grafiken und Code dieser Website gehören SHAZWERK oder den jeweiligen Rechteinhabern.
          Jede Verwendung ausserhalb der gesetzlichen Schranken braucht unsere schriftliche Zustimmung.
        </p>
      </section>
    </LegalPage>
  );
}
