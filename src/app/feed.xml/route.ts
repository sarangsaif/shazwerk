import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = "https://shazwerk.ch";
  const now = new Date().toUTCString();

  const feedItems = [
    {
      title: "SHAZWERK — Software Agentur Zürich & Digital Product Studio Schweiz",
      link: `${baseUrl}`,
      description: "Schweizer Softwareentwicklung, Next.js Webplattformen und souveräne Enterprise AI mit Schweizer Präzision und Datensouveränität.",
      pubDate: "Fri, 03 Oct 2026 10:00:00 GMT",
      guid: `${baseUrl}/`,
    },
    {
      title: "Software Agentur Zürich: Massgeschneiderte Softwareentwicklung Schweiz",
      link: `${baseUrl}/software-agentur-zuerich`,
      description: "Führende Software Agentur in Zürich für geschäftskritische Webapplikationen, Cloud-Systeme und Enterprise AI nach Schweizer nDSG.",
      pubDate: "Fri, 03 Oct 2026 11:00:00 GMT",
      guid: `${baseUrl}/software-agentur-zuerich`,
    },
    {
      title: "Enterprise AI Schweiz: Eigene Sprachmodelle & nDSG Datensouveränität",
      link: `${baseUrl}/enterprise-ai-schweiz`,
      description: "Air-gapped Sprachmodelle, private RAG-Pipelines und FINMA-konforme KI-Architektur ohne Datenabfluss ins Ausland.",
      pubDate: "Fri, 03 Oct 2026 12:00:00 GMT",
      guid: `${baseUrl}/enterprise-ai-schweiz`,
    },
    {
      title: "Webagentur Zürich: High-End Webentwicklung & Next.js Schweiz",
      link: `${baseUrl}/webagentur-zuerich`,
      description: "Moderne Webagentur in Zürich für massgeschneiderte Webplattformen, reaktive Portale und Hochleistungs-Websites.",
      pubDate: "Fri, 03 Oct 2026 13:00:00 GMT",
      guid: `${baseUrl}/webagentur-zuerich`,
    },
    {
      title: "Dienstleistungen & Technologie-Stack: Next.js 14, TypeScript & Cloud",
      link: `${baseUrl}/services`,
      description: "Übersicht über unsere Kernkompetenzen: Webplattformen, Enterprise AI, Schweizer Cloud-Infrastruktur und UI Craft.",
      pubDate: "Fri, 03 Oct 2026 09:00:00 GMT",
      guid: `${baseUrl}/services`,
    },
    {
      title: "Referenzen & Fallstudien: Schweizer Software- und Digitalprojekte",
      link: `${baseUrl}/work`,
      description: "Ausgewählte Arbeiten in den Bereichen FinTech, HealthTech, Industrial IoT und souveräne KI-Assistenten.",
      pubDate: "Fri, 03 Oct 2026 08:00:00 GMT",
      guid: `${baseUrl}/work`,
    },
  ];

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SHAZWERK — Studio Zürich Feed</title>
    <link>${baseUrl}</link>
    <description>Schweizer Digital Engineering Studio in Zürich. Softwareentwicklung, Webplattformen und souveräne Enterprise AI.</description>
    <language>de-CH</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${feedItems
      .map(
        (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid>${item.guid}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <description><![CDATA[${item.description}]]></description>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=14400",
    },
  });
}
