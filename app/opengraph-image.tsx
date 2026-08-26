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
          <svg width="52" height="52" viewBox="0 0 48 48" fill="none">
            <path
              d="M33.23 24.9 A12.5 12.5 0 1 1 23.6 15.27"
              stroke="#17171a"
              strokeWidth="6.5"
              strokeLinecap="round"
            />
            <path
              d="M23.6 15.27 C28.98 16.41 35 13 41 6"
              stroke="#1f4fd8"
              strokeWidth="6.5"
              strokeLinecap="round"
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
          <span>Paiements via Whop</span>
        </div>
      </div>
    ),
    size,
  );
}
