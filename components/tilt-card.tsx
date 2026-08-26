"use client";

import { useRef } from "react";

/** Inclinaison maximale, en degrés. Au-delà, le texte devient pénible à lire. */
const MAX_TILT = 6;

/**
 * Régler `maxTilt` à 0 laisse la carte à plat : il ne reste que le léger
 * soulèvement au survol. C'est le réglage à utiliser dès qu'une carte contient
 * des commandes — sur un panneau large, quelques degrés déplacent les bords de
 * plusieurs dizaines de pixels, et la piste d'un curseur se déroberait sous le
 * doigt en cours de glissement.
 */

/**
 * Carte qui s'incline vers le curseur, avec un halo qui suit la souris.
 *
 * Coquille générique : l'habillage (fond, bordure, ombre) est passé en
 * `className` par l'appelant, seule la mécanique de survol vit ici.
 *
 * Le handler écrit **directement des variables CSS** sur le nœud plutôt que de
 * passer par `useState` : un re-rendu React à chaque `mousemove` serait ruineux
 * pour un effet purement décoratif. Les valeurs de repos et la garde
 * `prefers-reduced-motion` sont dans `app/globals.css` (bloc `.tilt-card`), si
 * bien que la carte est correcte avant toute interaction et sans JS.
 *
 * Repris du projet Graft ; seule la couleur du halo a été calée sur le cobalt.
 */
export function TiltCard({
  className,
  contentClassName,
  glow = true,
  maxTilt = MAX_TILT,
  children,
}: {
  className?: string;
  /** Mise en page du contenu. La couche qui la porte est aussi celle qui passe
   *  au-dessus du halo, d'où ce réglage séparé de `className`. */
  contentClassName?: string;
  /**
   * Halo qui suit le curseur. À couper sur un contenu opaque et plein cadre
   * (une capture d'écran) : le halo y serait de toute façon masqué, et le
   * `overflow-hidden` qu'il impose rognerait l'ombre portée du contenu.
   */
  glow?: boolean;
  /** Inclinaison maximale en degrés. 0 = à plat (voir la note sur MAX_TILT). */
  maxTilt?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    //  Une carte non mise en page (colonne masquée à ce point de rupture) a une
    //  taille nulle : sans cette garde, la division produit `NaNdeg` et invalide
    //  toute la déclaration `transform`.
    if (rect.width === 0 || rect.height === 0) return;
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    // Le curseur en haut doit incliner la carte vers l'arrière : l'axe X est donc inversé.
    el.style.setProperty("--tilt-x", `${(0.5 - y) * maxTilt}deg`);
    el.style.setProperty("--tilt-y", `${(x - 0.5) * maxTilt}deg`);
    if (!glow) return;
    el.style.setProperty("--glow-x", `${x * 100}%`);
    el.style.setProperty("--glow-y", `${y * 100}%`);
    el.style.setProperty("--glow-opacity", "1");
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    el.style.setProperty("--glow-opacity", "0");
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt-card relative ${glow ? "overflow-hidden" : "tilt-card--no-glow"} ${
        className ?? ""
      }`}
    >
      <div className={`relative z-10 ${contentClassName ?? ""}`}>{children}</div>
    </div>
  );
}
