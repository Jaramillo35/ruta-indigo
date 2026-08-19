import { Reveal } from "@/components/reveal";
import { Cta, Kicker, ArrowRight } from "@/components/ui";
import { steps } from "@/content/copy";

export function StepsSection() {
  return (
    <section id="como-funciona" className="relative bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Kicker className="text-clay">Cómo funciona</Kicker>
            <h2 className="display mt-6 text-[clamp(2.1rem,5.6vw,3.6rem)] text-ink">
              De una idea suelta
              <span className="block italic text-clay">a un viaje con nombre y fecha.</span>
            </h2>
            <p className="prose-lead mt-6 max-w-md text-[1rem] leading-relaxed text-ink/70">
              No hay reservación en línea ni pagos por la página: nos escribes, conversamos y
              recibes una propuesta personalizada. Todo lo demás se acuerda por escrito antes de
              confirmar nada.
            </p>
            <Cta href="#contacto" variant="quiet" className="mt-8">
              Empezar por el primer paso
              <ArrowRight />
            </Cta>
          </Reveal>

          <div className="lg:col-span-7">
            <ol className="relative flex flex-col">
              <span
                aria-hidden="true"
                className="absolute top-4 bottom-8 left-[27px] w-px bg-linear-to-b from-clay/50 via-clay/25 to-transparent sm:left-[31px]"
              />
              {steps.map((step, index) => (
                <Reveal
                  key={step.n}
                  as="li"
                  delay={index * 80}
                  className="relative flex gap-5 pb-10 last:pb-0 sm:gap-7"
                >
                  <span className="display relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-clay/30 bg-paper text-[1.05rem] text-clay sm:size-16">
                    {step.n}
                  </span>
                  <div className="pt-2.5">
                    <h3 className="display text-[1.6rem] text-ink sm:text-[1.8rem]">{step.title}</h3>
                    <p className="mt-2.5 max-w-lg text-[0.98rem] leading-relaxed text-ink/70">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
