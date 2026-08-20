import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Cv } from "@/components/sections/Cv";
import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TechStack />

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

      <Cv />
      <Contact />
    </>
  );
}
