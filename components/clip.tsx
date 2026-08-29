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

  /*  Un `<video>` ne relit jamais ses `<source>` tout seul quand ils changent :
      sans ce `load()`, la vignette reste sur son poster au premier armement —
      et surtout, si `src` change sur un élément déjà monté (cas de l'aperçu
      unique de `pour-qui`, déplacé d'une ligne à l'autre), elle continue de
      jouer la source chargée en premier, quelle que soit la nouvelle.

      Cet effet est déclaré **avant** celui de lecture pour que `load()` parte
      systématiquement en premier : les effets s'exécutent dans l'ordre de
      déclaration, et jouer une source qu'on s'apprête à réinitialiser
      interromprait la lecture sans jamais la relancer.                      */
  useEffect(() => {
    if (armed) ref.current?.load();
  }, [armed, src]);

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
    /*  `armed` et `src` sont dans les dépendances à dessein : chacun déclenche
        un `load()` dans l'effet ci-dessus, qui réinitialise l'élément et
        interromprait une lecture en cours. Les recréer ici force à retenter
        `play()` après ce `load()`, jamais avant — c'est ce qui empêche les
        vignettes de `mécanique` et `preuves` (déjà « à l'écran » dès le
        montage en scroll pinné, où `near` et `onScreen` se déclenchent quasi
        simultanément) de rester figées sur leur poster, et ce qui relance
        l'aperçu de `pour-qui` sur sa nouvelle source à chaque changement de
        ligne survolée.                                                      */
  }, [play, scope, armed, src]);

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
