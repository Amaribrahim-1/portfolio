import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { buttonVariants } from "@/components/ui/button";
import { contactIntent, profile } from "@/content/profile";
import { cn, focusRingClassName } from "@/lib/utils";

const CTA_CLASS_NAME = "h-11 px-5 duration-200";
const CONTACT_ACCENT = "freelance";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-forest text-cream"
    >
      <div className="mx-auto flex min-h-[70svh] max-w-5xl flex-col justify-center px-gutter py-section-lg">
        <SplitHeadline
          as="h2"
          id="contact-heading"
          accent={CONTACT_ACCENT}
          className="font-display max-w-4xl text-4xl font-semibold tracking-tight text-pretty md:text-6xl lg:text-7xl"
        >
          {contactIntent}
        </SplitHeadline>

        <a
          href={`mailto:${profile.email}`}
          className={cn(
            "mt-10 font-display text-xl font-semibold tracking-tight break-all text-cream transition-colors duration-200 hover:text-mustard sm:text-2xl md:text-3xl",
            focusRingClassName,
            "focus-visible:text-mustard",
          )}
        >
          {profile.email}
        </a>

        <ul className="mt-8 flex flex-wrap gap-3">
          {profile.socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className: CTA_CLASS_NAME,
                  }),
                  "border-cream/45 bg-transparent text-cream hover:bg-cream/10 hover:text-cream",
                )}
              >
                {social.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
