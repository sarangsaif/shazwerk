import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import PageViewTracker from "@/components/analytics/PageViewTracker";

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
    default: "SHAZWERK — Swiss Digital Products, Software & AI Engineering",
    template: "%s | SHAZWERK",
  },
  description:
    "SHAZWERK designs and builds digital products, software and AI systems for companies moving from idea to working product. Swiss precision, modern engineering, and production reality.",
  keywords: [
    "Swiss software agency",
    "Swiss software development",
    "software development Switzerland",
    "digital product agency Switzerland",
    "AI development Switzerland",
    "AI automation Switzerland",
    "UX UI design Switzerland",
    "digital product development Switzerland",
    "software company Switzerland",
    "web application development Switzerland",
  ],
  authors: [{ name: "SHAZWERK", url: "https://shazwerk.ch" }],
  creator: "SHAZWERK",
  publisher: "SHAZWERK",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://shazwerk.ch",
  },
  openGraph: {
    title: "SHAZWERK — Swiss Digital Products, Software & AI Engineering",
    description:
      "Technology built around the way your business actually works. Digital products, software and AI engineered with Swiss precision.",
    url: "https://shazwerk.ch",
    siteName: "SHAZWERK",
    locale: "en_CH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SHAZWERK — Swiss Digital Products, Software & AI Engineering",
    description:
      "Technology built around the way your business actually works. Digital products, software and AI engineered with Swiss precision.",
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
        <PageViewTracker />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
