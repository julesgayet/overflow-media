import type { MetadataRoute } from "next";
import { site } from "@/site.config";

const BASE = `https://${site.domain}`;

/*  Une entrée par URL indexable. Les pages légales y figurent : elles portent
 *  l'identité de l'éditeur (SIREN, adresse), et c'est un des signaux de
 *  confiance qu'un moteur de réponse vérifie avant de citer une agence.      */
const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/reserver", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.2 },
  { path: "/cgv", changeFrequency: "yearly", priority: 0.2 },
  { path: "/confidentialite", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
