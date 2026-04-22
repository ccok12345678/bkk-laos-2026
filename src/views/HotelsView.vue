<script setup lang="ts">
import { ref, computed } from 'vue';
import { HOTELS } from '@/data/hotels';
import type { CityId } from '@/types';
import Card from '@/components/ui/Card.vue';
import Badge from '@/components/ui/Badge.vue';
import Alert from '@/components/ui/Alert.vue';
import Tabs from '@/components/ui/Tabs.vue';
import TabsList from '@/components/ui/TabsList.vue';
import TabsTrigger from '@/components/ui/TabsTrigger.vue';
import TabsContent from '@/components/ui/TabsContent.vue';
import PriceTag from '@/components/trip/PriceTag.vue';
import MapLinkButton from '@/components/trip/MapLinkButton.vue';
import CityBadge from '@/components/trip/CityBadge.vue';

const tab = ref<CityId>('bangkok');

const hotelsByCity = computed(() => ({
  bangkok: HOTELS.filter((h) => h.city === 'bangkok'),
  luangprabang: HOTELS.filter((h) => h.city === 'luangprabang'),
}));
</script>

<template>
  <div class="space-y-5">
    <header>
      <h1 class="text-2xl font-bold tracking-tight">住宿資訊</h1>
      <p class="text-sm text-muted-foreground mt-1">
        中價位精選 · 10 月前訂龍坡邦住宿避開旺季
      </p>
    </header>

    <Tabs v-model="tab">
      <TabsList>
        <TabsTrigger value="bangkok">曼谷</TabsTrigger>
        <TabsTrigger value="luangprabang">龍坡邦</TabsTrigger>
      </TabsList>

      <TabsContent value="bangkok">
        <ul class="space-y-3">
          <li v-for="h in hotelsByCity.bangkok" :key="h.id">
            <Card class="p-4">
              <div class="flex items-start justify-between gap-3 flex-wrap mb-2">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1 flex-wrap">
                    <CityBadge :city="h.city" />
                    <Badge variant="outline">{{ h.district }}</Badge>
                    <Badge v-if="h.isRecommended" variant="success">推薦</Badge>
                  </div>
                  <h3 class="text-base font-semibold">{{ h.name }}</h3>
                </div>
                <PriceTag :price="h.priceRange" size="sm" />
              </div>
              <div class="flex flex-wrap gap-1.5 mb-3">
                <Badge v-for="f in h.features" :key="f" variant="secondary" class="text-xs">
                  {{ f }}
                </Badge>
              </div>
              <p class="text-xs text-muted-foreground mb-3">{{ h.suitableFor }}</p>
              <MapLinkButton :url="h.googleMapsUrl" />
            </Card>
          </li>
        </ul>
      </TabsContent>

      <TabsContent value="luangprabang">
        <Alert variant="info" title="4–5 人最划算建議" class="mb-3">
          <strong>My Dream Boutique Resort 的 Family Suite</strong> 是 4–5 人最划算方案（總價最低、整套獨立使用）。想分男女房或夫妻分住則選 Villa Maly 或 Le Sen 的 2 間房組合。
        </Alert>
        <ul class="space-y-3">
          <li v-for="h in hotelsByCity.luangprabang" :key="h.id">
            <Card class="p-4">
              <div class="flex items-start justify-between gap-3 flex-wrap mb-2">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1 flex-wrap">
                    <CityBadge :city="h.city" />
                    <Badge variant="outline">{{ h.district }}</Badge>
                    <Badge v-if="h.isRecommended" variant="success">推薦</Badge>
                  </div>
                  <h3 class="text-base font-semibold">{{ h.name }}</h3>
                  <p v-if="h.roomArrangement" class="text-xs text-muted-foreground mt-1">
                    房型：{{ h.roomArrangement }}
                  </p>
                </div>
                <div class="text-right shrink-0">
                  <div class="text-[10px] text-muted-foreground uppercase tracking-widest">
                    每晚
                  </div>
                  <PriceTag :price="h.priceRange" size="sm" />
                </div>
              </div>
              <div class="flex flex-wrap gap-1.5 mb-3">
                <Badge v-for="f in h.features" :key="f" variant="secondary" class="text-xs">
                  {{ f }}
                </Badge>
              </div>
              <p class="text-xs text-muted-foreground mb-3">{{ h.suitableFor }}</p>
              <MapLinkButton :url="h.googleMapsUrl" />
            </Card>
          </li>
        </ul>
      </TabsContent>
    </Tabs>
  </div>
</template>
