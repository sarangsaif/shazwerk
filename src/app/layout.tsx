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
    default: "SHAZWERK — Swiss Digital Products, Software & AI Engineering Studio Zürich",
    template: "%s | SHAZWERK",
  },
  description:
    "SHAZWERK engineers high-stakes digital products, web platforms, and sovereign AI systems with Swiss precision. Based in Zürich and Zug. 100% Swiss data residency and IP handover.",
  keywords: [
    "Swiss software agency",
    "Swiss software development",
    "Softwareentwicklung Schweiz",
    "Software Agentur Zürich",
    "Digital product agency Switzerland",
    "AI development Switzerland",
    "Künstliche Intelligenz Schweiz",
    "Private LLMs Schweiz nDSG",
    "AI automation Switzerland",
    "Next.js Agentur Zürich",
    "UX UI design Switzerland",
    "Digital product development Switzerland",
    "Software company Switzerland",
    "Web application development Switzerland",
    "FINMA konforme Software",
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
      "en-CH": "https://shazwerk.ch",
      "de-CH": "https://shazwerk.ch",
      "x-default": "https://shazwerk.ch",
    },
  },
  openGraph: {
    title: "SHAZWERK — Swiss Digital Products, Software & AI Engineering",
    description:
      "Technology built around the way your business actually works. Digital products, custom software, and private AI engineered with Swiss precision.",
    url: "https://shazwerk.ch",
    siteName: "SHAZWERK",
    locale: "en_CH",
    alternateLocale: ["de_CH"],
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SHAZWERK — Swiss Software & AI Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHAZWERK — Swiss Digital Products, Software & AI Engineering",
    description:
      "Technology built around the way your business actually works. Digital products, custom software, and private AI engineered with Swiss precision.",
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
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
