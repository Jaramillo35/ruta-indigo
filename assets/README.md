# Material de trabajo

Nada de esta carpeta se publica: es el material en bruto y los documentos del
proyecto. Lo que sí sale al sitio vive en `public/images/`.

```
assets/
  fotos-originales/       archivos tal como salen de la cámara o del cliente
    delhi/ agra/ jaipur/ rishikesh/ otros/
  video/                  clips sin editar, material para redes
  marca/                  logotipo original (.ai/.svg), tipografías, paleta
  documentos/
    legal/                razón social, permisos, textos revisados
    propuestas/           cotizaciones y propuestas de ejemplo
  referencias/            sitios, capturas e ideas que sirvieron de referencia
  notas-cliente/          correos, mensajes y decisiones que conviene no perder
```

## Cómo usarla

1. Deja aquí el archivo original, con el nombre que traiga.
2. De ahí sale la versión optimizada que se copia a `public/images/`, ya recortada a
   la proporción que le toca y guardada como `.jpg` de calidad 80.

Así siempre queda el original si hay que volver a recortar, y el sitio solo carga
archivos ligeros.

## Ojo con esto

- No metas aquí contraseñas, tokens ni datos bancarios. Las claves del sitio van en
  `.env.local`, que no se sube a ningún lado.
- Los originales pesan: `fotos-originales/` y `video/` están excluidos del control de
  versiones a propósito (ver `.gitignore`). Respáldalos donde guardes el resto del
  material del negocio.
