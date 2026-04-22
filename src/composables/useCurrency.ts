import type { CurrencyCode, Price } from '@/types';
import { toTwd, convertToTwd } from '@/data/exchange-rates';

const SYMBOLS: Record<CurrencyCode, string> = {
  THB: '฿',
  LAK: '₭',
  USD: '$',
  TWD: 'NT$',
};

const LABELS: Record<CurrencyCode, string> = {
  THB: 'THB',
  LAK: 'LAK',
  USD: 'USD',
  TWD: 'TWD',
};

function fmtNumber(n: number, currency: CurrencyCode): string {
  if (currency === 'LAK' || Math.abs(n) >= 10000) {
    return Math.round(n).toLocaleString('en-US');
  }
  if (currency === 'USD' || currency === 'THB') {
    return (Math.round(n * 10) / 10).toLocaleString('en-US');
  }
  return Math.round(n).toLocaleString('en-US');
}

function localPart(price: Price): string {
  const { amount, currency, isRange, maxAmount } = price;
  const from = fmtNumber(amount, currency);
  const label = LABELS[currency];
  if (isRange && maxAmount != null) {
    return `${from}–${fmtNumber(maxAmount, currency)} ${label}`;
  }
  return `${from} ${label}`;
}

function twdPart(price: Price): string {
  const minTwd = convertToTwd(price);
  if (price.isRange && price.maxAmount != null) {
    const maxTwd = toTwd(price.maxAmount, price.currency);
    return `約 NT$${fmtNumber(minTwd, 'TWD')}–${fmtNumber(maxTwd, 'TWD')}`;
  }
  return `約 NT$${fmtNumber(minTwd, 'TWD')}`;
}

export function useCurrency() {
  function formatPrice(price: Price): string {
    if (price.currency === 'TWD') return `NT$${localPart(price).replace(' TWD', '')}`;
    return `${localPart(price)}（${twdPart(price)}）`;
  }

  function formatPriceCompact(price: Price): string {
    const tw = convertToTwd(price);
    if (price.isRange && price.maxAmount != null) {
      const maxTwd = toTwd(price.maxAmount, price.currency);
      return `NT$${fmtNumber(tw, 'TWD')}–${fmtNumber(maxTwd, 'TWD')}`;
    }
    return `NT$${fmtNumber(tw, 'TWD')}`;
  }

  function formatLocalOnly(price: Price): string {
    if (price.currency === 'TWD') return `NT$${fmtNumber(price.amount, 'TWD')}`;
    return localPart(price);
  }

  return {
    toTwd,
    convertToTwd,
    formatPrice,
    formatPriceCompact,
    formatLocalOnly,
    symbols: SYMBOLS,
  };
}
