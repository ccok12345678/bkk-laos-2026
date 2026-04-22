<script setup lang="ts">
import { ref, computed } from 'vue';
import { ITINERARY } from '@/data/itinerary';
import DayCard from '@/components/trip/DayCard.vue';
import Tabs from '@/components/ui/Tabs.vue';
import TabsList from '@/components/ui/TabsList.vue';
import TabsTrigger from '@/components/ui/TabsTrigger.vue';
import TabsContent from '@/components/ui/TabsContent.vue';

const filter = ref<'all' | 'bangkok' | 'luangprabang'>('all');

const filteredDays = computed(() => {
  if (filter.value === 'all') return ITINERARY;
  return ITINERARY.filter((d) => d.city === filter.value);
});
</script>

<template>
  <div class="space-y-5">
    <header>
      <h1 class="text-2xl font-bold tracking-tight">七日行程</h1>
      <p class="text-sm text-muted-foreground mt-1">
        2026-12-01 ~ 12-07 · 2 天曼谷 · 4 天龍坡邦 · 1 天返程
      </p>
    </header>

    <Tabs v-model="filter">
      <TabsList>
        <TabsTrigger value="all">全部</TabsTrigger>
        <TabsTrigger value="bangkok">曼谷段</TabsTrigger>
        <TabsTrigger value="luangprabang">龍坡邦段</TabsTrigger>
      </TabsList>

      <TabsContent :value="filter">
        <ul class="space-y-3">
          <li v-for="day in filteredDays" :key="day.id">
            <DayCard :day="day" />
          </li>
        </ul>
      </TabsContent>
    </Tabs>
  </div>
</template>
