import type { Metadata } from "next";
import LegalPage from "@/components/page/LegalPage";
import { getContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Wie SHAZWERK Personendaten auf dieser Website bearbeitet – nach Schweizer Datenschutzgesetz (DSG) und DSGVO.",
  alternates: { canonical: "/privacy" },
};

export default async function PrivacyPage() {
  const { settings: st } = await getContent();
  return (
    <LegalPage crumb="Datenschutz" href="/privacy" title="Datenschutz­erklärung" updated="Oktober 2026">
      <section>
        <h2>1. Verantwortlich</h2>
        <p>
          SHAZWERK{st.ownerName ? `, ${st.ownerName}` : ""}, {st.street}, {st.zip} {st.city}, Schweiz.
          <br />
          Kontakt für Datenschutzfragen: <a href={`mailto:${st.email}`}>{st.email}</a>
        </p>
        <p>
          Wir bearbeiten Personendaten nach dem Schweizer Bundesgesetz über den Datenschutz (DSG) und, soweit
          anwendbar, nach der EU-Datenschutz-Grundverordnung (DSGVO).
        </p>
      </section>

      <section>
        <h2>2. Besuchsstatistik auf dieser Website</h2>
        <p>
          Um zu verstehen, wie unsere Website genutzt wird, und um sie zu verbessern, erfassen wir mit einer eigenen
          Statistiklösung (ohne Google Analytics oder Werbenetzwerke) bei jedem Besuch:
        </p>
        <ul>
          <li>IP-Adresse sowie daraus abgeleitetes Land, Region und Stadt</li>
          <li>Gerätetyp, Betriebssystem, Browser, Bildschirmgrösse und Spracheinstellung</li>
          <li>aufgerufene Seiten, Verweildauer, Scrolltiefe und Herkunft (Referrer, Kampagnenparameter)</li>
          <li>Klicks auf Links und Schaltflächen (Text und Ziel des angeklickten Elements)</li>
          <li>eine zufällige Besucher-ID und Sitzungs-ID</li>
        </ul>
        <p>
          Die Besucher-ID speichern wir in einem eigenen Cookie (<code>_sw_vid</code>, Laufzeit 12 Monate) und im
          lokalen Speicher Ihres Browsers, damit wiederkehrende Besuche erkannt werden. Wir verwenden diese Daten
          ausschliesslich für eigene Auswertungen, geben sie nicht weiter und verknüpfen sie nur dann mit Ihrer
          Person, wenn Sie uns über das Kontaktformular schreiben. Gespeichert werden jeweils nur die letzten
          rund 15&apos;000 Ereignisse; ältere werden automatisch gelöscht.
        </p>
        <p>
          Sie können Cookies in Ihrem Browser jederzeit löschen oder blockieren. Die Website funktioniert auch ohne.
        </p>
      </section>

      <section>
        <h2>3. Kontaktformular und E-Mail</h2>
        <p>
          Wenn Sie uns schreiben, bearbeiten wir Ihre Angaben (Name, Unternehmen, E-Mail, Telefon, Nachricht), um
          Ihre Anfrage zu beantworten und ein mögliches Projekt vorzubereiten. Wir löschen die Daten, wenn sie dafür
          nicht mehr nötig sind, spätestens nach zwei Jahren ohne weiteren Kontakt.
        </p>
      </section>

      <section>
        <h2>4. Hosting und Dienstleister</h2>
        <p>
          Die Website wird bei Vercel Inc. (USA) betrieben, Statistik- und Formulardaten speichern wir bei Upstash
          (Datenbank). Dabei können Daten in Länder ausserhalb der Schweiz, auch in die USA, übermittelt werden.
          Wir stützen uns dafür auf die Standardvertragsklauseln der EU-Kommission bzw. das Swiss-U.S. Data Privacy
          Framework. Schriften werden von unserem eigenen Server geladen, nicht von Google.
        </p>
      </section>

      <section>
        <h2>5. Ihre Rechte</h2>
        <p>
          Sie können jederzeit Auskunft über Ihre bei uns gespeicherten Daten verlangen sowie deren Berichtigung,
          Löschung oder Herausgabe fordern und der Bearbeitung widersprechen. Schreiben Sie uns dazu an{" "}
          <a href={`mailto:${st.email}`}>{st.email}</a>. Sie haben zudem das Recht, sich beim Eidgenössischen
          Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) zu beschweren.
        </p>
      </section>
    </LegalPage>
  );
}
