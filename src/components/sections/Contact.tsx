import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { profile } from "@/content/profile";

const ctaClassName = "h-11 px-5";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-5xl px-gutter py-section-lg"
    >
      <ScrollReveal>
        <h2
          id="contact-heading"
          className="font-mono text-xs tracking-[0.2em] text-accent uppercase"
        >
          Contact
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <div className="mt-10 flex max-w-xl flex-col gap-8">
          <a
            href={`mailto:${profile.email}`}
            className="font-display text-xl font-semibold tracking-tight break-all text-foreground transition-colors hover:text-accent focus-visible:text-accent focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:text-2xl"
          >
            {profile.email}
          </a>

          <Separator />

          <ul className="flex flex-wrap gap-3">
            {profile.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className: ctaClassName,
                  })}
                >
                  {social.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </section>
  );
}
