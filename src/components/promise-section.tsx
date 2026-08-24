import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icons";
import { Kicker } from "@/components/ui";
import { content, type Lang } from "@/content/i18n";

export function PromiseSection({ lang }: { lang: Lang }) {
  const c = content[lang];
  return (
    <section className="relative bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <Kicker className="text-clay">{c.promise.kicker}</Kicker>
              <h2 className="display mt-6 text-[clamp(2.1rem,5.6vw,3.6rem)] text-ink">
                {c.promise.heading}
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:pt-16">
            <Reveal delay={80}>
              {c.promise.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`prose-lead text-[1.05rem] leading-relaxed text-ink/75 ${index > 0 ? "mt-5" : ""}`}
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-ink/10 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {c.promise.benefits.map((benefit, index) => (
            <Reveal
              key={benefit.title}
              delay={index * 70}
              className="group bg-paper p-7 transition-colors duration-300 hover:bg-sand/70 sm:p-8"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-clay/10 text-clay transition-transform duration-300 group-hover:scale-105">
                <Icon name={benefit.icon} />
              </span>
              <h3 className="display mt-5 text-[1.45rem] text-ink">{benefit.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">{benefit.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
