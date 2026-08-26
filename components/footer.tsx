import Link from "next/link";
import { site } from "@/site.config";
import { Logo } from "./logo";
import { Discord, Instagram, TikTok, XIcon, YouTube } from "./icons";

const socials = [
  { href: site.links.tiktok, label: "TikTok", Icon: TikTok },
  { href: site.links.instagram, label: "Instagram", Icon: Instagram },
  { href: site.links.youtube, label: "YouTube", Icon: YouTube },
  { href: site.links.x, label: "X", Icon: XIcon },
  { href: site.links.discord, label: "Discord", Icon: Discord },
];

const cols = [
  {
    title: "Agence",
    links: [
      { href: "#methode", label: "Méthode" },
      { href: "#simulateur", label: "Simulateur" },
      { href: "#tarifs", label: "Tarifs" },
      { href: "#pour-qui", label: "Pour qui" },
      { href: "#verification", label: "Vérification" },
      { href: "#campagnes", label: "Campagnes" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: `mailto:${site.email}`, label: site.email },
      { href: "/reserver", label: "Lancer une campagne" },
    ],
  },
  {
    title: "Légal",
    links: [
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/cgv", label: "CGV" },
      { href: "/confidentialite", label: "Confidentialité" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface-2">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">{site.tagline}.</p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-lg border border-line text-mist transition-colors hover:border-line-2 hover:text-ink"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mist-2">
                {c.title}
              </p>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("/") ? (
                      <Link
                        href={l.href}
                        className="text-sm text-mist transition-colors hover:text-ink"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-mist transition-colors hover:text-ink"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs text-mist-2 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Tous droits réservés.
          </p>
          <p>Paiement des campagnes et rémunération du réseau opérés via Whop.</p>
        </div>
      </div>
    </footer>
  );
}
