import { ogImageSize, renderOgImage } from "@/lib/og-image";
import { getProjectBySlug, projects } from "@/content/projects";

export const alt = "Project case study";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type OgImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: OgImageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return renderOgImage();
  }

  return renderOgImage({
    eyebrow: project.statusLabel,
    title: project.name,
    description: project.tagline,
  });
}
