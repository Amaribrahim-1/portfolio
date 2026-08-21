"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import type { SkillBrandIcon } from "@/content/skill-icons";
import { gsap, MOTION_MQ } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type IconStripProps = {
  icons: SkillBrandIcon[];
  className?: string;
};

function travelX(track: HTMLElement, viewport: HTMLElement): number {
  return Math.min(0, viewport.clientWidth - track.scrollWidth);
}

function scrubTrack(
  track: HTMLElement,
  viewport: HTMLElement,
  section: HTMLElement,
): void {
  gsap.fromTo(
    track,
    { x: 0 },
    {
      x: () => travelX(track, viewport),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    },
  );
}

function BrandMark({ skill, path }: SkillBrandIcon) {
  return (
    <li className="flex w-28 shrink-0 flex-col items-center gap-2">
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="size-9 text-forest/70 md:size-10"
        aria-hidden="true"
      >
        <path d={path} fill="currentColor" />
      </svg>
      <span className="w-full truncate text-center font-mono text-[10px] tracking-wide text-forest/55">
        {skill}
      </span>
    </li>
  );
}

/**
 * One row of brand marks from `content/skills.ts`. Horizontal translateX is
 * scrubbed to the enclosing Tech Stack section — one pass, no loop.
 * Reduced-motion keeps the row static at x = 0.
 */
export function IconStrip({ icons, className }: IconStripProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) {
        return;
      }

      const section = viewport.closest("section");
      if (!section) {
        return;
      }

      const media = gsap.matchMedia();
      media.add(MOTION_MQ.allow, () => {
        scrubTrack(track, viewport, section);
      });
    },
    { dependencies: [icons.length], revertOnUpdate: true },
  );

  if (icons.length === 0) {
    return null;
  }

  return (
    <div
      ref={viewportRef}
      aria-hidden="true"
      className={cn(
        "overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_1.5rem,black_calc(100%-1.5rem),transparent)]",
        className,
      )}
    >
      <ul
        ref={trackRef}
        className="flex w-max items-end gap-8 py-1 md:gap-10"
      >
        {icons.map((icon) => (
          <BrandMark key={icon.skill} skill={icon.skill} path={icon.path} />
        ))}
      </ul>
    </div>
  );
}
