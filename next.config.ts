import type { NextConfig } from "next";

/**
 * Two build modes on top of the normal one:
 *
 * - `STATIC_EXPORT=1` emits a plain static site into `out/` — used both by the
 *   single-file preview and by the GitHub Pages deploy.
 * - `BASE_PATH` sets the sub-path a project site is served from
 *   (`https://user.github.io/<repo>`), so every asset and link resolves there.
 */
const basePath = process.env.BASE_PATH ?? "";
const isExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isExport
    ? {
        output: "export" as const,
        // No image server on a static host; next/image serves the files as-is.
        images: { unoptimized: true },
        /*
         * Emit `terminos/index.html` instead of `terminos.html`, so the page
         * answers both with and without the trailing slash. Without this a
         * pasted `/terminos/` is a 404 on GitHub Pages.
         */
        trailingSlash: true,
      }
    : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  /* Readable from both server and client components, so `asset()` can prefix
     the image srcs that next/image leaves alone in an unoptimized export. */
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
