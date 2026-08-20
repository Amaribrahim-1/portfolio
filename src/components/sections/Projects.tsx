import Link from "next/link";

import { DeviceFrame } from "@/components/shared/DeviceFrame";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { projects, type Project, type ProjectStatus } from "@/content/projects";

function statusBadgeVariant(status: ProjectStatus) {
  return status === "live" ? "default" : "outline";
}

function ProjectTechTags({ tech }: { tech: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tech.map((name) => (
        <li key={name}>
          <Badge variant="outline" className="font-mono">
            {name}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

function ProjectCardBody({ project }: { project: Project }) {
  return (
    <Card className="h-full pt-0 transition-[box-shadow] duration-200 group-hover:ring-accent/40">
      <DeviceFrame
        label={project.name}
        screenshot={project.screenshots[0]}
        className="rounded-t-xl"
      />
      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold tracking-tight">
            {project.name}
          </h3>
          <Badge
            variant={statusBadgeVariant(project.status)}
            className="font-mono"
          >
            {project.statusLabel}
          </Badge>
        </div>
        <CardDescription>{project.tagline}</CardDescription>
      </CardHeader>
      <CardContent>
        <ProjectTechTags tech={project.tech} />
      </CardContent>
    </Card>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const className =
    "group block h-full rounded-xl focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";

  if (project.hasCaseStudy) {
    return (
      <Link href={`/projects/${project.slug}`} className={className}>
        <ProjectCardBody project={project} />
      </Link>
    );
  }

  const href = project.liveUrl ?? project.repoUrl;

  if (!href) {
    return <ProjectCardBody project={project} />;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <span className="sr-only">
        {project.name} live demo (opens in a new tab)
      </span>
      <ProjectCardBody project={project} />
    </a>
  );
}

export function Projects() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="mx-auto max-w-5xl px-gutter py-section-lg"
    >
      <ScrollReveal>
        <h2
          id="work-heading"
          className="font-mono text-xs tracking-[0.2em] text-accent uppercase"
        >
          Projects
        </h2>
      </ScrollReveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ScrollReveal
            key={project.slug}
            delay={index * 0.08}
            className="h-full"
          >
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
