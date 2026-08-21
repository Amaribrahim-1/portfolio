import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";

const CTA_CLASS_NAME = "h-11 px-5 duration-200";

export function Cv() {
  return (
    <section
      id="cv"
      aria-labelledby="cv-heading"
      className="bg-cream text-forest"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-8 px-gutter py-section-lg">
        <h2
          id="cv-heading"
          className="font-display text-5xl font-semibold tracking-tight text-pretty md:text-7xl lg:text-8xl"
        >
          CV / Resume
        </h2>
        <a
          href={profile.cvHref}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            size: "lg",
            className: CTA_CLASS_NAME,
          })}
        >
          My CV
          <span className="sr-only"> (PDF, opens in a new tab)</span>
        </a>
      </div>
    </section>
  );
}
