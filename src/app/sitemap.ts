import type { MetadataRoute } from "next";

import { cvPage } from "@/content/cv";
import { getCaseStudyProjects, projectsArchive } from "@/content/projects";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}${projectsArchive.seeAllHref}`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}${cvPage.href}`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...getCaseStudyProjects().map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
