"use client";

import { useId, useState } from "react";
import Link from "next/link";

import type { NavLink } from "@/content/profile";
import { cn, focusRingClassName } from "@/lib/utils";

const linkClassName = cn(
  "inline-flex min-h-11 items-center font-mono text-xs tracking-[0.15em] text-sage uppercase transition-colors duration-200 hover:text-mustard md:min-h-0",
  focusRingClassName,
);

type NavbarProps = {
  name: string;
  links: readonly NavLink[];
};

export function Navbar({ name, links }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  const close = () => setOpen(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-20 flex justify-center px-3 pt-3">
      <nav
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
              onClick={close}
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
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={close} className={linkClassName}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
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
