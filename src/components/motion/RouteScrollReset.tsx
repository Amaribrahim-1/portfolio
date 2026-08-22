"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { getLenisInstance } from "@/lib/lenis-instance";

/**
 * Lenis keeps its own scroll offset across client-side route changes, so
 * navigating to a shorter/taller page can land the viewport mid-page or at
 * the bottom instead of the top. Force an instant reset whenever the path
 * changes, unless the navigation targets an in-page anchor (Lenis' own
 * anchor handling owns that case).
 */
export function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;

    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
