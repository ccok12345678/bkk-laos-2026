import { computed } from 'vue';
import { useStorage } from '@vueuse/core';

const STORAGE_KEY = 'app.favorites';

export function useFavorites() {
  const favorites = useStorage<string[]>(STORAGE_KEY, []);

  function isFavorite(poiId: string) {
    return computed(() => favorites.value.includes(poiId));
  }

  function toggle(poiId: string) {
    const list = [...favorites.value];
    const idx = list.indexOf(poiId);
    if (idx >= 0) list.splice(idx, 1);
    else list.push(poiId);
    favorites.value = list;
  }

  return { favorites, isFavorite, toggle };
}
