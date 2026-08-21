"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

import { getLenisInstance } from "@/lib/lenis-instance";
import { cn, focusRingClassName } from "@/lib/utils";

function focusMain(): void {
  document.getElementById("main")?.focus();
}

function scrollPageToTop(): void {
  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.15, onComplete: focusMain });
    return;
  }

  window.scrollTo({ top: 0, behavior: "auto" });
  focusMain();
}

const buttonClassName = cn(
  "fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex size-11 items-center justify-center rounded-full border border-cream/20 bg-forest text-cream shadow-[0_12px_40px_color-mix(in_oklab,black_28%,transparent)] transition-[opacity,transform,color] duration-200 hover:text-mustard md:right-6",
  focusRingClassName,
  "focus-visible:rounded-full",
);

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // A sentinel pinned at the 50vh mark from the page top: once it scrolls
  // out of view (up), the user has left the first screen. IntersectionObserver
  // lets the browser do this off the main thread instead of a scroll listener
  // that setStates on every frame.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[50vh] h-px w-px"
      />
      <button
        type="button"
        aria-label="Back to top"
        aria-hidden={!visible}
        inert={!visible}
        tabIndex={visible ? 0 : -1}
        onClick={scrollPageToTop}
        className={cn(
          buttonClassName,
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        <ArrowUp aria-hidden="true" className="size-4" />
      </button>
    </>
  );
}
