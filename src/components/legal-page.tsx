import Link from "next/link";
import { Wordmark } from "@/components/ui";
import { site } from "@/content/site.config";

export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh bg-night">
      <header className="border-b hairline">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" className="text-mist" aria-label={`${site.brand.name} — inicio`}>
            <Wordmark name={site.brand.name} descriptor={site.brand.descriptor} />
          </Link>
          <Link href="/" className="text-[0.88rem] text-mist-2 hover:text-marigold">
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <h1 className="display text-[clamp(2rem,6vw,3rem)] text-mist">{title}</h1>
        <p className="prose-lead mt-5 text-[1.02rem] leading-relaxed text-mist-2">{intro}</p>

        <div className="mt-10 flex flex-col gap-8 text-[0.98rem] leading-relaxed text-mist-2">
          {children}
        </div>

        <div className="mt-14 rounded-2xl border border-marigold/30 bg-marigold/5 p-5 text-[0.88rem] leading-relaxed text-mist-2">
          Este texto describe cómo funciona el sitio hoy. Antes de publicar la versión final debe
          revisarlo la persona responsable del negocio y, si aplica, un asesor legal, para
          incorporar la razón social, el domicilio fiscal y la normativa que corresponda al país
          de operación.
        </div>

        <p className="mt-10 text-[0.85rem] text-mist-3">
          Dudas sobre este documento:{" "}
          {site.contact.email ? (
            <a href={`mailto:${site.contact.email}`} className="text-marigold hover:underline">
              {site.contact.email}
            </a>
          ) : (
            "escríbenos por el formulario de contacto."
          )}
        </p>
      </main>
    </div>
  );
}

export function LegalBlock({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="display text-[1.4rem] text-mist">{heading}</h2>
      <div className="mt-3 flex flex-col gap-3">{children}</div>
    </section>
  );
}
