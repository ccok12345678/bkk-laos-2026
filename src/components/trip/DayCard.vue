<script setup lang="ts">
import { computed } from 'vue';
import type { ItineraryDay } from '@/types';
import Card from '@/components/ui/Card.vue';
import CityBadge from './CityBadge.vue';
import { ChevronRight } from 'lucide-vue-next';

interface Props {
  day: ItineraryDay;
}

const props = defineProps<Props>();

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

const weekdayLabel = computed(() => {
  const d = new Date(props.day.date);
  return `週${WEEKDAYS[d.getDay()]}`;
});

const dateLabel = computed(() => {
  const d = new Date(props.day.date);
  return `${d.getMonth() + 1}/${d.getDate()}`;
});

const accentClass = computed(() => {
  switch (props.day.city) {
    case 'bangkok':
      return 'text-bangkok';
    case 'luangprabang':
      return 'text-luangprabang';
    default:
      return 'text-transit';
  }
});
</script>

<template>
  <router-link :to="`/itinerary/day/${day.id}`" class="block focus-visible:outline-none">
    <Card interactive class="p-4 flex items-center gap-4 focus-within:ring-2 focus-within:ring-ring">
      <div
        :class="[
          'flex-none w-14 h-14 rounded-lg flex flex-col items-center justify-center',
          day.city === 'bangkok' && 'bg-bangkok-subtle',
          day.city === 'luangprabang' && 'bg-luangprabang-subtle',
          day.city === 'in-transit' && 'bg-muted',
        ]"
      >
        <div class="text-[10px] font-semibold uppercase tracking-widest" :class="accentClass">
          Day
        </div>
        <div :class="['text-xl font-bold leading-none tabular-nums', accentClass]">
          {{ day.dayNumber }}
        </div>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
          <span class="tabular-nums">{{ dateLabel }}</span>
          <span>·</span>
          <span>{{ weekdayLabel }}</span>
          <CityBadge :city="day.city" />
        </div>
        <h3 class="text-base font-semibold tracking-tight truncate">{{ day.theme }}</h3>
        <p v-if="day.subtitle" class="text-xs text-muted-foreground truncate mt-0.5">
          {{ day.subtitle }}
        </p>
        <div class="text-xs text-muted-foreground mt-1">
          {{ day.items.length }} 個行程
        </div>
      </div>
      <ChevronRight class="h-5 w-5 text-muted-foreground shrink-0" />
    </Card>
  </router-link>
</template>
