import { getLenisInstance } from "@/lib/lenis-instance";

export function focusMain(): void {
  document.getElementById("main")?.focus();
}

export function scrollPageToTop(): void {
  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.15, onComplete: focusMain });
    return;
  }

  window.scrollTo({ top: 0, behavior: "auto" });
  focusMain();
}
