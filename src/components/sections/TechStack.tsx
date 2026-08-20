import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { skillGroups } from "@/content/skills";

export function TechStack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="mx-auto max-w-5xl px-gutter py-section-lg"
    >
      <ScrollReveal>
        <h2
          id="stack-heading"
          className="font-mono text-xs tracking-[0.2em] text-accent uppercase"
        >
          Tech Stack
        </h2>
      </ScrollReveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group, index) => (
          <ScrollReveal key={group.title} delay={index * 0.08} className="h-full">
            <Card className="h-full">
              <CardHeader>
                <h3 className="font-display text-sm font-semibold tracking-tight">
                  {group.title}
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-border px-2 py-1 font-mono text-xs tracking-wide text-muted-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
