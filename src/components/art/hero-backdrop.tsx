"use client";

import { useEffect, useRef } from "react";

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
  const cityRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y > window.innerHeight * 1.2) return;
      if (skyRef.current) skyRef.current.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
      if (cityRef.current) cityRef.current.style.transform = `translate3d(0, ${y * 0.1}px, 0)`;
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
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <defs>
            <linearGradient id="hero-sky" x1="0" y1="0" x2="0.25" y2="1">
              <stop offset="0%" stopColor="#07101f" />
              <stop offset="34%" stopColor="#152e57" />
              <stop offset="62%" stopColor="#5c3350" />
              <stop offset="82%" stopColor="#bb6122" />
              <stop offset="100%" stopColor="#e9a04a" />
            </linearGradient>
            <radialGradient id="hero-sun" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fdefd7" stopOpacity="0.98" />
              <stop offset="30%" stopColor="#f2c184" stopOpacity="0.72" />
              <stop offset="62%" stopColor="#d4842f" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#cd6f2b" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hero-haze" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e9a04a" stopOpacity="0" />
              <stop offset="100%" stopColor="#e9a04a" stopOpacity="0.22" />
            </linearGradient>
          </defs>
          <rect width="1440" height="900" fill="url(#hero-sky)" />
          <circle cx="1010" cy="640" r="330" fill="url(#hero-sun)" />
          <circle cx="1010" cy="640" r="96" fill="#fbe4c2" fillOpacity="0.5" />
          <rect y="520" width="1440" height="380" fill="url(#hero-haze)" />
          {/* distant kite / bird cluster */}
          <g stroke="#0d1a2e" strokeOpacity="0.45" strokeWidth="2.4" fill="none" strokeLinecap="round">
            <path d="M250 210c9-9 15-9 24 0" />
            <path d="M296 236c8-8 13-8 20 0" />
            <path d="M214 264c7-7 11-7 17 0" />
            <path d="M1180 300c8-8 13-8 20 0" />
            <path d="M1224 268c6-6 10-6 15 0" />
          </g>
        </svg>
      </div>

      <div ref={cityRef} className="absolute inset-x-0 bottom-0 h-[86%] will-change-transform">
        <svg viewBox="0 0 1440 780" preserveAspectRatio="xMidYMax slice" className="h-full w-full">
          {/* far ridge */}
          <path
            d="M0 566l150-52 120 34 160-64 150 58 170-72 160 66 150-46 180 56 40-14v292H0z"
            fill="#14294a"
            fillOpacity="0.55"
          />
          <g fill="#0a1526" fillOpacity="0.9">
            {/* Jaipur-style stepped facade, left */}
            <path d="M40 780V596l40-20 44 20h150l44-20 40 20v184z" />
            {Array.from({ length: 14 }).map((_, i) => (
              <path key={i} d={`M${44 + i * 22} 594v-9a11 11 0 0 1 22 0v9z`} />
            ))}
            {[110, 200, 290].map((x) => (
              <g key={x}>
                <path d={`M${x} 570c-14 11-19 24-19 32h38c0-8-5-21-19-32z`} />
                <rect x={x - 2} y="556" width="4" height="16" />
              </g>
            ))}
            {/* tapering minar */}
            <path d="M470 780V614l-14-96h-34l-14 96v166z" />
            {[540, 580, 620].map((y, i) => (
              <rect key={y} x={410 - i * 2} y={y} width={56 + i * 4} height="7" rx="3" />
            ))}
            <rect x="431" y="498" width="18" height="22" rx="3" />
            <circle cx="440" cy="494" r="6" />
            {/* the dome cluster, right of centre */}
            <rect x="700" y="700" width="440" height="80" />
            <rect x="810" y="640" width="220" height="62" />
            <path d="M920 470c-52 40-70 95-70 128 0 31 31 52 70 52s70-21 70-52c0-33-18-88-70-128z" />
            <rect x="915" y="434" width="10" height="40" />
            <circle cx="920" cy="428" r="11" />
            {[840, 1000].map((x) => (
              <g key={x}>
                <path d={`M${x} 592c-20 15-27 35-27 47h54c0-12-7-32-27-47z`} />
                <rect x={x - 3} y="572" width="6" height="22" />
              </g>
            ))}
            {[742, 800, 1040, 1098].map((x) => (
              <g key={`min-${x}`}>
                <rect x={x - 7} y="536" width="14" height="164" />
                <rect x={x - 12} y="528" width="24" height="10" rx="3" />
                <circle cx={x} cy="520" r="9" />
                <rect x={x - 1.6} y="500" width="3.2" height="18" />
              </g>
            ))}
            {/* arch openings, catching the last light */}
            <path d="M893 700v-52a27 27 0 0 1 54 0v52z" fill="#cd6f2b" fillOpacity="0.32" />
            {/* small temple spire, far right */}
            <path d="M1290 780V640l-34-84-34 84v140z" />
            <rect x="1250" y="530" width="12" height="28" />
          </g>
        </svg>
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
      <div className="absolute inset-0 bg-linear-to-r from-night/92 via-night/58 to-night/12" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-b from-transparent to-night" />
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-night/80 to-transparent" />
    </div>
  );
}
