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
 *  3. Un plafond de décodeurs simultanés, **par section** (`scope`). Une
 *     grille peut afficher jusqu'à 24 cases à l'écran en même temps : au-delà
 *     de `MAX_PLAYING`, les suivantes de la même section restent sur leur
 *     poster et prennent la main quand une place s'y libère.
 *
 *     Le plafond est scindé par `scope` plutôt que partagé sur toute la page :
 *     une seule file globale faisait qu'une section en scroll pinné (donc
 *     considérée « à l'écran » tout du long par son `IntersectionObserver`)
 *     gardait ses places indéfiniment et affamait toutes les sections
 *     suivantes, qui restaient figées sur leur image fixe.
 */

/*  24 pour la plus grande grille documentée (`SpreadVisual`/`ProofArc`), + une
 *  marge : la scope "mecanique" a en réalité 25 vignettes actives ensemble
 *  (24 de la grille + 1 du panneau source, monté en permanence à côté),
 *  jamais toutes les 24 vignettes "au plafond pile" d'une grille seule. */
const MAX_PLAYING = 30;

/*  Une file par section : `playing` tient les lecteurs qui occupent une
 *  place dans cette section, `waiting` ceux qui en réclament une dans
 *  l'ordre où ils sont entrés à l'écran.                                   */
const queues = new Map<string, { playing: Set<() => void>; waiting: Array<() => void> }>();

function queueFor(scope: string) {
  let q = queues.get(scope);
  if (!q) {
    q = { playing: new Set(), waiting: [] };
    queues.set(scope, q);
  }
  return q;
}

function acquire(scope: string, start: () => void) {
  const q = queueFor(scope);
  if (q.playing.size < MAX_PLAYING) {
    q.playing.add(start);
    start();
  } else if (!q.waiting.includes(start)) {
    q.waiting.push(start);
  }
}

function release(scope: string, start: () => void) {
  const q = queueFor(scope);
  q.playing.delete(start);
  const i = q.waiting.indexOf(start);
  if (i >= 0) q.waiting.splice(i, 1);
  const next = q.waiting.shift();
  if (next && q.playing.size < MAX_PLAYING) {
    q.playing.add(next);
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
  /*  Section à laquelle rattacher cette vignette dans la file de lecture
      (voir le commentaire en tête de fichier) : les vignettes d'une même
      section se disputent le même plafond, indépendamment des autres.      */
  scope = "default",
}: {
  src: string;
  className?: string;
  play?: boolean;
  poster?: string;
  scope?: string;
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
        release(scope, start);
      });
    };

    const onVisible = () => {
      if (!document.hidden && wanted && el.paused) acquire(scope, start);
    };
    document.addEventListener("visibilitychange", onVisible);

    const near = new IntersectionObserver(
      ([e]) => e.isIntersecting && setArmed(true),
      { rootMargin: "300px" },
    );
    const onScreen = new IntersectionObserver(
      ([e]) => {
        wanted = e.isIntersecting && play;
        if (wanted) acquire(scope, start);
        else {
          el.pause();
          release(scope, start);
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
      release(scope, start);
    };
    /*  `armed` est dans les dépendances à dessein : quand `mécanique` ou
        `preuves` révèlent leurs vignettes en scroll pinné, elles sont déjà
        « à l'écran » dès le montage — `near` (300 px de marge) et `onScreen`
        se déclenchent alors quasi simultanément. Sans `armed` ici, `onScreen`
        pouvait appeler `play()` sur une vidéo sans encore de `<source>`, puis
        l'effet `load()` ci-dessous réinitialisait l'élément et interrompait
        ce `play()` — sans qu'aucun nouvel événement de visibilité ne vienne
        jamais le relancer, la vignette restait figée sur son poster. Inclure
        `armed` force à recréer `onScreen` une fois les sources posées, donc à
        retenter `play()` après le `load()`, jamais avant.                   */
  }, [play, scope, armed]);

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
