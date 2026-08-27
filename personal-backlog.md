# Personal backlog — not product tasks

Disposable checklist for Amar. **Delete this file** when the portfolio is done (100%). Nothing here goes into `tasks.md` or gets implemented as site code until Amar explicitly promotes it.

Agents: do not start these in a Phase 7 product chat. If a personal item produces a file Amar wants on the site, stop and add a new task to Phase 7 after he confirms.

---

## Brand color system

Done — `docs/color-system.md`. Tints/shades, roles, contrast, hover, and a paste-ready `:root`. Not wired into `src/`.

## Gemini portrait

Source: `public/images/amar.jpg` (new photo, currently untracked).

Amar runs this in Gemini (image + prompt). The agent in a later chat can re-paste the prompt if he asks — do not invent a different brief.

```
Edit this photo for a personal portfolio. Keep my exact face, identity, skin, hair, facial hair, expression, and pose — do not beautify, age, restyle, or replace me with a different person. No extra people.

Treat this as a color-grade / lighting pass, not a new portrait:
- Background and light toward forest green #0E2A26
- Warm highlight / accent toward mustard #E4B52A
- Skin and clothing stay natural; cream #F3EEE4 only if a soft fill is needed
- No mint/neon green, no heavy Instagram filter, no illustration, no 3D, no text, no logo, no crop that cuts the head

Output a realistic photograph that still looks like the original shot of me.
```

Amar picks the winner.

- If a version is approved **before** Task 7.4: that file is what 7.4 converts to WebP.
- If Gemini is not ready: Task 7.4 converts `amar.jpg` as-is.

## Hero collage — new image ideas

The landing-page right column is Exam.io preview + Areej hero + portrait (`src/components/sections/Hero.tsx`).

Look at options (different screenshots, fewer layers, different crop). Research only. Any swap becomes a **new** Phase 7 task after Amar chooses — do not change Hero in 7.1 just because Areej’s screenshot file changed (7.1 *does* replace the Areej asset those layers already point at).

## Other portfolios — steal structure, not copy

Browse live portfolios and note 3–5 ideas (layout, CTA, case-study rhythm). Amar decides what, if anything, becomes a task. No silent redesign.

## Bookstore on Vercel

Out of this repo. Project: `Amaribrahim-1/Book-Store`.

Current URL in `src/content/projects.ts`: `https://book-store-bay-phi.vercel.app`. Redeploy/fix that project so the demo works. If the production URL changes, tell an agent to update `liveUrl` in a tiny follow-up — not as part of 7.1.

## Freelance site links

Parked until Amar has real URLs. Then a small content task: add them in `src/content/profile.ts` / Contact. Do not invent placeholder freelance domains.
