"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import { gsap, ScrollTrigger, subscribeReducedMotion } from "@/lib/gsap";
import { setLenisInstance } from "@/lib/lenis-instance";

type SmoothScrollProps = {
  children: ReactNode;
};

const GSAP_LAG_SMOOTHING_THRESHOLD_MS = 500;
const GSAP_LAG_SMOOTHING_ADJUSTED_MS = 33;

function startSyncedLenis() {
  const lenis = new Lenis({ anchors: true });
  setLenisInstance(lenis);

  lenis.on("scroll", ScrollTrigger.update);

  const syncLenisToTicker = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(syncLenisToTicker);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(syncLenisToTicker);
    setLenisInstance(null);
    gsap.ticker.lagSmoothing(
      GSAP_LAG_SMOOTHING_THRESHOLD_MS,
      GSAP_LAG_SMOOTHING_ADJUSTED_MS,
    );
    lenis.destroy();
  };
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    let stopLenis: (() => void) | undefined;

    const unsubscribe = subscribeReducedMotion((reduced) => {
      stopLenis?.();
      stopLenis = reduced ? undefined : startSyncedLenis();
    });

    return () => {
      unsubscribe();
      stopLenis?.();
    };
  }, []);

  return children;
}
