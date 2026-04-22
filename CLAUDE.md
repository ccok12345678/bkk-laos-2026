# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository status

This repo is **pre-implementation**. It currently contains only two files:

- `plan.md` — the authoritative implementation plan for a Vue 3 SPA/PWA travel reference app. Treat this as spec: sections 1–12 are sequential milestones, §10 is the design system, §13 lists out-of-scope items.
- `bkk-laos-information.md` — the source itinerary content (in Traditional Chinese) that all `src/data/*.ts` files must be populated from.

No `package.json`, `src/`, or git history exists yet. The first real task will be Section 1 of `plan.md` (Vite + Vue 3 scaffold).

## What the app is

A static, client-side-only SPA for a 7-day Taipei → Bangkok → Luang Prabang trip (2026-12-01 to 2026-12-07). Installable PWA, Traditional Chinese UI, no backend, no runtime data fetching — all itinerary/POI/flight/hotel/budget data is hardcoded in `src/data/` from the source doc.

## Tech stack (locked in by plan.md)

Vue 3 + TypeScript + Vite + Tailwind CSS v3 (not v4 — shadcn-vue compat) + shadcn-vue + Pinia + vue-router 4 + `@vueuse/core` + `vite-plugin-pwa` + `lucide-vue-next`.

## Commands

**Package manager: `pnpm` only.** Never run `npm install` or `yarn add`. Use `pnpm add`, `pnpm dlx` (for `npx`-equivalents), `pnpm dev`, etc. Commit `pnpm-lock.yaml`, not `package-lock.json` or `yarn.lock`.

Once the project is scaffolded:

```bash
pnpm dev            # dev server
pnpm build          # production build (run before commit to catch TS errors)
pnpm preview        # preview the built dist/
pnpm dlx shadcn-vue@latest add <component>   # add a shadcn-vue component
```

No test runner, linter, or formatter is prescribed by the plan — don't add one unless asked. Verification is via `pnpm build` (type check) + the manual checklist in plan §12.1.

## Non-obvious conventions

These rules come from `plan.md` and are easy to miss:

- **All UI text is Traditional Chinese (zh-TW).** Variable names and optional comments in English.
- **Every price displays both local currency and TWD equivalent.** `Price` objects must include a pre-calculated `twdEquivalent` using the reference rates hardcoded in `src/data/exchange-rates.ts` (see §4.3). Helper: `convertToTwd(price: Price): number`.
- **Data IDs are kebab-case and unique within their type** (e.g. `grand-palace`, `wat-pho`).
- **Dates use ISO format** (`2026-12-01`), **times use 24h with en-dash** (`08:30–11:00`, not hyphen).
- **Wikipedia URLs prefer `zh.wikipedia.org`**, fall back to English.
- **Google Maps URLs use the format from `bkk-laos-information.md`** — do not invent new ones.
- **Trip structure:** verify against the source doc whether it's 2 Bangkok + 4 Luang Prabang + 1 travel = 7 days, or 3 Bangkok + 4 Luang Prabang. Match the source exactly (plan §4.4.1 has guidance).
- **Design tokens are the only source of truth for visuals.** No raw hex colors, no font sizes outside the type scale in §10.3, no custom shadows beyond the three levels in §10.5.2. If something new is needed, add it to §10 first, then use it.
- **One accent color per view** — either Bangkok orange-red (`bg-bangkok`) or Luang Prabang gold (`bg-luangprabang`), never both as equal accents on the same page.
- **Tap targets ≥ 44×44 px on mobile.** Safe-area insets via `env(safe-area-inset-bottom)` for the bottom tab bar.
- **localStorage keys are prefixed `app.`** (e.g. `app.theme`, `app.budget.tier`, `app.checklist`).
- **External links open with `rel="noopener noreferrer"` in a new tab.** Phone links use `tel:` protocol.
- **Theme is applied in `main.ts` before `createApp`** to avoid flash (see plan §10.10).
- **`@/` is the alias for `/src`** — use absolute imports throughout.

## Architecture notes

The full directory structure is prescribed exactly in plan §2.1 — follow it verbatim. High-level shape:

- `src/data/*.ts` — hardcoded typed data (itinerary, pois, flights, hotels, budget, checklist, emergency, exchange-rates, etiquette, visa, sim, weather). Every POI referenced by `poiId` in the itinerary must have a matching entry in `pois.ts`. Validate with `scripts/validate-data.ts` (plan §4.5).
- `src/types/index.ts` — all shared TS interfaces. Listed exhaustively in plan §3.2; don't add ad-hoc types elsewhere.
- `src/composables/` — reactive logic (`useCountdown`, `useCurrency`, `useChecklist`, `useFavorites`, `useTripDay`). See plan §7.1 for exact signatures.
- `src/stores/` — Pinia. Mostly `preferences` (theme, people count, budget tier) via `useStorage` from VueUse.
- `src/components/layout/` — `AppLayout` composes `TopBar` (mobile sticky), `SideNav` (`lg:` and up), `BottomTabBar` (`lg:hidden`), `EmergencyFab` (all breakpoints). Content max-width 1200px centered.
- `src/views/` — one view per route. Routes defined in `src/router/index.ts` with `meta.title` (drives document.title) and `meta.tab` (drives active tab highlight).
- `src/components/trip/` and `src/components/widgets/` — shared presentational pieces; reuse these rather than re-implementing (plan §9).

## Commit conventions (from plan §0 and §15)

- Commit per section, message format: `Section N: <name>` (e.g. `Section 3: Data layer`).
- Run `pnpm build` before committing — TS errors must be zero.
- Each section has explicit acceptance criteria; don't move on until they pass.

## Out of scope

Listed in plan §13 — don't build any of these without being asked: backend, real-time APIs (weather/currency/flights), auth, multi-user sync, expense tracking, push notifications, in-app map rendering (link-outs only), photo uploads, i18n (zh-TW only for MVP), SSR, analytics.

## References

- Implementation plan: `plan.md` (start here for any task)
- Source content: `bkk-laos-information.md` (authoritative for all itinerary/POI/price data)
