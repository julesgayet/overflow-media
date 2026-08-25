import type { MetadataRoute } from "next";
import { site } from "@/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/mentions-legales" },
    sitemap: `https://${site.domain}/sitemap.xml`,
  };
}
