/**
 * Renders the share card to public/og.png.
 *
 * It is a script rather than Next's opengraph-image convention because that
 * convention emits an extension-less file, which GitHub Pages refuses to serve
 * (503). A committed PNG also means the card cannot break a deploy.
 *
 *   npm run og      # after changing the brand, the palette or the wording
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ImageResponse } from "next/og.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const config = readFileSync(join(root, "src/content/site.config.ts"), "utf8");
const read = (key) => (config.match(new RegExp(`\\n\\s*${key}:\\s*"([^"]*)"`)) || [, ""])[1];

const name = read("name");
const destinations = [
  ...readFileSync(join(root, "src/content/destinations.ts"), "utf8").matchAll(/\n\s{4}name: "([^"]+)"/g),
].map((match) => match[1]);
const descriptor = read("descriptor");
const emblem = `data:image/png;base64,${readFileSync(
  join(root, "assets/marca/kit/png/emblem-reversed-clear-2x.png"),
).toString("base64")}`;

const response = new ImageResponse(
  {
    type: "div",
    props: {
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "72px",
        background: "linear-gradient(150deg, #07101f 0%, #14294a 42%, #7c3c4c 72%, #cd6f2b 100%)",
        color: "#f1e8dc",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "-160px",
              right: "-120px",
              width: "620px",
              height: "620px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(251,228,194,0.5) 0%, rgba(205,111,43,0) 70%)",
            },
          },
        },
        {
          type: "div",
          props: {
            style: { display: "flex", alignItems: "center", gap: "20px", fontSize: 26, letterSpacing: 4 },
            children: [
              { type: "img", props: { src: emblem, width: 104, height: 104 } },
              name.toUpperCase(),
            ],
          },
        },
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", marginTop: 40, fontSize: 84, lineHeight: 1.05 },
            children: [
              { type: "span", props: { children: "Descubre India" } },
              { type: "span", props: { style: { color: "#e9a04a", fontStyle: "italic" }, children: "en tu idioma." } },
            ],
          },
        },
        {
          type: "div",
          props: { style: { marginTop: 32, fontSize: 30, color: "#d9c9b6" }, children: destinations.join(" · ") },
        },
        {
          type: "div",
          props: {
            style: { marginTop: 12, fontSize: 24, color: "#bfae9b" },
            children: `${descriptor} · Viajes privados · Atención real en español`,
          },
        },
      ],
    },
  },
  { width: 1200, height: 630 },
);

writeFileSync(join(root, "public/og.png"), Buffer.from(await response.arrayBuffer()));
console.log("public/og.png actualizado");
