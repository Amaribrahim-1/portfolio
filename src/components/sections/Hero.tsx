import Image from "next/image";
import Link from "next/link";

import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { PortraitFrame } from "@/components/shared/PortraitFrame";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { getProjectBySlug, type ProjectScreenshot } from "@/content/projects";

const TAGLINE_ACCENT = "not tutorials";
const CTA_CLASS_NAME = "h-11 px-5";
const HERO_SCREENSHOT_FRAME =
  "overflow-hidden rounded-xl border border-cream/15 shadow-[0_24px_60px_color-mix(in_oklab,black_35%,transparent)]";

function screenshotFor(slug: string): ProjectScreenshot {
  const screenshot = getProjectBySlug(slug)?.screenshots[0];
  if (!screenshot) {
    throw new Error(`Hero requires a screenshot for ${slug}.`);
  }
  return screenshot;
}

const examIoScreenshot = screenshotFor("exam-io");
const areejScreenshot = screenshotFor("areej");

function HeroScreenshot({
  screenshot,
  sizes,
  priority = false,
}: {
  screenshot: ProjectScreenshot;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className={HERO_SCREENSHOT_FRAME}>
      <div className="relative aspect-video">
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

function HeroCopy() {
  return (
    <div className="relative z-40 mx-auto flex min-h-svh max-w-6xl flex-col justify-end pt-28 pb-12 md:justify-center md:pb-24">
      <div className="max-w-xl md:max-w-2xl">
        <p className="font-mono text-xs tracking-[0.2em] text-mustard uppercase">
          {profile.role}
        </p>
        <ParallaxLayer offset={-48} opacity={[1, 0]} className="mt-4">
          <SplitHeadline
            id="hero-heading"
            accent={TAGLINE_ACCENT}
            className="font-display text-4xl font-semibold tracking-tight text-balance text-cream sm:text-5xl lg:text-6xl"
          >
            {profile.tagline}
          </SplitHeadline>
        </ParallaxLayer>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={profile.cvHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              size: "lg",
              className: CTA_CLASS_NAME,
            })}
          >
            My CV
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
          <Link
            href="/#work"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: CTA_CLASS_NAME,
            })}
          >
            Work
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      data-parallax-root
      className="relative isolate min-h-svh overflow-hidden bg-forest px-gutter"
    >
      <HeroCopy />

      <ParallaxLayer
        offset={48}
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      >
        <p
          aria-hidden="true"
          className="max-w-none font-display text-[18vw] leading-none font-semibold tracking-tighter whitespace-nowrap text-cream/10 select-none"
        >
          {profile.name}
        </p>
      </ParallaxLayer>

      <ParallaxLayer
        offset={96}
        className="pointer-events-none absolute top-[18%] left-[4%] z-10 w-[58%] max-w-[18rem] sm:top-[20%] sm:left-[6%] sm:w-[42%] sm:max-w-sm md:top-[24%] md:left-[8%] md:max-w-md"
      >
        <div className="-rotate-6">
          <HeroScreenshot
            screenshot={examIoScreenshot}
            sizes="(max-width: 40rem) 58vw, (max-width: 64rem) 42vw, 28rem"
            priority
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        offset={140}
        className="pointer-events-none absolute top-[26%] right-[3%] z-20 w-[52%] max-w-[15rem] sm:top-[22%] sm:right-[6%] sm:w-[36%] sm:max-w-xs md:top-[18%] md:max-w-sm"
      >
        <div className="rotate-6">
          <HeroScreenshot
            screenshot={areejScreenshot}
            sizes="(max-width: 40rem) 52vw, (max-width: 64rem) 36vw, 24rem"
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        offset={188}
        className="pointer-events-none absolute top-[46%] right-[18%] z-30 sm:top-[42%] sm:right-[16%] md:top-auto md:right-[18%] md:bottom-[14%]"
      >
        <PortraitFrame priority className="w-36 sm:w-44 md:w-52 lg:w-60" />
      </ParallaxLayer>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[35] h-[42%] bg-forest md:hidden"
      />
    </section>
  );
}
