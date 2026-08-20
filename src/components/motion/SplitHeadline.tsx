"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { splitText, type SplitTextMode } from "@/lib/split-text";

type SplitHeadlineProps = {
  as?: "h1" | "h2" | "h3";
  children: string;
  /** Substring of `children` rendered in Fraunces italic mustard. */
  accent?: string;
  className?: string;
  id?: string;
};

const ACCENT_CLASS_NAME = "italic text-mustard";
const ACCENT_CLASS_NAMES = ACCENT_CLASS_NAME.split(" ");

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

function markAccentWords(words: HTMLSpanElement[], accent: string): void {
  const joined = words.map((word) => word.textContent ?? "").join(" ");
  const accentStart = joined.indexOf(accent);
  if (accentStart === -1) {
    return;
  }

  const accentEnd = accentStart + accent.length;
  let cursor = 0;

  words.forEach((word, index) => {
    if (index > 0) {
      cursor += 1;
    }

    const wordStart = cursor;
    const wordEnd = wordStart + (word.textContent?.length ?? 0);
    cursor = wordEnd;

    if (wordEnd > accentStart && wordStart < accentEnd) {
      word.classList.add(...ACCENT_CLASS_NAMES);
    }
  });
}

function HeadlineCopy({ text, accent }: { text: string; accent?: string }) {
  if (!accent) {
    return text;
  }

  const accentStart = text.indexOf(accent);
  if (accentStart === -1) {
    return text;
  }

  return (
    <>
      {text.slice(0, accentStart)}
      <em className={ACCENT_CLASS_NAME}>{accent}</em>
      {text.slice(accentStart + accent.length)}
    </>
  );
}

function animateSplitHeading(
  heading: HTMLElement,
  text: string,
  accent?: string,
): () => void {
  heading.setAttribute("aria-label", text);

  const mode = headingSplitMode();
  const split = splitText(heading, { mode });
  if (accent) {
    markAccentWords(split.words, accent);
  }
  playHeadlineIntro(mode === "letters" ? split.letters : split.words);

  return () => {
    split.revert();
    heading.removeAttribute("aria-label");
  };
}

export function SplitHeadline({
  as: Heading = "h1",
  children,
  accent,
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

      return animateSplitHeading(heading, children, accent);
    },
    { dependencies: [children, accent], revertOnUpdate: true },
  );

  return (
    <Heading ref={headingRef} id={id} className={className}>
      <HeadlineCopy text={children} accent={accent} />
    </Heading>
  );
}
