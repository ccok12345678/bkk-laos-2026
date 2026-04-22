<script setup lang="ts">
import { computed } from 'vue';
import { FLIGHTS, RECOMMENDED_COMBO } from '@/data/flights';
import type { FlightSegment } from '@/types';
import Card from '@/components/ui/Card.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import CardDescription from '@/components/ui/CardDescription.vue';
import CardContent from '@/components/ui/CardContent.vue';
import Badge from '@/components/ui/Badge.vue';
import Alert from '@/components/ui/Alert.vue';
import Accordion from '@/components/ui/Accordion.vue';
import AccordionItem from '@/components/ui/AccordionItem.vue';
import AccordionTrigger from '@/components/ui/AccordionTrigger.vue';
import AccordionContent from '@/components/ui/AccordionContent.vue';
import PriceTag from '@/components/trip/PriceTag.vue';
import { Check, X } from 'lucide-vue-next';

const SEGMENT_TITLES: Record<FlightSegment, string> = {
  'tpe-bkk': '台北 TPE → 曼谷 BKK',
  'bkk-lpq': '曼谷 BKK → 龍坡邦 LPQ',
  'lpq-tpe': '龍坡邦 LPQ → 台北 TPE（回程聯程）',
};

const bySegment = computed(() => ({
  'tpe-bkk': FLIGHTS.filter((f) => f.segment === 'tpe-bkk'),
  'bkk-lpq': FLIGHTS.filter((f) => f.segment === 'bkk-lpq'),
  'lpq-tpe': FLIGHTS.filter((f) => f.segment === 'lpq-tpe'),
}));
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl font-bold tracking-tight">航班資訊</h1>
      <p class="text-sm text-muted-foreground mt-1">
        三段航線、首推組合、廉航與備案比較
      </p>
    </header>

    <Card class="border-bangkok/40 bg-bangkok-subtle/50">
      <CardHeader>
        <div class="flex items-center gap-2">
          <Badge variant="bangkok">首推</Badge>
          <CardTitle>{{ RECOMMENDED_COMBO.name }}</CardTitle>
        </div>
        <CardDescription>{{ RECOMMENDED_COMBO.description }}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul class="space-y-1.5 text-sm">
          <li
            v-for="h in RECOMMENDED_COMBO.highlights"
            :key="h"
            class="flex gap-2 items-start"
          >
            <Check class="h-4 w-4 text-success mt-0.5 shrink-0" />
            <span>{{ h }}</span>
          </li>
        </ul>
      </CardContent>
    </Card>

    <Accordion
      type="multiple"
      :model-value="['tpe-bkk', 'bkk-lpq', 'lpq-tpe']"
    >
      <AccordionItem
        v-for="(flights, segment) in bySegment"
        :key="segment"
        :value="segment"
      >
        <AccordionTrigger>
          <div class="flex items-center gap-2">
            <span class="text-base font-semibold">{{ SEGMENT_TITLES[segment] }}</span>
            <Badge variant="secondary">{{ flights.length }} 選項</Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div class="space-y-3">
            <Card
              v-for="f in flights"
              :key="f.id"
              :class="f.isRecommended && 'border-success/50 bg-success/5'"
              class="p-4"
            >
              <div class="flex items-start justify-between gap-3 flex-wrap">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <h3 class="text-sm font-semibold">{{ f.airline }}</h3>
                    <Badge v-if="f.isRecommended" variant="success">推薦</Badge>
                    <Badge v-if="f.flightNumber" variant="outline">
                      {{ f.flightNumber }}
                    </Badge>
                  </div>
                  <div
                    v-if="f.departure.time || f.arrival.time"
                    class="text-sm font-mono tabular-nums text-muted-foreground mt-1"
                  >
                    {{ f.departure.airport }}
                    <span v-if="f.departure.time"> {{ f.departure.time }}</span>
                    →
                    {{ f.arrival.airport }}
                    <span v-if="f.arrival.time"> {{ f.arrival.time }}</span>
                  </div>
                  <div class="text-xs text-muted-foreground mt-1">
                    {{ f.departure.airportName }} → {{ f.arrival.airportName }}
                    · {{ f.duration }}
                  </div>
                </div>
                <PriceTag :price="f.priceRange" size="sm" />
              </div>
              <div class="mt-3 flex items-center gap-3 text-xs">
                <span class="flex items-center gap-1" :class="f.includesMeal ? 'text-success' : 'text-muted-foreground'">
                  <Check v-if="f.includesMeal" class="h-3.5 w-3.5" />
                  <X v-else class="h-3.5 w-3.5" />
                  含餐
                </span>
                <span class="flex items-center gap-1" :class="f.includesBaggage ? 'text-success' : 'text-muted-foreground'">
                  <Check v-if="f.includesBaggage" class="h-3.5 w-3.5" />
                  <X v-else class="h-3.5 w-3.5" />
                  行李
                  <span v-if="f.baggageAllowance">{{ f.baggageAllowance }}</span>
                </span>
              </div>
              <ul v-if="f.notes && f.notes.length" class="mt-2 space-y-0.5 text-xs text-muted-foreground">
                <li v-for="n in f.notes" :key="n" class="flex gap-1.5">
                  <span>·</span><span>{{ n }}</span>
                </li>
              </ul>
              <Alert v-if="f.warning" variant="warning" class="mt-3">
                {{ f.warning }}
              </Alert>
            </Card>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <Alert variant="info" title="訂票步驟建議">
      Skyscanner / Google Flights 先比價 → 找到組合後回航空公司官網直接訂（客服、改退保障最佳）。
    </Alert>
  </div>
</template>
