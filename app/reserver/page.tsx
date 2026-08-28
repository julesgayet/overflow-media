import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/site.config";
import { Logo } from "@/components/logo";
import { Booking } from "@/components/booking";
import { Eyebrow } from "@/components/ui";
import { Arrow, Check, Instagram, TikTok, YouTube } from "@/components/icons";

export const metadata: Metadata = {
  title: "Réserver un créneau",
  description: `Réserve un appel de ${site.calcom.duration} avec ${site.name} : on cadre votre objectif, on estime vos vues et on vous donne un CPM cible.`,
  alternates: { canonical: "/reserver" },
  openGraph: {
    title: `Réserver un créneau · ${site.name}`,
    description: `Un appel de ${site.calcom.duration} pour cadrer votre campagne de clipping.`,
    url: `https://${site.domain}/reserver`,
  },
};

const points = [
  "On cadre votre objectif et votre niche",
  "On vous donne une estimation de vues et un CPM",
  "Vous repartez avec un budget chiffré, sans engagement",
  "Un lien de paiement sécurisé pour lancer la campagne",
];

export default function Reserver() {
  return (
    <div className="relative min-h-screen">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.022)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.022)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_45%_at_50%_0%,#000,transparent)]" />
      </div>

      {/* Barre allégée : pas de menu, rien qui détourne de la réservation */}
      <header className="border-b border-line/70">
        <div className="container-x flex h-[72px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} — accueil`}>
            <Logo />
          </Link>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-ink"
          >
            <Arrow className="size-4 rotate-180 transition-transform group-hover:-translate-x-1" />
            Retour au site
          </Link>
        </div>
      </header>

      <main className="container-x py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">Réserver un créneau</Eyebrow>
          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl md:text-6xl">
            Parlons de <span className="text-gradient">votre campagne</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-mist md:text-lg">
            {site.calcom.duration} au téléphone, et vous savez si le clipping vaut le coup pour vous.
            Choisis le créneau qui t&apos;arrange.
          </p>
        </div>

        <ul className="mx-auto mt-10 flex max-w-3xl flex-col justify-center gap-3 sm:flex-row sm:gap-7">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm text-mist">
              <Check className="mt-0.5 size-4 shrink-0 text-lime" />
              {p}
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-12 max-w-4xl">
          <Booking />
        </div>

        <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-5 border-t border-line pt-9 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-mist-2">
            Pas le bon moment ?
            <a
              href={`mailto:${site.email}?subject=Lancer%20une%20campagne%20de%20clipping`}
              className="group inline-flex items-center gap-1.5 font-medium text-ink transition-colors hover:text-brand-2"
            >
              {site.email}
              <Arrow className="size-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </p>
          <div className="flex items-center gap-5 text-xs text-mist-2">
            <span className="flex items-center gap-2">
              <TikTok className="size-4" /> TikTok
            </span>
            <span className="flex items-center gap-2">
              <Instagram className="size-4" /> Reels
            </span>
            <span className="flex items-center gap-2">
              <YouTube className="size-4" /> Shorts
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
