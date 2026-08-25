import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Kicker } from "@/components/ui";
import { gallery } from "@/content/gallery";
import { content, type Lang } from "@/content/i18n";
import { asset } from "@/lib/asset";

/**
 * Photographs of the people who have actually travelled with them, at the point
 * in the page where someone has understood the offer and is asking the real
 * question: would that be me?
 */
export function GallerySection({ lang }: { lang: Lang }) {
  const c = content[lang];

  const shape = {
    tall: "sm:row-span-2 aspect-4/5",
    wide: "sm:col-span-2 aspect-16/10",
    square: "aspect-4/3",
  } as const;

  return (
    <section className="grain relative bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_80%_0%,rgba(31,58,99,0.55),transparent_60%)]"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="max-w-2xl">
          <Kicker className="text-marigold">{c.gallery.kicker}</Kicker>
          <h2 className="display mt-6 text-[clamp(2.1rem,5.6vw,3.4rem)] text-mist">
            {c.gallery.heading}
            <span className="block italic text-sandstone">{c.gallery.headingAccent}</span>
          </h2>
          <p className="prose-lead mt-6 max-w-xl text-[1rem] leading-relaxed text-mist-2">
            {c.gallery.intro}
          </p>
        </Reveal>

        <div className="mt-14 grid auto-rows-min grid-cols-1 gap-4 sm:grid-cols-3">
          {gallery.map((item, index) => (
            <Reveal
              key={item.id}
              delay={index * 70}
              className={`group relative overflow-hidden rounded-2xl border hairline ${shape[item.span]}`}
            >
              <Image
                src={asset(item.photo)}
                alt={c.gallery.alts[item.id]}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-night/45 via-transparent to-transparent"
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="text-[0.85rem] text-mist-3">{c.gallery.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
