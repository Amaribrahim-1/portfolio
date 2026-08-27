import type { Metadata } from "next";

import { ProjectsIndex } from "@/components/sections/ProjectsIndex";
import { profile } from "@/content/profile";
import { projectsArchive } from "@/content/projects";
import { getSiteUrl } from "@/lib/site";

const title = projectsArchive.heading;
const description = projectsArchive.description;
const url = projectsArchive.seeAllHref;
const canonicalUrl = `${getSiteUrl()}${url}`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalUrl,
  },
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

export default function ProjectsPage() {
  return <ProjectsIndex />;
}
