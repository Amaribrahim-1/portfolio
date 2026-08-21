import Link from "next/link";

import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { DeviceFrame } from "@/components/shared/DeviceFrame";
import { buttonVariants } from "@/components/ui/button";
import type { Project, ProjectScreenshot } from "@/content/projects";
import { cn, focusRingClassName } from "@/lib/utils";

const CTA_CLASS_NAME = "h-11 px-5 duration-200";
const PRIMARY_CTA_CLASS_NAME = buttonVariants({
  size: "lg",
  className: CTA_CLASS_NAME,
});
const SECONDARY_CTA_CLASS_NAME = cn(
  buttonVariants({
    variant: "outline",
    size: "lg",
    className: CTA_CLASS_NAME,
  }),
  "border-forest/45 bg-transparent text-forest hover:bg-forest/10 hover:text-forest dark:border-forest/45 dark:bg-transparent dark:text-forest dark:hover:bg-forest/10 dark:hover:text-forest",
);
const SCREENSHOT_FRAME_CLASS_NAME =
  "rounded-xl shadow-[0_24px_60px_color-mix(in_oklab,black_16%,transparent)] ring-1 ring-forest/10";

function cardIndexLabel(index: number): string {
  return String(index + 1).padStart(2, "0");
}

function CaseStudyBackLink() {
  return (
    <nav aria-label="Breadcrumb">
      <Link
        href="/#work"
        className={cn(
          "font-mono text-xs tracking-[0.15em] text-sage uppercase transition-colors duration-200 hover:text-mustard",
          focusRingClassName,
          "focus-visible:text-mustard",
        )}
      >
        Projects
      </Link>
    </nav>
  );
}

function CaseStudyHeader({ project }: { project: Project }) {
  return (
    <header className="bg-forest text-cream">
      <div className="mx-auto max-w-5xl px-gutter pt-28 pb-16 md:pb-20">
        <CaseStudyBackLink />
        <p className="mt-10 font-mono text-xs tracking-[0.2em] text-mustard uppercase">
          Case study
        </p>
        <SplitHeadline className="mt-4 font-display text-4xl font-semibold tracking-tight text-pretty md:text-6xl lg:text-7xl">
          {project.name}
        </SplitHeadline>
        <p className="mt-4 font-mono text-xs tracking-[0.2em] text-mustard uppercase">
          {project.statusLabel}
        </p>
        <p className="mt-6 max-w-2xl text-lg text-pretty text-cream/75 md:text-xl">
          {project.tagline}
        </p>
      </div>
    </header>
  );
}

function CaseStudyHighlights({ bullets }: { bullets: readonly string[] }) {
  return (
    <section aria-labelledby="overview-heading">
      <h2
        id="overview-heading"
        className="font-mono text-xs tracking-[0.2em] text-mustard uppercase"
      >
        Overview
      </h2>
      <ol className="mt-8 flex list-none flex-col gap-10">
        {bullets.map((bullet, index) => (
          <li key={bullet}>
            <p
              aria-hidden="true"
              className="font-display text-3xl font-semibold tracking-tight text-mustard md:text-4xl"
            >
              {cardIndexLabel(index)}
            </p>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-pretty">
              {bullet}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function CaseStudyGallery({
  projectName,
  screenshots,
}: {
  projectName: string;
  screenshots: readonly ProjectScreenshot[];
}) {
  if (screenshots.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-col gap-8">
      {screenshots.map((screenshot) => (
        <li key={screenshot.src.src}>
          <DeviceFrame
            label={projectName}
            screenshot={screenshot}
            sizes="(max-width: 64rem) 100vw, 32rem"
            className={SCREENSHOT_FRAME_CLASS_NAME}
          />
        </li>
      ))}
    </ul>
  );
}

function CaseStudyTech({ tech }: { tech: readonly string[] }) {
  return (
    <section aria-labelledby="stack-heading">
      <h2
        id="stack-heading"
        className="font-mono text-xs tracking-[0.2em] text-mustard uppercase"
      >
        Stack
      </h2>
      <ul className="mt-8 flex flex-wrap gap-2">
        {tech.map((name) => (
          <li
            key={name}
            className="rounded-md border border-forest/20 px-2.5 py-1 font-mono text-xs tracking-wide text-forest/75"
          >
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CaseStudyLinks({
  liveUrl,
  repoUrl,
}: {
  liveUrl: string | null;
  repoUrl: string | null;
}) {
  if (!liveUrl && !repoUrl) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-3">
      {liveUrl ? (
        <li>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={PRIMARY_CTA_CLASS_NAME}
          >
            Live demo
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ) : null}
      {repoUrl ? (
        <li>
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={liveUrl ? SECONDARY_CTA_CLASS_NAME : PRIMARY_CTA_CLASS_NAME}
          >
            GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ) : null}
    </ul>
  );
}

export function CaseStudy({ project }: { project: Project }) {
  const [heroScreenshot, ...galleryScreenshots] = project.screenshots;

  return (
    <article>
      <CaseStudyHeader project={project} />

      <div className="bg-cream text-forest">
        <div className="mx-auto max-w-5xl px-gutter py-section md:py-section-lg">
          <div className="grid items-start gap-12 md:grid-cols-2 md:gap-12 lg:gap-16">
            <figure className="md:sticky md:top-24 md:motion-reduce:relative md:motion-reduce:top-auto">
              <DeviceFrame
                label={project.name}
                screenshot={heroScreenshot}
                priority
                sizes="(max-width: 64rem) 100vw, 32rem"
                className={SCREENSHOT_FRAME_CLASS_NAME}
              />
            </figure>

            <div className="flex flex-col gap-16">
              <CaseStudyHighlights bullets={project.bullets} />
              <CaseStudyGallery
                projectName={project.name}
                screenshots={galleryScreenshots}
              />
              <CaseStudyTech tech={project.tech} />
              <CaseStudyLinks
                liveUrl={project.liveUrl}
                repoUrl={project.repoUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
