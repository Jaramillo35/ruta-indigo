import { Hero } from "@/components/hero";
import { PromiseSection } from "@/components/promise-section";
import { JourneysSection } from "@/components/journeys-section";
import { RouteSection } from "@/components/route-section";
import { StepsSection } from "@/components/steps-section";
import { ReasonsSection } from "@/components/reasons-section";
import { GallerySection } from "@/components/gallery-section";
import { FaqSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ConfigNotice } from "@/components/config-notice";
import { destinations } from "@/content/destinations";
import { content, otherLang, routes, type Lang } from "@/content/i18n";
import { site } from "@/content/site.config";

/**
 * Structured data. Only what is actually true today: who we are, what we
 * organise, where, and in which languages. No ratings, no price range, no
 * address — none of that has been confirmed.
 */
function structuredData(lang: Lang) {
  const c = content[lang];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": `${site.brand.domain}#organizacion`,
        name: site.brand.name,
        url: site.brand.domain,
        description: c.meta.description,
        knowsLanguage: ["es", "en"],
        areaServed: { "@type": "Country", name: "India" },
        ...(site.contact.email ? { email: site.contact.email } : {}),
      },
      {
        "@type": "FAQPage",
        "@id": `${site.brand.domain}#preguntas`,
        inLanguage: lang,
        mainEntity: c.faq.items.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      ...destinations.map((destination) => ({
        "@type": "TouristDestination",
        name: c.route.items[destination.slug].name,
        description: c.route.items[destination.slug].short,
        address: {
          "@type": "PostalAddress",
          addressRegion: c.route.items[destination.slug].state,
          addressCountry: "IN",
        },
      })),
    ],
  };
}

export function Home({ lang }: { lang: Lang }) {
  const c = content[lang];
  const other = otherLang(lang);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-marigold focus:px-5 focus:py-3 focus:text-night"
      >
        {c.a11y.skip}
      </a>
      <SiteHeader
        lang={lang}
        otherLang={other}
        altHref={routes[other].home}
        copy={{
          nav: c.nav,
          cta: c.hero.ctaPrimary,
          brandDescriptor: c.brandDescriptor,
          whatsapp: c.contact.whatsappShort,
          whatsappMessage: c.contact.whatsappMessage,
          emailSubject: c.contact.emailSubject,
          destinations: destinations
            .map((destination) => c.route.items[destination.slug].name)
            .join(" · "),
          a11y: {
            home: c.a11y.home,
            mainNav: c.a11y.mainNav,
            mobileNav: c.a11y.mobileNav,
            menuOpen: c.a11y.menuOpen,
            menuClose: c.a11y.menuClose,
            langSwitch: c.a11y.langSwitch,
            otherLabel: c.a11y.viewInEnglish,
          },
        }}
      />
      <main id="contenido">
        <Hero lang={lang} />
        <PromiseSection lang={lang} />
        <JourneysSection lang={lang} />
        <RouteSection lang={lang} />
        <StepsSection lang={lang} />
        <GallerySection lang={lang} />
        <ReasonsSection lang={lang} />
        <FaqSection lang={lang} />
        <ContactSection lang={lang} />
      </main>
      <SiteFooter lang={lang} />
      <ConfigNotice />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(lang)) }}
      />
    </>
  );
}
