import { HeroBackdrop } from "@/components/art/hero-backdrop";
import { Cta, ArrowRight } from "@/components/ui";
import { destinations } from "@/content/destinations";

export function Hero() {
  return (
    <section id="inicio" className="grain relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden pt-32 pb-0">
      <HeroBackdrop />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-10 sm:px-8 sm:pb-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8 xl:col-span-7">
            <p
              className="kicker rise flex items-center gap-3 text-marigold"
              style={{ "--rise-delay": "80ms" } as React.CSSProperties}
            >
              <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
              Viajes privados por India
            </p>

            <h1
              className="display rise mt-5 text-[clamp(2.9rem,10.5vw,6.4rem)] text-mist"
              style={{ "--rise-delay": "160ms" } as React.CSSProperties}
            >
              Descubre India
              <span className="block italic text-marigold">en tu idioma.</span>
            </h1>

            <p
              className="prose-lead rise mt-7 max-w-xl text-[1.05rem] leading-relaxed text-mist-2 sm:text-[1.15rem]"
              style={{ "--rise-delay": "260ms" } as React.CSSProperties}
            >
              Diseñamos viajes privados por India para ti y para los tuyos, con acompañamiento
              real en español. Sin traductor de por medio, sin autobuses de cuarenta personas:
              una ruta pensada para tu ritmo.
            </p>

            <div
              className="rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ "--rise-delay": "360ms" } as React.CSSProperties}
            >
              <Cta href="#contacto">
                Diseña tu viaje
                <ArrowRight />
              </Cta>
              <Cta href="#experiencias" variant="ghost">
                Explora las rutas
              </Cta>
            </div>

            <p
              className="rise mt-8 text-[0.8rem] tracking-[0.14em] text-mist-2/80 uppercase"
              style={{ "--rise-delay": "460ms" } as React.CSSProperties}
            >
              Tours privados <span aria-hidden="true">·</span> Atención en español{" "}
              <span aria-hidden="true">·</span> Itinerarios personalizados
            </p>
          </div>
        </div>
      </div>

      {/* The route motif, introduced at the very first screen. */}
      <div className="relative z-10 border-t hairline">
        <div className="glass">
          <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
            <div className="flex items-center gap-4 sm:justify-between">
              <span className="hidden shrink-0 text-[0.7rem] tracking-[0.22em] text-mist-2 uppercase md:block">
                La ruta
              </span>
              <ol className="flex flex-1 items-center justify-between gap-1 sm:gap-4 md:flex-none md:justify-end">
                {destinations.map((destination, index) => (
                  <li key={destination.slug} className="flex flex-1 items-center gap-1 first:flex-none sm:gap-4 md:flex-none">
                    {index > 0 && (
                      <span
                        aria-hidden="true"
                        className="rise block h-px w-full min-w-2 flex-1 origin-left bg-linear-to-r from-marigold/70 to-marigold/20 md:w-12 md:flex-none"
                        style={{ "--rise-delay": `${600 + index * 120}ms` } as React.CSSProperties}
                      />
                    )}
                    <a
                      href="#destinos"
                      className="group flex shrink-0 items-center gap-1.5 rounded-full py-2 text-[0.78rem] whitespace-nowrap text-mist transition-colors hover:text-marigold sm:gap-2 sm:text-[0.85rem]"
                    >
                      <span
                        aria-hidden="true"
                        className="block size-1.5 rounded-full bg-marigold transition-transform duration-300 group-hover:scale-150"
                      />
                      {destination.name}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
