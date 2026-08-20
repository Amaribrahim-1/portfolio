"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

type SmoothScrollProps = {
  children: ReactNode;
};

const GSAP_LAG_SMOOTHING_THRESHOLD_MS = 500;
const GSAP_LAG_SMOOTHING_ADJUSTED_MS = 33;

function startSyncedLenis() {
  const lenis = new Lenis({ anchors: true });

  lenis.on("scroll", ScrollTrigger.update);

  const syncLenisToTicker = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(syncLenisToTicker);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(syncLenisToTicker);
    gsap.ticker.lagSmoothing(
      GSAP_LAG_SMOOTHING_THRESHOLD_MS,
      GSAP_LAG_SMOOTHING_ADJUSTED_MS,
    );
    lenis.destroy();
  };
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    return startSyncedLenis();
  }, []);

  return children;
}
