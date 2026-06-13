import type { Metadata } from "next";
import { garamond, inter, italianno } from "@/lib/fonts";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import SvgSprite from "@/components/ui/SvgSprite";
import "./globals.css";

const SITE = "https://cosmyastral.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Cosmyastral · Carta natal y numerología narradas con cuidado",
    template: "%s — Cosmyastral",
  },
  description:
    "Calculadora de carta natal gratuita y estudios personalizados de astrología y numerología. Cálculo con Swiss Ephemeris, interpretación narrativa con revisión humana.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE,
    siteName: "Cosmyastral",
    title: "Cosmyastral · Carta natal y numerología narradas con cuidado",
    description:
      "Calculadora de carta natal gratuita y estudios personalizados de astrología y numerología.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cosmyastral · Carta natal y numerología",
    description:
      "Calculadora de carta natal gratuita y estudios personalizados.",
  },
  alternates: {
    canonical: "/",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  name: "Cosmyastral",
  url: SITE,
  description:
    "Calculadora de carta natal y numerología gratuita. Estudios personalizados en PDF con Swiss Ephemeris.",
  inLanguage: "es",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE}/blog/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "Cosmyastral",
  url: SITE,
  logo: {
    "@type": "ImageObject",
    url: `${SITE}/logo.png`,
    width: 512,
    height: 512,
  },
  description:
    "Astrología y numerología en español para España y LATAM. Calculadoras gratuitas y estudios PDF personalizados con cálculo astronómico profesional.",
  foundingDate: "2026",
  areaServed: [
    { "@type": "Country", name: "España" },
    { "@type": "Country", name: "Argentina" },
    { "@type": "Country", name: "México" },
    { "@type": "Country", name: "Colombia" },
    { "@type": "Country", name: "Chile" },
    { "@type": "Country", name: "Perú" },
  ],
  availableLanguage: {
    "@type": "Language",
    name: "Spanish",
    alternateName: "es",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${garamond.variable} ${inter.variable} ${italianno.variable}`}
    >
      <body>
        <SvgSprite />
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
