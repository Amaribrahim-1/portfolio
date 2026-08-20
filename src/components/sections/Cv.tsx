import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";

const ctaClassName = "h-11 px-5";

export function Cv() {
  return (
    <section
      id="cv"
      aria-labelledby="cv-heading"
      className="mx-auto max-w-5xl px-gutter py-section-lg"
    >
      <ScrollReveal>
        <h2
          id="cv-heading"
          className="font-mono text-xs tracking-[0.2em] text-accent uppercase"
        >
          CV / Resume
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <div className="mt-10 flex max-w-xl flex-col items-start gap-6">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {profile.name}
            </p>
            <p className="mt-2 text-muted-foreground">{profile.role}</p>
          </div>
          <a
            href={profile.cvHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              size: "lg",
              className: ctaClassName,
            })}
          >
            My CV
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
