import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import PageViewTracker from "@/components/analytics/PageViewTracker";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shazwerk.ch"),
  title: {
    default: "SHAZWERK — Software Agentur Zürich & Digital Product Studio Schweiz",
    template: "%s | SHAZWERK",
  },
  description:
    "Schweizer Digital Engineering Studio in Zürich. Wir entwickeln massgeschneiderte Webplattformen, anspruchsvolle Software und souveräne Enterprise AI mit Schweizer Präzision und 100% Datensouveränität.",
  keywords: [
    "Software Agentur Zürich",
    "Softwareentwicklung Schweiz",
    "Webagentur Zürich",
    "App Entwicklung Zürich",
    "Next.js Agentur Schweiz",
    "AI Agentur Zürich",
    "Enterprise AI Schweiz",
    "Digitalagentur Zürich",
    "Private LLMs Schweiz nDSG",
    "Softwareentwicklung Zürich",
    "FINMA Softwareentwicklung",
    "Web Application Development Switzerland",
    "Digital Product Studio Zurich",
    "Swiss software agency",
  ],
  authors: [{ name: "SHAZWERK", url: "https://shazwerk.ch" }],
  creator: "SHAZWERK GmbH",
  publisher: "SHAZWERK GmbH",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://shazwerk.ch",
    languages: {
      "de-CH": "https://shazwerk.ch",
      "en-CH": "https://shazwerk.ch",
      "x-default": "https://shazwerk.ch",
    },
  },
  openGraph: {
    title: "SHAZWERK — Software Agentur Zürich & Digital Product Studio Schweiz",
    description:
      "Schweizer Softwareentwicklung & souveräne Enterprise AI mit Schweizer Präzision. Next.js, TypeScript, Private LLMs & 100% Datensouveränität.",
    url: "https://shazwerk.ch",
    siteName: "SHAZWERK",
    locale: "de_CH",
    alternateLocale: ["en_CH"],
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SHAZWERK — Software Agentur Zürich & Digital Product Studio Schweiz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHAZWERK — Software Agentur Zürich & Digital Product Studio Schweiz",
    description:
      "Schweizer Softwareentwicklung & souveräne Enterprise AI mit Schweizer Präzision. Next.js, TypeScript, Private LLMs & 100% Datensouveränität.",
    images: ["/opengraph-image"],
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
    "geo.placename": "Zürich",
    "geo.position": "47.3686;8.5392",
    ICBM: "47.3686, 8.5392",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans antialiased selection:bg-[#FFE252] selection:text-neutral-900">
        <LanguageProvider>
          <PageViewTracker />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
