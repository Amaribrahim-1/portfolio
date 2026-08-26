import { getLenisInstance } from "@/lib/lenis-instance";

const HASH_SCROLL_MIN_S = 1.2;
const HASH_SCROLL_MAX_S = 2.6;
const HASH_SCROLL_PX_PER_S = 1800;
const SKIP_HASH = "#main";

export function focusMain(): void {
  document.getElementById("main")?.focus();
}

export function scrollPageToTop(): void {
  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(0, {
      duration: durationForDistance(window.scrollY),
      onComplete: focusMain,
    });
    return;
  }

  window.scrollTo({ top: 0, behavior: "auto" });
  focusMain();
}

export function hashFromHref(href: string): string | null {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1 || hashIndex === href.length - 1) {
    return null;
  }

  return href.slice(hashIndex);
}

export function scrollToHash(hash: string): void {
  const target = elementForHash(hash);
  if (!target) return;

  smoothScrollTo(target);
  syncLocationHash(hash);
}

export function jumpToHash(hash: string): void {
  const target = elementForHash(hash);
  if (!target) return;

  instantScrollTo(target);
}

export function interceptInPageHashClick(event: MouseEvent): void {
  if (event.defaultPrevented || !isUnmodifiedLeftClick(event)) return;

  const anchor = hashAnchorFromEvent(event);
  if (!anchor || shouldSkipHashIntercept(anchor)) return;
  if (!isCurrentPathHashLink(anchor)) return;

  const hash = new URL(anchor.href, window.location.href).hash;
  if (!elementForHash(hash)) return;

  event.preventDefault();
  scrollToHash(hash);
}

function elementForHash(hash: string): HTMLElement | null {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return null;
  return document.getElementById(id);
}

function durationForDistance(distancePx: number): number {
  const seconds = Math.abs(distancePx) / HASH_SCROLL_PX_PER_S;
  return Math.min(HASH_SCROLL_MAX_S, Math.max(HASH_SCROLL_MIN_S, seconds));
}

function smoothScrollTo(target: HTMLElement): void {
  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(target, {
      duration: durationForDistance(target.getBoundingClientRect().top),
    });
    return;
  }

  target.scrollIntoView();
}

function instantScrollTo(target: HTMLElement): void {
  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(target, { immediate: true });
    return;
  }

  target.scrollIntoView();
}

function syncLocationHash(hash: string): void {
  const nextHash = hash.startsWith("#") ? hash : `#${hash}`;
  if (window.location.hash === nextHash) return;
  window.history.replaceState(null, "", nextHash);
}

function isUnmodifiedLeftClick(event: MouseEvent): boolean {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

function hashAnchorFromEvent(event: MouseEvent): HTMLAnchorElement | null {
  const eventTarget = event.target;
  if (!(eventTarget instanceof Element)) return null;
  return eventTarget.closest("a[href]");
}

function shouldSkipHashIntercept(anchor: HTMLAnchorElement): boolean {
  if (anchor.hasAttribute("download")) return true;
  if (anchor.target !== "" && anchor.target !== "_self") return true;

  const hash = new URL(anchor.href, window.location.href).hash;
  return hash === SKIP_HASH;
}

function isCurrentPathHashLink(anchor: HTMLAnchorElement): boolean {
  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return false;
  if (url.pathname !== window.location.pathname) return false;
  return url.hash.length > 1;
}
