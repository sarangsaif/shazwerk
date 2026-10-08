import dns from "dns/promises";
import net from "net";

export interface CheckItem {
  id: string;
  group: "speed" | "seo" | "mobile" | "security";
  ok: boolean;
  weight: number;
  title: string;
  detail: string;
}

export interface CheckResult {
  url: string;
  finalUrl: string;
  score: number;
  groups: Record<CheckItem["group"], number>;
  items: CheckItem[];
  timing: { ttfbMs: number; totalMs: number; htmlKb: number };
  performance?: number | null;
  checkedAt: string;
}

// ---------- SSRF protection: only public http(s) hosts ----------

function isPrivateIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    return (
      a === 10 ||
      a === 127 ||
      a === 0 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 100 && b >= 64 && b <= 127) ||
      a >= 224
    );
  }
  const v = ip.toLowerCase();
  return v === "::1" || v === "::" || v.startsWith("fc") || v.startsWith("fd") || v.startsWith("fe80") || v.startsWith("::ffff:");
}

export function normalizeUrl(input: string): URL {
  let raw = (input || "").trim();
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  const url = new URL(raw);
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Nur http- und https-Adressen sind möglich.");
  if (url.port && !["80", "443"].includes(url.port)) throw new Error("Diese Adresse kann nicht geprüft werden.");
  if (!url.hostname.includes(".") || url.hostname.endsWith(".local") || url.hostname.endsWith(".internal")) {
    throw new Error("Bitte eine öffentliche Website-Adresse eingeben.");
  }
  url.hash = "";
  return url;
}

async function assertPublicHost(hostname: string) {
  if (net.isIP(hostname)) {
    if (isPrivateIp(hostname)) throw new Error("Diese Adresse kann nicht geprüft werden.");
    return;
  }
  const records = await dns.lookup(hostname, { all: true }).catch(() => []);
  if (!records.length) throw new Error("Diese Domain wurde nicht gefunden.");
  if (records.some((r) => isPrivateIp(r.address))) throw new Error("Diese Adresse kann nicht geprüft werden.");
}

/** Fetch with manual redirects so every hop is checked against private networks. */
async function safeFetch(start: URL, timeoutMs: number) {
  let url = start;
  const t0 = Date.now();
  for (let hop = 0; hop < 5; hop++) {
    await assertPublicHost(url.hostname);
    const res = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(timeoutMs),
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SHAZWERK-WebsiteCheck/1.0; +https://www.shazwerk.ch/website-check)",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "de-CH,de;q=0.9,en;q=0.8",
      },
      cache: "no-store",
    });
    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      url = new URL(res.headers.get("location")!, url);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error("Ungültige Weiterleitung.");
      continue;
    }
    const ttfb = Date.now() - t0;
    // Read at most 3 MB
    const reader = res.body?.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done || !value) break;
        chunks.push(value);
        size += value.length;
        if (size > 3_000_000) {
          await reader.cancel();
          break;
        }
      }
    }
    const html = Buffer.concat(chunks).toString("utf-8");
    return { res, url, html, size, ttfb, total: Date.now() - t0 };
  }
  throw new Error("Zu viele Weiterleitungen.");
}

async function exists(url: URL) {
  try {
    await assertPublicHost(url.hostname);
    const r = await fetch(url, { method: "GET", redirect: "manual", signal: AbortSignal.timeout(5000), cache: "no-store" });
    return r.status < 400;
  } catch {
    return false;
  }
}

/** Optional Google Lighthouse mobile performance score via the public PageSpeed Insights API. */
async function pageSpeed(url: string): Promise<number | null> {
  try {
    const key = process.env.PAGESPEED_API_KEY ? `&key=${process.env.PAGESPEED_API_KEY}` : "";
    const r = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance${key}`,
      { signal: AbortSignal.timeout(40000), cache: "no-store" }
    );
    if (!r.ok) return null;
    const d = await r.json();
    const s = d?.lighthouseResult?.categories?.performance?.score;
    return typeof s === "number" ? Math.round(s * 100) : null;
  } catch {
    return null;
  }
}

const decode = (s: string) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
const strip = (s: string) => decode(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

export async function runSiteCheck(input: string): Promise<CheckResult> {
  const start = normalizeUrl(input);
  const psiPromise = pageSpeed(start.toString());

  let page;
  try {
    page = await safeFetch(start, 12000);
  } catch (err) {
    if (err instanceof Error && /Adresse|Domain|Weiterleitung|http/.test(err.message)) throw err;
    throw new Error("Die Website hat nicht rechtzeitig geantwortet.");
  }
  const { res, url: finalUrl, html, size, ttfb, total } = page;
  if (!res.ok) throw new Error(`Die Website antwortet mit Fehler ${res.status}.`);

  const head = html.match(/<head[\s\S]*?<\/head>/i)?.[0] || html.slice(0, 20000);
  const title = strip(head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
  const metaDesc = decode(head.match(/<meta[^>]+name=["']description["'][^>]*>/i)?.[0]?.match(/content=["']([^"']*)["']/i)?.[1] || "");
  const viewport = /<meta[^>]+name=["']viewport["']/i.test(head);
  const lang = html.match(/<html[^>]*\slang=["']([^"']+)["']/i)?.[1] || "";
  const canonical = /<link[^>]+rel=["']canonical["']/i.test(head);
  const og = /<meta[^>]+property=["']og:(title|image)["']/i.test(head);
  const jsonLd = /application\/ld\+json/i.test(html);
  const favicon = /<link[^>]+rel=["'][^"']*icon[^"']*["']/i.test(head);
  const noindex = /<meta[^>]+name=["']robots["'][^>]+noindex/i.test(head) || /noindex/i.test(res.headers.get("x-robots-tag") || "");
  const h1s = (html.match(/<h1[\s>]/gi) || []).length;
  const imgs = html.match(/<img\b[^>]*>/gi) || [];
  const imgsNoAlt = imgs.filter((t) => !/\salt=/i.test(t)).length;
  const scripts = (html.match(/<script\b[^>]*\ssrc=/gi) || []).length;
  const https = finalUrl.protocol === "https:";
  const hsts = !!res.headers.get("strict-transport-security");
  const compressed = /gzip|br|zstd/i.test(res.headers.get("content-encoding") || "");
  const legacyTech = /jquery[.-]?1\.|flash|swfobject|<frameset|<marquee/i.test(html);
  const year = new Date().getFullYear();
  const copyrightYears = Array.from(html.matchAll(/(?:©|&copy;|copyright)\s*(?:\d{4}\s*[-–]\s*)?(\d{4})/gi)).map((m) => Number(m[1]));
  const staleCopyright = copyrightYears.length > 0 && Math.max(...copyrightYears) < year - 1;
  const contactCta = /kontakt|contact|anfrage|termin|offerte|tel:|mailto:/i.test(html);

  const [sitemap, robots, httpRedirect] = await Promise.all([
    exists(new URL("/sitemap.xml", finalUrl)),
    exists(new URL("/robots.txt", finalUrl)),
    (async () => {
      if (!https) return false;
      try {
        const r = await fetch(`http://${finalUrl.hostname}/`, { redirect: "manual", signal: AbortSignal.timeout(5000), cache: "no-store" });
        return r.status >= 300 && r.status < 400 && (r.headers.get("location") || "").startsWith("https://");
      } catch {
        return true;
      }
    })(),
  ]);

  const kb = Math.round(size / 1024);
  const items: CheckItem[] = [
    { id: "ttfb", group: "speed", weight: 3, ok: ttfb < 800, title: "Server-Antwortzeit", detail: `Der Server antwortet nach ${ttfb} ms. ${ttfb < 800 ? "Gut." : "Über 0.8 s wirkt die Seite träge und Google wertet sie ab."}` },
    { id: "size", group: "speed", weight: 2, ok: kb < 300, title: "Grösse der Startseite", detail: `Das HTML wiegt ${kb} KB. ${kb < 300 ? "Schlank." : "Sehr gross – lädt auf dem Handy langsam."}` },
    { id: "compression", group: "speed", weight: 1, ok: compressed, title: "Komprimierung", detail: compressed ? "Die Seite wird komprimiert übertragen." : "Die Seite wird unkomprimiert übertragen und lädt dadurch langsamer." },
    { id: "scripts", group: "speed", weight: 1, ok: scripts <= 15, title: "Anzahl Skripte", detail: `${scripts} externe Skripte. ${scripts <= 15 ? "Im Rahmen." : "Viele Skripte bremsen den Seitenaufbau."}` },
    { id: "viewport", group: "mobile", weight: 3, ok: viewport, title: "Für Smartphones optimiert", detail: viewport ? "Die Seite passt sich an Bildschirmgrössen an." : "Kein Viewport-Tag: Auf dem Handy wird die Seite winzig dargestellt. Über 60 % der Besuche kommen mobil." },
    { id: "legacy", group: "mobile", weight: 2, ok: !legacyTech, title: "Moderne Technik", detail: legacyTech ? "Veraltete Technik gefunden (z. B. alte jQuery-Version oder Frames)." : "Keine veraltete Technik gefunden." },
    { id: "fresh", group: "mobile", weight: 1, ok: !staleCopyright, title: "Aktualität", detail: staleCopyright ? `Das Copyright zeigt ${Math.max(...copyrightYears)} – Besucher halten die Seite für veraltet.` : "Keine Hinweise auf eine veraltete Seite." },
    { id: "cta", group: "mobile", weight: 2, ok: contactCta, title: "Kontaktmöglichkeit", detail: contactCta ? "Besucher finden einen Weg, Sie zu kontaktieren." : "Kein klarer Kontakt-Aufruf gefunden – Besucher springen ab statt anzufragen." },
    { id: "title", group: "seo", weight: 3, ok: title.length >= 15 && title.length <= 70, title: "Seitentitel", detail: title ? `«${title.slice(0, 80)}» (${title.length} Zeichen). ${title.length >= 15 && title.length <= 70 ? "Gute Länge." : "Ideal sind 15–70 Zeichen mit Ihrem wichtigsten Suchbegriff."}` : "Kein Seitentitel – Google weiss nicht, worum es geht." },
    { id: "desc", group: "seo", weight: 2, ok: metaDesc.length >= 70 && metaDesc.length <= 170, title: "Beschreibung bei Google", detail: metaDesc ? `${metaDesc.length} Zeichen. ${metaDesc.length >= 70 && metaDesc.length <= 170 ? "Gut." : "Ideal sind 70–170 Zeichen."}` : "Keine Meta-Beschreibung – Google zeigt zufälligen Text im Suchergebnis." },
    { id: "h1", group: "seo", weight: 2, ok: h1s === 1, title: "Hauptüberschrift (H1)", detail: h1s === 1 ? "Genau eine H1 – richtig." : h1s === 0 ? "Keine H1-Überschrift gefunden." : `${h1s} H1-Überschriften – es sollte genau eine sein.` },
    { id: "alt", group: "seo", weight: 1, ok: imgsNoAlt === 0, title: "Bildbeschreibungen", detail: imgsNoAlt === 0 ? "Alle Bilder haben eine Beschreibung." : `${imgsNoAlt} von ${imgs.length} Bildern ohne Alt-Text.` },
    { id: "lang", group: "seo", weight: 1, ok: !!lang, title: "Sprachangabe", detail: lang ? `Sprache: ${lang}.` : "Keine Sprachangabe im HTML." },
    { id: "schema", group: "seo", weight: 2, ok: jsonLd, title: "Strukturierte Daten", detail: jsonLd ? "Vorhanden – Google versteht Ihr Unternehmen besser." : "Keine strukturierten Daten: Adresse, Öffnungszeiten & Bewertungen erscheinen nicht direkt bei Google." },
    { id: "sitemap", group: "seo", weight: 1, ok: sitemap, title: "Sitemap", detail: sitemap ? "sitemap.xml gefunden." : "Keine sitemap.xml – neue Seiten werden langsamer gefunden." },
    { id: "robots", group: "seo", weight: 1, ok: robots && !noindex, title: "Indexierung", detail: noindex ? "Achtung: Die Seite ist für Google gesperrt (noindex)!" : robots ? "robots.txt vorhanden." : "Keine robots.txt gefunden." },
    { id: "social", group: "seo", weight: 1, ok: og, title: "Vorschau beim Teilen", detail: og ? "Open-Graph-Daten vorhanden." : "Beim Teilen auf WhatsApp oder LinkedIn erscheint keine schöne Vorschau." },
    { id: "canonical", group: "seo", weight: 1, ok: canonical, title: "Canonical-Link", detail: canonical ? "Vorhanden." : "Fehlt – kann zu doppelten Inhalten bei Google führen." },
    { id: "https", group: "security", weight: 3, ok: https, title: "Verschlüsselung (HTTPS)", detail: https ? "Die Seite ist verschlüsselt." : "Keine Verschlüsselung – Browser warnen Besucher mit «Nicht sicher»." },
    { id: "redirect", group: "security", weight: 1, ok: httpRedirect, title: "Weiterleitung auf HTTPS", detail: httpRedirect ? "http:// wird auf https:// umgeleitet." : "http:// wird nicht automatisch umgeleitet." },
    { id: "hsts", group: "security", weight: 1, ok: hsts, title: "Sicherheits-Header", detail: hsts ? "HSTS aktiv." : "Wichtige Sicherheits-Header (HSTS) fehlen." },
    { id: "favicon", group: "security", weight: 1, ok: favicon, title: "Favicon", detail: favicon ? "Vorhanden." : "Kein Favicon – wirkt im Browser-Tab unprofessionell." },
  ];

  const performance = await psiPromise;
  if (performance !== null) {
    items.unshift({
      id: "lighthouse",
      group: "speed",
      weight: 4,
      ok: performance >= 70,
      title: "Google Lighthouse (Handy)",
      detail: `Leistungswert ${performance}/100. ${performance >= 90 ? "Sehr gut." : performance >= 70 ? "In Ordnung, aber verbesserbar." : "Langsam – Besucher springen ab, Google stuft die Seite herunter."}`,
    });
  }

  const pct = (list: CheckItem[]) => {
    const total = list.reduce((a, b) => a + b.weight, 0);
    return total ? Math.round((list.filter((i) => i.ok).reduce((a, b) => a + b.weight, 0) / total) * 100) : 100;
  };
  const groups = {
    speed: pct(items.filter((i) => i.group === "speed")),
    mobile: pct(items.filter((i) => i.group === "mobile")),
    seo: pct(items.filter((i) => i.group === "seo")),
    security: pct(items.filter((i) => i.group === "security")),
  };

  return {
    url: start.toString(),
    finalUrl: finalUrl.toString(),
    score: pct(items),
    groups,
    items,
    timing: { ttfbMs: ttfb, totalMs: total, htmlKb: kb },
    performance,
    checkedAt: new Date().toISOString(),
  };
}
