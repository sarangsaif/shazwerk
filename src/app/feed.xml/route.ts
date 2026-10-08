import { NextResponse } from "next/server";
import { getPublishedProjects } from "@/lib/cms";
import { LANDING_PAGES } from "@/lib/landing";

export const dynamic = "force-dynamic";

export async function GET() {
  const PROJECTS = await getPublishedProjects();
  const baseUrl = "https://www.shazwerk.ch";
  const now = new Date().toUTCString();

  const pubDate = "Thu, 08 Oct 2026 08:00:00 GMT";
  const feedItems = [
    ...LANDING_PAGES.map((p) => ({
      title: p.metaTitle,
      link: `${baseUrl}/${p.slug}`,
      description: p.metaDescription,
      pubDate,
      guid: `${baseUrl}/${p.slug}`,
    })),
    ...PROJECTS.map((p) => ({
      title: `${p.client}: ${p.title.de}`,
      link: `${baseUrl}/work/${p.slug}`,
      description: p.summary.de,
      pubDate,
      guid: `${baseUrl}/work/${p.slug}`,
    })),
  ];

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SHAZWERK – Webagentur &amp; Software Studio Zürich</title>
    <link>${baseUrl}</link>
    <description>Webdesign, Webentwicklung, Software und Enterprise AI aus Zürich.</description>
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
