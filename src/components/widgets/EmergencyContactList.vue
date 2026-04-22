<script setup lang="ts">
import { computed } from 'vue';
import { Phone } from 'lucide-vue-next';
import {
  EMERGENCY_CONTACTS,
  EMERGENCY_REGION_LABELS,
} from '@/data/emergency';

const grouped = computed(() => {
  const regions: Array<keyof typeof EMERGENCY_REGION_LABELS> = [
    'global',
    'thailand',
    'laos',
    'taiwan',
  ];
  return regions
    .map((region) => ({
      region,
      label: EMERGENCY_REGION_LABELS[region],
      contacts: EMERGENCY_CONTACTS.filter((c) => c.region === region),
    }))
    .filter((g) => g.contacts.length > 0);
});
</script>

<template>
  <div class="space-y-5">
    <section v-for="group in grouped" :key="group.region">
      <h3 class="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
        {{ group.label }}
      </h3>
      <ul class="space-y-1">
        <li v-for="c in group.contacts" :key="c.id">
          <a
            :href="`tel:${c.phone}`"
            class="flex items-center gap-3 rounded-md p-3 hover:bg-accent transition-colors focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div
              class="h-10 w-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center shrink-0"
            >
              <Phone class="h-5 w-5" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium truncate">{{ c.name }}</div>
              <div class="text-xs text-muted-foreground truncate">{{ c.description }}</div>
            </div>
            <div class="text-sm font-mono text-destructive tabular-nums">
              {{ c.phoneDisplay }}
            </div>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>
