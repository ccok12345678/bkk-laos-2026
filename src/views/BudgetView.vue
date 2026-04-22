<script setup lang="ts">
import {
  BUDGET_TIERS,
  BUDGET_TIER_LABELS,
  BUDGET_TIER_DESCRIPTIONS,
  BUDGET_TOTALS,
} from '@/data/budget';
import BudgetCalculator from '@/components/widgets/BudgetCalculator.vue';
import Card from '@/components/ui/Card.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import CardContent from '@/components/ui/CardContent.vue';
import Alert from '@/components/ui/Alert.vue';

function fmt(n: number) {
  return n.toLocaleString('en-US');
}
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl font-bold tracking-tight">預算</h1>
      <p class="text-sm text-muted-foreground mt-1">
        三檔次每人 7 天含機票估算
      </p>
    </header>

    <Card>
      <CardHeader>
        <CardTitle>三檔次比較</CardTitle>
      </CardHeader>
      <CardContent class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-xs text-muted-foreground">
              <th class="text-left font-medium py-2">項目</th>
              <th class="text-right font-medium py-2 px-2">節約</th>
              <th class="text-right font-medium py-2 px-2 bg-luangprabang-subtle rounded-t">
                中價位
              </th>
              <th class="text-right font-medium py-2 px-2">舒適</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in BUDGET_TIERS"
              :key="row.category"
              class="border-t border-border"
            >
              <td class="py-2 text-muted-foreground">{{ row.category }}</td>
              <td class="text-right py-2 px-2 tabular-nums">{{ fmt(row.frugal) }}</td>
              <td class="text-right py-2 px-2 tabular-nums font-semibold bg-luangprabang-subtle/60">
                {{ fmt(row.mid) }}
              </td>
              <td class="text-right py-2 px-2 tabular-nums">{{ fmt(row.comfort) }}</td>
            </tr>
            <tr class="border-t border-border font-bold">
              <td class="py-3">每人合計 (TWD)</td>
              <td class="text-right py-3 px-2 tabular-nums">{{ fmt(BUDGET_TOTALS.frugal) }}</td>
              <td class="text-right py-3 px-2 tabular-nums bg-luangprabang-subtle/60">
                {{ fmt(BUDGET_TOTALS.mid) }}
              </td>
              <td class="text-right py-3 px-2 tabular-nums">{{ fmt(BUDGET_TOTALS.comfort) }}</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>

    <section class="grid md:grid-cols-3 gap-3">
      <Card
        v-for="key in ['frugal', 'mid', 'comfort'] as const"
        :key="key"
        :class="key === 'mid' ? 'border-luangprabang/40' : undefined"
      >
        <CardHeader>
          <CardTitle class="text-sm">{{ BUDGET_TIER_LABELS[key] }}</CardTitle>
          <p class="text-xs text-muted-foreground">
            {{ BUDGET_TIER_DESCRIPTIONS[key] }}
          </p>
        </CardHeader>
      </Card>
    </section>

    <BudgetCalculator />

    <Alert variant="info">
      4–5 人同行可再分攤包車與住宿成本，中價位可壓到約 NT$40,000/人。
    </Alert>
  </div>
</template>
