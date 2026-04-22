<script setup lang="ts">
import { computed } from 'vue';
import { usePreferencesStore } from '@/stores/preferences';
import {
  BUDGET_TIERS,
  BUDGET_TIER_LABELS,
  BUDGET_TIER_DESCRIPTIONS,
  BUDGET_TOTALS,
} from '@/data/budget';
import type { BudgetTier } from '@/types';
import Card from '@/components/ui/Card.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import CardContent from '@/components/ui/CardContent.vue';
import Slider from '@/components/ui/Slider.vue';
import Select from '@/components/ui/Select.vue';
import Progress from '@/components/ui/Progress.vue';
import Label from '@/components/ui/Label.vue';

const prefs = usePreferencesStore();

const TIER_OPTIONS: Array<{ value: BudgetTier; label: string }> = [
  { value: 'frugal', label: BUDGET_TIER_LABELS.frugal },
  { value: 'mid', label: BUDGET_TIER_LABELS.mid },
  { value: 'comfort', label: BUDGET_TIER_LABELS.comfort },
];

const perPersonTotal = computed(() => BUDGET_TOTALS[prefs.budgetTier]);
const groupTotal = computed(() => perPersonTotal.value * prefs.peopleCount);

const breakdown = computed(() =>
  BUDGET_TIERS.map((row) => ({
    category: row.category,
    amount: row[prefs.budgetTier],
    pct: Math.round((row[prefs.budgetTier] / perPersonTotal.value) * 100),
    note: row.note,
  })),
);

function fmt(n: number) {
  return n.toLocaleString('en-US');
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>互動試算</CardTitle>
    </CardHeader>
    <CardContent class="space-y-5">
      <div class="space-y-2">
        <Label for="people-count">人數：<span class="font-mono tabular-nums">{{ prefs.peopleCount }}</span> 人</Label>
        <Slider
          id="people-count"
          v-model="prefs.peopleCount"
          :min="2"
          :max="5"
          :step="1"
          variant="luangprabang"
        />
      </div>
      <div class="space-y-2">
        <Label for="tier">預算檔次</Label>
        <Select id="tier" v-model="prefs.budgetTier" :options="TIER_OPTIONS" />
        <p class="text-xs text-muted-foreground">
          {{ BUDGET_TIER_DESCRIPTIONS[prefs.budgetTier] }}
        </p>
      </div>

      <div class="grid grid-cols-2 gap-3 rounded-lg bg-muted p-4">
        <div>
          <div class="text-xs text-muted-foreground">每人合計</div>
          <div class="text-xl font-bold tabular-nums mt-0.5">
            NT$ {{ fmt(perPersonTotal) }}
          </div>
        </div>
        <div>
          <div class="text-xs text-muted-foreground">
            {{ prefs.peopleCount }} 人總計
          </div>
          <div class="text-xl font-bold tabular-nums mt-0.5">
            NT$ {{ fmt(groupTotal) }}
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <h4 class="text-sm font-semibold">分類占比（每人）</h4>
        <ul class="space-y-2">
          <li v-for="row in breakdown" :key="row.category">
            <div class="flex items-center justify-between text-xs mb-1">
              <span class="text-muted-foreground">{{ row.category }}</span>
              <span class="font-mono tabular-nums">
                NT$ {{ fmt(row.amount) }} · {{ row.pct }}%
              </span>
            </div>
            <Progress :value="row.pct" variant="luangprabang" />
          </li>
        </ul>
      </div>
    </CardContent>
  </Card>
</template>
