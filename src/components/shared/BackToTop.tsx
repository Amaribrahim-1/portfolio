"use client";

import { useEffect, useState } from "react";
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

function hasLeftFirstScreen(): boolean {
  return window.scrollY > window.innerHeight * 0.5;
}

const buttonClassName = cn(
  "fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex size-11 items-center justify-center rounded-full border border-cream/20 bg-forest text-cream shadow-[0_12px_40px_color-mix(in_oklab,black_28%,transparent)] transition-[opacity,transform,color] duration-200 hover:text-mustard md:right-6",
  focusRingClassName,
  "focus-visible:rounded-full",
);

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => {
      setVisible(hasLeftFirstScreen());
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
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
  );
}
