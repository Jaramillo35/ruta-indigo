import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site.config";

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["SOFT", "opsz"],
});

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const description =
  "Viajes privados por India para viajeros de habla hispana: Delhi, Agra, Jaipur y Rishikesh, con acompañamiento real en español, transporte privado e itinerarios a la medida.";

export const metadata: Metadata = {
  metadataBase: new URL(site.brand.domain),
  title: {
    default: `${site.brand.name} — Viajes privados por India, en español`,
    template: `%s · ${site.brand.name}`,
  },
  description,
  keywords: [
    "viajes a India en español",
    "tour privado India",
    "Triángulo Dorado",
    "Rishikesh yoga",
    "guía en español India",
    "viaje a India desde México",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: site.brand.domain,
    siteName: site.brand.name,
    title: `${site.brand.name} — Descubre India en tu idioma`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand.name} — Descubre India en tu idioma`,
    description,
  },
  /* The Pages preview lives on a temporary domain — keep it out of search
     results until the real domain is live. */
  robots: process.env.BASE_PATH
    ? { index: false, follow: false }
    : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07101f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${display.variable} ${sans.variable}`}>
      <body>
        {/* Reveals are driven by IntersectionObserver; without JS they must
            never hide content. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
