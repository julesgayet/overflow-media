"use client";

import { useEffect, useRef } from "react";

/*  Globe filaire dessiné derrière le héros — variante d'essai en place du
 *  réseau de particules (`particle-field.tsx`).
 *
 *  Repris d'un composant prévu pour fond noir : ici le canvas ne peint aucun
 *  fond (le `ground` de la page passe au travers) et la seule couleur est le
 *  cobalt de la charte, dilué. Le bleu ciel de l'original (100·180·255)
 *  disparaît purement et simplement sur fond clair.
 *
 *  Décor, donc `aria-hidden` + `pointer-events-none` : le glisser-déposer de
 *  la version d'origine est retiré, la sphère tourne seule. Le conteneur du
 *  héros est déjà en `pointer-events-none -z-10` — capter le pointeur ici
 *  volerait le clic aux deux boutons du héros.
 */

const DOT_COUNT = 2800;
const AUTO_ROTATE = 0.0022;
const FOV = 600;

/*  Les points sont regroupés par tranche de profondeur et peints en un seul
 *  `fill` par tranche : à 2 800 points (~1 400 visibles), un `beginPath` +
 *  `fill` par point coûte plus cher que tout le reste du rendu réuni.
 *  12 tranches suffisent à ce que le dégradé de profondeur reste continu.  */
const DEPTH_BANDS = 12;

/*  Plafond absolu du rayon. Sans lui, un rayon purement proportionnel donne
 *  389 px sur un écran 1280 (778 px de diamètre, 61 % de la largeur du
 *  héros) : le globe cesse d'être un décor et devient le sujet de la page.
 *  À 220 il occupe ~35 % de la largeur en desktop et reste derrière le
 *  titre.                                                                  */
const MAX_RADIUS = 220;

/*  Cobalt de la charte (--brand, #1f4fd8) en composantes, pour composer les
 *  alphas variables que le canvas exige — les tokens CSS ne s'appliquent pas
 *  à un contexte 2D.                                                        */
const BRAND = "31, 79, 216";

/*  Relais de diffusion : villes réelles couvrant les six continents et tous
 *  les fuseaux. La couverture doit être globale — avec une liste centrée sur
 *  l'Europe et l'Amérique du Nord, la rotation fait passer une hémisphère
 *  entièrement vide toutes les quinze secondes.                            */
const MARKERS: [number, number][] = [
  // Europe
  [48.86, 2.35], // 0  Paris
  [51.51, -0.13], // 1  Londres
  [40.42, -3.7], // 2  Madrid
  [52.52, 13.4], // 3  Berlin
  [41.9, 12.5], // 4  Rome
  [59.33, 18.07], // 5  Stockholm
  [55.76, 37.62], // 6  Moscou
  [41.01, 28.98], // 7  Istanbul
  // Afrique
  [33.57, -7.59], // 8  Casablanca
  [30.04, 31.24], // 9  Le Caire
  [6.52, 3.38], // 10 Lagos
  [-1.29, 36.82], // 11 Nairobi
  [-33.92, 18.42], // 12 Le Cap
  // Amérique du Nord
  [49.28, -123.12], // 13 Vancouver
  [37.78, -122.42], // 14 San Francisco
  [34.05, -118.24], // 15 Los Angeles
  [41.88, -87.63], // 16 Chicago
  [43.65, -79.38], // 17 Toronto
  [40.71, -74.01], // 18 New York
  [19.43, -99.13], // 19 Mexico
  // Amérique du Sud
  [4.71, -74.07], // 20 Bogotá
  [-12.05, -77.04], // 21 Lima
  [-23.55, -46.63], // 22 São Paulo
  [-34.6, -58.38], // 23 Buenos Aires
  [-33.45, -70.67], // 24 Santiago
  // Asie
  [25.2, 55.27], // 25 Dubaï
  [19.08, 72.88], // 26 Mumbai
  [28.61, 77.21], // 27 Delhi
  [13.76, 100.5], // 28 Bangkok
  [1.35, 103.82], // 29 Singapour
  [-6.21, 106.85], // 30 Jakarta
  [22.32, 114.17], // 31 Hong Kong
  [31.23, 121.47], // 32 Shanghai
  [37.57, 126.98], // 33 Séoul
  [35.68, 139.69], // 34 Tokyo
  // Océanie
  [-31.95, 115.86], // 35 Perth
  [-37.81, 144.96], // 36 Melbourne
  [-33.87, 151.21], // 37 Sydney
  [-36.85, 174.76], // 38 Auckland
];

/*  Vecteur unitaire d'un relais — sert au calcul des voisins ci-dessous.
 *  Deux points sont d'autant plus proches que leur produit scalaire est
 *  grand (c'est le cosinus de l'angle au centre, donc la distance
 *  orthodromique à un arccos près : inutile de le calculer).               */
function unitVector([lat, lng]: [number, number]): [number, number, number] {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return [
    -(Math.sin(phi) * Math.cos(theta)),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta),
  ];
}

/*  Liaisons long-courrier posées à la main : le maillage de proximité
 *  ci-dessous relie les villes proches, donc il colle aux continents et ne
 *  traverse jamais un océan. Ce sont ces sauts-là qui font le tour du monde.
 */
const TRUNK_LINKS: [number, number][] = [
  [18, 1], // New York – Londres
  [18, 0], // New York – Paris
  [17, 1], // Toronto – Londres
  [14, 34], // San Francisco – Tokyo
  [15, 37], // Los Angeles – Sydney
  [13, 33], // Vancouver – Séoul
  [22, 10], // São Paulo – Lagos
  [22, 2], // São Paulo – Madrid
  [23, 12], // Buenos Aires – Le Cap
  [19, 20], // Mexico – Bogotá
  [12, 35], // Le Cap – Perth
  [12, 22], // Le Cap – São Paulo
  [11, 25], // Nairobi – Dubaï
  [29, 37], // Singapour – Sydney
  [30, 35], // Jakarta – Perth
  [37, 38], // Sydney – Auckland
  [25, 0], // Dubaï – Paris
  [34, 15], // Tokyo – Los Angeles
  [6, 32], // Moscou – Shanghai
  [9, 26], // Le Caire – Mumbai
];

/*  Maillage final : chaque relais est relié à ses 2 plus proches voisins
 *  (couverture locale, sans trou), plus les liaisons long-courrier. Calculé
 *  une fois au chargement du module — aucun coût par frame.                */
const CONNECTIONS: [number, number][] = (() => {
  const vectors = MARKERS.map(unitVector);
  const seen = new Set<string>();
  const links: [number, number][] = [];

  const add = (a: number, b: number) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (a === b || seen.has(key)) return;
    seen.add(key);
    links.push([a, b]);
  };

  for (let i = 0; i < vectors.length; i++) {
    const nearest = vectors
      .map((v, j) => ({
        j,
        dot: v[0] * vectors[i][0] + v[1] * vectors[i][1] + v[2] * vectors[i][2],
      }))
      .filter((c) => c.j !== i)
      .sort((a, b) => b.dot - a.dot)
      .slice(0, 2);
    for (const { j } of nearest) add(i, j);
  }

  for (const [a, b] of TRUNK_LINKS) add(a, b);
  return links;
})();

function latLngToXYZ(lat: number, lng: number, r: number): [number, number, number] {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return [
    -(r * Math.sin(phi) * Math.cos(theta)),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ];
}

function rotate(
  x: number,
  y: number,
  z: number,
  rx: number,
  ry: number,
): [number, number, number] {
  // X puis Y, dans cet ordre : l'inverse fait basculer l'axe des pôles.
  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  const y1 = y * cx - z * sx;
  const z1 = y * sx + z * cx;
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  return [x * cy + z1 * sy, y1, -x * sy + z1 * cy];
}

/*  Projection perspective. `scale > 1` quand z est négatif : les points de la
 *  face avant grossissent, ceux du fond rétrécissent.                       */
function project(x: number, y: number, z: number, cx: number, cy: number): [number, number] {
  const scale = FOV / (FOV + z);
  return [x * scale + cx, y * scale + cy];
}

export function GlobeField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /*  Sphère de Fibonacci : répartition régulière sans amas aux pôles, que
     *  produit une grille lat/lng naïve.                                    */
    const dots: [number, number, number][] = [];
    const golden = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < DOT_COUNT; i++) {
      const theta = (2 * Math.PI * i) / golden;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / DOT_COUNT);
      dots.push([
        Math.cos(theta) * Math.sin(phi),
        Math.cos(phi),
        Math.sin(theta) * Math.sin(phi),
      ]);
    }

    const bands: Path2D[] = new Array(DEPTH_BANDS);

    let frame = 0;
    let width = 0;
    let height = 0;
    let ry = 0.4;
    const rx = 0.32;
    let time = 0;

    /*  Redimensionnement piloté par un ResizeObserver, jamais depuis la
     *  boucle : la version d'origine posait `canvas.width` à chaque frame,
     *  ce qui réalloue le buffer 60 fois par seconde, et lisait un
     *  getBoundingClientRect au même rythme (layout forcé).                 */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (Math.abs(rect.width - width) < 1 && Math.abs(rect.height - height) < 1) return;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!width || !height) return;
      const cx = width / 2;
      /*  Centre remonté au tiers haut : le globe se pose derrière le titre,
       *  pas derrière la grille de chiffres du bas de section.              */
      const cy = height * 0.34;
      /*  Trois bornes, chacune pour un cas de figure :
       *   · `width * 0.42` — en mobile le héros est très haut et étroit, la
       *     largeur est la seule contrainte qui compte ;
       *   · `height * 0.30` — garde le globe au-dessus de la grille de
       *     chiffres en bas de section ;
       *   · MAX_RADIUS — en desktop les deux précédentes sont larges, c'est
       *     ce plafond qui empêche le globe de manger la page.              */
      const radius = Math.min(width * 0.42, height * 0.3, MAX_RADIUS);

      ctx.clearRect(0, 0, width, height);

      // Cercle de contour, à la limite du perceptible.
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${BRAND}, 0.07)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Grille de points, accumulée par tranche de profondeur puis peinte
      // en un `fill` par tranche (voir DEPTH_BANDS).
      for (let i = 0; i < DEPTH_BANDS; i++) bands[i] = new Path2D();

      for (const [dx, dy, dz] of dots) {
        const [x, y, z] = rotate(dx * radius, dy * radius, dz * radius, rx, ry);
        if (z > 0) continue; // face arrière
        const [sx, sy] = project(x, y, z, cx, cy);
        const depth = -z / radius; // 1 au centre du disque, 0 au limbe
        const band = Math.min(DEPTH_BANDS - 1, Math.floor(depth * DEPTH_BANDS));
        const r = 0.75 + depth * 0.75;
        bands[band].moveTo(sx + r, sy);
        bands[band].arc(sx, sy, r, 0, Math.PI * 2);
      }

      for (let i = 0; i < DEPTH_BANDS; i++) {
        // Alpha pris au milieu de la tranche, plancher pour que le limbe
        // reste dessiné : c'est lui qui donne sa silhouette à la sphère.
        const depth = (i + 0.5) / DEPTH_BANDS;
        ctx.fillStyle = `rgba(${BRAND}, ${(0.1 + depth * 0.5).toFixed(3)})`;
        ctx.fill(bands[i]);
      }

      // Arcs entre points de diffusion
      for (const [a, b] of CONNECTIONS) {
        const [la1, ln1] = MARKERS[a];
        const [la2, ln2] = MARKERS[b];
        const p1 = latLngToXYZ(la1, ln1, radius);
        const p2 = latLngToXYZ(la2, ln2, radius);
        const [x1, y1, z1] = rotate(p1[0], p1[1], p1[2], rx, ry);
        const [x2, y2, z2] = rotate(p2[0], p2[1], p2[2], rx, ry);

        // Les deux extrémités derrière la sphère : l'arc est invisible.
        if (z1 > radius * 0.25 && z2 > radius * 0.25) continue;

        const [sx1, sy1] = project(x1, y1, z1, cx, cy);
        const [sx2, sy2] = project(x2, y2, z2, cx, cy);

        /*  Point de contrôle : le milieu du segment, repoussé sur la normale
         *  à 1,3 rayon — c'est ce qui fait décoller l'arc de la surface au
         *  lieu de la traverser.                                            */
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const mz = (z1 + z2) / 2;
        const len = Math.hypot(mx, my, mz) || 1;
        const h = radius * 1.3;
        const [cxp, cyp] = project((mx / len) * h, (my / len) * h, (mz / len) * h, cx, cy);

        /*  Un arc dont une extrémité plonge derrière le globe s'estompe.
         *  Valeurs abaissées depuis le maillage mondial : à ~90 trajets, le
         *  0,34 d'origine (calibré pour 11) empâtait la sphère.             */
        const fade = z1 > 0 || z2 > 0 ? 0.1 : 0.22;
        ctx.beginPath();
        ctx.moveTo(sx1, sy1);
        ctx.quadraticCurveTo(cxp, cyp, sx2, sy2);
        ctx.strokeStyle = `rgba(${BRAND}, ${fade})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        /*  Point voyageur. La phase mêle les deux extrémités : la caler sur
         *  le seul index d'arrivée synchronisait tous les trajets partageant
         *  la même destination — très visible sur un maillage de proximité,
         *  où un relais concentre plusieurs liaisons.                       */
        const t = (Math.sin(time * 0.9 + a * 0.7 + b * 1.7) + 1) / 2;
        const u = 1 - t;
        const tx = u * u * sx1 + 2 * u * t * cxp + t * t * sx2;
        const ty = u * u * sy1 + 2 * u * t * cyp + t * t * sy2;
        ctx.beginPath();
        ctx.arc(tx, ty, 1.7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${BRAND}, ${fade * 3})`;
        ctx.fill();
      }

      // Points de diffusion, avec anneau pulsé
      for (let i = 0; i < MARKERS.length; i++) {
        const [lat, lng] = MARKERS[i];
        const p = latLngToXYZ(lat, lng, radius);
        const [x, y, z] = rotate(p[0], p[1], p[2], rx, ry);
        if (z > 0) continue;

        const [sx, sy] = project(x, y, z, cx, cy);
        const pulse = (Math.sin(time * 1.6 + i) + 1) / 2;
        const depth = Math.max(0.15, -z / radius);

        // Anneau atténué : 39 relais au lieu de 12, il faut qu'ils se
        // remarquent sans faire clignoter la sphère entière.
        ctx.beginPath();
        ctx.arc(sx, sy, 2.5 + pulse * 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${BRAND}, ${((1 - pulse) * 0.22 * depth).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sx, sy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${BRAND}, ${(0.85 * depth).toFixed(3)})`;
        ctx.fill();
      }
    };

    const step = () => {
      frame = requestAnimationFrame(step);
      ry += AUTO_ROTATE;
      time += 0.016;
      draw();
    };

    resize();
    if (reduced) {
      // Mouvement réduit : une seule image, la sphère reste posée.
      draw();
    } else {
      step();
    }

    /*  On redessine dans la foulée du redimensionnement : changer
     *  `canvas.width` vide le buffer, et si la boucle est gelée (onglet en
     *  arrière-plan, mouvement réduit) le globe resterait effacé.          */
    const observer = new ResizeObserver(() => {
      resize();
      draw();
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_75%_60%_at_50%_34%,#000_45%,transparent)]"
    />
  );
}
