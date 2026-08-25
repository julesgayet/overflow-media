/* ============================================================================
 *  ⚠️  FICHIER À ÉDITER — TOUT LE CONTENU DU SITE EST ICI.
 *
 *  Les CHIFFRES, TÉMOIGNAGES et CAMPAGNES ci-dessous sont des PLACEHOLDERS
 *  d'exemple. Remplace-les par tes vraies données avant de publier le site :
 *  publier de faux résultats ou de faux témoignages t'expose juridiquement
 *  (pratique commerciale trompeuse, art. L121-2 du Code de la consommation).
 * ========================================================================== */

export const site = {
  // ── Identité ──────────────────────────────────────────────────────────────
  name: "OverFlow Media",
  legalName: "OverFlow Media", // raison sociale pour les mentions légales
  tagline: "L'agence de clipping qui transforme ton contenu en millions de vues",
  description:
    "Agence de clipping française. On recrute, on forme et on rémunère des centaines de clippeurs pour propulser ton contenu sur TikTok, Reels et Shorts. Paiements automatisés via Whop.",
  domain: "overflowmedia.fr",
  email: "contact@overflowmedia.fr",

  // ── Liens (⚠️ remplace par tes vraies URL Whop) ───────────────────────────
  links: {
    whopClippers: "https://whop.com/ton-whop", // page Whop pour les clippeurs
    whopBrands: "https://whop.com/ton-whop", // ou lien Calendly / formulaire marques
    calendly: "mailto:contact@overflowmedia.fr?subject=Lancer%20une%20campagne%20de%20clipping",
    discord: "https://discord.gg/ton-invite",
    tiktok: "https://www.tiktok.com/@ton-compte",
    instagram: "https://www.instagram.com/ton-compte",
    x: "https://x.com/ton-compte",
    youtube: "https://www.youtube.com/@ton-compte",
  },

  // ── Bandeau de chiffres (PLACEHOLDERS) ────────────────────────────────────
  stats: [
    { value: "120M+", label: "vues générées", hint: "sur l'ensemble des campagnes" },
    { value: "850+", label: "clippeurs actifs", hint: "communauté vérifiée" },
    { value: "180K€", label: "reversés aux clippeurs", hint: "paiements via Whop" },
    { value: "48h", label: "pour lancer une campagne", hint: "du brief au premier clip" },
  ],

  // ── Plateformes couvertes ─────────────────────────────────────────────────
  platforms: ["TikTok", "Instagram Reels", "YouTube Shorts", "X / Twitter", "Snapchat Spotlight"],

  // ── Campagnes en cours (PLACEHOLDERS) ─────────────────────────────────────
  campaigns: [
    {
      client: "Créateur Business",
      niche: "Business & finance",
      platforms: ["TikTok", "Reels"],
      cpm: "1,20 €",
      budget: "5 000 €",
      progress: 68,
      status: "En cours" as const,
    },
    {
      client: "Label Musique FR",
      niche: "Musique / sortie d'album",
      platforms: ["TikTok", "Shorts"],
      cpm: "0,90 €",
      budget: "8 000 €",
      progress: 41,
      status: "En cours" as const,
    },
    {
      client: "App Mobile SaaS",
      niche: "Tech & productivité",
      platforms: ["Reels", "TikTok"],
      cpm: "1,50 €",
      budget: "3 500 €",
      progress: 92,
      status: "Bientôt clôturée" as const,
    },
  ],

  // ── Témoignages (PLACEHOLDERS — remplace par de vrais retours) ────────────
  testimonials: [
    {
      quote:
        "On est passés de 40K à 3,2M de vues mensuelles en six semaines. Le vrai gain, c'est de ne plus gérer 200 clippeurs à la main.",
      author: "Prénom N.",
      role: "Créateur, 400K abonnés",
      side: "brand" as const,
    },
    {
      quote:
        "Brief clair, assets fournis, paiement tombé le jour dit sur Whop. C'est la première agence où je n'ai pas eu à relancer.",
      author: "Prénom N.",
      role: "Clippeur, 2 ans d'expérience",
      side: "clipper" as const,
    },
    {
      quote:
        "Le tracking est transparent : je vois le CPM réel, les vues validées et ce que ça me coûte, en direct.",
      author: "Prénom N.",
      role: "Head of Growth, marque D2C",
      side: "brand" as const,
    },
  ],

  // ── FAQ ───────────────────────────────────────────────────────────────────
  faq: [
    {
      q: "C'est quoi exactement le clipping ?",
      a: "Le clipping consiste à découper du contenu long (podcasts, lives, vidéos YouTube, interviews) en clips courts et verticaux, puis à les publier en masse sur TikTok, Reels et Shorts. Au lieu d'une seule vidéo qui fait 50 000 vues, tu as 300 clips qui totalisent plusieurs millions de vues et qui ramènent du trafic vers ton offre.",
    },
    {
      q: "Comment les clippeurs sont-ils payés ?",
      a: "Au CPM : un montant fixe pour 1 000 vues générées, plafonné par un budget de campagne. Tout passe par Whop : le clippeur soumet ses liens, les vues sont vérifiées, et le paiement est déclenché automatiquement. Aucun virement manuel, aucune relance.",
    },
    {
      q: "Faut-il un minimum d'abonnés pour devenir clippeur ?",
      a: "Non. On juge la qualité du montage, pas ta taille de compte. Tu peux démarrer avec un compte neuf : ce qui compte, c'est de respecter le brief, la charte de la marque et le rythme de publication.",
    },
    {
      q: "Combien coûte une campagne pour une marque ?",
      a: "Tu fixes toi-même ton budget et ton CPM cible. On conseille de démarrer autour de 2 000 € pour avoir un volume de clips suffisant et des données exploitables. Tu ne paies que les vues réellement générées et validées — pas de retainer caché.",
    },
    {
      q: "Comment évitez-vous les vues achetées ou frauduleuses ?",
      a: "Chaque compte est vérifié à l'entrée, chaque clip soumis passe par une modération manuelle, et les pics de vues anormaux sont contrôlés avant validation du paiement. Un clippeur pris en fraude est exclu et ses gains en attente sont annulés.",
    },
    {
      q: "Sous quel délai une campagne démarre-t-elle ?",
      a: "Comptez 48 h entre la validation du brief et les premiers clips en ligne : on prépare les assets, on publie la campagne sur Whop et la communauté se met au travail immédiatement.",
    },
    {
      q: "Je garde les droits sur mon contenu ?",
      a: "Oui. Tu restes propriétaire de ton contenu source et des clips produits. La licence accordée aux clippeurs est limitée à la diffusion sur les plateformes prévues dans le brief, pour la durée de la campagne.",
    },
  ],

  // ── Mentions légales ──────────────────────────────────────────────────────
  legal: {
    siret: "À COMPLÉTER",
    address: "À COMPLÉTER",
    director: "À COMPLÉTER",
    host: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA",
  },
} as const;

export type Site = typeof site;
