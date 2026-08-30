"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "./ui";

/*  Section pédagogique, posée juste avant le simulateur : elle installe le
 *  seul chiffre qui rend le reste de la page lisible — l'écart entre ce qu'une
 *  personne regarde vraiment et la part que la publicité payante occupe. Sans
 *  cette marche, le simulateur demande d'estimer un budget pour un marché dont
 *  le visiteur n'a aucune idée de la taille.
 *
 *  Même mécanique de scroll épinglé que `FeedMath` (rail de progression +
 *  temps forts qui se relaient) : les deux sections racontent une progression
 *  de chiffres, elles doivent se parcourir de la même façon. Ici le chiffre
 *  occupe toute la largeur — il n'y a pas de visuel à montrer à côté, c'est
 *  l'écart entre les trois nombres qui fait la démonstration.
 *
 *  Trois temps, du gris au cobalt : le volume réel, la part payante, l'écart.
 *  Le troisième chiffre est le seul en couleur de marque — c'est celui que le
 *  simulateur, juste en dessous, propose d'aller chercher.                   */
const beats = [
  {
    value: "9 000",
    text: "Vidéos courtes qu'une personne fait défiler chaque mois, soit environ 300 par jour.",
    tone: "ink" as const,
  },
  {
    value: "500",
    text: "Sur ces 9 000, la part qui est réellement une publicité payée. Tout le reste est organique.",
    tone: "dim" as const,
  },
  {
    value: "8 500",
    text: "L'attention que votre marque ne touche pas, chaque mois, tant qu'elle n'achète que de la publicité.",
    tone: "brand" as const,
  },
];

const toneClass = {
  ink: "text-ink",
  dim: "text-ink/25",
  brand: "text-brand",
} as const;

export function OrganicMath() {
  const sectionRef = useRef<HTMLElement>(null);
  const markers = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    markers.current.forEach((m) => m && io.observe(m));

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setProgress(Math.min(1, Math.max(0, -r.top / Math.max(1, total))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} id="feed-organique" className="relative border-y border-line bg-surface-2">
      {/* Piste de scroll : trois zones qui pilotent le temps fort affiché */}
      <div className="pointer-events-none absolute inset-0 flex flex-col" aria-hidden>
        {beats.map((_, i) => (
          <div
            key={i}
            data-index={i}
            ref={(el) => {
              markers.current[i] = el;
            }}
            className="flex-1"
          />
        ))}
      </div>

      <div>
        <div className="sticky top-0 flex h-screen items-center">
          <div className="container-x">
            <div className="flex gap-7 md:gap-10">
              {/* Rail de progression */}
              <div className="relative w-px shrink-0 bg-line" aria-hidden>
                <div
                  className="absolute inset-x-0 top-0 bg-gradient-to-b from-brand to-accent transition-[height] duration-200"
                  style={{ height: `${progress * 100}%` }}
                />
              </div>

              <div className="min-w-0 flex-1 py-10">
                <Eyebrow className="mb-10 md:mb-14">Le calcul du feed organique</Eyebrow>

                <div className="relative h-[19rem] sm:h-[22rem] lg:h-[24rem]">
                  {beats.map((b, i) => (
                    <div
                      key={b.value}
                      className={`absolute inset-0 transition-all duration-500 ease-out ${
                        active === i
                          ? "translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-4 opacity-0"
                      }`}
                      aria-hidden={active !== i}
                    >
                      <div
                        className={`nums text-[5rem] font-semibold leading-[0.85] tracking-[-0.05em] transition-colors duration-500 sm:text-[8rem] lg:text-[10rem] ${toneClass[b.tone]}`}
                      >
                        {b.value}
                      </div>
                      <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-mist md:text-xl">
                        {b.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex gap-2" aria-hidden>
                  {beats.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        active === i ? "w-10 bg-brand-2" : "w-5 bg-line-2"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Distance de scroll pendant laquelle le panneau reste épinglé */}
        <div className="h-[110vh] md:h-[160vh]" aria-hidden />
      </div>
    </section>
  );
}
