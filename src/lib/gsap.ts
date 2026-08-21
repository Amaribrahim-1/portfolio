import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/** Shared media queries for motion primitives. 48rem = Tailwind `md`. */
export const MOTION_MQ = {
  allow: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 48rem)",
} as const;

export function prefersReducedMotion(): boolean {
  // SSR has no OS preference; callers re-check in an effect after mount.
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(MOTION_MQ.reduce).matches;
}

export function subscribeReducedMotion(
  listener: (reduced: boolean) => void,
): () => void {
  const media = window.matchMedia(MOTION_MQ.reduce);
  const notify = () => {
    listener(media.matches);
  };

  notify();
  media.addEventListener("change", notify);
  return () => {
    media.removeEventListener("change", notify);
  };
}
