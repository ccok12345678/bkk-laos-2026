import { useStorage, type RemovableRef } from '@vueuse/core';

export function useLocalStorage<T>(key: string, initial: T): RemovableRef<T> {
  return useStorage<T>(key, initial);
}
