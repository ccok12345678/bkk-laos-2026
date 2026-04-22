<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { CurrencyCode } from '@/types';
import { toTwd, EXCHANGE_RATES } from '@/data/exchange-rates';
import { ArrowRightLeft } from 'lucide-vue-next';
import Input from '@/components/ui/Input.vue';
import Select from '@/components/ui/Select.vue';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';

interface Props {
  expanded?: boolean;
}

withDefaults(defineProps<Props>(), { expanded: false });

const amount = ref<string>('100');
const from = ref<CurrencyCode>('TWD');
const to = ref<CurrencyCode>('THB');

const CURRENCY_OPTIONS: Array<{ value: CurrencyCode; label: string }> = [
  { value: 'TWD', label: '台幣 TWD' },
  { value: 'THB', label: '泰銖 THB' },
  { value: 'USD', label: '美元 USD' },
  { value: 'LAK', label: '寮幣 LAK' },
];

function convert(amount: number, from: CurrencyCode, to: CurrencyCode): number {
  if (from === to) return amount;
  const asTwd = toTwd(amount, from);
  if (to === 'TWD') return asTwd;
  if (to === 'THB') return asTwd / EXCHANGE_RATES.THB_TO_TWD;
  if (to === 'USD') return asTwd / EXCHANGE_RATES.USD_TO_TWD;
  if (to === 'LAK') return asTwd / EXCHANGE_RATES.LAK_TO_TWD;
  return 0;
}

const result = computed(() => {
  const n = parseFloat(amount.value);
  if (isNaN(n)) return '—';
  const r = convert(n, from.value, to.value);
  if (to.value === 'LAK') return Math.round(r).toLocaleString('en-US');
  if (Math.abs(r) >= 100) return Math.round(r).toLocaleString('en-US');
  return (Math.round(r * 100) / 100).toLocaleString('en-US');
});

function swap() {
  const temp = from.value;
  from.value = to.value;
  to.value = temp;
}

// Prevent selecting same currency on both sides
watch(from, (v) => {
  if (v === to.value) {
    to.value = CURRENCY_OPTIONS.find((o) => o.value !== v)!.value;
  }
});
watch(to, (v) => {
  if (v === from.value) {
    from.value = CURRENCY_OPTIONS.find((o) => o.value !== v)!.value;
  }
});
</script>

<template>
  <Card class="p-4">
    <div class="flex items-center gap-2 mb-3">
      <ArrowRightLeft class="h-4 w-4 text-muted-foreground" />
      <h3 class="text-sm font-semibold">匯率換算</h3>
    </div>
    <div class="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
      <div class="space-y-1.5">
        <label class="text-xs text-muted-foreground">從</label>
        <Select v-model="from" :options="CURRENCY_OPTIONS" />
        <Input
          v-model="amount"
          type="number"
          inputmode="decimal"
          class="tabular-nums"
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        @click="swap"
        class="mb-[22px]"
        aria-label="交換幣別"
      >
        <ArrowRightLeft class="h-4 w-4" />
      </Button>
      <div class="space-y-1.5">
        <label class="text-xs text-muted-foreground">至</label>
        <Select v-model="to" :options="CURRENCY_OPTIONS" />
        <div
          class="flex h-10 items-center rounded-md border border-input bg-muted px-3 text-sm font-semibold tabular-nums"
        >
          {{ result }}
        </div>
      </div>
    </div>
    <p class="text-[11px] text-muted-foreground mt-3">
      參考匯率更新於 {{ EXCHANGE_RATES.updatedAt }}
    </p>
  </Card>
</template>
