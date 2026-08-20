import Image from "next/image";

import type { ProjectScreenshot } from "@/content/projects";
import { cn } from "@/lib/utils";

type DeviceFrameProps = {
  label: string;
  screenshot?: ProjectScreenshot;
  className?: string;
};

export function DeviceFrame({
  label,
  screenshot,
  className,
}: DeviceFrameProps) {
  return (
    <div
      aria-hidden={screenshot ? undefined : true}
      className={cn("overflow-hidden bg-secondary", className)}
    >
      <div
        aria-hidden="true"
        className="flex items-center gap-1.5 border-b border-border px-3 py-2"
      >
        <span className="size-1.5 rounded-full bg-muted-foreground/40" />
        <span className="size-1.5 rounded-full bg-muted-foreground/40" />
        <span className="size-1.5 rounded-full bg-muted-foreground/40" />
        <span className="ml-2 truncate font-mono text-[10px] tracking-wide text-muted-foreground">
          {label}
        </span>
      </div>
      {screenshot ? (
        <div className="relative aspect-video">
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            fill
            sizes="(max-width: 64rem) 100vw, 64rem"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="aspect-video bg-muted" />
      )}
    </div>
  );
}
