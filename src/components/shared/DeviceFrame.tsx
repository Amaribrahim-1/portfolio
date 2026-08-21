import Image from "next/image";

import type { ProjectScreenshot } from "@/content/projects";
import { cn } from "@/lib/utils";

type DeviceFrameProps = {
  label: string;
  screenshot?: ProjectScreenshot;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function DeviceFrame({
  label,
  screenshot,
  priority = false,
  sizes = "(max-width: 40rem) 100vw, (max-width: 64rem) 50vw, 32rem",
  className,
}: DeviceFrameProps) {
  return (
    <div
      aria-hidden={screenshot ? undefined : true}
      className={cn(
        "overflow-hidden bg-[color-mix(in_oklab,var(--cream)_92%,var(--forest))]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="flex items-center gap-1.5 border-b border-forest/10 px-3 py-2"
      >
        <span className="size-1.5 rounded-full bg-forest/30" />
        <span className="size-1.5 rounded-full bg-forest/30" />
        <span className="size-1.5 rounded-full bg-forest/30" />
        <span className="ml-2 truncate font-mono text-[10px] tracking-wide text-forest/50">
          {label}
        </span>
      </div>
      {screenshot ? (
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
      ) : (
        <div className="aspect-video bg-sage/35" />
      )}
    </div>
  );
}
