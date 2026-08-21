import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { StaggerIn } from "@/components/motion/StaggerIn";
import { skillGroups, type SkillGroup } from "@/content/skills";
import { cn } from "@/lib/utils";

const STACK_HEADING_ACCENT = "Stack";

const STACK_CARD_TONES = [
  "bg-forest text-cream shadow-[0_24px_60px_color-mix(in_oklab,black_22%,transparent)]",
  "bg-sage text-forest shadow-[0_24px_60px_color-mix(in_oklab,black_16%,transparent)]",
  "bg-cream text-forest ring-1 ring-forest/15 shadow-[0_24px_60px_color-mix(in_oklab,black_12%,transparent)]",
  "bg-[color-mix(in_oklab,var(--forest)_72%,var(--cream))] text-cream ring-1 ring-cream/15 shadow-[0_24px_60px_color-mix(in_oklab,black_28%,transparent)]",
] as const;

function cardIndexLabel(index: number): string {
  return String(index + 1).padStart(2, "0");
}

function SkillGroupCard({
  group,
  index,
}: {
  group: SkillGroup;
  index: number;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-[1.75rem] p-8 md:p-10",
        STACK_CARD_TONES[index % STACK_CARD_TONES.length],
      )}
    >
      <p
        aria-hidden="true"
        className="font-display text-4xl font-semibold tracking-tight text-mustard md:text-5xl"
      >
        {cardIndexLabel(index)}
      </p>
      <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight md:text-3xl">
        {group.title}
      </h3>
      <ul className="mt-6 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-md border border-current/20 px-2.5 py-1 font-mono text-xs tracking-wide text-current/75"
          >
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function TechStack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="bg-cream text-forest"
    >
      <div className="mx-auto max-w-5xl px-gutter py-section-lg">
        <SplitHeadline
          as="h2"
          id="stack-heading"
          accent={STACK_HEADING_ACCENT}
          className="font-display text-4xl font-semibold tracking-tight text-pretty md:text-5xl lg:text-6xl"
        >
          Tech Stack
        </SplitHeadline>

        <StaggerIn className="mt-10 grid gap-4 sm:grid-cols-2 lg:gap-6">
          {skillGroups.map((group, index) => (
            <SkillGroupCard
              key={group.title}
              group={group}
              index={index}
            />
          ))}
        </StaggerIn>
      </div>
    </section>
  );
}
