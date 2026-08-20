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
    screenshots: [],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
