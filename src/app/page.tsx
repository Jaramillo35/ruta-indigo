import { Hero } from "@/components/hero";
import { PromiseSection } from "@/components/promise-section";
import { JourneysSection } from "@/components/journeys-section";
import { RouteSection } from "@/components/route-section";
import { StepsSection } from "@/components/steps-section";
import { ReasonsSection } from "@/components/reasons-section";
import { FaqSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ConfigNotice } from "@/components/config-notice";
import { faqs } from "@/content/copy";
import { destinations } from "@/content/destinations";
import { site } from "@/content/site.config";

/**
 * Structured data. Only what is actually true today: who we are, what we
 * organise, where, and in which languages. No ratings, no price range, no
 * address — none of that has been confirmed.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": `${site.brand.domain}#organizacion`,
      name: site.brand.name,
      url: site.brand.domain,
      description:
        "Viajes privados por India para viajeros de habla hispana, con acompañamiento en español.",
      knowsLanguage: ["es", "en"],
      areaServed: { "@type": "Country", name: "India" },
      ...(site.contact.email ? { email: site.contact.email } : {}),
    },
    {
      "@type": "FAQPage",
      "@id": `${site.brand.domain}#preguntas`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
    ...destinations.map((destination) => ({
      "@type": "TouristDestination",
      name: destination.name,
      description: destination.short,
      address: {
        "@type": "PostalAddress",
        addressRegion: destination.state,
        addressCountry: "IN",
      },
    })),
  ],
};

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-marigold focus:px-5 focus:py-3 focus:text-night"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido">
        <Hero />
        <PromiseSection />
        <JourneysSection />
        <RouteSection />
        <StepsSection />
        <ReasonsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <ConfigNotice />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
