import { profile } from "@/content/profile";
import { ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = `${profile.name} — ${profile.role}`;
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
