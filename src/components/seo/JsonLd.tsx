import React from "react";

export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://shazwerk.ch/#organization",
    name: "SHAZWERK",
    legalName: "SHAZWERK GmbH",
    url: "https://shazwerk.ch",
    logo: "https://shazwerk.ch/logo.png",
    email: "hello@shazwerk.ch",
    telephone: "+41448209010",
    taxID: "CHE-419.820.104 MWST",
    vatID: "CHE-419.820.104",
    foundingLocation: {
      "@type": "Place",
      name: "Zurich, Switzerland",
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
        availableLanguage: ["German", "English", "Swiss German"],
      },
    ],
    sameAs: [
      "https://github.com/sarangsaif/shazwerk",
    ],
    description:
      "Swiss digital products, software, AI engineering and technology studio in Zurich and Zug. Building high-load web platforms and sovereign AI systems with Swiss precision.",
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://shazwerk.ch/#localservice",
    name: "SHAZWERK — Swiss Software & AI Engineering Studio",
    url: "https://shazwerk.ch",
    telephone: "+41448209010",
    priceRange: "CHF",
    currenciesAccepted: "CHF, EUR, USD",
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
      name: "Engineering Capabilities",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Product Engineering & Web Platforms",
            description: "Custom full-stack Next.js and TypeScript software engineered for high scale.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sovereign Enterprise AI & Private LLMs",
            description: "Air-gapped retrieval pipelines (RAG) and private models with zero telemetry leakage under Swiss nDSG.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cloud Architecture & Swiss Data Residency",
            description: "Resilient cloud infrastructure deployed in Zurich data centers (AWS eu-central-2, Exoscale).",
          },
        },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://shazwerk.ch/#website",
    url: "https://shazwerk.ch",
    name: "SHAZWERK",
    publisher: {
      "@id": "https://shazwerk.ch/#organization",
    },
    inLanguage: ["en-CH", "de-CH"],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do you ensure Swiss data residency and compliance (FADP / nDSG)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All architectures can be deployed natively within Swiss-based data centers (such as AWS Europe Zurich region or Exoscale Zurich/Geneva). We configure zero-trust networking, encrypted data at rest/transit, and enforce strict air-gapped private LLM inference so your proprietary data never leaks across foreign borders.",
        },
      },
      {
        "@type": "Question",
        name: "What does a typical project timeline look like?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most core systems and minimum testable products (MVPs) ship within 4 to 8 weeks through iterative bi-weekly sprint cycles. Enterprise systems or multi-modal AI integrations usually range between 8 to 16 weeks with staging deployments accessible to your team every Friday.",
        },
      },
      {
        "@type": "Question",
        name: "What is handed over upon project completion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "100% full intellectual property (IP) transfer. You receive clean, fully documented TypeScript source code repositories, automated CI/CD deployment configurations, database migration scripts, environment variables checklists, and interactive technical documentation. Zero vendor lock-in.",
        },
      },
      {
        "@type": "Question",
        name: "Do you work on fixed-scope projects or dedicated retainers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Both. For greenfield digital products with defined objectives, we operate on milestone-based fixed-budget sprints (no surprise invoices). For ongoing product evolution, dedicated AI development, and mission-critical operations, we embed dedicated senior engineering pods on monthly retained capacity.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
