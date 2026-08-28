import { ImageResponse } from "next/og";
import { site } from "@/site.config";

export const alt = `${site.name} — Agence de clipping française`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3f3f4",
          padding: 80,
          color: "#17171a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* Même tracé que components/logo.tsx : un seul chemin peint deux
              fois, la passe cobalt révélée par dasharray sur la queue.
              Les modifier ensemble (avec app/icon.svg). */}
          <svg width="56" height="56" viewBox="3.7 2.3 40.6 40.6" fill="none">
            <path
              d="M33.41 29.02 A12.5 12.5 0 1 1 23.6 15.27 C26.90 15.97 33 12 39.5 5.2"
              stroke="#17171a"
              strokeWidth="5.8"
              strokeLinecap="round"
            />
            <path
              d="M33.41 29.02 A12.5 12.5 0 1 1 23.6 15.27 C26.90 15.97 33 12 39.5 5.2"
              stroke="#1f4fd8"
              strokeWidth="5.8"
              strokeLinecap="round"
              strokeDasharray="19.34 79.34"
              strokeDashoffset="-60"
            />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 78, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
            Des millions de vues.
          </div>
          <div
            style={{
              fontSize: 78,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.05,
              color: "#1f4fd8",
            }}
          >
            Payées à la performance.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 24, color: "#56565e" }}>
          <span>Agence de clipping française</span>
          <span style={{ color: "#d3d3d8" }}>|</span>
          <span>TikTok · Reels · Shorts</span>
          <span style={{ color: "#d3d3d8" }}>|</span>
          <span>Facturation au CPM</span>
        </div>
      </div>
    ),
    size,
  );
}
