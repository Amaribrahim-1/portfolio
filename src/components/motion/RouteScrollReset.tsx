"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

import { getLenisInstance, subscribeLenisInstance } from "@/lib/lenis-instance";
import { ScrollTrigger } from "@/lib/gsap";
import {
  interceptInPageHashClick,
  jumpToHash,
  jumpToTop,
} from "@/lib/scroll";

const HASH_JUMP_MAX_MS = 1600;
const HASH_JUMP_TARGET_TOP_PX = 200;

function hashTargetInView(hash: string): boolean {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  const target = document.getElementById(id);
  if (!target) return false;
  const top = target.getBoundingClientRect().top;
  return top > -24 && top < HASH_JUMP_TARGET_TOP_PX;
}

function syncToHash(hash: string): void {
  getLenisInstance()?.resize();
  ScrollTrigger.refresh();
  jumpToHash(hash);
}

/**
 * Lenis keeps its own scroll offset across client-side route changes, so
 * navigating to a shorter/taller page can land the viewport mid-page or at
 * the bottom instead of the top. Jump in `useLayoutEffect` (before paint)
 * so `/#work` does not flash the hero. Resize Lenis first — it still has
 * the previous route's page height and will clamp, then snap up on the
 * first wheel.
 *
 * Same-page hashes are owned by `scroll.ts`. Capture-phase click intercept
 * covers Navbar + Hero Work.
 */
export function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    document.addEventListener("click", interceptInPageHashClick, true);
    return () => {
      document.removeEventListener("click", interceptInPageHashClick, true);
    };
  }, []);

  useLayoutEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      jumpToTop();
      return;
    }

    syncToHash(hash);
  }, [pathname]);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    let cancelled = false;
    const started = performance.now();

    const jump = () => {
      if (cancelled) return;
      syncToHash(hash);
    };

    const tick = () => {
      if (cancelled) return;
      jump();
      if (hashTargetInView(hash)) return;
      if (performance.now() - started > HASH_JUMP_MAX_MS) return;
      window.requestAnimationFrame(tick);
    };

    const frame = window.requestAnimationFrame(tick);
    const unsubscribe = subscribeLenisInstance((lenis) => {
      if (lenis) jump();
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      unsubscribe();
    };
  }, [pathname]);

  return null;
}
