"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { navItems } from "@/content/navigation";
import { site, whatsappConfigured, whatsappLink, mailtoLink } from "@/content/site.config";
import { Cta, Wordmark, WhatsAppGlyph } from "@/components/ui";

const sectionIds = navItems.map((item) => item.href.slice(1));

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll spy: the section occupying the middle of the viewport wins. */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.6] },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, close]);

  const waHref = whatsappLink("Hola, me interesa un viaje privado por India.");
  const mailHref = mailtoLink("Consulta sobre un viaje a India");
  const quickHref = waHref ?? mailHref ?? "#contacto";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? "glass border-b hairline shadow-[0_10px_40px_-24px_rgba(0,0,0,0.9)]"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="#inicio"
          className="rounded-md text-mist transition-opacity hover:opacity-80"
          aria-label={`${site.brand.name} — inicio`}
        >
          <Wordmark name={site.brand.name} />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const id = item.href.slice(1);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active === id ? "true" : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-[0.9rem] transition-colors duration-200 ${
                      active === id ? "text-marigold" : "text-mist-2 hover:text-mist"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {whatsappConfigured && (
            <a
              href={quickHref}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-[0.9rem] text-mist hover:border-white/50 hover:bg-white/8"
            >
              <WhatsAppGlyph />
              WhatsApp
            </a>
          )}
          <Cta href="#contacto" className="px-5 py-2.5">
            Diseña tu viaje
          </Cta>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => (open ? close() : setOpen(true))}
          aria-expanded={open}
          aria-controls="menu-movil"
          className="pressable -mr-2 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-[0.85rem] text-mist lg:hidden"
        >
          <span className="relative block h-3 w-4" aria-hidden="true">
            <span
              className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-transform duration-300 ${
                open ? "top-[5px] rotate-45" : "top-0"
              }`}
              style={{ transitionTimingFunction: "var(--ease-out)" }}
            />
            <span
              className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-all duration-300 ${
                open ? "top-[5px] -rotate-45" : "top-[10px] w-3"
              }`}
              style={{ transitionTimingFunction: "var(--ease-out)" }}
            />
          </span>
          {open ? "Cerrar" : "Menú"}
        </button>
      </div>

      {/* Mobile panel. Kept mounted so it can transition out; inert when closed
          so neither the keyboard nor a screen reader can reach it. */}
      <div
        id="menu-movil"
        ref={panelRef}
        inert={!open}
        className={`origin-top overflow-y-auto border-t hairline bg-night/97 backdrop-blur-xl transition-[opacity,transform] duration-300 lg:hidden ${
          open
            ? "pointer-events-auto h-[calc(100svh-var(--header-h))] max-h-[calc(100svh-var(--header-h))] opacity-100"
            : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
        }`}
        style={{ transitionTimingFunction: "var(--ease-out)" }}
      >
        <nav aria-label="Principal (móvil)" className="flex min-h-full flex-col px-5 pt-3 pb-8 sm:px-8">
          <ul className="flex flex-col">
            {navItems.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="display block border-b border-white/8 py-3.5 text-[1.6rem] text-mist transition-colors hover:text-marigold"
                  style={{
                    transitionDelay: open ? `${index * 25}ms` : "0ms",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <p className="text-[0.72rem] tracking-[0.2em] text-mist-3 uppercase">
              Delhi · Agra · Jaipur · Rishikesh
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <Cta href="#contacto" onClick={() => setOpen(false)}>
                Diseña tu viaje
              </Cta>
              {whatsappConfigured && (
                <Cta href={quickHref} variant="ghost" target="_blank" rel="noopener noreferrer">
                  <WhatsAppGlyph />
                  Escríbenos por WhatsApp
                </Cta>
              )}
            </div>
            {site.contact.email && (
              <a
                href={`mailto:${site.contact.email}`}
                className="mt-5 block text-[0.85rem] text-mist-2 transition-colors hover:text-marigold"
              >
                {site.contact.email}
              </a>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
