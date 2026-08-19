const common = {
  width: 26,
  height: 26,
  viewBox: "0 0 26 26",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function Icon({ name, className = "" }: { name: string; className?: string }) {
  switch (name) {
    case "speech":
      return (
        <svg {...common} className={className}>
          <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h13A2.5 2.5 0 0 1 22 6.5v8a2.5 2.5 0 0 1-2.5 2.5H12l-5 4.2V17H6.5A2.5 2.5 0 0 1 4 14.5z" />
          <path d="M9.5 8.6h7M9.5 12.2h4.4" />
        </svg>
      );
    case "route":
      return (
        <svg {...common} className={className}>
          <circle cx="6" cy="6.5" r="2.5" />
          <circle cx="20" cy="19.5" r="2.5" />
          <path d="M8.5 6.5h6a4 4 0 0 1 0 8h-3a4 4 0 0 0 0 8h6" />
        </svg>
      );
    case "van":
      return (
        <svg {...common} className={className}>
          <path d="M2.5 16.5v-5A2.5 2.5 0 0 1 5 9h8.6a3 3 0 0 1 2.3 1.1l2.7 3.2h2.4a2.5 2.5 0 0 1 2.5 2.5v1.2H21" />
          <path d="M9 18h6.5M2.5 18H5" />
          <circle cx="7" cy="18.4" r="2.1" />
          <circle cx="17.6" cy="18.4" r="2.1" />
          <path d="M9.5 9v4.3M2.5 13.3h6" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common} className={className}>
          <circle cx="13" cy="13" r="9.5" />
          <path d="M17.2 8.8l-2.3 5.6-5.6 2.3 2.3-5.6z" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common} className={className}>
          <path d="M13 5.5v15M5.5 13h15" />
        </svg>
      );
    default:
      return null;
  }
}
