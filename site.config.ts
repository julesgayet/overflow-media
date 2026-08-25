/* ============================================================================
 *  ⚠️  FICHIER À ÉDITER — TOUT LE CONTENU DU SITE EST ICI.
 *
 *  Les CHIFFRES, CAMPAGNES, RÉFÉRENCES et TÉMOIGNAGES ci-dessous sont des
 *  PLACEHOLDERS d'exemple. Remplace-les par tes vraies données avant de
 *  publier : afficher de faux résultats ou de faux avis est une pratique
 *  commerciale trompeuse (art. L121-2 du Code de la consommation).
 * ========================================================================== */

export const site = {
  // ── Identité ──────────────────────────────────────────────────────────────
  name: "OverFlow Media",
  legalName: "OverFlow Media",
  tagline: "L'agence de clipping qui transforme ton contenu en millions de vues",
  description:
    "Agence de clipping française. On recrute, on brief et on rémunère des centaines de clippeurs pour propulser ton contenu sur TikTok, Reels et Shorts. Paiement au CPM, vues vérifiées, versements automatisés via Whop.",
  domain: "overflowmedia.fr",
  email: "contact@overflowmedia.fr",

  // ── Liens (⚠️ remplace par tes vraies URL) ────────────────────────────────
  links: {
    whopClippers: "https://whop.com/ton-whop",
    whopBrands: "https://whop.com/ton-whop",
    discord: "https://discord.gg/ton-invite",
    tiktok: "https://www.tiktok.com/@ton-compte",
    instagram: "https://www.instagram.com/ton-compte",
    x: "https://x.com/ton-compte",
    youtube: "https://www.youtube.com/@ton-compte",
  },

  // ── Cal.com ───────────────────────────────────────────────────────────────
  //   Le calendrier est intégré dans la section « contact » en bas de page.
  //   `event` doit correspondre au slug de ton type d'événement Cal.com :
  //   cal.com/{username}/{event} — ici cal.com/overflow-media/campagne-clipping
  calcom: {
    username: "overflow-media",
    event: "campagne-clipping",
    duration: "15 min",
  },

  // ── Bandeau de chiffres du hero (PLACEHOLDERS) ────────────────────────────
  //   `to` = valeur finale animée, `suffix`/`prefix` = habillage
  stats: [
    { to: 120, suffix: "M+", label: "vues générées", hint: "toutes campagnes confondues" },
    { to: 850, suffix: "+", label: "clippeurs actifs", hint: "comptes vérifiés" },
    { to: 180, suffix: "K€", label: "reversés aux clippeurs", hint: "versements via Whop" },
    { to: 48, suffix: "h", label: "pour lancer", hint: "du brief au premier clip" },
  ],

  // ── Tarif public ──────────────────────────────────────────────────────────
  pricing: {
    from: "0,80 €",
    unit: "les 1 000 vues",
    bullets: [
      "CPM fixe, pas d'enchères",
      "Vues humaines uniquement",
      "Budget plafonné à l'avance",
      "Sans engagement de durée",
    ],
  },

  // ── Simulateur : bornes et hypothèses (⚠️ cale-les sur ta réalité) ────────
  simulator: {
    // Mode « marque » : budget alloué à la campagne
    budgetMin: 500,
    budgetMax: 25000,
    budgetStep: 250,
    budgetDefault: 5000,
    // CPM facturé à la marque (€ pour 1 000 vues)
    cpmMin: 0.5,
    cpmMax: 2.5,
    cpmStep: 0.05,
    cpmDefault: 0.9,
    // CPM moyen d'une campagne publicitaire classique, pour la comparaison
    paidCpm: 14,
    // Mode « clippeur » : volume de vues produites sur le mois
    viewsMin: 50_000,
    viewsMax: 5_000_000,
    viewsStep: 10_000,
    viewsDefault: 800_000,
    // Vues moyennes par clip selon la niche — sert à estimer le nombre de clips
    nichePresets: [
      { key: "business", label: "Business & finance", viewsPerClip: 9_000 },
      { key: "divertissement", label: "Divertissement", viewsPerClip: 18_000 },
      { key: "musique", label: "Musique", viewsPerClip: 24_000 },
      { key: "tech", label: "Tech & SaaS", viewsPerClip: 11_000 },
      { key: "sport", label: "Sport", viewsPerClip: 16_000 },
    ],
  },

  // ── Pour qui (liste éditoriale) ───────────────────────────────────────────
  niches: [
    { title: "Créateurs & infopreneurs", hint: "Podcasts, lives, formations" },
    { title: "Marques D2C", hint: "Produits qui se démontrent" },
    { title: "Apps & SaaS", hint: "Installations à coût organique" },
    { title: "Labels & artistes", hint: "Sorties, extraits, snippets" },
    { title: "Médias & créateurs sport", hint: "Formats courts, réactions" },
  ],

  // ── Vérification anti-fraude ──────────────────────────────────────────────
  verification: [
    {
      phase: "Avant",
      title: "Audit des comptes",
      text: "Chaque clippeur est vérifié avant d'entrer : historique du compte, audience, régularité.",
    },
    {
      phase: "Pendant",
      title: "Modération des clips",
      text: "Chaque clip soumis est relu : respect du brief, de la charte et des règles de la plateforme.",
    },
    {
      phase: "Après",
      title: "Filtrage des vues",
      text: "Les pics anormaux sont contrôlés. Seules les vues humaines validées déclenchent un paiement.",
    },
  ],

  // ── Campagnes en cours (PLACEHOLDERS) ─────────────────────────────────────
  campaigns: [
    {
      client: "Créateur Business",
      niche: "Business & finance",
      platforms: ["TikTok", "Reels"],
      cpm: "1,20 €",
      budget: "5 000 €",
      views: "4,1 M",
      progress: 68,
      status: "En cours" as const,
    },
    {
      client: "Label Musique FR",
      niche: "Musique / sortie d'album",
      platforms: ["TikTok", "Shorts"],
      cpm: "0,90 €",
      budget: "8 000 €",
      views: "3,6 M",
      progress: 41,
      status: "En cours" as const,
    },
    {
      client: "App Mobile SaaS",
      niche: "Tech & productivité",
      platforms: ["Reels", "TikTok"],
      cpm: "1,50 €",
      budget: "3 500 €",
      views: "2,1 M",
      progress: 92,
      status: "Bientôt clôturée" as const,
    },
  ],

  // ── Témoignages (PLACEHOLDERS) ────────────────────────────────────────────
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
        "Le tracking est transparent : je vois le CPM réel, les vues validées et ce que ça me coûte, en direct.",
      author: "Prénom N.",
      role: "Head of Growth, marque D2C",
      side: "brand" as const,
    },
  ],

  // ── FAQ ───────────────────────────────────────────────────────────────────
  faq: [
    {
      q: "C'est quoi exactement le clipping ?",
      a: "Le clipping consiste à découper du contenu long (podcasts, lives, vidéos YouTube, interviews) en clips courts et verticaux, puis à les publier en masse sur TikTok, Reels et Shorts. Au lieu d'une seule vidéo qui fait 50 000 vues, tu as des centaines de clips qui totalisent plusieurs millions de vues et ramènent du trafic vers ton offre.",
    },
    {
      q: "Comment fonctionne la facturation ?",
      a: "Au CPM : un montant fixe pour 1 000 vues générées, dans la limite d'un budget que tu fixes à l'avance. Pas d'enchères, pas d'abonnement, pas de frais cachés. Tu ne paies que les vues réellement produites et validées.",
    },
    {
      q: "Comment les clippeurs sont-ils payés ?",
      a: "Tout passe par Whop. Le clippeur soumet ses liens, les vues sont vérifiées, et le versement est déclenché automatiquement selon le CPM de la campagne. Aucun virement manuel, aucune relance.",
    },
    {
      q: "Faut-il un minimum d'abonnés pour devenir clippeur ?",
      a: "Non. On juge la qualité du montage, pas la taille du compte. Tu peux démarrer avec un compte neuf : ce qui compte, c'est de respecter le brief, la charte de la marque et le rythme de publication.",
    },
    {
      q: "Comment évitez-vous les vues achetées ou frauduleuses ?",
      a: "En trois temps : audit du compte avant l'entrée en campagne, modération manuelle de chaque clip soumis, puis contrôle des pics de vues anormaux avant validation du paiement. Un clippeur pris en fraude est exclu et ses gains en attente sont annulés.",
    },
    {
      q: "Sous quel délai une campagne démarre-t-elle ?",
      a: "Comptez 48 h entre la validation du brief et les premiers clips en ligne : on prépare les assets, on publie la campagne sur Whop et la communauté se met au travail immédiatement.",
    },
    {
      q: "En quoi c'est différent du marketing d'influence ?",
      a: "En influence, tu loues l'audience d'un créateur, à l'unité et à prix fixe, sans garantie de vues. En clipping, tu paies la performance : des centaines de comptes testent des dizaines d'angles en parallèle, et tu ne règles que les vues obtenues.",
    },
    {
      q: "Je garde les droits sur mon contenu ?",
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
