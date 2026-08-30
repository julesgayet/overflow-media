import { site } from "@/site.config";

/*  Un seul @graph pour tout le site, plutôt qu'un objet JSON-LD par page.
 *  Google — et les moteurs de réponse (ChatGPT, Perplexity, AI Overviews) —
 *  résolvent les `@id` entre eux : l'Organization citée par le Service et par
 *  la FAQPage doit être LA MÊME entité, pas trois copies anonymes. C'est ce
 *  lien qui fait qu'un LLM attribue une réponse à « Omniflux » et pas à
 *  « une agence française ».                                                 */

const BASE = `https://${site.domain}`;

export const ID = {
  org: `${BASE}/#organization`,
  website: `${BASE}/#website`,
  service: `${BASE}/#service`,
};

const organization = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": ID.org,
  name: site.name,
  legalName: site.legalName,
  url: BASE,
  email: site.email,
  description: site.description,
  logo: { "@type": "ImageObject", url: `${BASE}/icon.svg` },
  image: `${BASE}/opengraph-image`,
  areaServed: { "@type": "Country", name: "France" },
  knowsLanguage: ["fr", "en"],
  sameAs: Object.values(site.links).filter((u) => !u.includes("ton-compte") && !u.includes("ton-invite")),
};

const website = {
  "@type": "WebSite",
  "@id": ID.website,
  url: BASE,
  name: site.name,
  inLanguage: "fr-FR",
  publisher: { "@id": ID.org },
};

/*  Le service vendu, décrit en termes de requête : « agence de clipping ».
 *  `offers` porte le CPM public — c'est la donnée qu'un moteur de réponse
 *  reprend quand on lui demande « combien coûte le clipping ».               */
const service = {
  "@type": "Service",
  "@id": ID.service,
  name: "Agence de clipping",
  serviceType: "Clipping / marketing d'influence à la performance",
  description: site.description,
  provider: { "@id": ID.org },
  areaServed: { "@type": "Country", name: "France" },
  audience: { "@type": "BusinessAudience", name: "Marques, créateurs, labels, apps SaaS" },
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: site.pricing.fromValue,
    unitText: site.pricing.unit,
    description: `CPM à partir de ${site.pricing.from} ${site.pricing.unit}, budget plafonné à l'avance.`,
    availability: "https://schema.org/InStock",
  },
};

export function faqPage(entries: readonly { readonly q: string; readonly a: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": `${BASE}/#faq`,
    inLanguage: "fr-FR",
    isPartOf: { "@id": ID.website },
    about: { "@id": ID.service },
    mainEntity: entries.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbs(trail: readonly { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${BASE}${t.path}`,
    })),
  };
}

/** Assemble le @graph d'une page : le socle d'entités + ce que la page ajoute. */
export function graph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, service, ...nodes],
  };
}

/** À rendre dans un <script type="application/ld+json">. */
export function jsonLdScript(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
