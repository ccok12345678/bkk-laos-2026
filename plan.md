# Implementation Plan: Taipei–Bangkok–Luang Prabang Trip Web App

> **Audience:** Claude Code (autonomous implementation agent)
> **Project type:** Pure client-side SPA, no backend
> **Status:** Ready to implement
> **Estimated scope:** ~2 weeks for MVP (sections 1–8), +1 week for enhancements (section 9)

---

## 0. How to Use This Plan

1. Read this entire document before starting.
2. Implement sections in order (1 → 12). Each section is a self-contained milestone with concrete deliverables.
3. After each section, **commit with the section name** (e.g. `git commit -m "Section 3: Data layer"`).
4. Do not add features not in this plan without flagging them as "out of scope".
5. If a section's acceptance criteria fail, fix before moving on.
6. All code must be TypeScript. No `any` except where unavoidable (document why).
7. All UI text is Traditional Chinese (zh-TW) unless specified otherwise.
8. Currency amounts must always display with both local currency and TWD equivalent.

---

## 1. Project Setup

### 1.1 Goals
Bootstrap a Vue 3 + TypeScript + Vite + Tailwind + shadcn-vue project with PWA support.

### 1.2 Package Manager Requirement

**This project uses `pnpm` exclusively.** Do not use `npm` or `yarn` commands.

- Verify pnpm is installed: `pnpm --version` (requires ≥ 8.0)
- If missing: `corepack enable && corepack prepare pnpm@latest --activate`
- When the plan shows `pnpm dlx <pkg>`, this is the equivalent of `npx <pkg>` for one-off package execution
- Commit `pnpm-lock.yaml` to version control; do **not** commit `package-lock.json` or `yarn.lock`

### 1.3 Tasks

- [ ] Initialize Vite project with Vue 3 + TypeScript template
  ```bash
  pnpm create vite@latest . --template vue-ts
  ```
- [ ] Install core dependencies:
  ```bash
  pnpm add vue-router@4 pinia @vueuse/core @vueuse/head lucide-vue-next
  ```
- [ ] Install and configure Tailwind CSS v3 (not v4, for shadcn-vue compatibility):
  ```bash
  pnpm add -D tailwindcss@^3 postcss autoprefixer
  pnpm dlx tailwindcss init -p
  ```
- [ ] Install and initialize shadcn-vue:
  ```bash
  pnpm dlx shadcn-vue@latest init
  ```
  - Choose: TypeScript = Yes, Tailwind config path = `tailwind.config.js`, components alias = `@/components`, utils alias = `@/lib/utils`, import alias for composables = `@/composables`
- [ ] Install PWA plugin:
  ```bash
  pnpm add -D vite-plugin-pwa
  ```
- [ ] Add a `.npmrc` file at project root with:
  ```
  shamefully-hoist=false
  strict-peer-dependencies=false
  auto-install-peers=true
  ```
- [ ] Configure `vite.config.ts` with:
  - `@` alias to `/src`
  - `VitePWA` plugin with `registerType: 'autoUpdate'`
- [ ] Configure `tsconfig.json` with `@/*` path alias
- [ ] Configure `tailwind.config.js` with:
  - Content paths including `./index.html` and `./src/**/*.{vue,ts,tsx}`
  - Extended theme with design tokens (see Section 1.5 and Section 10)
- [ ] Create `src/assets/main.css` importing Tailwind + shadcn CSS variables + design tokens
- [ ] Import `main.css` in `src/main.ts`
- [ ] Set up Vue Router and Pinia in `src/main.ts`
- [ ] Create `.gitignore` (node_modules, dist, .env, .DS_Store, *.local)
- [ ] Add `engines` field to `package.json`:
  ```json
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=8.0.0"
  },
  "packageManager": "pnpm@9.0.0"
  ```
- [ ] Create `README.md` with:
  - Project description
  - **Prerequisites: Node 20+, pnpm 8+**
  - Dev commands (`pnpm dev`, `pnpm build`, `pnpm preview`)
  - Tech stack
  - Deployment notes

### 1.4 Design Tokens Setup

The full design system is defined in **Section 10**. At setup time you only need to wire the tokens into Tailwind and CSS. Follow Section 10.2 and 10.3 exactly to:

1. Add design-token color palette to `tailwind.config.js` theme.extend (trip colors, semantic colors, spacing scale, font family).
2. Add CSS custom properties to `src/assets/main.css` for both light and dark mode.

Do not invent new colors or tokens — if you need something not in the design system, flag it and ask.

### 1.5 Install shadcn-vue Components

Run each of these with `pnpm dlx shadcn-vue@latest add <component>`:
- `button`, `card`, `badge`, `tabs`, `accordion`, `alert`, `table`, `dialog`, `sheet`, `navigation-menu`, `breadcrumb`, `checkbox`, `progress`, `input`, `label`, `select`, `slider`, `separator`, `scroll-area`, `sonner` (toast), `skeleton`, `tooltip`

Install in one command if supported:
```bash
pnpm dlx shadcn-vue@latest add button card badge tabs accordion alert table dialog sheet navigation-menu breadcrumb checkbox progress input label select slider separator scroll-area sonner skeleton tooltip
```

### 1.6 Acceptance Criteria
- `pnpm dev` starts the dev server successfully
- `pnpm build` produces a working `dist/` folder
- `pnpm-lock.yaml` exists at project root
- A placeholder `<HelloWorld />` using a shadcn-vue `<Button>` renders correctly
- Tailwind utility classes work, including design-token colors (e.g. `bg-bangkok`, `text-muted-foreground`)
- Lighthouse PWA audit passes "Installable" on the built preview

---

## 2. Directory Structure

### 2.1 Create this exact structure

```
src/
├── assets/
│   └── main.css
├── components/
│   ├── ui/                       # shadcn-vue components (auto-generated)
│   ├── layout/
│   │   ├── AppLayout.vue
│   │   ├── BottomTabBar.vue
│   │   ├── SideNav.vue
│   │   ├── TopBar.vue
│   │   └── EmergencyFab.vue
│   ├── trip/
│   │   ├── TimelineItem.vue
│   │   ├── DayCard.vue
│   │   ├── PoiCard.vue
│   │   ├── MapLinkButton.vue
│   │   ├── WikiLinkButton.vue
│   │   ├── PriceTag.vue
│   │   ├── CountdownBanner.vue
│   │   └── CityBadge.vue
│   └── widgets/
│       ├── CurrencyConverter.vue
│       ├── BudgetCalculator.vue
│       ├── ChecklistGroup.vue
│       ├── EmergencyContactList.vue
│       └── QuickAccessGrid.vue
├── composables/
│   ├── useCountdown.ts
│   ├── useCurrency.ts
│   ├── useChecklist.ts
│   ├── useFavorites.ts
│   ├── useLocalStorage.ts
│   └── useTripDay.ts
├── data/
│   ├── itinerary.ts
│   ├── flights.ts
│   ├── hotels.ts
│   ├── pois.ts
│   ├── budget.ts
│   ├── checklist.ts
│   ├── emergency.ts
│   ├── exchange-rates.ts
│   ├── etiquette.ts
│   ├── visa.ts
│   ├── sim.ts
│   └── weather.ts
├── router/
│   └── index.ts
├── stores/
│   ├── preferences.ts
│   └── checklist.ts
├── types/
│   └── index.ts
├── views/
│   ├── HomeView.vue
│   ├── ItineraryView.vue
│   ├── DayView.vue
│   ├── PoiDetailView.vue
│   ├── TravelView.vue
│   ├── FlightsView.vue
│   ├── HotelsView.vue
│   ├── InfoView.vue
│   ├── info/
│   │   ├── VisaView.vue
│   │   ├── CurrencyView.vue
│   │   ├── WeatherView.vue
│   │   ├── EtiquetteView.vue
│   │   ├── SimView.vue
│   │   ├── SafetyView.vue
│   │   └── ChecklistView.vue
│   └── BudgetView.vue
├── lib/
│   └── utils.ts                  # cn() helper from shadcn-vue
├── App.vue
└── main.ts
```

### 2.2 Acceptance Criteria
- All folders exist (use `.gitkeep` for empty ones during setup)
- Structure matches exactly

---

## 3. Type Definitions

### 3.1 Goal
Create `src/types/index.ts` with all TypeScript interfaces used throughout the app.

### 3.2 Required Types

```typescript
// Currency codes
export type CurrencyCode = 'THB' | 'LAK' | 'USD' | 'TWD';
export type CityId = 'bangkok' | 'luangprabang' | 'in-transit';

// Price with optional TWD equivalent
export interface Price {
  amount: number;
  currency: CurrencyCode;
  twdEquivalent?: number;
  isRange?: boolean;
  maxAmount?: number;
}

// Point of Interest (attractions, restaurants, experiences)
export type PoiType =
  | 'temple' | 'museum' | 'restaurant' | 'experience'
  | 'market' | 'landmark' | 'hotel' | 'transport'
  | 'cafe' | 'shop' | 'nature';

export interface PoiItem {
  id: string;
  name: string;
  nameLocal?: string;        // Thai or Lao name
  nameEn?: string;           // English name for reference
  type: PoiType;
  city: CityId;
  address?: string;
  description: string;
  shortDescription?: string; // For card previews
  openHours?: string;
  price?: Price;
  googleMapsUrl: string;
  wikipediaUrl?: string;
  officialUrl?: string;
  tips?: string[];
  dressCode?: string;
  highlights?: string[];     // Bullet points of why to visit
  imageUrl?: string;
}

// Single item in a day's timeline
export type ItineraryCategory =
  | 'sightseeing' | 'meal' | 'transport'
  | 'rest' | 'shopping' | 'experience' | 'check-in' | 'check-out';

export interface ItineraryItem {
  time: string;              // e.g. '08:30–11:00'
  title: string;
  description?: string;
  poiId?: string;
  price?: Price;
  tips?: string[];
  category: ItineraryCategory;
  isOptional?: boolean;
}

// One day of the trip
export interface ItineraryDay {
  id: string;                // 'day-1' through 'day-7'
  dayNumber: number;
  date: string;              // ISO date '2026-12-01'
  city: CityId;
  theme: string;
  subtitle?: string;
  items: ItineraryItem[];
  tips?: string[];
  dailyBudget?: Price;
}

// Flights
export type FlightSegment = 'tpe-bkk' | 'bkk-lpq' | 'lpq-tpe';

export interface Flight {
  id: string;
  segment: FlightSegment;
  airline: string;
  airlineCode: string;       // 'CI', 'PG', etc.
  flightNumber?: string;
  departure: {
    airport: string;         // 'TPE', 'BKK', 'DMK', 'LPQ'
    airportName: string;
    time?: string;           // '07:30'
  };
  arrival: {
    airport: string;
    airportName: string;
    time?: string;
  };
  duration: string;
  includesBaggage: boolean;
  baggageAllowance?: string;
  includesMeal: boolean;
  priceRange: Price;
  notes?: string[];
  isRecommended: boolean;
  warning?: string;
}

// Hotels
export interface Hotel {
  id: string;
  name: string;
  city: CityId;
  district: string;
  priceRange: Price;
  features: string[];
  googleMapsUrl: string;
  bookingUrls?: Array<{ platform: string; url: string; }>;
  suitableFor: string;
  isRecommended: boolean;
  roomArrangement?: string;  // e.g. '2 × Deluxe Twin' for group trips
  totalPricePerNight?: Price; // For group scenarios
}

// Budget tiers
export type BudgetTier = 'frugal' | 'mid' | 'comfort';

export interface BudgetBreakdown {
  category: string;
  frugal: number;
  mid: number;
  comfort: number;
  unit: 'per-person' | 'per-group';
  note?: string;
}

// Checklist
export type ChecklistGroup =
  | 'documents' | 'booking' | 'packing' | 'apps' | 'insurance';

export interface ChecklistItem {
  id: string;
  group: ChecklistGroup;
  text: string;
  dueDate?: string;
  important: boolean;
  details?: string;
}

// Emergency contacts
export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;              // Tap-to-call format
  phoneDisplay: string;       // Human-readable
  description: string;
  region: 'taiwan' | 'thailand' | 'laos' | 'global';
}

// Exchange rate (reference only)
export interface ExchangeRate {
  from: CurrencyCode;
  to: CurrencyCode;
  rate: number;
  updatedAt: string;          // ISO date
}

// Etiquette rule
export interface EtiquetteRule {
  id: string;
  category: 'temple-dress' | 'alms-giving' | 'thai-royal' | 'general';
  title: string;
  description: string;
  severity: 'critical' | 'important' | 'tip';
  dos?: string[];
  donts?: string[];
}

// Visa info
export interface VisaInfo {
  country: 'thailand' | 'laos';
  type: string;
  duration: string;
  cost?: Price;
  requirements: string[];
  applicationUrl?: string;
  notes: string[];
  isRecommended?: boolean;
}

// SIM card option
export interface SimOption {
  id: string;
  name: string;
  type: 'physical' | 'esim' | 'regional';
  coverage: string[];         // Countries covered
  duration: string;
  data: string;
  price: Price;
  pros: string[];
  cons: string[];
  isRecommended?: boolean;
  purchaseUrl?: string;
}
```

### 3.3 Acceptance Criteria
- File compiles with no TypeScript errors
- All types exported
- Can be imported as `import type { PoiItem } from '@/types'`

---

## 4. Data Layer

### 4.1 Goal
Populate all data files in `src/data/` using the source itinerary document. Source: the project file `Taipei-Bangkok-Luang_Prabang__7-Day_Cultural_Slow_Travel_Itinerary.md`.

### 4.2 General Rules

- All IDs are kebab-case, unique within their type (e.g. `grand-palace`, `wat-pho`)
- All prices include `twdEquivalent` pre-calculated using the reference rates below
- All Google Maps URLs use the format from the source doc
- All Wikipedia URLs use Traditional Chinese (`zh.wikipedia.org`) when available, English otherwise
- Times use 24h format with en-dash: `08:30–11:00`
- Dates use ISO format: `2026-12-01` (trip starts Dec 1, 2026)

### 4.3 Reference Exchange Rates (hardcode in `exchange-rates.ts`)

```typescript
// As of April 2026 (reference only)
export const EXCHANGE_RATES = {
  THB_TO_TWD: 0.98,
  USD_TO_TWD: 32.5,
  USD_TO_LAK: 21700,
  LAK_TO_TWD: 0.0015,     // 1 LAK ≈ 0.0015 TWD
  updatedAt: '2026-04-01',
} as const;
```

Provide a helper `convertToTwd(price: Price): number` that converts any Price to TWD.

### 4.4 Data File Tasks

#### 4.4.1 `data/itinerary.ts`
Export `ITINERARY: ItineraryDay[]` with exactly **7 days**:
- **Day 1 (2026-12-01):** Arrive Bangkok — afternoon arrival, check in, light exploration
- **Day 2 (2026-12-02):** Bangkok Rattanakosin — Grand Palace, Wat Pho, Wat Arun, Museum Siam, Krua Apsorn, Golden Mount
- **Day 3 (2026-12-03):** Bangkok museums — Jim Thompson, BACC, Suan Pakkad, Thipsamai, Yaowarat
- **Day 4 (2026-12-04):** BKK → LPQ flight + Old Town walk + Mount Phousi sunset + Night Market
- **Day 5 (2026-12-05):** MandaLao Elephant + Kuang Si Falls + Lao Red Cross Sauna + Tamarind
- **Day 6 (2026-12-06):** Alms giving + Royal Palace + Wat Xieng Thong + UXO Center + Mekong sunset cruise
- **Day 7 (2026-12-07):** Pak Ou Caves + Ban Xang Hai + Ock Pop Tok + LPQ → TPE return flight

**Note:** The source doc sometimes shows Bangkok as 2 days; for the app we treat arrival day as Day 1 (light) + 2 full sightseeing days = 3 Bangkok days total. Verify against source; if source clearly says 2 Bangkok days, use 2 Bangkok + 4 Luang Prabang + 1 travel day structure. Match the source exactly — if Bangkok is 2 days, days 1–2 are Bangkok, day 3 is BKK→LPQ + LPQ Day 1, etc.

Each `ItineraryItem` must:
- Have `time`, `title`, `category`
- Link to a `poiId` whenever the activity is at a specific place
- Include `price` with TWD equivalent

#### 4.4.2 `data/pois.ts`
Export `POIS: PoiItem[]` including every place mentioned in the itinerary. **Minimum required:**

**Bangkok:** grand-palace, wat-pho, wat-arun, museum-siam, krua-apsorn, golden-mount (wat-saket), loha-prasat, supanniga-tha-tien, jim-thompson-house, bacc, suan-pakkad-palace, thipsamai, yaowarat, tk-seafood, khao-san-road

**Luang Prabang:** wat-mai, mount-phousi, night-market, mandalao, kuang-si-falls, lao-red-cross-sauna, tamarind, royal-palace-museum, wat-xieng-thong, wat-sensoukharam, khaiphaen, uxo-center, taec, ban-xang-khong, mekong-sunset-cruise, manda-de-laos, pak-ou-caves, ban-xang-hai, ock-pop-tok, lelephant, 3-nagas, wat-visoun, saffron-coffee, le-banneton

Each entry must include `googleMapsUrl` and `wikipediaUrl` where the source doc provides them.

#### 4.4.3 `data/flights.ts`
Export `FLIGHTS: Flight[]` with all flight options from section 一 of source doc:
- TPE→BKK options: CI (recommended), JX, BR, TG, VZ, SL/FD
- BKK→LPQ options: PG (recommended), QV, FD
- LPQ→TPE options: PG+CI via BKK (recommended), via HAN, via SGN

Export `RECOMMENDED_COMBO` object describing the CI + PG + PG/CI combo.

#### 4.4.4 `data/hotels.ts`
Export `HOTELS: Hotel[]`:
- **Bangkok:** Aurum The River Place, Shanghai Mansion, Mercure Sukhumvit 11, S15 Sukhumvit
- **Luang Prabang:** Villa Maly, My Dream Boutique Resort (mark as "most cost-effective for 4–5 people"), Le Sen Boutique

#### 4.4.5 `data/budget.ts`
Export `BUDGET_TIERS: BudgetBreakdown[]` matching the three-tier table in source doc (節約/中價位/舒適版) with categories: 機票, 住宿, 餐飲, 交通, 門票+體驗, SIM+旅保+雜費.

#### 4.4.6 `data/checklist.ts`
Export `CHECKLIST: ChecklistItem[]` covering all items from section 六 of source doc. Group by: documents, booking, packing, apps, insurance.

#### 4.4.7 `data/emergency.ts`
Export `EMERGENCY_CONTACTS: EmergencyContact[]`:
- 駐泰國辦事處 +66-2-119-3555 (thailand)
- 駐越南辦事處（兼轄寮國）+84-903-404-581 (laos)
- 外交部緊急中心 +886-800-085-095 (taiwan/global)
- Add standard emergency numbers: Thailand 191 (police), 1669 (ambulance); Laos 191 (police), 195 (ambulance)

#### 4.4.8 `data/etiquette.ts`
Export `ETIQUETTE_RULES: EtiquetteRule[]` covering three categories from source doc:
1. Temple dress code (critical)
2. Alms giving rules (critical for Luang Prabang)
3. Thai royal etiquette (critical)
Each with `dos` and `donts` arrays.

#### 4.4.9 `data/visa.ts`
Export `VISA_INFO: VisaInfo[]` for Thailand and Laos matching source doc section 四.

#### 4.4.10 `data/sim.ts`
Export `SIM_OPTIONS: SimOption[]`:
- AIS SIM2Fly Asia (recommended for laziness)
- AIS Tourist SIM (Thailand native)
- Unitel (Laos native)
- Airalo Asialink eSIM

#### 4.4.11 `data/weather.ts`
Export `WEATHER_INFO` with Bangkok and Luang Prabang December temperatures per source doc.

### 4.5 Acceptance Criteria
- Every data file compiles with zero TS errors
- Every POI mentioned in itinerary has a matching entry in `pois.ts`
- Every price has correct `twdEquivalent`
- Data imports cleanly: `import { ITINERARY } from '@/data/itinerary'`
- Create a simple `scripts/validate-data.ts` that checks: all `poiId` references in itinerary exist in POIS; all dates are valid; all prices have positive amounts

---

## 5. Routing

### 5.1 Goal
Configure Vue Router with all routes, lazy-loaded, with page titles.

### 5.2 Route Configuration

Create `src/router/index.ts`:

```typescript
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '總覽', tab: 'home' },
  },
  {
    path: '/itinerary',
    name: 'itinerary',
    component: () => import('@/views/ItineraryView.vue'),
    meta: { title: '行程', tab: 'itinerary' },
  },
  {
    path: '/itinerary/day/:dayId',
    name: 'day',
    component: () => import('@/views/DayView.vue'),
    meta: { title: '單日行程', tab: 'itinerary' },
    props: true,
  },
  {
    path: '/poi/:poiId',
    name: 'poi',
    component: () => import('@/views/PoiDetailView.vue'),
    meta: { title: '景點詳情', tab: 'itinerary' },
    props: true,
  },
  {
    path: '/travel',
    name: 'travel',
    component: () => import('@/views/TravelView.vue'),
    meta: { title: '航班與住宿', tab: 'travel' },
  },
  {
    path: '/travel/flights',
    name: 'flights',
    component: () => import('@/views/FlightsView.vue'),
    meta: { title: '航班資訊', tab: 'travel' },
  },
  {
    path: '/travel/hotels',
    name: 'hotels',
    component: () => import('@/views/HotelsView.vue'),
    meta: { title: '住宿資訊', tab: 'travel' },
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('@/views/InfoView.vue'),
    meta: { title: '實用資訊', tab: 'info' },
  },
  {
    path: '/info/visa',
    component: () => import('@/views/info/VisaView.vue'),
    meta: { title: '簽證', tab: 'info' },
  },
  {
    path: '/info/currency',
    component: () => import('@/views/info/CurrencyView.vue'),
    meta: { title: '匯率與換匯', tab: 'info' },
  },
  {
    path: '/info/weather',
    component: () => import('@/views/info/WeatherView.vue'),
    meta: { title: '氣候與穿著', tab: 'info' },
  },
  {
    path: '/info/etiquette',
    component: () => import('@/views/info/EtiquetteView.vue'),
    meta: { title: '文化禮儀', tab: 'info' },
  },
  {
    path: '/info/sim',
    component: () => import('@/views/info/SimView.vue'),
    meta: { title: '通訊 SIM', tab: 'info' },
  },
  {
    path: '/info/safety',
    component: () => import('@/views/info/SafetyView.vue'),
    meta: { title: '安全資訊', tab: 'info' },
  },
  {
    path: '/info/checklist',
    component: () => import('@/views/info/ChecklistView.vue'),
    meta: { title: '行前檢查清單', tab: 'info' },
  },
  {
    path: '/budget',
    name: 'budget',
    component: () => import('@/views/BudgetView.vue'),
    meta: { title: '預算', tab: 'budget' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const title = to.meta.title as string | undefined;
  document.title = title ? `${title} · 東南亞七日` : '東南亞七日';
});

export default router;
```

### 5.3 Acceptance Criteria
- All routes navigate correctly
- Browser tab title updates per route
- Scroll resets to top on navigation
- 404 redirects home

---

## 6. Layout & Navigation

### 6.1 Goal
Build the responsive shell: bottom tab bar on mobile, sidebar on desktop.

### 6.2 Components

#### 6.2.1 `AppLayout.vue`
- Props: none (uses `<router-view />`)
- Structure:
  - `<TopBar />` on mobile (shows current page title + emergency button)
  - `<SideNav />` on desktop (`lg:` and up)
  - `<main>` with `<router-view />`
  - `<BottomTabBar />` on mobile (`lg:hidden`)
  - `<EmergencyFab />` floating action button (all breakpoints)
- Max content width: 1200px centered

#### 6.2.2 `BottomTabBar.vue`
- Fixed bottom, 5 tabs: 總覽, 行程, 航班住宿, 實用資訊, 預算
- Highlights active tab based on `route.meta.tab`
- Uses lucide icons: Home, CalendarDays, Plane, BookOpen, Wallet
- Height: 64px, safe-area padding

#### 6.2.3 `SideNav.vue`
- Fixed left, 240px wide, desktop only
- Same 5 primary items as bottom tab bar
- Sub-items collapse for `/info/*` routes

#### 6.2.4 `TopBar.vue`
- Mobile only, sticky top
- Shows current page title (from `route.meta.title`)
- Back button when not on a root route
- Right side: theme toggle icon

#### 6.2.5 `EmergencyFab.vue`
- Fixed bottom-right, above tab bar (mobile: bottom: 80px)
- Red circle, phone icon
- Click opens a Dialog listing all emergency contacts with tap-to-call links
- Dialog uses `<EmergencyContactList />` component

### 6.3 Acceptance Criteria
- On mobile (375px width): bottom tabs visible, no sidebar, emergency FAB visible
- On desktop (1280px width): sidebar visible, no bottom tabs
- Tab switching navigates correctly and highlights active tab
- Emergency FAB opens dialog with working `tel:` links
- Safe-area insets work on notched devices (use `env(safe-area-inset-bottom)`)

---

## 7. Composables & Stores

### 7.1 Composables

#### 7.1.1 `useLocalStorage.ts`
Generic reactive localStorage wrapper. Leverage `@vueuse/core`'s `useStorage` if suitable, or write a thin wrapper with SSR safety (not needed here but good practice).

#### 7.1.2 `useCountdown.ts`
Returns reactive days/hours until `2026-12-01T00:00:00+08:00`. Negative values mean "trip in progress" or "trip ended". Expose:
- `daysUntilTrip: Ref<number>`
- `tripStatus: ComputedRef<'before' | 'during' | 'after'>`
- `currentTripDay: ComputedRef<number | null>` (1-7, or null outside trip)

#### 7.1.3 `useCurrency.ts`
Exposes conversion functions:
- `toTwd(amount: number, currency: CurrencyCode): number`
- `formatPrice(price: Price): string` → `"200 THB (約 NT$196)"`
- `formatPriceCompact(price: Price): string` → `"NT$196"`

#### 7.1.4 `useChecklist.ts`
Manages checklist state in localStorage:
- `checklist: Ref<Record<string, boolean>>`
- `toggle(itemId: string): void`
- `progress: ComputedRef<{ done: number; total: number; percentage: number }>`
- `progressByGroup: ComputedRef<Record<ChecklistGroup, {...}>>`

#### 7.1.5 `useFavorites.ts`
Manages favorite POIs:
- `favorites: Ref<string[]>`
- `isFavorite(poiId: string): ComputedRef<boolean>`
- `toggle(poiId: string): void`

#### 7.1.6 `useTripDay.ts`
Given a `dayId`, returns the `ItineraryDay` plus navigation helpers:
- `day: ComputedRef<ItineraryDay | null>`
- `prevDay: ComputedRef<ItineraryDay | null>`
- `nextDay: ComputedRef<ItineraryDay | null>`
- `relatedPois: ComputedRef<PoiItem[]>` (all POIs referenced in this day)

### 7.2 Pinia Stores

#### 7.2.1 `stores/preferences.ts`
```typescript
export const usePreferencesStore = defineStore('preferences', () => {
  const theme = useStorage<'light' | 'dark' | 'system'>('app.theme', 'system');
  const peopleCount = useStorage('app.budget.people', 4);
  const budgetTier = useStorage<BudgetTier>('app.budget.tier', 'mid');

  return { theme, peopleCount, budgetTier };
});
```

#### 7.2.2 `stores/checklist.ts`
Wraps `useChecklist` composable for Pinia consumption (optional; can skip if composable is sufficient).

### 7.3 Acceptance Criteria
- All composables have unit-testable pure logic
- localStorage keys are prefixed with `app.`
- `useCountdown` updates without reactivity glitches (use `setInterval` with cleanup)
- Values persist across page reloads

---

## 8. Views (MVP Core)

Build these in priority order. Each view is a single responsibility, minimum viable implementation first, then polish.

### 8.1 `HomeView.vue` — Dashboard

**Sections (top to bottom):**
1. **Hero with countdown**
   - Title: "台北 → 曼谷 → 龍坡邦 · 七日知性慢旅"
   - Countdown banner using `useCountdown`
   - Dynamic message: before trip = "距離出發還有 N 天", during = "旅程進行中 · 第 N 天 / 共 7 天", after = "旅程已結束"

2. **Today's Plan Card (if during trip)**
   - Shows current day's first 3 timeline items
   - "查看完整行程" button → `/itinerary/day/day-N`

3. **Quick Access Grid (2 × 3)**
   - Cards with icon + label:
     - 航班資訊 → `/travel/flights`
     - 住宿 → `/travel/hotels`
     - 匯率 → `/info/currency`
     - 緊急聯絡 → opens EmergencyFab dialog
     - 文化禮儀 → `/info/etiquette`
     - 檢查清單 → `/info/checklist` (shows progress %)

4. **Currency Converter Widget**
   - Use `<CurrencyConverter />` component
   - Default TWD → THB visible

5. **Weather Reminder**
   - Static alert: "12 月初 龍坡邦清晨 10–15°C，記得帶外套"

### 8.2 `ItineraryView.vue` — Overview

- Heading: "七日行程"
- Tabs: "全部" / "曼谷段" / "龍坡邦段" (filter by `city`)
- List of `<DayCard />` components, vertical
- Each card shows: day number, date, day-of-week (Chinese), city badge, theme, item count

### 8.3 `DayView.vue` — Single Day

- Breadcrumb: 首頁 > 行程 > Day N
- Day header: Day N · date · weekday · city · theme
- Prev/Next day buttons (disabled at boundaries)
- Vertical timeline using `<TimelineItem />` for each item
- Each timeline item card shows:
  - Time range
  - Category icon
  - Title + description
  - Price tag (if any)
  - Buttons: 地圖 (opens googleMapsUrl), 維基 (if wikipediaUrl), 詳情 (→ `/poi/:poiId`)
- Day tips as Alert components at bottom
- Daily budget summary card at very bottom

### 8.4 `PoiDetailView.vue` — POI Detail

- Back button
- POI name (Chinese + local language if different)
- Type badge + city badge
- Image (if available)
- Full description
- Highlights (bulleted)
- Info grid: address, open hours, price, dress code
- Tips section
- Link buttons: Google Maps, Wikipedia, Official site
- Favorite toggle (star icon top right)
- "此景點出現於 Day N 行程" link

### 8.5 `TravelView.vue` — Travel Overview

- Two large cards:
  - 航班資訊 → `/travel/flights`
  - 住宿 → `/travel/hotels`
- Recommended combo summary card (CI + PG + PG/CI)

### 8.6 `FlightsView.vue` — Flights Detail

- Heading
- Recommended combo card (prominent)
- Accordion with 3 sections (one per segment)
- Each section:
  - Segment name (e.g. "台北 → 曼谷")
  - Date
  - Table of all flight options (airline, flight#, times, duration, baggage, meal, price)
  - Recommended option row highlighted
  - Warnings/notes as Alert components below table

### 8.7 `HotelsView.vue` — Hotels Detail

- Tabs: 曼谷 / 龍坡邦
- Grid of hotel cards
- Each card: name, district badge, price range (TWD), features chips, action buttons (Google Maps, booking platforms)
- Luang Prabang tab: alert at top recommending My Dream for 4–5 people

### 8.8 `InfoView.vue` — Info Hub

- 7 navigation cards in a grid:
  - 簽證, 匯率, 氣候, 文化禮儀, SIM 卡, 安全, 檢查清單
- Each card has icon + title + one-line description
- Click navigates to respective sub-view

### 8.9 `info/VisaView.vue`
- Two cards: Thailand visa-free + TDAC, Laos VOA vs eVisa
- Step-by-step TDAC guide with external link
- Comparison table for Laos options with "推薦" badge on VOA

### 8.10 `info/CurrencyView.vue`
- Reference rates table (all pairs)
- "更新日期: 2026-04-01" notice
- Large `<CurrencyConverter />` widget (expanded, all 4 currencies)
- Exchange strategy tips list
- ATM warnings for Laos

### 8.11 `info/WeatherView.vue`
- Two cards side by side: Bangkok weather, Luang Prabang weather
- Packing checklist (interactive, uses checklist composable with a separate sub-list ID)

### 8.12 `info/EtiquetteView.vue`
- Three sections (temple / alms / royal)
- Each rule as Alert component with severity color
- Do/Don't side-by-side lists

### 8.13 `info/SimView.vue`
- Comparison table of 4 SIM options
- "推薦決策": decision tree in prose form

### 8.14 `info/SafetyView.vue`
- Emergency contacts prominent at top (tap-to-call)
- Bangkok scams section
- Luang Prabang safety section
- General safety tips

### 8.15 `info/ChecklistView.vue`
- Overall progress bar
- Grouped sections (5 groups)
- Each group has its own progress bar
- Each item is a checkbox with text + optional due date + importance indicator
- Reset all button (confirmation dialog)

### 8.16 `BudgetView.vue`
- Three-tier comparison table
- Interactive calculator:
  - Slider for people count (2–5)
  - Select for tier (frugal/mid/comfort)
  - Output: per-person total, group total
  - Breakdown by category with Progress bars
- "適合情境" notes for each tier

### 8.17 Acceptance Criteria for Section 8
- All views render without errors
- All data from `src/data/` displays correctly
- All links (internal and external) work
- Mobile layout is usable without horizontal scroll
- Desktop layout uses space well (max 1200px centered)

---

## 9. Shared Components

Implement these as reusable components used across views.

### 9.1 `PriceTag.vue`
Props: `price: Price`, `size?: 'sm' | 'md' | 'lg'`, `compact?: boolean`
Output: `"500 THB (約 NT$490)"` or compact `"NT$490"`

### 9.2 `MapLinkButton.vue`
Props: `url: string`, `label?: string` (default "地圖")
Renders shadcn Button with MapPin icon, opens in new tab with `rel="noopener noreferrer"`

### 9.3 `WikiLinkButton.vue`
Props: `url: string`
Same pattern as MapLinkButton with BookOpen icon, label "維基"

### 9.4 `CityBadge.vue`
Props: `city: CityId`
Returns colored Badge: Bangkok = orange, Luang Prabang = gold, in-transit = neutral

### 9.5 `DayCard.vue`
Props: `day: ItineraryDay`
Click → navigate to `/itinerary/day/:dayId`
Shows: day number (big), date + weekday, city badge, theme, item count

### 9.6 `PoiCard.vue`
Props: `poi: PoiItem`, `compact?: boolean`
Click → navigate to `/poi/:poiId`
Shows: name, type badge, short description, favorite star

### 9.7 `TimelineItem.vue`
Props: `item: ItineraryItem`, `isLast?: boolean`
Visual timeline with connecting line on left, card on right, category icon in dot

### 9.8 `CountdownBanner.vue`
Props: none (uses `useCountdown`)
Large prominent display of days until trip

### 9.9 `CurrencyConverter.vue`
Props: `expanded?: boolean`
Default: TWD ↔ THB (compact)
Expanded: all 4 currencies with 2-way input
Uses `useCurrency` composable

### 9.10 `EmergencyContactList.vue`
Renders the full emergency contacts list with tap-to-call phone links

### 9.11 `ChecklistGroup.vue`
Props: `group: ChecklistGroup`, `items: ChecklistItem[]`
Renders a checklist section with group-level progress bar

### 9.12 Acceptance Criteria
- All components are typed with `defineProps<...>()`
- All components are used in at least one view
- No duplicate logic across views

---

## 10. Design System

A simple, opinionated token-based system. Everything visual in the app must reference these tokens — no hard-coded hex colors, no one-off font sizes, no custom shadows outside this list. Consistency over cleverness.

### 10.1 Design Principles

1. **Calm over loud.** This is a travel reference app; information density matters more than spectacle. Muted defaults, saturated accents used sparingly.
2. **One accent per view.** Each page anchors on one city color (Bangkok orange-red or Luang Prabang gold) or stays neutral. Never mix both as equal accents.
3. **Tap targets first.** Minimum 44×44 px for anything interactive on mobile.
4. **Prefer hierarchy via type and spacing, not via borders.** Use separators sparingly.
5. **Predictable interaction.** Same action = same component everywhere (maps button always looks the same; price tag always looks the same).

### 10.2 Color Tokens

Defined in `src/assets/main.css` as CSS custom properties, consumed by Tailwind via `tailwind.config.js`.

#### 10.2.1 Semantic Tokens (from shadcn-vue, extended)

Keep shadcn-vue's default neutral tokens for background, foreground, card, popover, muted, accent, destructive, border, input, ring. These handle 80% of UI.

#### 10.2.2 Trip-Specific Tokens

Add these CSS variables in `src/assets/main.css`:

```css
@layer base {
  :root {
    /* Trip brand colors */
    --bangkok: 11 78% 58%;            /* #E85D3F - warm orange-red */
    --bangkok-foreground: 0 0% 100%;
    --bangkok-subtle: 11 78% 96%;     /* very light tint for backgrounds */

    --luangprabang: 43 80% 46%;       /* #D4A017 - temple gold */
    --luangprabang-foreground: 0 0% 100%;
    --luangprabang-subtle: 43 80% 96%;

    --transit: 220 10% 55%;           /* neutral gray for in-transit days */
    --transit-foreground: 0 0% 100%;

    /* Semantic feedback */
    --success: 142 70% 40%;
    --success-foreground: 0 0% 100%;

    --warning: 38 95% 50%;
    --warning-foreground: 0 0% 10%;

    --info: 210 90% 55%;
    --info-foreground: 0 0% 100%;

    /* Category colors for itinerary items (subtle, used as icon/dot tint) */
    --cat-sightseeing: 210 70% 50%;
    --cat-meal: 25 85% 55%;
    --cat-transport: 220 10% 50%;
    --cat-rest: 260 40% 60%;
    --cat-shopping: 330 70% 55%;
    --cat-experience: 160 60% 45%;
  }

  .dark {
    --bangkok: 11 70% 62%;
    --bangkok-subtle: 11 40% 15%;

    --luangprabang: 43 70% 55%;
    --luangprabang-subtle: 43 40% 15%;

    --transit: 220 10% 65%;

    --success: 142 60% 50%;
    --warning: 38 85% 60%;
    --info: 210 80% 65%;
  }
}
```

#### 10.2.3 Tailwind Config

In `tailwind.config.js`, expose these as Tailwind utilities:

```js
theme: {
  extend: {
    colors: {
      bangkok: {
        DEFAULT: 'hsl(var(--bangkok))',
        foreground: 'hsl(var(--bangkok-foreground))',
        subtle: 'hsl(var(--bangkok-subtle))',
      },
      luangprabang: {
        DEFAULT: 'hsl(var(--luangprabang))',
        foreground: 'hsl(var(--luangprabang-foreground))',
        subtle: 'hsl(var(--luangprabang-subtle))',
      },
      transit: {
        DEFAULT: 'hsl(var(--transit))',
        foreground: 'hsl(var(--transit-foreground))',
      },
      success: {
        DEFAULT: 'hsl(var(--success))',
        foreground: 'hsl(var(--success-foreground))',
      },
      warning: {
        DEFAULT: 'hsl(var(--warning))',
        foreground: 'hsl(var(--warning-foreground))',
      },
      info: {
        DEFAULT: 'hsl(var(--info))',
        foreground: 'hsl(var(--info-foreground))',
      },
      cat: {
        sightseeing: 'hsl(var(--cat-sightseeing))',
        meal: 'hsl(var(--cat-meal))',
        transport: 'hsl(var(--cat-transport))',
        rest: 'hsl(var(--cat-rest))',
        shopping: 'hsl(var(--cat-shopping))',
        experience: 'hsl(var(--cat-experience))',
      },
    },
  },
}
```

#### 10.2.4 Usage Rules

| Context | Token |
|---|---|
| Page background | `bg-background` (shadcn default) |
| Card background | `bg-card` |
| Primary text | `text-foreground` |
| Secondary text | `text-muted-foreground` |
| Bangkok day badge / accent | `bg-bangkok text-bangkok-foreground` |
| Luang Prabang day badge / accent | `bg-luangprabang text-luangprabang-foreground` |
| In-transit day badge | `bg-transit text-transit-foreground` |
| Bangkok subtle background (e.g. tinted card) | `bg-bangkok-subtle` |
| Warning alerts (dress code, alms rules) | `bg-warning/10 border-warning text-warning-foreground` |
| Critical alerts (safety, visa) | shadcn `destructive` variant |
| Success states (checklist complete) | `text-success` |
| Info tips (less critical) | `bg-info/10 text-info` |

### 10.3 Typography

#### 10.3.1 Font Stack

Add to `index.html` `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

In `tailwind.config.js`:
```js
fontFamily: {
  sans: [
    'Inter',
    'Noto Sans TC',
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'sans-serif',
  ],
  mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
}
```

Rationale: Inter handles Latin + digits beautifully; Noto Sans TC fills in Traditional Chinese. The order means Chinese characters automatically fall through to Noto while Latin uses Inter.

#### 10.3.2 Type Scale

Use Tailwind's default scale. Below is the intended semantic mapping — use these combinations consistently:

| Role | Tailwind classes | Where used |
|---|---|---|
| Display (hero title) | `text-3xl md:text-4xl font-bold tracking-tight` | HomeView hero, big countdown |
| Page title (H1) | `text-2xl font-bold tracking-tight` | Top of each view |
| Section title (H2) | `text-xl font-semibold` | Section headers within a view |
| Card title (H3) | `text-base font-semibold` | Card headers |
| Body | `text-sm leading-relaxed` | Default paragraphs |
| Body large | `text-base leading-relaxed` | Emphasized paragraphs, detail pages |
| Caption / meta | `text-xs text-muted-foreground` | Timestamps, counts, subtle labels |
| Code / numbers emphasis | `font-mono tabular-nums` | Prices, countdown digits |

**Line-height rules:**
- Headings: `leading-tight` (default in Tailwind heading sizes)
- Body: `leading-relaxed` (1.625)
- UI controls (buttons, inputs): `leading-none`

### 10.4 Spacing Scale

Use Tailwind's default spacing scale. Follow these conventions:

| Context | Class | Value |
|---|---|---|
| Tight group (icon + label) | `gap-1.5` | 6px |
| Standard inline gap | `gap-2` | 8px |
| Related items in a card | `gap-3` | 12px |
| Card internal padding | `p-4` | 16px |
| Section spacing within view | `space-y-6` | 24px |
| Major sections | `space-y-8` | 32px |
| Page top padding (below TopBar) | `pt-4 md:pt-6` | 16/24px |
| Page bottom padding (above BottomTabBar) | `pb-20 md:pb-8` | 80/32px (extra room for tab bar on mobile) |

### 10.5 Radius & Elevation

#### 10.5.1 Border Radius

Keep shadcn-vue's `--radius: 0.5rem` default. Derived scale:

| Class | Value | Use |
|---|---|---|
| `rounded-sm` | 0.25rem | Badges |
| `rounded-md` | 0.375rem | Inputs, small buttons |
| `rounded-lg` | 0.5rem | Cards, main buttons (default shadcn radius) |
| `rounded-xl` | 0.75rem | Hero cards, modals |
| `rounded-full` | 9999px | FABs, avatars, progress dots |

#### 10.5.2 Shadow

Only three shadow levels allowed:

| Class | Use |
|---|---|
| none (default) | Flat cards on a tinted background |
| `shadow-sm` | Resting state of most cards |
| `shadow-md` | Hover/active state; elevated sheets |
| `shadow-lg` | Emergency FAB, floating overlays |

No custom `shadow-xl`, `shadow-2xl`, or colored shadows.

### 10.6 Iconography

- **Library:** `lucide-vue-next` only. No emoji in UI chrome (emoji allowed in user-facing copy sparingly).
- **Default size:** 16px (`h-4 w-4`) inline with text, 20px (`h-5 w-5`) standalone, 24px (`h-6 w-6`) for tab bar / FAB.
- **Stroke width:** lucide default (2). Do not tweak.
- **Color:** inherit from parent (`text-current`) unless deliberately accented.

#### 10.6.1 Canonical Icon Mapping

Reuse these exact icons for consistency:

| Concept | Icon |
|---|---|
| Home / Overview | `Home` |
| Itinerary / Calendar | `CalendarDays` |
| Flight | `Plane` |
| Hotel | `BedDouble` |
| Info hub | `BookOpen` |
| Budget | `Wallet` |
| Map link | `MapPin` |
| Wikipedia link | `BookText` |
| External link | `ExternalLink` |
| Phone (emergency) | `Phone` |
| Favorite (on) | `Star` (filled) |
| Favorite (off) | `Star` (outline) |
| Check (done) | `Check` |
| Checkbox item | `Circle` / `CheckCircle2` |
| Warning | `AlertTriangle` |
| Info | `Info` |
| Error / Critical | `AlertOctagon` |
| Success | `CheckCircle2` |
| Back | `ChevronLeft` |
| Forward | `ChevronRight` |
| Sun (light theme) | `Sun` |
| Moon (dark theme) | `Moon` |
| Currency | `ArrowRightLeft` |
| Temple | `Landmark` |
| Restaurant | `UtensilsCrossed` |
| Transport | `Bus` |
| Shopping | `ShoppingBag` |
| Experience | `Sparkles` |
| Rest / Sleep | `Moon` |

### 10.7 Component Variants

#### 10.7.1 Button Variants (from shadcn defaults)

| Variant | Use |
|---|---|
| `default` | Primary action on a page (one per view max) |
| `secondary` | Secondary actions |
| `outline` | Map/Wiki/External link buttons |
| `ghost` | Nav items, subtle actions |
| `destructive` | Reset, delete, confirm-dangerous |
| `link` | Inline text links |

**Button size conventions:**
- `size="sm"` for action buttons inside cards (map/wiki)
- `size="default"` for main CTAs
- `size="icon"` for icon-only buttons (44×44 mobile minimum)

#### 10.7.2 Badge Variants

| Variant | Use |
|---|---|
| `default` | Primary/highlighted |
| `secondary` | Neutral tags (item count, day number) |
| `outline` | Low-emphasis tags (category, type) |
| City-specific: `bangkok` / `luangprabang` / `transit` | Custom variant — add to badge component |

Extend `badge.vue` in `components/ui/badge.ts` cva variants with:
```ts
variants: {
  variant: {
    // ... existing ...
    bangkok: 'border-transparent bg-bangkok text-bangkok-foreground',
    luangprabang: 'border-transparent bg-luangprabang text-luangprabang-foreground',
    transit: 'border-transparent bg-transit text-transit-foreground',
  }
}
```

#### 10.7.3 Alert Variants

| Variant | Severity | Visual |
|---|---|---|
| `default` | Tip | Neutral background, info icon |
| `warning` (custom) | Important | Amber tint, AlertTriangle icon |
| `destructive` | Critical | Red tint, AlertOctagon icon |

Extend `alert.vue` cva with a `warning` variant using `--warning` tokens.

### 10.8 Motion

Keep it minimal and fast. Heavy motion is a distraction in a reference app.

#### 10.8.1 Duration Tokens

| Token | Duration | Use |
|---|---|---|
| `duration-150` | 150ms | Default for hover/color changes |
| `duration-200` | 200ms | Card elevations, small transforms |
| `duration-300` | 300ms | Modal open, sheet slide |

Never exceed 300ms for interactive feedback.

#### 10.8.2 Canonical Interactions

| Element | Classes |
|---|---|
| Default card | `transition-all duration-200 hover:shadow-md hover:-translate-y-0.5` |
| Button press | `active:scale-[0.98] transition-transform duration-150` |
| Tab switch | Rely on shadcn built-in animations |
| Route transition | Optional `<Transition name="fade">` with 150ms fade |
| Timeline item entrance | `animate-in fade-in slide-in-from-left-2 duration-300` |
| Toast | shadcn `sonner` defaults |

#### 10.8.3 Reduced Motion

Respect `prefers-reduced-motion`. Add to `main.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 10.9 Breakpoints

Use Tailwind defaults:

| Prefix | Min width | Device |
|---|---|---|
| (none) | 0 | Mobile (primary target) |
| `sm:` | 640px | Large phone / small tablet |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Desktop (sidebar appears) |
| `xl:` | 1280px | Large desktop (content max-width reached) |

**Layout anchors:**
- Content container max-width: `max-w-screen-xl` (1280px)
- Reading-text max-width: `max-w-prose` (65ch) for long paragraphs
- Sidebar shows at `lg:` and up

### 10.10 Dark Mode

- Trigger: `class="dark"` on `<html>` (shadcn convention)
- Toggle order: `system` → `light` → `dark` → `system`
- Persist via `usePreferencesStore` (`app.theme` key)
- Apply theme on app mount before first paint (to avoid flash):
  ```ts
  // In main.ts, before createApp
  const stored = localStorage.getItem('app.theme');
  const isDark = stored === 'dark' ||
    (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', isDark);
  ```
- Every component must be tested in both modes. No view may have hard-coded colors that break in dark mode.

### 10.11 Accessibility Baseline

- Color contrast: WCAG AA minimum (4.5:1 for body text, 3:1 for large text and UI)
- All interactive elements have visible focus rings (shadcn default `ring-2 ring-ring ring-offset-2`)
- All buttons have accessible labels (text content OR `aria-label` for icon-only)
- Form inputs always paired with `<Label>`
- Phone links use `tel:` protocol and are announced by screen readers
- Images have `alt` attributes (empty `alt=""` for decorative)

### 10.12 Empty & Loading States

#### 10.12.1 Empty
Since data is static, empty states are rare. When they occur (e.g. search results, favorites list, filtered day):
- Use `<Card>` with centered content
- Icon (lucide `Inbox` or similar) at 48px
- Short explanation in `text-muted-foreground`
- Optional CTA button

#### 10.12.2 Loading
- Route chunks: use Vue Router's async component with suspense + `<Skeleton>` placeholder
- Synchronous data: no loading state needed

### 10.13 Acceptance Criteria
- Every view renders correctly in both light and dark mode
- No hard-coded hex values outside design token definitions
- No font sizes outside the type scale
- Focus states visible on all interactive elements (keyboard-test)
- Contrast ratios pass WCAG AA (verify with browser devtools "Inspect element → Accessibility")
- `prefers-reduced-motion` is respected (test with OS setting)
- Mobile tap targets ≥ 44×44 px (verify BottomTabBar items and FAB)

---

## 11. PWA & Offline

### 11.1 Manifest Configuration
In `vite.config.ts`, configure `VitePWA` with:

```typescript
VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
  manifest: {
    name: '台北曼谷龍坡邦七日慢旅',
    short_name: '東南亞七日',
    description: '2026 年 12 月 台北—曼谷—龍坡邦 七日文化慢旅行程查詢',
    theme_color: '#D4A017',
    background_color: '#ffffff',
    display: 'standalone',
    start_url: '/',
    icons: [
      { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
      { src: 'pwa-512x512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    lang: 'zh-TW',
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
    cleanupOutdatedCaches: true,
  },
})
```

### 11.2 Icon Assets
Add to `public/`:
- `pwa-192x192.png`
- `pwa-512x512.png`
- `pwa-512x512-maskable.png`
- `apple-touch-icon.png`
- `favicon.ico`

**If designer assets unavailable:** generate placeholders using a simple script (Canvas or an online generator); acceptable for MVP. Mark as TODO for replacement.

### 11.3 Offline Handling
- App shell caches automatically via Workbox
- External links (maps, wiki) will fail offline — acceptable, browser handles
- Consider adding a toast notification on first install: "此 App 可離線使用"
- Consider a subtle indicator when offline (use `navigator.onLine` + online/offline events)

### 11.4 Update Prompt
Detect SW updates and show a toast with "重新整理" button.

### 11.5 Acceptance Criteria
- Built app passes Chrome DevTools "Installable" check
- "Add to Home Screen" works on iOS Safari and Android Chrome
- Turning off network after first load → all routes still work
- Lighthouse PWA score ≥ 90

---

## 12. Testing & Deployment

### 12.1 Manual Testing Checklist
Before declaring MVP done, verify:
- [ ] All 7 days display correct items and prices
- [ ] All POI cards link to correct detail pages
- [ ] All Google Maps buttons open correct locations
- [ ] All Wikipedia buttons open correct pages
- [ ] Currency converter calculates correctly (spot-check with known values)
- [ ] Budget calculator changes per slider/select
- [ ] Checklist state persists across reloads
- [ ] Theme persists across reloads
- [ ] Favorites persist across reloads
- [ ] Emergency FAB phone links work (test on real phone)
- [ ] Bottom tab navigation works on mobile
- [ ] Sidebar navigation works on desktop
- [ ] Back button works everywhere
- [ ] 404 redirects to home
- [ ] No console errors in any view
- [ ] Lighthouse scores: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90, PWA ≥ 90

### 12.2 Build & Preview
```bash
pnpm build
pnpm preview
```
Verify the production build in Chrome DevTools mobile emulation (iPhone 12 Pro) and desktop (1280×800).

### 12.3 Deployment

**Recommended: Vercel**
```bash
pnpm add -g vercel
vercel
```
Or push to GitHub and import repo in Vercel dashboard. Vercel auto-detects pnpm from `pnpm-lock.yaml` — no extra config needed.

**Alternative: Netlify, Cloudflare Pages, GitHub Pages**
All work with static SPA output. For GitHub Pages, configure `vite.config.ts` `base` appropriately.

### 12.4 Post-Deployment
- Test deployed URL on real mobile device
- Add to home screen and verify PWA install
- Share URL + QR code with travel companions
- Document the URL in `README.md`

### 12.5 Acceptance Criteria for MVP
- Deployed and publicly accessible URL
- Works on iOS Safari, Android Chrome, desktop Chrome, Firefox, Safari
- All manual checklist items pass
- Real-device PWA install succeeds

---

## 13. Out of Scope (Do Not Implement)

These are explicitly excluded from this plan. If the user asks later, they can become a v2 feature.

- ❌ Backend API or database
- ❌ Real-time data fetching (weather APIs, currency APIs, flight status)
- ❌ User authentication or accounts
- ❌ Multi-user sync (shared checklists across phones)
- ❌ Expense tracking / bookkeeping
- ❌ Push notifications
- ❌ In-app map rendering (Mapbox/Google Maps embed) — we use link-outs only
- ❌ Image gallery or photo uploads
- ❌ i18n / multi-language (Chinese only for MVP)
- ❌ Server-side rendering
- ❌ Analytics / telemetry

---

## 14. Implementation Order (Recommended)

For a 2-week solo sprint:

**Week 1 — Foundation**
- Day 1: Section 1 (setup) + Section 2 (directory) + Section 3 (types)
- Days 2-3: Section 4 (data) — this is the largest single task
- Day 4: Section 5 (routing) + Section 7 (composables)
- Day 5: Section 6 (layout)

**Week 2 — Views & Polish**
- Days 6-7: Section 8 main views (Home, Itinerary, Day, PoiDetail)
- Day 8: Section 8 travel views (Travel, Flights, Hotels)
- Day 9: Section 8 info views (Info hub + 7 sub-views)
- Day 10: Section 8 budget + Section 9 shared components cleanup
- Day 11: Section 10 (polish + dark mode)
- Day 12: Section 11 (PWA)
- Day 13: Section 12 (testing + deployment)
- Day 14: Buffer / final fixes

---

## 15. Coding Standards Reminder

- **TypeScript strict mode** on
- **No `any`** except with comment explaining why
- **Composition API** with `<script setup lang="ts">`
- **Tailwind first**, minimal custom CSS (use `@layer components` if needed)
- **No inline styles** (use Tailwind or CSS variables)
- **Design system enforcement:** only use tokens from Section 10. No raw hex colors, no font sizes outside the type scale, no custom shadows beyond the three allowed levels. If you find yourself needing a new token, add it to Section 10 first.
- **Package manager:** `pnpm` only. Never run `npm install` or `yarn add`. Always use `pnpm add`, `pnpm dlx`, `pnpm dev`, etc.
- **Props typed with `defineProps<{...}>()`** not runtime declarations
- **Emits typed with `defineEmits<{...}>()`**
- **Constants UPPER_SNAKE_CASE**, everything else camelCase
- **File names**: kebab-case for data files (`grand-palace.ts` style not needed since all POIs in one file), PascalCase for Vue components
- **Imports**: absolute with `@/` alias, group by external → internal → types
- **Chinese text in UI, English in code** (variable names, comments optional in English)
- **Pre-commit**: run `pnpm build` to catch type errors before committing

---

## 16. References

- **Source itinerary:** project file `Taipei-Bangkok-Luang_Prabang__7-Day_Cultural_Slow_Travel_Itinerary.md`
- **Vue 3 docs:** https://vuejs.org/
- **Vue Router:** https://router.vuejs.org/
- **Pinia:** https://pinia.vuejs.org/
- **shadcn-vue:** https://www.shadcn-vue.com/
- **Tailwind CSS:** https://tailwindcss.com/
- **VueUse:** https://vueuse.org/
- **vite-plugin-pwa:** https://vite-pwa-org.netlify.app/
- **Lucide icons:** https://lucide.dev/

---

**End of plan.** When all sections' acceptance criteria pass, MVP is complete and the app is ready for travel companions to use.
