import { readdirSync } from "node:fs";
import path from "node:path";

const VIDEO = /\.(mp4|webm|mov)$/i;

/*  Pool commun, utilisé tant qu'une section n'a pas ses propres vidéos.
 *  Les trois sections affichaient au départ trois copies byte-à-byte du même
 *  jeu de 24 clips : 24 fichiers uniques stockés 72 fois. Un dépôt Git ne
 *  reprend jamais la place d'un binaire une fois commité, d'où le pool.       */
const SHARED = "clips";

/*  Un clip = un nom de fichier, pas une extension. Chaque vidéo existe en
 *  deux encodages jumeaux — `clip-01.webm` et `clip-01.mp4` — plus son image
 *  `clip-01.jpg` (cf. `public/media/README.md`). Sans ce regroupement, la
 *  section afficherait deux fois chaque clip. C'est `components/clip.tsx`
 *  qui choisit l'encodage servi au navigateur ; on ne renvoie ici qu'un
 *  chemin par clip, le WebM de préférence.
 */
const PREFERRED = [".webm", ".mp4", ".mov"];

function read(section: string): string[] {
  try {
    const dir = path.join(process.cwd(), "public", "media", section);
    const byName = new Map<string, string>();
    for (const f of readdirSync(dir).filter((f) => VIDEO.test(f)).sort()) {
      const base = f.replace(VIDEO, "");
      const kept = byName.get(base);
      const rank = (n: string) => PREFERRED.indexOf(path.extname(n).toLowerCase());
      if (!kept || rank(f) < rank(kept)) byName.set(base, f);
    }
    return [...byName.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, f]) => `/media/${section}/${f}`);
  } catch {
    return [];
  }
}

/*  Liste les vidéos à afficher dans une section.
 *
 *  Cherche d'abord `public/media/<section>/`, et retombe sur
 *  `public/media/clips/` si la section n'a rien à elle. Déposer un fichier
 *  dans le dossier d'une section suffit donc à la détacher du pool commun —
 *  et c'est tout ou rien : dès qu'une section contient une vidéo, elle
 *  n'affiche plus que les siennes.
 *
 *  `fallbackToShared: false` désactive ce repli — cas des sections dont le
 *  format ne correspond pas au pool `clips/` (`sources`, par exemple, qui
 *  attend des formats longs 16:9 et non des clips verticaux) : mieux vaut
 *  rester vide et déclencher le visuel abstrait du composant qu'afficher des
 *  clips verticaux dans un cadre pensé pour du format long.
 *
 *  Aucune convention de nom : tout fichier vidéo du dossier est pris, trié par
 *  nom. Lu au build (module serveur, jamais importé côté client) — déposer un
 *  fichier et relancer le build suffit, il n'y a rien à câbler dans
 *  `site.config.ts`.
 *
 *  Renvoie des chemins absolus prêts à poser dans un `src` :
 *  `["/media/clips/a.webm", …]`. Rien nulle part → `[]`.
 */
export function listSectionMedia(section: string, fallbackToShared = true): string[] {
  const own = read(section);
  if (own.length > 0 || !fallbackToShared) return own;
  return read(SHARED);
}
