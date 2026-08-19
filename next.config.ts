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
      }
    : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
