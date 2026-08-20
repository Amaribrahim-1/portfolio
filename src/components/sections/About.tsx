import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { profile } from "@/content/profile";

function alternatingRowDirection(index: number): "left" | "right" {
  return index % 2 === 0 ? "right" : "left";
}

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-5xl px-gutter py-section-lg"
    >
      <ScrollReveal>
        <h2
          id="about-heading"
          className="font-mono text-xs tracking-[0.2em] text-accent uppercase"
        >
          About
        </h2>
      </ScrollReveal>

      <div className="mt-10 flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-16">
        <ScrollReveal>
          {/* Placeholder until the real portrait is supplied; frame treatment is CSS. */}
          <div
            aria-hidden="true"
            className="photo-frame photo-frame-duotone aspect-3/4 w-44 shrink-0 sm:w-52 md:w-56 lg:w-64"
          >
            <div className="photo-frame-media bg-secondary" />
          </div>
        </ScrollReveal>

        <div className="flex max-w-2xl flex-col gap-6">
          {profile.aboutRows.map((row, index) => (
            <ScrollReveal
              key={row}
              direction={alternatingRowDirection(index)}
              delay={index * 0.08}
            >
              <p className="text-lg leading-relaxed text-foreground">{row}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
