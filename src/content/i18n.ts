/**
 * Every customer-facing string, in both languages.
 *
 * Spanish is the primary language and lives at "/"; English is a second static
 * page at "/en/". Keeping the copy here rather than inside components is what
 * makes a second language a translation job instead of a rewrite — and it keeps
 * the two versions honest about the same facts, since they sit side by side.
 *
 * Structural facts (slugs, photo paths, order) stay in destinations.ts and
 * journeys.ts; only words live here.
 */

export type Lang = "es" | "en";

export const languages: Lang[] = ["es", "en"];
export const defaultLang: Lang = "es";

/** Where each language lives. Used by the toggle, the nav and hreflang. */
export const routes = {
  es: { home: "/", privacy: "/aviso-de-privacidad", terms: "/terminos" },
  en: { home: "/en", privacy: "/en/privacy", terms: "/en/terms" },
} as const satisfies Record<Lang, { home: string; privacy: string; terms: string }>;

export const es = {
  htmlLang: "es-MX",
  label: "Español",
  short: "ES",

  /** La bajada del logotipo. El kit trae las dos versiones. */
  brandDescriptor: "India · para latinos",
  brandLockup: "/images/marca/lockup-es-claro.svg",

  meta: {
    title: "Viajes privados por India, en español",
    description:
      "Viajes privados por el Triángulo Dorado —Delhi, Agra y Jaipur— para viajeros de habla hispana, con acompañamiento real en español, transporte privado e itinerarios a la medida.",
    ogTitle: "Descubre India en tu idioma",
    keywords: [
      "viajes a India en español",
      "tour privado India",
      "Triángulo Dorado",
      "Taj Mahal en español",
      "guía en español India",
      "viaje a India desde México",
    ],
  },

  a11y: {
    skip: "Saltar al contenido",
    home: "inicio",
    mainNav: "Principal",
    mobileNav: "Principal (móvil)",
    footerNav: "Pie de página",
    menuOpen: "Menú",
    menuClose: "Cerrar",
    langSwitch: "Cambiar idioma",
    viewInEnglish: "View this page in English",
  },

  nav: [
    { href: "#inicio", label: "Inicio" },
    { href: "#experiencias", label: "Experiencias" },
    { href: "#destinos", label: "Destinos" },
    { href: "#como-funciona", label: "Cómo funciona" },
    { href: "#preguntas", label: "Preguntas frecuentes" },
    { href: "#contacto", label: "Contacto" },
  ],

  hero: {
    eyebrow: "Viajes privados por India",
    title: "Descubre India",
    titleAccent: "en tu idioma.",
    lead: "Diseñamos viajes privados por India para ti y para los tuyos, con acompañamiento real en español. Sin traductor de por medio, sin autobuses de cuarenta personas: una ruta pensada para tu ritmo.",
    ctaPrimary: "Diseña tu viaje",
    ctaSecondary: "Explora las rutas",
    trust: ["Tours privados", "Atención en español", "Itinerarios personalizados"],
    routeLabel: "La ruta",
  },

  promise: {
    kicker: "Por qué existimos",
    heading: "Viajar lejos se siente distinto cuando alguien te entiende.",
    paragraphs: [
      "En India es común encontrar viajes anunciados «en español» que a la hora de la verdad se resuelven con un traductor en el celular. No estamos aquí para hablar mal de nadie: simplemente creemos que entender lo que ves —y poder preguntar lo que se te ocurra, cuando se te ocurra— cambia el viaje por completo.",
      "Por eso trabajamos al revés: primero la conversación contigo, en tu idioma, antes de salir, mientras estás allá y cuando algo cambia sobre la marcha.",
    ],
    benefits: [
      {
        icon: "speech",
        title: "Atención real en español",
        body: "Hablamos contigo en español desde el primer mensaje hasta el último día del viaje. Sin traductor automático de por medio, sin adivinar qué te están diciendo.",
      },
      {
        icon: "route",
        title: "Siempre en privado",
        body: "Tu grupo y nadie más: parejas, familias, amigos o quien viaje solo. Los horarios se ajustan a ustedes, no al revés.",
      },
      {
        icon: "van",
        title: "Transporte y logística coordinados",
        body: "Van con aire acondicionado para los traslados, apoyo con hoteles y el orden del día resuelto antes de que llegues.",
      },
      {
        icon: "compass",
        title: "Itinerario a tu medida",
        body: "Si te interesan los mercados y no los museos, se nota en la ruta. Ajustamos el ritmo, las horas de visita y los días de descanso.",
      },
    ],
  },

  journeys: {
    kicker: "Experiencias",
    heading: "Una ruta clásica,",
    headingAccent: "y la libertad de acomodarla.",
    intro:
      "El Triángulo Dorado no es un paquete cerrado: es un punto de partida. Cambian los días, el orden y el ritmo según con quién viajes y qué te interese.",
    note: "Los costos se cotizan por viaje, según fechas, número de personas y alojamiento. No manejamos precios fijos publicados.",
    exampleLength: "Duración de ejemplo",
    confirmedWithYou: "se confirma contigo",
    bestFor: "Ideal para",
    cta: "Pedir una propuesta",
    items: {
      "triangulo-dorado": {
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
        photoAlt:
          "Un grupo de viajeros posando frente a la gran puerta de arenisca roja del Taj Mahal",
      },
      "india-a-tu-manera": {
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
        exampleDays: null as string | null,
        bestFor: "Familias · Grupos · Quien ya conoce parte de India",
        photoAlt: "Una familia de ocho viajeros posando frente a la tumba de Humayun, en Delhi",
      },
    },
  },

  route: {
    kicker: "Destinos",
    heading: "Tres ciudades, una sola ruta",
    headingAccent: "que puedes armar como quieras.",
    intro:
      "Delhi, Agra y Jaipur se recorren por carretera en unas cuatro horas entre ciudad y ciudad, y cada una llega distinta: la capital, el Taj Mahal y el Rajastán. Puedes hacer las tres o quedarte más tiempo en la que te llame.",
    items: {
      delhi: {
        name: "Delhi",
        state: "Territorio de la Capital Nacional",
        short: "El punto de llegada y el primer contacto con India.",
        description:
          "Casi todos los viajes empiezan aquí. Delhi mezcla la ciudad vieja —callejones, especias, mercados que llevan siglos abiertos— con avenidas amplias y monumentos coloniales. Es el mejor lugar para acomodar el cuerpo al cambio de horario sin perder el día.",
        highlights: ["Old Delhi y sus mercados", "Qutub Minar", "Puerta de India", "Comida callejera con guía"],
        photoAlt:
          "La tumba de Humayun en Delhi: arenisca roja y mármol blanco bajo su gran cúpula, entre palmeras",
      },
      agra: {
        name: "Agra",
        state: "Uttar Pradesh",
        short: "El Taj Mahal y la orilla del Yamuna.",
        description:
          "El Taj Mahal cambia de color con la luz, y a qué hora lo visitas cambia por completo la experiencia. Agra también guarda su fuerte de arenisca roja y talleres donde todavía se trabaja el mármol incrustado a mano.",
        highlights: ["Taj Mahal", "Fuerte de Agra", "Talleres de marquetería en mármol", "Mirador del Yamuna"],
        photoAlt: "El Taj Mahal desde los jardines, reflejado en el canal de agua que lleva hasta su entrada",
      },
      jaipur: {
        name: "Jaipur",
        state: "Rajastán",
        short: "Rajastán en rosa: palacios, textiles y color.",
        description:
          "La ciudad rosa es la parte más fotogénica del Triángulo Dorado y la favorita de quienes viajan en familia. Palacios, un observatorio del siglo XVIII y bazares de textiles y joyería donde conviene ir acompañado de alguien que conozca los precios.",
        highlights: ["Hawa Mahal", "Fuerte Amber", "Jantar Mantar", "Bazares de textiles"],
        photoAlt:
          "La fachada del Hawa Mahal en Jaipur, con sus cientos de ventanas de arenisca rosa contra el cielo",
      },
      /* Fuera de la oferta por ahora; el texto se queda para que volver a
         ofrecerlo sea una línea en destinations.ts. */
      rishikesh: {
        name: "Rishikesh",
        state: "Uttarakhand",
        short: "El Ganges, el Himalaya y otro ritmo.",
        description:
          "A los pies del Himalaya, donde el Ganges todavía baja frío y verde. Es el destino para quien viaja buscando yoga, silencio y días con menos agenda.",
        highlights: ["Yoga y meditación", "Ceremonia del atardecer junto al río", "Puentes colgantes", "Caminatas y cascadas"],
        photoAlt: "El río Ganges a su paso por Rishikesh",
      },
    },
  },

  steps: {
    kicker: "Cómo funciona",
    heading: "De una idea suelta",
    headingAccent: "a un viaje con nombre y fecha.",
    intro:
      "No hay reservación en línea ni pagos por la página: nos escribes, conversamos y recibes una propuesta personalizada. Todo lo demás se acuerda por escrito antes de confirmar nada.",
    cta: "Empezar por el primer paso",
    items: [
      {
        title: "Cuéntanos cómo quieres viajar",
        body: "Llena el formulario o escríbenos. Con saber tus fechas aproximadas, cuántos son y qué te llama la atención es suficiente para empezar.",
      },
      {
        title: "Diseñamos tu ruta",
        body: "Te proponemos un itinerario escrito: qué se visita cada día, cuánto se maneja entre ciudades y dónde conviene quedarse.",
      },
      {
        title: "Confirmamos itinerario y costos",
        body: "Ajustamos lo que haga falta y te pasamos el costo desglosado de esa ruta en particular. Nada se reserva hasta que tú lo apruebes.",
      },
      {
        title: "Te acompañamos en India",
        body: "Te recibimos, coordinamos los traslados y seguimos disponibles durante todo el viaje si algo cambia sobre la marcha.",
      },
    ],
  },

  reasons: {
    kicker: "Por qué con nosotros",
    heading: "Lo que sí podemos prometerte",
    headingAccent: "hoy, sin letras chiquitas.",
    items: [
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
    ],
  },

  faq: {
    kicker: "Preguntas frecuentes",
    heading: "Lo que casi siempre",
    headingAccent: "nos preguntan primero.",
    note: "¿Falta la tuya? Escríbenos y te respondemos con la misma franqueza que aquí.",
    items: [
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
    ],
  },

  gallery: {
    kicker: "Quiénes ya fueron",
    heading: "No es una foto de catálogo:",
    headingAccent: "son viajeros que ya estuvieron ahí.",
    intro:
      "Familias y viajeros que hicieron este mismo recorrido, en sus propias fotos. Así se ve un día cualquiera del viaje.",
    note: "Fotografías de nuestros viajeros, publicadas con su permiso.",
    alts: {
      "grupo-taj": "Un grupo de viajeros latinos vestidos con saris frente al Taj Mahal",
      "viajera-humayun": "Una viajera caminando bajo los arcos de la tumba de Humayun, en Delhi",
      pozo: "El pozo escalonado de Agrasen ki Baoli, en Delhi, con sus escaleras de piedra",
      arco: "Arcos de arenisca roja enmarcando una tumba de mármol blanco",
    },
  },

  contact: {
    kicker: "Contacto",
    heading: "Cuéntanos cómo",
    headingAccent: "quieres viajar.",
    intro:
      "Con tus fechas aproximadas y cuántos son ya podemos proponerte algo. No hay compromiso ni pagos en línea: primero la propuesta, después decides.",
    whatsappTitle: "Escríbenos por WhatsApp",
    /** Versión corta, para la cabecera, donde el espacio es el que es. */
    whatsappShort: "WhatsApp",
    whatsappFallback: "Respuesta directa, sin formularios",
    whatsappMessage: "Hola, me gustaría información para un viaje privado por India.",
    emailSubject: "Consulta sobre un viaje a India",
    agency: {
      title: "¿Eres una agencia de viajes?",
      body: "Trabajamos con agencias y colegas que necesitan un operador en India con atención en español. Escríbenos y platicamos cómo podemos apoyarte.",
      cta: "Conversemos",
      subject: "Agencia de viajes — colaboración",
    },
  },

  form: {
    nombre: { label: "Nombre", placeholder: "Cómo te llamas" },
    email: { label: "Email", placeholder: "tucorreo@ejemplo.com" },
    telefono: {
      label: "WhatsApp o teléfono",
      placeholder: "+52 55 1234 5678",
      hint: "Con clave de país, por ejemplo +52 55 1234 5678.",
    },
    pais: { label: "País de residencia", placeholder: "México" },
    fechas: {
      label: "Fechas aproximadas",
      placeholder: "Segunda quincena de marzo",
      hint: "Un mes o una temporada basta. Todavía no necesitas fechas exactas.",
    },
    viajeros: { label: "Número de viajeros", placeholder: "Selecciona" },
    viajeroSingular: "viajero",
    viajeroPlural: "viajeros",
    destinos: { label: "Destinos de interés" },
    tipoViaje: { label: "Tipo de viaje" },
    mensaje: {
      label: "Cuéntanos lo que tengas en mente",
      placeholder: "Somos dos, nos interesa el Taj Mahal y unos días tranquilos al final…",
      hint: "Con quién viajas, qué te interesa, si hay niños o adultos mayores, cuántos días tienes.",
    },
    privacidad: {
      text: "Autorizo que usen mis datos para responder a esta solicitud y prepararme una propuesta de viaje. Nada más.",
      link: "Aviso de privacidad",
    },
    reassurance:
      "Te respondemos personalmente. No compartimos tus datos con terceros ni te inscribimos a ninguna lista.",
    submit: "Enviar solicitud",
    submitting: "Preparando…",
    tripTypes: ["Pareja", "Familia", "Amigos", "Grupo", "Viajo solo/a"],
    recommendation: "Quiero una recomendación",
    travellerRanges: ["1", "2", "3 a 4", "5 a 8", "9 o más"],
    errors: {
      nombre: "Escribe tu nombre para saber cómo dirigirnos a ti.",
      email: "Revisa tu correo: parece que falta algo.",
      telefono: "Incluye tu WhatsApp con clave de país, por ejemplo +52 55 1234 5678.",
      destinos: "Elige al menos un destino, o marca «Quiero una recomendación».",
      privacidad: "Necesitamos tu autorización para poder responderte.",
      review: "El formulario tiene campos por revisar.",
      preparing: "Preparando tu solicitud.",
    },
    outcome: {
      sentTitle: "Recibimos tu solicitud",
      sentBody: "Te vamos a escribir personalmente con una propuesta de ruta.",
      handoffTitle: "Tu mensaje está listo",
      handoffWhatsApp:
        "Todavía no lo hemos recibido: falta un paso. Abre WhatsApp con el botón de abajo —el mensaje ya va escrito con todos tus datos— y presiona enviar.",
      handoffEmail:
        "Todavía no lo hemos recibido: falta un paso. Abre tu correo con el botón de abajo —el mensaje ya va escrito con todos tus datos— y presiona enviar.",
      openWhatsApp: "Abrir WhatsApp con mi mensaje",
      openEmail: "Abrir mi correo",
      errorTitle: "No pudimos enviar tu solicitud.",
      noChannel:
        "Todavía no hay un canal de contacto configurado en el sitio. Copia tu mensaje y envíalo por el canal que la agencia publique.",
      seeMessage: "Ver el mensaje",
      copy: "Copiar mensaje",
      copied: "Copiado",
      again: "Enviar otra solicitud",
    },
    message: {
      intro: "Hola, quiero información para un viaje a India.",
      subject: "Solicitud de viaje a India",
      unnamed: "sin nombre",
      nombre: "Nombre",
      email: "Correo",
      telefono: "WhatsApp / teléfono",
      pais: "País",
      fechas: "Fechas aproximadas",
      viajeros: "Número de viajeros",
      destinos: "Destinos de interés",
      tipoViaje: "Tipo de viaje",
    },
  },

  footer: {
    tagline: "Viajes privados por India, en español",
    blurb: "El Triángulo Dorado recorrido en privado y acompañado en español.",
    baseNote: "Coordinación local en India · Atención en español",
    navTitle: "Navegación",
    contactTitle: "Contacto",
    agencies: "Agencias de viajes",
    photoCredit: "Fotografía",
    responseTime: "Respondemos personalmente, normalmente en menos de 24 horas.",
    privacy: "Aviso de privacidad",
    terms: "Términos",
    provisionalName: "nombre de trabajo, pendiente de confirmar",
  },

  legal: {
    back: "Volver al inicio",
    reviewNotice:
      "Este texto describe cómo funciona el sitio hoy. Antes de publicar la versión final debe revisarlo la persona responsable del negocio y, si aplica, un asesor legal, para incorporar la razón social, el domicilio fiscal y la normativa que corresponda al país de operación.",
    questions: "Dudas sobre este documento:",
    questionsFallback: "escríbenos por el formulario de contacto.",
    privacy: {
      title: "Aviso de privacidad",
      description:
        "Qué datos recibimos cuando nos escribes, para qué los usamos y cómo pedir que los eliminemos.",
      intro:
        "Lo único que hacemos con tus datos es responder tu solicitud y prepararte una propuesta de viaje.",
      blocks: [
        {
          heading: "Qué datos recibimos",
          paragraphs: [
            "Los que tú escribes en el formulario de contacto: nombre, correo, WhatsApp o teléfono, país, fechas aproximadas, número de viajeros, destinos de interés, tipo de viaje y el mensaje que quieras dejarnos.",
            "Este sitio no crea cuentas, no procesa pagos y no pide datos bancarios ni documentos de identidad en ningún momento.",
          ],
        },
        {
          heading: "Para qué los usamos",
          paragraphs: [
            "Únicamente para contactarte, entender qué viaje quieres y enviarte una propuesta con su costo. No vendemos ni compartimos tus datos con terceros con fines comerciales.",
            "Si tu viaje avanza, compartiremos con proveedores en India (hoteles, transporte) solo la información indispensable para reservar a tu nombre, y te lo diremos antes.",
          ],
        },
        {
          heading: "Cómo llega tu mensaje",
          paragraphs: [
            "Según la configuración del sitio, tu solicitud puede enviarse a nuestro correo, llegar por WhatsApp o registrarse en el sistema de contacto que utilicemos. En todos los casos la recibe directamente el equipo que organiza los viajes.",
          ],
        },
        {
          heading: "Cuánto tiempo los guardamos",
          paragraphs: [
            "Conservamos tu solicitud mientras exista una conversación activa y por un periodo razonable después, por si retomas el viaje más adelante. Puedes pedirnos que la eliminemos cuando quieras.",
          ],
        },
        {
          heading: "Tus derechos",
          paragraphs: [
            "Puedes pedirnos acceso a los datos que tenemos sobre ti, su corrección o su eliminación. Respondemos a estas solicitudes sin condiciones.",
          ],
        },
        {
          heading: "Cookies y medición",
          paragraphs: [
            "El sitio no instala cookies de publicidad ni de seguimiento de terceros. Si en el futuro se agrega alguna herramienta de medición, este aviso se actualizará antes.",
          ],
        },
      ],
    },
    terms: {
      title: "Términos de uso",
      description: "Qué es y qué no es este sitio, y cómo se acuerdan los viajes.",
      intro:
        "Este sitio sirve para conocernos y pedir una propuesta de viaje. Todo lo que se acuerda, se acuerda por escrito y fuera de aquí.",
      blocks: [
        {
          heading: "Qué encuentras en este sitio",
          paragraphs: [
            "Información sobre los viajes que organizamos y un formulario para solicitar una propuesta. No hay reservación en línea, ni creación de cuentas, ni pagos por la página.",
          ],
        },
        {
          heading: "Las rutas son ejemplos",
          paragraphs: [
            "Los recorridos, duraciones y actividades que se describen son referencias para empezar a conversar. El itinerario que se aplique a tu viaje es el que quede por escrito en la propuesta que aceptes.",
          ],
        },
        {
          heading: "Precios",
          paragraphs: [
            "No publicamos precios porque cada viaje se cotiza según fechas, número de personas, alojamiento y servicios incluidos. Cualquier cifra que recibas es válida en los términos y el periodo que indique la propuesta.",
          ],
        },
        {
          heading: "Servicios de terceros",
          paragraphs: [
            "Los vuelos internacionales no forman parte de lo que organizamos. Hoteles, transporte y entradas se contratan con proveedores locales; cuando reservamos a tu nombre aplican además las condiciones de cada proveedor, que te compartiremos antes de confirmar.",
          ],
        },
        {
          heading: "Documentación de viaje",
          paragraphs: [
            "Pasaporte, visa y requisitos de entrada a India son responsabilidad de cada viajero. Podemos orientarte sobre el proceso, pero no tramitamos documentos migratorios ni garantizamos su aprobación.",
          ],
        },
        {
          heading: "Cambios en el sitio",
          paragraphs: [
            "Los contenidos pueden actualizarse en cualquier momento conforme crezca la oferta de destinos y servicios.",
          ],
        },
      ],
    },
  },
};

export type Content = typeof es;

/*
 * English is a second, smaller audience: travellers who would rather not be
 * handed a translation app, and agencies looking for an operator in India. The
 * claims are identical to the Spanish — the language of the service is the one
 * thing worded differently, because "atención en español" is the selling point
 * to a Spanish speaker and a plain fact to an English one.
 */
export const en: Content = {
  htmlLang: "en",
  label: "English",
  short: "EN",

  brandDescriptor: "India · for Latinos",
  brandLockup: "/images/marca/lockup-en-claro.svg",

  meta: {
    title: "Private journeys through India",
    description:
      "Private tours of the Golden Triangle — Delhi, Agra and Jaipur — hosted in Spanish or English, with private transport and itineraries built around you.",
    ogTitle: "Discover India in your own language",
    keywords: [
      "private India tour",
      "Golden Triangle tour",
      "Spanish speaking guide India",
      "Taj Mahal private tour",
      "India tour operator",
      "tailor made India itinerary",
    ],
  },

  a11y: {
    skip: "Skip to content",
    home: "home",
    mainNav: "Main",
    mobileNav: "Main (mobile)",
    footerNav: "Footer",
    menuOpen: "Menu",
    menuClose: "Close",
    langSwitch: "Change language",
    viewInEnglish: "Ver esta página en español",
  },

  nav: [
    { href: "#inicio", label: "Home" },
    { href: "#experiencias", label: "Experiences" },
    { href: "#destinos", label: "Destinations" },
    { href: "#como-funciona", label: "How it works" },
    { href: "#preguntas", label: "FAQ" },
    { href: "#contacto", label: "Contact" },
  ],

  hero: {
    eyebrow: "Private journeys through India",
    title: "Discover India",
    titleAccent: "in your own language.",
    lead: "We design private journeys through India for you and the people you travel with, hosted by someone who actually speaks your language. No translation app in the middle, no coach with forty strangers: a route built around your pace.",
    ctaPrimary: "Plan your trip",
    ctaSecondary: "See the routes",
    trust: ["Private tours", "Hosted in Spanish or English", "Tailored itineraries"],
    routeLabel: "The route",
  },

  promise: {
    kicker: "Why we exist",
    heading: "Travelling far feels different when someone understands you.",
    paragraphs: [
      "In India it is common to find trips advertised in Spanish that, when the moment comes, are handled with a translation app. We are not here to speak badly of anyone: we simply believe that understanding what you are looking at — and being able to ask whatever occurs to you, whenever it occurs to you — changes the trip completely.",
      "So we work the other way round: the conversation with you comes first, in your language, before you leave, while you are there, and when something changes along the way.",
    ],
    benefits: [
      {
        icon: "speech",
        title: "Someone who speaks your language",
        body: "We talk with you in Spanish — or in English — from the first message to the last day of the trip. No translation app in between, no guessing what you were just told.",
      },
      {
        icon: "route",
        title: "Always private",
        body: "Your group and nobody else: couples, families, friends, or someone travelling alone. The schedule bends to you, not the other way round.",
      },
      {
        icon: "van",
        title: "Transport and logistics handled",
        body: "An air-conditioned van for the transfers, help with hotels, and the shape of each day settled before you land.",
      },
      {
        icon: "compass",
        title: "An itinerary built around you",
        body: "If markets interest you more than museums, the route shows it. We adjust the pace, the visiting hours and the days off.",
      },
    ],
  },

  journeys: {
    kicker: "Experiences",
    heading: "One classic route,",
    headingAccent: "and the freedom to rearrange it.",
    intro:
      "The Golden Triangle is not a closed package: it is a starting point. The days, the order and the pace change with who you travel with and what interests you.",
    note: "Costs are quoted per trip, based on dates, group size and accommodation. We do not publish fixed prices.",
    exampleLength: "Example length",
    confirmedWithYou: "confirmed with you",
    bestFor: "Best for",
    cta: "Request a proposal",
    items: {
      "triangulo-dorado": {
        name: "Golden Triangle",
        kicker: "The classic route",
        summary:
          "Delhi, Agra and Jaipur: almost everyone's first India. History, architecture, markets and the Taj Mahal, travelled privately and at a pace you set — not one set by a coach carrying forty people.",
        stops: ["Delhi", "Agra", "Jaipur"],
        includes: [
          "A host who speaks your language throughout",
          "Air-conditioned van between cities",
          "Monuments visited with their history explained",
          "Real time in markets and neighbourhoods, not just photo stops",
        ],
        exampleDays: "5 to 8 days",
        bestFor: "First time in India · Couples and families",
        photoAlt:
          "A group of travellers in front of the great red sandstone gateway of the Taj Mahal",
      },
      "india-a-tu-manera": {
        name: "India your way",
        kicker: "Made to measure",
        summary:
          "The Golden Triangle does not have to be travelled the same way by everyone. Tell us how you like to travel — who with, how many days you have, what interests you — and we build the route to that measure, at the pace and with the stops that suit you.",
        stops: ["You set the pace", "We build the route"],
        includes: [
          "A route built from your interests and your dates",
          "More days in one city and fewer in another, if you prefer",
          "A pace adapted to children, older travellers or groups",
          "A written proposal before you confirm anything",
        ],
        exampleDays: null,
        bestFor: "Families · Groups · Anyone who already knows part of India",
        photoAlt: "A family of eight travellers in front of Humayun's Tomb, in Delhi",
      },
    },
  },

  route: {
    kicker: "Destinations",
    heading: "Three cities, one route",
    headingAccent: "you can arrange however you like.",
    intro:
      "Delhi, Agra and Jaipur sit about four hours apart by road, and each one lands differently: the capital, the Taj Mahal, and Rajasthan. Do all three, or stay longer in the one that calls you.",
    items: {
      delhi: {
        name: "Delhi",
        state: "National Capital Territory",
        short: "Where you land, and your first taste of India.",
        description:
          "Almost every trip starts here. Delhi mixes the old city — lanes, spices, markets that have been open for centuries — with wide avenues and colonial monuments. It is the best place to let your body catch up with the time change without losing the day.",
        highlights: ["Old Delhi and its markets", "Qutub Minar", "India Gate", "Street food with a guide"],
        photoAlt:
          "Humayun's Tomb in Delhi: red sandstone and white marble beneath its great dome, framed by palms",
      },
      agra: {
        name: "Agra",
        state: "Uttar Pradesh",
        short: "The Taj Mahal and the bank of the Yamuna.",
        description:
          "The Taj Mahal changes colour with the light, and the hour you visit changes the experience entirely. Agra also holds its red sandstone fort and workshops where marble is still inlaid by hand.",
        highlights: ["Taj Mahal", "Agra Fort", "Marble inlay workshops", "Yamuna viewpoint"],
        photoAlt: "The Taj Mahal from the gardens, reflected in the water channel that leads to its entrance",
      },
      jaipur: {
        name: "Jaipur",
        state: "Rajasthan",
        short: "Rajasthan in pink: palaces, textiles and colour.",
        description:
          "The pink city is the most photogenic part of the Golden Triangle and the favourite of those travelling as a family. Palaces, an eighteenth-century observatory, and bazaars of textiles and jewellery where it helps to have someone along who knows the prices.",
        highlights: ["Hawa Mahal", "Amber Fort", "Jantar Mantar", "Textile bazaars"],
        photoAlt:
          "The facade of the Hawa Mahal in Jaipur, its hundreds of pink sandstone windows against the sky",
      },
      rishikesh: {
        name: "Rishikesh",
        state: "Uttarakhand",
        short: "The Ganges, the Himalaya, and a different pace.",
        description:
          "At the foot of the Himalaya, where the Ganges still runs cold and green. This is the destination for travellers after yoga, quiet, and days with less on the schedule.",
        highlights: ["Yoga and meditation", "The evening ceremony by the river", "Suspension bridges", "Walks and waterfalls"],
        photoAlt: "The river Ganges as it passes through Rishikesh",
      },
    },
  },

  steps: {
    kicker: "How it works",
    heading: "From a loose idea",
    headingAccent: "to a trip with a name and a date.",
    intro:
      "There is no online booking and no payment on this page: you write to us, we talk, and you receive a personal proposal. Everything else is agreed in writing before anything is confirmed.",
    cta: "Start with step one",
    items: [
      {
        title: "Tell us how you want to travel",
        body: "Fill in the form or write to us. Your rough dates, how many of you there are and what catches your attention is enough to start.",
      },
      {
        title: "We design your route",
        body: "You get a written itinerary: what is visited each day, how far it is between cities, and where it makes sense to stay.",
      },
      {
        title: "We confirm the itinerary and the cost",
        body: "We adjust whatever needs adjusting and send you the itemised cost for that particular route. Nothing is booked until you approve it.",
      },
      {
        title: "We are with you in India",
        body: "We meet you, coordinate the transfers, and stay reachable throughout the trip if something changes along the way.",
      },
    ],
  },

  reasons: {
    kicker: "Why travel with us",
    heading: "What we can actually promise",
    headingAccent: "today, with no small print.",
    items: [
      {
        title: "You talk to the person organising it",
        body: "No call centre, no chain of middlemen. The person who answers you is the one building your itinerary.",
      },
      {
        title: "Your language, start to finish",
        body: "The conversation beforehand, the help during the trip and the company on the road are all in your language.",
      },
      {
        title: "Local coordination in India",
        body: "We are on that side: drivers, monument entry permits and last-minute changes get solved in the same time zone as your trip.",
      },
      {
        title: "Private, comfortable transport",
        body: "Air-conditioned vans for the long transfers, with stops whenever the group needs them.",
      },
      {
        title: "Flexible itineraries",
        body: "If you wake up tired one day, or want to stay longer somewhere, it changes. It is your trip.",
      },
      {
        title: "Support before and during",
        body: "We answer the practical questions — what to pack, how money works, what to expect — and stay with you while you are there.",
      },
    ],
  },

  faq: {
    kicker: "Frequently asked",
    heading: "What people ask us",
    headingAccent: "before anything else.",
    note: "Yours not here? Write to us and you will get the same straight answer.",
    items: [
      {
        q: "Are the tours really hosted in Spanish?",
        a: "Yes. The conversation with you, the planning and the company on the road are in Spanish. At some museums or specific sites the local guide may explain in English or Hindi; we translate on the spot. We can also run the whole trip in English if that suits you or someone you travel with better.",
      },
      {
        q: "Are the trips private?",
        a: "Yes. We work only with private groups: you travel with your partner, your family, your friends or on your own, without joining a group of strangers. For larger organised groups we can put the logistics together too — write to us with the details.",
      },
      {
        q: "Can I customise the itinerary?",
        a: "That is the idea. The routes on this page are starting points. From your dates, your interests and who you are travelling with we put a proposal together and adjust it as many times as needed before you confirm.",
      },
      {
        q: "Are international flights included?",
        a: "No. You buy the flights to India yourself, and we are glad to advise on convenient routes and timings. Ground transport within India is part of what we organise.",
      },
      {
        q: "Can you help with hotels and transport?",
        a: "Yes. We coordinate ground transport in an air-conditioned van and help you choose and book accommodation to suit your budget and how you like to travel. What is included in the final cost depends on the route, and we set it out in writing.",
      },
      {
        q: "How do I get a quote?",
        a: "Write to us through the form or on WhatsApp with your rough dates and how many people are travelling. You get a proposed route with its cost itemised. We do not publish fixed prices, because every trip is put together differently.",
      },
      {
        q: "Can I travel with family or a group?",
        a: "Yes, and it is what we are asked for most. We adjust the pace when children or older travellers are along: fewer hours on the road per day, breaks, and sensible meal times. For larger groups we coordinate whatever transport and accommodation is needed.",
      },
      {
        q: "How far in advance should I contact you?",
        a: "The sooner the better, especially in high season or with a large group: there is more hotel availability and better flight options. If your trip is soon, write anyway and we will tell you frankly what we can put together in time.",
      },
    ],
  },

  gallery: {
    kicker: "Who has already been",
    heading: "Not a catalogue photograph:",
    headingAccent: "these are travellers who were there.",
    intro:
      "Families and travellers who did this same route, in their own photographs. This is what an ordinary day of the trip looks like.",
    note: "Photographs of our travellers, published with their permission.",
    alts: {
      "grupo-taj": "A group of Latin American travellers in saris in front of the Taj Mahal",
      "viajera-humayun": "A traveller walking beneath the arches of Humayun's Tomb, in Delhi",
      pozo: "The Agrasen ki Baoli stepwell in Delhi, with its long stone stairs",
      arco: "Red sandstone arches framing a white marble tomb",
    },
  },

  contact: {
    kicker: "Contact",
    heading: "Tell us how",
    headingAccent: "you want to travel.",
    intro:
      "Your rough dates and how many of you there are is enough for us to propose something. No commitment and no online payment: the proposal first, then you decide.",
    whatsappTitle: "Message us on WhatsApp",
    whatsappShort: "WhatsApp",
    whatsappFallback: "A direct reply, no forms",
    whatsappMessage: "Hello, I would like information about a private trip through India.",
    emailSubject: "Enquiry about a trip to India",
    agency: {
      title: "Are you a travel agency?",
      body: "We work with agencies and colleagues who need an operator in India with Spanish-speaking hosts. Write to us and let's talk about how we can support you.",
      cta: "Let's talk",
      subject: "Travel agency — partnership",
    },
  },

  form: {
    nombre: { label: "Name", placeholder: "What we should call you" },
    email: { label: "Email", placeholder: "you@example.com" },
    telefono: {
      label: "WhatsApp or phone",
      placeholder: "+1 555 123 4567",
      hint: "With country code, for example +1 555 123 4567.",
    },
    pais: { label: "Country of residence", placeholder: "Mexico" },
    fechas: {
      label: "Approximate dates",
      placeholder: "Second half of March",
      hint: "A month or a season is enough. You do not need exact dates yet.",
    },
    viajeros: { label: "Number of travellers", placeholder: "Select" },
    viajeroSingular: "traveller",
    viajeroPlural: "travellers",
    destinos: { label: "Destinations you're interested in" },
    tipoViaje: { label: "Type of trip" },
    mensaje: {
      label: "Tell us what you have in mind",
      placeholder: "There are two of us, we're interested in the Taj Mahal and a few slow days at the end…",
      hint: "Who you travel with, what interests you, whether there are children or older travellers, how many days you have.",
    },
    privacidad: {
      text: "I agree that my details may be used to answer this enquiry and prepare a travel proposal. Nothing else.",
      link: "Privacy notice",
    },
    reassurance:
      "We reply personally. We do not share your details with third parties or add you to any list.",
    submit: "Send enquiry",
    submitting: "Preparing…",
    tripTypes: ["Couple", "Family", "Friends", "Group", "Travelling solo"],
    recommendation: "I'd like a recommendation",
    travellerRanges: ["1", "2", "3 to 4", "5 to 8", "9 or more"],
    errors: {
      nombre: "Add your name so we know how to address you.",
      email: "Check your email address — something looks missing.",
      telefono: "Include your WhatsApp with country code, for example +1 555 123 4567.",
      destinos: "Pick at least one destination, or tick “I'd like a recommendation”.",
      privacidad: "We need your agreement before we can reply.",
      review: "Some fields still need attention.",
      preparing: "Preparing your enquiry.",
    },
    outcome: {
      sentTitle: "We have your enquiry",
      sentBody: "We will write to you personally with a proposed route.",
      handoffTitle: "Your message is ready",
      handoffWhatsApp:
        "We haven't received it yet — one step to go. Open WhatsApp with the button below, where the message is already written with all your details, and press send.",
      handoffEmail:
        "We haven't received it yet — one step to go. Open your email with the button below, where the message is already written with all your details, and press send.",
      openWhatsApp: "Open WhatsApp with my message",
      openEmail: "Open my email",
      errorTitle: "We could not send your enquiry.",
      noChannel:
        "No contact channel has been configured on this site yet. Copy your message and send it through whichever channel the agency publishes.",
      seeMessage: "See the message",
      copy: "Copy message",
      copied: "Copied",
      again: "Send another enquiry",
    },
    message: {
      intro: "Hello, I would like information about a trip to India.",
      subject: "Trip enquiry — India",
      unnamed: "no name",
      nombre: "Name",
      email: "Email",
      telefono: "WhatsApp / phone",
      pais: "Country",
      fechas: "Approximate dates",
      viajeros: "Number of travellers",
      destinos: "Destinations of interest",
      tipoViaje: "Type of trip",
    },
  },

  footer: {
    tagline: "Private journeys through India",
    blurb: "The Golden Triangle, travelled privately and hosted in your language.",
    baseNote: "Local coordination in India · Hosted in Spanish or English",
    navTitle: "Navigation",
    contactTitle: "Contact",
    agencies: "Travel agencies",
    photoCredit: "Photography",
    responseTime: "We reply personally, usually within 24 hours.",
    privacy: "Privacy notice",
    terms: "Terms",
    provisionalName: "working name, still to be confirmed",
  },

  legal: {
    back: "Back to home",
    reviewNotice:
      "This text describes how the site works today. Before the final version is published it must be reviewed by whoever is responsible for the business and, where applicable, a legal adviser, to add the registered company name, its address and the rules that apply in the country of operation.",
    questions: "Questions about this document:",
    questionsFallback: "write to us through the contact form.",
    privacy: {
      title: "Privacy notice",
      description: "What we receive when you write to us, what we use it for, and how to have it deleted.",
      intro:
        "The only thing we do with your details is answer your enquiry and prepare a travel proposal for you.",
      blocks: [
        {
          heading: "What we receive",
          paragraphs: [
            "Whatever you write in the contact form: name, email, WhatsApp or phone, country, approximate dates, number of travellers, destinations of interest, type of trip, and any message you leave us.",
            "This site creates no accounts, processes no payments, and never asks for bank details or identity documents.",
          ],
        },
        {
          heading: "What we use it for",
          paragraphs: [
            "Only to contact you, understand the trip you want, and send you a proposal with its cost. We do not sell or share your details with third parties for commercial purposes.",
            "If your trip goes ahead, we will share with suppliers in India (hotels, transport) only what is essential to book in your name, and we will tell you beforehand.",
          ],
        },
        {
          heading: "How your message reaches us",
          paragraphs: [
            "Depending on how the site is configured, your enquiry may be sent to our inbox, arrive by WhatsApp, or be recorded in whatever contact system we use. In every case it goes directly to the people who organise the trips.",
          ],
        },
        {
          heading: "How long we keep it",
          paragraphs: [
            "We keep your enquiry while there is an active conversation and for a reasonable period afterwards, in case you pick the trip up again later. You can ask us to delete it at any time.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "You can ask us for access to the data we hold about you, for corrections, or for deletion. We answer those requests without conditions.",
          ],
        },
        {
          heading: "Cookies and analytics",
          paragraphs: [
            "The site sets no advertising or third-party tracking cookies. If any analytics tool is added in future, this notice will be updated first.",
          ],
        },
      ],
    },
    terms: {
      title: "Terms of use",
      description: "What this site is and is not, and how trips are agreed.",
      intro:
        "This site exists so we can get to know each other and so you can request a travel proposal. Everything that is agreed is agreed in writing, and elsewhere.",
      blocks: [
        {
          heading: "What you'll find here",
          paragraphs: [
            "Information about the trips we organise and a form to request a proposal. There is no online booking, no account creation and no payment through this page.",
          ],
        },
        {
          heading: "The routes are examples",
          paragraphs: [
            "The routes, lengths and activities described are references for starting a conversation. The itinerary that applies to your trip is the one set out in writing in the proposal you accept.",
          ],
        },
        {
          heading: "Prices",
          paragraphs: [
            "We do not publish prices, because every trip is quoted according to dates, number of people, accommodation and services included. Any figure you receive is valid on the terms and for the period the proposal states.",
          ],
        },
        {
          heading: "Third-party services",
          paragraphs: [
            "International flights are not part of what we organise. Hotels, transport and entry tickets are contracted with local suppliers; when we book in your name their own conditions also apply, and we will share those before confirming.",
          ],
        },
        {
          heading: "Travel documents",
          paragraphs: [
            "Passport, visa and entry requirements for India are each traveller's own responsibility. We can guide you through the process, but we do not handle immigration paperwork or guarantee its approval.",
          ],
        },
        {
          heading: "Changes to this site",
          paragraphs: [
            "The contents may be updated at any time as the range of destinations and services grows.",
          ],
        },
      ],
    },
  },
};

export const content: Record<Lang, Content> = { es, en };

/** The other language — what the toggle points at. */
export const otherLang = (lang: Lang): Lang => (lang === "es" ? "en" : "es");
