import { profile } from "@/content/profile";

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
              className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
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
                className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
