Déposer ici **une seule** vidéo "format long" (podcast, live, YouTube,
interview…) : celle affichée en boucle dans le premier temps fort de
`components/feed-math.tsx` (`SourceVisual`).

Lue automatiquement par `lib/media.ts`, sans câblage dans `site.config.ts` —
`.mp4`/`.webm`/`.mov`, n'importe quel nom. Tant que ce dossier est vide,
`SourceVisual` retombe sur le nuage de pastilles de formats. S'il contient
plusieurs fichiers, seul le premier par ordre alphabétique est utilisé.
