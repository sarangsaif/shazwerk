import React from "react";

export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SHAZWERK",
    url: "https://shazwerk.ch",
    logo: "https://shazwerk.ch/logo.png",
    description:
      "Swiss digital products, software, AI and technology company. Engineering digital products, software platforms, and AI systems for real business.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CH",
      addressLocality: "Zurich",
    },
    knowsAbout: [
      "Swiss software agency",
      "Swiss software development",
      "Software development Switzerland",
      "Digital product agency Switzerland",
      "AI development Switzerland",
      "AI automation Switzerland",
      "UX UI design Switzerland",
      "Digital product development Switzerland",
      "Software company Switzerland",
      "Web application development Switzerland",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SHAZWERK",
    url: "https://shazwerk.ch",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://shazwerk.ch/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SHAZWERK Digital Engineering",
    url: "https://shazwerk.ch/services",
    areaServed: ["Switzerland", "Germany", "Austria"],
    serviceType: [
      "Digital Product Development",
      "Custom Software Engineering",
      "AI Integration & Workflow Automation",
      "UX/UI System Design",
      "Product Strategy & Technical Architecture",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
