import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site.config";

export const alt = `${site.brand.name} — Viajes privados por India, en español`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

/** Generated at build time so the share card follows the config, not a stale PNG. */
export default function Image() {
  const emblem = `data:image/png;base64,${readFileSync(
    join(process.cwd(), "public/images/marca/isotipo-migryan.png"),
  ).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px",
          background: "linear-gradient(150deg, #07101f 0%, #14294a 42%, #7c3c4c 72%, #cd6f2b 100%)",
          color: "#f1e8dc",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-160px",
            right: "-120px",
            width: "620px",
            height: "620px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,233,184,0.55) 0%, rgba(226,112,31,0) 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "20px", fontSize: 26, letterSpacing: 4 }}>
          {/* The emblem is navy on light, so it keeps its paper disc here too. */}
          <div
            style={{
              display: "flex",
              width: 96,
              height: 96,
              borderRadius: 999,
              background: "#faf3e8",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={emblem} width={80} height={80} alt="" />
          </div>
          {site.brand.name.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 40, fontSize: 84, lineHeight: 1.05 }}>
          <span>Descubre India</span>
          <span style={{ color: "#e9a04a", fontStyle: "italic" }}>en tu idioma.</span>
        </div>
        <div style={{ marginTop: 32, fontSize: 30, color: "#d9c9b6" }}>
          Delhi · Agra · Jaipur · Rishikesh
        </div>
        <div style={{ marginTop: 12, fontSize: 24, color: "#bfae9b" }}>
          {`${site.brand.descriptor} · Viajes privados · Atención real en español`}
        </div>
      </div>
    ),
    size,
  );
}
