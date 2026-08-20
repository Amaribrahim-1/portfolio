import Link from "next/link";

import { DeviceFrame } from "@/components/shared/DeviceFrame";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { Project, ProjectScreenshot, ProjectStatus } from "@/content/projects";

const ctaClassName = "h-11 px-5";

function alternatingRowDirection(index: number): "left" | "right" {
  return index % 2 === 0 ? "right" : "left";
}

function statusBadgeVariant(status: ProjectStatus) {
  return status === "live" ? "default" : "outline";
}

function CaseStudyBackLink() {
  return (
    <nav aria-label="Breadcrumb" className="mb-10">
      <Link
        href="/#work"
        className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-accent focus-visible:rounded-sm focus-visible:text-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        Projects
      </Link>
    </nav>
  );
}

function CaseStudyHeader({ project }: { project: Project }) {
  return (
    <header className="mb-10">
      <ScrollReveal>
        <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
          Case study
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.08}>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {project.name}
          </h1>
          <Badge
            variant={statusBadgeVariant(project.status)}
            className="font-mono"
          >
            {project.statusLabel}
          </Badge>
        </div>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          {project.tagline}
        </p>
      </ScrollReveal>
    </header>
  );
}

function CaseStudyHighlights({ bullets }: { bullets: readonly string[] }) {
  return (
    <section aria-labelledby="overview-heading" className="mt-16">
      <ScrollReveal>
        <h2
          id="overview-heading"
          className="font-mono text-xs tracking-[0.2em] text-accent uppercase"
        >
          Overview
        </h2>
      </ScrollReveal>
      <ul className="mt-8 flex flex-col gap-6">
        {bullets.map((bullet, index) => (
          <li key={bullet}>
            <ScrollReveal
              direction={alternatingRowDirection(index)}
              delay={index * 0.08}
            >
              <p className="max-w-2xl text-lg leading-relaxed text-foreground">
                {bullet}
              </p>
            </ScrollReveal>
          </li>
        ))}
      </ul>
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
    <div className="mt-10 flex flex-col gap-8">
      {screenshots.map((screenshot, index) => (
        <ScrollReveal
          key={screenshot.src}
          direction={alternatingRowDirection(index)}
        >
          <DeviceFrame
            label={projectName}
            screenshot={screenshot}
            className="rounded-xl ring-1 ring-foreground/10"
          />
        </ScrollReveal>
      ))}
    </div>
  );
}

function CaseStudyTech({ tech }: { tech: readonly string[] }) {
  return (
    <section aria-labelledby="stack-heading" className="mt-16">
      <ScrollReveal>
        <h2
          id="stack-heading"
          className="font-mono text-xs tracking-[0.2em] text-accent uppercase"
        >
          Stack
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.08}>
        <ul className="mt-8 flex flex-wrap gap-2">
          {tech.map((name) => (
            <li key={name}>
              <Badge variant="outline" className="font-mono">
                {name}
              </Badge>
            </li>
          ))}
        </ul>
      </ScrollReveal>
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
    <ScrollReveal>
      <ul className="mt-12 flex flex-wrap gap-3">
        {liveUrl ? (
          <li>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                size: "lg",
                className: ctaClassName,
              })}
            >
              Live demo
            </a>
          </li>
        ) : null}
        {repoUrl ? (
          <li>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: ctaClassName,
              })}
            >
              GitHub
            </a>
          </li>
        ) : null}
      </ul>
    </ScrollReveal>
  );
}

export function CaseStudy({ project }: { project: Project }) {
  const [heroScreenshot, ...galleryScreenshots] = project.screenshots;

  return (
    <div className="mx-auto max-w-5xl px-gutter py-section-lg">
      <CaseStudyBackLink />
      <article>
        <CaseStudyHeader project={project} />
        <ScrollReveal>
          <DeviceFrame
            label={project.name}
            screenshot={heroScreenshot}
            priority
            className="rounded-xl ring-1 ring-foreground/10"
          />
        </ScrollReveal>
        <CaseStudyHighlights bullets={project.bullets} />
        <CaseStudyGallery
          projectName={project.name}
          screenshots={galleryScreenshots}
        />
        <CaseStudyTech tech={project.tech} />
        <CaseStudyLinks liveUrl={project.liveUrl} repoUrl={project.repoUrl} />
      </article>
    </div>
  );
}
