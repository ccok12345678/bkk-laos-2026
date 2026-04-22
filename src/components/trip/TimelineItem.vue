<script setup lang="ts">
import { computed } from 'vue';
import type { ItineraryItem } from '@/types';
import {
  Landmark,
  UtensilsCrossed,
  Bus,
  Moon,
  ShoppingBag,
  Sparkles,
  BedDouble,
} from 'lucide-vue-next';
import Badge from '@/components/ui/Badge.vue';
import PriceTag from './PriceTag.vue';
import MapLinkButton from './MapLinkButton.vue';
import WikiLinkButton from './WikiLinkButton.vue';
import Button from '@/components/ui/Button.vue';
import { getPoi } from '@/data/pois';
import { cn } from '@/lib/utils';

interface Props {
  item: ItineraryItem;
  isLast?: boolean;
}

const props = defineProps<Props>();

const poi = computed(() => (props.item.poiId ? getPoi(props.item.poiId) : undefined));

const categoryMeta = computed(() => {
  switch (props.item.category) {
    case 'sightseeing':
      return { icon: Landmark, label: '景點', color: 'bg-cat-sightseeing' };
    case 'meal':
      return { icon: UtensilsCrossed, label: '用餐', color: 'bg-cat-meal' };
    case 'transport':
      return { icon: Bus, label: '交通', color: 'bg-cat-transport' };
    case 'rest':
      return { icon: Moon, label: '休息', color: 'bg-cat-rest' };
    case 'shopping':
      return { icon: ShoppingBag, label: '購物', color: 'bg-cat-shopping' };
    case 'experience':
      return { icon: Sparkles, label: '體驗', color: 'bg-cat-experience' };
    case 'check-in':
      return { icon: BedDouble, label: '入住', color: 'bg-cat-rest' };
    case 'check-out':
      return { icon: BedDouble, label: '退房', color: 'bg-cat-rest' };
  }
});
</script>

<template>
  <div class="flex gap-3 animate-in fade-in slide-in-from-left-2">
    <!-- Timeline rail -->
    <div class="flex flex-col items-center shrink-0">
      <div
        :class="
          cn(
            'h-8 w-8 rounded-full flex items-center justify-center text-white shadow-sm',
            categoryMeta.color,
          )
        "
      >
        <component :is="categoryMeta.icon" class="h-4 w-4" />
      </div>
      <div v-if="!isLast" class="flex-1 w-px bg-border mt-1" />
    </div>

    <!-- Card -->
    <div class="flex-1 min-w-0 rounded-lg border bg-card p-4 shadow-sm mb-4">
      <div class="flex items-center gap-2 text-xs text-muted-foreground mb-1 flex-wrap">
        <span class="font-mono tabular-nums">{{ item.time }}</span>
        <Badge variant="outline">{{ categoryMeta.label }}</Badge>
        <Badge v-if="item.isOptional" variant="secondary">選擇性</Badge>
      </div>
      <h3 class="text-base font-semibold tracking-tight">{{ item.title }}</h3>
      <p v-if="item.description" class="text-sm text-muted-foreground mt-1 leading-relaxed">
        {{ item.description }}
      </p>

      <div v-if="item.price" class="mt-2">
        <PriceTag :price="item.price" size="sm" />
      </div>

      <ul v-if="item.tips && item.tips.length" class="mt-3 space-y-1 text-xs text-muted-foreground">
        <li v-for="tip in item.tips" :key="tip" class="flex gap-1.5">
          <span class="text-warning">·</span>
          <span>{{ tip }}</span>
        </li>
      </ul>

      <div class="mt-3 flex flex-wrap gap-2">
        <MapLinkButton v-if="poi" :url="poi.googleMapsUrl" />
        <WikiLinkButton v-if="poi?.wikipediaUrl" :url="poi.wikipediaUrl" />
        <Button
          v-if="poi"
          as="router-link"
          variant="ghost"
          size="sm"
          :to="`/poi/${poi.id}`"
        >
          詳情
        </Button>
      </div>
    </div>
  </div>
</template>
