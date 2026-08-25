import { site } from "@/site.config";
import { Reveal, SectionHeading } from "./ui";
import { Arrow } from "./icons";

export function Audiences() {
  return (
    <section id="pour-qui" className="relative border-y border-line bg-ink-2/40 py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            center={false}
            eyebrow="Pour qui"
            title={
              <>
                Le clipping marche quand il y a{" "}
                <span className="text-gradient">du contenu à recycler</span>
              </>
            }
          />
        </Reveal>

        <div className="mt-14 border-t border-line">
          {site.niches.map((n, i) => (
            <Reveal key={n.title} delay={i * 70}>
              <a
                href="/reserver"
                className="group flex items-center gap-5 border-b border-line py-6 transition-colors hover:bg-white/[0.02] md:gap-8 md:py-7"
              >
                <span className="nums w-7 shrink-0 text-xs text-mist-2 transition-colors group-hover:text-brand-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 text-2xl font-semibold tracking-[-0.02em] text-white transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl md:text-4xl">
                  {n.title}
                </span>
                <span className="hidden shrink-0 text-sm text-mist-2 sm:block">{n.hint}</span>
                <Arrow className="size-5 shrink-0 text-mist-2 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-2" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
