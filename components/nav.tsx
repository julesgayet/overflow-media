"use client";

import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { Button } from "./ui";

const links = [
  { href: "#methode", label: "Méthode" },
  { href: "#simulateur", label: "Simulateur" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#campagnes", label: "Campagnes" },
  { href: "#clippeurs", label: "Clippeurs" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line/80 bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      {/* Barre de progression de lecture */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-brand to-accent transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />

      <nav className="container-x flex h-[72px] items-center justify-between gap-6">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label={site.name}>
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-accent">
            <span className="size-2.5 rounded-[3px] bg-ink" />
          </span>
          <span className="text-[17px] font-semibold tracking-tight">{site.name}</span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-2 text-sm text-mist transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 items-center gap-4 md:flex">
          <a
            href={site.links.whopClippers}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-mist transition-colors hover:text-white"
          >
            Devenir clippeur
          </a>
          <Button href="#contact" variant="light" arrow>
            Lancer une campagne
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 shrink-0 place-items-center rounded-lg border border-line-2 md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 h-px w-5 bg-white transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-px w-5 bg-white transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-white transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Menu mobile */}
      <div
        className={`overflow-hidden border-t border-line bg-ink/95 backdrop-blur-xl transition-[max-height] duration-500 md:hidden ${
          open ? "max-h-[560px]" : "max-h-0 border-t-transparent"
        }`}
      >
        <div className="container-x flex flex-col gap-1 py-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base text-mist transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <Button href="#contact" variant="light" size="lg" arrow>
              Lancer une campagne
            </Button>
            <Button href={site.links.whopClippers} variant="outline" size="lg">
              Devenir clippeur
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
