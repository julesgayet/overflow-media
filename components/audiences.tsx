"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { site } from "@/site.config";
import { Reveal, SectionHeading } from "./ui";
import { Arrow } from "./icons";

/** Largeur de l'aperçu, en px. La hauteur en découle : format 9:16. */
const PREVIEW_W = 168;

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

/*  Cadre 9:16 montré au survol d'une ligne.
 *
 *  Tant que `site.niches[].media` vaut `null`, on rend un cadre vide au bon
 *  format plutôt qu'une image d'illustration : sur une section « pour qui »,
 *  une photo générique passerait pour un vrai extrait de campagne.
 */
function Preview({ media }: { media: string | null }) {
  const reduce = useReducedMotion();

  if (!media) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-line-2 bg-surface">
        <span className="nums text-[10px] font-medium text-mist-2">9:16</span>
        <span className="px-3 text-center text-[10px] leading-tight text-mist-2">
          Aperçu à venir
        </span>
      </div>
    );
  }

  if (isVideo(media)) {
    return (
      <video
        src={media}
        muted
        loop
        playsInline
        /*  Pas de lecture automatique si l'utilisateur a demandé moins de
            mouvement : la vidéo reste sur sa première image.               */
        autoPlay={!reduce}
        preload="metadata"
        className="h-full w-full rounded-xl object-cover"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- fichier local, dimensions fixes
    <img src={media} alt="" aria-hidden className="h-full w-full rounded-xl object-cover" />
  );
}

export function Audiences() {
  const [active, setActive] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  /*  La position suit le curseur via des variables CSS écrites directement
   *  sur le nœud : passer par un `useState` re-rendrait la liste entière à
   *  chaque `mousemove`. Même parti que `tilt-card.tsx`.
   */
  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const list = listRef.current;
    const el = previewRef.current;
    if (!list || !el) return;
    const rect = list.getBoundingClientRect();
    //  Bridé aux bords de la liste : sans ça, l'aperçu déborde de la section
    //  dès que le curseur approche du bord droit ou gauche.
    const half = PREVIEW_W / 2;
    const x = Math.min(Math.max(event.clientX - rect.left, half), rect.width - half);
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  return (
    <section id="pour-qui" className="relative border-y border-line bg-surface-2 py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            center={false}
            eyebrow="Pour qui"
            title={
              <>
                Le clipping marche quand il y a{" "}
                <span className="text-gradient">du contenu à recycler</span>
              </>
            }
          />
        </Reveal>

        <div
          ref={listRef}
          onMouseMove={handleMove}
          onMouseLeave={() => setActive(null)}
          className="relative mt-14 border-t border-line"
        >
          {site.niches.map((n, i) => (
            <Reveal key={n.title} delay={i * 70}>
              <a
                href="/reserver"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group flex items-center gap-5 border-b border-line py-6 transition-colors hover:bg-surface md:gap-8 md:py-7"
              >
                <span className="nums w-7 shrink-0 text-xs text-mist-2 transition-colors group-hover:text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/*  Les guillemets sont posés en absolu : ils n'occupent donc
                    aucune place au repos et le titre ne se décale pas quand
                    ils apparaissent.                                        */}
                <span className="relative min-w-0 flex-1 text-2xl font-semibold tracking-[-0.02em] text-ink transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl md:text-4xl">
                  <span
                    aria-hidden
                    className="absolute right-full mr-1.5 text-brand opacity-0 transition-opacity duration-300 group-focus-visible:opacity-100 group-hover:opacity-100"
                  >
                    «
                  </span>
                  {n.title}
                  <span
                    aria-hidden
                    className="absolute left-full ml-1.5 text-brand opacity-0 transition-opacity duration-300 group-focus-visible:opacity-100 group-hover:opacity-100"
                  >
                    »
                  </span>
                </span>

                <span className="hidden shrink-0 text-sm text-mist-2 sm:block">{n.hint}</span>
                <Arrow className="size-5 shrink-0 text-mist-2 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand" />
              </a>
            </Reveal>
          ))}

          {/*  Aperçu unique, déplacé et re-rempli selon la ligne survolée —
              plutôt qu'un cadre par ligne, qui multiplierait les nœuds et
              ferait charger cinq médias d'un coup.

              Réservé au pointeur fin : sur tactile il n'y a pas de survol,
              l'aperçu resterait collé au dernier appui.                     */}
          <div
            ref={previewRef}
            aria-hidden
            style={{ left: "var(--x, 50%)", top: "var(--y, 50%)", width: PREVIEW_W }}
            className={`pointer-fine-only pointer-events-none absolute z-20 aspect-[9/16] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-line-2 bg-surface-2 shadow-[0_18px_40px_-16px_rgba(23,23,26,0.35)] transition-[opacity,scale] duration-200 ${
              active === null ? "scale-95 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            {active !== null && (
              <Preview media={site.niches[active].media} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
