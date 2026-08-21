import { StickyStack } from "@/components/motion/StickyStack";
import { PortraitFrame } from "@/components/shared/PortraitFrame";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

const ABOUT_CARD_TONES = [
  "bg-forest text-cream shadow-[0_24px_60px_color-mix(in_oklab,black_22%,transparent)]",
  "bg-cream text-forest ring-1 ring-forest/15 shadow-[0_24px_60px_color-mix(in_oklab,black_12%,transparent)]",
  "bg-sage text-forest shadow-[0_24px_60px_color-mix(in_oklab,black_16%,transparent)]",
] as const;

function cardIndexLabel(index: number): string {
  return String(index + 1).padStart(2, "0");
}

function AboutCard({
  row,
  index,
}: {
  row: string;
  index: number;
}) {
  const isFirst = index === 0;

  return (
    <article
      className={cn(
        "relative flex min-h-[65svh] flex-col justify-start overflow-visible rounded-[1.75rem] p-8 md:min-h-[72svh] md:p-12 lg:p-16",
        ABOUT_CARD_TONES[index % ABOUT_CARD_TONES.length],
      )}
    >
      <div className={cn(isFirst && "md:max-w-[68%]")}>
        <p
          aria-hidden="true"
          className="font-display text-5xl font-semibold tracking-tight text-mustard md:text-7xl"
        >
          {cardIndexLabel(index)}
        </p>
        <p className="mt-6 font-display text-2xl font-medium tracking-tight text-pretty md:text-3xl lg:text-4xl lg:leading-snug">
          {row}
        </p>
      </div>

      {isFirst ? (
        <div className="mt-10 self-end md:absolute md:-right-6 md:-bottom-8 md:mt-0 lg:-right-8 lg:-bottom-10">
          <PortraitFrame className="w-36 rotate-2 sm:w-44 md:w-48" />
        </div>
      ) : null}
    </article>
  );
}

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-cream text-forest"
    >
      <div className="mx-auto max-w-5xl px-gutter py-section-lg">
        <h2
          id="about-heading"
          className="font-mono text-xs tracking-[0.2em] text-mustard uppercase"
        >
          About
        </h2>

        <StickyStack className="mt-10">
          {profile.aboutRows.map((row, index) => (
            <AboutCard key={row} row={row} index={index} />
          ))}
        </StickyStack>
      </div>
    </section>
  );
}
