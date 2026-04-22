<script setup lang="ts">
import Card from '@/components/ui/Card.vue';
import {
  FileText,
  ArrowRightLeft,
  CloudSun,
  Sparkles,
  Smartphone,
  ShieldAlert,
  ClipboardCheck,
  ChevronRight,
} from 'lucide-vue-next';

const items = [
  {
    to: '/info/visa',
    icon: FileText,
    title: '簽證',
    desc: '泰國免簽 60 天 · 寮國落地簽 USD 41',
  },
  {
    to: '/info/currency',
    icon: ArrowRightLeft,
    title: '匯率與換匯',
    desc: 'THB/LAK/USD/TWD 參考與策略',
  },
  {
    to: '/info/weather',
    icon: CloudSun,
    title: '氣候與穿著',
    desc: '12 月初曼谷涼季、龍坡邦清晨 10–15°C',
  },
  {
    to: '/info/etiquette',
    icon: Sparkles,
    title: '文化禮儀',
    desc: '寺廟著裝 · 清晨布施 · 皇室尊嚴',
  },
  {
    to: '/info/sim',
    icon: Smartphone,
    title: 'SIM 卡',
    desc: 'AIS SIM2Fly / 原生卡 / eSIM 比較',
  },
  {
    to: '/info/safety',
    icon: ShieldAlert,
    title: '安全資訊',
    desc: '曼谷騙局 · 龍坡邦注意事項',
  },
  {
    to: '/info/checklist',
    icon: ClipboardCheck,
    title: '行前檢查清單',
    desc: '證件 · 訂票 · 行李 · App · 保險',
  },
];
</script>

<template>
  <div class="space-y-5">
    <header>
      <h1 class="text-2xl font-bold tracking-tight">實用資訊</h1>
      <p class="text-sm text-muted-foreground mt-1">
        出發前必讀的 7 大主題
      </p>
    </header>

    <div class="grid sm:grid-cols-2 gap-3">
      <router-link
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="block focus-visible:outline-none"
      >
        <Card interactive class="p-4 h-full flex gap-3 items-center">
          <div class="h-10 w-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <component :is="item.icon" class="h-5 w-5 text-foreground" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-semibold">{{ item.title }}</div>
            <p class="text-xs text-muted-foreground mt-0.5">{{ item.desc }}</p>
          </div>
          <ChevronRight class="h-5 w-5 text-muted-foreground shrink-0" />
        </Card>
      </router-link>
    </div>
  </div>
</template>
