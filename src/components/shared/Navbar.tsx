"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type RefObject,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavLink } from "@/content/profile";
import { hashFromHref, scrollPageToTop } from "@/lib/scroll";
import { cn, focusRingClassName } from "@/lib/utils";

const linkClassName = cn(
  "inline-flex min-h-11 items-center font-mono text-xs tracking-[0.15em] text-sage uppercase transition-colors duration-200 hover:text-mustard md:min-h-0",
  focusRingClassName,
);

const SECTION_SPY_ROOT_MARGIN = "-28% 0px -68% 0px";

type NavbarProps = {
  name: string;
  links: readonly NavLink[];
};

export function Navbar({ name, links }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const activeHref = useActiveNavHref(pathname, links);

  const close = useCallback(() => setOpen(false), []);

  useCloseOnOutsidePointer(navRef, open, close);

  const goHome = (event: MouseEvent<HTMLAnchorElement>) => {
    close();
    if (pathname === "/") {
      event.preventDefault();
      scrollPageToTop();
    }
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-20 flex justify-center px-3 pt-3">
      <nav
        ref={navRef}
        aria-label="Primary"
        className={cn(
          "pointer-events-auto w-full max-w-5xl border border-cream/20 bg-forest px-4 py-2.5 shadow-[0_12px_40px_color-mix(in_oklab,black_28%,transparent)] md:w-auto md:rounded-full md:px-5",
          open ? "rounded-2xl" : "rounded-full",
        )}
        onKeyDown={(event) => {
          if (event.key === "Escape") close();
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              onClick={goHome}
              className={cn(
                "font-display truncate text-sm font-semibold tracking-tight text-cream transition-colors duration-200 hover:text-mustard",
                focusRingClassName,
              )}
            >
              {name}
            </Link>

            <button
              type="button"
              className={cn(
                "inline-flex size-11 shrink-0 items-center justify-center rounded-full text-cream transition-colors duration-200 hover:text-mustard md:hidden",
                focusRingClassName,
                "focus-visible:rounded-full",
              )}
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((isOpen) => !isOpen)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <MenuIcon open={open} />
            </button>
          </div>

          <ul
            id={menuId}
            className={cn(
              "flex-col gap-1 pt-2 md:flex-row md:items-center md:gap-6 md:pt-0",
              open ? "flex" : "hidden md:flex",
            )}
          >
            {links.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(linkClassName, isActive && "text-mustard")}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}

function routeActiveHref(pathname: string): string | null {
  if (pathname === "/projects" || pathname.startsWith("/projects/")) {
    return "/#work";
  }
  if (pathname === "/cv" || pathname.startsWith("/cv/")) {
    return "/#contact";
  }
  return null;
}

function useActiveNavHref(
  pathname: string,
  links: readonly NavLink[],
): string | null {
  const routeHref = routeActiveHref(pathname);
  const sectionId = useActiveSectionId(links, pathname === "/" && !routeHref);

  if (routeHref) return routeHref;
  if (!sectionId) return null;

  return links.find((link) => hashFromHref(link.href) === `#${sectionId}`)?.href ?? null;
}

function useActiveSectionId(
  links: readonly NavLink[],
  enabled: boolean,
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActiveId(null);
      return;
    }

    const elements = spyElements(links);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const nextEntry = leadingSpyEntry(entries);
        if (!nextEntry) return;
        setActiveId(nextEntry.target.id);
      },
      { rootMargin: SECTION_SPY_ROOT_MARGIN, threshold: 0 },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [enabled, links]);

  return enabled ? activeId : null;
}

function spyElements(links: readonly NavLink[]): HTMLElement[] {
  const ids = [
    "hero",
    ...links.flatMap((link) => {
      const hash = hashFromHref(link.href);
      return hash ? [hash.slice(1)] : [];
    }),
  ];

  return ids
    .map((id) => document.getElementById(id))
    .filter((node): node is HTMLElement => node !== null);
}

function leadingSpyEntry(
  entries: IntersectionObserverEntry[],
): IntersectionObserverEntry | undefined {
  const visible = entries.filter((entry) => entry.isIntersecting);
  if (visible.length === 0) return undefined;
  visible.sort(
    (left, right) => left.boundingClientRect.top - right.boundingClientRect.top,
  );
  return visible[0];
}

function useCloseOnOutsidePointer(
  navRef: RefObject<HTMLElement | null>,
  open: boolean,
  close: () => void,
): void {
  useEffect(() => {
    if (!open) return;

    const closeIfOutside = (event: PointerEvent) => {
      const nav = navRef.current;
      const pointerTarget = event.target;
      if (!nav || !(pointerTarget instanceof Node)) return;
      if (nav.contains(pointerTarget)) return;
      close();
    };

    document.addEventListener("pointerdown", closeIfOutside);
    return () => document.removeEventListener("pointerdown", closeIfOutside);
  }, [close, navRef, open]);
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative block size-5">
      <span
        className={cn(
          "absolute inset-x-1 h-0.5 origin-center bg-current transition-transform duration-200",
          open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[5px]",
        )}
      />
      <span
        className={cn(
          "absolute inset-x-1 top-1/2 h-0.5 -translate-y-1/2 bg-current transition-opacity duration-200",
          open && "opacity-0",
        )}
      />
      <span
        className={cn(
          "absolute inset-x-1 h-0.5 origin-center bg-current transition-transform duration-200",
          open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-[5px]",
        )}
      />
    </span>
  );
}
