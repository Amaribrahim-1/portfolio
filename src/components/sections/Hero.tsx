import { ParallaxLayer } from "@/components/shared/ParallaxLayer";
import { PortraitFrame } from "@/components/shared/PortraitFrame";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";

const ctaClassName = "h-11 px-5";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden px-gutter py-section"
    >
      <ParallaxLayer
        className="pointer-events-none absolute inset-0 overflow-hidden"
        offset={120}
      >
        <div className="flex h-full items-center justify-center">
          <p
            aria-hidden="true"
            className="max-w-none font-display text-[18vw] leading-none font-semibold tracking-tighter whitespace-nowrap text-foreground/10 select-none"
          >
            {profile.name}
          </p>
        </div>
      </ParallaxLayer>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 md:min-h-[calc(100svh-6rem)] md:flex-row md:items-center md:justify-between md:gap-16">
        <div className="flex max-w-2xl flex-col items-center text-center md:items-start md:text-left">
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            {profile.role}
          </p>
          <h1
            id="hero-heading"
            className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl"
          >
            {profile.tagline}
          </h1>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
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
            <a
              href={`mailto:${profile.email}`}
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: ctaClassName,
              })}
            >
              Contact
            </a>
          </div>
        </div>

        <PortraitFrame priority className="lg:w-72" />
      </div>
    </section>
  );
}
