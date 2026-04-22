import type { CurrencyCode, Price } from '@/types';

export const EXCHANGE_RATES = {
  THB_TO_TWD: 0.98,
  USD_TO_TWD: 32.5,
  USD_TO_LAK: 21700,
  LAK_TO_TWD: 0.0015,
  TWD_TO_LAK: 685,
  updatedAt: '2026-04-01',
} as const;

export function toTwd(amount: number, currency: CurrencyCode): number {
  switch (currency) {
    case 'TWD':
      return amount;
    case 'THB':
      return amount * EXCHANGE_RATES.THB_TO_TWD;
    case 'USD':
      return amount * EXCHANGE_RATES.USD_TO_TWD;
    case 'LAK':
      return amount * EXCHANGE_RATES.LAK_TO_TWD;
  }
}

export function convertToTwd(price: Price): number {
  if (price.twdEquivalent != null) return price.twdEquivalent;
  return toTwd(price.amount, price.currency);
}

export function withTwd(price: Omit<Price, 'twdEquivalent'>): Price {
  const base = toTwd(price.amount, price.currency);
  return { ...price, twdEquivalent: Math.round(base) };
}
