import type { Metadata } from "next";

import { CvPage } from "@/components/sections/CvPage";
import { cvPage } from "@/content/cv";
import { profile } from "@/content/profile";
import { getSiteUrl } from "@/lib/site";

const title = cvPage.title;
const description = cvPage.description;
const url = cvPage.href;
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

export default function Page() {
  return <CvPage />;
}
