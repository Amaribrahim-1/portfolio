import { profile } from "@/content/profile";
import { cn, focusRingClassName } from "@/lib/utils";

const linkClassName = cn(
  "font-mono text-xs tracking-[0.15em] text-sage uppercase transition-colors duration-200 hover:text-mustard",
  focusRingClassName,
  "focus-visible:text-mustard",
);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream/10 bg-forest text-cream">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-3 px-gutter py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs tracking-[0.15em] text-sage uppercase">
          © {year} {profile.name}
        </p>
        <ul className="flex items-center gap-5">
          <li>
            <a href={`mailto:${profile.email}`} className={linkClassName}>
              Email
            </a>
          </li>
          {profile.socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className={linkClassName}
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
