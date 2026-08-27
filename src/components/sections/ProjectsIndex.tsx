import Image from "next/image";
import Link from "next/link";

import { StaggerIn } from "@/components/motion/StaggerIn";
import { BackLink } from "@/components/shared/BackLink";
import { buttonVariants } from "@/components/ui/button";
import {
  projects,
  projectsArchive,
  type Project,
  type ProjectScreenshot,
} from "@/content/projects";
import { cn } from "@/lib/utils";

const CTA_CLASS_NAME = "h-11 px-4 duration-200";
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

const ARCHIVE_CARD_TONES = [
  "bg-cream text-forest shadow-[0_24px_60px_color-mix(in_oklab,black_22%,transparent)]",
  "bg-sage text-forest shadow-[0_24px_60px_color-mix(in_oklab,black_16%,transparent)]",
  "bg-[color-mix(in_oklab,var(--forest)_72%,var(--cream))] text-cream ring-1 ring-cream/15 shadow-[0_24px_60px_color-mix(in_oklab,black_28%,transparent)]",
] as const;

const TECH_CHIP_CLASS_NAME =
  "rounded-md border border-current/20 px-2.5 py-1 font-mono text-xs tracking-wide text-current/75";
const TECH_CHIP_CAP = 4;
const ARCHIVE_IMAGE_SIZES =
  "(max-width: 48rem) 92vw, (max-width: 80rem) 46vw, 30rem";

function cardIndexLabel(index: number): string {
  return String(index + 1).padStart(2, "0");
}

function archiveImageClassName(slug: string): string {
  if (slug === "areej") {
    return "object-contain object-center";
  }

  return "object-cover object-top";
}

function ArchiveLinks({ project }: { project: Project }) {
  const caseStudyHref = project.hasCaseStudy
    ? `/projects/${project.slug}`
    : null;
  const primaryIsCaseStudy = caseStudyHref != null;

  return (
    <ul className="mt-auto flex flex-wrap gap-2.5 pt-6">
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

function ArchiveTech({ names }: { names: readonly string[] }) {
  const shown = names.slice(0, TECH_CHIP_CAP);
  const extra = names.length - shown.length;

  return (
    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
      {shown.map((name) => (
        <li key={name} className={TECH_CHIP_CLASS_NAME}>
          {name}
        </li>
      ))}
      {extra > 0 ? (
        <li className={TECH_CHIP_CLASS_NAME} aria-label={`${extra} more`}>
          +{extra}
        </li>
      ) : null}
    </ul>
  );
}

function ArchivePeak({
  screenshot,
  imageClassName,
  priority,
}: {
  screenshot: ProjectScreenshot;
  imageClassName: string;
  priority: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-current/15 bg-current/5">
      <div className="relative aspect-video">
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          fill
          sizes={ARCHIVE_IMAGE_SIZES}
          placeholder="blur"
          priority={priority}
          className={imageClassName}
        />
      </div>
    </div>
  );
}

function ArchiveCard({
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
        "flex h-full flex-col rounded-[1.75rem] p-6 md:p-7",
        ARCHIVE_CARD_TONES[index % ARCHIVE_CARD_TONES.length],
      )}
    >
      {screenshot ? (
        <ArchivePeak
          screenshot={screenshot}
          imageClassName={archiveImageClassName(project.slug)}
          priority={index === 0}
        />
      ) : null}
      <div className="mt-6 flex min-w-0 flex-1 flex-col">
        <p
          aria-hidden="true"
          className="font-display text-3xl font-semibold tracking-tight text-mustard"
        >
          {cardIndexLabel(index)}
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-pretty md:text-3xl">
          {project.name}
        </h2>
        <p className="mt-2 font-mono text-xs tracking-[0.2em] text-mustard uppercase">
          {project.statusLabel}
        </p>
        <p className="mt-3 text-base text-pretty text-current/75">
          {project.tagline}
        </p>
        <ArchiveTech names={project.tech} />
        <ArchiveLinks project={project} />
      </div>
    </article>
  );
}

export function ProjectsIndex() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="bg-forest text-cream"
    >
      <div className="mx-auto w-full max-w-[100rem] px-gutter pt-28 pb-section md:pb-section-lg">
        <BackLink
          href={projectsArchive.backHref}
          label={projectsArchive.backLabel}
        />
        <h1
          id="projects-heading"
          className="mt-10 font-display text-4xl font-semibold tracking-tight text-pretty md:text-6xl lg:text-7xl"
        >
          {projectsArchive.heading}
        </h1>

        <StaggerIn className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 xl:grid-cols-3 xl:gap-8">
          {projects.map((project, index) => (
            <ArchiveCard
              key={project.slug}
              project={project}
              index={index}
            />
          ))}
        </StaggerIn>
      </div>
    </section>
  );
}
