# Médias de la landing page

Dépose ici les vraies vidéos / images. **Un sous-dossier = une section de la page**,
nommé d'après l'ancre de cette section (`<section id="…">`).

Référence toujours par chemin **absolu depuis la racine** : le fichier
`public/media/pour-qui/createurs.mp4` s'écrit `/media/pour-qui/createurs.mp4`.

## Correspondance dossier → section de la page

| Dossier | Section (ancre) | Titre affiché | Composant | Emplacement des médias |
|---|---|---|---|---|
| `pour-qui/`  | `#pour-qui`  | « Pour qui »                 | `components/audiences.tsx` | aperçu 9:16 au survol de chaque ligne |
| `preuves/`   | `#preuves`   | « Des clips, pas des promesses » | `components/proof-arc.tsx` | vignettes du mur de preuves animé |
| `methode/`   | `#methode`   | « La méthode » (étape 2 – Diffusion) | `components/how.tsx` | grille « Diffusion en cours » |
| `mecanique/` | `#mecanique` | « La mécanique du clipping » | `components/feed-math.tsx` | maquette de démonstration (grille de carrés) |

## Compatibilité navigateurs — un clip, trois fichiers

Chaque vidéo déposée doit exister sous **trois formes portant le même nom** :

| Fichier | Rôle |
|---|---|
| `clip-01.mp4`  | H.264. Servi en premier : décodé en matériel sur tous les navigateurs. |
| `clip-01.webm` | VP9. Servi en second, pour les navigateurs qui le préfèrent. |
| `clip-01.jpg`  | Première image. Peinte avant tout décodage, et seule image affichée hors écran. |

Le WebM seul ne suffit pas : Safari décode le VP9 en matériel sur Mac, Firefox
retombe sur un décodage logiciel — la page affichait des vignettes noires et
saccadait. `lib/media.ts` ne compte qu'un clip par nom, `components/clip.tsx`
choisit l'encodage et ne lance que ce qui est à l'écran (10 lecteurs maximum).

Après avoir déposé un fichier, générer les jumeaux manquants :

```bash
ffmpeg -i clip.webm -c:v libx264 -profile:v main -pix_fmt yuv420p \
  -crf 26 -preset slow -movflags +faststart -an clip.mp4
ffmpeg -i clip.webm -frames:v 1 -q:v 6 clip.jpg
```

## État du câblage

- **`pour-qui/`** — déjà branché. Remplacer les `media: null` dans
  `site.config.ts › niches[]` : `media: "/media/pour-qui/createurs.mp4"`.
  Le composant choisit `<video>` ou `<img>` selon l'extension.
- **`preuves/`** — branché en **auto-découverte** (comme `mecanique/`) : dépose
  des `.webm`/`.mp4`, n'importe quel nom, relance le build. `lib/media.ts` les
  liste, `page.tsx` les passe à `ProofArc`. **Une carte de l'arc = un clip** ;
  les libellés (plateforme, vues, campagne) sont repris en boucle sur
  `site.config.ts › proofs[]`. L'arc a été calibré pour ~12 vignettes : au-delà
  de ~16 elles deviennent petites et serrées. Format : 9:16, muet, < 400 Ko.
- **`mecanique/`** — branché en **auto-découverte** : dépose des `.mp4` (ou
  `.webm`), **n'importe quel nom**, et relance le build. `lib/media.ts` les
  liste tout seul, `page.tsx` les passe à `FeedMath`. Rien à toucher dans
  `site.config.ts`.
  → **une case = un clip**, jamais de répétition. La grille (6 colonnes) rend
  autant de cases que de fichiers. Vise **~30 clips** (5 lignes) ; sans aucun
  fichier elle reste un visuel abstrait de 30 dégradés.
  Format court (3–6 s), muet, 9:16, **< 300 Ko pièce** (toutes jouées en même
  temps). Je les compresse à ce niveau si tu déposes des fichiers lourds.
- **`methode/`** — branché en **auto-découverte** : dépose des `.webm`/`.mp4`,
  n'importe quel nom, relance le build. Alimente la grille « Diffusion en cours »
  de l'étape 2 (`components/how.tsx`). Une case = un clip ; sans fichier, 32
  carrés abstraits. Survol = agrandissement. Format : 9:16, muet, < 400 Ko.

## Format attendu

- Vidéo : `.webm` (VP9) ou `.mp4` (H.264), **muette**, 9:16, quelques secondes en
  boucle, < 2 Mo par clip. Fournir aussi un poster `.jpg` du même nom.
- Image : `.jpg`, `.png` ou `.webp`.

## Contenu de démonstration — obligation légale

Pas de faux compteurs ni de faux résultats sur des clips présentés comme réels
(art. L121-2 du Code de la consommation). Voir `CLAUDE.md`.
