/**
 * Destinations — the facts that do not change with language.
 *
 * The words (name, description, highlights, alt text) live in i18n.ts, keyed by
 * these slugs, so a second language is a translation rather than a second copy
 * of the photo paths.
 *
 * Today the offer is the Golden Triangle only; Rishikesh is out until the client
 * is ready to run it, though its slug and illustration are still supported.
 *
 * `photo` is null until real photography arrives — the component then renders
 * the illustrated scene for that slug instead. Dropping a file in /public/images
 * and writing its path here is the whole swap; the aspect ratio is fixed by the
 * component, so nothing shifts when it loads.
 */
export type DestinationSlug = "delhi" | "agra" | "jaipur" | "rishikesh";

export type Destination = {
  slug: DestinationSlug;
  order: number;
  /**
   * Ruta pública de la foto, o null para usar la ilustración del lugar.
   * Cada destino tiene su carpeta: /images/destinos/<slug>/
   * Ejemplo: "/images/destinos/agra/taj-amanecer.jpg"
   * Ver public/images/README.md
   */
  photo: string | null;
};

export const destinations: Destination[] = [
  { slug: "delhi", order: 1, photo: "/images/destinos/delhi/tumba-humayun.jpg" },
  { slug: "agra", order: 2, photo: "/images/destinos/agra/taj-mahal.jpg" },
  { slug: "jaipur", order: 3, photo: "/images/destinos/jaipur/hawa-mahal.jpg" },
];
