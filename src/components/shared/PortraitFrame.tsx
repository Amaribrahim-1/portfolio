import Image from "next/image";

import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

type PortraitFrameProps = {
  className?: string;
  priority?: boolean;
};

export function PortraitFrame({
  className,
  priority = false,
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
        sizes="(max-width: 768px) 208px, (max-width: 1024px) 224px, 288px"
        priority={priority}
        className="photo-frame-media object-top"
      />
    </div>
  );
}
