import Image from "next/image";

import { cvPage } from "@/content/cv";

const FRAME_CLASS_NAME =
  "overflow-hidden rounded-2xl bg-cream shadow-[0_28px_70px_color-mix(in_oklab,black_32%,transparent)] ring-2 ring-mustard/75";
const TOOLBAR_CLASS_NAME =
  "flex items-center gap-3 border-b border-forest/10 bg-[color-mix(in_oklab,var(--cream)_90%,var(--forest))] px-4 py-2.5";

export function CvPreviewFrame() {
  return (
    <figure className={FRAME_CLASS_NAME}>
      <figcaption className={TOOLBAR_CLASS_NAME}>
        <span className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-forest" />
          <span className="size-2 rounded-full bg-sage" />
          <span className="size-2 rounded-full bg-mustard" />
        </span>
        <span className="truncate font-mono text-[11px] tracking-[0.16em] text-forest/55 uppercase">
          {cvPage.pdfFileName}
        </span>
      </figcaption>
      <div className="bg-[color-mix(in_oklab,var(--cream)_70%,white)] p-2.5 md:p-3">
        <Image
          src={cvPage.preview.src}
          alt={cvPage.preview.alt}
          placeholder="blur"
          priority
          unoptimized
          className="h-auto w-full bg-white"
        />
      </div>
    </figure>
  );
}
