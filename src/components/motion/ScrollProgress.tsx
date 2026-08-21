"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { gsap, MOTION_MQ } from "@/lib/gsap";

function pageScrollProgress(): number {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) {
    return 0;
  }
  return Math.min(1, Math.max(0, window.scrollY / max));
}

function scrubPageProgress(bar: HTMLElement): void {
  gsap.to(bar, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      start: 0,
      end: "max",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
}

function bindNativeProgress(bar: HTMLElement): () => void {
  const sync = () => {
    gsap.set(bar, { scaleX: pageScrollProgress() });
  };

  sync();
  window.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync);
  return () => {
    window.removeEventListener("scroll", sync);
    window.removeEventListener("resize", sync);
  };
}

/**
 * Thin mustard page-scroll meter. Transform only. Reduced-motion keeps the
 * meter (it is status, not decoration) but updates it with native scroll
 * instead of a ScrollTrigger scrub.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const bar = barRef.current;
      if (!bar) {
        return;
      }

      gsap.set(bar, { scaleX: 0, transformOrigin: "0% 50%" });

      const media = gsap.matchMedia();
      media.add(MOTION_MQ.allow, () => {
        scrubPageProgress(bar);
      });
      media.add(MOTION_MQ.reduce, () => bindNativeProgress(bar));
    },
    { revertOnUpdate: true },
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-forest/55"
    >
      <div ref={barRef} className="h-full w-full origin-left bg-mustard" />
    </div>
  );
}
