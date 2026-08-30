import type { MetadataRoute } from "next";
import { site } from "@/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    /*  Tout est ouvert, y compris les mentions légales : les bloquer privait
     *  Google et les moteurs de réponse du seul endroit où l'éditeur est
     *  identifié (SIREN, contact). Rien ici n'est confidentiel.
     *  Les crawlers des LLM (GPTBot, ClaudeBot, PerplexityBot…) sont couverts
     *  par la règle `*` — on VEUT être lu par eux, c'est tout l'enjeu GEO.   */
    rules: { userAgent: "*", allow: "/" },
    sitemap: `https://${site.domain}/sitemap.xml`,
    host: `https://${site.domain}`,
  };
}
