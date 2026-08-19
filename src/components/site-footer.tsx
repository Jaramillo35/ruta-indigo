import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/content/destinations";
import { navItems } from "@/content/navigation";
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

export function SiteFooter() {
  const socials = Object.entries(site.social).filter(([, href]) => href.length > 0);
  const waHref = whatsappLink("Hola, quiero información sobre un viaje a India.");

  return (
    <footer className="relative border-t hairline bg-night">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {/* The emblem is drawn for paper, so it gets paper to sit on. The
                wordmark is set in type because the delivered lockup carries its
                descriptor in English, and this site speaks Spanish. */}
            <div className="inline-flex flex-col items-center gap-3 rounded-2xl bg-paper px-8 py-6">
              <Image
                src="/images/marca/isotipo-migryan.png"
                alt=""
                width={512}
                height={512}
                sizes="112px"
                className="size-[100px]"
              />
              <span className="display text-[1.3rem] tracking-[0.16em] text-navy uppercase">
                {site.brand.name}
              </span>
              <span className="text-[0.68rem] tracking-[0.28em] text-clay uppercase">
                {site.brand.descriptor}
              </span>
            </div>
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-mist-2">
              {site.brand.tagline}. El Triángulo Dorado —{destinations
                .map((destination) => destination.name)
                .join(", ")}— recorrido en privado y acompañado en español.
            </p>
            <p className="mt-5 text-[0.8rem] text-mist-3">{site.contact.baseNote}</p>
          </div>

          <nav aria-label="Pie de página" className="lg:col-span-3">
            <h2 className="text-[0.72rem] tracking-[0.2em] text-mist-3 uppercase">Navegación</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navItems.map((item) => (
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
            <h2 className="text-[0.72rem] tracking-[0.2em] text-mist-3 uppercase">Contacto</h2>
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
                  href={`mailto:${agencyEmail}?subject=${encodeURIComponent("Agencia de viajes — colaboración")}`}
                  className="text-[0.92rem] text-mist-2 transition-colors hover:text-marigold"
                >
                  Agencias de viajes
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
            © {new Date().getFullYear()} {site.brand.name}
            {site.brand.nameIsProvisional && (
              <span className="text-mist-3"> · nombre de trabajo, pendiente de confirmar</span>
            )}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href={site.legal.privacyHref} className="transition-colors hover:text-marigold">
                Aviso de privacidad
              </Link>
            </li>
            <li>
              <Link href={site.legal.termsHref} className="transition-colors hover:text-marigold">
                Términos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
