# BellSense Website — Agent Reference

**Last Updated:** 2026-03-16
**Status:** Scaffolded, build clean — not yet deployed to production
**Live domain:** bellsense.app (Vercel, connected to this repo's `main` branch)

---

## What This Site Is

Marketing and commerce site for BellSense hardware. The site's primary job is converting visitors into hardware buyers. Everything meaningful (programs, account) is gated behind `hasPurchased: true` on the Firestore user record.

**Core purchase flow:**
Landing → `/buy` → Firebase auth → Stripe Checkout → webhook sets `hasPurchased: true` → `/account` with app download link

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
│   ├── account/page.tsx                # Gated: purchase status + app download link
│   ├── articles/
│   │   ├── page.tsx                    # Articles index (reads content/articles/)
│   │   └── [slug]/page.tsx             # Article detail (MDX via next-mdx-remote/rsc)
│   ├── programs/
│   │   ├── page.tsx                    # Gated: programs index (reads content/programs/)
│   │   └── [slug]/page.tsx             # Gated: program detail (MDX)
│   ├── faq/page.tsx                    # Static FAQ (data array inline)
│   ├── privacy/page.tsx                # Privacy policy (JSX, migrated from HTML)
│   ├── terms/page.tsx                  # Terms of service (JSX, migrated from HTML)
│   └── api/
│       ├── auth/session/route.ts       # POST: create session cookie / DELETE: clear it
│       ├── checkout/route.ts           # POST: create Stripe Checkout session
│       └── webhooks/stripe/route.ts   # POST: handle checkout.session.completed
├── components/
│   ├── Nav.tsx                         # Top nav (client component)
│   ├── Footer.tsx                      # Footer with Privacy/Terms/Support links
│   └── AuthGuard.tsx                   # Client-side purchase check (secondary guard)
├── lib/
│   ├── firebase-client.ts              # Firebase JS SDK — lazy init, client-side only
│   ├── firebase-admin.ts               # Firebase Admin SDK — lazy init, server-side only
│   ├── stripe.ts                       # Stripe SDK — lazy init
│   └── auth.ts                         # Session cookie helpers (create/get/clear)
├── content/
│   ├── articles/welcome.mdx            # One placeholder article
│   └── programs/                       # 9 MDX stubs — one per program (frontmatter only)
├── middleware.ts                       # Edge route protection: /programs/* and /account
├── next.config.ts
├── tsconfig.json
├── package.json
└── .env.local.example                  # Template — copy to .env.local with real keys
```

---

## Auth Architecture

Firebase Auth is shared with the iOS app — same `perfectreps-e3ba7` project. A user who creates an account on the website and buys hardware has the same UID as their iOS account.

**Session flow:**
1. User signs in via Firebase Auth JS SDK on `/buy`
2. Client calls `POST /api/auth/session` with Firebase ID token
3. API verifies with Firebase Admin → sets HTTP-only `bs_session` cookie (7-day)
4. `middleware.ts` checks for `bs_session` cookie on every `/programs/*` and `/account` request
5. If no cookie → redirect to `/buy`
6. Page-level server components call `getSession()` for full verification + `hasPurchased` check

**Firestore user record fields written by the webhook:**
```
users/{uid}/
  hasPurchased: bool
  purchasedAt: Timestamp
  stripeCustomerId: string
```
All other fields (iOS app data) are left untouched via `{ merge: true }`.

---

## Middleware

`middleware.ts` at the project root. Exports `middleware` (not default). Protects `/programs/:path*` and `/account/:path*` with a cookie presence check. Full `hasPurchased` verification happens in the server component via `getSession()`.

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
Body content is empty on all 9 current stubs. Add week-by-week breakdown content in the body when ready.

**Current program stubs:**
| File | Title | Difficulty |
|------|-------|------------|
| `my-first-program.mdx` | My First Program | Beginner |
| `foundations-30.mdx` | Foundations of Kettlebell Mastery | Beginner |
| `one-arm-swing-12.mdx` | One Bell Standard | Beginner |
| `power-endurance-30.mdx` | Power Endurance Builder | Intermediate |
| `road-to-100-snatch.mdx` | Road to 100 (Snatch) | Intermediate |
| `work-capacity-8.mdx` | Work Capacity Protocol | Intermediate |
| `iron-continuum-8.mdx` | Iron Continuum | Intermediate |
| `power-cycle-8.mdx` | Power Cycle | Advanced |
| `10-minute-engine-8.mdx` | 10-Minute Engine | Advanced |

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

**Firebase Admin private key note:** Paste the key with literal `\n` characters (not real newlines). The `lib/firebase-admin.ts` `.replace(/\\n/g, '\n')` call handles converting them.

---

## Roadmap / TODO

### Before first deploy (blockers)

- [ ] **Set env vars in Vercel** — all variables from `.env.local.example` must be added to Vercel → Settings → Environment Variables. Use `sk_live_` / `pk_live_` Stripe keys for production.
- [ ] **Set real Stripe price** — update `unit_amount: 9900` in `app/api/checkout/route.ts` to the actual hardware price.
- [ ] **Set App Store link** — replace `href="https://apps.apple.com"` placeholder in `app/account/page.tsx` with the real TestFlight or App Store URL.
- [ ] **Register Stripe webhook** — in Stripe dashboard, add endpoint `https://bellsense.app/api/webhooks/stripe` for event `checkout.session.completed`. Copy the webhook signing secret → `STRIPE_WEBHOOK_SECRET`.
- [ ] **Firebase Storage security rules** — manually set rules in Firebase console so `training/{userId}/{fileName}` is locked to `request.auth.uid == userId`. (iOS opt-in training data feature.)
- [ ] **Test full purchase flow end-to-end** — sign up → Stripe test checkout → confirm webhook fires → Firestore `hasPurchased: true` → `/account` shows success banner → `/programs` accessible.
- [ ] **Verify `/programs` and `/account` redirect unauthenticated users to `/buy`.**

### Content (post-launch or pre-launch)

- [ ] **Program detail content** — fill in MDX body for each of the 9 programs in `content/programs/`. Week-by-week breakdown, session descriptions, coaching notes. Refer to `programs.json` in the iOS app and `/Long Range Strategy Docs/program_template_spec.md`.
- [ ] **Articles** — write real articles beyond the `welcome.mdx` stub. Good candidates: "How BellSense counts reps", "What is velocity retention?", "Hardstyle swing technique fundamentals".
- [ ] **Homepage copy** — current copy is placeholder. Refine hero headline, value props, and CTA once product positioning is locked.
- [ ] **OG image / social card** — add `public/og.png` and update `app/layout.tsx` metadata with `openGraph.images`.

### Near-term features

- [ ] **Sign out button** — `Nav.tsx` has no sign-out. Add a sign-out option for authenticated users (call `DELETE /api/auth/session` + `signOut(auth)` then redirect to `/`).
- [ ] **Apple Sign-In on web** — `app/buy/page.tsx` has Google + email but not Apple. Add `OAuthProvider('apple.com')` flow. Requires Apple Developer config in Firebase Auth.
- [ ] **Account page: show purchase date** — `getSession()` returns `uid` but not `purchasedAt`. Update `lib/auth.ts` to also return `purchasedAt` from Firestore and display it on `/account`.
- [ ] **Order confirmation email** — use Stripe's built-in receipt emails (enable in Stripe dashboard) or add a Firebase email trigger. Not currently implemented.
- [ ] **`/account` sign-out** — currently no way to sign out from the account page.

### Future / post-launch

- [ ] **Social auth on web** — Apple Sign-In (see near-term above).
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
