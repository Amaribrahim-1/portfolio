import type { StaticImageData } from "next/image";

import areejHome from "../../public/images/projects/areej/home.webp";
import bookstoreHome from "../../public/images/projects/bookstore/home.webp";
import examIoLanding from "../../public/images/projects/exam-io/landing.webp";
import examIoPreview from "../../public/images/projects/exam-io/preview.webp";

export type ProjectStatus = "live" | "in-development";

export type ProjectScreenshot = {
  src: StaticImageData;
  alt: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  status: ProjectStatus;
  statusLabel: string;
  hasCaseStudy: boolean;
  bullets: string[];
  tech: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  screenshots: ProjectScreenshot[];
  /** Overrides `screenshots[0]` for the homepage Work section card only. */
  cardScreenshot?: ProjectScreenshot;
};

export const examIoCollageScreenshot: ProjectScreenshot = {
  src: examIoPreview,
  alt: "Exam.io product preview with the exam interface, 92 score card, and completion checklist.",
};

export const projects: Project[] = [
  {
    slug: "exam-io",
    name: "Exam.io",
    tagline: "Full-stack exam platform with real-time anti-cheat, built solo.",
    status: "live",
    statusLabel: "Live",
    hasCaseStudy: true,
    bullets: [
      "Multi-role platform: Student / Instructor / Admin dashboards.",
      "Custom useAntiCheat hook — detects tab switches, dev-tools access, and blocked shortcuts; auto-submits after 3 violations.",
      "3-step exam creation wizard, Context-based state machine (create + edit modes), normalized Supabase schema.",
      "Performance: route-level code splitting (React.lazy) + manual vendor chunk splitting in Vite — sub-24kB per-route bundles.",
    ],
    tech: [
      "React 19",
      "Vite",
      "Supabase",
      "TanStack Query",
      "Tailwind CSS v4",
      "React Hook Form",
      "Framer Motion",
      "Vercel",
    ],
    liveUrl: "https://exam-platform-7r4y.vercel.app",
    repoUrl: "https://github.com/Amaribrahim-1/exam_platform",
    screenshots: [
      {
        src: examIoLanding,
        alt: "Exam.io landing page with the digital exam platform hero, role badges, and product preview.",
      },
    ],
    cardScreenshot: examIoCollageScreenshot,
  },
  {
    slug: "areej",
    name: "Areej",
    tagline:
      "Arabic/RTL e-commerce store for a real fragrance shop — COD checkout and a server-guarded admin.",
    status: "live",
    statusLabel: "Live",
    hasCaseStudy: true,
    bullets: [
      "Shipped a full COD storefront and server-guarded admin for a live client: catalog, persisted guest cart, checkout, order history, and reviews. Arabic-only, RTL.",
      "Order totals are never trusted from the client — a Postgres place_order RPC re-reads variant prices and is the only writer; the client sends variant and quantity, no price.",
      "RLS plus column grants: customers cannot update profiles.role; admins can update orders.status only. Admin checks go through a private is_admin() helper.",
      "Server data lives in TanStack Query; cart and UI state in Zustand. Forms are React Hook Form + Zod, re-validated before every write.",
    ],
    tech: [
      "Next.js 16 (App Router)",
      "React 19",
      "Supabase (Postgres, RLS, RPC)",
      "TanStack Query",
      "Zustand",
      "React Hook Form",
      "Tailwind CSS v4",
      "shadcn/ui",
    ],
    liveUrl: "https://areej-store-kappa.vercel.app/",
    repoUrl: "https://github.com/Amaribrahim-1/areej-store",
    screenshots: [
      {
        src: areejHome,
        alt: "Areej Arabic storefront hero: perfume bottle on the left, تسوقي المنتجات on the right.",
      },
    ],
  },
  {
    slug: "online-bookstore",
    name: "Online Bookstore",
    tagline:
      "E-commerce storefront with role-based access, search, category filtering, and pagination.",
    status: "live",
    statusLabel: "Live",
    hasCaseStudy: false,
    bullets: [
      "Full e-commerce storefront with role-based access (User & Admin), search, category filtering, and pagination.",
      "Cart and wishlist system with quantity management and stock enforcement, persisted across sessions via localStorage using custom hooks.",
      "Rendering performance with React.memo, useMemo, and useCallback, plus route-level lazy loading.",
      "REST API endpoints via Axios with async state handling, loading skeletons, and error boundaries.",
    ],
    tech: [
      "React",
      "Vite",
      "React Router",
      "Context API",
      "Axios",
      "React Hook Form",
      "CSS",
    ],
    liveUrl: "https://book-store-bay-phi.vercel.app",
    repoUrl: "https://github.com/Amaribrahim-1/Book-Store",
    screenshots: [
      {
        src: bookstoreHome,
        alt: "Online Bookstore home page with featured books and storefront navigation.",
      },
    ],
  },
];

function projectArchiveDescription(list: readonly Project[]): string {
  const names = list.map((project) => project.name);
  return `${names.slice(0, -1).join(", ")}, and ${names.slice(-1).join("")}.`;
}

export const projectsArchive = {
  heading: "Projects",
  seeAllLabel: "See all projects",
  seeAllHref: "/projects",
  backLabel: "Back",
  description: projectArchiveDescription(projects),
} as const;

export function getCaseStudyProjects(): Project[] {
  return projects.filter((project) => project.hasCaseStudy);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getCaseStudyProjects().find((project) => project.slug === slug);
}
