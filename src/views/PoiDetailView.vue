<script setup lang="ts">
import { computed } from 'vue';
import { getPoi } from '@/data/pois';
import { ITINERARY } from '@/data/itinerary';
import CityBadge from '@/components/trip/CityBadge.vue';
import PriceTag from '@/components/trip/PriceTag.vue';
import MapLinkButton from '@/components/trip/MapLinkButton.vue';
import WikiLinkButton from '@/components/trip/WikiLinkButton.vue';
import Badge from '@/components/ui/Badge.vue';
import Alert from '@/components/ui/Alert.vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardContent from '@/components/ui/CardContent.vue';
import { useFavorites } from '@/composables/useFavorites';
import { Star, ExternalLink } from 'lucide-vue-next';

const props = defineProps<{ poiId: string }>();

const poi = computed(() => getPoi(props.poiId));

const TYPE_LABEL = {
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

const { isFavorite, toggle } = useFavorites();
const fav = computed(() => isFavorite(props.poiId).value);

const appearsInDays = computed(() => {
  if (!poi.value) return [];
  return ITINERARY.filter((d) =>
    d.items.some((it) => it.poiId === poi.value!.id),
  );
});
</script>

<template>
  <article v-if="poi" class="space-y-6">
    <header class="relative">
      <button
        type="button"
        @click="toggle(poi.id)"
        class="absolute top-0 right-0 p-2 rounded-md hover:bg-accent transition-colors"
        :aria-label="fav ? '取消收藏' : '加入收藏'"
      >
        <Star
          class="h-5 w-5"
          :class="fav ? 'fill-luangprabang text-luangprabang' : 'text-muted-foreground'"
        />
      </button>
      <div class="flex items-center gap-2 flex-wrap mb-2">
        <Badge variant="outline">{{ TYPE_LABEL[poi.type] }}</Badge>
        <CityBadge :city="poi.city" />
      </div>
      <h1 class="text-2xl font-bold tracking-tight pr-10">{{ poi.name }}</h1>
      <p v-if="poi.nameEn || poi.nameLocal" class="text-sm text-muted-foreground mt-1">
        <span v-if="poi.nameEn">{{ poi.nameEn }}</span>
        <span v-if="poi.nameEn && poi.nameLocal"> · </span>
        <span v-if="poi.nameLocal">{{ poi.nameLocal }}</span>
      </p>
    </header>

    <section class="text-base leading-relaxed">{{ poi.description }}</section>

    <section v-if="poi.highlights && poi.highlights.length">
      <h2 class="text-base font-semibold mb-2">亮點</h2>
      <ul class="space-y-1.5 text-sm">
        <li
          v-for="h in poi.highlights"
          :key="h"
          class="flex gap-2 items-start"
        >
          <span class="text-luangprabang mt-1.5 h-1.5 w-1.5 rounded-full bg-current shrink-0" />
          <span>{{ h }}</span>
        </li>
      </ul>
    </section>

    <Card>
      <CardHeader>
        <h2 class="text-base font-semibold">景點資訊</h2>
      </CardHeader>
      <CardContent class="space-y-2 text-sm">
        <div v-if="poi.address" class="flex gap-2">
          <span class="text-muted-foreground w-16 shrink-0">地址</span>
          <span>{{ poi.address }}</span>
        </div>
        <div v-if="poi.openHours" class="flex gap-2">
          <span class="text-muted-foreground w-16 shrink-0">營業時間</span>
          <span>{{ poi.openHours }}</span>
        </div>
        <div v-if="poi.price" class="flex gap-2">
          <span class="text-muted-foreground w-16 shrink-0">費用</span>
          <PriceTag :price="poi.price" size="sm" />
        </div>
        <div v-if="poi.dressCode" class="flex gap-2">
          <span class="text-muted-foreground w-16 shrink-0">著裝</span>
          <span>{{ poi.dressCode }}</span>
        </div>
      </CardContent>
    </Card>

    <Alert
      v-if="poi.tips && poi.tips.length"
      variant="info"
      title="實用提示"
    >
      <ul class="space-y-1 list-disc list-inside">
        <li v-for="tip in poi.tips" :key="tip">{{ tip }}</li>
      </ul>
    </Alert>

    <div class="flex flex-wrap gap-2">
      <MapLinkButton :url="poi.googleMapsUrl" size="default" />
      <WikiLinkButton v-if="poi.wikipediaUrl" :url="poi.wikipediaUrl" size="default" />
      <Button
        v-if="poi.officialUrl"
        as="a"
        variant="outline"
        :href="poi.officialUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ExternalLink class="h-4 w-4" />
        官網
      </Button>
    </div>

    <section v-if="appearsInDays.length" class="pt-2 border-t border-border">
      <h2 class="text-xs text-muted-foreground uppercase tracking-widest mb-2">
        出現於
      </h2>
      <div class="flex flex-wrap gap-2">
        <router-link
          v-for="d in appearsInDays"
          :key="d.id"
          :to="`/itinerary/day/${d.id}`"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium hover:bg-accent transition-colors"
        >
          Day {{ d.dayNumber }} · {{ d.theme }}
        </router-link>
      </div>
    </section>
  </article>
  <div v-else class="py-12 text-center text-muted-foreground">找不到此景點。</div>
</template>
