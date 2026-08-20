export type SkillGroup = {
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Core",
    skills: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
  },
  {
    title: "Frontend & UI",
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Styled Components",
      "React Router",
    ],
  },
  {
    title: "State, Forms & Data",
    skills: [
      "Zustand",
      "Redux Toolkit",
      "TanStack Query",
      "React Hook Form",
      "Zod",
    ],
  },
  {
    title: "Tools & Backend",
    skills: [
      "Supabase",
      "REST APIs",
      "Git/GitHub",
      "Vite",
      "Postman",
      "Axios",
      "AI-Assisted Development",
    ],
  },
];
