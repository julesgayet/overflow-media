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
          background: "#05050b",
          backgroundImage:
            "radial-gradient(circle at 20% 0%, rgba(124,92,255,0.35), transparent 55%), radial-gradient(circle at 90% 90%, rgba(34,211,238,0.22), transparent 50%)",
          padding: 80,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "linear-gradient(135deg, #7c5cff, #22d3ee)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 18, height: 18, borderRadius: 5, background: "#05050b" }} />
          </div>
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
              color: "#a78bfa",
            }}
          >
            Payées à la performance.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 24, color: "#a5a5c0" }}>
          <span>Agence de clipping française</span>
          <span style={{ color: "#2a2a42" }}>|</span>
          <span>TikTok · Reels · Shorts</span>
          <span style={{ color: "#2a2a42" }}>|</span>
          <span>Paiements via Whop</span>
        </div>
      </div>
    ),
    size,
  );
}
