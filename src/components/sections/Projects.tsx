import Image from "next/image";
import Link from "next/link";

import { StickyStack } from "@/components/motion/StickyStack";
import { buttonVariants } from "@/components/ui/button";
import {
  projects,
  type Project,
  type ProjectScreenshot,
} from "@/content/projects";
import { cn } from "@/lib/utils";

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
  "border-current/45 bg-transparent text-inherit hover:bg-current/10 hover:text-inherit",
);

const PROJECT_CARD_TONES = [
  "bg-cream text-forest shadow-[0_24px_60px_color-mix(in_oklab,black_22%,transparent)]",
  "bg-sage text-forest shadow-[0_24px_60px_color-mix(in_oklab,black_16%,transparent)]",
  "bg-[color-mix(in_oklab,var(--forest)_72%,var(--cream))] text-cream ring-1 ring-cream/15 shadow-[0_24px_60px_color-mix(in_oklab,black_28%,transparent)]",
] as const;

const PEAK_ROTATIONS = ["rotate-3", "-rotate-2", "rotate-2"] as const;

const TECH_CHIP_CLASS_NAME =
  "rounded-md border border-current/20 px-2.5 py-1 font-mono text-xs tracking-wide text-current/75";
const TECH_CHIP_MOBILE_CAP = 4;
const TECH_CHIP_DESKTOP_CAP = 6;

const DEFAULT_PEAK_ASPECT_CLASS = "aspect-[16/10]";
const DEFAULT_PEAK_IMAGE_CLASS = "object-cover object-top";
/** Areej hero is 16:9 (bottle left, Arabic CTA right); 16/10 cover crop clips both. */
const LANDSCAPE_PEAK_ASPECT_CLASS = "aspect-video";
const LANDSCAPE_PEAK_IMAGE_CLASS = "object-contain object-center";

function cardIndexLabel(index: number): string {
  return String(index + 1).padStart(2, "0");
}

type PeakFit = {
  aspectClassName: string;
  imageClassName: string;
};

function workPeakFit(slug: string): PeakFit {
  if (slug === "areej") {
    return {
      aspectClassName: LANDSCAPE_PEAK_ASPECT_CLASS,
      imageClassName: LANDSCAPE_PEAK_IMAGE_CLASS,
    };
  }

  return {
    aspectClassName: DEFAULT_PEAK_ASPECT_CLASS,
    imageClassName: DEFAULT_PEAK_IMAGE_CLASS,
  };
}

function ProjectLinks({ project }: { project: Project }) {
  const caseStudyHref = project.hasCaseStudy
    ? `/projects/${project.slug}`
    : null;
  const primaryIsCaseStudy = caseStudyHref != null;

  return (
    <ul className="mt-8 flex flex-wrap gap-3">
      {caseStudyHref ? (
        <li>
          <Link href={caseStudyHref} className={PRIMARY_CTA_CLASS_NAME}>
            Case study
          </Link>
        </li>
      ) : null}
      {project.liveUrl ? (
        <li>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={
              primaryIsCaseStudy
                ? SECONDARY_CTA_CLASS_NAME
                : PRIMARY_CTA_CLASS_NAME
            }
          >
            Live demo
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ) : null}
      {project.repoUrl ? (
        <li>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={SECONDARY_CTA_CLASS_NAME}
          >
            GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ) : null}
    </ul>
  );
}

function TechOverflowChip({
  extra,
  className,
}: {
  extra: number;
  className: string;
}) {
  if (extra <= 0) {
    return null;
  }

  return (
    <li
      className={cn(TECH_CHIP_CLASS_NAME, className)}
      aria-label={`${extra} more`}
    >
      +{extra}
    </li>
  );
}

function ProjectTech({ names }: { names: readonly string[] }) {
  const shown = names.slice(0, TECH_CHIP_DESKTOP_CAP);

  return (
    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
      {shown.map((name, index) => (
        <li
          key={name}
          className={cn(
            TECH_CHIP_CLASS_NAME,
            index >= TECH_CHIP_MOBILE_CAP && "max-md:hidden",
          )}
        >
          {name}
        </li>
      ))}
      <TechOverflowChip
        extra={names.length - TECH_CHIP_MOBILE_CAP}
        className="md:hidden"
      />
      <TechOverflowChip
        extra={names.length - TECH_CHIP_DESKTOP_CAP}
        className="max-md:hidden"
      />
    </ul>
  );
}

function ProjectPeak({
  screenshot,
  rotateClassName,
  peakFit,
}: {
  screenshot: ProjectScreenshot;
  rotateClassName: string;
  peakFit: PeakFit;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none relative mt-10 w-[92%] max-w-xl self-end overflow-hidden rounded-xl border border-black/10 shadow-[0_24px_60px_color-mix(in_oklab,black_28%,transparent)] md:absolute md:-right-6 md:top-[22%] md:mt-0 md:w-[56%] md:max-w-none",
        rotateClassName,
      )}
    >
      <div className={cn("relative", peakFit.aspectClassName)}>
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          fill
          sizes="(max-width: 40rem) 92vw, (max-width: 48rem) 36rem, (max-width: 64rem) 50vw, 34rem"
          placeholder="blur"
          className={peakFit.imageClassName}
        />
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const screenshot = project.cardScreenshot ?? project.screenshots[0];

  return (
    <article
      className={cn(
        "relative flex min-h-[70svh] flex-col justify-start overflow-visible rounded-[1.75rem] p-8 md:min-h-[78svh] md:p-12 lg:p-16",
        PROJECT_CARD_TONES[index % PROJECT_CARD_TONES.length],
      )}
    >
      <div className="relative z-10 md:max-w-[42%]">
        <p
          aria-hidden="true"
          className="font-display text-5xl font-semibold tracking-tight text-mustard md:text-7xl"
        >
          {cardIndexLabel(index)}
        </p>
        <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight text-pretty md:text-5xl lg:text-6xl">
          {project.name}
        </h3>
        <p className="mt-3 font-mono text-xs tracking-[0.2em] text-mustard uppercase">
          {project.statusLabel}
        </p>
        <p className="mt-6 max-w-md text-lg text-pretty text-current/75 md:text-xl">
          {project.tagline}
        </p>
        <ProjectTech names={project.tech} />
        <ProjectLinks project={project} />
      </div>

      {screenshot ? (
        <ProjectPeak
          screenshot={screenshot}
          rotateClassName={PEAK_ROTATIONS[index % PEAK_ROTATIONS.length]}
          peakFit={workPeakFit(project.slug)}
        />
      ) : null}
    </article>
  );
}

export function Projects() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-forest text-cream"
    >
      <div className="mx-auto max-w-5xl px-gutter py-section-lg">
        <h2
          id="work-heading"
          className="font-mono text-xs tracking-[0.2em] text-mustard uppercase"
        >
          Projects
        </h2>

        <StickyStack className="mt-10">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
            />
          ))}
        </StickyStack>
      </div>
    </section>
  );
}
