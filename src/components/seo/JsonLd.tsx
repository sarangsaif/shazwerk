import React from "react";
import { SITE, SERVICES } from "@/lib/content";
import { AREA_SERVED } from "@/lib/landing";

/** Site-wide structured data: Organization, ProfessionalService (local business) and WebSite. */
export default function JsonLd() {
  const baseUrl = SITE.url;

  const address = {
    "@type": "PostalAddress",
    streetAddress: SITE.street,
    addressLocality: SITE.city,
    postalCode: SITE.zip,
    addressRegion: "ZH",
    addressCountry: "CH",
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${baseUrl}/opengraph-image`,
    email: SITE.email,
    telephone: SITE.phoneE164,
    vatID: `${SITE.uid} MWST`,
    address,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phoneE164,
      email: SITE.email,
      contactType: "sales",
      areaServed: ["CH", "LI", "DE", "AT"],
      availableLanguage: ["de", "en", "fr"],
    },
    sameAs: ["https://github.com/sarangsaif/shazwerk"],
    knowsAbout: [
      "Webdesign",
      "Webentwicklung",
      "Softwareentwicklung",
      "App-Entwicklung",
      "Next.js",
      "TypeScript",
      "Suchmaschinenoptimierung",
      "Enterprise AI",
      "Large Language Models",
      "Datenschutz nDSG",
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#localbusiness`,
    name: "SHAZWERK – Webagentur & Software Studio Zürich",
    url: baseUrl,
    image: `${baseUrl}/opengraph-image`,
    logo: `${baseUrl}/logo.png`,
    telephone: SITE.phoneE164,
    email: SITE.email,
    priceRange: "CHF CHF CHF",
    currenciesAccepted: "CHF, EUR",
    parentOrganization: { "@id": `${baseUrl}/#organization` },
    address,
    geo: { "@type": "GeoCoordinates", latitude: 47.3686, longitude: 8.5392 },
    hasMap: "https://www.google.com/maps/search/?api=1&query=Gotthardstrasse+26+8002+Z%C3%BCrich",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "18:00",
      },
    ],
    areaServed: [
      { "@type": "Country", name: "Schweiz" },
      ...AREA_SERVED.map((name) => ({ "@type": "City", name })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Leistungen",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title.de,
          description: s.lead.de,
          ...(s.href ? { url: `${baseUrl}${s.href}` } : {}),
        },
      })),
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: SITE.name,
    alternateName: "SHAZWERK Webagentur Zürich",
    publisher: { "@id": `${baseUrl}/#organization` },
    inLanguage: "de-CH",
  };

  return (
    <>
      {[organization, localBusiness, website].map((schema) => (
        <script
          key={schema["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
