<script setup lang="ts">
import { computed } from 'vue';
import { useCountdown } from '@/composables/useCountdown';
import { cn } from '@/lib/utils';

const { daysUntilTrip, tripStatus, currentTripDay } = useCountdown();

const message = computed(() => {
  if (tripStatus.value === 'before') {
    if (daysUntilTrip.value === 0) return '出發日到！';
    if (daysUntilTrip.value < 0) return '旅程進行中';
    return '距離出發';
  }
  if (tripStatus.value === 'during') return '旅程進行中';
  return '旅程已結束';
});

const accentClass = computed(() => {
  if (tripStatus.value === 'during') return 'from-luangprabang to-luangprabang/70';
  if (tripStatus.value === 'after') return 'from-transit to-transit/70';
  return 'from-bangkok to-bangkok/70';
});
</script>

<template>
  <div
    :class="
      cn(
        'relative rounded-xl bg-gradient-to-br p-5 text-white shadow-sm overflow-hidden',
        accentClass,
      )
    "
  >
    <div class="text-xs opacity-90 font-medium uppercase tracking-widest">
      2026-12-01 ~ 12-07
    </div>
    <div class="mt-2 flex items-end gap-2" v-if="tripStatus === 'before'">
      <div class="text-xs opacity-90">{{ message }}</div>
    </div>
    <div v-if="tripStatus === 'before'" class="flex items-baseline gap-2 mt-1">
      <span class="text-4xl font-bold tabular-nums">{{ daysUntilTrip }}</span>
      <span class="text-sm opacity-95">天</span>
    </div>
    <div v-else-if="tripStatus === 'during'" class="mt-2">
      <div class="text-2xl font-bold tracking-tight">{{ message }}</div>
      <div class="text-sm opacity-95 mt-1">
        第 <span class="font-mono tabular-nums">{{ currentTripDay }}</span> 天 / 共 7 天
      </div>
    </div>
    <div v-else class="mt-2 text-lg font-semibold">{{ message }}</div>
    <div class="mt-3 text-xs opacity-85">
      台北 → 曼谷 → 龍坡邦 · 七日知性慢旅
    </div>
  </div>
</template>
