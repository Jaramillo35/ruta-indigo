import { Reveal } from "@/components/reveal";
import { Kicker } from "@/components/ui";
import { content, type Lang } from "@/content/i18n";

export function FaqSection({ lang }: { lang: Lang }) {
  const c = content[lang];
  return (
    <section id="preguntas" className="relative bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <Kicker className="text-clay">{c.faq.kicker}</Kicker>
            <h2 className="display mt-6 text-[clamp(2.1rem,5.6vw,3.4rem)] text-ink">
              {c.faq.heading}
              <span className="block italic text-clay">{c.faq.headingAccent}</span>
            </h2>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-ink/70">
              {c.faq.note}
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <ul className="flex flex-col">
              {c.faq.items.map((faq, index) => (
                <Reveal key={faq.q} as="li" delay={index * 40}>
                  <details className="faq-item group border-b border-ink/12">
                    <summary className="flex items-start justify-between gap-6 py-5 text-left">
                      <h3 className="display text-[1.25rem] text-ink transition-colors duration-200 group-hover:text-clay sm:text-[1.4rem]">
                        {faq.q}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="faq-chevron mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink/70 transition-transform duration-300"
                        style={{ transitionTimingFunction: "var(--ease-out)" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path
                            d="M6 1.5v9M1.5 6h9"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </summary>
                    <p className="max-w-2xl pb-6 text-[0.98rem] leading-relaxed text-ink/72">
                      {faq.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
