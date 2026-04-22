import { ref, computed, onMounted, onUnmounted } from 'vue';

const TRIP_START_ISO = '2026-12-01T00:00:00+08:00';
const TRIP_END_ISO = '2026-12-07T23:59:59+08:00';
const TRIP_DAYS = 7;

export function useCountdown() {
  const now = ref(Date.now());
  let timer: number | undefined;

  const startMs = new Date(TRIP_START_ISO).getTime();
  const endMs = new Date(TRIP_END_ISO).getTime();

  onMounted(() => {
    timer = window.setInterval(() => {
      now.value = Date.now();
    }, 60_000);
  });

  onUnmounted(() => {
    if (timer) window.clearInterval(timer);
  });

  const tripStatus = computed<'before' | 'during' | 'after'>(() => {
    if (now.value < startMs) return 'before';
    if (now.value > endMs) return 'after';
    return 'during';
  });

  const daysUntilTrip = computed(() => {
    const diffMs = startMs - now.value;
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  });

  const hoursUntilTrip = computed(() => {
    const diffMs = startMs - now.value;
    return Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  });

  const currentTripDay = computed<number | null>(() => {
    if (tripStatus.value !== 'during') return null;
    const diffMs = now.value - startMs;
    const day = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(1, Math.min(TRIP_DAYS, day));
  });

  const tripStartDate = computed(() => new Date(TRIP_START_ISO));
  const tripEndDate = computed(() => new Date(TRIP_END_ISO));

  return {
    daysUntilTrip,
    hoursUntilTrip,
    tripStatus,
    currentTripDay,
    tripStartDate,
    tripEndDate,
  };
}
