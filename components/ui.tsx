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
  const variants = {
    primary:
      "bg-brand text-white shadow-[0_0_0_1px_rgba(167,139,250,.35),0_10px_40px_-10px_rgba(124,92,255,.9)] hover:bg-brand-2 hover:shadow-[0_0_0_1px_rgba(167,139,250,.6),0_14px_50px_-8px_rgba(124,92,255,1)]",
    light:
      "bg-white text-ink shadow-[0_0_0_1px_rgba(255,255,255,.2),0_10px_36px_-12px_rgba(255,255,255,.45)] hover:bg-white/90",
    outline:
      "border border-line-2 bg-white/[0.03] text-white backdrop-blur hover:border-brand/60 hover:bg-white/[0.06]",
    ghost: "text-mist hover:text-white",
  }[variant];

  const external = href.startsWith("http") || href.startsWith("mailto:");
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 ${sizes} ${variants} ${className}`;

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
    <span className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-mist backdrop-blur">
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
    <div
      className={`group relative overflow-hidden rounded-2xl border border-line bg-surface/70 p-6 backdrop-blur transition-colors duration-300 hover:border-line-2 ${className}`}
    >
      <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -top-24 left-1/2 size-56 -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" />
      </div>
      <div className="relative">{children}</div>
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
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
        <span className="relative inline-flex size-1.5 rounded-full bg-brand-2" />
      </span>
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
