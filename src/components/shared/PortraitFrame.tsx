import Image from "next/image";

import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

type PortraitFrameProps = {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

const DEFAULT_SIZES =
  "(max-width: 40rem) 11rem, (max-width: 48rem) 13rem, 14rem";

export function PortraitFrame({
  className,
  imageClassName,
  priority = false,
  sizes = DEFAULT_SIZES,
}: PortraitFrameProps) {
  return (
    <div
      className={cn(
        "photo-frame photo-frame-duotone aspect-3/4 w-44 shrink-0 sm:w-52 md:w-56",
        className,
      )}
    >
      <Image
        src={profile.photo.src}
        alt={profile.photo.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        priority={priority}
        className={cn("photo-frame-media object-top", imageClassName)}
      />
    </div>
  );
}
