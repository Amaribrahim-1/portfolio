import Link from "next/link";

import { profile } from "@/content/profile";
import { cn, focusRingClassName } from "@/lib/utils";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "Stack" },
  { href: "/#work", label: "Work" },
  { href: "/#cv", label: "CV" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-gutter py-4"
      >
        <Link
          href="/"
          className={cn(
            "font-display text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent",
            focusRingClassName,
          )}
        >
          {profile.name}
        </Link>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-accent",
                  focusRingClassName,
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
