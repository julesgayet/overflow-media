"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "./ui";
import { Play } from "./icons";

const beats = [
  {
    value: "1",
    unit: "vidéo",
    text: "Ton podcast, ton live, ta vidéo YouTube. Un seul format, une seule audience, une seule chance de percer.",
    tone: "dim" as const,
  },
  {
    value: "300",
    unit: "clips",
    text: "Le même contenu, redécoupé, remonté et republié sur des centaines de comptes, avec des dizaines d'angles testés en parallèle.",
    tone: "white" as const,
  },
  {
    value: "4,5",
    unit: "millions de vues",
    text: "Ce que produisent 300 clips à 15 000 vues de moyenne. Le contenu n'a pas changé — sa surface de contact, si.",
    tone: "accent" as const,
  },
];

/* ── Visuels ─────────────────────────────────────────────────────────────── */

function SourceVisual() {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,.10),transparent_65%)]" />
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid size-14 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
            <Play className="size-5 translate-x-0.5 text-white/80" />
          </span>
        </div>
        <div className="absolute inset-x-5 bottom-5">
          <div className="h-1 rounded-full bg-white/12">
            <div className="h-full w-1/3 rounded-full bg-white/40" />
          </div>
          <div className="mt-2.5 flex justify-between text-[10px] text-white/40">
            <span className="nums">14:22</span>
            <span className="nums">42:18</span>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-mist-2">1 vidéo source · 1 seule publication</p>
    </div>
  );
}

function SpreadVisual({ on }: { on: boolean }) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="grid grid-cols-12 gap-1.5">
        {Array.from({ length: 72 }).map((_, i) => (
          <span
            key={i}
            className="aspect-[9/16] rounded-[2px] bg-gradient-to-b from-brand/60 to-accent/25 transition-all duration-500"
            style={{
              opacity: on ? 1 : 0,
              transform: on ? "scale(1)" : "scale(0.4)",
              transitionDelay: `${(i % 12) * 22 + Math.floor(i / 12) * 45}ms`,
            }}
          />
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-mist-2">
        chaque carré = un clip publié sur un compte différent
      </p>
    </div>
  );
}

const bars = [8, 14, 11, 22, 19, 34, 28, 46, 41, 63, 78, 100];

function ReachVisual({ on }: { on: boolean }) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-2xl border border-line bg-surface p-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="nums text-3xl font-semibold tracking-tight text-ink">4 500 000</div>
            <p className="mt-1 text-xs text-mist-2">vues cumulées sur 30 jours</p>
          </div>
          <span className="nums rounded-full border border-lime/30 bg-lime/10 px-2.5 py-1 text-[11px] font-medium text-lime">
            +4,5 M
          </span>
        </div>
        <div className="mt-7 flex h-32 items-end gap-1.5">
          {bars.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-[3px] bg-gradient-to-t from-brand/40 to-accent transition-all duration-700 ease-out"
              style={{ height: on ? `${h}%` : "4%", transitionDelay: `${i * 55}ms` }}
            />
          ))}
        </div>
        <div className="mt-3 flex justify-between text-[10px] text-mist-2">
          <span>J1</span>
          <span>J30</span>
        </div>
      </div>
    </div>
  );
}

export function FeedMath() {
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

  const visuals = [
    <SourceVisual key="a" />,
    <SpreadVisual key="b" on={active === 1} />,
    <ReachVisual key="c" on={active === 2} />,
  ];

  return (
    <section ref={sectionRef} id="mecanique" className="relative border-y border-line bg-surface-2">
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

              <div className="grid min-w-0 flex-1 items-center gap-10 py-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
                {/* Texte */}
                <div>
                  <Eyebrow className="mb-9">La mécanique du clipping</Eyebrow>

                  <div className="relative h-[13rem] sm:h-[15rem] lg:h-[16rem]">
                    {beats.map((b, i) => (
                      <div
                        key={i}
                        className={`absolute inset-0 transition-all duration-500 ease-out ${
                          active === i
                            ? "translate-y-0 opacity-100"
                            : "pointer-events-none translate-y-4 opacity-0"
                        }`}
                        aria-hidden={active !== i}
                      >
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <span
                            className={`nums text-[4rem] font-semibold leading-[0.9] tracking-[-0.04em] transition-colors duration-500 sm:text-[5.5rem] ${
                              b.tone === "dim"
                                ? "text-mist-2"
                                : b.tone === "accent"
                                  ? "text-brand"
                                  : "text-ink"
                            }`}
                          >
                            {b.value}
                          </span>
                          <span className="text-lg font-medium text-mist sm:text-xl">{b.unit}</span>
                        </div>
                        <p className="mt-5 max-w-md text-pretty text-[15px] leading-relaxed text-mist md:text-base">
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

                {/* Visuel */}
                <div className="relative hidden h-[24rem] lg:block" aria-hidden>
                  {visuals.map((v, i) => (
                    <div
                      key={i}
                      className={`absolute inset-0 flex items-center transition-all duration-600 ease-out ${
                        active === i ? "scale-100 opacity-100" : "scale-95 opacity-0"
                      }`}
                    >
                      <div className="w-full">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Distance de scroll pendant laquelle le panneau reste épinglé */}
        <div className="h-[110vh] lg:h-[160vh]" aria-hidden />
      </div>
    </section>
  );
}
