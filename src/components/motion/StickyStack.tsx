"use client";

import {
  Children,
  isValidElement,
  useRef,
  type ReactNode,
} from "react";
import { useGSAP } from "@gsap/react";

import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type StickyStackProps = {
  children: ReactNode;
  className?: string;
};

const SCALE_END = 0.85;

function stickyTopPx(element: HTMLElement): number {
  const parsed = Number.parseFloat(getComputedStyle(element).top);
  return Number.isFinite(parsed) ? parsed : 0;
}

function scrubPreviousCards(root: HTMLElement): void {
  const items = gsap.utils.toArray<HTMLElement>(
    root.querySelectorAll("[data-sticky-stack-item]"),
  );

  items.forEach((item, index) => {
    const card = item.querySelector("[data-sticky-stack-card]");
    const next = items[index + 1];
    if (!(card instanceof HTMLElement) || !next) {
      return;
    }

    gsap.fromTo(
      card,
      { scale: 1 },
      {
        scale: SCALE_END,
        transformOrigin: "50% 0%",
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: () => `top ${stickyTopPx(item)}px`,
          endTrigger: next,
          end: () => `top ${stickyTopPx(next)}px`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );
  });
}

/**
 * Stacks children as sticky cards. As the next card covers the previous one,
 * the previous scales 1 → 0.85 (transform only). Reduced-motion skips both
 * sticky positioning and the scale scrub.
 */
export function StickyStack({ children, className }: StickyStackProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) {
        return;
      }

      scrubPreviousCards(root);
    },
    { dependencies: [items.length], revertOnUpdate: true },
  );

  return (
    <div ref={rootRef} className={cn("flex flex-col gap-4", className)}>
      {items.map((child, index) => (
        <div
          key={isValidElement(child) && child.key != null ? child.key : index}
          data-sticky-stack-item
          style={{ zIndex: index + 1 }}
          className="sticky top-24 motion-reduce:relative motion-reduce:top-auto"
        >
          <div data-sticky-stack-card className="origin-top">
            {child}
          </div>
        </div>
      ))}
    </div>
  );
}
