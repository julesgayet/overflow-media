import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/site.config";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  /*  Le mot-clé passe AVANT la marque : Google tronque autour de 60 signes et
   *  pondère les premiers mots du <title>. « Omniflux » ne se cherche pas
   *  encore — « agence de clipping », si.                                    */
  title: {
    default: "Agence de clipping pour marques — CPM fixe, vues vérifiées | Omniflux",
    template: `%s · ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  keywords: [
    "agence de clipping",
    "clipping France",
    "campagne de clipping pour marque",
    "campagne UGC",
    "clipping TikTok",
    "Instagram Reels",
    "YouTube Shorts",
    "prix clipping CPM",
    "agence clipping TikTok",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `https://${site.domain}`,
    siteName: site.name,
    title: "Agence de clipping pour marques — CPM fixe, vues vérifiées",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence de clipping pour marques — CPM fixe, vues vérifiées",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
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
