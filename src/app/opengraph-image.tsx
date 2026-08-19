import { ImageResponse } from "next/og";
import { site } from "@/content/site.config";

export const alt = `${site.brand.name} — Viajes privados por India, en español`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

/** Generated at build time so the share card follows the config, not a stale PNG. */
export default function Image() {
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
          background: "linear-gradient(150deg, #0a0818 0%, #2a1450 42%, #8a3b4e 72%, #e2701f 100%)",
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
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: 26, letterSpacing: 4 }}>
          <div style={{ width: 46, height: 46, borderRadius: 999, background: "linear-gradient(135deg,#f5b53f,#e2701f)" }} />
          {site.brand.name.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 40, fontSize: 84, lineHeight: 1.05 }}>
          <span>Descubre India</span>
          <span style={{ color: "#f5b53f", fontStyle: "italic" }}>en tu idioma.</span>
        </div>
        <div style={{ marginTop: 32, fontSize: 30, color: "#d9c9b6" }}>
          Delhi · Agra · Jaipur · Rishikesh
        </div>
        <div style={{ marginTop: 12, fontSize: 24, color: "#bfae9b" }}>
          Viajes privados · Atención real en español
        </div>
      </div>
    ),
    size,
  );
}
