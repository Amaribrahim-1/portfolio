import Link from "next/link";

import { profile } from "@/content/profile";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#work", label: "Work" },
  { href: "#cv", label: "CV" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl items-center justify-between px-gutter py-4"
      >
        <Link
          href="/"
          className="font-display text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
        >
          {profile.name}
        </Link>
        <ul className="flex items-center gap-5 sm:gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
