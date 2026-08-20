/**
 * Prefixes a public-folder path with the base path the site is served from.
 *
 * Next adds `basePath` to everything it controls — the stylesheet, the icon,
 * its own chunks — but `next/image` with `unoptimized` (which a static export
 * requires) passes `src` through untouched. On a project site served from
 * /ruta-indigo/ that means every image 404s, and nothing catches it locally
 * because dev and the single-file preview both run without a base path.
 *
 * Any src that points at /public must go through here.
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${base}${path}`;
}
