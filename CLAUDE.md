# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Landing page d'OverFlow Media, agence de clipping française. Next.js 16 (App Router),
React 19, Tailwind v4, TypeScript. 100 % statique, déployé sur Vercel.

**La langue du projet est le français** : copie de l'interface, commentaires et messages
de commit. S'y tenir.

## Commandes

```bash
npm run dev          # serveur de dev sur :3000
npm run build        # build de production
npm start            # sert le build
```

Il n'y a **ni linter ni tests** configurés. `npm run build` (qui lance tsc) est donc le
seul garde-fou automatique : le passer avant de considérer un changement terminé.

## Architecture

### Contenu et présentation sont séparés

`site.config.ts` contient **toute** la copie et toutes les données du site — un seul objet
`site` exporté `as const`. Les composants ne codent aucun texte en dur : ils lisent depuis
`site`. Pour changer un chiffre, un tarif, une FAQ ou un lien, éditer ce fichier, jamais un
composant.

`app/page.tsx` assemble les sections dans l'ordre et rien d'autre. Retirer une section =
commenter son composant ici.

### La couleur passe uniquement par les tokens

Le bloc `@theme` de `app/globals.css` est la source de vérité unique. Les composants
n'utilisent que les classes sémantiques (`bg-ground`, `text-ink`, `text-mist`, `bg-brand`,
`border-line`…) — **aucune couleur littérale, aucune couleur Tailwind par défaut** type
`text-amber-300`. Changer la palette du site entier revient à éditer ce seul bloc.

Deux pièges :

- **`ground` = fond de page, `ink` = texte.** Ne pas les intervertir. C'était l'inverse dans
  l'ancien thème sombre, d'où le risque en reprenant du vieux code.
- **Le vert (`lime`) ne signale qu'un fait vérifié** (vues validées, versement effectué),
  jamais une décoration. Le cobalt (`brand`) est le seul accent autorisé ; s'il en faut un
  deuxième, c'est que la mise en page est à revoir.

La charte complète (neutres gris purs, accent cobalt unique, échelle typographique) est
documentée hors dépôt ; l'essentiel tient dans le `@theme` et ses commentaires.

### Les surfaces sombres sont voulues

La page est claire, mais trois zones restent sombres **par choix** — ne pas les « corriger » :

- les vignettes de clips du hero et la maquette de lecteur de `feed-math.tsx` : ce sont des
  surfaces filmées, traitées comme de la matière vidéo ;
- le bandeau tarifs (`pricing.tsx`), plein cadre en encre : seul ancrage sombre de la page.

C'est le seul endroit où `text-white` est légitime. Partout ailleurs il trahit un reste du
thème sombre d'origine.

### Logo

Défini une fois dans `components/logo.tsx` (`LogoMark` nu, `LogoTile` en pastille, `Logo`
avec le mot). Le tracé est dupliqué à la main dans **`app/icon.svg`** (favicon) et
**`app/opengraph-image.tsx`** : modifier les trois ensemble.

Le symbole est le O du nom, ouvert en haut à droite, dont le trait s'échappe. Son ouverture
fait 66° — la resserrer referme la boucle optiquement et le symbole devient un spinner.

### Animations

- `components/ui.tsx` → `Reveal` : fondu + montée à l'entrée dans le viewport
  (IntersectionObserver, classes `.reveal` / `.is-visible`).
- `components/tilt-card.tsx` → `TiltCard` : carte qui s'incline vers le curseur. **Le
  composant n'écrit que des variables CSS** ; la perspective, le halo et la garde
  `prefers-reduced-motion` vivent dans le bloc `.tilt-card` de `globals.css`. Sans ce CSS,
  rien ne bouge.

  Régler `maxTilt={0}` dès qu'une carte contient des commandes : sur un panneau large,
  quelques degrés déplacent les bords de dizaines de pixels et la piste d'un curseur se
  dérobe sous le doigt (cas du simulateur).

### Points de structure non évidents

- `how.tsx` rend chaque panneau **deux fois** : une colonne collante en desktop
  (`hidden lg:block`) et un exemplaire inline sous chaque étape en mobile. Une modification
  doit valoir pour les deux.
- Les polices viennent de `next/font/google` dans `app/layout.tsx` (Geist / Geist Mono),
  exposées en variables CSS puis rebranchées sur `--font-sans` / `--font-mono` dans le
  `@theme`. Changer de police se fait à ces deux endroits.
- Le SEO structuré (`ProfessionalService` + `FAQPage`) est généré dans `app/page.tsx` à
  partir de `site.config.ts` : la FAQ affichée et la FAQ indexée ne peuvent pas diverger.

## Contenu de démonstration — obligation légale

Les `stats`, `campaigns` et `testimonials` de `site.config.ts` sont des **placeholders**.
Publier de faux résultats ou de faux avis est une pratique commerciale trompeuse
(art. L121-2 du Code de la consommation). Avant toute mise en ligne : remplacer par les
vraies données, ou supprimer les sections concernées. Ne jamais inventer de chiffres pour
« remplir ».
