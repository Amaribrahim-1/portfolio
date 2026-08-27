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
const IDLE_START_TIMEOUT_MS = 200;

function startSyncedLenis() {
  // Anchors stay off: Next.js Link swallows `/#section` clicks, so in-page
  // hash scrolling is owned by `src/lib/scroll.ts` instead of Lenis.
  const lenis = new Lenis({ stopInertiaOnNavigate: true });
  lenis.resize();
  lenis.scrollTo(window.scrollY, { immediate: true, force: true });
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

/**
 * Lenis/GSAP ticker init competes with hydration for main-thread time right
 * after load. Deferring it to idle (falling back to a short timeout) keeps
 * that cost off the critical path without delaying it long enough for a
 * user to notice un-smoothed scroll.
 */
function startSyncedLenisWhenIdle(
  onStart: (stop: () => void) => void,
): () => void {
  let cancelled = false;
  let stopLenis: (() => void) | undefined;

  const run = () => {
    if (cancelled) {
      return;
    }
    stopLenis = startSyncedLenis();
    onStart(stopLenis);
  };

  if (typeof window.requestIdleCallback === "function") {
    const handle = window.requestIdleCallback(run, {
      timeout: IDLE_START_TIMEOUT_MS,
    });
    return () => {
      cancelled = true;
      window.cancelIdleCallback(handle);
      stopLenis?.();
    };
  }

  const timeoutId = window.setTimeout(run, IDLE_START_TIMEOUT_MS);
  return () => {
    cancelled = true;
    window.clearTimeout(timeoutId);
    stopLenis?.();
  };
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    let stopLenis: (() => void) | undefined;
    let cancelStart: (() => void) | undefined;

    const unsubscribe = subscribeReducedMotion((reduced) => {
      cancelStart?.();
      stopLenis?.();
      stopLenis = undefined;
      cancelStart = reduced
        ? undefined
        : startSyncedLenisWhenIdle((stop) => {
            stopLenis = stop;
          });
    });

    return () => {
      unsubscribe();
      cancelStart?.();
      stopLenis?.();
    };
  }, []);

  return children;
}
