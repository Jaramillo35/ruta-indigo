/**
 * The photo band — the client's own travellers, in India.
 *
 * Paths and shape only; the alt text lives in i18n.ts, keyed by `id`, because
 * it is read aloud and has to be in the language of the page.
 */
export type GalleryItem = {
  id: "grupo-taj" | "viajera-humayun" | "pozo" | "arco";
  photo: string;
  /** How the tile behaves in the grid. */
  span: "tall" | "wide" | "square";
};

export const gallery: GalleryItem[] = [
  { id: "viajera-humayun", photo: "/images/gente/viajera-humayun.jpg", span: "tall" },
  { id: "grupo-taj", photo: "/images/gente/grupo-taj-saris.jpg", span: "wide" },
  { id: "pozo", photo: "/images/gente/pozo-escalonado.jpg", span: "square" },
  { id: "arco", photo: "/images/gente/arco-arenisca.jpg", span: "square" },
];
