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
    <div className="relative z-40 order-2 bg-forest pt-6 pb-12 md:order-1 md:flex md:min-h-svh md:flex-col md:justify-center md:bg-transparent md:pt-28 md:pr-10 md:pb-24">
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
    <div className="relative z-10 order-1 h-[42svh] min-h-52 pt-20 md:order-2 md:h-auto md:min-h-svh md:pt-0">
      <ParallaxLayer
        offset={96}
        className="absolute top-[22%] left-[2%] z-10 w-[82%] max-w-sm md:top-[22%] md:left-0 md:w-[92%] md:max-w-lg"
      >
        <div className="-rotate-3">
          <HeroScreenshot
            screenshot={examIoScreenshot}
            sizes="(max-width: 768px) 82vw, 36vw"
            priority
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        offset={140}
        className="absolute top-[8%] right-[2%] z-20 w-[42%] max-w-[11rem] sm:max-w-[13rem] md:top-[12%] md:right-0 md:w-[48%] md:max-w-[17rem]"
      >
        <div className="rotate-6">
          <HeroScreenshot
            screenshot={areejScreenshot}
            sizes="(max-width: 768px) 42vw, 18vw"
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        offset={188}
        className="absolute right-[8%] bottom-[4%] z-30 md:right-[6%] md:bottom-[12%]"
      >
        <PortraitFrame priority className="w-28 sm:w-36 md:w-44 lg:w-52" />
      </ParallaxLayer>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-b from-transparent to-forest md:hidden"
      />
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

      <div className="relative mx-auto grid min-h-svh max-w-6xl grid-cols-1 md:grid-cols-2 md:items-center">
        <HeroCopy />
        <HeroCollage />
      </div>
    </section>
  );
}
