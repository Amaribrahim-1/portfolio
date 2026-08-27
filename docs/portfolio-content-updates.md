# Portfolio Content Updates — sourced from updated CV (Amar_Ibrahim_CV.pdf)

Status: Areej is now confirmed **Live** in both the CV and the portfolio — the earlier
"Live" vs. "Present/in-progress" contradiction is resolved. No more inconsistency to flag there.

---

## 1. `src/content/profile.ts` — About card 01

Add the GPA into the existing sentence (per your decision to include it):

**Before:**
> I'm Amar, a frontend developer and final-year Computer Science student based in Egypt.

**After:**
> I'm Amar, a frontend developer and final-year Computer Science student (GPA 3.45/4.0) based in Egypt.

---

## 2. `src/content/projects.ts` — Areej bullets

The new CV adds two real, previously-undocumented features (contact inbox, image
compression under the Supabase storage cap, and owner notifications) and confirms wording for
the RPC/RLS bullets. Updated bullet set:

1. Shipped a full COD storefront and server-guarded admin for a live client: catalog,
   persisted guest cart, checkout, order history, reviews, and a contact inbox. Arabic-only, RTL.
2. Order totals are never trusted from the client — a Postgres `place_order` RPC re-reads
   variant prices and is the only writer; the client sends variant and quantity, no price.
3. RLS plus column grants: customers cannot update `profiles.role`; admins can update
   `orders.status` only. Admin checks go through a private `is_admin()` helper.
4. Server data lives in TanStack Query; cart and UI state in Zustand. Forms are React Hook
   Form + Zod, re-validated before every write.
5. **New:** Compresses product images to WebP client-side to stay under Supabase's 1GB
   free-tier storage cap, and notifies the store owner via WhatsApp/email on each order —
   without blocking checkout if the notification itself fails.

*(Bullet 5 is new — it wasn't in the old portfolio copy at all. It's a good addition: it shows
you thinking about a real infrastructure constraint (storage limits), not just CRUD features.)*

Optional, still open from before — I included it here since you didn't push back on the
reasoning, but flag if you'd rather drop it:

6. Designed a normalized 7-table Postgres schema across 8 migrations, with row-level
   security and role-scoped access policies (guest, customer, admin).

Tagline: no change needed — the current portfolio tagline ("Arabic/RTL e-commerce store for
a real fragrance shop — COD checkout and a server-guarded admin") already covers what the
CV's shorter tagline says, plus more. Keep it.

Tech list: no change needed, already matches.

---

## 3. Suggestion — Education

You decided to add the GPA (see #1 above), folded into the existing About card. That's the
lightest option and keeps the About section's five-card structure untouched.

If you want it to carry more weight, an alternative is a **dedicated Education line/section**
instead of (or in addition to) folding it into card 01 — e.g. a small line under the About
section or a row in the Contact/CV area: "B.Sc. Computer Science, [University] — GPA
3.45/4.0 (in progress)". This matters if you think a recruiter skimming the site (not the CV)
would want to see it as a standalone fact rather than buried in a sentence about you generally.

Trade-off: folding it into the sentence (current plan) keeps the page clean and matches the
existing five-card rhythm; a standalone line is more visible but adds a new UI element that
doesn't exist anywhere else on the site right now. Your call — say which you want and I'll
finalize the wording for whichever file it lands in.

---

## 4. Not touched (already accurate, matches CV 1:1)

- Exam.io bullets, tech stack, links
- Online Bookstore bullets, tech stack, links
- Skills / stack list (`skills.ts`)
- Contact, nav, and CV page copy
