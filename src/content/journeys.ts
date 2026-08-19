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
    slug: "india-espiritual",
    name: "India espiritual",
    kicker: "Ritmo lento",
    summary:
      "Rishikesh y el norte, para quien viaja buscando yoga, bienestar y tiempo junto al Ganges. Menos kilómetros por día, más espacio para estar. Se puede combinar con el Triángulo Dorado o vivirse solo.",
    stops: ["Rishikesh", "Haridwar", "Delhi (llegada)"],
    includes: [
      "Días con espacio: pocas visitas, más tiempo en cada una",
      "Práctica de yoga y meditación según tu nivel",
      "Ceremonia del atardecer junto al río",
      "Caminatas suaves por el pie del Himalaya",
    ],
    exampleDays: "4 a 7 días",
    bestFor: "Bienestar · Viajes en solitario · Retiros pequeños",
    art: "rishikesh",
    // photo: "/images/experiencias/india-espiritual/portada.jpg",
    photo: null,
    photoAlt: "Rishikesh y el río Ganges",
  },
  {
    slug: "india-a-tu-manera",
    name: "India a tu manera",
    kicker: "A la medida",
    summary:
      "¿Tienes claro lo que quieres ver, o no tienes idea y prefieres que te propongamos algo? Escríbenos cómo te gusta viajar —con quién, cuántos días, qué te interesa— y armamos una ruta desde cero.",
    stops: ["Tú eliges", "Nosotros proponemos"],
    includes: [
      "Ruta armada a partir de tus intereses y tus fechas",
      "Combinación de destinos, incluidos los que aún no listamos",
      "Ritmo adaptado a niños, adultos mayores o grupos",
      "Propuesta escrita antes de que confirmes nada",
    ],
    exampleDays: null,
    bestFor: "Grupos · Viajes largos · Segunda visita a India",
    art: "custom",
    // photo: "/images/experiencias/india-a-tu-manera/portada.jpg",
    photo: null,
    photoAlt: "Itinerario personalizado por India",
  },
];
