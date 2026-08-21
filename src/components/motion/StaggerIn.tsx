"use client";

import {
  Children,
  isValidElement,
  useRef,
  type ReactNode,
} from "react";
import { useGSAP } from "@gsap/react";

import { gsap, MOTION_MQ } from "@/lib/gsap";

type StaggerInProps = {
  children: ReactNode;
  className?: string;
};

const TWEEN_S = 0.45;
const STAGGER_S = 0.1;
const RISE_PX = 12;

function playStagger(root: HTMLElement): void {
  const items = gsap.utils.toArray<HTMLElement>(
    root.querySelectorAll("[data-stagger-in-item]"),
  );
  if (items.length === 0) {
    return;
  }

  gsap.from(items, {
    opacity: 0,
    y: RISE_PX,
    duration: TWEEN_S,
    stagger: STAGGER_S,
    ease: "power2.out",
    scrollTrigger: {
      trigger: root,
      start: "top 85%",
      once: true,
    },
    onComplete() {
      gsap.set(items, { clearProps: "transform,opacity" });
    },
  });
}

/**
 * One-shot fade + rise for a small set of children (section groups, not
 * every chip). Transform / opacity only. Reduced-motion renders the final
 * layout with no tween.
 */
export function StaggerIn({ children, className }: StaggerInProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) {
        return;
      }

      const media = gsap.matchMedia();
      media.add(MOTION_MQ.allow, () => {
        playStagger(root);
      });
    },
    { dependencies: [items.length], revertOnUpdate: true },
  );

  return (
    <div ref={rootRef} className={className}>
      {items.map((child, index) => (
        <div
          key={isValidElement(child) && child.key != null ? child.key : index}
          data-stagger-in-item
          className="h-full"
        >
          {child}
        </div>
      ))}
    </div>
  );
}
