import { Reveal } from "@/components/reveal";
import { MediaFrame } from "@/components/media-frame";
import { Cta, Kicker, ArrowRight } from "@/components/ui";
import { journeys } from "@/content/journeys";

export function JourneysSection() {
  return (
    <section id="experiencias" className="grain relative bg-night">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-linear-to-b from-dusk/35 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-2xl">
            <Kicker className="text-marigold">Experiencias</Kicker>
            <h2 className="display mt-6 text-[clamp(2.1rem,5.6vw,3.6rem)] text-mist">
              Una ruta clásica,
              <span className="block italic text-sandstone">y la libertad de acomodarla.</span>
            </h2>
          </Reveal>
          <Reveal delay={100} className="max-w-sm">
            <p className="text-[0.95rem] leading-relaxed text-mist-2">
              El Triángulo Dorado no es un paquete cerrado: es un punto de partida. Cambian los
              días, el orden y el ritmo según con quién viajes y qué te interese.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-16 sm:mt-20 sm:gap-24">
          {journeys.map((journey, index) => {
            const flipped = index % 2 === 1;
            return (
              <Reveal
                key={journey.slug}
                as="article"
                className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
              >
                <div
                  className={`lg:col-span-7 ${flipped ? "lg:order-2" : ""}`}
                >
                  <div className="group relative overflow-hidden rounded-[1.75rem] border hairline">
                    <MediaFrame
                      photo={journey.photo}
                      alt={journey.photoAlt}
                      scene={journey.art}
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="aspect-4/3 w-full sm:aspect-16/10"
                      imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-linear-to-t from-night/70 via-transparent to-transparent"
                    />
                    <ol className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                      {journey.stops.map((stop) => (
                        <li
                          key={stop}
                          className="glass rounded-full border border-white/15 px-3 py-1.5 text-[0.75rem] tracking-wide text-mist"
                        >
                          {stop}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className={`lg:col-span-5 ${flipped ? "lg:order-1" : ""}`}>
                  <p className="kicker text-sandstone">{journey.kicker}</p>
                  <h3 className="display mt-4 text-[clamp(1.9rem,4.6vw,2.9rem)] text-mist">
                    {journey.name}
                  </h3>
                  <p className="prose-lead mt-5 text-[1rem] leading-relaxed text-mist-2">
                    {journey.summary}
                  </p>

                  <ul className="mt-6 flex flex-col gap-3">
                    {journey.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.95rem] text-mist-2">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 block h-px w-4 shrink-0 bg-marigold/70"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4 border-t hairline pt-6">
                    {journey.exampleDays && (
                      <div>
                        <dt className="text-[0.7rem] tracking-[0.18em] text-mist-3 uppercase">
                          Duración de ejemplo
                        </dt>
                        <dd className="mt-1 text-[0.95rem] text-mist">
                          {journey.exampleDays}
                          <span className="text-mist-3"> · se confirma contigo</span>
                        </dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-[0.7rem] tracking-[0.18em] text-mist-3 uppercase">
                        Ideal para
                      </dt>
                      <dd className="mt-1 text-[0.95rem] text-mist">{journey.bestFor}</dd>
                    </div>
                  </dl>

                  <Cta href="#contacto" variant="ghost" className="mt-7">
                    Pedir una propuesta
                    <ArrowRight />
                  </Cta>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-16">
          <p className="text-center text-[0.85rem] text-mist-3">
            Los costos se cotizan por viaje, según fechas, número de personas y alojamiento. No
            manejamos precios fijos publicados.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
