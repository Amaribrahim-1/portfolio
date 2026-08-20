import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";

export default function Home() {
  return (
    <>
      <section
        id="hero"
        className="flex min-h-[80vh] flex-col items-center justify-center gap-4 px-gutter py-section text-center"
      >
        <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
          {profile.role}
        </p>
        <h1 className="max-w-2xl font-display text-4xl font-semibold text-foreground sm:text-6xl">
          {profile.tagline}
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Hero section lands in Phase 2 — layout, fonts, and motion primitives
          are wired end-to-end.
        </p>
      </section>

      <section
        id="about"
        className="mx-auto max-w-3xl px-gutter py-section-lg"
      >
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            About
          </p>
          <p className="mt-4 text-lg text-foreground">{profile.about}</p>
        </ScrollReveal>
      </section>

      <section
        id="stack"
        className="mx-auto max-w-3xl px-gutter py-section-lg"
      >
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            Tech Stack
          </p>
        </ScrollReveal>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {skillGroups.map((group, index) => (
            <ScrollReveal key={group.title} delay={index * 0.08}>
              <h3 className="font-display text-sm font-semibold text-foreground">
                {group.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {group.skills.join(" · ")}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section id="work" className="mx-auto max-w-3xl px-gutter py-section-lg">
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            Work
          </p>
        </ScrollReveal>
        <div className="mt-8 space-y-8">
          {projects.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.08}>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {project.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {project.tagline}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section id="cv" className="mx-auto max-w-3xl px-gutter py-section-lg">
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            CV
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            CV/Resume section lands in Phase 2.
          </p>
        </ScrollReveal>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-3xl px-gutter py-section-lg"
      >
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            Contact
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Reach out at{" "}
            <a href={`mailto:${profile.email}`} className="text-accent">
              {profile.email}
            </a>
            .
          </p>
        </ScrollReveal>
      </section>
    </>
  );
}
