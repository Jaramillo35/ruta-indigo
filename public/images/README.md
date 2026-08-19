# Fotografía del sitio

Todo lo que está en esta carpeta **se publica** con el sitio. El material en bruto
(archivos de cámara, videos, logotipos originales) va en `assets/`, fuera de aquí.

Mientras no haya fotos definitivas, cada destino y cada experiencia se dibuja con una
ilustración SVG (`src/components/art/scenes.tsx`). No son fotos: son escenas
estilizadas, para que nadie confunda un dibujo con una imagen real del viaje.

## Dónde va cada foto

```
public/images/
  hero/                         imagen de fondo del inicio (opcional; hoy es ilustración)
  destinos/
    delhi/  agra/  jaipur/  rishikesh/
  experiencias/
    triangulo-dorado/  india-espiritual/  india-a-tu-manera/
  marca/                        logotipo definitivo, favicon
  social/                       imagen para cuando se comparte el enlace (1200x630)
```

Puedes dejar varias fotos por carpeta: en el sitio se usa una por tarjeta, y las
demás quedan disponibles para cambiarla sin volver a pedir material.

## Cómo se activa una foto

1. Copia el archivo, por ejemplo `public/images/destinos/agra/taj-amanecer.jpg`.
2. Abre `src/content/destinations.ts` (o `journeys.ts` para las experiencias) y cambia
   las dos líneas del destino:

   ```ts
   photo: "/images/destinos/agra/taj-amanecer.jpg",
   photoAlt: "El Taj Mahal al amanecer, visto desde la orilla del Yamuna",
   ```

   La ruta empieza en `/images/...` — sin `public`.
3. Listo. El componente `MediaFrame` conserva la proporción, así que sustituir el
   dibujo por la foto no mueve nada de la página.

`photoAlt` se lee en voz alta para quien usa lector de pantalla y aparece si la imagen
no carga: descríbela en español, en una frase, sin empezar con «imagen de».

## Formato y tamaño

| Uso | Proporción | Ancho mínimo |
| --- | --- | --- |
| Tarjetas de destino | 5:4 | 1200 px |
| Experiencias | 16:10 | 1800 px |
| Fondo del hero | 16:9 | 2400 px |
| Imagen para compartir | 1200 x 630 | 1200 px |

- `.jpg` para fotografía, calidad 80. Next genera los tamaños y el WebP.
- Nombres en minúsculas, sin acentos ni espacios: `hawa-mahal-tarde.jpg`.
- Horizontales para experiencias y hero; sin texto incrustado en la imagen.
- Cuida la parte inferior: ahí van las etiquetas blancas de la tarjeta.

## Qué no publicar aquí

- Fotos de personas identificables sin su permiso por escrito.
- Fotos de banco que sugieran ser el equipo, los guías o clientes reales.
- Capturas con logotipos de terceros o de agencias.
- Archivos de cámara sin optimizar: esos van en `assets/fotos-originales/`.
