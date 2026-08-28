/* ── Logo ──────────────────────────────────────────────────────────────────
 *  Le O d'Omniflux, ouvert à droite : son trait s'échappe vers le haut.
 *  Un seul geste continu — le flux.
 *
 *  Trois règles de construction à ne pas casser :
 *
 *   · C'est UN SEUL tracé (`PATH`), peint deux fois : une passe encre pour
 *     tout, puis une passe cobalt révélée par `stroke-dasharray` sur la seule
 *     longueur de la queue. C'est ce qui supprime la jonction : deux `<path>`
 *     séparés à bouts ronds empilaient deux demi-disques au même point et
 *     produisaient un bourrelet — le défaut qui faisait « bas de gamme ».
 *     Si le tracé change, recalculer LOOP_LEN / TAIL_LEN avec getTotalLength().
 *
 *   · La queue prolonge la tangente de l'arc : le premier point de contrôle
 *     (26,90 · 15,97) est posé sur elle. C'est ce qui fait lire un trait unique
 *     plutôt qu'un anneau surmonté d'un bâton.
 *
 *   · L'ouverture fait 85°. En dessous de ~70° la boucle se referme
 *     optiquement, le contrepoinçon se bouche sous 24 px et le symbole devient
 *     un spinner de chargement.
 *
 *  Grille 48, centre de boucle (21 · 27,5), rayon 12,5, graisse 5,8.
 *  La viewBox est collée à la boîte englobante du tracé (bouts ronds compris) :
 *  la marque remplit sa case, donc `size-10` rend 40 px de dessin et non 32.
 *  Ne pas y remettre de marge — l'air se règle par le `gap` du lockup.
 *
 *  Le favicon (app/icon.svg) et l'image de partage (app/opengraph-image.tsx)
 *  reprennent le même tracé à la main : les modifier en même temps.
 * ------------------------------------------------------------------------ */

const LOOP = "M33.41 29.02 A12.5 12.5 0 1 1 23.6 15.27";
const TAIL = "C26.90 15.97 33 12 39.5 5.2";
const PATH = `${LOOP} ${TAIL}`;

const VIEW_BOX = "3.7 2.3 40.6 40.6";
const WEIGHT = 5.8;

/*  Longueurs mesurées sur PATH : la passe cobalt n'affiche qu'un tiret de la
 *  longueur de la queue, décalé pour démarrer là où finit la boucle.        */
const LOOP_LEN = 60;
const TAIL_LEN = 19.34;

/*  Version nue — usage par défaut. À la taille d'une nav, la pastille
 *  n'apporte rien : le symbole se pose directement sur le fond.            */
export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox={VIEW_BOX} className={`shrink-0 ${className}`} fill="none" aria-hidden>
      <path d={PATH} className="stroke-ink" strokeWidth={WEIGHT} strokeLinecap="round" />
      <path
        d={PATH}
        className="stroke-brand"
        strokeWidth={WEIGHT}
        strokeLinecap="round"
        strokeDasharray={`${TAIL_LEN} ${TAIL_LEN + LOOP_LEN}`}
        strokeDashoffset={-LOOP_LEN}
      />
    </svg>
  );
}

/*  Version pastille — réservée aux contextes où un fond est imposé (favicon,
 *  avatars sociaux). Monochrome : à 16 px, deux couleurs se brouillent. Un
 *  seul ton, donc une seule passe : pas de dasharray ici.                  */
export function LogoTile({ className = "size-8" }: { className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-lg bg-brand ${className}`}>
      <svg viewBox={VIEW_BOX} className="size-[72%]" fill="none" aria-hidden>
        <path d={PATH} stroke="#fff" strokeWidth={WEIGHT} strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark className="size-10" />
      <span className="text-[22px] font-semibold tracking-tight">
        Omni<span className="font-normal text-brand">flux</span>
      </span>
    </span>
  );
}
