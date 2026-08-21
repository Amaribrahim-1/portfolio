import type { SimpleIcon } from "simple-icons";
import {
  siAxios,
  siCss,
  siGithub,
  siHtml5,
  siJavascript,
  siNextdotjs,
  siPostman,
  siReact,
  siReacthookform,
  siReactquery,
  siReactrouter,
  siRedux,
  siStyledcomponents,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVite,
  siZod,
} from "simple-icons";

import { skillGroups } from "./skills";

export type SkillBrandIcon = {
  skill: string;
  path: string;
};

// Zustand, REST APIs, and AI-Assisted Development have no brand in simple-icons.
const ICON_BY_SKILL: Partial<Record<string, SimpleIcon>> = {
  "JavaScript (ES6+)": siJavascript,
  TypeScript: siTypescript,
  HTML5: siHtml5,
  CSS3: siCss,
  React: siReact,
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  "Styled Components": siStyledcomponents,
  "React Router": siReactrouter,
  "Redux Toolkit": siRedux,
  "TanStack Query": siReactquery,
  "React Hook Form": siReacthookform,
  Zod: siZod,
  Supabase: siSupabase,
  "Git/GitHub": siGithub,
  Vite: siVite,
  Postman: siPostman,
  Axios: siAxios,
};

export const skillBrandIcons: SkillBrandIcon[] = skillGroups.flatMap((group) =>
  group.skills.flatMap((skill) => {
    const icon = ICON_BY_SKILL[skill];
    return icon === undefined ? [] : [{ skill, path: icon.path }];
  }),
);
