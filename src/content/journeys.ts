/**
 * Featured journeys — the facts that do not change with language.
 *
 * These are travel concepts, not fixed packages: no price, no locked itinerary.
 * The wording, including the example length that must stay labelled as an
 * example, lives in i18n.ts keyed by these slugs.
 */
import type { DestinationSlug } from "@/content/destinations";

export type JourneySlug = "triangulo-dorado" | "india-a-tu-manera";

export type Journey = {
  slug: JourneySlug;
  /** Matches a destination slug for the illustrated scene, or "custom". */
  art: DestinationSlug | "custom";
  /** /images/experiencias/<slug>/… — ver public/images/README.md */
  photo: string | null;
};

export const journeys: Journey[] = [
  {
    slug: "triangulo-dorado",
    art: "agra",
    photo: "/images/experiencias/triangulo-dorado/grupo-puerta.jpg",
  },
  {
    slug: "india-a-tu-manera",
    art: "custom",
    photo: "/images/experiencias/india-a-tu-manera/grupo-humayun.jpg",
  },
];
