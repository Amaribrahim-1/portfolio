# Brand color system

Personal palette extracted from the live portfolio tokens. **This file is a reuse reference, not a restyle spec.** Extra tints/shades below are derived; they are not CSS variables in `src/` unless you later wire them in.

Source of truth: `:root` in `src/app/globals.css`. Same four hexes are hardcoded in `src/lib/og-image.tsx` and `src/lib/app-icon.tsx`.

Retired: mint `#00E6A0`. Do not bring it back.

---

## Anchors

| Name | Hex | RGB | HSL | CSS | Tailwind |
| --- | --- | --- | --- | --- | --- |
| Forest | `#0E2A26` | `14 42 38` | `171 100% 11%` | `--forest` | `forest` |
| Cream | `#F3EEE4` | `243 238 228` | `40 38% 92%` | `--cream` | `cream` |
| Mustard | `#E4B52A` | `228 181 42` | `45 78% 53%` | `--mustard` | `mustard` |
| Sage | `#9BB3A0` | `155 179 160` | `133 14% 65%` | `--sage` | `sage` |

UI exception (not a brand hue): `--destructive: #D96B5C` in `globals.css`.

Poles: **cream is light, forest is dark.** Mix in `oklab` toward one of those two. Do not neutralize with gray. Pure white appears once (CV frame inner pad). Pure black appears only inside transparent shadows.

---

## Role of each color

### Forest — dark surface and ink

- **Background:** page default (`--background`), Hero, Projects, Contact, Navbar island, Footer, case-study header, 404.
- **Text:** on cream and sage surfaces (`text-forest`).
- **Hover fill:** outline buttons on cream use `hover:bg-forest/10`.
- **Not:** body text on forest (use cream). Not a hover destination (use mustard).

### Cream — light surface and body text

- **Background:** About, Tech Stack, case-study body, Contact card, CV preview paper.
- **Text:** on forest (`text-cream`). Secondary copy: `cream/85` (links) and `cream/75` (body).
- **Border / hairline on dark:** `cream/20` (navbar, frames), `cream/15` (rings), `cream/10` (footer rule, huge watermark type).
- **Not:** a hover color. Not body text on cream.

### Mustard — accent, CTA, hover, focus

- **Primary / accent / ring:** `--primary`, `--accent`, `--ring` all point here. Primary button is mustard fill, forest label (`--primary-foreground`).
- **Hover / active:** nav, footer, back links, brand name → `hover:text-mustard`. Active nav link is mustard, not sage.
- **Display accent:** Fraunces italic words (`SplitHeadline`), section numbers, mono eyebrows, scroll-progress bar, homepage SVG path, scrollbar thumb.
- **Glow:** photo frame and Hero collage borders; Hero CV button glow `mustard` 38% → 58% on hover.
- **Not:** body text on cream (contrast fails). Not large fills — it is the spark, not the room.

### Sage — supporting surface and muted chrome

- **Background:** one card in the About / Work / Stack rotation (with `text-forest`).
- **Muted text on forest:** nav resting links, footer copyright (`text-sage`). `--muted-foreground` is sage.
- **Not:** primary CTA. Not body text on cream (contrast fails). Hover still goes to mustard, not a lighter sage.

---

## Pairing and contrast

Ratios are WCAG 2.x relative luminance on the four hexes (and destructive). Large text = 18px+ bold or 24px+ regular.

| Foreground on background | Ratio | Normal text (4.5) | Large text (3.0) |
| --- | --- | --- | --- |
| Cream on forest | 13.18 | AAA | AAA |
| Forest on cream | 13.18 | AAA | AAA |
| Mustard on forest | 7.94 | AAA | AAA |
| Forest on mustard | 7.94 | AAA | AAA |
| Sage on forest | 6.79 | AA | AAA |
| Forest on sage | 6.79 | AA | AAA |
| Destructive on forest | 4.51 | AA | AAA |
| Mustard on cream | 1.66 | Fail | Fail |
| Sage on cream | 1.94 | Fail | Fail |
| Cream on sage | 1.94 | Fail | Fail |
| Mustard on sage | 1.17 | Fail | Fail |
| Destructive on cream | 2.93 | Fail | Fail |

The live site uses mustard for large Fraunces numbers on cream sections anyway. That is a display choice, not a readable body pairing. When reusing the palette for UI chrome or small type, keep mustard on forest and forest on cream.

---

## Tints and shades

Derived with the same model the site uses: `color-mix(in oklab, A p%, B)`. Hexes are 8-bit sRGB; a browser may differ by one level. **None of these extra steps are tokens** unless you add them later.

### Forest — lighter toward cream, darker toward black

| Mix | Hex | Already live? |
| --- | --- | --- |
| 90% forest + black | `#0B2320` | no |
| **100% forest** | **`#0E2A26`** | **anchor** |
| 88% forest + cream | `#273E3A` | `--card`, `--popover`, `--sidebar` |
| 82% forest + sage | `#26403A` | `--secondary`, `--muted` |
| 72% forest + cream | `#495B55` | Work / Stack dark card |
| 70% forest + cream | `#4D5F59` | `--chart-5` |
| 50% forest + cream | `#79857E` | no |
| 30% forest + cream | `#A8AEA6` | no |
| 10% forest + cream | `#DAD8CF` | same as cream 90% + forest |

### Cream — darker toward forest, lighter toward white

| Mix | Hex | Already live? |
| --- | --- | --- |
| 70% cream + white | `#F7F3EC` | CV frame inner pad |
| **100% cream** | **`#F3EEE4`** | **anchor** |
| 92% cream + forest | `#DFDDD3` | device-frame chrome |
| 90% cream + forest | `#DAD8CF` | CV frame title bar |
| 50% cream + forest | `#79857E` | no |
| 14% cream + transparent | — | `--border` on dark |
| 16% cream + transparent | — | `--input` on dark |

### Mustard — lighter toward cream, darker toward forest

| Mix | Hex | Already live? |
| --- | --- | --- |
| 78% mustard + cream | `#E8C263` | scrollbar thumb hover |
| **100% mustard** | **`#E4B52A`** | **anchor** |
| 80% mustard + forest | `#B69733` | no (primary button uses `mustard/80` opacity instead) |
| 50% mustard + forest | `#756D35` | no |
| 55% mustard + transparent | — | photo-frame border |
| 38% / 58% mustard + transparent | — | Hero CTA glow rest / hover |

### Sage — lighter toward cream, darker toward forest

| Mix | Hex | Already live? |
| --- | --- | --- |
| 70% sage + cream | `#B5C4B4` | no |
| **100% sage** | **`#9BB3A0`** | **anchor** |
| 55% sage + forest | `#587266` | `--chart-4` |
| 35% sage (opacity) | — | device-frame screenshot fallback |

### Opacity steps used on the site (not new hexes)

- Cream: `/85` `/75` `/20` `/15` `/10`
- Forest: `/70` `/55` `/50` `/40` `/20` `/15` `/10`
- Mustard: `/75` `/45` plus the glow percentages above
- Sage: `/35`

---

## Hover, focus, surfaces

| State | Pattern |
| --- | --- |
| Link / nav hover | color → mustard, 150–200ms, `color` only |
| Primary button hover | `bg-primary/80` (mustard at 80% opacity), forest label stays |
| Outline on cream | `hover:bg-forest/10`, label stays forest |
| Focus ring | mustard (`--ring`) |
| Active nav | mustard (resting is sage) |
| Scrollbar | track forest, thumb mustard, hover thumb `#E8C263` |

Section rhythm (single theme, not a light/dark toggle):

1. Hero — forest
2. About + Tech Stack — cream
3. Projects — forest
4. Contact — forest, with a cream card

Cards inside a section rotate forest / cream / sage so two neighbors are never the same surface.

---

## Type (keep with the colors)

| Role | Face | Where |
| --- | --- | --- |
| Display | [Fraunces](https://fonts.google.com/specimen/Fraunces) | Headings, italic mustard accent words. `next/font`: `style: ["normal", "italic"]`, `axes: ["opsz"]` |
| Body | [Geist](https://vercel.com/font) | `html` / `--font-sans` |
| Tags | [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) | Eyebrows, nav, chips. Weights 400 and 500. Uppercase + wide tracking (`0.15em`–`0.2em`) |

---

## Reuse note

Paste this into another project and stop. Do not add a fifth hue or a mint accent.

```css
:root {
  --forest: #0e2a26;
  --cream: #f3eee4;
  --mustard: #e4b52a;
  --sage: #9bb3a0;

  --background: var(--forest);
  --foreground: var(--cream);
  --primary: var(--mustard);
  --primary-foreground: var(--forest);
  --ring: var(--mustard);
}
```

- Dark block: forest background, cream text, sage for quiet labels, mustard for the one accent.
- Light block: cream background, forest text, sage as a third card, mustard only as a large display accent or a button that sits on forest.
- Hover target is mustard. Focus ring is mustard.
- Mix extras with `color-mix(in oklab, var(--forest) p%, var(--cream))` (or the reverse). That is how cards, borders, and the scrollbar hover are built.
- Fonts travel with the palette: Fraunces / Geist / JetBrains Mono.

Do not restyle this portfolio from the extra ramps in this file.
