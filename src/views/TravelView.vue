<script setup lang="ts">
import { RECOMMENDED_COMBO } from '@/data/flights';
import Card from '@/components/ui/Card.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import CardDescription from '@/components/ui/CardDescription.vue';
import CardContent from '@/components/ui/CardContent.vue';
import Badge from '@/components/ui/Badge.vue';
import { Plane, BedDouble, ChevronRight } from 'lucide-vue-next';
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl font-bold tracking-tight">航班與住宿</h1>
      <p class="text-sm text-muted-foreground mt-1">
        7–9 月訂機票、10 月前訂龍坡邦住宿，避開旺季漲幅。
      </p>
    </header>

    <div class="grid md:grid-cols-2 gap-4">
      <router-link to="/travel/flights" class="block focus-visible:outline-none">
        <Card interactive class="p-5 h-full">
          <div class="flex items-center justify-between mb-3">
            <div class="h-12 w-12 rounded-full bg-bangkok-subtle flex items-center justify-center">
              <Plane class="h-6 w-6 text-bangkok" />
            </div>
            <ChevronRight class="h-5 w-5 text-muted-foreground" />
          </div>
          <h2 class="text-lg font-semibold tracking-tight">航班資訊</h2>
          <p class="text-sm text-muted-foreground mt-1">
            三段航線比較 · 首推 CI + PG + PG/CI 聯程組合
          </p>
        </Card>
      </router-link>

      <router-link to="/travel/hotels" class="block focus-visible:outline-none">
        <Card interactive class="p-5 h-full">
          <div class="flex items-center justify-between mb-3">
            <div class="h-12 w-12 rounded-full bg-luangprabang-subtle flex items-center justify-center">
              <BedDouble class="h-6 w-6 text-luangprabang" />
            </div>
            <ChevronRight class="h-5 w-5 text-muted-foreground" />
          </div>
          <h2 class="text-lg font-semibold tracking-tight">住宿</h2>
          <p class="text-sm text-muted-foreground mt-1">
            曼谷 4 家、龍坡邦 3 家中價位推薦
          </p>
        </Card>
      </router-link>
    </div>

    <Card>
      <CardHeader>
        <div class="flex items-center gap-2">
          <Badge variant="bangkok">首推</Badge>
          <CardTitle>{{ RECOMMENDED_COMBO.name }}</CardTitle>
        </div>
        <CardDescription class="text-sm">
          {{ RECOMMENDED_COMBO.description }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul class="space-y-1.5 text-sm">
          <li
            v-for="h in RECOMMENDED_COMBO.highlights"
            :key="h"
            class="flex gap-2 items-start"
          >
            <span class="text-success mt-1.5 h-1.5 w-1.5 rounded-full bg-current shrink-0" />
            <span>{{ h }}</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  </div>
</template>
