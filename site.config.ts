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
  name: "Omniflux",
  legalName: "Omniflux",
  tagline: "L'agence de clipping qui transforme votre contenu en millions de vues",
  description:
    "Agence de clipping française pour les marques. Nous découpons votre contenu long en clips verticaux et les diffusons sur des centaines de comptes : TikTok, Reels, Shorts. Facturation au CPM, vues vérifiées, budget plafonné à l'avance.",
  domain: "omniflux.fr",
  email: "contact@omniflux.fr",

  // ── Liens (⚠️ remplace par tes vraies URL) ────────────────────────────────
  links: {
    discord: "https://discord.gg/ton-invite",
    tiktok: "https://www.tiktok.com/@ton-compte",
    instagram: "https://www.instagram.com/ton-compte",
    x: "https://x.com/ton-compte",
    youtube: "https://www.youtube.com/@ton-compte",
  },

  // ── Cal.com ───────────────────────────────────────────────────────────────
  //   Le calendrier est intégré dans la section « contact » en bas de page.
  //   `event` doit correspondre au slug de ton type d'événement Cal.com :
  //   cal.com/{username}/{event} — ici cal.com/augustin-durand-p4cx4w/decouverte-de-omniflux
  calcom: {
    username: "augustin-durand-p4cx4w",
    event: "decouverte-de-omniflux",
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
    // `from` = affichage ; `fromValue` = même nombre en brut, pour calculer le
    // multiplicateur "Nx moins cher que la pub" (hero) sans jamais le
    // désynchroniser du CPM affiché. Aligné sur le plancher du simulateur
    // (`simulator.cpmMin`) : le prix d'appel réel, sur l'audience la plus
    // large et la moins chère à toucher.
    from: "0,80 €",
    fromValue: 0.8,
    unit: "les 1 000 vues",
    bullets: [
      "CPM fixe, pas d'enchères",
      "Vues humaines uniquement",
      "Budget plafonné à l'avance",
      "Sans engagement de durée",
      "Paiement sécurisé en ligne",
    ],
  },

  // ── Simulateur : bornes et hypothèses (⚠️ cale-les sur ta réalité) ────────
  simulator: {
    budgetMin: 500,
    budgetMax: 25000,
    budgetStep: 250,
    budgetDefault: 5000,

    // CPM facturé à la marque (€ pour 1 000 vues). Plage unique : le prix ne
    // dépend plus d'une niche imposée mais de ce que la marque vise, et le
    // ciblage se règle à côté (pays / genre / âge). 0,80 € est un plancher
    // soutenable, jamais en dessous du coût d'achat ; 3,00 € couvre les
    // audiences les plus difficiles à toucher. Le coût d'achat lui-même
    // n'apparaît nulle part dans ce dépôt — il n'a rien à faire dans un code
    // source, a fortiori public.
    cpmMin: 0.8,
    cpmMax: 3,
    cpmStep: 0.05,
    cpmDefault: 1.2,

    // CPM moyen d'une campagne publicitaire classique, pour la comparaison
    paidCpm: 14,

    // ── Ciblage d'audience ────────────────────────────────────────────────
    //   Affiné pour le devis, sans effet sur l'estimation de vues affichée
    //   ici : à budget et CPM égaux, le volume de vues acheté ne change pas
    //   selon l'audience visée. `reach` n'est donc pas consommé pour
    //   l'instant — gardé pour documenter la taille relative de chaque
    //   segment si un futur calcul en a besoin.
    audience: {
      countries: [
        { key: "monde", label: "Monde", reach: 1 },
        { key: "fr", label: "France", reach: 0.42 },
        { key: "eu", label: "Europe", reach: 0.72 },
        { key: "us", label: "États-Unis", reach: 0.68 },
        { key: "uk", label: "Royaume-Uni", reach: 0.4 },
        { key: "ca", label: "Canada", reach: 0.34 },
      ],
      genders: [
        { key: "tous", label: "Tous", reach: 1 },
        { key: "femmes", label: "Femmes", reach: 0.55 },
        { key: "hommes", label: "Hommes", reach: 0.55 },
      ],
      ages: [
        { key: "all", label: "Tous âges", reach: 1 },
        { key: "13-17", label: "13-17", reach: 0.28 },
        { key: "18-24", label: "18-24", reach: 0.45 },
        { key: "25-34", label: "25-34", reach: 0.4 },
        { key: "35-44", label: "35-44", reach: 0.26 },
        { key: "45+", label: "45+", reach: 0.18 },
      ],
    },
  },

  // ── Mur de preuves (PLACEHOLDERS) ─────────────────────────────────────────
  //   Alimente l'animation d'ouverture. Chaque entrée = une vignette de clip.
  //   ⚠️ Remplace par de vrais clips et de vrais compteurs avant publication.
  proofs: [
    { platform: "TikTok", views: "2,4 M", client: "Business" },
    { platform: "Reels", views: "870 K", client: "Marque D2C" },
    { platform: "Shorts", views: "1,1 M", client: "Mobile SaaS" },
    { platform: "TikTok", views: "430 K", client: "Musique FR" },
    { platform: "Reels", views: "3,6 M", client: "Business" },
    { platform: "Shorts", views: "620 K", client: "Média Sport" },
    { platform: "TikTok", views: "1,8 M", client: "Marque D2C" },
    { platform: "Reels", views: "295 K", client: "Mobile SaaS" },
    { platform: "Shorts", views: "2,1 M", client: "Musique FR" },
    { platform: "TikTok", views: "740 K", client: "Média Sport" },
    { platform: "Reels", views: "1,3 M", client: "Business" },
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
      media: "/media/pour-qui/createurs.webm" as string | null,
    },
    {
      title: "Marques D2C",
      hint: "Produits qui se démontrent",
      media: "/media/pour-qui/marques-d2c.webm" as string | null,
    },
    {
      title: "Apps & SaaS",
      hint: "Installations à coût organique",
      media: "/media/pour-qui/apps-saas.webm" as string | null,
    },
    {
      title: "Labels & artistes",
      hint: "Sorties, extraits, snippets",
      media: "/media/pour-qui/labels-artistes.webm" as string | null,
    },
    {
      title: "Médias & créateurs sport",
      hint: "Formats courts, réactions",
      media: "/media/pour-qui/sport.webm" as string | null,
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
      client: "Créateur",
      niche: "Business & finance",
      platforms: ["TikTok", "Reels"],
      cpm: "1,20 €",
      budget: "5 000 €",
      views: "4,1 M",
      progress: 68,
      status: "En cours" as const,
    },
    {
      client: "Label de musique",
      niche: "Musique / sortie d'album",
      platforms: ["TikTok", "Shorts"],
      cpm: "0,90 €",
      budget: "8 000 €",
      views: "3,6 M",
      progress: 41,
      status: "En cours" as const,
    },
    {
      client: "App & SaaS",
      niche: "Tech & productivité",
      platforms: ["Reels", "TikTok"],
      cpm: "1,50 €",
      budget: "3 500 €",
      views: "2,1 M",
      progress: 92,
      status: "Bientôt clôturée" as const,
    },
  ],

  // ── Témoignages ───────────────────────────────────────────────────────────
  //  Avis réels, recueillis sous l'enseigne précédente. Citations reproduites
  //  mot pour mot : ne rien réécrire, ne rien « améliorer ». Seules deux
  //  coquilles de FONCTION ont été corrigées à la saisie (« hote podcast »,
  //  « head of grothw »).
  //
  //  ⚠️ Deux vérifications avant mise en ligne :
  //   · l'accord de publication doit couvrir le nom Omniflux, pas seulement
  //     l'ancienne enseigne ;
  //   · si l'ancienne agence est une autre entité juridique, situer les avis
  //     (mention « recueillis avant le changement de nom ») — sinon ils
  //     laissent croire à des campagnes Omniflux.
  //
  //  Les profils couverts ici (podcast/stream, B2B & personal branding,
  //  médias) ne recouvrent pas les cinq `niches` annoncées plus haut : rien
  //  en D2C, SaaS, label ni sport. Combler avec de vrais retours, ou aligner
  //  la liste des audiences sur le portefeuille réel.
  testimonials: [
    // ── Podcasteurs & streamers
    {
      quote:
        "Une efficacité redoutable. Ils extraient les meilleurs moments de nos podcasts d'une heure pour en faire des formats courts ultra-dynamiques. Le montage maintient l'audience jusqu'au bout : notre watch-time a explosé, ce qui a fait décoller le CPM de notre chaîne YouTube sur la monétisation.",
      author: "Thomas Lemaire",
      role: "Hôte de podcast",
    },
    {
      quote:
        "L'agence gère tout le clipping de mes VODs Twitch. Ils ont l'œil pour repérer la séquence qui va fonctionner. L'engagement sur mes TikToks et Shorts est tel que mon RPM/CPM sur les programmes de monétisation créateurs a doublé en trois mois. Un gain de temps massif.",
      author: "Julien Vasseur",
      role: "Créateur de contenu",
    },
    // ── B2B & personal branding
    {
      quote:
        "On leur confie l'intégralité de nos conférences et webinaires. Ils savent exactement comment isoler la valeur d'un discours technique de 45 minutes pour en faire un clip percutant de 30 secondes. Notre portée organique sur LinkedIn n'a jamais été aussi haute.",
      author: "Sarah Dubois",
      role: "Head of Growth",
    },
    {
      quote:
        "Un service de clipping d'une précision chirurgicale. Ils comprennent les enjeux de mon secteur et ne dénaturent jamais le message initial. L'augmentation de la rétention sur mes Reels a attiré de nouveaux sponsors avec des offres au CPM bien plus avantageuses pour moi.",
      author: "Antoine Mercier",
      role: "Consultant",
    },
    // ── Médias & intervenants
    {
      quote:
        "Réactivité, sens du rythme et maîtrise parfaite de la narration courte. Leurs sous-titres et animations captent l'attention dès la première seconde. C'est le partenaire idéal pour maximiser ses revenus organiques.",
      author: "Maxime Ribeiro",
      role: "Vidéaste indépendant",
    },
    {
      quote:
        "Travail de très haute qualité sur la découpe de nos interviews. L'équipe sait créer des \"hooks\" visuels qui retiennent l'audience et poussent les algorithmes à nous mettre en avant.",
      author: "Claire Fontaine",
      role: "Directrice de la communication",
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
      a: "Au CPM : un montant fixe pour 1 000 vues générées, dans la limite d'un budget que vous fixez à l'avance. Pas d'enchères, pas d'abonnement, pas de frais cachés. À l'issue de l'appel de cadrage, vous recevez un lien de paiement sécurisé pour le budget convenu : c'est ce paiement qui déclenche le lancement de la campagne. Vous ne payez que les vues réellement produites et validées.",
    },
    {
      q: "Qui rémunère le réseau de diffusion ?",
      a: "Nous. Vous réglez un CPM unique à Omniflux, et nous rémunérons le réseau : les vues sont vérifiées, les versements se déclenchent automatiquement. Aucun contrat individuel à signer de votre côté, aucun virement à effectuer, aucune relance à traiter.",
    },
    {
      q: "Comment évitez-vous les vues achetées ou frauduleuses ?",
      a: "En trois temps : audit du compte avant l'entrée en campagne, modération manuelle de chaque clip soumis, puis contrôle des pics de vues anormaux avant facturation. Un compte pris en fraude est exclu, et les vues concernées ne vous sont pas facturées.",
    },
    {
      q: "Sous quel délai une campagne démarre-t-elle ?",
      a: "Comptez 48 h entre la validation du brief et les premiers clips en ligne : on prépare les assets, on lance la campagne et le réseau se met au travail immédiatement.",
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
  //   Omniflux est une activité de la même entreprise individuelle que
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
