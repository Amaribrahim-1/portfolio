import { CvPreviewFrame } from "@/components/sections/CvPreviewFrame";
import { BackLink } from "@/components/shared/BackLink";
import { buttonVariants } from "@/components/ui/button";
import { cvPage } from "@/content/cv";
import { cn } from "@/lib/utils";

const DOWNLOAD_CLASS_NAME = "h-11 px-5 duration-200";
const COLUMN_CLASS_NAME = "mx-auto w-full max-w-2xl";

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
          <BackLink href={cvPage.backHref} label={cvPage.backLabel} />
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
