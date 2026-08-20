import Image from "next/image";

import type { ProjectScreenshot } from "@/content/projects";
import { cn } from "@/lib/utils";

type DeviceFrameProps = {
  label: string;
  screenshot?: ProjectScreenshot;
  priority?: boolean;
  className?: string;
};

export function DeviceFrame({
  label,
  screenshot,
  priority = false,
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
            priority={priority}
            className="object-cover object-top"
          />
        </div>
      ) : (
        <div className="aspect-video bg-muted" />
      )}
    </div>
  );
}
