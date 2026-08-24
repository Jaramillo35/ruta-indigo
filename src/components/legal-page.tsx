import Link from "next/link";
import { Wordmark } from "@/components/ui";
import { site } from "@/content/site.config";
import { content, routes, type Lang } from "@/content/i18n";

/** Renders either legal document from the dictionary, in either language. */
export function LegalPage({ lang, doc }: { lang: Lang; doc: "privacy" | "terms" }) {
  const c = content[lang];
  const page = c.legal[doc];

  return (
    <div className="min-h-svh bg-night">
      <header className="border-b hairline">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5 sm:px-8">
          <Link
            href={routes[lang].home}
            className="text-mist"
            aria-label={`${site.brand.name} — ${c.a11y.home}`}
          >
            <Wordmark name={site.brand.name} descriptor={c.brandDescriptor} />
          </Link>
          <Link href={routes[lang].home} className="text-[0.88rem] text-mist-2 hover:text-marigold">
            {c.legal.back}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <h1 className="display text-[clamp(2rem,6vw,3rem)] text-mist">{page.title}</h1>
        <p className="prose-lead mt-5 text-[1.02rem] leading-relaxed text-mist-2">{page.intro}</p>

        <div className="mt-10 flex flex-col gap-8 text-[0.98rem] leading-relaxed text-mist-2">
          {page.blocks.map((block) => (
            <section key={block.heading}>
              <h2 className="display text-[1.4rem] text-mist">{block.heading}</h2>
              <div className="mt-3 flex flex-col gap-3">
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-marigold/30 bg-marigold/5 p-5 text-[0.88rem] leading-relaxed text-mist-2">
          {c.legal.reviewNotice}
        </div>

        <p className="mt-10 text-[0.85rem] text-mist-3">
          {c.legal.questions}{" "}
          {site.contact.email ? (
            <a href={`mailto:${site.contact.email}`} className="text-marigold hover:underline">
              {site.contact.email}
            </a>
          ) : (
            c.legal.questionsFallback
          )}
        </p>
      </main>
    </div>
  );
}
