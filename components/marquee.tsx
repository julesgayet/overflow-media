import type { ComponentPropsWithoutRef, ReactNode } from "react";

/* ── Marquee ───────────────────────────────────────────────────────────────
 *  Bande qui défile en boucle. Le mécanisme : `repeat` copies identiques du
 *  contenu, posées côte à côte par le `flex` du conteneur, animées ensemble
 *  par la même translation. Comme toutes les copies bougent du même nombre
 *  de pixels au même instant, la dernière copie sortante est toujours
 *  remplacée par une copie identique — la boucle ne montre jamais de trou,
 *  quelle que soit la largeur du contenu. Le nombre de copies (4 par défaut)
 *  n'est là que pour garantir assez de matière et couvrir un écran large ;
 *  ce n'est pas un signal de volume à interpréter par le visiteur.
 *
 *  Adapté d'un composant communautaire (magicui/reui) : `cn`/clsx-tailwind-
 *  merge remplacés par un simple filtre de classes pour ne pas ajouter de
 *  dépendance, et le rôle ARIA par défaut retiré (« marquee » n'est pas un
 *  rôle ARIA valide).
 * ------------------------------------------------------------------------ */

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  /** Inverse le sens du défilement. */
  reverse?: boolean;
  /** Suspend l'animation tant que le curseur survole la bande. */
  pauseOnHover?: boolean;
  children: ReactNode;
  /** Défile verticalement plutôt qu'horizontalement. */
  vertical?: boolean;
  /** Nombre de copies du contenu, pour couvrir la largeur de l'écran sans trou. */
  repeat?: number;
  /**
   * Durée d'un tour de boucle, et espace entre les éléments. En props plutôt
   * qu'en classe Tailwind arbitraire à surcharger : deux classes
   * `[--duration:Xs]` sur le même nœud se départagent par l'ordre de
   * génération de la feuille de style, pas par l'ordre dans `className` —
   * le composant d'origine s'en sortait via `tailwind-merge`, absent d'ici.
   * Le style inline n'a pas ce problème : la dernière valeur posée gagne.
   */
  duration?: string;
  gap?: string;
  ariaLabel?: string;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration = "40s",
  gap = "1rem",
  ariaLabel,
  style,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      data-slot="marquee"
      aria-label={ariaLabel}
      style={{ ["--gap" as string]: gap, ...style }}
      className={cx(
        "group flex overflow-hidden [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          style={{ animationDuration: duration }}
          className={cx(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
