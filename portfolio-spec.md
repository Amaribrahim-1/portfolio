# Amar's Portfolio — Spec

**Owner:** Amar Ibrahim Fawzy — Frontend Developer, 4th-year CS student
**Purpose:** A fast, credible personal portfolio for freelance clients/recruiters. Built end-to-end by Cursor (AI executes; this is a real deliverable, not a learning project like Areej).
**Time budget:** Must ship within the current Cursor subscription window — keep scope tight, no exploratory tooling.
**Content language:** English (confirmed) — this is the site's own copy (Hero, About, etc.).
**Conversation language:** Egyptian Arabic. Talk to Amar in Arabic in chat/explanations, same convention as the Areej project. Code, comments, commit messages, and the site's content stay English (see Content language above) — never mix the two.

---

## Instructions for Cursor's First Session

Read this spec + every file in `.cursor/rules/` in full, then generate `tasks.md` yourself — an ordered phase/task breakdown for the full build.

**Consolidation directive (read this before writing tasks.md):**
This is not a teaching project like Areej, where tasks were deliberately split fine-grained so a human developer could learn and review one concept at a time. Here, you execute every task directly end-to-end — there is no human-drafts-first loop. So:
- Use the **minimum number of phases and tasks** that still lets the work be done with high quality. Merge what would be 2–3 small teaching-style steps into a single real task wherever they'd naturally be done together anyway.
- This is about task *count*, not skipping dependency order or quality — still respect the real build order below.
- Do not cut accessibility, performance, or content-accuracy checks to hit a lower task count. Consolidate the bookkeeping, not the work.

**Build order to preserve (regardless of how many tasks you end up with):**
1. Foundation — project init, design tokens, shared layout, shared motion/reveal primitives. Must finish first; nothing else starts before it.
2. Homepage sections + the two case-study pages — mutually independent, safe to build in any order or in parallel.
3. Final pass — performance, accessibility, real content swap-in, deploy. Must come last.

---

## Site Structure (hybrid: one-page + case study subpages)

- `/` — single scroll page: Hero → About → Tech Stack → Projects → CV/Resume → Contact → Footer.
- `/projects/areej` — case study deep dive.
- `/projects/exam-io` — case study deep dive.

---

## Tech Stack (to build the site)

- Next.js (App Router), TypeScript, Tailwind CSS
- shadcn/ui — minimal set only (button, card, badge, separator)
- `motion` (Framer Motion successor) — used only for the shared reveal/parallax primitives, see `.cursor/rules/motion-performance-budget.mdc`
- Content in local TypeScript files under `content/` — no CMS, no database, no auth
- Contact: mailto + social links by default — no backend unless explicitly requested
- Deploy: Vercel

---

## Approved Motion Patterns (locked — full rules in `.cursor/rules/motion-performance-budget.mdc`)

1. **Scroll reveal** (default, everywhere) — one-time fade + rise as an element enters the viewport.
2. **Parallax scrolling** — Hero section only. Background/name layer moves at a different speed than the foreground CTA, via `motion`'s `useScroll` + `useTransform`. No new library.
3. **Alternating reveal rows** — About section + case-study pages. Odd rows reveal from the right, even rows from the left. A `direction` prop on the shared reveal wrapper — not a new component.

**Explicitly rejected for v1:** horizontal scroll-driven card galleries (scroll-jacking) and GSAP.

---

## Content & Assets — Status

### Ready (already supplied — use this real data, don't invent placeholder copy)

**CV:** `Amar_Ibrahim_CV.pdf` — place at `public/cv/Amar-Ibrahim-CV.pdf`. Link both the Hero "My CV" button and the CV/Resume section to it directly.

**Contact (public):** email `amaribrahimforwork1@gmail.com` · LinkedIn `linkedin.com/in/amar-ibrahim-47961938a` · GitHub `github.com/Amaribrahim-1`
Phone and GPA are CV-only, not shown on the public site.

**Hero tagline (FINAL):**
> "Frontend Developer building real, production-ready products — not tutorials."

**About paragraph (FINAL):**
> I'm Amar, a frontend developer and final-year Computer Science student based in Egypt. I specialize in React and Next.js, and I care as much about how a product is built as how it looks — clear architecture, real security, and code that holds up in production, not just a nice UI. My strongest project so far is Exam.io, a full-stack exam platform with a custom anti-cheat engine and multi-role dashboards. Right now I'm building Areej, a real e-commerce store for a paying client, from database security to the storefront UI. I'm currently taking on freelance frontend work.

**Tech Stack (real, from CV — group exactly like this):**
- **Core:** JavaScript (ES6+), TypeScript, HTML5, CSS3
- **Frontend & UI:** React, Next.js, Tailwind CSS, Styled Components, React Router
- **State, Forms & Data:** Zustand, Redux Toolkit, TanStack Query, React Hook Form, Zod
- **Tools & Backend:** Supabase, REST APIs, Git/GitHub, Vite, Postman, Axios, AI-Assisted Development

**Project 1 — Exam.io** (tagline: "Full-stack exam platform with real-time anti-cheat, built solo.")
- Multi-role platform: Student / Instructor / Admin dashboards.
- Custom `useAntiCheat` hook — detects tab switches, dev-tools access, and blocked shortcuts; auto-submits after 3 violations.
- 3-step exam creation wizard, Context-based state machine (create + edit modes), normalized Supabase schema.
- Performance: route-level code splitting (`React.lazy`) + manual vendor chunk splitting in Vite — sub-24kB per-route bundles.
- Tech: React 19, Vite, Supabase, TanStack Query, Tailwind CSS v4, React Hook Form, Framer Motion, Vercel.
- Status: **Live.**

**Project 2 — Areej** (tagline: "Real e-commerce store for a paying client — in active development.")
- Normalized 7-table PostgreSQL schema on Supabase across 8 migrations.
- Row-level security with role-scoped policies (guest / customer / admin).
- Server-side security via Postgres RPC — price recalculation that rejects client-submitted totals.
- Structured AI-assisted workflow: project-specific Cursor rule files and coding standards authored upfront.
- Tech: Next.js 16 (App Router), React 19, TypeScript, Supabase (Postgres, RLS, RPC), TanStack Query, Tailwind CSS v4, shadcn/ui, Cursor.
- Status: **In active development** — label it as such, don't present it as launched.

### Still needed from Amar before Phase 3 (final content swap-in) — not blockers for Phase 0/1

- Screenshots: a few real screens from Areej + a few from Exam.io.
- Real URLs: Exam.io live demo link, GitHub repo links for Exam.io and Areej.
- Profile photo — coming. Treatment is code-side (see Design Direction below), so raw photo colors/lighting don't need manual pre-editing.

### Explicitly excluded from v1

- **Online Bookstore project** — real project, listed on the CV, but not one of the 2 chosen case studies. Can be added later as a 3rd card if wanted — flag rather than add silently.

---

## Design Direction

- Dark-based UI (off-black, not pure black), off-white text, signature accent `#00E6A0` (electric green) — confirmed default.
- Typography-led: large confident display type for the hero line, monospace accent font for section eyebrows/tags.
- Subtle grain/noise texture instead of gradient blobs or glassmorphism.
- Project screenshots shown inside a clean minimal browser/device frame.
- **Profile photo treatment (locked):** grayscale or subtle accent-tinted duotone via CSS filter, inside a clean frame with a soft `#00E6A0` glow/border. This guarantees visual consistency with the site regardless of the source photo's original colors or lighting — no manual photo editing needed from Amar.
- Generous whitespace; mobile-first.

---

## Non-Negotiables

- Lighthouse performance ≥ 90 on mobile.
- Every image via `next/image`.
- Motion stays inside `.cursor/rules/motion-performance-budget.mdc`.
- `prefers-reduced-motion` respected everywhere.
- Fully responsive, mobile-first.
- Accessible: semantic landmarks/headings, real alt text, visible focus states.
- Single dark theme — no light/dark toggle.

## Explicitly Out of Scope (v1)

CMS/blog engine, multi-language/i18n, light/dark toggle, full contact-form email backend, analytics dashboard, more than 2 project case studies, any animation library beyond `motion`, horizontal scroll-jacking galleries.
