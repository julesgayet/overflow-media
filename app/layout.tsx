import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/site.config";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} — Agence de clipping française`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "agence de clipping",
    "clipping France",
    "campagne de clipping pour marque",
    "campagne UGC",
    "TikTok",
    "Instagram Reels",
    "YouTube Shorts",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `https://${site.domain}`,
    siteName: site.name,
    title: `${site.name} — Agence de clipping française`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Agence de clipping française`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05050b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
