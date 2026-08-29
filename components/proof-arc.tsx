"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { site } from "@/site.config";
import { Eyebrow } from "./ui";
import { Play } from "./icons";
import { Clip } from "./clip";

/* ── Mur de preuves ─────────────────────────────────────────────────────────
 *  Les vignettes arrivent dispersées, se rangent sur l'arc, puis l'arc défile
 *  au fil du scroll.
 *
 *  Trois écarts assumés par rapport au composant d'origine :
 *
 *  1. Le scroll n'est pas détourné. La version d'origine appelait
 *     `preventDefault()` sur la molette et tenait un scroll virtuel, ce qui
 *     piège le visiteur sur une landing. Ici la chorégraphie est pilotée par
 *     le scroll réel de la page : section haute + conteneur `sticky`, comme
 *     `feed-math.tsx`.
 *  2. Les positions sont calculées en `MotionValue` plutôt qu'en state. Douze
 *     cartes re-rendues à chaque frame de scroll suffiraient à faire tomber le
 *     défilement sous les 60 fps.
 *  3. Aucune image distante : ce sont des vignettes de clip, pas des photos de
 *     banque d'images. Une preuve doit ressembler à une preuve.
 * ------------------------------------------------------------------------- */

const CARD_W = 68;
const CARD_H = 120; // 9:16

/** Fin du rangement des vignettes, en progression de scroll ; au-delà, l'arc défile. */
const ENTER_END = 0.42;

/*  Fin de l'apparition, distincte de la fin du rangement. Lier les deux vidait
 *  l'écran : les vignettes ne devenaient franches qu'une fois posées, si bien
 *  qu'on ne voyait presque rien arriver. Elles sont donc toutes là très tôt,
 *  et le reste du trajet se fait à pleine opacité — c'est le rangement qu'on
 *  regarde, pas une apparition.                                              */
const FADE_END = 0.1;

/*  Inclinaison de départ, en degrés. Les vignettes arrivaient d'abord avec une
 *  rotation aléatoire d'un demi-tour, et passaient par un cercle complet avant
 *  de s'ouvrir en arc : elles tournoyaient. Le cercle a sauté, et il ne reste
 *  ici qu'un léger désordre — des cartes jetées sur la table, qui se rangent. */
const SCATTER_TILT = 22;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

type Geometry = { w: number; h: number };

function ProofCard({
  i,
  count,
  progress,
  geo,
  parallax,
  proof,
  clip,
}: {
  i: number;
  count: number;
  progress: MotionValue<number>;
  geo: Geometry;
  parallax: MotionValue<number>;
  proof: (typeof site.proofs)[number];
  clip: string | null;
}) {
  const isMobile = geo.w < 768;
  const N = count;

  /*  Position de dispersion : figée au premier rendu pour que la carte reparte
      toujours du même point si l'utilisateur remonte.                        */
  const scatter = useRef({
    x: (Math.random() - 0.5) * (geo.w || 1200) * 1.1,
    y: (Math.random() - 0.5) * (geo.h || 800) * 1.1,
    r: (Math.random() - 0.5) * 2 * SCATTER_TILT,
  }).current;

  /* ── Arc « arc-en-ciel », convexe vers le haut ───────────────────────────
   *  Le repère a son origine au CENTRE de la scène (`place-items-center`) et
   *  non en haut à gauche : l'apex se pose donc en coordonnée négative.
   *
   *  Le rayon se déduit de la place disponible plutôt que d'être choisi au
   *  jugé. Pour un arc de demi-angle θ, la demi-largeur vaut R·sin θ et la
   *  flèche R·(1−cos θ) ; on prend le rayon qui satisfait les deux contraintes,
   *  sinon l'arc déborde de l'écran et les vignettes sortent du cadre.       */
  const spread = isMobile ? 100 : 130;
  const step = spread / Math.max(1, N - 1);
  const theta = ((spread / 2) * Math.PI) / 180;
  const arcRadius = Math.min(
    (geo.w * 0.42) / Math.sin(theta),
    (geo.h * 0.32) / (1 - Math.cos(theta)),
  );
  const apexY = -geo.h * 0.06;
  const arcCenterY = apexY + arcRadius;
  const startAngle = -90 - spread / 2;
  const arcScale = isMobile ? 1.15 : 1.5;

  /*  Tapis roulant : les vignettes bouclent sur une bande un peu plus large
   *  que l'arc visible. Sans ce bouclage, le défilement vidait l'arc — un mur
   *  de preuves qui se dépeuple ne prouve plus rien. La marge de part et
   *  d'autre sert à faire disparaître la vignette avant qu'elle ne saute d'un
   *  bout à l'autre de la bande.                                            */
  const belt = N * step;
  const margin = (belt - spread) / 2;
  const beltStart = startAngle - margin;

  const geometry = (p: number) => {
    const enter = clamp01(p / ENTER_END);
    const appear = clamp01(p / FADE_END);
    const shuffle = clamp01((p - ENTER_END) / (1 - ENTER_END));

    const offset = (((i * step - shuffle * belt) % belt) + belt) % belt;
    const angle = beltStart + offset;
    const rad = (angle * Math.PI) / 180;
    const ax = Math.cos(rad) * arcRadius;
    const ay = Math.sin(rad) * arcRadius + arcCenterY;

    const edgeFade = Math.min(offset / margin, (belt - offset) / margin, 1);

    /*  Un seul trajet : de la dispersion à la place définitive sur l'arc. La
        vignette vise sa place dès la première image, elle n'a donc pas de
        détour à faire — et sa rotation ne fait que se redresser vers
        l'inclinaison de l'arc, sans jamais repasser par un tour complet.    */
    return {
      x: lerp(scatter.x, ax, enter),
      y: lerp(scatter.y, ay, enter),
      rotate: angle + 90 + scatter.r * (1 - enter),
      scale: lerp(0.65, arcScale, enter),
      /*  Le fondu de bord n'a de sens qu'une fois sur l'arc : appliqué dès la
          dispersion, il rendrait invisible d'un bout à l'autre la vignette qui
          se range juste à l'entrée du tapis.                                */
      opacity: appear * lerp(1, clamp01(edgeFade), enter),
    };
  };

  const x = useTransform(progress, (p) => geometry(p).x);
  const xWithParallax = useTransform([x, parallax] as const, ([vx, vp]) => (vx as number) + (vp as number));
  const y = useTransform(progress, (p) => geometry(p).y);
  const rotate = useTransform(progress, (p) => geometry(p).rotate);
  const scale = useTransform(progress, (p) => geometry(p).scale);
  const opacity = useTransform(progress, (p) => geometry(p).opacity);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: CARD_W,
        height: CARD_H,
        x: xWithParallax,
        y,
        rotate,
        scale,
        opacity,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="group/card"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        whileHover={{ rotateY: 180 }}
      >
        {/* Recto — la vignette */}
        <div
          className="absolute inset-0 overflow-hidden rounded-lg bg-ink"
          style={{ backfaceVisibility: "hidden" }}
        >
          {clip ? (
            <Clip src={clip} scope="preuves" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,.10),transparent_65%)]" />
          )}
          <span className="absolute left-1.5 top-1.5 rounded bg-white/10 px-1.5 py-0.5 text-[7px] font-medium text-white/90">
            {proof.platform}
          </span>
          {!clip && (
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-6 place-items-center rounded-full bg-white/15">
                <Play className="size-2.5 translate-x-px text-white" />
              </span>
            </span>
          )}
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-1.5 pb-1.5 pt-5">
            <span className="nums block text-[9px] font-semibold text-white">{proof.views}</span>
            <span className="block text-[7px] text-white/50">vues</span>
          </span>
        </div>

        {/* Verso — la campagne */}
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-lg bg-brand p-2"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="text-[7px] font-semibold uppercase tracking-[0.12em] text-white/70">
            Campagne
          </span>
          <span className="text-[9px] font-semibold leading-tight text-white">{proof.client}</span>
          <span className="nums text-[7px] text-white/70">vues vérifiées</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProofArc({ clips = [] }: { clips?: string[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<Geometry>({ w: 0, h: 0 });
  const reduce = useReducedMotion();

  /*  Une carte par clip présent dans `public/media/preuves/` (découverts au
      build). Les libellés — plateforme, vues, campagne — sont repris en boucle
      sur `site.proofs`. Sans aucun clip, on retombe sur une carte par entrée de
      `site.proofs`, vignette abstraite. */
  const cards = (clips.length ? clips : site.proofs).map((_, i) => ({
    clip: clips[i] ?? null,
    proof: site.proofs[i % site.proofs.length],
  }));

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const set = () => setGeo({ w: el.offsetWidth, h: el.offsetHeight });
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 30, restDelta: 0.001 });

  // ── Parallaxe à la souris ──
  const parallaxRaw = useSpring(0, { stiffness: 30, damping: 20 });
  useEffect(() => {
    const el = stageRef.current;
    if (!el || reduce) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      parallaxRaw.set(((e.clientX - r.left) / r.width - 0.5) * 2 * 60);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [parallaxRaw, reduce]);

  const introOpacity = useTransform(progress, [0.1, 0.34], [1, 0]);
  const outroOpacity = useTransform(progress, [0.46, 0.62], [0, 1]);
  const outroY = useTransform(progress, [0.46, 0.62], [16, 0]);

  /*  Mouvement réduit : on rend l'arc final, immobile. Masquer les vignettes
      supprimerait la preuve elle-même, pas seulement l'animation.           */
  if (reduce) {
    return (
      <section id="preuves" className="border-b border-line bg-ground py-24">
        <div className="container-x">
          <Eyebrow className="mb-6">Preuves</Eyebrow>
          <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Chaque campagne laisse une trace.
          </h2>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {cards.map(({ clip, proof: p }, i) => (
              <li
                key={i}
                className="relative aspect-[9/16] overflow-hidden rounded-lg bg-ink p-2"
              >
                {clip && (
                  <Clip
                    src={clip}
                    play={false}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <span className="relative text-[10px] font-medium text-white/80">{p.platform}</span>
                <span className="absolute inset-x-2 bottom-2">
                  <span className="nums block text-xs font-semibold text-white">{p.views}</span>
                  <span className="block text-[9px] text-white/50">vues</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="preuves"
      className="relative border-b border-line bg-ground"
      style={{ height: "280vh" }}
    >
      <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden">
        {/* Texte d'ouverture */}
        <motion.div
          style={{ opacity: introOpacity }}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 px-6 text-center"
        >
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
            Chaque campagne laisse une trace.
          </h2>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-mist-2">
            Faites défiler
          </p>
        </motion.div>

        {/* Texte une fois l'arc formé */}
        <motion.div
          style={{ opacity: outroOpacity, y: outroY }}
          className="pointer-events-none absolute inset-x-0 top-[9%] z-10 px-6 text-center"
        >
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
            Des clips, pas des <span className="text-gradient">promesses</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-mist">
            Seules les vues validées entrent dans votre facturation.
          </p>
        </motion.div>

        {/* Scène */}
        <div className="absolute inset-0 grid place-items-center">
          {geo.w > 0 &&
            cards.map(({ clip, proof }, i) => (
              <ProofCard
                key={i}
                i={i}
                count={cards.length}
                proof={proof}
                clip={clip}
                progress={progress}
                geo={geo}
                parallax={parallaxRaw}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
