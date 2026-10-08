import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QuickContact from "@/components/layout/QuickContact";
import JsonLd from "@/components/seo/JsonLd";
import PageViewTracker from "@/components/analytics/PageViewTracker";
import SmoothScroll from "@/components/motion/SmoothScroll";
import RevealObserver from "@/components/motion/RevealObserver";
import Cursor from "@/components/motion/Cursor";
import { LanguageProvider } from "@/context/LanguageContext";
import { ContentProvider } from "@/components/cms/ContentProvider";
import { getContent } from "@/lib/cms";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const TITLE = "SHAZWERK – Webagentur Winterthur & Zürich";
const DESCRIPTION =
  "Webdesign- und Software-Studio aus Winterthur: Websites, Apps und KI für Schweizer KMU – schnell, bei Google sichtbar und in der Schweiz gehostet.";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F1EFEA" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0D0D" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shazwerk.ch"),
  title: {
    default: TITLE,
    template: "%s | SHAZWERK Zürich",
  },
  description: DESCRIPTION,
  applicationName: "SHAZWERK",
  keywords: [
    "Webagentur Winterthur",
    "Webagentur Zürich",
    "Webdesign Agentur Schweiz",
    "Software Agentur Zürich",
    "Softwareentwicklung Schweiz",
    "App Entwicklung Schweiz",
    "Digitalagentur Zürich",
    "Next.js Agentur Schweiz",
    "Enterprise AI Schweiz",
    "KI Agentur Zürich",
    "Website erstellen lassen Zürich",
  ],
  authors: [{ name: "SHAZWERK", url: "https://www.shazwerk.ch" }],
  creator: "SHAZWERK",
  publisher: "SHAZWERK",
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "SHAZWERK",
    locale: "de_CH",
    alternateLocale: ["en_GB"],
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "CH-ZH",
    "geo.placename": "Winterthur",
    "geo.position": "47.4995;8.7262",
    ICBM: "47.4995, 8.7262",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  return (
    <html
      lang="de-CH"
      className={`${inter.variable} ${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Enables reveal animations only when JS runs; content stays visible otherwise. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd content={content} />
      </head>
      <body className="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased">
        <LanguageProvider>
          <ContentProvider value={{ settings: content.settings, projects: content.projects.filter((p) => !p.hidden) }}>
          <SmoothScroll />
          <RevealObserver />
          <Cursor />
          <PageViewTracker />
          <Header />
          <main id="main" className="flex-grow">
            {children}
          </main>
          <Footer />
          <QuickContact />
          </ContentProvider>
        </LanguageProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
