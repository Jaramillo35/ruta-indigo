"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

/*
 * The hero panorama.
 *
 * Three painted layers — sky, skyline, foreground — moved at different rates
 * while the hero is on screen. Transforms are written straight onto the layer
 * nodes inside a rAF (never onto a CSS variable on the shared parent, which
 * would restyle every child), and the whole thing switches off for
 * prefers-reduced-motion and once the hero has scrolled past.
 */
export function HeroBackdrop() {
  const skyRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y > window.innerHeight * 1.2) return;
      if (skyRef.current) skyRef.current.style.transform = `translate3d(0, ${y * 0.16}px, 0)`;
      if (frontRef.current) frontRef.current.style.transform = `translate3d(0, ${y * -0.04}px, 0)`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div ref={skyRef} className="absolute inset-x-0 -top-[8%] h-[120%] will-change-transform">
        {/* One flattened, pre-treated mosaic rather than a grid of live images:
            it keeps the tone consistent, costs a single request, and cannot
            reflow. Two crops, because a wide collage loses its outer tiles on a
            phone. */}
        <Image
          src={asset("/images/hero/collage-movil.jpg")}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover sm:hidden"
        />
        <Image
          src={asset("/images/hero/collage.jpg")}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden object-cover sm:block"
        />
      </div>

      <div ref={frontRef} className="absolute inset-x-0 -bottom-[6%] h-[42%] will-change-transform">
        <svg viewBox="0 0 1440 340" preserveAspectRatio="xMidYMax slice" className="h-full w-full">
          <path d="M0 120c180 34 320 8 520 34s340 6 520 26 260 22 400 12v148H0z" fill="#07101f" fillOpacity="0.96" />
          <g fill="#07101f">
            {/* palm silhouettes */}
            <g transform="translate(120 120)">
              <path d="M6 0v130h8V0z" />
              <path d="M10 6C-14-14-44-8-52 6c22-8 38-6 60 8zM10 6C34-14 64-8 72 6c-22-8-38-6-60 8zM10 4C0-24 12-46 30-50 18-36 14-20 18 4z" />
            </g>
            <g transform="translate(1290 138) scale(0.86)">
              <path d="M6 0v130h8V0z" />
              <path d="M10 6C-14-14-44-8-52 6c22-8 38-6 60 8zM10 6C34-14 64-8 72 6c-22-8-38-6-60 8zM10 4C0-24 12-46 30-50 18-36 14-20 18 4z" />
            </g>
          </g>
        </svg>
      </div>

      {/* scrims: keep every headline over a dark, even field */}
      <div className="absolute inset-0 bg-linear-to-r from-night/95 via-night/70 to-night/25" />
      <div className="absolute inset-0 bg-linear-to-t from-night/85 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-b from-transparent to-night" />
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-night/95 via-night/60 to-transparent" />
    </div>
  );
}
