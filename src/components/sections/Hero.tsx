import Image from "next/image";
import Link from "next/link";

import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { PortraitFrame } from "@/components/shared/PortraitFrame";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { getProjectBySlug, type ProjectScreenshot } from "@/content/projects";

const TAGLINE_ACCENT = "not tutorials";
const CTA_CLASS_NAME = "h-11 px-5 duration-200";
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
    <div className="relative z-40 mt-auto w-full pt-28 pb-12 md:mt-0 md:flex md:min-h-svh md:w-1/2 md:flex-col md:justify-center md:pr-10 md:pb-24">
      <div className="max-w-xl">
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

function HeroCollage() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[58%] md:relative md:inset-auto md:h-auto md:min-h-svh md:w-1/2">
      <ParallaxLayer
        offset={96}
        className="absolute top-[16%] left-[4%] z-10 w-[64%] max-w-[16rem] sm:max-w-xs md:top-[24%] md:left-[6%] md:w-[78%] md:max-w-md"
      >
        <div className="-rotate-6">
          <HeroScreenshot
            screenshot={examIoScreenshot}
            sizes="(max-width: 768px) 64vw, 28vw"
            priority
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        offset={140}
        className="absolute top-[8%] right-[3%] z-20 w-[54%] max-w-[14rem] sm:max-w-[18rem] md:top-[14%] md:right-0 md:w-[68%] md:max-w-sm"
      >
        <div className="rotate-6">
          <HeroScreenshot
            screenshot={areejScreenshot}
            sizes="(max-width: 768px) 54vw, 24vw"
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        offset={188}
        className="absolute bottom-[8%] left-[30%] z-30 md:bottom-[16%] md:left-[24%]"
      >
        <PortraitFrame priority className="w-36 sm:w-44 md:w-52 lg:w-60" />
      </ParallaxLayer>
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

      <div className="relative z-10 mx-auto flex min-h-svh max-w-6xl flex-col md:flex-row md:items-center">
        <HeroCopy />
        <HeroCollage />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[35] h-[42%] bg-forest md:hidden"
      />
    </section>
  );
}
