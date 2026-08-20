"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";

import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ParallaxLayerProps = {
  children: ReactNode;
  /** Vertical travel in pixels across the root's scroll range. Positive moves down. */
  offset?: number;
  /** Opacity from→to across the same range. Omit to leave opacity unchanged. */
  opacity?: readonly [number, number];
  className?: string;
};

/**
 * Hero-only signature moment: scrubs transform (and optional opacity) as the
 * user scrolls past the nearest `[data-parallax-root]`. Do not reuse outside
 * the Hero per motion-performance-budget.mdc.
 */
export function ParallaxLayer({
  children,
  offset = 80,
  opacity,
  className,
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const opacityFrom = opacity?.[0];
  const opacityTo = opacity?.[1];

  useGSAP(
    () => {
      const layer = layerRef.current;
      if (!layer || prefersReducedMotion()) {
        return;
      }

      const trigger = layer.closest("[data-parallax-root]") ?? layer;
      const from: gsap.TweenVars = { y: 0 };
      const to: gsap.TweenVars = {
        y: offset,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      };

      if (opacityFrom !== undefined && opacityTo !== undefined) {
        from.opacity = opacityFrom;
        to.opacity = opacityTo;
      }

      gsap.fromTo(layer, from, to);
    },
    { dependencies: [offset, opacityFrom, opacityTo], revertOnUpdate: true },
  );

  return (
    <div ref={layerRef} className={cn(className)}>
      {children}
    </div>
  );
}
