import Image from "next/image";
import Link from "next/link";
import { content, routes, type Lang } from "@/content/i18n";
import { asset } from "@/lib/asset";
import {
  agencyEmail,
  emailConfigured,
  site,
  whatsappConfigured,
  whatsappLink,
} from "@/content/site.config";

const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  youtube: "YouTube",
};

export function SiteFooter({ lang }: { lang: Lang }) {
  const c = content[lang];
  const socials = Object.entries(site.social).filter(([, href]) => href.length > 0);
  const waHref = whatsappLink(c.contact.whatsappMessage);

  return (
    <footer className="relative border-t hairline bg-night">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image
              src={asset(c.brandLockup)}
              alt={`${site.brand.name} — ${c.brandDescriptor}`}
              width={1240}
              height={830}
              sizes="230px"
              className="h-auto w-[220px]"
            />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-mist-2">
              {c.footer.tagline}. {c.footer.blurb}
            </p>
            <p className="mt-5 text-[0.8rem] text-mist-3">{c.footer.baseNote}</p>
          </div>

          <nav aria-label={c.a11y.footerNav} className="lg:col-span-3">
            <h2 className="text-[0.72rem] tracking-[0.2em] text-mist-3 uppercase">{c.footer.navTitle}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {c.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.92rem] text-mist-2 transition-colors hover:text-marigold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="text-[0.72rem] tracking-[0.2em] text-mist-3 uppercase">{c.footer.contactTitle}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {emailConfigured && (
                <li>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="text-[0.92rem] text-mist-2 transition-colors hover:text-marigold"
                  >
                    {site.contact.email}
                  </a>
                </li>
              )}
              {whatsappConfigured && waHref && (
                <li>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.92rem] text-mist-2 transition-colors hover:text-marigold"
                  >
                    WhatsApp {site.contact.whatsappDisplay}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${agencyEmail}?subject=${encodeURIComponent(c.contact.agency.subject)}`}
                  className="text-[0.92rem] text-mist-2 transition-colors hover:text-marigold"
                >
                  {c.footer.agencies}
                </a>
              </li>
            </ul>

            {socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {socials.map(([key, href]) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pressable inline-flex rounded-full border border-white/15 px-4 py-2 text-[0.82rem] text-mist-2 hover:border-white/40 hover:text-mist"
                    >
                      {socialLabels[key] ?? key}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="rule mt-14" />

        <div className="mt-6 flex flex-col gap-4 text-[0.8rem] text-mist-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {site.photoCredits.length > 0 && (
              <span className="mb-2 block">
                {c.footer.photoCredit}:{" "}
                {site.photoCredits
                  .map((credit) => `${credit.author} (${credit.source})`)
                  .join(", ")}
              </span>
            )}
            © {new Date().getFullYear()} {site.brand.name}
            {site.brand.nameIsProvisional && (
              <span className="text-mist-3"> · nombre de trabajo, pendiente de confirmar</span>
            )}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href={routes[lang].privacy} className="transition-colors hover:text-marigold">
                {c.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={routes[lang].terms} className="transition-colors hover:text-marigold">
                {c.footer.terms}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
