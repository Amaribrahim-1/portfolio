import { profile } from "@/content/profile";
import { cn, focusRingClassName } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-gutter py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-muted-foreground">
          © {year} {profile.name}
        </p>
        <ul className="flex items-center gap-5">
          <li>
            <a
              href={`mailto:${profile.email}`}
              className={cn(
                "font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-accent",
                focusRingClassName,
              )}
            >
              Email
            </a>
          </li>
          {profile.socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(
                  "font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-accent",
                  focusRingClassName,
                )}
              >
                {social.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
