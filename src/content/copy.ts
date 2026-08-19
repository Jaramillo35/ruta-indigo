/** Section copy that isn't a destination or a journey. All customer-facing. */

export const benefits = [
  {
    title: "Atención real en español",
    body: "Hablamos contigo en español desde el primer mensaje hasta el último día del viaje. Sin traductor automático de por medio, sin adivinar qué te están diciendo.",
    icon: "speech",
  },
  {
    title: "Siempre en privado",
    body: "Tu grupo y nadie más: parejas, familias, amigos o quien viaje solo. Los horarios se ajustan a ustedes, no al revés.",
    icon: "route",
  },
  {
    title: "Transporte y logística coordinados",
    body: "Van con aire acondicionado para los traslados, apoyo con hoteles y el orden del día resuelto antes de que llegues.",
    icon: "van",
  },
  {
    title: "Itinerario a tu medida",
    body: "Si te interesan los mercados y no los museos, se nota en la ruta. Ajustamos el ritmo, las horas de visita y los días de descanso.",
    icon: "compass",
  },
] as const;

export const steps = [
  {
    n: "01",
    title: "Cuéntanos cómo quieres viajar",
    body: "Llena el formulario o escríbenos. Con saber tus fechas aproximadas, cuántos son y qué te llama la atención es suficiente para empezar.",
  },
  {
    n: "02",
    title: "Diseñamos tu ruta",
    body: "Te proponemos un itinerario escrito: qué se visita cada día, cuánto se maneja entre ciudades y dónde conviene quedarse.",
  },
  {
    n: "03",
    title: "Confirmamos itinerario y costos",
    body: "Ajustamos lo que haga falta y te pasamos el costo desglosado de esa ruta en particular. Nada se reserva hasta que tú lo apruebes.",
  },
  {
    n: "04",
    title: "Te acompañamos en India",
    body: "Te recibimos, coordinamos los traslados y seguimos disponibles durante todo el viaje si algo cambia sobre la marcha.",
  },
] as const;

export const reasons = [
  {
    title: "Hablas con quien organiza",
    body: "No hay call center ni cadena de intermediarios. La persona que te responde es la que arma tu itinerario.",
  },
  {
    title: "Español de verdad, de principio a fin",
    body: "La comunicación previa, la asistencia durante el viaje y el acompañamiento en ruta son en español.",
  },
  {
    title: "Coordinación local en India",
    body: "Estamos del lado de allá: conductores, permisos de entrada a monumentos y cambios de última hora se resuelven en el mismo huso horario que tu viaje.",
  },
  {
    title: "Transporte privado y cómodo",
    body: "Vans con aire acondicionado para los traslados largos, con paradas cuando el grupo las necesita.",
  },
  {
    title: "Itinerarios flexibles",
    body: "Si un día amaneces cansado o quieres quedarte más tiempo en un lugar, se ajusta. Es tu viaje.",
  },
  {
    title: "Apoyo antes y durante",
    body: "Resolvemos dudas de preparación —qué llevar, cómo funciona el dinero, qué esperar— y seguimos contigo mientras estás allá.",
  },
] as const;

export const faqs = [
  {
    q: "¿Los recorridos son realmente en español?",
    a: "Sí. La comunicación contigo, la organización del viaje y el acompañamiento en ruta son en español. En algunos museos o sitios específicos puede haber guías locales que expliquen en inglés o hindi; en esos casos te lo traducimos en el momento. También podemos atender el viaje en inglés si viajas con alguien que lo prefiera.",
  },
  {
    q: "¿Los viajes son privados?",
    a: "Sí. Trabajamos únicamente con grupos privados: viajas con tu pareja, tu familia, tus amigos o solo, sin unirte a un grupo de desconocidos. Para grupos organizados más grandes también podemos armar la logística, escríbenos con los detalles.",
  },
  {
    q: "¿Puedo personalizar el itinerario?",
    a: "Esa es la idea. Las rutas que ves en la página son puntos de partida. A partir de tus fechas, tus intereses y con quién viajas armamos una propuesta y la ajustamos las veces que haga falta antes de que confirmes.",
  },
  {
    q: "¿Incluyen vuelos internacionales?",
    a: "No. Los vuelos desde América Latina hacia India los compras tú, y con gusto te orientamos sobre rutas y horarios convenientes. Los traslados terrestres dentro de India sí forman parte del viaje que organizamos.",
  },
  {
    q: "¿Pueden ayudarme con hoteles y transporte?",
    a: "Sí. Coordinamos el transporte terrestre en van con aire acondicionado y te ayudamos a elegir y reservar alojamiento según tu presupuesto y tu estilo de viaje. Qué queda incluido en el costo final depende de la ruta y te lo detallamos por escrito.",
  },
  {
    q: "¿Cómo recibo una cotización?",
    a: "Nos escribes por el formulario o por WhatsApp con tus fechas aproximadas y cuántas personas viajan. Te respondemos con una propuesta de ruta y su costo desglosado. No manejamos precios fijos publicados porque cada viaje se arma distinto.",
  },
  {
    q: "¿Puedo viajar en familia o con un grupo?",
    a: "Sí, y es de lo que más nos piden. Ajustamos el ritmo cuando viajan niños o adultos mayores: menos horas de carretera al día, descansos y horarios de comida razonables. Para grupos grandes coordinamos el transporte y los alojamientos que hagan falta.",
  },
  {
    q: "¿Con cuánto tiempo de anticipación debo contactarles?",
    a: "Mientras más pronto, mejor, sobre todo si viajas en temporada alta o con un grupo grande: hay más disponibilidad de hoteles y mejores opciones de vuelo. Si tu viaje es pronto, escríbenos de todos modos y te decimos con franqueza qué alcanzamos a organizar.",
  },
] as const;

/** Options shared by the form and the copy around it. */
export const tripTypes = ["Pareja", "Familia", "Amigos", "Grupo", "Viajo solo/a"] as const;

export const destinationOptions = [
  { value: "delhi", label: "Delhi" },
  { value: "agra", label: "Agra" },
  { value: "jaipur", label: "Jaipur" },
  { value: "recomendacion", label: "Quiero una recomendación" },
] as const;

export const travellerRanges = ["1", "2", "3 a 4", "5 a 8", "9 o más"] as const;
