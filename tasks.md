# Tasks — Amar's Portfolio Build

Generated per `portfolio-spec.md` → "Instructions for Cursor's First Session", then extended with **Phase 4** from the cinematic restyle plan, **Phase 5–6** from the ship/Lighthouse plans, and **Phase 7** from the post-Vercel feedback list (2026-08-27).

1. **Phase 1 — Foundation** must finish first. Done.
2. **Phase 2 — Homepage sections + case study pages** were mutually independent. Done.
3. **Phase 3 — Final pass** came last for v1. Done.
4. **Phase 4 — Cinematic restyle** is sequential: one task per session, no parallel work. Done.
5. **Phase 5 — Performance pass, extra polish & ship** — sequential. Open leftovers stay in Phase 5 (do not mix into Phase 7).
6. **Phase 6 — Lighthouse follow-up** — sequential. Open leftovers stay in Phase 6.
7. **Phase 7 — Feedback pass** is sequential: one task per session, no parallel work. Personal / out-of-repo items live in `personal-backlog.md` (not here) and must not be implemented as product tasks.

Per `.cursor/rules/git-conventions.mdc`: one branch per task below, commit at logical checkpoints within a task, merge into `main` with `--no-ff`.

---

## Phase 1 — Foundation

### Task 1.1 — Project scaffold, design tokens & fonts

Branch: `feat/foundation-scaffold`

- [x] Init Next.js (App Router) + TypeScript + Tailwind CSS with the folder layout from `stack-conventions.mdc` (`src/app`, `src/components/{sections,shared,ui}`, `src/content`, `src/lib`, `public/cv`).
- [x] Init shadcn/ui, add only: `button`, `card`, `badge`, `separator`.
- [x] Install `motion` (no other animation library, per `motion-performance-budget.mdc`).
- [x] Design tokens: dark off-black background, off-white text, accent `#00E6A0`, spacing scale.
- [x] Fonts via `next/font`: large display font for the hero line, monospace accent font for section eyebrows/tags.
- [x] Subtle grain/noise texture utility (CSS/SVG overlay) — no gradient blobs, no glassmorphism.
- [x] Confirm `prefers-reduced-motion` is easily consumable globally for later motion primitives.

### Task 1.2 — Content data files (real content, not placeholders)

Branch: `feat/foundation-content`

- [x] `content/profile.ts`: tagline, About paragraph, contact links (email, LinkedIn, GitHub) — copied verbatim from the spec, typed, no `any`.
- [x] `content/skills.ts`: the 4 groups exactly as listed (Core / Frontend & UI / State-Forms-Data / Tools & Backend).
- [x] `content/projects.ts`: Exam.io + Areej — taglines, bullets, tech lists, status (`live` / `in-development`) as a typed `Project` model. Fields for screenshots and live/repo URLs exist in the type but stay empty/typed placeholders until Task 3.1.
- [x] Explicitly do **not** add the Online Bookstore project (excluded from v1 per spec).

### Task 1.3 — Shared layout & motion primitives

Branch: `feat/foundation-layout-motion`

- [x] `app/layout.tsx`: metadata, font wiring, global styles, semantic landmarks (`header` / `main` / `footer`).
- [x] Base SEO metadata in `app/layout.tsx`: title/description + `openGraph` and `twitter` (summary_large_image) so sharing the site link on LinkedIn/Twitter shows a proper preview card. Default `og:image` can be a static asset for now.
- [x] `components/shared/Navbar.tsx` and `Footer.tsx`, sourcing links from `content/profile.ts`.
- [x] `components/shared/ScrollReveal.tsx`: one-time fade + 8–12px rise via `whileInView`, optional `direction: 'left' | 'right'` prop for alternating rows, slight stagger for groups, respects `prefers-reduced-motion`.
- [x] `components/shared/ParallaxLayer.tsx`: `useScroll` + `useTransform` wrapper, reserved for Hero-only use in Phase 2.
- [x] `lib/utils.ts` (e.g. `cn` helper).
- [x] Minimal `app/page.tsx` wired to the layout (empty/placeholder sections) to confirm the shell renders end-to-end.

---

## Phase 2 — Homepage sections + case study pages

_(independent of each other — safe to build in any order or in parallel; each depends only on Phase 1)_

### Task 2.1 — Hero section

Branch: `feat/section-hero`

- [x] `components/sections/Hero.tsx`: tagline, "My CV" CTA linking to `public/cv/Amar-Ibrahim-CV.pdf`, contact CTA, profile photo frame (grayscale/duotone filter + `#00E6A0` glow border — styled placeholder box until Task 3.1 supplies the real photo).
- [x] Apply `ParallaxLayer` so the background/name layer moves at a different speed than the foreground CTA.
- [x] Content sourced only from `content/profile.ts`.

### Task 2.2 — About section

Branch: `feat/section-about`

- [x] `components/sections/About.tsx`: real About paragraph, split into rows using `ScrollReveal` with alternating `direction` (odd from right, even from left).
- [x] Photo duotone treatment reuses the same frame styling as Hero (no new component).

### Task 2.3 — Tech Stack + CV/Resume + Contact sections

Branch: `feat/sections-techstack-cv-contact`

- [x] `components/sections/TechStack.tsx`: renders the 4 grouped skill lists from `content/skills.ts` with `ScrollReveal`.
- [x] `components/sections/Cv.tsx`: CV/Resume section linking to the same PDF as the Hero CTA.
- [x] `components/sections/Contact.tsx`: mailto + social links from `content/profile.ts` — no form, no backend.
- [x] Grouped into one task: each is a single-purpose, low-motion (`ScrollReveal` only), content-driven block of comparable size.

### Task 2.4 — Projects section (homepage)

Branch: `feat/section-projects`

- [x] `components/sections/Projects.tsx`: 2 cards (Exam.io, Areej) from `content/projects.ts` — tagline, status badge (`Live` / `In active development`), tech tags, screenshot-frame placeholder, link into `/projects/[slug]`.
- [x] Uses shadcn `card` / `badge`; `ScrollReveal` on entry.

### Task 2.5 — Case study pages (Areej + Exam.io)

Branch: `feat/case-study-pages`

- [x] `app/projects/[slug]/page.tsx` with `generateStaticParams` for `areej` and `exam-io`.
- [x] Shared case-study building blocks: image/device frame component, alternating `ScrollReveal` rows (same rule as About).
- [x] Wire in full Exam.io content (anti-cheat hook, wizard, performance stats, tech stack, live status) and full Areej content (schema/RLS/RPC details, AI-assisted workflow note, in-development status) from `content/projects.ts`.
- [x] Per-case-study SEO: `generateMetadata` in `app/projects/[slug]/page.tsx` so each project gets its own `title`/`description`/`openGraph` (distinct preview card per project when shared).
- [x] `app/projects/[slug]/not-found.tsx`: custom 404 (on-brand, not the Next.js default) for any slug other than `areej`/`exam-io`.
- [x] Both slugs built together as one task since they share the same template — natural single unit of work, still independent of every other Phase 2 task.

---

## Phase 3 — Final pass

_(must come last — depends on all of Phase 1 and Phase 2)_

### Task 3.1 — Real content swap-in

Branch: `feat/final-content-swapin`

- [x] Place `Amar-Ibrahim-CV.pdf` at `public/cv/Amar-Ibrahim-CV.pdf`.
- [x] Swap real Exam.io and Areej screenshots into the existing frame components.
- [x] Add real URLs: Exam.io live demo (`exam-platform-7r4y.vercel.app`), GitHub repos for Exam.io (`exam_platform`) and Areej (`areej-store`). Areej stays without a live URL (in development).
- [x] Swap in the profile photo (Hero + About) from the GitHub portrait; duotone/glow is CSS on `PortraitFrame`.
- [x] Online Bookstore added as a homepage-only card (no case-study page), last in the list — Amar requested it until stronger projects replace it.

### Task 3.2 — Performance, accessibility & deploy

Branch: `feat/final-perf-a11y-deploy`

- [x] Audit that every image goes through `next/image`.
- [x] `app/sitemap.ts` and `app/robots.ts` (native Next.js App Router file conventions, no extra dependency) so the site + both case-study routes are discoverable/indexable.
- [x] Run Lighthouse (mobile) and fix until performance ≥ 90 (image sizing, font loading, bundle size, deferred motion code).
- [x] Accessibility pass: semantic landmarks/headings, real alt text everywhere, visible focus states, full keyboard nav (nav bar + case-study links), verify `prefers-reduced-motion` disables/shortens every animation.
- [x] Confirm single dark theme only, no light/dark toggle.
- [x] Add `@vercel/analytics` (`<Analytics />` in `app/layout.tsx`, one line) — simple pageview tracking via Vercel's own dashboard, not a custom-built analytics feature on the site, so it doesn't conflict with the spec's "no analytics dashboard" exclusion. Approved by Amar.
- [x] Deploy to Vercel; verify the production build and both case-study routes.

---

## Phase 4 — Cinematic restyle (TO TOP motion + palette)

Generated from the cinematic restyle plan. **Sequential only** — do **one task per session**, merge into `main` with `--no-ff`, then start the next. Do not parallelize. Do not start a later task until the previous checkbox list is done.

Why this is strict: each task is sized for one context window. Combining a later section with an earlier primitive will blow the window and produce half-finished motion.

Build order: **4.1 → 4.2 → 4.3 → … → 4.12 → 4.13**. No skipping. Task 4.13 is a parked Hero polish (Amar) — do not start it until 4.12 is done.

Visual rules (apply in every Phase 4 task, do not re-litigate):

- Palette: forest `#0E2A26`, cream `#F3EEE4`, mustard `#E4B52A`, sage `#9BB3A0`. Mint `#00E6A0` is retired.
- Alternating surfaces, not a light/dark toggle: Hero dark → About/Stack cream → Projects dark → Contact close.
- Display font: Fraunces via `next/font`. Body stays Geist. JetBrains Mono for tags.
- Motion stack: Lenis + GSAP 3 + ScrollTrigger + `@gsap/react`. One motion library. Custom split-text helper — no paid SplitText plugin.
- Animate `transform` / `opacity` only. Layers are real work (portrait, Exam.io, Areej screenshots) — no stock mountains, no Spline/3D, no particles, no autoplay video, no horizontal scroll-jacking.
- Content stays real: `content/*.ts` only, no invented copy, no CMS, no contact-form backend.
- `prefers-reduced-motion: reduce` kills Lenis + ScrollTrigger and shows the final static state.

---

### Task 4.1 — Tokens, fonts, deps, cursor rules

Branch: `feat/cinematic-tokens`

Do **not** restyle Hero/About/Projects in this task. Tokens will shift the existing UI toward the new palette; that half-looked state is expected until later tasks.

- [x] Rewrite `:root` tokens in `src/app/globals.css`: forest / cream / mustard / sage. Retire `#00E6A0` as primary/accent/ring.
- [x] Wire **Fraunces** as `--font-display` in `src/app/layout.tsx` (keep Geist + JetBrains Mono).
- [x] Install `gsap`, `@gsap/react`, `lenis`. Leave `motion` installed until a later task removes it; do not add a fourth animation library.
- [x] Rewrite `.cursor/rules/motion-performance-budget.mdc` for the new allowed set (Lenis, GSAP ScrollTrigger scrub, sticky-stack + scale, hero multi-layer parallax, split-word/letter on headings, SVG path dash, hover 150–300ms) and the still-banned set (Spline/Three, particles, cursor-follow, autoplay video, infinite loops, horizontal scroll-jack). Reduced-motion remains mandatory. Images still go through `next/image`.
- [x] Update `.cursor/rules/stack-conventions.mdc`: GSAP + Lenis are the motion stack; add `src/components/motion/` to the folder map; drop the “motion library only in 3 primitives” line.

---

### Task 4.2 — SmoothScroll + GSAP register

Branch: `feat/cinematic-smooth-scroll`

Depends on 4.1. No section restyles.

- [x] `src/lib/gsap.ts`: register `ScrollTrigger` once; export a `prefersReducedMotion()` helper.
- [x] `src/components/motion/SmoothScroll.tsx`: Lenis on `html`, synced to `gsap.ticker` + `ScrollTrigger.update`. If reduced-motion, do not start Lenis and do not register scroll-driven tweens.
- [x] Mount `SmoothScroll` from `src/app/layout.tsx` (client boundary only around this provider).
- [x] Confirm native scroll still works with JS disabled / reduced-motion.

---

### Task 4.3 — Split-text helper

Branch: `feat/cinematic-split-text`

Depends on 4.2. Do not apply split-text across the whole site yet — ship the primitive and prove it on **one** existing heading (e.g. the Hero `h1`), then stop.

- [x] `src/lib/split-text.ts`: split an element into word spans (default) or letter spans (opt-in). No Club GSAP plugin.
- [x] `src/components/motion/SplitHeadline.tsx`: one-shot intro (max ~800ms) via GSAP. Letters only on desktop headings; words on mobile. Reduced-motion → render plain text, no spans animation.
- [x] Swap the existing Hero `h1` to `SplitHeadline` as the smoke test. Do not rebuild Hero layout or parallax here.

---

### Task 4.4 — Navbar island

Branch: `feat/cinematic-navbar`

Depends on 4.1 (tokens). Motion primitives not required.

- [x] Restyle `src/components/shared/Navbar.tsx` into a floating rounded island (TO TOP bar feel): forest surface, mustard hover, existing links from `content/profile.ts`.
- [x] Keep keyboard access, skip-link, and current hash targets (`/#about`, `/#stack`, `/#work`, `/#cv`, `/#contact`).
- [x] Mobile: wrap or collapse links without introducing a new animation library. No mega-menu.

---

### Task 4.5 — Hero: layered parallax

Branch: `feat/cinematic-hero`

Depends on 4.2 and 4.3. This is the first “wow” section — do not touch About/Projects.

- [x] Rewrite `src/components/shared/ParallaxLayer.tsx` (or move to `src/components/motion/ParallaxLayer.tsx`) on GSAP ScrollTrigger scrub. Multiple offset speeds. Reduced-motion → static.
- [x] Restyle `src/components/sections/Hero.tsx`: full-viewport, Fraunces headline (already SplitHeadline), one mustard italic accent taken from the existing tagline (no new copy).
- [x] 4–5 parallax layers, back to front: giant name (low opacity) → Exam.io screenshot → Areej screenshot → portrait → CTAs in the foreground (My CV + jump to `#work`). Screenshots from `content/projects.ts` / `profile.photo` — `next/image`.
- [x] Scroll-scrub the layers and fade/rise the headline. No Spline, no stock mountains.

---

### Task 4.6 — About: sticky numbered cards

Branch: `feat/cinematic-about`

Depends on 4.2. First consumer of the stack pattern — **build `StickyStack` in this task**, not earlier.

- [x] `src/components/motion/StickyStack.tsx`: children as `position: sticky` cards; previous card scales ~1 → 0.85 as the next covers it. Transforms only. Reduced-motion → stacked static cards, no scale.
- [x] Restyle `src/components/sections/About.tsx`: each `profile.aboutRows` item becomes a large numbered card (01–05), alternating forest / cream / sage. Portrait peeks on the first card.
- [x] Cream section surface. Remove the old alternating `ScrollReveal` paragraph layout.
- [x] Do not invent About copy.

---

### Task 4.7 — Projects: sticky stack

Branch: `feat/cinematic-projects`

Depends on 4.6 (`StickyStack` must already exist).

- [x] Replace the homepage grid in `src/components/sections/Projects.tsx` with 3 full-width sticky cards (Exam.io, Areej, Bookstore) using `StickyStack`.
- [x] Per card: number 01/02/03, Fraunces name, tagline, mustard status, screenshot as the card “peak” (`next/image` + overflow). Same links as today (case study / live / repo) from `content/projects.ts`.
- [x] Dark/forest section surface. No fourth project. No new copy.

---

### Task 4.8 — Tech Stack restyle

Branch: `feat/cinematic-techstack`

Depends on 4.3 (SplitHeadline). Quiet section after the projects climax — do not add sticky-stack here.

- [x] Restyle `src/components/sections/TechStack.tsx` on the cream surface: 4 group cards from `content/skills.ts`.
- [x] SplitHeadline on the section heading only. Stagger the four groups, not every skill chip.
- [x] Keep the data identical.

---

### Task 4.9 — CV, Contact, Footer close

Branch: `feat/cinematic-close`

Depends on 4.1 tokens. No sticky-stack. No new form/backend.

- [x] `src/components/sections/Cv.tsx`: one large Fraunces line + mustard button to the existing PDF.
- [x] `src/components/sections/Contact.tsx`: large close headline using existing contact intent (mailto + socials from `content/profile.ts`). Accent word may use Fraunces italic. No invented bio.
- [x] `src/components/shared/Footer.tsx`: quieter, matching the new palette.
- [x] Section surfaces: CV cream or forest (pick one and stay consistent with the alternating rhythm), Contact as the close.

---

### Task 4.10 — Homepage yellow path

Branch: `feat/cinematic-scroll-path`

Depends on 4.5–4.9 so section anchors exist. Build and wire the path in this same task (no unused primitive sitting around).

- [x] `src/components/motion/ScrollPath.tsx`: one mustard dashed SVG along the homepage, `stroke-dashoffset` scrubbed to scroll progress. `transform`/`stroke-dashoffset` only.
- [x] Mount from `src/app/page.tsx` (homepage only, not case-study routes). Unmounted 2026-08-21 during lag check; remount decision is Task 5.4.
- [x] Desktop: full path from Hero toward Contact. Mobile: hide the long path; optional small mustard dots — do not run a heavy SVG scrub on small screens.
- [x] Reduced-motion → no dash animation (static path or hidden).

---

### Task 4.11 — Case study pages

Branch: `feat/cinematic-case-studies`

Depends on 4.1 and 4.3. Do **not** reuse homepage `StickyStack` (would repeat the trick).

- [x] Restyle `src/components/sections/CaseStudy.tsx` (and the `[slug]` page if needed) onto forest/cream tokens and Fraunces headings.
- [x] SplitHeadline on the case-study title. Screenshot sticky vs body text while scrolling. Same Exam.io / Areej content from `content/projects.ts`.
- [x] Keep `generateMetadata`, `generateStaticParams`, and `not-found.tsx` behavior. No new project.

---

### Task 4.12 — Reduced-motion, mobile, leftover `motion` cleanup

Branch: `feat/cinematic-a11y-perf`

Depends on 4.5–4.11. Last restyle/cleanup task before the parked Hero polish (4.13).

- [x] Audit every GSAP/Lenis instance against `prefers-reduced-motion` (kill tweens, no Lenis, final layout visible).
- [x] Mobile: word-split not letter-split; no full-page path; sticky cards still readable without scale.
- [x] Remove unused `motion` imports/primitives (`ScrollReveal` etc.) if nothing left consumes them; uninstall `motion` only if the tree is clean.
- [x] Images still `next/image`. Hover/tap 150–300ms CSS or GSAP, not layout thrash.
- [x] Smoke-check homepage + both case-study routes + keyboard nav + skip link.

---

### Task 4.13 — Hero: keep the headline off the work layers

Branch: `fix/cinematic-hero-overlap`

Depends on 4.12. Parked by Amar after 4.5 so the rest of Phase 4 can finish first.

The collage is the right idea; the bug is copy sitting on top of Exam.io UI (`Get started free` and other in-screenshot text). Headline + CTAs must stay readable.

- [x] In `src/components/sections/Hero.tsx`, shift the Exam.io / Areej screenshot layers so they do not sit under the headline or CTAs. Copy stays in a clear left column; collage stays on the right (and stacked above the copy on mobile, behind the existing forest scrim).
- [x] Keep the 4–5 parallax layers, real screenshots from `content/projects.ts` / `profile.photo`, `next/image`, and reduced-motion static.
- [x] Do not invent copy. Do not restyle About/Projects.

---

## Phase 5 — Performance pass, extra polish & ship

Generated from the plan approved 2026-08-21. **Sequential, one task at a time**, per `.cursor/rules/git-conventions.mdc`: new branch off `main` per task, commit only when explicitly told, merge `--no-ff` into `main` when a task is confirmed done. Task 5.0 must run first (it is the safety checkpoint). Task 5.61 is a try-and-review cursor pass before shipping. Tasks 5.7–5.9 must run last (they depend on everything else being merged into `main`).

Build order: **5.0 → 5.1 → 5.3 → 5.4 → 5.5 → 5.6 → 5.61 → 5.7 → 5.8 → 5.9**. Task 5.2 is dropped (see below).

### Task 5.0 — Safety checkpoint: merge pending work into `main`

Branch: none (direct, git-history operation only — no code changes)

- [x] Merge `feat/hero-first-impression` into `main` with `--no-ff` (brings in all of Phase 4 + the parked Hero polish, currently unmerged).
- [x] Tag the resulting `main` commit `checkpoint/pre-improvements` — the safe rollback point before any Phase 5 work starts.
- [x] Decide on `stash@{0}` (`wip: exam-io screenshot leftover from 4.11`) — drop it if nothing in it is still needed, after a quick diff check.
- [x] Do not delete any branch yet (that is Task 5.6, after everything below is merged).

### Task 5.1 — Tech Stack: scroll-scrubbed icon strip

Branch: `feat/techstack-icon-strip`

- [x] Add a lightweight brand-icon source (e.g. `simple-icons` SVG paths — no new animation/UI library) and a small mapping from `content/skills.ts` skill names to an icon.
- [x] `src/components/motion/IconStrip.tsx`: one row of real tech logos, horizontal `translateX` scrubbed to the Tech Stack section's own scroll progress (`ScrollTrigger` scrub, bounded to the section) — one pass, no autoplay, no infinite loop.
- [x] Reduced-motion → static row, no scrub.
- [x] Mount inside `src/components/sections/TechStack.tsx` as an addition alongside the existing 4 group cards (data stays `content/skills.ts`, nothing invented).

### Task 5.2 — Work section: horizontal sticky-stack on desktop only — DROPPED

Dropped 2026-08-21 after desktop lag. Horizontal pin was heavier than the vertical `StickyStack`; Amar asked to keep the original stack and skip this task. Homepage `ScrollPath` remount is Task 5.4, not this one.

- [ ] Cancelled — do not build `HorizontalStickyStack`. Work stays on vertical `StickyStack`.

### Task 5.3 — Extra polish (pick 2–3)

Branch: `feat/extra-polish`

Picked 2026-08-21: back-to-top, scroll progress, and favicon (the default cheap pair plus icon polish). Tilt/magnetic hover skipped — higher risk, not a global cursor-follow we want to add this pass.

- [ ] Tilt/magnetic hover on project screenshots (Desktop, CSS `transform` only, scoped to the hovered element — not a global cursor-follow). Skipped this task.
- [x] Floating "back to top" button, appears after first scroll, smooth-scrolls via existing Lenis instance.
- [x] Thin mustard scroll-progress indicator bound to overall page scroll.
- [x] Custom favicon / app icon polish (`src/app/icon.tsx` + `apple-icon.tsx`) to match the forest/mustard identity — `opengraph-image.tsx`/`twitter-image.tsx` already exist.

### Task 5.4 — Performance pass

Branch: `feat/perf-pass`

- [x] Swap in the WebP versions of `public/images/**` (Amar is converting these) and update any `content/*.ts` imports if filenames change.
- [x] Re-check every `next/image` `sizes` prop against the actual rendered max-width per breakpoint.
- [x] Audit `ScrollTrigger` instance count (`StickyStack`, `ScrollPath`, `ParallaxLayer`) for redundant triggers or missed `invalidateOnRefresh`.
- [x] Confirm no long main-thread tasks on mobile emulation (Chrome DevTools performance trace) during initial load and during Hero parallax scroll.
- [ ] After Task 5.8 (Vercel deploy) ships, run Lighthouse (mobile) against the real production URL — this is the authoritative number, not localhost. Fix whatever is left to hit ≥ 90.
- [x] Last: remount homepage `ScrollPath` (parked since the 5.2 lag check). Cheapen if needed (no `ResizeObserver` → `ScrollTrigger.refresh` loop). Keep it only if scroll still feels smooth; otherwise leave it unmounted.

### Task 5.5 — Custom scrollbar

Branch: `feat/custom-scrollbar`

- [x] `src/app/globals.css`: `scrollbar-color` (Firefox) + `::-webkit-scrollbar` / `-thumb` / `-track` (Chromium) — forest track, mustard thumb with rounded corners, thin width, subtle hover state.
- [x] Verify it doesn't fight the existing `.bg-grain` overlay or Lenis smooth scroll.

### Task 5.6 — Branch cleanup

Branch: none (direct git operation, no code changes)

Depends on 5.0–5.5 all being merged into `main` with `--no-ff`.

- [ ] Delete every local branch except `main` (all are either already merged or fully contained in the `checkpoint/pre-improvements` history): `feat/case-study-pages`, `feat/cinematic-*` (all), `feat/final-*` (both), `feat/foundation-*` (all), `feat/section-*` (all), `feat/sections-techstack-cv-contact`, `feat/hero-first-impression`, `fix/cinematic-hero-overlap`, `backup/hero-before-polish`, plus every Phase 5 feature branch once merged.
- [ ] Confirm nothing is lost: every deleted branch's tip must be reachable from `main` (`git branch --merged main`) before deletion.

### Task 5.61 — Branded CSS cursor (try before 5.7)

Branch: `feat/branded-cursor`

Parked 2026-08-21 by Amar: distinctive mustard/forest cursor that matches the cinematic brand, **without** a JS mouse-follow (that path hurts performance and is still banned). Ship it for a local try; **do not merge until Amar reviews**.

Handoff: finish Task 5.1 first if `feat/techstack-icon-strip` is still uncommitted — commit when asked, merge `--no-ff` into `main`, then branch this task off `main`. Do not stack this work on the icon-strip branch.

- [x] Add two small PNG cursors (~24×24, hotspot centered) in `public/cursors/`: default (mustard ring or mustard dot) and pointer (slightly clearer ring for links/buttons). PNG, not SVG — Windows Chrome is unreliable with SVG `cursor: url()`. Palette only: mustard `#E4B52A`, forest `#0E2A26`, cream `#F3EEE4` if a fill is needed. No new animation library.
- [x] Wire in `src/app/globals.css` with `cursor: url(...) 12 12, auto` on `html`, and the pointer asset on `a, button, [role="button"], summary, label[for], select`. Always keep a keyword fallback (`auto` / `pointer`).
- [x] Gate with `(pointer: fine) and (hover: hover)` so touch devices keep the native cursor. `prefers-reduced-motion: reduce` → native cursor, no custom assets.
- [x] Do **not** hide the OS cursor (`cursor: none`). Do **not** add a `pointermove` / GSAP follower, lerp blob, mix-blend overlay, or magnetic tilt (tilt stays skipped in 5.3 until Amar asks).
- [x] One-line exception in `.cursor/rules/motion-performance-budget.mdc`: CSS `cursor: url()` is allowed; JS cursor-follow stays banned.
- [x] Stop for Amar’s review on desktop Chrome + Firefox. If it feels cheap, laggy, or fights Lenis/scrollbar, revert the branch rather than “fixing” it into a follower.

### Task 5.7 — Real README + push to GitHub

Branch: none for the push itself; README content can be drafted on a short-lived branch or directly reviewed before pushing `main`

- [x] Replace the default `create-next-app` `README.md` with a real one: project description, stack (Next.js + TypeScript + Tailwind + GSAP/Lenis), short folder structure, `npm run dev/build/start/lint`, deploy link (added after Task 5.8).
- [x] Confirm whether `https://github.com/Amaribrahim-1/portfolio.git` already exists; create it first if not.
- [x] Add it as `origin`, push `main` (and the `checkpoint/pre-improvements` tag).

### Task 5.8 — Deploy to Vercel

Branch: none (platform configuration, not a code task)

- [x] Connect the Vercel account to the `Amaribrahim-1/portfolio` GitHub repo (GitHub integration → auto-deploy on push to `main`, preview URLs on other branches).
- [x] Set `NEXT_PUBLIC_SITE_URL` in Vercel Environment Variables to the real production domain, so OG images/sitemap stop falling back to `localhost`.
- [x] Verify the production build and both case-study routes on the live URL.

### Task 5.9 — Rebuild template doc

Branch: `docs/rebuild-template`

- [ ] `docs/rebuild-template.md`: a generalized version of `portfolio-spec.md`'s structure with placeholders (`{{PRIMARY_DARK}}`, `{{ACCENT}}`, `{{NAME}}`, `{{PROJECTS}}`, etc.) instead of Amar's real values.
- [ ] Keep the same "first-session" instructions shape (generate `tasks.md` in the same Foundation → Sections → Final-pass order) so it can be handed to Cursor for a future portfolio with a different palette/content.
- [ ] Note at the top that it's derived from this project as a living reference.

---

## Phase 6 — Lighthouse follow-up (Performance 77 / SEO 66)

Generated from the production Lighthouse screenshot on 2026-08-21 (`portfolio-amaribrahim-1s-projects.vercel.app`): **Performance 77**, Accessibility 100, Best Practices 100, **SEO 66**. This completes the leftover from Task 5.4.

**SEO does not raise the Performance score.** Task 6.1 is still worth doing — it is the cheap fix for the 66, and it helps real search results. Performance is 6.2–6.4. Task 6.5 is the measurement gate. Task 6.6 stays parked unless 6.5 is still below 90.

**Sequential, one task at a time**, per `.cursor/rules/git-conventions.mdc`: new branch off `main` per task, commit only when explicitly told, merge `--no-ff` into `main` when a task is confirmed done.

Build order: **6.1 → 6.2 → 6.3 → 6.4 → 6.5**. Do not start 6.6 unless 6.5 says so.

### Task 6.1 — SEO: canonical URLs + JSON-LD

Branch: `feat/lighthouse-seo`

Cheap metadata gaps. Does not invent copy. Does not change layout or motion.

- [x] Add `alternates.canonical` to root metadata in `src/app/layout.tsx` (`siteUrl` from `getSiteUrl()`).
- [x] Add `alternates.canonical` in `generateMetadata` in `src/app/projects/[slug]/page.tsx` (`${siteUrl}/projects/${slug}`).
- [x] Add `Person` + `WebSite` JSON-LD (`<script type="application/ld+json">`) in `layout.tsx`, sourced only from existing `content/profile.ts` (name, role, tagline, email, socials, photo). No new content file.
- [x] Confirm the live HTML uses the real production host, not `http://localhost:3000`. Task 5.8 already set `NEXT_PUBLIC_SITE_URL` on Vercel — this is a verify step (canonical / OG / sitemap URLs). Fix `src/lib/site.ts` only if the live host is wrong. Verified 2026-08-21: production `og:url` already uses the real Vercel host, no `localhost`; `site.ts` unchanged.

### Task 6.2 — Image delivery: AVIF + dead-asset cleanup

Branch: `feat/lighthouse-images`

Images already go through `next/image` with `sizes` / `priority` / blur. This task only changes what Next serves and deletes unused files.

- [x] In `next.config.ts`, add `images.formats: ["image/avif", "image/webp"]` so Next can serve AVIF where the browser supports it.
- [x] Delete unreferenced legacy files in `public/images/` (code already imports the `.webp` versions only): `amar.jpg`, `projects/areej/home.png`, `projects/exam-io/landing.png`, `projects/exam-io/preview.png`, `projects/bookstore/home.jpg`. Verified 2026-08-21: these were already removed in a prior commit (`feat(perf): serve WebP images...`) — only the `.webp` versions remain in `public/images/`.
- [x] Do not change `next/image` usage, `sizes`, or `priority`. Do not add a CMS or remote image host.

### Task 6.3 — BackToTop: stop scroll-driven re-renders

Branch: `fix/back-to-top-scroll`

`src/components/shared/BackToTop.tsx` attaches a raw `scroll` listener that `setState`s on every event. That is a cheap TBT/INP win.

- [x] Replace the raw `scroll` + `setState` loop with an `IntersectionObserver` on a hero sentinel, or a `requestAnimationFrame`-throttled handler. No new library. GSAP/ScrollTrigger is already allowed if that is cleaner.
- [x] Keep current behavior: hidden until the user has left the first screen (~50vh), Lenis `scrollTo(0)` on click, `aria-hidden` / `inert` when hidden, reduced-motion still uses native scroll.
- [x] Do not restyle the button. Do not add a JS cursor-follow.

### Task 6.4 — Trim unused Fraunces axes

Branch: `fix/fraunces-font-payload`

`src/app/layout.tsx` loads Fraunces with `style: ["normal", "italic"]` and `axes: ["opsz", "SOFT", "WONK"]`. Italic is required (`SplitHeadline` mustard accent). `SOFT` / `WONK` are unused in CSS.

- [x] Drop unused Fraunces axes (`SOFT`, `WONK`). Keep `italic`. Keep `opsz` only if headings still look the same at display sizes after a visual check; otherwise drop it too.
- [x] Do not change Geist or JetBrains Mono. JetBrains already has `preload: false`.
- [x] Confirm headings (Hero, About, Work, case-study `SplitHeadline`) still match the cinematic look — no layout shift, no missing italic mustard words.

### Task 6.5 — Re-run Lighthouse on production

Branch: none (measurement after 6.1–6.4 are merged into `main` and deployed)

- [x] Waited for the Vercel production deploy of 6.1–6.4 (pushed `main` 2026-08-21, confirmed live: canonical tag + `Person` JSON-LD present in the served HTML).
- [x] Ran Lighthouse **mobile** against `https://portfolio-amaribrahim-1s-projects.vercel.app` (not localhost). Result 2026-08-21: **Performance 76**, **Accessibility 100**, **Best Practices 100**, **SEO 69**.
- [x] Performance still below 90 → Task 6.6 is unblocked but **not started** (needs explicit go-ahead). SEO still below 90 → remaining Lighthouse SEO audit: `is-crawlable` ("Page is blocked from indexing") caused by response header `x-robots-tag: noindex` on the production URL. This header is added by the **Vercel platform/project settings**, not by app code (`robots.ts` / metadata already look correct) — likely the "Protect... / prevent indexing" deployment setting or default `*.vercel.app` domain behavior. Fixing it means a Vercel dashboard setting change, not new code.
- [x] Did not start 6.6 "just in case" — flagged only.

### Task 6.6 — Motion main-thread budget (only if 6.5 fails)

Branch: `fix/motion-main-thread`

Parked. Always-on Lenis + multiple `ScrollTrigger` instances can cost TBT on mobile. Invasive. Do not start unless Task 6.5 is still below 90.

- [x] Profiled via the production Lighthouse trace from 6.5 (`lighthouse-6.5.report.json`) instead of a fresh manual DevTools session — it already contains the mobile trace: `mainthread-work-breakdown` (Script Evaluation 971 ms, Style & Layout 627 ms, Other 490 ms), `long-tasks` (6 tasks, longest 226 ms / 201 ms / 178 ms, all inside vendor JS chunks between ~3.2 s–4.1 s — i.e. during/after hydration, not during scroll), and category weights (LCP weight 25 dominated by a 719 ms TTFB + render delay; TBT weight 30 at 320 ms; CLS already 1.0).
- [x] Findings: `ScrollPath` already skips entirely on mobile (`MOTION_MQ.desktop` gate), `SplitHeadline` already runs `"words"` mode on mobile (letters only ≥768px), `StaggerIn` already uses `once: true`, `ParallaxLayer` already shares one timeline/ScrollTrigger per root instead of one per layer. The long tasks trace to framework + GSAP/ScrollTrigger vendor script evaluating on a throttled mobile CPU, not to redundant/duplicated triggers — the existing budget rules (matchMedia gating, shared timelines, `once: true`) were already followed correctly, so there was no "extra" trigger to cut.
- [x] Cheapened the one legitimate finding: `SmoothScroll` started the Lenis instance + `gsap.ticker` loop synchronously in the mount effect, competing with hydration for main-thread time right when TBT/LCP render-delay is measured. Deferred that start to `requestIdleCallback` (200 ms timeout fallback via `setTimeout`) in `src/components/motion/SmoothScroll.tsx`. Local before/after `next build` + `next start` + mobile Lighthouse runs (noisy dev machine, not comparable in absolute terms to the production numbers) moved in the right direction: TBT 1593 ms → 1225 ms, Performance score 0.55 → 0.60. No visual/behavioral change — reduced-motion path and scroll behavior unaffected.
- [ ] Not done: did not remove/restructure any `ScrollTrigger` instance, did not skip Lenis on case-study routes, did not touch `SplitHeadline` letters/words logic — none of those were implicated by the trace, and doing them "just in case" would be exactly the invasive, unjustified rewrite this task warns against. Re-run Lighthouse on production after this merges and deploys; if still below 90, the next real lever is largely infra-side (LCP's 719 ms TTFB), not more motion trimming.
- [x] Did not add another animation library. Did not rewrite the motion stack — one function changed in one file.

---

## Phase 7 — Feedback pass (post-Vercel)

Generated from Amar’s feedback list (2026-08-27) after the live Vercel deploy. **Sequential, one task at a time**, per `.cursor/rules/git-conventions.mdc`: new branch off `main` per task, commit only when explicitly told, merge `--no-ff` into `main` when a task is confirmed done.

Personal / out-of-repo work is **not** in this phase — see `personal-backlog.md` (delete that file when the portfolio is done). Do not start a personal item as a product task. Do not mix leftover Phase 5/6 items into this phase.

**Locked decisions (do not re-litigate):**
- Contact is three actions: Email + WhatsApp + View CV. No contact-form backend.
- Dedicated homepage `#cv` section is removed (Task 7.7). CV lives at `/cv` as a branded HTML page + PDF download (Task 7.6).
- WhatsApp is now a public contact action (spec exception: phone was CV-only). Number `01014140935` → `https://wa.me/201014140935`.
- Hero gets a “See all projects” control that goes to `/projects` (grid archive). Homepage Work stays on vertical `StickyStack`.
- Areej is **production / Live** at `https://areej-store-kappa.vercel.app/`. Incoming hero screenshot: `docs/sources/areej/hero.jpg`.

Build order: **7.0 → 7.1 → 7.2 → 7.3 → 7.4 → 7.5 → 7.6 → 7.7**. Do not skip. Do not start a later task until the previous checkbox list is done.

### Task 7.0 — Write the task files

Branch: none (docs only — no product code)

- [x] Append this Phase 7 section to `tasks.md`.
- [x] Add `personal-backlog.md` at the repo root for personal / out-of-repo items.
- [x] Save the Areej production hero screenshot Amar supplied as `docs/sources/areej/hero.jpg` (source for Task 7.1 — do not convert or wire it in this task).
- [x] Do not change `src/`, `public/images/` (except the docs source above), or site copy.

### Task 7.1 — Areej + profile content (and Areej hero screenshot)

Branch: `feat/content-areej-profile`

Depends on 7.0. Content only plus swapping the Areej screenshot. Do not restyle Work cards (crop CSS is Task 7.3). Do not add `/projects` or `/cv`.

Sources — extract, do not invent:
- Areej: `docs/README.md`, `docs/portfolio-writeup.md`, live URL `https://areej-store-kappa.vercel.app/`, screenshot `docs/sources/areej/hero.jpg`.
- Profile: `src/content/profile.ts` + `portfolio-spec.md`. About still says “Right now I'm building Areej” — update so Areej is shipped. Draft English copy in the task chat and wait for Amar to confirm before merge.

- [x] `src/content/projects.ts` Areej: `status: "live"`, `statusLabel: "Live"`, `liveUrl: "https://areej-store-kappa.vercel.app/"`. Replace tagline + bullets + `tech` from the Areej README / writeup (shipped COD storefront, RLS/RPC, Arabic RTL — not the old “in active development” bullets).
- [x] Amar supplied `docs/sources/areej/hero.jpg` as JPEG (not WebP). Convert it to WebP **without a visible quality drop**: high quality / near-lossless (e.g. `cwebp -q 90` or equivalent; if the file balloons past ~400KB, try `-q 85` and compare side-by-side with Amar before keeping the smaller one). Do not downscale unless the source is larger than the largest `next/image` render. Replace `public/images/projects/areej/home.webp`, keep the jpg in `docs/sources/areej/` as the master. Update the screenshot `alt` to match this hero (Arabic storefront hero: bottle left, “تسوقي المنتجات” right). Keep `next/image`. This same asset is what Hero collage + Work card + case study already read from `projects.ts`.
- [x] `src/content/profile.ts`: update `aboutRows` so they match the shipped-Areej reality. Do not invent a new bio voice.
- [x] Update the Work table in `README.md` (Areej Live + demo link).
- [x] Move the copied Areej docs out of the portfolio docs root so they are not mistaken for this repo’s README: `docs/README.md` + `docs/portfolio-writeup.md` → `docs/sources/areej/`. Keep `docs/screenshots/` where it is.
- [x] Stop for Amar’s copy review. Do not merge invented case-study prose. Confirmed 2026-08-27: drop “MVP” from the tagline (reads as unfinished); keep the rest of the drafted About / bullets / tech.

### Task 7.2 — Navbar: smooth hash scroll, active section, close on outside click

Branch: `feat/nav-scroll-active`

Depends on 7.1. File: `src/components/shared/Navbar.tsx`. Logo already uses `scrollPageToTop` + Lenis; section hashes (`/#about`, `/#stack`, `/#work`, `/#contact`, and `/#cv` until 7.7) currently jump.

- [x] Shared hash helper in `src/lib/scroll.ts`: intercept in-page hash clicks and `lenis.scrollTo` the target. Reduced-motion / no Lenis → native jump. Cover Navbar links and the Hero “Work” `/#work` link.
- [x] Active nav link for the section currently in view (`IntersectionObserver` or ScrollTrigger). On `/projects` highlight Work; on `/cv` highlight Contact (or none — pick one and stay consistent). Mustard/cream contrast must stay readable.
- [x] Mobile menu closes on click outside the `<nav>` (Escape already closes). No new animation library.
- [x] Do not restyle the island. Do not add a JS cursor-follow.

### Task 7.3 — Work cards: tech chips + Areej crop

Branch: `feat/work-cards-tech-crop`

Depends on 7.1 (new Areej hero is a wide landscape: bottle left, Arabic copy + CTA right — `object-cover` + `aspect-[16/10]` in `ProjectPeak` will clip one side).

- [ ] Render `project.tech` on homepage Work cards in `src/components/sections/Projects.tsx` (chips from existing data; cap the count if the sticky card gets crowded on mobile).
- [ ] Fix the Areej Work-card crop so the bottle **and** the hero copy/CTA stay readable. Allowed: `object-contain`, a different `object-position`, a dedicated `cardScreenshot`, or a slightly different frame — not a new screenshot unless Amar supplies one. Do not break Exam.io / Bookstore peaks.
- [ ] Do not rebuild StickyStack. Do not add a 4th project.

### Task 7.4 — New portrait as WebP

Branch: `feat/portrait-webp`

Depends on 7.3 only for sequence (independent otherwise). Source photo: untracked `public/images/amar.jpg`. If Amar has already approved a Gemini brand-tinted version from `personal-backlog.md`, use that file instead — ask in the task chat before converting.

- [ ] Convert the chosen portrait to WebP, point `profile.photo` at it, delete leftover jpg / unused old `amar.webp`.
- [ ] `next/image` + existing `PortraitFrame` treatment. No new photo-editing library.
- [ ] Quick audit: product screenshots under `public/images/` stay WebP.

### Task 7.5 — `/projects` archive + “See all projects” + case-study Back

Branch: `feat/projects-index`

Depends on 7.1 (live Areej URL + copy).

- [ ] `src/app/projects/page.tsx`: grid of **all** projects from `content/projects.ts` (Exam.io, Areej, Bookstore). Not StickyStack. Bookstore stays without a case-study route. Metadata + canonical.
- [ ] Hero: add a “See all projects” control (label lives in `content/`, English, reviewed with Amar) linking to `/projects`. Keep the existing Work jump if it still earns its place; do not invent extra Hero copy.
- [ ] Case-study Back: replace the quiet “Projects” breadcrumb in `src/components/sections/CaseStudy.tsx` with a clear Back control to `/projects`.
- [ ] Thin route file — page composes a section component, no copy inline.

### Task 7.6 — In-site HTML CV page

Branch: `feat/cv-page`

Depends on 7.5 only for sequence. Source facts from `public/cv/Amar-Ibrahim-CV.pdf` into `src/content/cv.ts`. English. Do not invent jobs, dates, or skills.

- [ ] `src/app/cv/page.tsx`: branded HTML resume (forest/cream/mustard, Fraunces headings). Back control (home or `#contact`) + “Download PDF” to the existing file. No Google/Drive, no raw PDF tab as the primary view.
- [ ] Hero “My CV” button goes to `/cv` (not `target="_blank"` PDF).
- [ ] Metadata + canonical. Reduced-motion: no extra motion beyond existing primitives if any are used.
- [ ] Stop for Amar’s copy review against the PDF before merge.

### Task 7.7 — Contact merge: Email + WhatsApp + View CV

Branch: `feat/contact-merge`

Depends on 7.6 so “View CV” does not 404.

- [ ] Remove `src/components/sections/Cv.tsx` from `src/app/page.tsx` (delete the section component if nothing else imports it). Drop `{ href: "/#cv", label: "CV" }` from `navLinks`.
- [ ] `src/content/profile.ts`: add `whatsappHref: "https://wa.me/201014140935"`. Do not invent a second phone display.
- [ ] `src/components/sections/Contact.tsx`: three primary actions — Email (`mailto:`), WhatsApp (`wa.me`), View CV (`/cv`). Keep LinkedIn + GitHub as secondary socials. No form fields, no backend, no Resend.
- [ ] Update Footer only if a CV/contact link there would otherwise 404 or still point at the old `#cv` section (today Footer is email + socials only).
- [ ] Confirm keyboard + mobile: three CTAs wrap, focus rings stay visible.

