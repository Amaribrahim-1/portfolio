import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";

const ctaClassName = "h-11 px-5";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden px-gutter py-section"
    >
      <p
        aria-hidden="true"
        className="pointer-events-none absolute top-[18%] left-1/2 -z-10 max-w-none -translate-x-1/2 font-display text-[18vw] leading-none font-semibold tracking-tighter whitespace-nowrap text-foreground/6 select-none"
      >
        {profile.name}
      </p>

      <div className="relative mx-auto flex min-h-[calc(100svh-6rem)] max-w-5xl flex-col items-center justify-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="flex max-w-2xl flex-col items-center text-center lg:items-start lg:text-left">
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            {profile.role}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
            {profile.tagline}
          </h1>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
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

        {/* Placeholder until the real portrait is supplied; frame treatment is CSS. */}
        <div
          aria-hidden="true"
          className="photo-frame photo-frame-duotone aspect-3/4 w-52 shrink-0 sm:w-64 lg:w-72"
        >
          <div className="photo-frame-media bg-secondary" />
        </div>
      </div>
    </section>
  );
}
