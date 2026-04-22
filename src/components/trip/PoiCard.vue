<script setup lang="ts">
import { computed } from 'vue';
import type { PoiItem } from '@/types';
import Card from '@/components/ui/Card.vue';
import Badge from '@/components/ui/Badge.vue';
import { Star } from 'lucide-vue-next';
import { useFavorites } from '@/composables/useFavorites';

interface Props {
  poi: PoiItem;
  compact?: boolean;
}

const props = defineProps<Props>();

const { isFavorite, toggle } = useFavorites();
const fav = isFavorite(props.poi.id);

const typeLabel = computed(() => {
  const map = {
    temple: '寺廟',
    museum: '博物館',
    restaurant: '餐廳',
    experience: '體驗',
    market: '市場',
    landmark: '地標',
    hotel: '住宿',
    transport: '交通',
    cafe: '咖啡',
    shop: '購物',
    nature: '自然',
  } as const;
  return map[props.poi.type];
});

function handleFavorite(e: Event) {
  e.preventDefault();
  e.stopPropagation();
  toggle(props.poi.id);
}
</script>

<template>
  <router-link :to="`/poi/${poi.id}`" class="block focus-visible:outline-none">
    <Card interactive class="p-4 relative">
      <button
        type="button"
        @click="handleFavorite"
        class="absolute top-3 right-3 p-1 rounded hover:bg-accent transition-colors"
        :aria-label="fav ? '取消收藏' : '加入收藏'"
      >
        <Star
          class="h-4 w-4"
          :class="fav ? 'fill-luangprabang text-luangprabang' : 'text-muted-foreground'"
        />
      </button>
      <div class="flex items-center gap-2 mb-2 pr-6">
        <Badge variant="outline">{{ typeLabel }}</Badge>
      </div>
      <h3 class="text-sm font-semibold tracking-tight">{{ poi.name }}</h3>
      <p
        v-if="!compact && poi.shortDescription"
        class="text-xs text-muted-foreground mt-1 line-clamp-2"
      >
        {{ poi.shortDescription }}
      </p>
    </Card>
  </router-link>
</template>
