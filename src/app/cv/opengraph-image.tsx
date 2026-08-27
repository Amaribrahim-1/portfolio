import { cvPage } from "@/content/cv";
import { ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = cvPage.title;
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: cvPage.title,
    description: cvPage.description,
  });
}
