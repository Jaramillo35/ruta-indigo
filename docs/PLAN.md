# Plan de implementación — MVP Ruta Índigo

Escrito antes de construir; se deja como registro de lo que se decidió y por qué.

## 1. Objetivo

Una sola página que, en los primeros tres segundos, deje claro: **viajes privados por
India con atención real en español**. Todo lo demás empuja hacia una solicitud de
cotización. Sin checkout, sin cuentas, sin pagos.

## 2. Stack

Next.js 16 + React 19 + Tailwind v4 + TypeScript, el mismo stack que el resto de los
proyectos de la carpeta `Development`. Cero dependencias nuevas: la animación es CSS,
las ilustraciones son SVG en línea y el formulario es estado local de React.

## 3. Dirección visual

- Paleta tomada de las horas del día en el norte de India: arenisca y maravilla al
  mediodía, azafrán al atardecer, índigo profundo de noche.
- Tipografía editorial: Fraunces para titulares (serif con carácter, no corporativa),
  Inter para lectura.
- Secciones alternando oscuro cinematográfico y papel cálido, para que el ojo descanse.
- Grano de película, degradados suaves, vidrio discreto en la barra y las etiquetas.
- Motivo de ruta presente en tres escalas: la cinta del hero, la curva de destinos y
  la línea vertical de los pasos.

## 4. Arquitectura

- `content/` — todo el negocio (marca, contactos, destinos, rutas, FAQ). Ningún texto
  vive dentro de un componente.
- `components/` — una sección por archivo; `MediaFrame` como única puerta de imágenes;
  `Reveal` como único mecanismo de animación al hacer scroll.
- `lib/lead.ts` — validación, redacción del mensaje y envío, con dos caminos posibles
  (endpoint real o entrega honesta por WhatsApp/correo).

## 5. Orden de trabajo

1. Configuración del proyecto y sistema de diseño (tokens, tipografía, movimiento).
2. Capa de contenido en español.
3. Ilustraciones SVG por destino + panorama del hero.
4. Secciones: hero → propuesta → experiencias → destinos/ruta → cómo funciona →
   por qué nosotros → preguntas → contacto → pie.
5. Formulario con validación, estados y la abstracción de envío.
6. Metadatos, datos estructurados, imagen para compartir, páginas legales.
7. Revisión en móvil, tablet, laptop y pantalla ancha; contraste, teclado, consola.

## 6. Fuera de alcance (por ahora)

Reservación en línea, pagos, cuentas de usuario, blog, versión en inglés del sitio,
trámite de visas, precios públicos.
