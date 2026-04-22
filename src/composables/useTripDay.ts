import { computed, type Ref } from 'vue';
import { ITINERARY } from '@/data/itinerary';
import { POIS } from '@/data/pois';
import type { ItineraryDay, PoiItem } from '@/types';

export function useTripDay(dayId: Ref<string> | string) {
  const dayIdRef = computed(() =>
    typeof dayId === 'string' ? dayId : dayId.value,
  );

  const day = computed<ItineraryDay | null>(
    () => ITINERARY.find((d) => d.id === dayIdRef.value) ?? null,
  );

  const dayIndex = computed(() =>
    ITINERARY.findIndex((d) => d.id === dayIdRef.value),
  );

  const prevDay = computed<ItineraryDay | null>(() => {
    const i = dayIndex.value;
    return i > 0 ? ITINERARY[i - 1] : null;
  });

  const nextDay = computed<ItineraryDay | null>(() => {
    const i = dayIndex.value;
    return i >= 0 && i < ITINERARY.length - 1 ? ITINERARY[i + 1] : null;
  });

  const relatedPois = computed<PoiItem[]>(() => {
    if (!day.value) return [];
    const ids = Array.from(
      new Set(
        day.value.items
          .map((it) => it.poiId)
          .filter((id): id is string => !!id),
      ),
    );
    return ids
      .map((id) => POIS.find((p) => p.id === id))
      .filter((p): p is PoiItem => !!p);
  });

  return { day, prevDay, nextDay, relatedPois };
}
