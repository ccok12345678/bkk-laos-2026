# 東南亞七日 · 台北→曼谷→龍坡邦

2026 年 12 月 1–7 日 台北—曼谷—龍坡邦 七日文化慢旅的行程查詢 PWA。純前端、離線可用、中文介面。

## Prerequisites

- Node 20+
- pnpm 8+

（使用 `corepack enable && corepack prepare pnpm@latest --activate` 安裝 pnpm）

## Dev commands

```bash
pnpm install          # install deps
pnpm dev              # dev server (default: http://localhost:5173)
pnpm build            # type check + production build
pnpm preview          # preview production build
pnpm validate-data    # run data sanity checks
```

## Tech stack

- **Vue 3** + **TypeScript** + **Vite**
- **Tailwind CSS v3** + shadcn-vue-style UI components
- **Vue Router 4**, **Pinia**, **VueUse**, **lucide-vue-next**
- **vite-plugin-pwa**（installable PWA, offline via Workbox）

## Project structure

See `plan.md` §2.1 for the prescribed layout. All hardcoded itinerary / POI /
flight / hotel / budget data lives in `src/data/*.ts`.

## Deployment

Static SPA — any host works. Recommended:

```bash
pnpm add -g vercel
vercel
```

`pnpm-lock.yaml` is committed; Vercel auto-detects pnpm.

## References

- Implementation plan: [`plan.md`](./plan.md)
- Source itinerary: [`bkk-laos-information.md`](./bkk-laos-information.md)
