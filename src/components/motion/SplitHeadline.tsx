"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { splitText, type SplitTextMode } from "@/lib/split-text";

type SplitHeadlineProps = {
  as?: "h1" | "h2" | "h3";
  children: string;
  className?: string;
  id?: string;
};

const DESKTOP_HEADING_MQ = "(min-width: 48rem)";
const INTRO_TWEEN_S = 0.5;
const INTRO_MAX_S = 0.8;
const INTRO_RISE_PX = 12;

function headingSplitMode(): SplitTextMode {
  return window.matchMedia(DESKTOP_HEADING_MQ).matches ? "letters" : "words";
}

function introStagger(targetCount: number): number {
  if (targetCount <= 1) {
    return 0;
  }

  return (INTRO_MAX_S - INTRO_TWEEN_S) / (targetCount - 1);
}

function playHeadlineIntro(targets: HTMLElement[]): void {
  if (targets.length === 0) {
    return;
  }

  gsap.from(targets, {
    opacity: 0,
    y: INTRO_RISE_PX,
    duration: INTRO_TWEEN_S,
    stagger: introStagger(targets.length),
    ease: "power2.out",
    onComplete() {
      gsap.set(targets, { clearProps: "transform,opacity" });
    },
  });
}

function animateSplitHeading(heading: HTMLElement, text: string): () => void {
  heading.setAttribute("aria-label", text);

  const mode = headingSplitMode();
  const split = splitText(heading, { mode });
  playHeadlineIntro(mode === "letters" ? split.letters : split.words);

  return () => {
    split.revert();
    heading.removeAttribute("aria-label");
  };
}

export function SplitHeadline({
  as: Heading = "h1",
  children,
  className,
  id,
}: SplitHeadlineProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const heading = headingRef.current;
      if (!heading || prefersReducedMotion()) {
        return;
      }

      return animateSplitHeading(heading, children);
    },
    { dependencies: [children], revertOnUpdate: true },
  );

  return (
    <Heading ref={headingRef} id={id} className={className}>
      {children}
    </Heading>
  );
}
