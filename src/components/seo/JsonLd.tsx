import React from "react";

export default function JsonLd() {
  const baseUrl = "https://shazwerk.ch";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "SHAZWERK",
    legalName: "SHAZWERK GmbH",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    email: "hello@shazwerk.ch",
    telephone: "+41448209010",
    taxID: "CHE-419.820.104 MWST",
    vatID: "CHE-419.820.104",
    foundingLocation: {
      "@type": "Place",
      name: "Zürich, Schweiz",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gotthardstrasse 26",
      addressLocality: "Zürich",
      postalCode: "8002",
      addressRegion: "ZH",
      addressCountry: "CH",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+41448209010",
        contactType: "customer service",
        areaServed: ["CH", "DE", "AT", "LI"],
        availableLanguage: ["German", "Swiss German", "English"],
      },
    ],
    sameAs: [
      "https://github.com/sarangsaif/shazwerk",
    ],
    description:
      "Schweizer Software Agentur und Digital Engineering Studio in Zürich. Entwicklung von massgeschneiderten Webplattformen, SaaS-Systemen und souveräner Enterprise AI mit Schweizer Präzision und 100% nDSG-Konformität.",
    knowsAbout: [
      "Software Agentur Zürich",
      "Softwareentwicklung Schweiz",
      "Webagentur Zürich",
      "App Entwicklung Zürich",
      "Next.js Agentur Schweiz",
      "AI Agentur Zürich",
      "Enterprise AI Schweiz",
      "Souveräne AI nDSG",
      "Softwareentwicklung Zürich",
      "FINMA konforme Software",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#localservice`,
    name: "SHAZWERK — Software Agentur Zürich & Digital Product Studio",
    url: baseUrl,
    telephone: "+41448209010",
    priceRange: "$$$",
    currenciesAccepted: "CHF, EUR",
    paymentAccepted: "Bank Transfer, Invoicing",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gotthardstrasse 26",
      addressLocality: "Zürich",
      postalCode: "8002",
      addressRegion: "ZH",
      addressCountry: "CH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.3686,
      longitude: 8.5392,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "18:00",
      },
    ],
    areaServed: [
      {
        "@type": "Country",
        name: "Switzerland",
      },
      {
        "@type": "Country",
        name: "Germany",
      },
      {
        "@type": "Country",
        name: "Austria",
      },
      {
        "@type": "Country",
        name: "Liechtenstein",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dienstleistungen & Kompetenzen",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Webplattformen & SaaS-Entwicklung",
            description: "Massgeschneiderte Next.js- und TypeScript-Entwicklung für geschäftskritische Systeme.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Souveräne Enterprise AI & Private LLMs",
            description: "Air-Gapped RAG-Pipelines und private KI-Modelle ohne Drittanbieter-Datenabfluss nach Schweizer nDSG.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Schweizer Cloud-Infrastruktur & High-Load",
            description: "Ausfallsichere Systemarchitektur in Schweizer Rechenzentren (AWS Zürich eu-central-2, Exoscale).",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Design Systems & UI Craft",
            description: "Funktionale Schweizer Typografie, barrierefreie Design Tokens und 60fps-Interaktion.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Architektur- & Security-Audit",
            description: "Ganzheitliche Prüfung von Codequalität, Schweizer nDSG-Konformität und Skalierbarkeit.",
          },
        },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "SHAZWERK",
    alternateName: ["SHAZWERK Software Agentur Zürich", "SHAZWERK Studio Schweiz"],
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["de-CH", "en-CH"],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Studio Zürich",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Dienstleistungen",
        item: `${baseUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Referenzen",
        item: `${baseUrl}/work`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Über uns",
        item: `${baseUrl}/about`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Kontakt",
        item: `${baseUrl}/contact`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Wie stellt SHAZWERK Schweizer Datensouveränität (nDSG) sicher?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Alle Systeme werden in Schweizer Rechenzentren (AWS Zürich Region oder Exoscale) betrieben. Private Sprachmodelle (LLMs) laufen air-gapped mit zero telemetry ohne Datenabfluss ins Ausland.",
        },
      },
      {
        "@type": "Question",
        name: "Wie lange dauern typische Softwareprojekte bei SHAZWERK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Die meisten MVPs und Kernplattformen liefern wir in 4 bis 8 Wochen in zweiwöchentlichen Sprint-Zyklen mit Staging-Deployments jeden Freitag.",
        },
      },
      {
        "@type": "Question",
        name: "Wem gehört der Quellcode nach Projektabschluss?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "100% des geistigen Eigentums (IP) und der Quellcode werden vollständig an den Kunden übertragen. Es gibt keinen Vendor Lock-In.",
        },
      },
      {
        "@type": "Question",
        name: "Arbeitet SHAZWERK mit festen Meilensteinen oder Retainern?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Beides. Für neue Plattformen arbeiten wir mit festen Meilenstein-Sprints. Für die kontinuierliche Weiterentwicklung stellen wir dedizierte Senior Engineering Pods zur Verfügung.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
