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
import { destinationOptions, travellerRanges, tripTypes } from "@/content/copy";
import { site } from "@/content/site.config";
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

export function ContactForm() {
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
    const found = validateLead(lead);
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
    const outcome = await submitLead(lead);
    setResult(outcome);
    setStatus("done");
  }

  if (status === "done" && result) {
    return (
      <Outcome
        result={result}
        message={buildLeadMessage(lead)}
        nombre={lead.nombre}
        copied={copied}
        onCopy={async () => {
          try {
            await navigator.clipboard.writeText(buildLeadMessage(lead));
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
        <Row label="Nombre" htmlFor={`${id}-nombre`} error={errors.nombre} errorId={`${id}-nombre-error`} required>
          <input
            id={`${id}-nombre`}
            name="nombre"
            className="field"
            autoComplete="name"
            placeholder="Cómo te llamas"
            value={lead.nombre}
            aria-invalid={Boolean(errors.nombre)}
            aria-describedby={describe("nombre")}
            onChange={(event) => field("nombre", event.target.value)}
          />
        </Row>

        <Row label="Email" htmlFor={`${id}-email`} error={errors.email} errorId={`${id}-email-error`} required>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            className="field"
            autoComplete="email"
            placeholder="tucorreo@ejemplo.com"
            value={lead.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describe("email")}
            onChange={(event) => field("email", event.target.value)}
          />
        </Row>

        <Row
          label="WhatsApp o teléfono"
          htmlFor={`${id}-telefono`}
          error={errors.telefono}
          errorId={`${id}-telefono-error`}
          hint="Con clave de país, por ejemplo +52 55 1234 5678."
          hintId={`${id}-telefono-hint`}
        >
          <input
            id={`${id}-telefono`}
            name="telefono"
            type="tel"
            inputMode="tel"
            className="field"
            autoComplete="tel"
            placeholder="+52 55 1234 5678"
            value={lead.telefono}
            aria-invalid={Boolean(errors.telefono)}
            aria-describedby={describe("telefono", "hint")}
            onChange={(event) => field("telefono", event.target.value)}
          />
        </Row>

        <Row label="País de residencia" htmlFor={`${id}-pais`}>
          <input
            id={`${id}-pais`}
            name="pais"
            className="field"
            list={`${id}-paises`}
            autoComplete="country-name"
            placeholder="México"
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
          label="Fechas aproximadas"
          htmlFor={`${id}-fechas`}
          hint="Un mes o una temporada basta. Todavía no necesitas fechas exactas."
          hintId={`${id}-fechas-hint`}
        >
          <input
            id={`${id}-fechas`}
            name="fechas"
            className="field"
            placeholder="Segunda quincena de marzo"
            value={lead.fechas}
            aria-describedby={`${id}-fechas-hint`}
            onChange={(event) => field("fechas", event.target.value)}
          />
        </Row>

        <Row label="Número de viajeros" htmlFor={`${id}-viajeros`}>
          <select
            id={`${id}-viajeros`}
            name="viajeros"
            className="field"
            value={lead.viajeros}
            onChange={(event) => field("viajeros", event.target.value)}
          >
            <option value="">Selecciona</option>
            {travellerRanges.map((range) => (
              <option key={range} value={range}>
                {range} {range === "1" ? "viajero" : "viajeros"}
              </option>
            ))}
          </select>
        </Row>
      </div>

      <fieldset>
        <legend className="text-[0.82rem] font-medium tracking-wide text-ink">
          Destinos de interés <span className="text-clay">*</span>
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
        <legend className="text-[0.82rem] font-medium tracking-wide text-ink">Tipo de viaje</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {tripTypes.map((type) => {
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
        label="Cuéntanos lo que tengas en mente"
        htmlFor={`${id}-mensaje`}
        hint="Con quién viajas, qué te interesa, si hay niños o adultos mayores, cuántos días tienes."
        hintId={`${id}-mensaje-hint`}
      >
        <textarea
          id={`${id}-mensaje`}
          name="mensaje"
          rows={4}
          className="field resize-y"
          placeholder="Somos dos, nos interesa el Taj Mahal y unos días tranquilos al final…"
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
            Autorizo que usen mis datos para responder a esta solicitud y prepararme una
            propuesta de viaje. Nada más.{" "}
            <a href={site.legal.privacyHref} className="underline underline-offset-2 hover:text-clay">
              Aviso de privacidad
            </a>
            .
          </span>
        </label>
        {errors.privacidad && <ErrorText id={`${id}-privacidad-error`}>{errors.privacidad}</ErrorText>}
      </div>

      <div className="flex flex-col gap-4 border-t border-ink/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[0.8rem] leading-relaxed text-ink/60">
          Te respondemos personalmente. No compartimos tus datos con terceros ni te inscribimos
          a ninguna lista.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="pressable inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-b from-marigold to-saffron px-7 py-3.5 text-[0.95rem] font-medium text-night shadow-[0_10px_30px_-12px_rgba(226,112,31,0.9)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending" ? "Preparando…" : "Enviar solicitud"}
          {status !== "sending" && <ArrowRight />}
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        {Object.keys(errors).length > 0
          ? "El formulario tiene campos por revisar."
          : status === "sending"
            ? "Preparando tu solicitud."
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
  copied,
  onCopy,
  onReset,
}: {
  result: LeadResult;
  message: string;
  nombre: string;
  copied: boolean;
  onCopy: () => void;
  onReset: () => void;
}) {
  const firstName = nombre.trim().split(" ")[0];

  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-5 text-ink">
      {result.kind === "sent" && (
        <>
          <h3 className="display text-[1.9rem]">Recibimos tu solicitud{firstName ? `, ${firstName}` : ""}.</h3>
          <p className="text-[1rem] leading-relaxed text-ink/75">
            Te vamos a escribir personalmente con una propuesta de ruta. {site.contact.responseTime}
          </p>
        </>
      )}

      {result.kind === "handoff" && (
        <>
          <h3 className="display text-[1.9rem]">
            Tu mensaje está listo{firstName ? `, ${firstName}` : ""}.
          </h3>
          <p className="text-[1rem] leading-relaxed text-ink/75">
            Todavía no lo hemos recibido: falta un paso. Abre{" "}
            {result.channel === "whatsapp" ? "WhatsApp" : "tu correo"} con el botón de abajo —el
            mensaje ya va escrito con todos tus datos— y presiona enviar.
          </p>
          <a
            href={result.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable inline-flex w-fit items-center gap-2 rounded-full bg-linear-to-b from-marigold to-saffron px-7 py-3.5 text-[0.95rem] font-medium text-night"
          >
            {result.channel === "whatsapp" ? <WhatsAppGlyph /> : null}
            {result.channel === "whatsapp" ? "Abrir WhatsApp con mi mensaje" : "Abrir mi correo"}
            <ArrowRight />
          </a>
        </>
      )}

      {result.kind === "error" && (
        <>
          <h3 className="display text-[1.9rem]">No pudimos enviar tu solicitud.</h3>
          <p className="text-[1rem] leading-relaxed text-ink/75">{result.message}</p>
        </>
      )}

      <details className="rounded-2xl border border-ink/15 bg-white/50 p-4">
        <summary className="cursor-pointer text-[0.88rem] font-medium">Ver el mensaje</summary>
        <pre className="mt-3 max-h-56 overflow-auto text-[0.82rem] leading-relaxed whitespace-pre-wrap text-ink/75">
          {message}
        </pre>
        <button
          type="button"
          onClick={onCopy}
          className="pressable mt-3 rounded-full border border-ink/20 px-4 py-2 text-[0.82rem] hover:border-ink/40 hover:bg-white"
        >
          {copied ? "Copiado" : "Copiar mensaje"}
        </button>
      </details>

      <button
        type="button"
        onClick={onReset}
        className="pressable w-fit text-[0.88rem] text-clay underline underline-offset-4"
      >
        Enviar otra solicitud
      </button>
    </div>
  );
}
