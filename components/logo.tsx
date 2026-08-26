/* ── Logo ──────────────────────────────────────────────────────────────────
 *  Le O du nom, ouvert en haut à droite : son trait se détache de la boucle
 *  et s'échappe vers l'extérieur. Un seul geste continu — le débordement.
 *
 *  Deux règles de construction à ne pas casser :
 *   · la queue prolonge la tangente de l'arc (contrôle 1 posé sur elle), c'est
 *     ce qui fait lire un trait unique plutôt qu'un anneau + un bâton ;
 *   · l'ouverture fait 66°. En dessous, la boucle se referme optiquement et
 *     le symbole devient un spinner de chargement.
 *
 *  Grille 48, centre de boucle (21 · 27,5), rayon 12,5, graisse 6,5.
 *  Le favicon (app/icon.svg) reprend le même tracé à la main : le modifier
 *  en même temps.
 * ------------------------------------------------------------------------ */

const LOOP = "M33.23 24.9 A12.5 12.5 0 1 1 23.6 15.27";
const TAIL = "M23.6 15.27 C28.98 16.41 35 13 41 6";

/*  Version nue — usage par défaut. À la taille d'une nav, la pastille
 *  n'apporte rien : le symbole se pose directement sur le fond.            */
export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={`shrink-0 ${className}`} fill="none" aria-hidden>
      <path d={LOOP} className="stroke-ink" strokeWidth="6.5" strokeLinecap="round" />
      <path d={TAIL} className="stroke-brand" strokeWidth="6.5" strokeLinecap="round" />
    </svg>
  );
}

/*  Version pastille — réservée aux contextes où un fond est imposé (favicon,
 *  avatars sociaux). Monochrome : à 16 px, deux couleurs se brouillent.    */
export function LogoTile({ className = "size-8" }: { className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-lg bg-brand ${className}`}>
      <svg viewBox="0 0 48 48" className="size-[72%]" fill="none" aria-hidden>
        <path d={LOOP} stroke="#fff" strokeWidth="6.5" strokeLinecap="round" />
        <path d={TAIL} stroke="#fff" strokeWidth="6.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-tight">
        OverFlow <span className="font-normal text-mist">Media</span>
      </span>
    </span>
  );
}
