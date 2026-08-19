import { mailtoLink, whatsappLink, site } from "@/content/site.config";

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
export function validateLead(lead: Lead): LeadErrors {
  const errors: LeadErrors = {};

  if (lead.nombre.trim().length < 2) {
    errors.nombre = "Escribe tu nombre para saber cómo dirigirnos a ti.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email.trim())) {
    errors.email = "Revisa tu correo: parece que falta algo.";
  }
  const digits = lead.telefono.replace(/\D/g, "");
  if (lead.telefono.trim().length > 0 && digits.length < 8) {
    errors.telefono = "Incluye tu WhatsApp con clave de país, por ejemplo +52 55 1234 5678.";
  }
  if (lead.destinos.length === 0) {
    errors.destinos = "Elige al menos un destino, o marca «Quiero una recomendación».";
  }
  if (!lead.privacidad) {
    errors.privacidad = "Necesitamos tu autorización para poder responderte.";
  }

  return errors;
}

/** The same human-readable summary for every channel. */
export function buildLeadMessage(lead: Lead): string {
  const lines = [
    `Hola, quiero información para un viaje a India.`,
    ``,
    `Nombre: ${lead.nombre}`,
    `Correo: ${lead.email}`,
    lead.telefono ? `WhatsApp / teléfono: ${lead.telefono}` : null,
    lead.pais ? `País: ${lead.pais}` : null,
    lead.fechas ? `Fechas aproximadas: ${lead.fechas}` : null,
    lead.viajeros ? `Número de viajeros: ${lead.viajeros}` : null,
    lead.destinos.length ? `Destinos de interés: ${lead.destinos.join(", ")}` : null,
    lead.tipoViaje ? `Tipo de viaje: ${lead.tipoViaje}` : null,
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
export async function submitLead(lead: Lead): Promise<LeadResult> {
  const message = buildLeadMessage(lead);

  if (site.lead.endpoint) {
    try {
      const response = await fetch(site.lead.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, message, source: "sitio-web" }),
      });
      if (response.ok) return { kind: "sent" };
    } catch {
      // fall through to the handoff below
    }
  }

  const wa = whatsappLink(message);
  if (wa) return { kind: "handoff", channel: "whatsapp", href: wa };

  const mail = mailtoLink(
    `Solicitud de viaje a India — ${lead.nombre || "sin nombre"}`,
    message,
  );
  if (mail) return { kind: "handoff", channel: "email", href: mail };

  return {
    kind: "error",
    message:
      "Todavía no hay un canal de contacto configurado en el sitio. Copia tu mensaje y envíalo por el canal que la agencia publique.",
  };
}
