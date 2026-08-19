import { site, whatsappConfigured } from "@/content/site.config";

/**
 * Development-only reminder of what is still a placeholder. Never rendered in
 * a production build — it exists so the pending business details cannot be
 * forgotten while the site is being handed over.
 */
export function ConfigNotice() {
  if (process.env.NODE_ENV === "production") return null;

  const pending = [
    site.brand.nameIsProvisional ? "nombre de marca (working name)" : null,
    site.contact.email.endsWith("example.com") ? "correo de contacto" : null,
    !whatsappConfigured ? "número de WhatsApp" : null,
    Object.values(site.social).every((value) => value.length === 0) ? "redes sociales" : null,
    site.brand.domain.includes("example.com") ? "dominio" : null,
    !site.lead.endpoint ? "endpoint del formulario (NEXT_PUBLIC_LEAD_ENDPOINT)" : null,
  ].filter(Boolean);

  if (pending.length === 0) return null;

  return (
    <div className="fixed bottom-3 left-3 z-[60] max-w-xs rounded-xl border border-marigold/40 bg-night/90 p-3 text-[0.72rem] leading-relaxed text-mist-2 shadow-lg backdrop-blur">
      <strong className="block text-marigold">Solo en desarrollo · datos por confirmar</strong>
      <span className="mt-1 block">
        Pendiente en <code className="text-mist">src/content/site.config.ts</code>: {pending.join(", ")}.
      </span>
    </div>
  );
}
