"use client";

import { useEffect, useRef, useState } from "react";

/*  Lecteur commun à toutes les vignettes vidéo du site.
 *
 *  Trois sections affichent le même pool de 24 clips : la page montait donc
 *  jusqu'à 72 `<video autoplay>` d'un coup. Safari sur Mac décode le VP9 en
 *  matériel et encaissait ; Firefox retombe sur un décodage logiciel et la
 *  page se figeait, vignettes noires. D'où les trois garde-fous ci-dessous.
 *
 *  1. H.264 d'abord. Chaque .webm a un jumeau .mp4 et une image .jpg (voir
 *     `public/media/README.md`). Le MP4 est décodé en matériel partout, le
 *     WebM reste en second pour les navigateurs qui le préfèrent.
 *  2. Rien ne se charge hors écran. `preload="none"` + poster : la vignette
 *     est peinte sans ouvrir de décodeur, les `<source>` ne sont posés qu'à
 *     l'approche du viewport, et la lecture s'arrête dès la sortie.
 *  3. Un plafond de décodeurs simultanés. Une grille peut afficher 24 cases
 *     à l'écran en même temps : au-delà de `MAX_PLAYING`, les suivantes
 *     restent sur leur poster et prennent la main quand une place se libère.
 */

const MAX_PLAYING = 10;

/*  File d'attente des vignettes visibles. `playing` tient les lecteurs qui
 *  occupent une place, `waiting` ceux qui en réclament une dans l'ordre où
 *  ils sont entrés à l'écran.                                              */
const playing = new Set<() => void>();
const waiting: Array<() => void> = [];

function acquire(start: () => void) {
  if (playing.size < MAX_PLAYING) {
    playing.add(start);
    start();
  } else if (!waiting.includes(start)) {
    waiting.push(start);
  }
}

function release(start: () => void) {
  playing.delete(start);
  const i = waiting.indexOf(start);
  if (i >= 0) waiting.splice(i, 1);
  const next = waiting.shift();
  if (next && playing.size < MAX_PLAYING) {
    playing.add(next);
    next();
  }
}

const EXT = /\.(mp4|webm|mov)$/i;

/*  Sources à proposer, MP4 en tête. Déduit des extensions, sans toucher au
 *  disque : le composant tourne côté client.                               */
function variants(src: string) {
  const base = src.replace(EXT, "");
  const isWebm = /\.webm$/i.test(src);
  return {
    poster: `${base}.jpg`,
    sources: isWebm
      ? [
          { src: `${base}.mp4`, type: "video/mp4" },
          { src, type: "video/webm" },
        ]
      : [{ src, type: "video/mp4" }],
  };
}

export function Clip({
  src,
  className = "",
  /*  `false` fige la vignette sur son poster — cas du mouvement réduit, où
      supprimer l'image supprimerait la preuve et pas seulement l'animation. */
  play = true,
  poster: posterProp,
}: {
  src: string;
  className?: string;
  play?: boolean;
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);
  const { poster, sources } = variants(src);

  /*  Pose les `<source>` à l'approche du viewport, puis lance/arrête la
   *  lecture selon la visibilité réelle. Deux seuils distincts : on précharge
   *  large (300 px) pour que l'image soit prête, on ne joue qu'à l'écran.   */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /*  Vrai tant que la vignette est à l'écran : un onglet en arrière-plan
        refuse la lecture, et rien ne la relancerait au retour sans ça —
        la section resterait figée sur ses posters.                        */
    let wanted = false;

    const start = () => {
      el.play().catch(() => {
        /*  Lecture refusée (politique d'autoplay, onglet en arrière-plan) :
            le poster reste, et la place est rendue à la file.              */
        release(start);
      });
    };

    const onVisible = () => {
      if (!document.hidden && wanted && el.paused) acquire(start);
    };
    document.addEventListener("visibilitychange", onVisible);

    const near = new IntersectionObserver(
      ([e]) => e.isIntersecting && setArmed(true),
      { rootMargin: "300px" },
    );
    const onScreen = new IntersectionObserver(
      ([e]) => {
        wanted = e.isIntersecting && play;
        if (wanted) acquire(start);
        else {
          el.pause();
          release(start);
        }
      },
      { threshold: 0.01 },
    );

    near.observe(el);
    onScreen.observe(el);
    return () => {
      near.disconnect();
      onScreen.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
      release(start);
    };
  }, [play]);

  /*  Les `<source>` ajoutés après coup ne sont pas relus tout seuls : sans ce
      `load()`, la vidéo resterait indéfiniment sur son poster.             */
  useEffect(() => {
    if (armed) ref.current?.load();
  }, [armed]);

  return (
    <video
      ref={ref}
      poster={posterProp ?? poster}
      muted
      loop
      playsInline
      preload="none"
      disableRemotePlayback
      aria-hidden
      className={className}
    >
      {armed && sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
    </video>
  );
}
