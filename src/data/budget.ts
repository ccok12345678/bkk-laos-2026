import type { BudgetBreakdown } from '@/types';

export const BUDGET_TIERS: BudgetBreakdown[] = [
  {
    category: '機票（TPE-BKK-LPQ-TPE 聯程）',
    frugal: 18000,
    mid: 25000,
    comfort: 35000,
    unit: 'per-person',
    note: '中價位以 CI + PG + PG/CI 組合為基準',
  },
  {
    category: '住宿',
    frugal: 2500,
    mid: 4500,
    comfort: 9000,
    unit: 'per-person',
    note: '已以 2 人同房 / 4–5 人分攤估算',
  },
  {
    category: '餐飲',
    frugal: 3000,
    mid: 5500,
    comfort: 10000,
    unit: 'per-person',
    note: '中價位 = 中檔本地餐 + 1 次特色餐廳/日',
  },
  {
    category: '交通',
    frugal: 1000,
    mid: 1800,
    comfort: 3500,
    unit: 'per-person',
    note: '含市內大眾運輸 / Grab / 包車分攤',
  },
  {
    category: '門票 + 體驗',
    frugal: 3000,
    mid: 5500,
    comfort: 8000,
    unit: 'per-person',
    note: '含 MandaLao 大象 / Ock Pop Tok 等體驗',
  },
  {
    category: 'SIM + 旅保 + 雜費',
    frugal: 1500,
    mid: 2000,
    comfort: 3000,
    unit: 'per-person',
  },
];

export const BUDGET_TOTALS = {
  frugal: 29000,
  mid: 44300,
  comfort: 68500,
} as const;

export const BUDGET_TIER_LABELS = {
  frugal: '節約版',
  mid: '中價位（主推）',
  comfort: '舒適版',
} as const;

export const BUDGET_TIER_DESCRIPTIONS = {
  frugal: '廉航 + 青旅 + 街頭小吃為主，壓低餐飲與交通。',
  mid: '中華航空或曼航 + 4 星中價位住宿 + 米其林必比登與當地特色餐。',
  comfort: '星宇或精品機票 + Villa Maly 級別住宿 + Manda de Laos 等精緻餐。',
} as const;

export const BUDGET_NOTES = [
  '中價位 4–5 人同行可再分攤包車、住宿，壓到約 NT$40,000/人',
  '包機票 7 天，幣別 TWD',
];
