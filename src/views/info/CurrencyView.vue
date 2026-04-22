<script setup lang="ts">
import { EXCHANGE_RATES } from '@/data/exchange-rates';
import CurrencyConverter from '@/components/widgets/CurrencyConverter.vue';
import Card from '@/components/ui/Card.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import CardContent from '@/components/ui/CardContent.vue';
import Alert from '@/components/ui/Alert.vue';

const REFERENCE = [
  { pair: '1 THB', value: '≈ 0.98 TWD（幾乎 1:1）' },
  { pair: '1 USD', value: '≈ 32.5 TWD' },
  { pair: '1 USD', value: '≈ 21,700 LAK' },
  { pair: '1 TWD', value: '≈ 680–690 LAK（寮幣去掉後 3 個零 × 2 ≈ 台幣）' },
];

const STRATEGY = [
  '台灣先換 USD 100 / 50 小鈔（寮簽與抵達現金備用）',
  '抵曼谷市區 Super Rich 綠/橘、Vasu 換泰銖（機場匯率差）',
  '龍坡邦 Sisavangvong Rd. 多家換匯店，帶新版無折痕 USD 100 匯率最好',
  '寮國 ATM 單次最多 2,500,000 LAK（約 NT$3,500）且手續費高',
  '龍坡邦信用卡普及度低，街邊、市場、tuk-tuk、按摩只收現金',
];

const CASH_PLAN = [
  { label: '每人 USD 備額', value: 'USD 200–300' },
  { label: '每人 THB 備額', value: 'THB 5,000–8,000' },
  { label: '抵 LPQ 再換 LAK', value: '每人 LAK 2,000,000–3,000,000（約 NT$3,000–4,500）' },
];
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl font-bold tracking-tight">匯率與換匯</h1>
      <p class="text-sm text-muted-foreground mt-1">
        參考匯率更新於 {{ EXCHANGE_RATES.updatedAt }}
      </p>
    </header>

    <Card>
      <CardHeader>
        <CardTitle>參考匯率</CardTitle>
      </CardHeader>
      <CardContent>
        <dl class="space-y-1.5 text-sm">
          <div
            v-for="(r, i) in REFERENCE"
            :key="i"
            class="flex justify-between gap-3 py-1.5 border-b last:border-b-0 border-border/60"
          >
            <dt class="text-muted-foreground font-mono tabular-nums">{{ r.pair }}</dt>
            <dd class="text-right">{{ r.value }}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>

    <CurrencyConverter expanded />

    <Card>
      <CardHeader>
        <CardTitle>換匯策略</CardTitle>
      </CardHeader>
      <CardContent>
        <ol class="space-y-2 text-sm list-decimal list-inside">
          <li v-for="(s, i) in STRATEGY" :key="i">{{ s }}</li>
        </ol>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>4–5 人 / 7 天隨身現金建議</CardTitle>
      </CardHeader>
      <CardContent>
        <dl class="space-y-2 text-sm">
          <div
            v-for="(p, i) in CASH_PLAN"
            :key="i"
            class="flex flex-wrap justify-between gap-2 py-1.5 border-b last:border-b-0 border-border/60"
          >
            <dt class="text-muted-foreground">{{ p.label }}</dt>
            <dd class="text-right font-medium">{{ p.value }}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>

    <Alert variant="warning" title="寮國 ATM 警示">
      單次上限 2,500,000 LAK（約 NT$3,500）且手續費高，不建議作為主要提款管道。建議抵達前備妥 USD 小鈔於市區換匯。
    </Alert>
  </div>
</template>
