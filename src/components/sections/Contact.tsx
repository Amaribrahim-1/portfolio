import Link from "next/link";

import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { buttonVariants } from "@/components/ui/button";
import { cvPage } from "@/content/cv";
import { contactActions, contactIntent, profile } from "@/content/profile";
import { cn } from "@/lib/utils";

const CTA_CLASS_NAME = "h-11 px-5 duration-200";
const CONTACT_ACCENT = "freelance";
const INVITE_CARD_CLASS_NAME =
  "mt-10 w-full max-w-3xl rounded-[1.75rem] bg-cream p-8 text-forest shadow-[0_24px_60px_color-mix(in_oklab,black_12%,transparent)] ring-1 ring-forest/15 md:p-10";

const primaryCtaClassName = buttonVariants({
  size: "lg",
  className: CTA_CLASS_NAME,
});

const secondaryCtaClassName = cn(
  buttonVariants({
    size: "lg",
    className: CTA_CLASS_NAME,
  }),
  "border-forest/40 bg-transparent text-forest hover:bg-forest/10 hover:text-forest",
);

function ContactInviteCard() {
  return (
    <article className={INVITE_CARD_CLASS_NAME}>
      <p className="font-display text-2xl font-semibold tracking-tight text-pretty md:text-3xl lg:text-4xl">
        {contactActions.inviteLead}{" "}
        <em className="italic text-mustard">{contactActions.inviteAccent}</em>.
      </p>
      <ul className="mt-8 flex flex-wrap gap-3">
        <li>
          <a href={`mailto:${profile.email}`} className={primaryCtaClassName}>
            {contactActions.emailLabel}
          </a>
        </li>
        <li>
          <a
            href={profile.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={primaryCtaClassName}
          >
            {contactActions.whatsappLabel}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
        <li>
          <Link href={cvPage.href} className={primaryCtaClassName}>
            {contactActions.viewCvLabel}
          </Link>
        </li>
      </ul>
      <ul className="mt-4 flex flex-wrap gap-3">
        {profile.socials.map((social) => (
          <li key={social.href}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryCtaClassName}
            >
              {social.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}

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

        <ContactInviteCard />
      </div>
    </section>
  );
}
