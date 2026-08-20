export type ProjectStatus = "live" | "in-development";

export type ProjectScreenshot = {
  src: string;
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
        src: "/images/projects/exam-io/landing.png",
        alt: "Exam.io landing page with the digital exam platform hero, role badges, and product preview.",
      },
    ],
  },
  {
    slug: "areej",
    name: "Areej",
    tagline: "Real e-commerce store for a paying client — in active development.",
    status: "in-development",
    statusLabel: "In active development",
    hasCaseStudy: true,
    bullets: [
      "Normalized 7-table PostgreSQL schema on Supabase across 8 migrations.",
      "Row-level security with role-scoped policies (guest / customer / admin).",
      "Server-side security via Postgres RPC — price recalculation that rejects client-submitted totals.",
      "Structured AI-assisted workflow: project-specific Cursor rule files and coding standards authored upfront.",
    ],
    tech: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "Supabase (Postgres, RLS, RPC)",
      "TanStack Query",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Cursor",
    ],
    liveUrl: null,
    repoUrl: "https://github.com/Amaribrahim-1/areej-store",
    screenshots: [
      {
        src: "/images/projects/areej/home.png",
        alt: "Areej storefront hero with Arabic navigation, perfume product photography, and a shop-products call to action.",
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
        src: "/images/projects/bookstore/home.jpg",
        alt: "Online Bookstore home page with featured books and storefront navigation.",
      },
    ],
  },
];

export function getCaseStudyProjects(): Project[] {
  return projects.filter((project) => project.hasCaseStudy);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getCaseStudyProjects().find((project) => project.slug === slug);
}
