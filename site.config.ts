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
  tagline: "L'agence de clipping qui transforme votre contenu en millions de vues",
  description:
    "Agence de clipping française pour les marques. Nous découpons votre contenu long en clips verticaux et les diffusons sur des centaines de comptes : TikTok, Reels, Shorts. Facturation au CPM, vues vérifiées, budget plafonné à l'avance.",
  domain: "overflowmedia.fr",
  email: "contact@overflowmedia.fr",

  // ── Liens (⚠️ remplace par tes vraies URL) ────────────────────────────────
  links: {
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
    { to: 850, suffix: "+", label: "comptes diffuseurs", hint: "vérifiés avant campagne" },
    { to: 180, suffix: "K€", label: "de budget géré", hint: "toutes campagnes confondues" },
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
      "Paiement sécurisé via Whop",
    ],
  },

  // ── Simulateur : bornes et hypothèses (⚠️ cale-les sur ta réalité) ────────
  simulator: {
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
    // Vues moyennes par clip selon la niche — sert à estimer le nombre de clips
    nichePresets: [
      { key: "business", label: "Business & finance", viewsPerClip: 9_000 },
      { key: "divertissement", label: "Divertissement", viewsPerClip: 18_000 },
      { key: "musique", label: "Musique", viewsPerClip: 24_000 },
      { key: "tech", label: "Tech & SaaS", viewsPerClip: 11_000 },
      { key: "sport", label: "Sport", viewsPerClip: 16_000 },
    ],
  },

  // ── Mur de preuves (PLACEHOLDERS) ─────────────────────────────────────────
  //   Alimente l'animation d'ouverture. Chaque entrée = une vignette de clip.
  //   ⚠️ Remplace par de vrais clips et de vrais compteurs avant publication.
  proofs: [
    { platform: "TikTok", views: "2,4 M", client: "Créateur Business" },
    { platform: "Reels", views: "870 K", client: "Marque D2C" },
    { platform: "Shorts", views: "1,1 M", client: "App Mobile SaaS" },
    { platform: "TikTok", views: "430 K", client: "Label Musique FR" },
    { platform: "Reels", views: "3,6 M", client: "Créateur Business" },
    { platform: "Shorts", views: "620 K", client: "Média Sport" },
    { platform: "TikTok", views: "1,8 M", client: "Marque D2C" },
    { platform: "Reels", views: "295 K", client: "App Mobile SaaS" },
    { platform: "Shorts", views: "2,1 M", client: "Label Musique FR" },
    { platform: "TikTok", views: "740 K", client: "Média Sport" },
    { platform: "Reels", views: "1,3 M", client: "Créateur Business" },
    { platform: "Shorts", views: "510 K", client: "Marque D2C" },
  ],

  // ── Pour qui (liste éditoriale) ───────────────────────────────────────────
  //   `media` : aperçu 9:16 montré au survol de la ligne. Chemin d'un fichier
  //   placé dans `public/` — image (.jpg, .png, .webp) ou vidéo (.mp4, .webm),
  //   le composant choisit la balise selon l'extension.
  //   ⚠️ `null` tant qu'il n'y a pas d'asset : la ligne affiche alors un cadre
  //   vide au bon format. Ne jamais y mettre une image d'illustration
  //   empruntée ou générique — sur une section « pour qui », elle passerait
  //   pour un vrai extrait de campagne.
  niches: [
    {
      title: "Créateurs & infopreneurs",
      hint: "Podcasts, lives, formations",
      media: null as string | null,
    },
    { title: "Marques D2C", hint: "Produits qui se démontrent", media: null as string | null },
    { title: "Apps & SaaS", hint: "Installations à coût organique", media: null as string | null },
    { title: "Labels & artistes", hint: "Sorties, extraits, snippets", media: null as string | null },
    {
      title: "Médias & créateurs sport",
      hint: "Formats courts, réactions",
      media: null as string | null,
    },
  ],

  // ── Vérification anti-fraude ──────────────────────────────────────────────
  verification: [
    {
      phase: "Avant",
      title: "Audit des comptes",
      text: "Chaque compte diffuseur est vérifié avant d'entrer en campagne : historique, audience, régularité.",
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
        "On est passés de 40K à 3,2M de vues mensuelles en six semaines. Le vrai gain, c'est de ne plus rien avoir à coordonner : un seul interlocuteur, une seule facture.",
      author: "Prénom N.",
      role: "Créateur, 400K abonnés",
    },
    {
      quote:
        "Le tracking est transparent : je vois le CPM réel, les vues validées et ce que ça me coûte, en direct.",
      author: "Prénom N.",
      role: "Head of Growth, marque D2C",
    },
  ],

  // ── FAQ ───────────────────────────────────────────────────────────────────
  faq: [
    {
      q: "C'est quoi exactement le clipping ?",
      a: "Le clipping consiste à découper du contenu long (podcasts, lives, vidéos YouTube, interviews) en clips courts et verticaux, puis à les publier en masse sur TikTok, Reels et Shorts. Au lieu d'une seule vidéo qui fait 50 000 vues, vous avez des centaines de clips qui totalisent plusieurs millions de vues et ramènent du trafic vers votre offre.",
    },
    {
      q: "Comment fonctionne la facturation ?",
      a: "Au CPM : un montant fixe pour 1 000 vues générées, dans la limite d'un budget que vous fixez à l'avance. Pas d'enchères, pas d'abonnement, pas de frais cachés. À l'issue de l'appel de cadrage, vous recevez un lien de paiement Whop pour le budget convenu : c'est ce paiement qui déclenche le lancement de la campagne. Vous ne payez que les vues réellement produites et validées.",
    },
    {
      q: "Qui rémunère le réseau de diffusion ?",
      a: "Nous. Vous réglez un CPM unique à OverFlow Media, et nous rémunérons le réseau via Whop : les vues sont vérifiées, les versements se déclenchent automatiquement. Aucun contrat individuel à signer de votre côté, aucun virement à effectuer, aucune relance à traiter.",
    },
    {
      q: "Comment évitez-vous les vues achetées ou frauduleuses ?",
      a: "En trois temps : audit du compte avant l'entrée en campagne, modération manuelle de chaque clip soumis, puis contrôle des pics de vues anormaux avant facturation. Un compte pris en fraude est exclu, et les vues concernées ne vous sont pas facturées.",
    },
    {
      q: "Sous quel délai une campagne démarre-t-elle ?",
      a: "Comptez 48 h entre la validation du brief et les premiers clips en ligne : on prépare les assets, on publie la campagne sur Whop et la communauté se met au travail immédiatement.",
    },
    {
      q: "En quoi c'est différent du marketing d'influence ?",
      a: "En influence, vous louez l'audience d'un créateur, à l'unité et à prix fixe, sans garantie de vues. En clipping, vous payez la performance : des centaines de comptes testent des dizaines d'angles en parallèle, et vous ne réglez que les vues obtenues.",
    },
    {
      q: "Je garde les droits sur mon contenu ?",
      a: "Oui. Vous restez propriétaire de votre contenu source et des clips produits. La licence accordée au réseau de diffusion est limitée aux plateformes prévues dans le brief, pour la durée de la campagne.",
    },
  ],

  // ── Identité légale de l'éditeur ─────────────────────────────────────────
  //   OverFlow Media est une activité de la même entreprise individuelle que
  //   Graft (même SIREN) : les mentions légales, CGV et politique de
  //   confidentialité en dépendent directement (LCEN art. 6 III-1 ; art. 28
  //   et 30 du RGPD pour la traçabilité du responsable de traitement).
  //   ⚠️ `legalName` reprend l'abréviation « Augustin D. » déjà en usage sur
  //   Graft. La LCEN exige le nom ET le prénom en toutes lettres pour une
  //   personne physique : en l'état, ce n'est pas strictement conforme. Le
  //   SIREN permet néanmoins l'identification via data.inpi.fr. À corriger en
  //   nom complet avant tout litige.
  legal: {
    legalName: "Augustin D. — Entrepreneur individuel",
    legalForm: "Entreprise individuelle (EI), régime micro-entreprise",
    siren: "937 506 764",
    siret: "937 506 764 00011",
    rcs: "RCS Limoges 937 506 764",
    vatNumber: "TVA non applicable, art. 293 B du CGI",
    address: "14 bis avenue de la République, 87170 Isle, France",
    director: "Augustin D.",
    host: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA",
    hostRegion: "Union européenne",
    court: "Tribunal de commerce de Limoges",
    lastUpdated: "26 août 2026",
  },
} as const;

export type Site = typeof site;
