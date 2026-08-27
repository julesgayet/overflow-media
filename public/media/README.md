# Médias de la landing page

Dépose ici les vraies vidéos / images. Un sous-dossier par section de la page.
Référence toujours par chemin **absolu depuis la racine** : le fichier
`public/media/pour-qui/createurs.mp4` s'écrit `/media/pour-qui/createurs.mp4`.

## Format attendu

- Vidéo : `.webm` (VP9) ou `.mp4` (H.264), **muette**, 9:16, quelques secondes en boucle,
  < 2–3 Mo par clip. Idéalement fournir aussi un poster `.jpg` du même nom.
- Image : `.jpg`, `.png` ou `.webp`.

## Où va quoi

### `pour-qui/`  → section « Pour qui » (`components/audiences.tsx`)
Aperçu 9:16 affiché au survol de chaque ligne. **Déjà câblé.**
Remplacer les `media: null` dans `site.config.ts › niches[]` :
`media: "/media/pour-qui/createurs.mp4"`. Une entrée par niche.

### `preuves/`  → mur de preuves animé (`components/proof-arc.tsx`)
Vignette de clip pour chaque entrée de `site.config.ts › proofs[]`.
⚠️ Nécessite d'ajouter un champ `thumb` aux `proofs[]` et de brancher
`ProofCard` dessus (pas encore fait).

### `diffusion/`  → « Diffusion en cours » (`components/how.tsx`)
Grille de vignettes de l'étape 2 de la méthode. Décoratif aujourd'hui —
à brancher si on veut y montrer de vrais clips.

### `lecteur/`  → maquette de lecteur (`components/feed-math.tsx`)
Surface filmée de la démonstration « feed math ». Décoratif aujourd'hui.

## Contenu de démonstration — obligation légale

Pas de faux compteurs ni de faux résultats sur des clips présentés comme réels
(art. L121-2 du Code de la consommation). Voir `CLAUDE.md`.
