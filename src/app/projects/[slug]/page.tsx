import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudy } from "@/components/sections/CaseStudy";
import { profile } from "@/content/profile";
import { getProjectBySlug, projects } from "@/content/projects";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const title = project.name;
  const description = project.tagline;
  const url = `/projects/${project.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: profile.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <CaseStudy project={project} />;
}
