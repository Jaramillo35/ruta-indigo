import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icons";
import { Kicker } from "@/components/ui";
import { benefits } from "@/content/copy";

export function PromiseSection() {
  return (
    <section className="relative bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <Kicker className="text-clay">Por qué existimos</Kicker>
              <h2 className="display mt-6 text-[clamp(2.1rem,5.6vw,3.6rem)] text-ink">
                Viajar lejos se siente distinto cuando alguien te entiende.
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:pt-16">
            <Reveal delay={80}>
              <p className="prose-lead text-[1.05rem] leading-relaxed text-ink/75">
                En India es común encontrar viajes anunciados «en español» que a la hora de la
                verdad se resuelven con un traductor en el celular. No estamos aquí para hablar
                mal de nadie: simplemente creemos que entender lo que ves —y poder preguntar lo
                que se te ocurra, cuando se te ocurra— cambia el viaje por completo.
              </p>
              <p className="prose-lead mt-5 text-[1.05rem] leading-relaxed text-ink/75">
                Por eso trabajamos al revés: primero la conversación contigo, en tu idioma, antes
                de salir, mientras estás allá y cuando algo cambia sobre la marcha.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-ink/10 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
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
