/**
 * The one file the client edits.
 *
 * Everything that is a business fact — the name, the channels people reach us
 * on, the links in the footer — lives here so the site can be re-pointed
 * without touching a component. Anything still unconfirmed is left empty on
 * purpose: the UI degrades to the next honest channel instead of inventing a
 * phone number or a claim.
 */

export const site = {
  /**
   * The client's own name and mark. `nameIsProvisional` is what puts the
   * "nombre de trabajo" note in the footer — now false, because this is final.
   * Changing `name` here updates the header, the metadata, the share image,
   * the structured data and the footer at once.
   */
  brand: {
    name: "Migryan Travels",
    nameIsProvisional: false,
    shortName: "Migryan",
    tagline: "Viajes privados por India, en español",
    /** Used for canonical URLs, Open Graph and JSON-LD. */
    domain: "https://migryan-travels.example.com",
    /**
     * Dónde está publicado el sitio hoy. La vista previa de un solo archivo lo
     * usa para enlazar a las páginas que no caben dentro de ella —la versión en
     * inglés y los textos legales—. Cambiar al dominio definitivo al publicar.
     */
    publishedUrl: "https://jaramillo35.github.io/ruta-indigo",
  },

  contact: {
    /** Replace with the real inbox. Empty string hides every email CTA. */
    email: "mlabastidag@gmail.com",
    /** Inbox for travel agencies / referral partners. Falls back to `email`. */
    agencyEmail: "",
    /**
     * WhatsApp in full international form, digits only, no "+" and no spaces.
     * Example for Mexico City: "5215512345678".
     * Left empty until the client confirms the number — while it is empty every
     * WhatsApp call to action falls back to email instead of linking nowhere.
     */
    whatsapp: "525510480027",
    /** How the number should read on screen, e.g. "+52 55 1234 5678". */
    whatsappDisplay: "+52 55 1048 0027",
    /** Free text under the footer contact block. */
    responseTime: "Respondemos personalmente, normalmente en menos de 24 horas.",
    /** Where the team is based. Shown in the footer and in structured data. */
    baseNote: "Coordinación local en India · Atención en español",
  },

  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
  },

  /**
   * Lead delivery. When `endpoint` is set the form POSTs the enquiry there as
   * JSON and reports a real success. When it is empty the form never claims to
   * have sent anything: it hands the traveller a prefilled WhatsApp message or
   * email draft and says so plainly.
   */
  lead: {
    endpoint: process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "",
  },

  /**
   * Fotografía de terceros usada en el sitio. La licencia de Unsplash no exige
   * atribución, pero se deja registrada aquí y en el pie: cuando lleguen fotos
   * propias de Jaipur, se borra la entrada y se cambia la ruta en
   * destinations.ts.
   */
  photoCredits: [{ author: "Roberto Reposo", source: "Unsplash", subject: "Hawa Mahal" }],

  legal: {
    privacyHref: "/aviso-de-privacidad",
    termsHref: "/terminos",
  },
} as const;

export const whatsappConfigured = site.contact.whatsapp.length > 0;
export const emailConfigured = site.contact.email.length > 0;

/** wa.me link with a prefilled message, or null when no number is configured. */
export function whatsappLink(message: string): string | null {
  if (!whatsappConfigured) return null;
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject: string, body?: string): string | null {
  if (!emailConfigured) return null;
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  return `mailto:${site.contact.email}?${params.toString().replace(/\+/g, "%20")}`;
}

export const agencyEmail = site.contact.agencyEmail || site.contact.email;
