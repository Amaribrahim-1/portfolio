import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { CvPreviewFrame } from "@/components/sections/CvPreviewFrame";
import { buttonVariants } from "@/components/ui/button";
import { cvPage } from "@/content/cv";
import { cn, focusRingClassName } from "@/lib/utils";

const DOWNLOAD_CLASS_NAME = "h-11 px-5 duration-200";
const COLUMN_CLASS_NAME = "mx-auto w-full max-w-2xl";

function CvBackLink() {
  return (
    <Link
      href={cvPage.backHref}
      className={cn(
        "group/back inline-flex items-center gap-1.5 text-sm font-medium text-cream/85 transition-colors duration-200 hover:text-mustard",
        focusRingClassName,
        "focus-visible:text-mustard",
      )}
    >
      <ArrowLeft
        aria-hidden
        className="size-4 transition-transform duration-200 group-hover/back:-translate-x-0.5"
      />
      {cvPage.backLabel}
    </Link>
  );
}

function CvDownloadLink() {
  return (
    <a
      href={cvPage.pdfHref}
      download={cvPage.pdfFileName}
      className={buttonVariants({
        size: "lg",
        className: DOWNLOAD_CLASS_NAME,
      })}
    >
      {cvPage.downloadLabel}
    </a>
  );
}

export function CvPage() {
  return (
    <article
      aria-labelledby="cv-heading"
      className="flex flex-1 flex-col bg-forest text-cream"
    >
      <header className="px-gutter pt-28 pb-6">
        <div className={cn(COLUMN_CLASS_NAME, "flex flex-wrap items-center gap-4")}>
          <CvBackLink />
          <h1
            id="cv-heading"
            className="min-w-0 flex-1 font-display text-2xl font-semibold tracking-tight md:text-3xl"
          >
            {cvPage.title}
          </h1>
          <CvDownloadLink />
        </div>
      </header>
      <div className="flex flex-1 flex-col px-gutter pb-10">
        <div className={COLUMN_CLASS_NAME}>
          <CvPreviewFrame />
        </div>
      </div>
    </article>
  );
}
