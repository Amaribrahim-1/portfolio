import type { StaticImageData } from "next/image";

import portrait from "../../public/images/amar.jpg";

export type SocialLink = {
  label: string;
  href: string;
};

export type NavLink = {
  href: string;
  label: string;
};

export type ProfilePhoto = {
  src: StaticImageData;
  alt: string;
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  about: string;
  aboutRows: readonly string[];
  email: string;
  cvHref: string;
  photo: ProfilePhoto;
  socials: SocialLink[];
};

const aboutRows = [
  "I'm Amar, a frontend developer and final-year Computer Science student based in Egypt.",
  "I specialize in React and Next.js, and I care as much about how a product is built as how it looks — clear architecture, real security, and code that holds up in production, not just a nice UI.",
  "My strongest project so far is Exam.io, a full-stack exam platform with a custom anti-cheat engine and multi-role dashboards.",
  "Right now I'm building Areej, a real e-commerce store for a paying client, from database security to the storefront UI.",
  "I'm currently taking on freelance frontend work.",
] as const;

export const contactIntent = aboutRows[4];

export const navLinks: readonly NavLink[] = [
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "Stack" },
  { href: "/#work", label: "Work" },
  { href: "/#cv", label: "CV" },
  { href: "/#contact", label: "Contact" },
];

export const profile: Profile = {
  name: "Amar Ibrahim Fawzy",
  role: "Frontend Developer",
  tagline:
    "Frontend Developer building real, production-ready products — not tutorials.",
  about: aboutRows.join(" "),
  aboutRows,
  email: "amaribrahimforwork1@gmail.com",
  cvHref: "/cv/Amar-Ibrahim-CV.pdf",
  photo: {
    src: portrait,
    alt: "Portrait of Amar Ibrahim Fawzy",
  },
  socials: [
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/amar-ibrahim-47961938a",
    },
    {
      label: "GitHub",
      href: "https://github.com/Amaribrahim-1",
    },
  ],
};
