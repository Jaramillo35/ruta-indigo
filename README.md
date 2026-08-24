# Ruta Índigo — sitio web (MVP)

Sitio de una sola página para una empresa que organiza **viajes privados por India
para viajeros de habla hispana**. El objetivo del MVP es uno: que alguien entienda la
propuesta y pida una cotización personalizada. **No hay reservación en línea, cuentas
ni pagos.**

> **Nombre provisional.** «Ruta Índigo» es un nombre de trabajo, no el definitivo.
> Está marcado como tal en `src/content/site.config.ts` (`nameIsProvisional: true`) y
> aparece señalado en el pie de página hasta que el cliente confirme el nombre real.

```bash
npm install
npm run dev           # http://localhost:3000
npm run build         # build de producción
npm run lint
npm run preview:file  # un solo archivo HTML para compartir a revisión
```

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4. Sin librerías de
animación ni de UI: todo el movimiento es CSS + un `IntersectionObserver`, y toda la
ilustración es SVG en línea. La única dependencia de runtime es el propio framework.

## Dónde se edita el negocio

| Qué | Archivo |
| --- | --- |
| **Todo el texto, en español e inglés** | `src/content/i18n.ts` |
| Nombre, correo, WhatsApp, redes, dominio, links legales | `src/content/site.config.ts` |
| Destinos: qué se ofrece y con qué foto | `src/content/destinations.ts` |
| Experiencias: cuáles y con qué foto | `src/content/journeys.ts` |
| Fotografía publicada | `public/images/` (ver `public/images/README.md`) |
| Material en bruto, marca y documentos | `assets/` (ver `assets/README.md`) |

Ningún componente tiene texto de negocio escrito dentro: todo sale de esos archivos.

### Datos que faltan por confirmar

Mientras alguno de estos siga vacío o con valor de ejemplo, en modo desarrollo aparece
un recordatorio abajo a la izquierda (`src/components/config-notice.tsx`, nunca se
muestra en producción):

- Nombre definitivo de la marca y dominio.
- Correo de contacto real (hoy `contacto@example.com`).
- Número de WhatsApp en formato internacional sin `+` (ej. `5215512345678`).
- Correo para agencias, si es distinto del general.
- Redes sociales.
- Fotografías propias.
- `NEXT_PUBLIC_LEAD_ENDPOINT`, si se quiere recibir los formularios en un sistema.

## Cómo llegan las solicitudes

`src/lib/lead.ts` es la única puerta de salida del formulario:

1. Si existe `NEXT_PUBLIC_LEAD_ENDPOINT`, la solicitud se envía ahí por `POST` en JSON
   y el sitio confirma que **sí** se recibió.
2. Si no existe, el sitio **no finge** haber recibido nada: arma el mismo mensaje y se
   lo entrega al viajero en un WhatsApp o un correo ya redactado, diciéndole con todas
   sus letras que falta presionar enviar. También puede copiar el texto.

Cualquier receptor que acepte JSON sirve (Formspree, Basin, un webhook de n8n/Make, un
Apps Script). Copia `.env.example` a `.env.local` para configurarlo.

## Carpetas de material

```
public/images/    lo que se publica: fotos por destino y por experiencia, marca, social
assets/           material en bruto: originales de cámara, video, logotipos, documentos
preview/          se genera con `npm run preview:file`; no se versiona
```

Cada una tiene su propio README con las proporciones, los nombres de archivo y las dos
líneas de configuración que activan una foto.

## Vista previa para el cliente

`npm run preview:file` hace un export estático y lo pliega en un solo archivo HTML
autocontenido (`preview/ruta-indigo.html`): tipografías, estilos y comportamiento
incrustados, sin una sola petición a la red. Sirve para compartir el sitio a revisión
antes de que exista dominio. `preview/local-check.html` es el mismo archivo con
`<!doctype>` y `<head>`, para abrirlo en el navegador desde el disco.

Lleva un aviso, visible solo ahí, que advierte que el nombre y los datos de contacto
son provisionales y que el formulario todavía no envía nada.

## Dos idiomas

El sitio se publica en español (`/`) y en inglés (`/en`). No es un cambio de
estado en el navegador: **cada idioma es su propia página**, con su URL, su
`<html lang>`, sus metadatos y sus enlaces `hreflang`, así que se puede
compartir, marcar y indexar por separado. El botón de la cabecera es un enlace
entre las dos.

Todo el texto de las dos versiones vive junto en `src/content/i18n.ts`. El
inglés está tipado contra el español (`export const en: Content`), de modo que
si se agrega una frase en un idioma y falta en el otro, **no compila**. Los
datos que no son texto —qué destinos se ofrecen, qué foto lleva cada uno— siguen
en `destinations.ts` y `journeys.ts`, y el texto se busca por su `slug`.

Para agregar un idioma: copiar el bloque `en`, traducirlo, sumarlo a `content` y
`languages`, y crear su grupo de rutas en `src/app/`.

## Estructura

```
src/
  app/            layout (metadatos, fuentes), página única, aviso de privacidad, términos,
                  icon.svg y la imagen para compartir (opengraph-image.tsx)
  components/     una sección por archivo + primitivas (ui.tsx, media-frame, reveal)
    art/          las ilustraciones SVG: hero-backdrop y las escenas por destino
  content/        todo el texto y la configuración del negocio
  lib/            lead.ts — validación, mensaje y envío
```

## Decisiones que conviene conocer

- **La imagen es un hueco, no un compromiso.** `MediaFrame` recibe `photo` y `scene`:
  con foto muestra la foto (`next/image`), sin foto dibuja la escena ilustrada del
  lugar. El contenedor fija la proporción, así que cambiar dibujo por foto no mueve
  nada de la página.
- **Nada que no esté confirmado.** No hay reseñas, ni número de clientes, ni años de
  experiencia, ni precios, ni certificaciones. Las duraciones se muestran siempre como
  «duración de ejemplo · se confirma contigo».
- **Movimiento discreto.** Entrada del hero, parallax de tres capas, revelados al
  hacer scroll y la línea de ruta que se dibuja. Todo se apaga o se reduce con
  `prefers-reduced-motion`, y sin JavaScript el contenido se ve completo.
- **Accesibilidad.** HTML semántico, un solo `h1`, etiquetas reales en cada campo,
  errores anunciados con `aria-invalid`/`aria-describedby`, menú móvil con `inert` y
  cierre con `Escape`, foco visible y contrastes verificados (texto normal ≥ 4.5:1).
- **Los textos legales son un punto de partida.** `/aviso-de-privacidad` y `/terminos`
  describen honestamente cómo funciona el sitio hoy, y ambos advierten que deben
  revisarse antes de publicar con la razón social real.
