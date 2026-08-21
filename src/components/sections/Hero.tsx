import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ParallaxLayer, ParallaxRoot } from "@/components/motion/ParallaxLayer";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { PortraitFrame } from "@/components/shared/PortraitFrame";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";
import {
  examIoCollageScreenshot,
  getProjectBySlug,
  type ProjectScreenshot,
} from "@/content/projects";
import { cn } from "@/lib/utils";

const TAGLINE_ACCENT = "not tutorials";
const WATERMARK_NAME = profile.name.split(/\s+/)[0];
const ARROW_CLASS_NAME = "size-4 transition-transform duration-200";
const CV_CTA_CLASS_NAME =
  "h-12 gap-2 px-7 text-base shadow-[0_0_32px_color-mix(in_oklab,var(--mustard)_38%,transparent)] duration-200 hover:-translate-y-px hover:shadow-[0_0_48px_color-mix(in_oklab,var(--mustard)_58%,transparent)]";
const WORK_LINK_CLASS_NAME =
  "group/work inline-flex items-center gap-1.5 text-sm font-medium text-cream/85 duration-200 hover:text-mustard focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";
const HERO_SCREENSHOT_FRAME =
  "overflow-hidden rounded-xl border border-cream/20 shadow-[0_28px_70px_color-mix(in_oklab,black_45%,transparent)]";
const HERO_EXAM_FRAME =
  "border-mustard/45 shadow-[0_28px_70px_color-mix(in_oklab,black_50%,transparent),0_0_36px_color-mix(in_oklab,var(--mustard)_16%,transparent)]";

function screenshotFor(slug: string): ProjectScreenshot {
  const screenshot = getProjectBySlug(slug)?.screenshots[0];
  if (!screenshot) {
    throw new Error(`Hero requires a screenshot for ${slug}.`);
  }
  return screenshot;
}

const areejScreenshot = screenshotFor("areej");

function HeroScreenshot({
  screenshot,
  sizes,
  priority = false,
  frameClassName = "aspect-video",
  imageClassName = "object-cover object-top",
  className,
}: {
  screenshot: ProjectScreenshot;
  sizes: string;
  priority?: boolean;
  frameClassName?: string;
  imageClassName?: string;
  className?: string;
}) {
  return (
    <div className={cn(HERO_SCREENSHOT_FRAME, className)}>
      <div className={cn("relative", frameClassName)}>
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          priority={priority}
          className={imageClassName}
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
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <a
            href={profile.cvHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              size: "lg",
              className: CV_CTA_CLASS_NAME,
            })}
          >
            My CV
            <span className="sr-only"> (PDF, opens in a new tab)</span>
            <ArrowRight
              aria-hidden
              className={cn(ARROW_CLASS_NAME, "group-hover/button:translate-x-0.5")}
            />
          </a>
          <Link href="/#work" className={WORK_LINK_CLASS_NAME}>
            Work
            <ArrowRight
              aria-hidden
              className={cn(ARROW_CLASS_NAME, "group-hover/work:translate-x-0.5")}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

function HeroCollage() {
  return (
    <div className="relative z-10 order-1 h-[52svh] min-h-64 pt-24 md:order-2 md:flex md:h-svh md:items-center md:pt-28 md:pb-24">
      <div className="pointer-events-none relative h-full w-full md:h-[30rem] md:translate-y-12 lg:h-[32rem]">
        <ParallaxLayer
          offset={96}
          className="absolute top-[16%] left-[2%] z-10 w-[62%] max-w-[15rem] sm:max-w-[18rem] md:top-[12%] md:left-[0%] md:w-[68%] md:max-w-[22rem]"
        >
          <div className="-rotate-8">
            <HeroScreenshot
              screenshot={examIoCollageScreenshot}
              sizes="(max-width: 40rem) 15rem, (max-width: 48rem) 18rem, 22rem"
              priority
              imageClassName="object-cover object-center"
              className={HERO_EXAM_FRAME}
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={140}
          className="absolute top-[8%] right-[2%] z-20 w-[56%] max-w-[14rem] sm:max-w-[16rem] md:top-[4%] md:right-[0%] md:w-[60%] md:max-w-[20rem]"
        >
          <div className="rotate-8">
            <HeroScreenshot
              screenshot={areejScreenshot}
              sizes="(max-width: 40rem) 14rem, (max-width: 48rem) 16rem, 20rem"
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={188}
          className="absolute inset-x-0 top-[22%] z-30 flex justify-center md:top-[16%]"
        >
          <div className="pointer-events-auto origin-center transition-transform duration-200 hover:scale-[1.03]">
            <PortraitFrame
              priority
              className="aspect-[4/5] w-52 sm:w-64 md:w-72 lg:w-80"
              sizes="(max-width: 40rem) 13rem, (max-width: 48rem) 16rem, (max-width: 64rem) 18rem, 20rem"
            />
          </div>
        </ParallaxLayer>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <ParallaxRoot
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-svh overflow-hidden bg-forest px-gutter"
    >
      <ParallaxLayer
        offset={48}
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-start overflow-hidden pl-[6vw]"
      >
        <p
          aria-hidden="true"
          className="max-w-none font-display text-[28vw] leading-none font-semibold tracking-tighter whitespace-nowrap text-cream/10 select-none md:text-[32vw]"
        >
          {WATERMARK_NAME}
        </p>
      </ParallaxLayer>

      <div className="relative mx-auto grid min-h-svh max-w-6xl grid-cols-1 md:grid-cols-2 md:items-center">
        <HeroCopy />
        <HeroCollage />
      </div>
    </ParallaxRoot>
  );
}
