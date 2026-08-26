"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { getLenisInstance } from "@/lib/lenis-instance";
import { interceptInPageHashClick, jumpToHash } from "@/lib/scroll";

/**
 * Lenis keeps its own scroll offset across client-side route changes, so
 * navigating to a shorter/taller page can land the viewport mid-page or at
 * the bottom instead of the top. Force an instant reset whenever the path
 * changes, unless the navigation targets an in-page anchor.
 *
 * Same-page hashes are owned by `scroll.ts` (Next.js Link otherwise jumps
 * past Lenis). Capture-phase click intercept covers Navbar + Hero Work.
 */
export function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    document.addEventListener("click", interceptInPageHashClick, true);
    return () => {
      document.removeEventListener("click", interceptInPageHashClick, true);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        jumpToHash(hash);
      });
      return () => window.cancelAnimationFrame(frame);
    }

    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
