"use client";

import { useEffect, useRef } from "react";

/*  Réseau de particules dessiné derrière le héros.
 *
 *  Adapté d'un effet « constellation » prévu pour un fond noir : ici le canvas
 *  ne peint aucun fond (il est transparent, le `ground` de la page passe au
 *  travers) et la seule couleur est le cobalt de la charte, très dilué. Le
 *  maillage doit rester à la limite du perceptible : c'est un décor, pas un
 *  motif.
 *
 *  Le liage est en O(n²), donc le nombre de particules est plafonné et la
 *  distance de liaison plafonnée (~185 px) — la version d'origine
 *  reliait tout à tout, ce qui écroulait le framerate en plein écran.
 */

const LINK_DISTANCE = 185;
const MAX_PARTICLES = 130;
const MOUSE_RADIUS = 150;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const mouse = { x: -1, y: -1 };

    const seed = () => {
      const count = Math.min(MAX_PARTICLES, Math.round((width * height) / 9000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.random() * 0.34 - 0.17,
        vy: Math.random() * 0.34 - 0.17,
        r: Math.random() * 1.7 + 1.1,
      }));
    };

    // Sur mobile, l'apparition/disparition de la barre d'URL au scroll change la
    // hauteur du viewport et déclenchait `resize` en rafale : chaque appel
    // relançait `seed()` et le maillage « sautait ». On ne réagit donc qu'à un
    // vrai changement de largeur (rotation, redimensionnement de fenêtre).
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (Math.abs(rect.width - width) < 1) {
        // hauteur seule : on étire le canvas sans re-semer
        height = rect.height;
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return;
      }
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const step = () => {
      frame = requestAnimationFrame(step);
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (p.x > width || p.x < 0) p.vx = -p.vx;
        if (p.y > height || p.y < 0) p.vy = -p.vy;

        if (mouse.x >= 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - d) / MOUSE_RADIUS;
            p.x -= (dx / d) * force * 3;
            p.y -= (dy / d) * force * 3;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(31, 79, 216, 0.9)";
        ctx.fill();
      }

      ctx.lineWidth = 1;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DISTANCE * LINK_DISTANCE) continue;

          // Les liens proches du curseur se densifient légèrement : c'est le
          // seul retour visuel à l'interaction, le reste garde son opacité.
          const near =
            mouse.x >= 0 &&
            Math.hypot(particles[a].x - mouse.x, particles[a].y - mouse.y) < MOUSE_RADIUS;
          const fade = 1 - Math.sqrt(d2) / LINK_DISTANCE;

          ctx.strokeStyle = `rgba(31, 79, 216, ${fade * (near ? 0.62 : 0.42)})`;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      // Le doigt qui fait défiler la page émet des `pointermove` : les prendre
      // en compte faisait fuir les particules à chaque scroll tactile.
      if (e.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onPointerLeave = () => {
      mouse.x = -1;
      mouse.y = -1;
    };

    resize();
    step();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_95%_80%_at_50%_35%,#000_45%,transparent)]"
    />
  );
}
