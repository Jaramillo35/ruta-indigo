"use client";

import { useId, useRef, useState } from "react";
import {
  buildLeadMessage,
  emptyLead,
  submitLead,
  validateLead,
  type Lead,
  type LeadErrors,
  type LeadResult,
} from "@/lib/lead";
import { destinations } from "@/content/destinations";
import { content, type Content, type Lang } from "@/content/i18n";
import { ArrowRight, WhatsAppGlyph } from "@/components/ui";

const countries = [
  "México",
  "Colombia",
  "Argentina",
  "Chile",
  "Perú",
  "España",
  "Estados Unidos",
  "Ecuador",
  "Costa Rica",
  "Guatemala",
  "Uruguay",
  "República Dominicana",
];

type Status = "idle" | "sending" | "done";

export function ContactForm({ lang, privacyHref }: { lang: Lang; privacyHref: string }) {
  const c: Content["form"] = content[lang].form;
  /* The destination choices are the destinations actually on offer, named in
     the language being read, plus the "recommend me something" escape hatch. */
  const destinationOptions = [
    ...destinations.map((destination) => ({
      value: destination.slug as string,
      label: content[lang].route.items[destination.slug].name,
    })),
    { value: "recomendacion", label: c.recommendation },
  ];
  const id = useId();
  const [lead, setLead] = useState<Lead>(emptyLead);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<LeadResult | null>(null);
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const field = <K extends keyof Lead>(key: K, value: Lead[K]) => {
    setLead((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const describe = (key: keyof Lead, hint?: string) => {
    const ids = [errors[key] ? `${id}-${key}-error` : null, hint ? `${id}-${key}-hint` : null]
      .filter(Boolean)
      .join(" ");
    return ids || undefined;
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateLead(lead, c);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0];
      const target = formRef.current?.querySelector<HTMLElement>(
        `[name="${firstKey}"], [data-group="${firstKey}"]`,
      );
      target?.focus();
      target?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setStatus("sending");
    const outcome = await submitLead(lead, c, lang);
    setResult(outcome);
    setStatus("done");
  }

  if (status === "done" && result) {
    return (
      <Outcome
        result={result}
        message={buildLeadMessage(lead, c)}
        nombre={lead.nombre}
        copy={c}
        copied={copied}
        onCopy={async () => {
          try {
            await navigator.clipboard.writeText(buildLeadMessage(lead, c));
            setCopied(true);
          } catch {
            setCopied(false);
          }
        }}
        onReset={() => {
          setLead(emptyLead);
          setResult(null);
          setCopied(false);
          setStatus("idle");
        }}
      />
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Row label={c.nombre.label} htmlFor={`${id}-nombre`} error={errors.nombre} errorId={`${id}-nombre-error`} required>
          <input
            id={`${id}-nombre`}
            name="nombre"
            className="field"
            autoComplete="name"
            placeholder={c.nombre.placeholder}
            value={lead.nombre}
            aria-invalid={Boolean(errors.nombre)}
            aria-describedby={describe("nombre")}
            onChange={(event) => field("nombre", event.target.value)}
          />
        </Row>

        <Row label={c.email.label} htmlFor={`${id}-email`} error={errors.email} errorId={`${id}-email-error`} required>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            className="field"
            autoComplete="email"
            placeholder={c.email.placeholder}
            value={lead.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describe("email")}
            onChange={(event) => field("email", event.target.value)}
          />
        </Row>

        <Row
          label={c.telefono.label}
          htmlFor={`${id}-telefono`}
          error={errors.telefono}
          errorId={`${id}-telefono-error`}
          hint={c.telefono.hint}
          hintId={`${id}-telefono-hint`}
        >
          <input
            id={`${id}-telefono`}
            name="telefono"
            type="tel"
            inputMode="tel"
            className="field"
            autoComplete="tel"
            placeholder={c.telefono.placeholder}
            value={lead.telefono}
            aria-invalid={Boolean(errors.telefono)}
            aria-describedby={describe("telefono", "hint")}
            onChange={(event) => field("telefono", event.target.value)}
          />
        </Row>

        <Row label={c.pais.label} htmlFor={`${id}-pais`}>
          <input
            id={`${id}-pais`}
            name="pais"
            className="field"
            list={`${id}-paises`}
            autoComplete="country-name"
            placeholder={c.pais.placeholder}
            value={lead.pais}
            onChange={(event) => field("pais", event.target.value)}
          />
          <datalist id={`${id}-paises`}>
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
        </Row>

        <Row
          label={c.fechas.label}
          htmlFor={`${id}-fechas`}
          hint={c.fechas.hint}
          hintId={`${id}-fechas-hint`}
        >
          <input
            id={`${id}-fechas`}
            name="fechas"
            className="field"
            placeholder={c.fechas.placeholder}
            value={lead.fechas}
            aria-describedby={`${id}-fechas-hint`}
            onChange={(event) => field("fechas", event.target.value)}
          />
        </Row>

        <Row label={c.viajeros.label} htmlFor={`${id}-viajeros`}>
          <select
            id={`${id}-viajeros`}
            name="viajeros"
            className="field"
            value={lead.viajeros}
            onChange={(event) => field("viajeros", event.target.value)}
          >
            <option value="">{c.viajeros.placeholder}</option>
            {c.travellerRanges.map((range) => (
              <option key={range} value={range}>
                {range} {range === "1" ? c.viajeroSingular : c.viajeroPlural}
              </option>
            ))}
          </select>
        </Row>
      </div>

      <fieldset>
        <legend className="text-[0.82rem] font-medium tracking-wide text-ink">
          {c.destinos.label} <span className="text-clay">*</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {destinationOptions.map((option, index) => {
            const checked = lead.destinos.includes(option.label);
            return (
              <label
                key={option.value}
                className={`pressable cursor-pointer rounded-full border px-4 py-2.5 text-[0.9rem] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-clay ${
                  checked
                    ? "border-clay bg-clay text-paper"
                    : "border-ink/20 bg-white/60 text-ink hover:border-ink/40 hover:bg-white"
                }`}
              >
                <input
                  type="checkbox"
                  name="destinos"
                  data-group={index === 0 ? "destinos" : undefined}
                  className="sr-only"
                  value={option.label}
                  checked={checked}
                  aria-describedby={errors.destinos ? `${id}-destinos-error` : undefined}
                  onChange={(event) =>
                    field(
                      "destinos",
                      event.target.checked
                        ? [...lead.destinos, option.label]
                        : lead.destinos.filter((value) => value !== option.label),
                    )
                  }
                />
                {option.label}
              </label>
            );
          })}
        </div>
        {errors.destinos && <ErrorText id={`${id}-destinos-error`}>{errors.destinos}</ErrorText>}
      </fieldset>

      <fieldset>
        <legend className="text-[0.82rem] font-medium tracking-wide text-ink">{c.tipoViaje.label}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {c.tripTypes.map((type) => {
            const checked = lead.tipoViaje === type;
            return (
              <label
                key={type}
                className={`pressable cursor-pointer rounded-full border px-4 py-2.5 text-[0.9rem] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-clay ${
                  checked
                    ? "border-clay bg-clay text-paper"
                    : "border-ink/20 bg-white/60 text-ink hover:border-ink/40 hover:bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="tipoViaje"
                  className="sr-only"
                  value={type}
                  checked={checked}
                  onChange={() => field("tipoViaje", type)}
                />
                {type}
              </label>
            );
          })}
        </div>
      </fieldset>

      <Row
        label={c.mensaje.label}
        htmlFor={`${id}-mensaje`}
        hint={c.mensaje.hint}
        hintId={`${id}-mensaje-hint`}
      >
        <textarea
          id={`${id}-mensaje`}
          name="mensaje"
          rows={4}
          className="field resize-y"
          placeholder={c.mensaje.placeholder}
          value={lead.mensaje}
          aria-describedby={`${id}-mensaje-hint`}
          onChange={(event) => field("mensaje", event.target.value)}
        />
      </Row>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.88rem] leading-relaxed text-ink/75">
          <input
            type="checkbox"
            name="privacidad"
            className="mt-0.5 size-5 shrink-0 accent-[#a85a20]"
            checked={lead.privacidad}
            aria-invalid={Boolean(errors.privacidad)}
            aria-describedby={errors.privacidad ? `${id}-privacidad-error` : undefined}
            onChange={(event) => field("privacidad", event.target.checked)}
          />
          <span>
            {c.privacidad.text}{" "}
            <a href={privacyHref} className="underline underline-offset-2 hover:text-clay">
              {c.privacidad.link}
            </a>
            .
          </span>
        </label>
        {errors.privacidad && <ErrorText id={`${id}-privacidad-error`}>{errors.privacidad}</ErrorText>}
      </div>

      <div className="flex flex-col gap-4 border-t border-ink/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[0.8rem] leading-relaxed text-ink/60">
          {c.reassurance}
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="pressable inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-b from-marigold to-saffron px-7 py-3.5 text-[0.95rem] font-medium text-night shadow-[0_10px_30px_-12px_rgba(226,112,31,0.9)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending" ? c.submitting : c.submit}
          {status !== "sending" && <ArrowRight />}
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        {Object.keys(errors).length > 0
          ? c.errors.review
          : status === "sending"
            ? c.errors.preparing
            : ""}
      </p>
    </form>
  );
}

function Row({
  label,
  htmlFor,
  error,
  errorId,
  hint,
  hintId,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  errorId?: string;
  hint?: string;
  hintId?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[0.82rem] font-medium tracking-wide text-ink">
        {label} {required && <span className="text-clay">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={hintId} className="text-[0.78rem] leading-relaxed text-ink/65">
          {hint}
        </p>
      )}
      {error && errorId && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-[0.8rem] text-[#8f2517]">
      <span aria-hidden="true">↳</span>
      {children}
    </p>
  );
}

/**
 * What happens after "Enviar". The wording follows what actually occurred: a
 * real POST says the enquiry arrived; a handoff says, plainly, that the message
 * is ready but still has to be sent by the traveller.
 */
function Outcome({
  result,
  message,
  nombre,
  copy,
  copied,
  onCopy,
  onReset,
}: {
  result: LeadResult;
  message: string;
  nombre: string;
  copy: Content["form"];
  copied: boolean;
  onCopy: () => void;
  onReset: () => void;
}) {
  const firstName = nombre.trim().split(" ")[0];
  const o = copy.outcome;
  const named = (title: string) => `${title}${firstName ? `, ${firstName}` : ""}.`;

  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-5 text-ink">
      {result.kind === "sent" && (
        <>
          <h3 className="display text-[1.9rem]">{named(o.sentTitle)}</h3>
          <p className="text-[1rem] leading-relaxed text-ink/75">{o.sentBody}</p>
        </>
      )}

      {result.kind === "handoff" && (
        <>
          <h3 className="display text-[1.9rem]">{named(o.handoffTitle)}</h3>
          <p className="text-[1rem] leading-relaxed text-ink/75">
            {result.channel === "whatsapp" ? o.handoffWhatsApp : o.handoffEmail}
          </p>
          <a
            href={result.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable inline-flex w-fit items-center gap-2 rounded-full bg-linear-to-b from-marigold to-saffron px-7 py-3.5 text-[0.95rem] font-medium text-night"
          >
            {result.channel === "whatsapp" ? <WhatsAppGlyph /> : null}
            {result.channel === "whatsapp" ? o.openWhatsApp : o.openEmail}
            <ArrowRight />
          </a>
        </>
      )}

      {result.kind === "error" && (
        <>
          <h3 className="display text-[1.9rem]">{o.errorTitle}</h3>
          <p className="text-[1rem] leading-relaxed text-ink/75">{result.message}</p>
        </>
      )}

      <details className="rounded-2xl border border-ink/15 bg-white/50 p-4">
        <summary className="cursor-pointer text-[0.88rem] font-medium">{o.seeMessage}</summary>
        <pre className="mt-3 max-h-56 overflow-auto text-[0.82rem] leading-relaxed whitespace-pre-wrap text-ink/75">
          {message}
        </pre>
        <button
          type="button"
          onClick={onCopy}
          className="pressable mt-3 rounded-full border border-ink/20 px-4 py-2 text-[0.82rem] hover:border-ink/40 hover:bg-white"
        >
          {copied ? o.copied : o.copy}
        </button>
      </details>

      <button
        type="button"
        onClick={onReset}
        className="pressable w-fit text-[0.88rem] text-clay underline underline-offset-4"
      >
        {o.again}
      </button>
    </div>
  );
}
