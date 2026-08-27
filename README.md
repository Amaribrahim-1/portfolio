<p align="center">
  <a href="https://portfolio-amaribrahim-1s-projects.vercel.app"><strong>Live site</strong></a>
  &nbsp;·&nbsp;
  <a href="https://linkedin.com/in/amar-ibrahim-47961938a">LinkedIn</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/Amaribrahim-1">GitHub</a>
  &nbsp;·&nbsp;
  <a href="mailto:amaribrahimforwork1@gmail.com">Email</a>
  &nbsp;·&nbsp;
  <a href="https://portfolio-amaribrahim-1s-projects.vercel.app/cv/Amar-Ibrahim-CV.pdf">CV</a>
</p>

# Amar Ibrahim — Portfolio

Personal site for [Amar Ibrahim Fawzy](https://github.com/Amaribrahim-1), a frontend developer based in Egypt. One scrolling homepage plus case-study pages for Exam.io and Areej.

> Frontend Developer building real, production-ready products — not tutorials.

<p align="center">
  <a href="https://portfolio-amaribrahim-1s-projects.vercel.app">
    <img src="docs/screenshots/hero.jpg" alt="Homepage hero: forest-green layout with the tagline, mustard CV button, portrait, and project collage" width="920" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
</p>

## Work

<p align="center">
  <img src="docs/screenshots/work.jpg" alt="Projects section: Exam.io sticky card with live status, case-study link, and product screenshot" width="48%" />
  <img src="docs/screenshots/areej.jpg" alt="Areej case-study page with overview and device-framed storefront screenshot" width="48%" />
</p>

| Project | Status | Links |
| --- | --- | --- |
| **Exam.io** — full-stack exam platform with real-time anti-cheat, built solo | Live | [Case study](https://portfolio-amaribrahim-1s-projects.vercel.app/projects/exam-io) · [Demo](https://exam-platform-7r4y.vercel.app) · [Repo](https://github.com/Amaribrahim-1/exam_platform) |
| **Areej** — Arabic/RTL e-commerce store for a paying client | Live | [Case study](https://portfolio-amaribrahim-1s-projects.vercel.app/projects/areej) · [Demo](https://areej-store-kappa.vercel.app/) · [Repo](https://github.com/Amaribrahim-1/areej-store) |
| **Online Bookstore** — storefront with role-based access, search, and cart | Live | [Demo](https://book-store-bay-phi.vercel.app) · [Repo](https://github.com/Amaribrahim-1/Book-Store) |

Bookstore is homepage-only (no case-study route).

## Stack

<p align="center">
  <img src="docs/screenshots/tech-stack.jpg" alt="Tech Stack section: icon strip plus grouped skill cards (Core, Frontend & UI, State/Forms & Data, Tools & Backend)" width="920" />
</p>

- [Next.js](https://nextjs.org) 16 (App Router) and React 19
- TypeScript
- Tailwind CSS v4
- GSAP 3 + ScrollTrigger + Lenis (`@gsap/react`)
- shadcn/ui — `button`, `card`, `badge`, `separator`
- Fonts: Fraunces (display), Geist (body), JetBrains Mono (tags)

Requires **Node.js 20.9+**. Content lives in TypeScript files under `src/content/` — no CMS, database, or contact-form backend.

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
  app/                 homepage (`/`), projects archive (`/projects`), case studies (`/projects/[slug]`)
  components/
    sections/          Hero, About, TechStack, Projects, ProjectsIndex, CaseStudy, CvPage, Contact
    shared/            Navbar, Footer, and other non-motion UI
    motion/            Lenis + GSAP ScrollTrigger primitives
    ui/                shadcn primitives
  content/             profile, skills, projects (the site copy)
  lib/                 GSAP register, split-text helper, site URL
public/
  cv/                  Amar-Ibrahim-CV.pdf
  images/              portrait and project screenshots
```

The `/projects` archive lists every project from `src/content/projects.ts`. Case-study slugs come from `hasCaseStudy: true`. Today that is `/projects/exam-io` and `/projects/areej`.

To change copy, projects, or contact links, edit `src/content/*.ts` and redeploy.

## Deploy

Live at **[portfolio-amaribrahim-1s-projects.vercel.app](https://portfolio-amaribrahim-1s-projects.vercel.app)**. Hosted on [Vercel](https://vercel.com); pushes to `main` on [Amaribrahim-1/portfolio](https://github.com/Amaribrahim-1/portfolio) auto-deploy.

`NEXT_PUBLIC_SITE_URL` is set on Vercel to the canonical origin (no trailing slash) so Open Graph tags and the sitemap do not fall back to `http://localhost:3000`.
