/**
 * Destinations. `photo` is null until the client sends real photography — the
 * component then renders the illustrated scene for that slug instead. Dropping
 * a file in /public/images and writing its path here is the whole swap; the
 * aspect ratio is fixed by the component so nothing shifts when it loads.
 */
export type Destination = {
  slug: "delhi" | "agra" | "jaipur" | "rishikesh";
  name: string;
  state: string;
  order: number;
  /** One line for the route map node. */
  short: string;
  /** Two or three sentences for the destination card. */
  description: string;
  highlights: string[];
  /**
   * Ruta pública de la foto, o null para usar la ilustración del lugar.
   * Cada destino tiene su carpeta: /images/destinos/<slug>/
   * Ejemplo: "/images/destinos/agra/taj-amanecer.jpg"
   * Ver public/images/README.md
   */
  photo: string | null;
  photoAlt: string;
};

export const destinations: Destination[] = [
  {
    slug: "delhi",
    name: "Delhi",
    state: "Territorio de la Capital Nacional",
    order: 1,
    short: "El punto de llegada y el primer contacto con India.",
    description:
      "Casi todos los viajes empiezan aquí. Delhi mezcla la ciudad vieja —callejones, especias, mercados que llevan siglos abiertos— con avenidas amplias y monumentos coloniales. Es el mejor lugar para acomodar el cuerpo al cambio de horario sin perder el día.",
    highlights: ["Old Delhi y sus mercados", "Qutub Minar", "Puerta de India", "Comida callejera con guía"],
    // photo: "/images/destinos/delhi/old-delhi-mercado.jpg",
    photo: null,
    photoAlt: "Vista de Delhi",
  },
  {
    slug: "agra",
    name: "Agra",
    state: "Uttar Pradesh",
    order: 2,
    short: "El Taj Mahal y la orilla del Yamuna.",
    description:
      "El Taj Mahal cambia de color con la luz, y a qué hora lo visitas cambia por completo la experiencia. Agra también guarda su fuerte de arenisca roja y talleres donde todavía se trabaja el mármol incrustado a mano.",
    highlights: ["Taj Mahal", "Fuerte de Agra", "Talleres de marquetería en mármol", "Mirador del Yamuna"],
    // photo: "/images/destinos/agra/taj-amanecer.jpg",
    photo: null,
    photoAlt: "El Taj Mahal en Agra",
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    state: "Rajastán",
    order: 3,
    short: "Rajastán en rosa: palacios, textiles y color.",
    description:
      "La ciudad rosa es la parte más fotogénica del Triángulo Dorado y la favorita de quienes viajan en familia. Palacios, un observatorio del siglo XVIII y bazares de textiles y joyería donde conviene ir acompañado de alguien que conozca los precios.",
    highlights: ["Hawa Mahal", "Fuerte Amber", "Jantar Mantar", "Bazares de textiles"],
    // photo: "/images/destinos/jaipur/hawa-mahal.jpg",
    photo: null,
    photoAlt: "Fachada del Hawa Mahal en Jaipur",
  },
  {
    slug: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand",
    order: 4,
    short: "El Ganges, el Himalaya y otro ritmo.",
    description:
      "A los pies del Himalaya, donde el Ganges todavía baja frío y verde. Es el destino para quien viaja buscando yoga, silencio y días con menos agenda. Puede ser un viaje completo o los últimos días de una ruta más movida.",
    highlights: ["Yoga y meditación", "Ceremonia del atardecer junto al río", "Puentes colgantes", "Caminatas y cascadas"],
    // photo: "/images/destinos/rishikesh/ganges-atardecer.jpg",
    photo: null,
    photoAlt: "El río Ganges a su paso por Rishikesh",
  },
];
