import React from "react";
import { SITE, SiteContent, toE164 } from "@/lib/content";
import { AREA_SERVED } from "@/lib/landing";

/** Site-wide structured data: Organization, ProfessionalService (local business) and WebSite. */
export default function JsonLd({ content }: { content: SiteContent }) {
  const baseUrl = SITE.url;
  const st = content.settings;
  const phone = toE164(st.phone);
  const sameAs = [st.social.linkedin, st.social.instagram, st.social.github].filter(Boolean);

  const address = {
    "@type": "PostalAddress",
    streetAddress: st.street,
    addressLocality: st.city,
    postalCode: st.zip,
    addressRegion: st.canton,
    addressCountry: "CH",
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: SITE.name,
    url: baseUrl,
    ...(st.ownerName ? { founder: { "@type": "Person", name: st.ownerName } } : {}),
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${baseUrl}/opengraph-image`,
    email: st.email,
    telephone: phone,
    address,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: phone,
      email: st.email,
      contactType: "sales",
      areaServed: ["CH", "LI", "DE", "AT"],
      availableLanguage: ["de", "en"],
    },
    ...(sameAs.length ? { sameAs } : {}),
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
    name: `SHAZWERK – Webagentur ${st.city}`,
    url: baseUrl,
    image: `${baseUrl}/opengraph-image`,
    logo: `${baseUrl}/logo.png`,
    telephone: phone,
    email: st.email,
    priceRange: "CHF CHF CHF",
    currenciesAccepted: "CHF, EUR",
    parentOrganization: { "@id": `${baseUrl}/#organization` },
    address,
    geo: { "@type": "GeoCoordinates", latitude: st.geo.lat, longitude: st.geo.lng },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${st.street}, ${st.zip} ${st.city}`)}`,
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
      itemListElement: content.services.map((s) => ({
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
    alternateName: "SHAZWERK Webagentur Winterthur",
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
