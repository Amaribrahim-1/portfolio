import { profile } from "@/content/profile";
import cvPreview from "../../public/cv/preview.jpg";

export const cvPage = {
  href: "/cv",
  heroLabel: "My CV",
  backLabel: "Back",
  backHref: "/#contact",
  downloadLabel: "Download PDF",
  pdfHref: profile.cvHref,
  pdfFileName: "Amar-Ibrahim-CV.pdf",
  title: "CV",
  description: profile.tagline,
  preview: {
    src: cvPreview,
    alt: `${profile.name} CV`,
  },
} as const;
