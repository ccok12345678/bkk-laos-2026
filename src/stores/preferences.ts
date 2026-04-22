import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { BudgetTier } from '@/types';

export type ThemePreference = 'light' | 'dark' | 'system';

export const usePreferencesStore = defineStore('preferences', () => {
  const theme = useStorage<ThemePreference>('app.theme', 'system');
  const peopleCount = useStorage<number>('app.budget.people', 4);
  const budgetTier = useStorage<BudgetTier>('app.budget.tier', 'mid');

  function cycleTheme() {
    const order: ThemePreference[] = ['system', 'light', 'dark'];
    const idx = order.indexOf(theme.value);
    theme.value = order[(idx + 1) % order.length];
    applyTheme();
  }

  function applyTheme() {
    if (typeof document === 'undefined') return;
    const stored = theme.value;
    const systemDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    const isDark = stored === 'dark' || (stored === 'system' && systemDark);
    document.documentElement.classList.toggle('dark', isDark);
  }

  return {
    theme,
    peopleCount,
    budgetTier,
    cycleTheme,
    applyTheme,
  };
});
