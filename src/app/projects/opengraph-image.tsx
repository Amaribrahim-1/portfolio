import { projectsArchive } from "@/content/projects";
import { ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = projectsArchive.heading;
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: projectsArchive.heading,
    description: projectsArchive.description,
  });
}
