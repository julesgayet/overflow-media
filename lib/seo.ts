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

/*  `path` est indispensable : deux pages qui portent chacune leur FAQ ne
 *  peuvent pas partager le même `@id`, sinon elles déclarent deux contenus
 *  différents sous une seule identité — et le moteur en retient un seul.    */
export function faqPage(
  entries: readonly { readonly q: string; readonly a: string }[],
  path = "",
) {
  return {
    "@type": "FAQPage",
    "@id": `${BASE}${path || "/"}#faq`,
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

/*  Un nœud `WebPage` par page, rattaché au site et à l'entité. Sans lui, les
 *  blocs FAQ/Article flottent : rien ne dit de QUELLE page ils proviennent,
 *  ni qui en répond. `dateModified` est le signal de fraîcheur que Google et
 *  les moteurs de réponse regardent avant de reprendre un chiffre.          */
export function webPage({
  path,
  name,
  description,
  modified,
}: {
  path: string;
  name: string;
  description: string;
  modified: string;
}) {
  return {
    "@type": "WebPage",
    "@id": `${BASE}${path || "/"}#webpage`,
    url: `${BASE}${path}`,
    name,
    description,
    inLanguage: "fr-FR",
    isPartOf: { "@id": ID.website },
    about: { "@id": ID.service },
    publisher: { "@id": ID.org },
    dateModified: modified,
  };
}

/*  Pour les pages éditoriales. `author` explicite : une page de conseil sans
 *  auteur identifiable est systématiquement dépriorisée — c'est le cœur des
 *  critères E-E-A-T, et c'est aussi ce qu'un LLM cherche pour attribuer.    */
export function article({
  path,
  headline,
  description,
  published,
  modified,
}: {
  path: string;
  headline: string;
  description: string;
  published: string;
  modified: string;
}) {
  return {
    "@type": "Article",
    "@id": `${BASE}${path}#article`,
    headline,
    description,
    inLanguage: "fr-FR",
    isPartOf: { "@id": `${BASE}${path}#webpage` },
    mainEntityOfPage: { "@id": `${BASE}${path}#webpage` },
    about: { "@id": ID.service },
    author: { "@id": ID.org },
    publisher: { "@id": ID.org },
    datePublished: published,
    dateModified: modified,
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
