/**
 * Folds the static export into one self-contained HTML file that can be shared
 * for review — fonts, styles and behaviour inlined, no requests to anywhere.
 *
 *   STATIC_EXPORT=1 npm run build && node scripts/build-preview.mjs
 *
 * The output is a preview of the real build, not a second copy of the site:
 * everything here is derived from `out/`, so it cannot drift from what ships.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "out");

const html = readFileSync(join(outDir, "index.html"), "utf8");

/* ------------------------------------------------------------------ styles */
const cssHrefs = [...html.matchAll(/<link[^>]+href="(\/_next\/[^"]+\.css)"/g)].map((m) => m[1]);
if (cssHrefs.length === 0) throw new Error("No stylesheet found in the export.");

let css = "";
for (const href of cssHrefs) {
  const cssDir = dirname(join(outDir, href));
  let sheet = readFileSync(join(outDir, href), "utf8");

  /* Inline every font the stylesheet asks for, so the page needs no network.
     next/font emits the urls relative to the stylesheet, e.g. ../media/x.woff2. */
  const fontRefs = new Set([...sheet.matchAll(/url\(([^)"']+\.woff2)\)/g)].map((m) => m[1]));
  for (const ref of fontRefs) {
    const file = ref.startsWith("/") ? join(outDir, ref) : join(cssDir, ref);
    const data = readFileSync(file).toString("base64");
    sheet = sheet.replaceAll(`url(${ref})`, `url(data:font/woff2;base64,${data})`);
  }
  css += sheet + "\n";
}

css += "\n" + readFileSync(join(root, "scripts/preview/extra.css"), "utf8");

/* -------------------------------------------------------------------- body */
const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/);
if (!bodyMatch) throw new Error("No <body> found in the export.");

let body = bodyMatch[1]
  .replace(/<script[\s\S]*?<\/script>/g, "")
  .replace(/<template[\s\S]*?<\/template>/g, "")
  .replace(/<link[^>]*rel="stylesheet"[^>]*>/g, "");

/* The form needs to know where an enquiry would go, the same way the app does. */
const config = readFileSync(join(root, "src/content/site.config.ts"), "utf8");
const readConfig = (key) => (config.match(new RegExp(`\\n\\s*${key}:\\s*"([^"]*)"`)) || [, ""])[1];
const email = readConfig("email");
const whatsapp = readConfig("whatsapp");

body = body.replace(
  /<form /,
  `<form data-preview-email="${email}" data-preview-whatsapp="${whatsapp}" `,
);

const brand = (config.match(/name:\s*"([^"]+)"/) || [, "Sitio"])[1];

const flag = `
<aside class="preview-flag" id="preview-flag">
  <div>
    <strong>Vista previa para revisión</strong>
    <span>El nombre <em>${brand}</em>, el correo y el WhatsApp son provisionales: se cambian antes de publicar. El formulario aún no envía nada; prepara el mensaje para que lo revises.</span>
  </div>
  <button type="button" aria-label="Ocultar este aviso" onclick="document.getElementById('preview-flag').remove()">✕</button>
</aside>`;

/* The shared preview is named after the brand; the long SEO title belongs to
   the deployed site, not to a review link sitting in a gallery. */
const title = brand;

const runtime = readFileSync(join(root, "scripts/preview/runtime.js"), "utf8");

/*
 * Everything below is written as pure ASCII: the published page inherits its
 * <head> from the host, so escaping the accents here removes any dependency on
 * the charset it declares.
 */
const toEntities = (input) =>
  input.replace(/[^\x00-\x7F]/g, (ch) => `&#${ch.codePointAt(0)};`);
const toUnicodeEscapes = (input) =>
  input.replace(/[^\x00-\x7F]/g, (ch) => `\\u${ch.codePointAt(0).toString(16).padStart(4, "0")}`);

const page = `<title>${toEntities(title)}</title>
<style>
${css}
</style>
${toEntities(body)}
${toEntities(flag)}
<script>
${toUnicodeEscapes(runtime)}
</script>
`;

mkdirSync(join(root, "preview"), { recursive: true });
const target = join(root, "preview/ruta-indigo.html");
writeFileSync(target, page);

/*
 * The publishing host supplies the doctype and the <head>. This wrapped copy
 * exists only so the same file can be opened locally in standards mode —
 * without the doctype a browser falls into quirks mode and the page does not
 * even scroll, which is a property of the local check, not of the page.
 */
writeFileSync(
  join(root, "preview/local-check.html"),
  `<!doctype html>\n<html lang="es-MX">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body>\n${page}\n</body>\n</html>\n`,
);

console.log(`Wrote ${target} - ${(Buffer.byteLength(page) / 1024).toFixed(0)} KB (+ preview/local-check.html for local viewing)`);
