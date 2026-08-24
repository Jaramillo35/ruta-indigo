import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { Kicker, WhatsAppGlyph, ArrowRight } from "@/components/ui";
import {
  agencyEmail,
  emailConfigured,
  mailtoLink,
  site,
  whatsappConfigured,
  whatsappLink,
} from "@/content/site.config";
import { content, routes, type Lang } from "@/content/i18n";

export function ContactSection({ lang }: { lang: Lang }) {
  const c = content[lang];
  const waHref = whatsappLink(c.contact.whatsappMessage);
  const mailHref = mailtoLink(c.contact.emailSubject);
  const agencyHref = `mailto:${agencyEmail}?subject=${encodeURIComponent(c.contact.agency.subject)}`;

  return (
    <section id="contacto" className="grain relative overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_15%_0%,rgba(69,40,95,0.7),transparent_60%)]"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Kicker className="text-marigold">{c.contact.kicker}</Kicker>
              <h2 className="display mt-6 text-[clamp(2.1rem,5.6vw,3.6rem)] text-mist">
                {c.contact.heading}
                <span className="block italic text-sandstone">{c.contact.headingAccent}</span>
              </h2>
              <p className="prose-lead mt-6 max-w-md text-[1rem] leading-relaxed text-mist-2">
                {c.contact.intro}
              </p>
            </Reveal>

            <Reveal delay={80} className="mt-9 flex flex-col gap-3">
              {whatsappConfigured && waHref && (
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lift pressable group flex items-center justify-between gap-4 rounded-2xl border hairline bg-white/4 px-5 py-4 text-mist hover:bg-white/8"
                >
                  <span className="flex items-center gap-3">
                    <WhatsAppGlyph className="text-marigold" />
                    <span>
                      <span className="block text-[0.95rem]">{c.contact.whatsappTitle}</span>
                      <span className="block text-[0.8rem] text-mist-3">
                        {site.contact.whatsappDisplay || c.contact.whatsappFallback}
                      </span>
                    </span>
                  </span>
                  <ArrowRight className="text-marigold transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              )}

              {emailConfigured && mailHref && (
                <a
                  href={mailHref}
                  className="lift pressable group flex items-center justify-between gap-4 rounded-2xl border hairline bg-white/4 px-5 py-4 text-mist hover:bg-white/8"
                >
                  <span>
                    <span className="block text-[0.95rem]">{site.contact.email}</span>
                    <span className="block text-[0.8rem] text-mist-3">{c.footer.responseTime}</span>
                  </span>
                  <ArrowRight className="text-marigold transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              )}
            </Reveal>

            {/* Secondary pathway: agencies and referral partners. */}
            <Reveal delay={140} className="mt-8 rounded-2xl border hairline bg-linear-to-br from-dusk/40 to-transparent p-6">
              <h3 className="display text-[1.35rem] text-mist">{c.contact.agency.title}</h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-mist-2">
                {c.contact.agency.body}
              </p>
              <a
                href={agencyHref}
                className="pressable mt-4 inline-flex items-center gap-2 py-1.5 text-[0.9rem] text-marigold underline underline-offset-4 hover:text-mist"
              >
                {c.contact.agency.cta}
                <ArrowRight />
              </a>
            </Reveal>
          </div>

          <Reveal delay={60} className="lg:col-span-7">
            <div className="rounded-[1.75rem] border border-white/10 bg-paper p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] sm:p-9">
              <ContactForm lang={lang} privacyHref={routes[lang].privacy} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
