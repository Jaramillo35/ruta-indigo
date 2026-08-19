/*
 * Illustrated scenes.
 *
 * These are deliberately stylised silhouettes, never fake photographs. They
 * exist so the layout is complete and cinematic before the client's own
 * photography arrives; each one sits behind the same <Frame> as a real image,
 * at the same aspect ratio, so swapping in a JPG shifts nothing.
 */

type SceneProps = { className?: string; tone?: "dusk" | "night" | "dawn" };

const palettes = {
  dusk: ["#14294a", "#5c3350", "#b9601f", "#e9a04a"],
  night: ["#07101f", "#102341", "#1c3a5e", "#a85a20"],
  dawn: ["#16304f", "#7c3c4c", "#cd6f2b", "#edb161"],
} as const;

function Sky({ id, tone = "dusk" }: { id: string; tone?: keyof typeof palettes }) {
  const [a, b, c, d] = palettes[tone];
  return (
    <defs>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={a} />
        <stop offset="45%" stopColor={b} />
        <stop offset="78%" stopColor={c} />
        <stop offset="100%" stopColor={d} />
      </linearGradient>
      <radialGradient id={`${id}-sun`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#fdefd7" stopOpacity="0.95" />
        <stop offset="45%" stopColor="#f2c184" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#cd6f2b" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#07101f" stopOpacity="0" />
        <stop offset="100%" stopColor="#07101f" stopOpacity="0.92" />
      </linearGradient>
    </defs>
  );
}

function Base({
  id,
  tone,
  children,
  className,
}: {
  id: string;
  tone?: keyof typeof palettes;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
      className={className}
    >
      <Sky id={id} tone={tone} />
      <rect width="800" height="600" fill={`url(#${id}-sky)`} />
      {children}
      <rect y="430" width="800" height="170" fill={`url(#${id}-fade)`} />
    </svg>
  );
}

function Birds({ x = 120, y = 120, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      fill="none"
      stroke="#0d1a2e"
      strokeOpacity="0.5"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M0 0c6-6 10-6 16 0" />
      <path d="M26 14c5-5 8-5 13 0" />
      <path d="M-18 26c4-4 7-4 11 0" />
    </g>
  );
}

/* ---------------- Agra — Taj Mahal ---------------- */

export function AgraScene({ className, tone = "dawn" }: SceneProps) {
  return (
    <Base id="agra" tone={tone} className={className}>
      <circle cx="400" cy="330" r="150" fill="url(#agra-sun)" />
      <Birds x={130} y={110} scale={1.1} />
      <Birds x={620} y={150} scale={0.8} />
      {/* far bank */}
      <path d="M0 400h800v200H0z" fill="#0d1a2e" fillOpacity="0.28" />
      <g fill="#0a1526" fillOpacity="0.92">
        {/* platform */}
        <rect x="215" y="392" width="370" height="14" />
        {/* minarets */}
        {[248, 300, 500, 552].map((x, i) => (
          <g key={x}>
            <rect x={x - 5} y={i < 2 ? 262 : 262} width="10" height="130" />
            <rect x={x - 9} y="256" width="18" height="8" rx="2" />
            <circle cx={x} cy="250" r="7" />
            <rect x={x - 1.2} y="236" width="2.4" height="12" />
          </g>
        ))}
        {/* main block */}
        <rect x="330" y="318" width="140" height="74" />
        {/* iwan arch */}
        <path d="M383 392v-40a17 17 0 0 1 34 0v40z" fill="#07101f" fillOpacity="0.55" />
        {/* dome */}
        <path d="M400 200c-34 26-46 62-46 84 0 20 20 34 46 34s46-14 46-34c0-22-12-58-46-84z" />
        <rect x="397" y="176" width="6" height="26" />
        <circle cx="400" cy="172" r="8" />
        {/* side cupolas */}
        {[348, 452].map((x) => (
          <g key={x}>
            <path d={`M${x} 300c-13 10-18 23-18 31h36c0-8-5-21-18-31z`} />
            <rect x={x - 2} y="288" width="4" height="14" />
          </g>
        ))}
      </g>
      {/* water + reflection */}
      <rect y="406" width="800" height="194" fill="#08172b" fillOpacity="0.55" />
      <g fill="#e9a04a" fillOpacity="0.16">
        <rect x="392" y="418" width="16" height="120" rx="8" />
        <rect x="246" y="424" width="4" height="70" rx="2" />
        <rect x="550" y="424" width="4" height="70" rx="2" />
      </g>
      <g stroke="#f6d9a4" strokeOpacity="0.18" strokeWidth="1.5">
        {[440, 470, 500, 530, 560].map((y) => (
          <path key={y} d={`M${120 + (y % 60)} ${y}h${240 + (y % 90)}`} />
        ))}
      </g>
    </Base>
  );
}

/* ---------------- Jaipur — Hawa Mahal ---------------- */

export function JaipurScene({ className, tone = "dusk" }: SceneProps) {
  const windows: React.ReactElement[] = [];
  for (let row = 0; row < 4; row++) {
    const count = 9 - row;
    const width = 34;
    const gap = 12;
    const total = count * width + (count - 1) * gap;
    const startX = 400 - total / 2;
    const y = 250 + row * 52;
    for (let i = 0; i < count; i++) {
      const x = startX + i * (width + gap);
      windows.push(
        <g key={`${row}-${i}`}>
          <path
            d={`M${x} ${y + 40}v-22a${width / 2} ${width / 2} 0 0 1 ${width} 0v22z`}
            fill="#e9a04a"
            fillOpacity={0.32 - row * 0.05}
          />
          <path
            d={`M${x} ${y + 40}v-22a${width / 2} ${width / 2} 0 0 1 ${width} 0v22z`}
            fill="none"
            stroke="#07101f"
            strokeOpacity="0.5"
            strokeWidth="2"
          />
        </g>,
      );
    }
  }
  return (
    <Base id="jaipur" tone={tone} className={className}>
      <circle cx="620" cy="180" r="120" fill="url(#jaipur-sun)" />
      <Birds x={140} y={140} scale={0.9} />
      <g fill="#0a1526" fillOpacity="0.94">
        {/* stepped facade */}
        <path d="M150 600V264l50-26 60 26h280l60-26 50 26v336z" />
        {/* crenellation */}
        {Array.from({ length: 22 }).map((_, i) => (
          <path key={i} d={`M${152 + i * 22} 262v-10a11 11 0 0 1 22 0v10z`} />
        ))}
        {/* cupolas */}
        {[220, 400, 580].map((x) => (
          <g key={x}>
            <path d={`M${x} 236c-16 12-22 27-22 36h44c0-9-6-24-22-36z`} />
            <rect x={x - 2} y="220" width="4" height="18" />
            <circle cx={x} cy="216" r="6" />
          </g>
        ))}
      </g>
      {windows}
      <rect y="560" width="800" height="40" fill="#07101f" fillOpacity="0.6" />
    </Base>
  );
}

/* ---------------- Delhi — Qutub Minar + arches ---------------- */

export function DelhiScene({ className, tone = "night" }: SceneProps) {
  return (
    <Base id="delhi" tone={tone} className={className}>
      <circle cx="250" cy="250" r="140" fill="url(#delhi-sun)" />
      <Birds x={560} y={120} scale={1} />
      {/* haze skyline */}
      <path
        d="M0 452l60-18 40 12 50-26 46 20 60-10 44 16 56-24 60 18 52-12 48 22 62-16 60 18 42-10v150H0z"
        fill="#0d1a2e"
        fillOpacity="0.42"
      />
      <g fill="#0a1526" fillOpacity="0.94">
        {/* tapering minar with balcony bands */}
        <path d="M568 500V300l-18-92h-44l-18 92v200z" />
        {[236, 300, 364, 428].map((y, i) => (
          <rect key={y} x={476 - i * 3} y={y} width={68 + i * 6} height="9" rx="3" />
        ))}
        <rect x="518" y="186" width="20" height="22" rx="3" />
        <circle cx="528" cy="182" r="7" />
        {/* arcade */}
        <rect x="120" y="470" width="300" height="30" />
        {[140, 210, 280, 350].map((x) => (
          <path
            key={x}
            d={`M${x} 470v-52a26 26 0 0 1 52 0v52z`}
            fill="#0a1526"
            fillOpacity="0.94"
          />
        ))}
        {[140, 210, 280, 350].map((x) => (
          <path
            key={`in-${x}`}
            d={`M${x + 10} 470v-44a16 16 0 0 1 32 0v44z`}
            fill="#cd6f2b"
            fillOpacity="0.2"
          />
        ))}
      </g>
      <rect y="500" width="800" height="100" fill="#07101f" fillOpacity="0.75" />
    </Base>
  );
}

/* ---------------- Rishikesh — Ganges, bridge, foothills ---------------- */

export function RishikeshScene({ className, tone = "dawn" }: SceneProps) {
  return (
    <Base id="rishikesh" tone={tone} className={className}>
      <circle cx="430" cy="300" r="160" fill="url(#rishikesh-sun)" />
      <Birds x={180} y={120} scale={1.1} />
      {/* far ridge */}
      <path d="M0 330l120-70 90 52 110-84 120 96 130-70 110 66 120-40v280H0z" fill="#14294a" fillOpacity="0.65" />
      {/* near ridge */}
      <path d="M0 400l140-58 120 44 130-56 140 62 130-40 140 48v200H0z" fill="#0a1526" fillOpacity="0.9" />
      {/* suspension bridge */}
      <g stroke="#07101f" strokeOpacity="0.9" fill="none">
        <path d="M60 388h680" strokeWidth="5" />
        <path d="M60 356q340 96 680 0" strokeWidth="3" />
        {Array.from({ length: 17 }).map((_, i) => {
          const x = 70 + i * 42;
          const t = (x - 60) / 680;
          const y = 356 + 96 * (4 * t * (1 - t)) * 0.98;
          return <path key={i} d={`M${x} ${y}v${388 - y}`} strokeWidth="1.6" strokeOpacity="0.6" />;
        })}
        <path d="M60 340v70M740 340v70" strokeWidth="6" />
      </g>
      {/* river */}
      <path d="M0 430h800v170H0z" fill="#0f3550" fillOpacity="0.55" />
      <g stroke="#f6d9a4" strokeOpacity="0.2" strokeWidth="1.6">
        {[452, 486, 520, 554].map((y, i) => (
          <path key={y} d={`M${60 + i * 40} ${y}h${300 + i * 60}`} />
        ))}
      </g>
      {/* floating lamps */}
      <g fill="#e9a04a" fillOpacity="0.65">
        {[
          [180, 470],
          [300, 508],
          [520, 486],
          [640, 540],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" />
        ))}
      </g>
    </Base>
  );
}

/* ---------------- Custom itinerary — route abstraction ---------------- */

export function CustomScene({ className, tone = "night" }: SceneProps) {
  return (
    <Base id="custom" tone={tone} className={className}>
      <circle cx="470" cy="330" r="120" fill="url(#custom-sun)" />
      {/* a horizon so the abstraction still reads as a landscape */}
      <path d="M0 372l130-42 120 34 140-52 130 46 150-38 130 40v240H0z" fill="#14294a" fillOpacity="0.6" />
      <path d="M0 432l150-40 140 34 150-44 140 40 130-26 130 32v192H0z" fill="#0a1526" fillOpacity="0.92" />
      <g fill="none" stroke="#e9a04a" strokeOpacity="0.6" strokeWidth="2.5" strokeLinecap="round">
        <path d="M110 500q130-160 290-124t280-106" strokeDasharray="10 14" />
        <path d="M110 540q170-104 300-58t250-160" strokeOpacity="0.22" strokeDasharray="4 12" />
      </g>
      <g fill="#e9a04a">
        {[
          [110, 500],
          [400, 350],
          [680, 270],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="7" />
            <circle cx={x} cy={y} r="16" fill="none" stroke="#e9a04a" strokeOpacity="0.35" strokeWidth="1.5" />
          </g>
        ))}
      </g>
      {/* compass rose */}
      <g transform="translate(150 208) scale(0.8)" stroke="#f1e8dc" strokeOpacity="0.3" fill="none">
        <circle r="42" strokeWidth="1.2" />
        <circle r="28" strokeWidth="0.8" strokeDasharray="3 6" />
        <path d="M0-46V46M-46 0H46" strokeWidth="0.8" />
        <path d="M0-34l9 25 25 9-25 9-9 25-9-25-25-9 25-9z" fill="#e9a04a" fillOpacity="0.5" stroke="none" />
      </g>
      <rect y="520" width="800" height="80" fill="#07101f" fillOpacity="0.6" />
    </Base>
  );
}

const map = {
  delhi: DelhiScene,
  agra: AgraScene,
  jaipur: JaipurScene,
  rishikesh: RishikeshScene,
  custom: CustomScene,
} as const;

export type SceneName = keyof typeof map;

export function Scene({ name, className, tone }: { name: SceneName } & SceneProps) {
  const Component = map[name];
  return <Component className={className} tone={tone} />;
}
