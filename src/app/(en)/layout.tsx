import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "../globals.css";
import { layoutMetadata } from "@/lib/metadata";

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

export const metadata: Metadata = layoutMetadata("en");

export const viewport: Viewport = {
  themeColor: "#07101f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
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
