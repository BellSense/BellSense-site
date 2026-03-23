# BellSense Website — Agent Reference

**Last Updated:** 2026-03-23 (session 5)
**Status:** Live at bellsense.app — Stripe deferred, articles + program content live
**Live domain:** bellsense.app (Vercel, connected to this repo's `main` branch)

---

## What This Site Is

Marketing and commerce site for BellSense hardware. The site's primary job is converting visitors into hardware buyers. Everything meaningful (programs, account) is gated behind `hasPurchased: true` on the Firestore user record.

**Core purchase flow:**
Landing → `/buy` → Firebase auth → Stripe Checkout → webhook sets `hasPurchased: true` → `/account` with app download link

**Returning customer flow:**
Nav "Sign In" → `/login` → Firebase auth → `/account`

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (tokens via `@theme` in `globals.css`, NOT `tailwind.config.ts`) |
| Auth | Firebase Auth JS SDK (same `perfectreps-e3ba7` project as iOS app) |
| Database | Firestore (existing project — shared with iOS) |
| Payments | Stripe Checkout |
| Content | MDX files (`content/articles/`, `content/programs/`) read via `gray-matter` + `next-mdx-remote/rsc` |
| Hosting | Vercel |

**Design tokens** (defined in `app/globals.css` under `@theme`):
- Red: `#e5322d`
- Dark bg: `#111111`
- Text: `#f0f0f0`
- Muted: `#9ca3af`

**Important Tailwind note:** This project uses Tailwind v4 which has no `tailwind.config.ts`. Design tokens are in `app/globals.css` via `@theme {}`. Do not create a `tailwind.config.ts` — it won't be used.

---

## File Structure

```
bellsense-site/
├── app/
│   ├── layout.tsx                      # Root layout: Nav + Footer
│   ├── globals.css                     # Tailwind v4 tokens (@theme)
│   ├── page.tsx                        # Homepage: hero, value props, how it works, CTA
│   ├── buy/page.tsx                    # Purchase page: product card + auth modal + Stripe
│   ├── login/page.tsx                  # Returning customer sign-in (Google + email, no signup)
│   ├── account/page.tsx                # Gated: purchase status + app download link
│   ├── articles/
│   │   ├── page.tsx                    # Articles index (reads content/articles/)
│   │   └── [slug]/page.tsx             # Article detail (MDX via next-mdx-remote/rsc)
│   ├── programs/
│   │   ├── page.tsx                    # Public: programs index — locked cards for non-purchasers
│   │   └── [slug]/page.tsx             # Gated: program detail (MDX)
│   ├── faq/page.tsx                    # Static FAQ (data array inline)
│   ├── privacy/page.tsx                # Privacy policy (JSX, migrated from HTML)
│   ├── terms/page.tsx                  # Terms of service (JSX, migrated from HTML)
│   └── api/
│       ├── auth/session/route.ts       # POST: create session cookie / DELETE: clear it
│       ├── checkout/route.ts           # POST: create Stripe Checkout session (US-only shipping + phone collection)
│       ├── beta-application/route.ts   # POST: save beta applicant to Firestore betaApplications collection
│       └── webhooks/stripe/route.ts   # POST: handle checkout.session.completed
├── components/
│   ├── Nav.tsx                         # Top nav — auth-aware (Sign In / My Account via onAuthStateChanged)
│   ├── Footer.tsx                      # Footer with Privacy/Terms/Support links
│   └── AuthGuard.tsx                   # Client-side purchase check (secondary guard)
├── lib/
│   ├── firebase-client.ts              # Firebase JS SDK — lazy init, client-side only
│   ├── firebase-admin.ts               # Firebase Admin SDK — lazy init, server-side only
│   ├── stripe.ts                       # Stripe SDK — lazy init
│   └── auth.ts                         # Session cookie helpers (create/get/clear)
├── content/
│   ├── articles/                       # 15 MDX articles (welcome + 14 editorial pieces)
│   └── programs/                       # 9 MDX files — frontmatter + full body content
├── middleware.ts                       # Edge route protection: /programs/* and /account
├── next.config.ts                      # Includes rewrite: /beta → /beta.html (standalone page, bypasses app layout)
├── tsconfig.json
├── package.json
└── .env.local.example                  # Template — copy to .env.local with real keys
```

---

## Auth Architecture

Firebase Auth is shared with the iOS app — same `perfectreps-e3ba7` project. A user who creates an account on the website and buys hardware has the same UID as their iOS account.

**Session flow:**
1. User signs in via Firebase Auth JS SDK on `/buy` (new customer) or `/login` (returning customer)
2. Client calls `POST /api/auth/session` with Firebase ID token
3. API verifies with Firebase Admin → sets HTTP-only `bs_session` cookie (7-day)
4. `middleware.ts` checks for `bs_session` cookie on `/programs/[slug]` and `/account` requests
5. If no cookie → redirect to `/login`
6. Page-level server components call `getSession()` for full verification + `hasPurchased` check

**Nav auth state:** `Nav.tsx` uses `onAuthStateChanged` client-side to show "Sign In" (→ `/login`) or "My Account" (→ `/account`). Renders nothing during the loading instant to avoid flash.

**Firestore user record fields written by the webhook:**
```
users/{uid}/
  hasPurchased: bool
  purchasedAt: Timestamp
  stripeCustomerId: string
  shippingAddress: { line1, line2, city, state, postal_code, country } | null
  shippingName: string | null
  shippingPhone: string | null
  customerEmail: string | null
```

**Beta applicant records (Firestore):**
```
betaApplications/{docId}/
  name: string
  email: string
  experience: string   (dropdown value)
  style: string        (dropdown value)
  notes: string
  submittedAt: Timestamp
  status: "pending"    (manually set to "approved"/"rejected" in Firebase console)
```
All other fields (iOS app data) are left untouched via `{ merge: true }`.

---

## Middleware

`middleware.ts` at the project root. Exports `middleware` (not default). Protects `/programs/[slug]` (individual program pages) and `/account` with a cookie presence check. **The `/programs` index is public.** Full `hasPurchased` verification happens in the server component via `getSession()`. No-cookie redirect goes to `/login` (not `/buy`).

**Critical:** The file must be named `middleware.ts` and export `function middleware`. Next.js 16 still uses this convention — do not rename it.

---

## Content System

### Articles (`content/articles/*.mdx`)
Required frontmatter:
```yaml
---
title: string
slug: string         # must match filename without .mdx
date: string         # YYYY-MM-DD
description: string
---
```

### Programs (`content/programs/*.mdx`)
Required frontmatter:
```yaml
---
title: string
slug: string         # must match filename without .mdx
difficulty: "Beginner" | "Intermediate" | "Advanced"
weeks: number
sessionsPerWeek: number
archetype: string
bestFor: string      # one-line description shown on the index card
---
```
**Current programs (all have full body content):**
| File | Title | Difficulty |
|------|-------|------------|
| `my-first-program.mdx` | My First Program | Beginner |
| `foundations-30.mdx` | Foundations of Kettlebell Mastery | Beginner |
| `one-arm-swing-12.mdx` | One Bell Standard | Beginner |
| `power-endurance-30.mdx` | Power Endurance Builder | Intermediate — stub only, body pending |
| `road-to-100-snatch.mdx` | Road to 100 (Snatch) | Intermediate |
| `work-capacity-8.mdx` | Work Capacity Protocol | Intermediate |
| `iron-continuum-8.mdx` | Iron Continuum | Intermediate |
| `power-cycle-8.mdx` | Power Cycle | Advanced |
| `10-minute-engine-8.mdx` | 10-Minute Engine | Advanced |

**Current articles** (all at `/articles/[slug]`):
| File | Title |
|------|-------|
| `welcome.mdx` | Welcome to BellSense |
| `philosophy.mdx` | Philosophy |
| `warning-this-will-make-you-work-harder.mdx` | Warning: This App Will Make You Work Harder |
| `the-pause-button-is-your-friend.mdx` | The Pause Button Is Your Friend |
| `how-to-get-a-good-score.mdx` | How to Get a Good Score |
| `why-interval-training.mdx` | Why Interval Training? |
| `full-body-tension.mdx` | Full-Body Tension |
| `strength-the-bellsense-way.mdx` | Strength the BellSense Way |
| `workout-stack-overview.mdx` | The BellSense Workout Stack — Part 1 |
| `workout-stack-breathing.mdx` | The BellSense Workout Stack — Part 2 |
| `workout-stack-abs.mdx` | The BellSense Workout Stack — Part 3 |
| `workout-stack-ballistics.mdx` | The BellSense Workout Stack — Part 4 |
| `workout-stack-strength.mdx` | The BellSense Workout Stack — Part 5 |
| `workout-stack-cooldown.mdx` | The BellSense Workout Stack — Part 6 |
| `taking-care-of-your-hands.mdx` | Taking Care of Your Hands |

---

## Environment Variables

Copy `.env.local.example` → `.env.local` and fill in all values before running locally. All variables must also be added to the Vercel dashboard.

```bash
# Firebase (client-side — safe to expose)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=

# Firebase Admin (server-only — from service account JSON)
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=        # paste the full private key including \n newlines

# Stripe
STRIPE_SECRET_KEY=                 # sk_test_... for dev, sk_live_... for prod
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=             # from Stripe dashboard webhook config

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000   # https://bellsense.app in production
```

**Firebase Admin private key note:** Paste the key with literal `\n` characters (not real newlines). `lib/firebase-admin.ts` strips surrounding quotes and normalizes newlines defensively — both formats work. Prefer adding via `vercel env add` CLI over the web UI to avoid encoding issues.

---

## Roadmap / TODO

### Before first deploy (blockers)

- [x] **Set env vars in Vercel** — done 2026-03-17. Firebase + session cookie set. Stripe vars left blank (deferred).
- [x] **Deploy to Vercel** — done 2026-03-17. Live at bellsense.app + www.bellsense.app.
- [ ] **Set real Stripe price** — update `unit_amount: 9900` in `app/api/checkout/route.ts` to the actual hardware price.
- [ ] **Set App Store link** — replace `href="https://apps.apple.com"` placeholder in `app/account/page.tsx` with the real App Store URL.
- [ ] **Register Stripe webhook** — in Stripe dashboard, add endpoint `https://bellsense.app/api/webhooks/stripe` for event `checkout.session.completed`. Copy the webhook signing secret → `STRIPE_WEBHOOK_SECRET`.
- [ ] **Firebase Storage security rules** — manually set rules in Firebase console so `training/{userId}/{fileName}` is locked to `request.auth.uid == userId`. (iOS opt-in training data feature.)
- [ ] **Test full purchase flow end-to-end** — sign up → Stripe test checkout → confirm webhook fires → Firestore `hasPurchased: true` → `/account` shows success banner → `/programs` accessible.
- [x] **Verify `/programs` and `/account` redirect unauthenticated users** — done 2026-03-18. `/programs` index is now public; `/programs/[slug]` and `/account` redirect to `/login`.
- [x] **Beta recruitment page** — done 2026-03-23. `public/beta.html` (standalone, bypasses app layout — own nav/footer/fonts/amber color scheme). Accessible at `/beta` via next.config.ts rewrite. Form POSTs to `/api/beta-application` → Firestore `betaApplications`. US shipping collected at Stripe checkout; address saved to Firestore on webhook.
- [x] **Site professionalization** — done 2026-03-21. Favicon (real app icon PNG from iOS assets), mobile hamburger nav, security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`), per-page metadata on all routes, 404 page, `sitemap.xml`, `robots.txt`, FAQ mounting copy fix, account program count corrected to 9.

### Content (post-launch or pre-launch)

- [x] **Program detail content** — done 2026-03-18. 8 of 9 programs have full MDX body (philosophy, week-by-week, success criteria, next program). `power-endurance-30.mdx` is still a frontmatter-only stub.
- [x] **Articles** — done 2026-03-18. 14 editorial articles live covering philosophy, score, interval training, full-body tension, strength, the workout stack series (6 parts), and hand care.
- [x] **Homepage copy** — done 2026-03-18 (session 3). Full philosophy-first overhaul: "The sensor doesn't lie" hero, junk-rep problem framing, accountability solution, feature copy rewrite, mindset-based use cases, "Make every rep matter" final CTA. Source: `landing-page-copy-audit.md`.
- [x] **Homepage copy updates** — done 2026-03-21. Step 1 mounting instruction updated ("Attach BellSense to the kettlebell beneath the handle"). "Who it's for" expanded to 4 cards with new "Wants real coaching" card (grid changed to `md:grid-cols-2` 2×2 layout).
- [x] **OG image / social card** — done 2026-03-21. Dynamic route at `app/api/og/route.tsx` using `next/og` + Geist Bold. Dark bg, red logo mark, "The sensor doesn't lie." headline, session score screenshot panel. `layout.tsx` wired with `metadataBase`, `openGraph`, and `twitter` metadata.
- [x] **Feature card screenshots** — done 2026-03-23 (updated). Hero: `workout-screen.png` (`object-contain`, 280×420px). Cards: Rep Counting → `main-picture.png`, Velocity & Power → `velocity-power.png`, Track Your Progress → `workout-progress.png`, Session Score → `session-score.png`. Removed `junk-rep.png` card.

### Near-term features

- [x] **Sign in for returning customers** — done 2026-03-18. Dedicated `/login` page added; Nav shows "Sign In" / "My Account" based on auth state.
- [x] **Sign out** — done 2026-03-21. `SignOutButton` component calls `DELETE /api/auth/session` + `signOut(auth)` + redirects to `/`. Shown on `/account` and in desktop + mobile nav.
- [x] **Apple Sign-In on web** — done 2026-03-21. `OAuthProvider('apple.com')` added to `/buy` and `/login`. Apple button sits above Google per HIG prominence requirement. Firebase configured with Service ID `com.bellsense.web`, Team ID, Key ID, and `.p8` private key. Fully live. **Note:** never commit `.p8` files — added to `.gitignore`.
- [ ] **Account page: show purchase date** — `getSession()` returns `uid` but not `purchasedAt`. Update `lib/auth.ts` to also return `purchasedAt` from Firestore and display it on `/account`.
- [ ] **Order confirmation email** — use Stripe's built-in receipt emails (enable in Stripe dashboard) or add a Firebase email trigger. Not currently implemented.

### Future / post-launch

- [x] **Social auth on web** — Apple Sign-In done 2026-03-21 (see near-term above).
- [ ] **Customer portal** — Stripe Customer Portal for viewing purchase history. Low priority given one-time purchase model.
- [ ] **BellSense+ subscription tier** — when the subscription tier launches (see `/Long Range Strategy Docs/pricing_business_model_vision.md`), add a separate Stripe product with `mode: 'subscription'` and a second gating level (`hasSubscription: true`).
- [ ] **Program marketplace** — when the social/community tier launches, programs become user-generated content. See `/Long Range Strategy Docs/social_community_vision.md`.

---

## Local Development

```bash
cd bellsense-site
cp .env.local.example .env.local   # fill in your values
npm install
npm run dev                         # http://localhost:3000
```

To test the Stripe webhook locally, use the Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
The CLI prints a `whsec_...` signing secret — use that as `STRIPE_WEBHOOK_SECRET` in `.env.local` during local testing.

```bash
npm run build    # verify no type errors before pushing
```

---

## Landing Page Voice & Copy Rules

The landing page uses a philosophy-first voice drawn from the editorial articles. Do not revert to generic fitness-tech marketing language. Key rules:

- **Tagline:** "No junk reps." — eyebrow text in hero, core concept throughout
- **Hero headline:** "The sensor doesn't lie." — confrontational, not promotional
- **Accountability frame:** "BellSense won't let you cheat anymore" / "There's nowhere to hide" — this is the differentiator, not tracking convenience
- **Features:** Written through the philosophy lens — Session Score is the *accountability number*, Fatigue Tracking is *Junk Rep Detection*
- **Who it's for:** Mindset framing (Tired of junk volume / Want to understand why / Ready to be held accountable) — NOT demographic segments
- **Final CTA:** "Make every rep matter." — do not replace with data/tracking language
- **Avoid:** "Smart training system", "track your performance", "see your metrics", anything that sounds like Fitbit/Whoop/Garmin
- **Source of truth for voice:** `landing-page-copy-audit.md` + `content/articles/philosophy.mdx`

---

## UI & Styling Notes

- **Tailwind v4 plugins**: Added via `@plugin "..."` in `globals.css`, NOT in a config file. e.g. `@plugin "@tailwindcss/typography"`.
- **Typography plugin**: `@tailwindcss/typography` is installed and registered. Use `prose prose-invert prose-base` on `<article>` elements — do not use `prose-sm`.
- **Font**: Geist (`geist` npm package) — imported as `GeistSans` from `geist/font/sans`, applied via `.variable` on `<html>` and `--font-sans` token in `@theme`.
- **Noise texture**: Full-screen `body::before` pseudo-element in `globals.css` at `opacity: 0.035`. Nav/main/footer have `position: relative; z-index: 1` to sit above it.
- **Nav**: Sticky, `backdrop-blur-md`, `bg-[#111111]/80`. Auth state via `onAuthStateChanged` — renders nothing during load to avoid flash.
- **Card hover pattern**: `border-l-2 border-l-white/10 hover:border-l-[#e5322d] hover:bg-white/[0.07]` + `group`/`group-hover:text-white` for editorial left-border treatment.

---

## Key Decisions (do not change without understanding the consequences)

1. **Tailwind v4** — no `tailwind.config.ts`. Tokens live in `app/globals.css`. Do not add a config file.
2. **Lazy Firebase/Stripe init** — `lib/firebase-admin.ts`, `lib/firebase-client.ts`, and `lib/stripe.ts` use lazy getter functions, not module-level `initializeApp()`. This prevents build-time crashes when env vars aren't present. Do not revert to eager init.
3. **Middleware file name** — must be `middleware.ts` exporting `function middleware`. Do not rename.
4. **Shared Firebase project** — `perfectreps-e3ba7` is the same Firebase project used by the iOS app. Web accounts and iOS accounts share UIDs. The Firestore `users/{uid}` document must always use `{ merge: true }` to avoid clobbering iOS app fields.
5. **MDX via `next-mdx-remote/rsc`** — articles and programs use `MDXRemote` from `next-mdx-remote/rsc` (React Server Components version). Do not use the client version.
6. **Cookie name** — session cookie is `bs_session`. The middleware checks for this by name. If you rename it, update both `lib/auth.ts` and `middleware.ts`.

---

## Related Docs (main PerfectReps repo)

| Need to... | Read... |
|------------|---------|
| Understand the iOS app | `/ios-app/CLAUDE.md` |
| See program design philosophy | `/Long Range Strategy Docs/program_template_spec.md` |
| See program JSON (source of truth for program data) | `/ios-app/BellSense/Resources/programs.json` |
| See pricing / tier strategy | `/Long Range Strategy Docs/pricing_business_model_vision.md` |
| See social / community vision | `/Long Range Strategy Docs/social_community_vision.md` |
| See onboarding flow | `/Long Range Strategy Docs/onboarding_welcome_program_roadmap.md` |
