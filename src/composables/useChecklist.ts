import { computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { CHECKLIST } from '@/data/checklist';
import type { ChecklistGroup } from '@/types';

const STORAGE_KEY = 'app.checklist';

export function useChecklist() {
  const state = useStorage<Record<string, boolean>>(STORAGE_KEY, {});

  function toggle(itemId: string) {
    state.value = { ...state.value, [itemId]: !state.value[itemId] };
  }

  function set(itemId: string, value: boolean) {
    state.value = { ...state.value, [itemId]: value };
  }

  function isChecked(itemId: string): boolean {
    return !!state.value[itemId];
  }

  function reset() {
    state.value = {};
  }

  const progress = computed(() => {
    const total = CHECKLIST.length;
    const done = CHECKLIST.filter((i) => state.value[i.id]).length;
    return {
      done,
      total,
      percentage: total === 0 ? 0 : Math.round((done / total) * 100),
    };
  });

  const progressByGroup = computed(() => {
    const groups: ChecklistGroup[] = [
      'documents',
      'booking',
      'packing',
      'apps',
      'insurance',
    ];
    const result = {} as Record<
      ChecklistGroup,
      { done: number; total: number; percentage: number }
    >;
    for (const g of groups) {
      const items = CHECKLIST.filter((i) => i.group === g);
      const done = items.filter((i) => state.value[i.id]).length;
      result[g] = {
        done,
        total: items.length,
        percentage:
          items.length === 0 ? 0 : Math.round((done / items.length) * 100),
      };
    }
    return result;
  });

  return {
    state,
    toggle,
    set,
    isChecked,
    reset,
    progress,
    progressByGroup,
  };
}
