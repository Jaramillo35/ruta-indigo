import { Reveal } from "@/components/reveal";
import { Kicker } from "@/components/ui";
import { content, type Lang } from "@/content/i18n";

export function ReasonsSection({ lang }: { lang: Lang }) {
  const c = content[lang];
  return (
    <section className="grain relative bg-night">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(107,51,88,0.45),transparent_60%)]"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="max-w-2xl">
          <Kicker className="text-marigold">{c.reasons.kicker}</Kicker>
          <h2 className="display mt-6 text-[clamp(2.1rem,5.6vw,3.6rem)] text-mist">
            {c.reasons.heading}
            <span className="block italic text-sandstone">{c.reasons.headingAccent}</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {c.reasons.items.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 60} className="group border-t hairline pt-6">
              <h3 className="display text-[1.4rem] text-mist transition-colors duration-300 group-hover:text-marigold">
                {reason.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-mist-2">{reason.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
