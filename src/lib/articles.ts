// SEO guide articles (German). Each answers a question Swiss SME owners search for.

export interface Article {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  published: string;
  readingMinutes: number;
  intro: string;
  sections: { h: string; p: string[]; list?: string[] }[];
}

export const ARTICLES: Article[] = [
  {
    slug: "was-kostet-eine-website-schweiz",
    title: "Was kostet eine Website in der Schweiz?",
    description:
      "Preise für eine Firmenwebsite in der Schweiz verständlich erklärt: wovon die Kosten abhängen, welche laufenden Kosten anfallen und wie Sie Angebote richtig vergleichen.",
    keywords: ["Was kostet eine Website Schweiz", "Website Kosten", "Homepage Preis Schweiz", "Website erstellen lassen Kosten"],
    published: "2026-10-09",
    readingMinutes: 5,
    intro:
      "«Was kostet eine Website?» ist die häufigste Frage, die uns KMU stellen – und die ehrliche Antwort lautet: Es kommt darauf an. Damit Sie Angebote trotzdem einschätzen können, zeigen wir, wovon der Preis abhängt und worauf Sie achten sollten.",
    sections: [
      {
        h: "Die vier grössten Preistreiber",
        p: ["Der Preis einer Website hängt weniger von der Anzahl Seiten ab als von diesen Faktoren:"],
        list: [
          "Individuelles Design oder Vorlage: Ein eigenes Design braucht mehr Zeit, wirkt aber unverwechselbar.",
          "Inhalte: Wer liefert Texte und Bilder? Professionelle Texte und Fotos sind oft der unterschätzte Kostenpunkt.",
          "Funktionen: Buchungssystem, Shop, Mehrsprachigkeit (DE/FR/IT/EN) oder Anbindungen an andere Systeme.",
          "Sichtbarkeit: Technisches SEO, Google-Unternehmensprofil und schnelle Ladezeiten sind keine Extras, sondern entscheiden, ob Sie gefunden werden.",
        ],
      },
      {
        h: "Laufende Kosten nicht vergessen",
        p: [
          "Neben der einmaligen Erstellung fallen jährlich Kosten für Domain, Hosting und Wartung an. Bei Baukästen kommen monatliche Abo-Gebühren dazu, die über die Jahre oft teurer werden als eine eigene Lösung.",
          "Fragen Sie deshalb immer nach den Gesamtkosten über drei Jahre – nicht nur nach dem Startpreis.",
        ],
      },
      {
        h: "So vergleichen Sie Angebote richtig",
        p: ["Ein günstiges Angebot ist nur dann günstig, wenn es Ihr Ziel erreicht. Prüfen Sie bei jeder Offerte:"],
        list: [
          "Gehört Ihnen der Quellcode und das Design nach Projektende?",
          "Ist ein Festpreis vereinbart oder wird nach Aufwand abgerechnet?",
          "Ist die Website für Handys optimiert und schnell (Google Lighthouse über 90)?",
          "Wo wird gehostet – in der Schweiz und nach Datenschutzgesetz (DSG)?",
          "Sind SEO-Grundlagen und eine Weiterleitung alter Seiten (bei einem Relaunch) enthalten?",
        ],
      },
      {
        h: "Unser Vorgehen",
        p: [
          "Bei SHAZWERK erhalten Sie nach einem kostenlosen Erstgespräch einen Festpreis pro Meilenstein. So wissen Sie vor dem Start genau, was Sie bekommen – und was es kostet. Wenn Sie schon eine Website haben, lohnt sich vorher unser kostenloser Website-Check: Er zeigt, was wirklich verbessert werden muss.",
        ],
      },
    ],
  },
  {
    slug: "website-bringt-keine-anfragen",
    title: "Warum Ihre Website keine Anfragen bringt – und wie Sie das ändern",
    description:
      "Viele KMU-Websites werden besucht, bringen aber keine Anfragen. Die sieben häufigsten Gründe und was Sie sofort dagegen tun können.",
    keywords: ["Website bringt keine Kunden", "mehr Anfragen über Website", "Website Conversion", "Website verbessern KMU"],
    published: "2026-10-09",
    readingMinutes: 6,
    intro:
      "Eine Website, die keine Anfragen bringt, ist eine teure Visitenkarte. Meist liegt es nicht am Angebot, sondern an wenigen, gut behebbaren Fehlern. Hier sind die sieben häufigsten.",
    sections: [
      {
        h: "1. Sie lädt zu langsam",
        p: [
          "Über die Hälfte der Besucher springt ab, wenn eine Seite auf dem Handy länger als drei Sekunden lädt. Grosse Bilder, schwere Baukästen und viele Plugins sind die üblichen Bremsen.",
        ],
      },
      {
        h: "2. Sie ist nicht fürs Handy gemacht",
        p: ["Die meisten Besuche kommen heute vom Smartphone. Winzige Schrift, zu kleine Knöpfe oder seitliches Scrollen kosten Sie Kunden."],
      },
      {
        h: "3. Niemand versteht in fünf Sekunden, was Sie anbieten",
        p: ["Die Startseite muss sofort beantworten: Was machen Sie, für wen, und wo? «Willkommen auf unserer Website» beantwortet nichts davon."],
      },
      {
        h: "4. Es gibt keinen klaren nächsten Schritt",
        p: [
          "Jede Seite braucht einen sichtbaren Aufruf: anrufen, WhatsApp schreiben, Termin buchen oder Offerte anfragen. Ein verstecktes Kontaktformular reicht nicht.",
        ],
      },
      {
        h: "5. Google findet Sie nicht",
        p: [
          "Fehlende Seitentitel, keine Beschreibung, kein Google-Unternehmensprofil: Dann erscheinen Ihre Mitbewerber statt Sie, wenn jemand «Elektriker Winterthur» sucht.",
        ],
      },
      {
        h: "6. Es fehlt Vertrauen",
        p: ["Echte Fotos, Kundenstimmen, Bewertungen und ein vollständiges Impressum machen den Unterschied zwischen «klingt gut» und «rufe ich an»."],
      },
      {
        h: "7. Sie wirkt veraltet",
        p: ["Ein Copyright von vor fünf Jahren oder ein Design aus der Baukasten-Zeit lässt Besucher zweifeln, ob es Ihr Unternehmen noch gibt."],
      },
      {
        h: "Wo steht Ihre Website?",
        p: [
          "Unser kostenloser Website-Check prüft viele dieser Punkte automatisch in 30 Sekunden – Ladezeit, Handy, Google und Sicherheit. Auf Wunsch erhalten Sie danach einen persönlichen Verbesserungsplan.",
        ],
      },
    ],
  },
  {
    slug: "website-erstellen-lassen-winterthur",
    title: "Website erstellen lassen in Winterthur: Checkliste für KMU",
    description:
      "Sie möchten eine neue Website für Ihr Unternehmen in Winterthur? Diese Checkliste zeigt, was Sie vorbereiten sollten, welche Fragen Sie einer Agentur stellen und wie der Ablauf aussieht.",
    keywords: ["Website erstellen lassen Winterthur", "Webdesign Winterthur", "Webagentur Winterthur", "Homepage erstellen Winterthur"],
    published: "2026-10-09",
    readingMinutes: 4,
    intro:
      "Eine neue Website ist eine Investition für die nächsten Jahre. Mit guter Vorbereitung geht es schneller, wird günstiger – und das Ergebnis bringt mehr Kunden. Diese Checkliste hilft Ihnen dabei.",
    sections: [
      {
        h: "Vorbereitung: diese fünf Dinge klären",
        p: [],
        list: [
          "Ziel: Was soll die Website bringen – Anrufe, Terminbuchungen, Offertanfragen, Bewerbungen?",
          "Zielgruppe: Wer sind Ihre besten Kunden, und wonach suchen sie bei Google?",
          "Inhalte: Welche Texte, Fotos und Referenzen haben Sie schon?",
          "Beispiele: Zwei, drei Websites, die Ihnen gefallen (auch aus anderen Branchen).",
          "Budget & Zeitplan: Bis wann muss die Website online sein?",
        ],
      },
      {
        h: "Fragen, die Sie jeder Agentur stellen sollten",
        p: [],
        list: [
          "Gehören mir Design und Code nach dem Projekt?",
          "Kann ich Inhalte selbst ändern?",
          "Wo wird die Website gehostet, und wer kümmert sich um Updates und Sicherheit?",
          "Wie sorgen Sie dafür, dass ich bei Google in Winterthur gefunden werde?",
          "Gibt es einen Festpreis?",
        ],
      },
      {
        h: "Der Ablauf bei SHAZWERK",
        p: [
          "Wir sind ein junges Studio aus Winterthur und arbeiten in vier Schritten: Erstgespräch und Ziele, Design-Entwurf zum Durchklicken, Umsetzung mit wöchentlicher Vorschau und Go-Live inklusive Google-Unternehmensprofil. Eine typische KMU-Website ist in vier bis sechs Wochen online.",
          "Treffen sind gerne persönlich in Winterthur und Umgebung möglich – oder per Video.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}
