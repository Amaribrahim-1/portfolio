# Amar Ibrahim — Portfolio

Personal site for [Amar Ibrahim Fawzy](https://github.com/Amaribrahim-1), a frontend developer based in Egypt. One scrolling homepage plus case-study pages for Exam.io and Areej.

Content lives in TypeScript files under `src/content/` — no CMS, database, or contact-form backend.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) and React 19
- TypeScript
- Tailwind CSS v4
- GSAP 3 + ScrollTrigger + Lenis (`@gsap/react`)
- shadcn/ui — `button`, `card`, `badge`, `separator`

Requires **Node.js 20.9+**.

## Scripts

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start    # serve the production build
npm run lint
```

## Folder structure

```
src/
  app/                 homepage (`/`) and case studies (`/projects/[slug]`)
  components/
    sections/          Hero, About, TechStack, Projects, Cv, Contact
    shared/            Navbar, Footer, and other non-motion UI
    motion/            Lenis + GSAP ScrollTrigger primitives
    ui/                shadcn primitives
  content/             profile, skills, projects (the site copy)
  lib/                 GSAP register, split-text helper, site URL
public/
  cv/                  Amar-Ibrahim-CV.pdf
  images/              portrait and project screenshots
```

Case-study slugs come from `src/content/projects.ts` (`hasCaseStudy: true`). Today that is `/projects/exam-io` and `/projects/areej`.

## Deploy

Target host is [Vercel](https://vercel.com). The production URL goes here after the first deploy.

Optional: set `NEXT_PUBLIC_SITE_URL` to the canonical origin (no trailing slash) so Open Graph tags and the sitemap do not fall back to `http://localhost:3000`.
