# Tasks — Amar's Portfolio Build

Generated per `portfolio-spec.md` → "Instructions for Cursor's First Session". Task count is deliberately consolidated (this is an AI-executes-end-to-end build, not a teaching project) while still respecting the required build order:

1. **Phase 1 — Foundation** must finish first.
2. **Phase 2 — Homepage sections + case study pages** are mutually independent; build in any order or in parallel.
3. **Phase 3 — Final pass** must come last.

Per `.cursor/rules/git-conventions.mdc`: one branch per task below, commit at logical checkpoints within a task, merge into `main` with `--no-ff`.

---

## Phase 1 — Foundation

### Task 1.1 — Project scaffold, design tokens & fonts
Branch: `feat/foundation-scaffold`
- Init Next.js (App Router) + TypeScript + Tailwind CSS with the folder layout from `stack-conventions.mdc` (`src/app`, `src/components/{sections,shared,ui}`, `src/content`, `src/lib`, `public/cv`).
- Init shadcn/ui, add only: `button`, `card`, `badge`, `separator`.
- Install `motion` (no other animation library, per `motion-performance-budget.mdc`).
- Design tokens: dark off-black background, off-white text, accent `#00E6A0`, spacing scale.
- Fonts via `next/font`: large display font for the hero line, monospace accent font for section eyebrows/tags.
- Subtle grain/noise texture utility (CSS/SVG overlay) — no gradient blobs, no glassmorphism.
- Confirm `prefers-reduced-motion` is easily consumable globally for later motion primitives.

### Task 1.2 — Content data files (real content, not placeholders)
Branch: `feat/foundation-content`
- `content/profile.ts`: tagline, About paragraph, contact links (email, LinkedIn, GitHub) — copied verbatim from the spec, typed, no `any`.
- `content/skills.ts`: the 4 groups exactly as listed (Core / Frontend & UI / State-Forms-Data / Tools & Backend).
- `content/projects.ts`: Exam.io + Areej — taglines, bullets, tech lists, status (`live` / `in-development`) as a typed `Project` model. Fields for screenshots and live/repo URLs exist in the type but stay empty/typed placeholders until Task 3.1.
- Explicitly do **not** add the Online Bookstore project (excluded from v1 per spec).

### Task 1.3 — Shared layout & motion primitives
Branch: `feat/foundation-layout-motion`
- `app/layout.tsx`: metadata, font wiring, global styles, semantic landmarks (`header` / `main` / `footer`).
- Base SEO metadata in `app/layout.tsx`: title/description + `openGraph` and `twitter` (summary_large_image) so sharing the site link on LinkedIn/Twitter shows a proper preview card. Default `og:image` can be a static asset for now.
- `components/shared/Navbar.tsx` and `Footer.tsx`, sourcing links from `content/profile.ts`.
- `components/shared/ScrollReveal.tsx`: one-time fade + 8–12px rise via `whileInView`, optional `direction: 'left' | 'right'` prop for alternating rows, slight stagger for groups, respects `prefers-reduced-motion`.
- `components/shared/ParallaxLayer.tsx`: `useScroll` + `useTransform` wrapper, reserved for Hero-only use in Phase 2.
- `lib/utils.ts` (e.g. `cn` helper).
- Minimal `app/page.tsx` wired to the layout (empty/placeholder sections) to confirm the shell renders end-to-end.

---

## Phase 2 — Homepage sections + case study pages
*(independent of each other — safe to build in any order or in parallel; each depends only on Phase 1)*

### Task 2.1 — Hero section
Branch: `feat/section-hero`
- `components/sections/Hero.tsx`: tagline, "My CV" CTA linking to `public/cv/Amar-Ibrahim-CV.pdf`, contact CTA, profile photo frame (grayscale/duotone filter + `#00E6A0` glow border — styled placeholder box until Task 3.1 supplies the real photo).
- Apply `ParallaxLayer` so the background/name layer moves at a different speed than the foreground CTA.
- Content sourced only from `content/profile.ts`.

### Task 2.2 — About section
Branch: `feat/section-about`
- `components/sections/About.tsx`: real About paragraph, split into rows using `ScrollReveal` with alternating `direction` (odd from right, even from left).
- Photo duotone treatment reuses the same frame styling as Hero (no new component).

### Task 2.3 — Tech Stack + CV/Resume + Contact sections
Branch: `feat/sections-techstack-cv-contact`
- `components/sections/TechStack.tsx`: renders the 4 grouped skill lists from `content/skills.ts` with `ScrollReveal`.
- `components/sections/Cv.tsx`: CV/Resume section linking to the same PDF as the Hero CTA.
- `components/sections/Contact.tsx`: mailto + social links from `content/profile.ts` — no form, no backend.
- Grouped into one task: each is a single-purpose, low-motion (`ScrollReveal` only), content-driven block of comparable size.

### Task 2.4 — Projects section (homepage)
Branch: `feat/section-projects`
- `components/sections/Projects.tsx`: 2 cards (Exam.io, Areej) from `content/projects.ts` — tagline, status badge (`Live` / `In active development`), tech tags, screenshot-frame placeholder, link into `/projects/[slug]`.
- Uses shadcn `card` / `badge`; `ScrollReveal` on entry.

### Task 2.5 — Case study pages (Areej + Exam.io)
Branch: `feat/case-study-pages`
- `app/projects/[slug]/page.tsx` with `generateStaticParams` for `areej` and `exam-io`.
- Shared case-study building blocks: image/device frame component, alternating `ScrollReveal` rows (same rule as About).
- Wire in full Exam.io content (anti-cheat hook, wizard, performance stats, tech stack, live status) and full Areej content (schema/RLS/RPC details, AI-assisted workflow note, in-development status) from `content/projects.ts`.
- Per-case-study SEO: `generateMetadata` in `app/projects/[slug]/page.tsx` so each project gets its own `title`/`description`/`openGraph` (distinct preview card per project when shared).
- `app/projects/[slug]/not-found.tsx`: custom 404 (on-brand, not the Next.js default) for any slug other than `areej`/`exam-io`.
- Both slugs built together as one task since they share the same template — natural single unit of work, still independent of every other Phase 2 task.

---

## Phase 3 — Final pass
*(must come last — depends on all of Phase 1 and Phase 2)*

### Task 3.1 — Real content swap-in
Branch: `feat/final-content-swapin`
- Place `Amar-Ibrahim-CV.pdf` at `public/cv/Amar-Ibrahim-CV.pdf`.
- Swap real Areej/Exam.io screenshots into the existing frame components (replacing Phase 2 placeholders).
- Add real URLs: Exam.io live demo, GitHub repos for both projects.
- Swap in the real profile photo (Hero + About); confirm the duotone/glow treatment reads correctly against it.
- Confirm Online Bookstore project is still excluded — flag to Amar rather than adding it silently.

### Task 3.2 — Performance, accessibility & deploy
Branch: `feat/final-perf-a11y-deploy`
- Audit that every image goes through `next/image`.
- `app/sitemap.ts` and `app/robots.ts` (native Next.js App Router file conventions, no extra dependency) so the site + both case-study routes are discoverable/indexable.
- Run Lighthouse (mobile) and fix until performance ≥ 90 (image sizing, font loading, bundle size, deferred motion code).
- Accessibility pass: semantic landmarks/headings, real alt text everywhere, visible focus states, full keyboard nav (nav bar + case-study links), verify `prefers-reduced-motion` disables/shortens every animation.
- Confirm single dark theme only, no light/dark toggle.
- Add `@vercel/analytics` (`<Analytics />` in `app/layout.tsx`, one line) — simple pageview tracking via Vercel's own dashboard, not a custom-built analytics feature on the site, so it doesn't conflict with the spec's "no analytics dashboard" exclusion. Approved by Amar.
- Deploy to Vercel; verify the production build and both case-study routes.
