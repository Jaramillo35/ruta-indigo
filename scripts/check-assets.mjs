/**
 * Comprueba que todo lo que el HTML pide exista de verdad en el export.
 *
 * Sustituye a un grep que sólo servía mientras el sitio vivía bajo un
 * sub-path: aquel comprobaba la forma de la ruta, y la forma correcta cambió al
 * pasar a dominio propio. Esto comprueba el hecho —el archivo está o no está—,
 * así que vale en los dos casos y atrapa el fallo real: una imagen que da 404.
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "out");

const pages = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (entry.endsWith(".html")) pages.push(full);
  }
})(out);

const missing = new Map();
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  for (const match of html.matchAll(/(?:src|href)="(\/[^"]+\.(?:jpg|jpeg|png|svg|webp|avif|css|js|ico))"/g)) {
    const ref = match[1].split("?")[0];
    if (ref.startsWith("/_next/")) continue; // los emite el propio framework
    if (!existsSync(join(out, ref))) {
      if (!missing.has(ref)) missing.set(ref, new Set());
      missing.get(ref).add(page.replace(out, "") || "/index.html");
    }
  }
}

if (missing.size > 0) {
  console.error("Recursos que el HTML pide y no están en el export:\n");
  for (const [ref, where] of missing) console.error(`  ${ref}\n    ← ${[...where].join(", ")}`);
  process.exit(1);
}

console.log(`Recursos verificados en ${pages.length} páginas: todo presente.`);
