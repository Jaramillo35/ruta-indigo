import { Reveal } from "@/components/reveal";
import { MediaFrame } from "@/components/media-frame";
import { Kicker } from "@/components/ui";
import { destinations, type Destination } from "@/content/destinations";
import { content, type Lang } from "@/content/i18n";

/**
 * The journey motif made literal. On wide screens the four destinations sit on
 * a drawn curve that fills in as the section arrives; on phones the same route
 * becomes a vertical line down the left of the stack. The line is decorative —
 * the reading order is a plain ordered list either way.
 */
/*
 * The route curve, as data: the two cubic segments of the drawn path. `routeY`
 * walks them to find the height of the line at a given x, which is how the
 * station dots stay welded to the curve whatever the number of destinations.
 */
const routeSegments = [
  [
    [40, 92],
    [220, 12],
    [360, 12],
    [540, 62],
  ],
  [
    [540, 62],
    [720, 112],
    [880, 102],
    [1160, 28],
  ],
] as const;

function routeY(x: number): number {
  let best = { distance: Infinity, y: 60 };
  for (const [p0, p1, p2, p3] of routeSegments) {
    for (let i = 0; i <= 240; i++) {
      const t = i / 240;
      const u = 1 - t;
      const bx =
        u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0];
      const distance = Math.abs(bx - x);
      if (distance < best.distance) {
        const by =
          u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1];
        best = { distance, y: by };
      }
    }
  }
  return best.y;
}

export function RouteSection({ lang }: { lang: Lang }) {
  const c = content[lang];
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
          <Kicker className="text-marigold">{c.route.kicker}</Kicker>
          <h2 className="display mt-6 text-[clamp(2.1rem,5.6vw,3.6rem)] text-mist">
            {c.route.heading}
            <span className="block italic text-sandstone">{c.route.headingAccent}</span>
          </h2>
          <p className="prose-lead mt-6 max-w-xl text-[1rem] leading-relaxed text-mist-2">
            {c.route.intro}
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

          {/* Stations sit on the curve itself: the y comes from evaluating the
              same path, so adding or removing a destination cannot knock them
              off the line. */}
          {destinations.map((destination, index) => {
            const centre = (index + 0.5) / destinations.length;
            return (
              <span
                key={destination.slug}
                aria-hidden="true"
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${centre * 100}%`, top: routeY(centre * 1200) * (112 / 120) }}
              >
                <span className="block size-2.5 rounded-full bg-marigold shadow-[0_0_0_5px_rgba(233,160,74,0.18)]" />
              </span>
            );
          })}

          <ol
            className="grid gap-6"
            style={{ gridTemplateColumns: `repeat(${destinations.length}, minmax(0, 1fr))` }}
          >
            {destinations.map((destination, index) => (
              <li
                key={destination.slug}
                className={index % 2 === 1 ? "lg:translate-y-10" : ""}
              >
                <DestinationCard destination={destination} index={index} lang={lang} />
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
                <DestinationCard destination={destination} index={index} lang={lang} />
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
  lang,
}: {
  destination: Destination;
  index: number;
  lang: Lang;
}) {
  const copy = content[lang].route.items[destination.slug];
  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-2xl border hairline">
        <MediaFrame
          photo={destination.photo}
          alt={copy.photoAlt}
          scene={destination.slug}
          sizes="(max-width: 1024px) 100vw, 25vw"
          className="aspect-5/4 w-full"
          imageClassName="transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-night/70 px-2.5 py-1 text-[0.7rem] tracking-[0.16em] text-marigold backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="display mt-5 text-[1.7rem] text-mist">{copy.name}</h3>
      <p className="mt-1 text-[0.72rem] tracking-[0.16em] text-mist-3 uppercase">
        {copy.state}
      </p>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-mist-2">{copy.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {copy.highlights.map((highlight) => (
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
