import { mailtoLink, whatsappLink, site } from "@/content/site.config";
import type { Content } from "@/content/i18n";

type FormCopy = Content["form"];

export type Lead = {
  nombre: string;
  email: string;
  telefono: string;
  pais: string;
  fechas: string;
  viajeros: string;
  destinos: string[];
  tipoViaje: string;
  mensaje: string;
  privacidad: boolean;
};

export type LeadErrors = Partial<Record<keyof Lead, string>>;

export const emptyLead: Lead = {
  nombre: "",
  email: "",
  telefono: "",
  pais: "",
  fechas: "",
  viajeros: "",
  destinos: [],
  tipoViaje: "",
  mensaje: "",
  privacidad: false,
};

/** Deliberately permissive: this is a lead form, not an identity check. */
export function validateLead(lead: Lead, copy: FormCopy): LeadErrors {
  const errors: LeadErrors = {};

  if (lead.nombre.trim().length < 2) errors.nombre = copy.errors.nombre;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email.trim())) errors.email = copy.errors.email;

  const digits = lead.telefono.replace(/\D/g, "");
  if (lead.telefono.trim().length > 0 && digits.length < 8) errors.telefono = copy.errors.telefono;

  if (lead.destinos.length === 0) errors.destinos = copy.errors.destinos;
  if (!lead.privacidad) errors.privacidad = copy.errors.privacidad;

  return errors;
}

/**
 * The same human-readable summary for every channel, written in the language
 * the traveller was reading — they are the one who presses send on it.
 */
export function buildLeadMessage(lead: Lead, copy: FormCopy): string {
  const m = copy.message;
  const lines = [
    m.intro,
    "",
    `${m.nombre}: ${lead.nombre}`,
    `${m.email}: ${lead.email}`,
    lead.telefono ? `${m.telefono}: ${lead.telefono}` : null,
    lead.pais ? `${m.pais}: ${lead.pais}` : null,
    lead.fechas ? `${m.fechas}: ${lead.fechas}` : null,
    lead.viajeros ? `${m.viajeros}: ${lead.viajeros}` : null,
    lead.destinos.length ? `${m.destinos}: ${lead.destinos.join(", ")}` : null,
    lead.tipoViaje ? `${m.tipoViaje}: ${lead.tipoViaje}` : null,
    lead.mensaje ? `` : null,
    lead.mensaje ? `${lead.mensaje}` : null,
  ].filter((line): line is string => line !== null);

  return lines.join("\n");
}

export type LeadResult =
  | { kind: "sent" }
  | { kind: "handoff"; channel: "whatsapp" | "email"; href: string }
  | { kind: "error"; message: string };

/**
 * One seam for lead delivery.
 *
 * With NEXT_PUBLIC_LEAD_ENDPOINT set, the enquiry is POSTed as JSON and we can
 * honestly say it arrived. Without it, nothing on this site can receive a
 * message — so we do not pretend one was sent. We hand the traveller a
 * prefilled WhatsApp thread or email draft and tell them to press send.
 */
export async function submitLead(lead: Lead, copy: FormCopy, lang: string): Promise<LeadResult> {
  const message = buildLeadMessage(lead, copy);

  if (site.lead.endpoint) {
    try {
      const response = await fetch(site.lead.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, message, lang, source: "sitio-web" }),
      });
      if (response.ok) return { kind: "sent" };
    } catch {
      // fall through to the handoff below
    }
  }

  const wa = whatsappLink(message);
  if (wa) return { kind: "handoff", channel: "whatsapp", href: wa };

  const mail = mailtoLink(
    `${copy.message.subject} — ${lead.nombre || copy.message.unnamed}`,
    message,
  );
  if (mail) return { kind: "handoff", channel: "email", href: mail };

  return { kind: "error", message: copy.outcome.noChannel };
}
