import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * A minimal wordmark: a sun low on the horizon with a route running through it.
 * No religious iconography, no imitation of any existing mark — and it is a
 * single inline SVG so it stays crisp and costs no request.
 */
export function Wordmark({
  name,
  className = "",
  markOnly = false,
}: {
  name: string;
  className?: string;
  markOnly?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="15" cy="13" r="6.5" fill="url(#mark-sun)" />
        <path
          d="M2 21.5c4.2-3.4 8.1-.4 12.3-3.6 3.6-2.8 8.2-2 13.7 1.3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.85"
        />
        <circle cx="4.4" cy="20.2" r="1.7" fill="currentColor" />
        <circle cx="25.8" cy="19.4" r="1.7" fill="currentColor" />
        <defs>
          <linearGradient id="mark-sun" x1="8" y1="6" x2="22" y2="20">
            <stop stopColor="#f5b53f" />
            <stop offset="1" stopColor="#e2701f" />
          </linearGradient>
        </defs>
      </svg>
      {!markOnly && (
        <span className="display text-[1.05rem] tracking-[0.06em] uppercase">{name}</span>
      )}
    </span>
  );
}

type CtaProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "ghost" | "quiet";
  children: ReactNode;
};

export function Cta({ variant = "primary", className = "", children, ...props }: CtaProps) {
  const base =
    "pressable inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.95rem] font-medium";
  const styles = {
    primary:
      "bg-linear-to-b from-marigold to-saffron text-night shadow-[0_10px_30px_-10px_rgba(226,112,31,0.75)] hover:from-[#f8c25c] hover:to-[#e8802f]",
    ghost:
      "border border-white/25 text-mist backdrop-blur-sm hover:border-white/60 hover:bg-white/8",
    quiet:
      "border border-ink/15 bg-white/60 text-ink hover:border-ink/35 hover:bg-white",
  }[variant];

  return (
    <Link className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`kicker flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
      {children}
    </p>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 8h9.5M8.5 4l4.2 4-4.2 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.24 8.21Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.04s.87 2.37 1 2.53c.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
