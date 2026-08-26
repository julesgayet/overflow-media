"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./icons";

/* ── Reveal au scroll ────────────────────────────────────────────────────── */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Boutons ─────────────────────────────────────────────────────────────── */
type BtnProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "light" | "ghost" | "outline";
  size?: "md" | "lg";
  arrow?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
}: BtnProps) {
  const sizes = size === "lg" ? "h-14 px-8 text-[15px]" : "h-11 px-5 text-sm";
  /*  La profondeur vient de la bordure et du contraste, pas du relief : plus
   *  aucune ombre colorée ni halo, conformément à la charte.                 */
  const variants = {
    primary: "bg-brand text-white hover:bg-brand-2",
    // « light » = le bouton sombre, qui tranche le plus sur le fond perle.
    light: "bg-ink text-white hover:bg-ink/90",
    outline: "border border-line-2 bg-surface text-ink hover:border-mist-2 hover:bg-surface-2",
    ghost: "text-mist hover:text-ink",
  }[variant];

  const external = href.startsWith("http") || href.startsWith("mailto:");
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-colors duration-200 ${sizes} ${variants} ${className}`;

  const inner = (
    <>
      {children}
      {arrow && (
        <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/* ── Badge / eyebrow ─────────────────────────────────────────────────────── */
export function Badge({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-mist">
      {icon}
      {children}
    </span>
  );
}

/* ── Titre de section ────────────────────────────────────────────────────── */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <Eyebrow className={`mb-5 ${center ? "justify-center" : ""}`}>{eyebrow}</Eyebrow>
      )}
      <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-pretty text-base leading-relaxed text-mist md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ── Carte avec halo au survol ───────────────────────────────────────────── */
export function GlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    /*  Le halo au survol appartenait au thème néon. Sur fond clair la carte se
        signale par sa bordure qui se resserre — plus sobre, plus premium.    */
    <div
      className={`group relative overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors duration-200 hover:border-mist-2 ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Eyebrow avec pastille lumineuse ─────────────────────────────────────── */
export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-mist ${className}`}
    >
      <span className="relative inline-flex size-1.5 shrink-0 rounded-full bg-brand" />
      {children}
    </p>
  );
}

/* ── Compteur animé au scroll ────────────────────────────────────────────── */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1600,
  className = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(to);
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // easeOutExpo
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setValue(to * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  const display = to % 1 === 0 ? Math.round(value) : value.toFixed(1);

  return (
    <span ref={ref} className={`nums ${className}`}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
