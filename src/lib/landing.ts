// High-intent SEO landing pages (German, Swiss market).

export interface LandingPage {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  h1Accent: string;
  lead: string;
  serviceName: string;
  pillars: { title: string; text: string }[];
  bodyTitle: string;
  body: string[];
  checklist: string[];
  faq: { q: string; a: string }[];
  projects: string[];
  cta: string;
}

const CITIES = ["Winterthur", "Zürich", "Frauenfeld", "Schaffhausen", "St. Gallen", "Zug", "Basel", "Bern", "Luzern"];

export const AREA_SERVED = CITIES;

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: "webagentur-winterthur",
    metaTitle: "Webagentur Winterthur – Webdesign & Webentwicklung",
    metaDescription:
      "Webagentur in Winterthur für Webdesign, Websites, Webapplikationen und SEO. Persönlich, schnell und mit Schweizer Hosting – für KMU, Start-ups und Unternehmen in Winterthur und Umgebung.",
    keywords: ["Webagentur Winterthur", "Webdesign Winterthur", "Website erstellen lassen Winterthur", "Webentwicklung Winterthur", "SEO Winterthur"],
    eyebrow: "Webagentur · Winterthur",
    h1: "Webagentur Winterthur.",
    h1Accent: "Persönlich und präzise.",
    lead: "Wir sind ein junges Studio aus Winterthur und gestalten Websites und Webapplikationen für Unternehmen aus der Region – mit kurzen Wegen, festen Preisen und Hosting in der Schweiz.",
    serviceName: "Webdesign & Webentwicklung Winterthur",
    pillars: [
      { title: "Lokal & persönlich", text: "Ein Ansprechpartner von der ersten Idee bis zum Go-Live. Treffen in Winterthur oder per Video – wie es Ihnen passt." },
      { title: "Design, das auffällt", text: "Individuelles Webdesign im Schweizer Stil statt Baukasten-Vorlage – damit Ihr Unternehmen im Gedächtnis bleibt." },
      { title: "Gefunden werden", text: "Technisches SEO, lokale Einträge und schnelle Ladezeiten, damit Kundinnen und Kunden aus Winterthur Sie bei Google finden." },
    ],
    bodyTitle: "Eine Website für Ihr Unternehmen in Winterthur",
    body: [
      "Ob Handwerksbetrieb, Praxis, Restaurant, Start-up oder Industrie-KMU: Ihre Website ist oft der erste Kontakt mit neuen Kundinnen und Kunden. Sie muss schnell laden, auf dem Handy perfekt funktionieren und klar zeigen, warum man gerade Sie anfragen sollte.",
      "Als Webagentur in Winterthur bauen wir genau solche Websites – individuell gestaltet, technisch sauber und für Google optimiert. Sie erhalten einen festen Preis pro Meilenstein und behalten 100 % der Rechte an Design und Code.",
    ],
    checklist: ["Individuelles Webdesign", "Optimiert für Smartphones", "Lokales SEO für Winterthur", "Google Business Profil", "Hosting in der Schweiz", "Pflege & Support"],
    faq: [
      { q: "Was kostet eine Website in Winterthur?", a: "Das hängt von Umfang und Funktionen ab. Nach einem kostenlosen Erstgespräch erhalten Sie ein verbindliches Festpreis-Angebot." },
      { q: "Können wir uns persönlich treffen?", a: "Ja, gerne in Winterthur oder Umgebung – oder per Videocall, wenn das für Sie einfacher ist." },
      { q: "Helfen Sie auch bei Google und lokalen Einträgen?", a: "Ja. Wir richten technisches SEO, strukturierte Daten und Ihr Google Business Profil ein, damit Sie in Winterthur besser gefunden werden." },
    ],
    projects: ["alpine-dynamics", "helvetia-biosystems"],
    cta: "Erstgespräch vereinbaren",
  },
  {
    slug: "webagentur-zuerich",
    metaTitle: "Webagentur Zürich – Websites & Webplattformen mit Next.js",
    metaDescription:
      "Webagentur in Zürich für hochwertige Websites, Portale und Webapplikationen. Award-würdiges Design, Next.js, Top Core Web Vitals und SEO von Anfang an. Jetzt Erstgespräch vereinbaren.",
    keywords: ["Webagentur Zürich", "Webentwicklung Zürich", "Website erstellen lassen Zürich", "Next.js Agentur Schweiz", "Webagentur Schweiz"],
    eyebrow: "Webagentur · Zürich",
    h1: "Webagentur Zürich für Websites,",
    h1Accent: "die gefunden werden.",
    lead: "Wir gestalten und entwickeln Websites und Webplattformen für Schweizer Unternehmen – schnell, barrierefrei, suchmaschinenoptimiert und ohne Template-Kompromisse.",
    serviceName: "Webentwicklung & Webdesign",
    pillars: [
      { title: "Ladezeit unter einer Sekunde", text: "Server Components, Edge-Caching und optimierte Bilder für grüne Core Web Vitals – ein direkter Google-Rankingfaktor." },
      { title: "SEO ab dem ersten Pixel", text: "Saubere Informationsarchitektur, strukturierte Daten (Schema.org), lokale Signale und Redirect-Planung bei Relaunches." },
      { title: "Inhalte selbst pflegen", text: "Headless CMS nach Wahl (Sanity, Storyblok, Payload) – mehrsprachig für DE, FR, IT und EN." },
    ],
    bodyTitle: "Warum Unternehmen in Zürich mit uns ihre Website neu bauen",
    body: [
      "Eine Website ist heute der erste Eindruck, der wichtigste Vertriebskanal und oft das Herz der Kundenbeziehung. Trotzdem setzen viele Agenturen auf schwere Baukästen, die langsam laden, schlecht ranken und sich kaum weiterentwickeln lassen.",
      "Von Winterthur aus arbeiten wir für Unternehmen in Zürich und der ganzen Deutschschweiz. Wir verbinden Schweizer Gestaltung mit moderner Technologie. Jede Seite wird individuell entworfen, mit Next.js umgesetzt und auf Schweizer Servern betrieben. Das Ergebnis: Websites, die Besucher beeindrucken, bei Google sichtbar sind und mit Ihrem Unternehmen wachsen.",
    ],
    checklist: ["Individuelles Design statt Template", "Mehrsprachig (de-CH, fr-CH, it-CH, en)", "Hosting in der Schweiz", "Barrierefrei nach WCAG 2.2", "Tracking ohne Cookie-Banner möglich", "100 % Quellcode-Eigentum"],
    faq: [
      { q: "Was kostet eine Website bei einer Webagentur in Zürich?", a: "Das hängt von Umfang, Sprachen und Funktionen ab. Nach einem kostenlosen Erstgespräch erhalten Sie ein Festpreis-Angebot pro Meilenstein – ohne versteckte Kosten." },
      { q: "Wie lange dauert ein Website-Relaunch?", a: "Eine Markenwebsite ist typischerweise in 4 bis 6 Wochen live. Umfangreiche Portale mit Integrationen planen wir in 8 bis 12 Wochen." },
      { q: "Verlieren wir beim Relaunch unsere Google-Rankings?", a: "Nein. Wir erstellen eine vollständige Redirect-Map, übernehmen Metadaten und überwachen die Indexierung in der Google Search Console nach dem Go-Live." },
    ],
    projects: ["alpine-dynamics", "helvetia-biosystems"],
    cta: "Webprojekt besprechen",
  },
  {
    slug: "webdesign-agentur-schweiz",
    metaTitle: "Webdesign Agentur Schweiz – Preisgekröntes Design, Swiss Style",
    metaDescription:
      "Webdesign Agentur in der Schweiz für Art Direction, UI/UX und Design Systems. Klare Typografie, präzises Raster und Interaktionen auf Award-Niveau – für Marken in Zürich, Basel, Bern und Genf.",
    keywords: ["Webdesign Agentur Schweiz", "Webdesign Zürich", "UX Agentur Schweiz", "UI Design Agentur Zürich", "Design System Agentur"],
    eyebrow: "Webdesign · Schweiz",
    h1: "Webdesign Agentur Schweiz.",
    h1Accent: "Swiss Style, digital.",
    lead: "Wir übersetzen den Internationalen Typografischen Stil in digitale Erlebnisse: radikal klar, typografisch präzise und mit Interaktionen, die in Erinnerung bleiben.",
    serviceName: "Webdesign, UI/UX & Design Systems",
    pillars: [
      { title: "Art Direction", text: "Ein visuelles System, das Ihre Marke unverwechselbar macht – von Typografie über Farbe bis zur Bewegung." },
      { title: "UI/UX & Prototyping", text: "Nutzerforschung, Informationsarchitektur und klickbare Prototypen, getestet mit echten Nutzern." },
      { title: "Design Systems", text: "Token-basierte Komponentenbibliotheken in Figma und Code, damit Ihr Team konsistent und schnell weiterbaut." },
    ],
    bodyTitle: "Gestaltung, die verkauft – nicht nur gefällt",
    body: [
      "Gutes Webdesign ist kein Selbstzweck. Es führt Besucher zur richtigen Information, schafft Vertrauen und macht aus Interesse eine Anfrage. Deshalb beginnt jedes Projekt bei uns mit Zielen und Nutzern, nicht mit Moodboards.",
      "Unsere Wurzeln liegen in der Schweizer Grafik von Müller-Brockmann und Hofmann: Raster, Hierarchie, Weissraum. Kombiniert mit flüssigen Animationen und mutiger Typografie entstehen Websites auf Awwwards-Niveau, die gleichzeitig schnell laden und barrierefrei bleiben.",
    ],
    checklist: ["Art Direction & Bildsprache", "Motion Design & Micro-Interactions", "Responsive bis 4K", "Barrierefreiheit WCAG 2.2 AA", "Design Tokens in Figma & Code", "Usability-Tests mit Nutzern"],
    faq: [
      { q: "Was unterscheidet Swiss Style Webdesign?", a: "Klare Raster, starke Typografie, viel Weissraum und eine konsequente Hierarchie. Das Ergebnis ist zeitlos, gut lesbar und lenkt den Fokus auf Ihre Inhalte." },
      { q: "Machen Animationen eine Website langsam?", a: "Nicht bei uns. Wir animieren mit GPU-beschleunigten CSS-Transforms, respektieren «Bewegung reduzieren» und halten die Core Web Vitals im grünen Bereich." },
      { q: "Arbeiten Sie mit bestehenden Corporate Designs?", a: "Ja. Wir erweitern bestehende CI-Richtlinien um digitale Regeln für Interaktion, Bewegung und Komponenten." },
    ],
    projects: ["helvetia-biosystems", "gotthard-mobility"],
    cta: "Designprojekt anfragen",
  },
  {
    slug: "software-agentur-zuerich",
    metaTitle: "Software Agentur Zürich – Individuelle Softwareentwicklung",
    metaDescription:
      "Software Agentur in Zürich für individuelle Softwareentwicklung, Webapplikationen und Prozessautomatisierung. persönliche Betreuung, Festpreise pro Meilenstein, 100 % Quellcode-Eigentum und Hosting in der Schweiz.",
    keywords: ["Software Agentur Zürich", "Softwareentwicklung Zürich", "Individualsoftware Schweiz", "Softwareentwicklung Schweiz", "Software Firma Zürich"],
    eyebrow: "Softwareentwicklung · Zürich",
    h1: "Software Agentur Zürich.",
    h1Accent: "Gebaut für den Betrieb.",
    lead: "Individualsoftware für Prozesse, die Standardlösungen nicht abbilden: Webapplikationen, interne Tools, Schnittstellen und die Modernisierung gewachsener Systeme.",
    serviceName: "Individuelle Softwareentwicklung",
    pillars: [
      { title: "Direkter Draht", text: "Kein Offshoring, keine Projektmanager-Schichten. Sie arbeiten direkt mit der Person, die Ihre Software baut." },
      { title: "Festpreis pro Meilenstein", text: "Klare Etappen, klare Kosten. Jeden Freitag eine lauffähige Version auf Staging." },
      { title: "Ihr Code, Ihre Daten", text: "100 % IP-Übertragung, dokumentierte Architektur und Hosting in Schweizer Rechenzentren." },
    ],
    bodyTitle: "Softwareentwicklung, die sich rechnet",
    body: [
      "Viele Schweizer Unternehmen arbeiten mit Excel-Listen, Insellösungen und Altsystemen, die niemand mehr anfassen möchte. Individualsoftware schafft hier messbaren Mehrwert: weniger manuelle Arbeit, weniger Fehler, bessere Entscheidungen.",
      "Als Software Agentur in Zürich entwickeln wir mit TypeScript, Next.js, Node.js und PostgreSQL – bewährte, langlebige Technologien mit grosser Entwickler-Community. So bleibt Ihre Software auch in zehn Jahren wartbar, egal ob wir oder Ihr eigenes Team sie weiterführen.",
    ],
    checklist: ["Webapplikationen & Portale", "Interne Tools & Dashboards", "ERP-, CRM- & API-Integration", "Modernisierung von Legacy-Systemen", "Automatisierte Tests & CI/CD", "Wartung & Weiterentwicklung"],
    faq: [
      { q: "Wann lohnt sich Individualsoftware?", a: "Wenn Standardsoftware Ihre Prozesse nur mit teuren Workarounds abbildet, wenn Sie sich vom Wettbewerb differenzieren wollen oder wenn Lizenzkosten mit jedem Nutzer steigen." },
      { q: "Können Sie bestehende Software übernehmen?", a: "Ja. Wir starten mit einem Architektur-Audit von 1 bis 2 Wochen und erstellen danach eine priorisierte Roadmap für Stabilisierung und Modernisierung." },
      { q: "Welche Technologien setzen Sie ein?", a: "Primär TypeScript, React/Next.js, Node.js, Python und PostgreSQL – betrieben auf AWS Zürich, Exoscale oder Ihrer eigenen Infrastruktur." },
    ],
    projects: ["zurich-fintech", "gotthard-mobility"],
    cta: "Softwareprojekt besprechen",
  },
  {
    slug: "app-entwicklung-schweiz",
    metaTitle: "App Entwicklung Schweiz – iOS, Android & Web Apps",
    metaDescription:
      "App Entwicklung in der Schweiz: native und plattformübergreifende Apps für iOS, Android und Web. Von der Idee über UX und Entwicklung bis zum Store-Release – aus Zürich.",
    keywords: ["App Entwicklung Schweiz", "App Agentur Zürich", "App entwickeln lassen Schweiz", "iOS Android Entwicklung Schweiz", "React Native Agentur"],
    eyebrow: "App-Entwicklung · Schweiz",
    h1: "App Entwicklung Schweiz.",
    h1Accent: "Von der Idee in den Store.",
    lead: "Wir entwickeln Apps für iOS, Android und das Web aus einer Codebasis – mit nativer Performance, durchdachter UX und einem sauberen Backend dahinter.",
    serviceName: "App-Entwicklung iOS, Android & Web",
    pillars: [
      { title: "Eine Codebasis", text: "React Native und Expo für iOS und Android – schneller am Markt, günstiger im Unterhalt." },
      { title: "UX, die hält", text: "Prototypen und Nutzertests vor der Entwicklung, damit die App vom ersten Tag an verstanden wird." },
      { title: "Backend inklusive", text: "APIs, Authentifizierung, Push-Notifications und Admin-Oberfläche – gehostet in der Schweiz." },
    ],
    bodyTitle: "Apps, die genutzt werden",
    body: [
      "Die meisten Apps scheitern nicht an der Technik, sondern daran, dass sie niemand ein zweites Mal öffnet. Deshalb definieren wir mit Ihnen zuerst den Kernnutzen und testen ihn mit echten Nutzern.",
      "Anschliessend entwickeln wir in zweiwöchigen Sprints mit TestFlight- und Play-Console-Builds, sodass Sie den Fortschritt jederzeit auf dem eigenen Gerät prüfen können. Nach dem Release begleiten wir Sie mit Analytics, Updates und Weiterentwicklung.",
    ],
    checklist: ["iOS & Android (React Native)", "Progressive Web Apps", "Offline-Fähigkeit", "Push & In-App-Messaging", "App Store & Play Store Release", "Analytics ohne Datenabfluss"],
    faq: [
      { q: "Native oder plattformübergreifend?", a: "Für die meisten Business-Apps empfehlen wir React Native: eine Codebasis, nahezu native Performance und deutlich tiefere Unterhaltskosten." },
      { q: "Wie lange dauert die Entwicklung einer App?", a: "Ein erster marktfähiger Release (MVP) ist typischerweise in 8 bis 12 Wochen im Store." },
      { q: "Übernehmen Sie die Veröffentlichung im App Store?", a: "Ja – inklusive Store-Texten, Screenshots, Datenschutzangaben und Review-Prozess bei Apple und Google." },
    ],
    projects: ["alpine-dynamics", "gotthard-mobility"],
    cta: "App-Idee besprechen",
  },
  {
    slug: "enterprise-ai-schweiz",
    metaTitle: "Enterprise AI Schweiz – Private LLMs & nDSG-konforme KI",
    metaDescription:
      "Enterprise AI aus Zürich: private Sprachmodelle, RAG-Wissenssuche und KI-Agenten, betrieben in Schweizer Rechenzentren. nDSG- und FINMA-konform, ohne Datenabfluss ins Ausland.",
    keywords: ["Enterprise AI Schweiz", "KI Agentur Zürich", "Private LLM Schweiz", "AI Agentur Schweiz", "nDSG konforme KI", "RAG Schweiz"],
    eyebrow: "Enterprise AI · Schweiz",
    h1: "Enterprise AI Schweiz.",
    h1Accent: "Ihre Daten bleiben hier.",
    lead: "Wir bauen KI-Assistenten, Wissenssuche und Agenten auf privaten Sprachmodellen – betrieben in Schweizer Rechenzentren und konform mit nDSG und FINMA.",
    serviceName: "Enterprise AI & private Sprachmodelle",
    pillars: [
      { title: "Null Datenabfluss", text: "Open-Weight-Modelle (Llama, Mistral, Qwen) auf Schweizer GPUs. Keine Prompts bei US-Anbietern." },
      { title: "Wissenssuche (RAG)", text: "Ihre Dokumente, Verträge und Handbücher – durchsuchbar in natürlicher Sprache, mit Quellenangabe." },
      { title: "Compliance by Design", text: "Rollen, Audit-Logs und Datenklassifizierung nach nDSG, FINMA-Rundschreiben und ISO 27001." },
    ],
    bodyTitle: "KI produktiv einsetzen – ohne Ihre Daten aus der Hand zu geben",
    body: [
      "Generative KI kann Recherche, Kundenservice und Sachbearbeitung massiv beschleunigen. Für Schweizer Unternehmen mit vertraulichen Daten ist der Weg über öffentliche Cloud-APIs aber oft keine Option.",
      "Wir betreiben leistungsfähige Open-Weight-Modelle in Schweizer Rechenzentren oder in Ihrer eigenen Infrastruktur. Kombiniert mit einer sauberen RAG-Architektur liefern sie präzise, nachvollziehbare Antworten auf Basis Ihres Unternehmenswissens.",
    ],
    checklist: ["Private LLMs (Llama, Mistral)", "RAG mit Quellenangabe", "KI-Agenten & Automatisierung", "Mehrsprachig DE / FR / IT / EN", "Hosting in der Schweiz oder On-Premise", "Evaluation & Monitoring"],
    faq: [
      { q: "Ist ChatGPT im Unternehmen nDSG-konform?", a: "Nur eingeschränkt, da Daten an US-Anbieter übermittelt werden. Private Modelle in der Schweiz vermeiden dieses Risiko vollständig." },
      { q: "Wie gut sind Open-Source-Modelle im Vergleich?", a: "Für die meisten Unternehmensaufgaben wie Zusammenfassen, Klassifizieren und Wissenssuche liefern aktuelle Open-Weight-Modelle mit guter RAG-Architektur gleichwertige Ergebnisse." },
      { q: "Wie starten wir mit KI?", a: "Mit einem zweiwöchigen Proof of Value an einem konkreten Use Case – inklusive Messung von Qualität, Kosten und Zeitersparnis." },
    ],
    projects: ["lumina-legaltech", "zurich-fintech"],
    cta: "KI-Use-Case besprechen",
  },
];

export function getLanding(slug: string) {
  const page = LANDING_PAGES.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown landing page: ${slug}`);
  return page;
}
