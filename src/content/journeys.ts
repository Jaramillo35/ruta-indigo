/**
 * Featured journeys. These are travel concepts, not fixed packages: no price,
 * no locked itinerary. `exampleDays` is explicitly labelled as an example in
 * the UI and must stay that way until the client confirms real durations.
 */
export type Journey = {
  slug: string;
  name: string;
  kicker: string;
  summary: string;
  stops: string[];
  includes: string[];
  exampleDays: string | null;
  bestFor: string;
  /** Matches a destination slug for the illustrated scene, or "custom". */
  art: "delhi" | "agra" | "jaipur" | "rishikesh" | "custom";
  /** /images/experiencias/<slug>/… — ver public/images/README.md */
  photo: string | null;
  photoAlt: string;
};

export const journeys: Journey[] = [
  {
    slug: "triangulo-dorado",
    name: "Triángulo Dorado",
    kicker: "Ruta clásica",
    summary:
      "Delhi, Agra y Jaipur: la primera India de casi todo el mundo. Historia, arquitectura, mercados y el Taj Mahal, recorridos en privado y a un ritmo que decides tú, no un autobús de cuarenta personas.",
    stops: ["Delhi", "Agra", "Jaipur"],
    includes: [
      "Acompañamiento en español durante el recorrido",
      "Van con aire acondicionado entre ciudades",
      "Visitas a monumentos con contexto histórico",
      "Tiempo real en mercados y barrios, no solo fotos",
    ],
    exampleDays: "5 a 8 días",
    bestFor: "Primera vez en India · Parejas y familias",
    art: "agra",
    // photo: "/images/experiencias/triangulo-dorado/portada.jpg",
    photo: null,
    photoAlt: "Ruta del Triángulo Dorado",
  },
  {
    slug: "india-a-tu-manera",
    name: "India a tu manera",
    kicker: "A la medida",
    summary:
      "El Triángulo Dorado no tiene por qué recorrerse igual para todos. Cuéntanos cómo te gusta viajar —con quién, cuántos días tienes, qué te interesa— y armamos la ruta a esa medida, con el ritmo y las paradas que te acomoden.",
    stops: ["Tú eliges el ritmo", "Nosotros armamos la ruta"],
    includes: [
      "Ruta armada a partir de tus intereses y tus fechas",
      "Más días en una ciudad y menos en otra, si así lo prefieres",
      "Ritmo adaptado a niños, adultos mayores o grupos",
      "Propuesta escrita antes de que confirmes nada",
    ],
    exampleDays: null,
    bestFor: "Familias · Grupos · Quien ya conoce parte de India",
    art: "custom",
    // photo: "/images/experiencias/india-a-tu-manera/portada.jpg",
    photo: null,
    photoAlt: "Itinerario personalizado por India",
  },
];
