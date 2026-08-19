import { Reveal } from "@/components/reveal";
import { MediaFrame } from "@/components/media-frame";
import { Kicker } from "@/components/ui";
import { destinations } from "@/content/destinations";

/**
 * The journey motif made literal. On wide screens the four destinations sit on
 * a drawn curve that fills in as the section arrives; on phones the same route
 * becomes a vertical line down the left of the stack. The line is decorative —
 * the reading order is a plain ordered list either way.
 */
export function RouteSection() {
  return (
    <section id="destinos" className="grain relative overflow-hidden bg-indigo">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 size-[36rem] rounded-full bg-dusk/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 size-[30rem] rounded-full bg-clay/20 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="max-w-3xl">
          <Kicker className="text-marigold">Destinos</Kicker>
          <h2 className="display mt-6 text-[clamp(2.1rem,5.6vw,3.6rem)] text-mist">
            Cuatro paradas, una sola ruta
            <span className="block italic text-sandstone">que puedes armar como quieras.</span>
          </h2>
          <p className="prose-lead mt-6 max-w-xl text-[1rem] leading-relaxed text-mist-2">
            Del bullicio de Delhi al silencio del Himalaya hay unas ocho horas de camino y dos
            países distintos dentro del mismo país. Puedes recorrerlas todas o quedarte solo con
            las que te llamen.
          </p>
        </Reveal>

        {/* Desktop: the route is drawn above the cards, which hang from it. */}
        <Reveal className="relative mt-16 hidden pt-28 lg:block">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-28 w-full"
          >
            <path
              className="route-path"
              d="M40 92C220 12 360 12 540 62s340 40 620-34"
              fill="none"
              stroke="url(#route-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1400"
              strokeDashoffset="1400"
            />
            <defs>
              <linearGradient id="route-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#e9a04a" stopOpacity="0.15" />
                <stop offset="35%" stopColor="#e9a04a" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#cd6f2b" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Stations on the line. The offsets are the curve's own y values at
              each column centre, read off the path above. */}
          {[
            { left: "11.75%", top: 49 },
            { left: "37.25%", top: 37 },
            { left: "62.75%", top: 87 },
            { left: "88.25%", top: 50 },
          ].map((node, index) => (
            <span
              key={node.left}
              aria-hidden="true"
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: node.left, top: node.top }}
            >
              <span className="block size-2.5 rounded-full bg-marigold shadow-[0_0_0_5px_rgba(245,181,63,0.16)]" />
              <span className="sr-only">{destinations[index]?.name}</span>
            </span>
          ))}

          <ol className="grid grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <li
                key={destination.slug}
                className={index % 2 === 1 ? "lg:translate-y-10" : ""}
              >
                <DestinationCard destination={destination} index={index} />
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Phone: the same route as a vertical spine. Tablet: two columns —
            a single 700px-wide card per row would dwarf everything else. */}
        <div className="relative mt-14 lg:hidden">
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-10 left-[7px] w-px bg-linear-to-b from-marigold/70 via-marigold/40 to-transparent sm:hidden"
          />
          <ol className="flex flex-col gap-10 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12">
            {destinations.map((destination, index) => (
              <Reveal
                key={destination.slug}
                as="li"
                delay={index * 60}
                className="relative pl-9 sm:pl-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-2 left-0 block size-[15px] rounded-full border-2 border-marigold bg-indigo sm:hidden"
                />
                <DestinationCard destination={destination} index={index} />
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function DestinationCard({
  destination,
  index,
}: {
  destination: (typeof destinations)[number];
  index: number;
}) {
  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-2xl border hairline">
        <MediaFrame
          photo={destination.photo}
          alt={destination.photoAlt}
          scene={destination.slug}
          sizes="(max-width: 1024px) 100vw, 25vw"
          className="aspect-5/4 w-full"
          imageClassName="transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-night/70 px-2.5 py-1 text-[0.7rem] tracking-[0.16em] text-marigold backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="display mt-5 text-[1.7rem] text-mist">{destination.name}</h3>
      <p className="mt-1 text-[0.72rem] tracking-[0.16em] text-mist-3 uppercase">
        {destination.state}
      </p>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-mist-2">{destination.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {destination.highlights.map((highlight) => (
          <li
            key={highlight}
            className="rounded-full border border-white/12 px-2.5 py-1 text-[0.75rem] text-mist-2"
          >
            {highlight}
          </li>
        ))}
      </ul>
    </article>
  );
}
