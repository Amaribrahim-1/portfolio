export type SocialLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  about: string;
  email: string;
  cvHref: string;
  socials: SocialLink[];
};

export const profile: Profile = {
  name: "Amar Ibrahim Fawzy",
  role: "Frontend Developer",
  tagline:
    "Frontend Developer building real, production-ready products — not tutorials.",
  about:
    "I'm Amar, a frontend developer and final-year Computer Science student based in Egypt. I specialize in React and Next.js, and I care as much about how a product is built as how it looks — clear architecture, real security, and code that holds up in production, not just a nice UI. My strongest project so far is Exam.io, a full-stack exam platform with a custom anti-cheat engine and multi-role dashboards. Right now I'm building Areej, a real e-commerce store for a paying client, from database security to the storefront UI. I'm currently taking on freelance frontend work.",
  email: "amaribrahimforwork1@gmail.com",
  cvHref: "/cv/Amar-Ibrahim-CV.pdf",
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
