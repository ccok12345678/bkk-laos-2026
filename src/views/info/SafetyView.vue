<script setup lang="ts">
import Card from '@/components/ui/Card.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import CardContent from '@/components/ui/CardContent.vue';
import Alert from '@/components/ui/Alert.vue';
import EmergencyContactList from '@/components/widgets/EmergencyContactList.vue';
import { AlertTriangle } from 'lucide-vue-next';

const BANGKOK_SCAMS = [
  {
    title: '「大皇宮今日關門」騙局',
    detail:
      '陌生人告知「今日關門」並推銷一日遊——直接走官方售票口即可，此類搭訕一律忽略。',
  },
  {
    title: '寶石店低價包車高壓推銷',
    detail:
      '嘟嘟車或計程車司機帶往寶石店抽佣，面對推銷直接離開現場。',
  },
  {
    title: '嘟嘟車喊價 2–3 倍',
    detail: '一律用 Grab / Bolt，跳錶計費且有電子憑證。',
  },
];

const LPQ_SAFETY = [
  '夜間道路無街燈，建議備手電筒或手機照明',
  '光西瀑布岩石極滑，務必穿防滑鞋',
  '12 月初無煙霾，空氣品質佳',
  '寮國為全球單位面積未爆彈最多國家，不偏離既定步道（古城與光西安全）',
  '禁止空拍機，海關會沒收',
];

const GENERAL = [
  '自來水絕不生飲，刷牙用瓶裝水',
  '街邊小吃選現煮熱食',
  '強烈建議購買「海外醫療 300 萬 + 緊急救援」旅平險（7 天約 NT$500–1,500/人）',
  '寮國重大傷病需後送曼谷或清邁醫院',
  '隨身備護照影本與保險卡影本，與正本分開放',
];
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl font-bold tracking-tight">安全資訊</h1>
      <p class="text-sm text-muted-foreground mt-1">
        緊急聯絡 · 在地騙局 · 醫療與保險
      </p>
    </header>

    <Card>
      <CardHeader>
        <CardTitle>緊急聯絡電話</CardTitle>
      </CardHeader>
      <CardContent>
        <EmergencyContactList />
      </CardContent>
    </Card>

    <Alert variant="warning" title="曼谷三大騙局" :hide-icon="false">
      <ul class="space-y-2.5 mt-1">
        <li v-for="s in BANGKOK_SCAMS" :key="s.title">
          <div class="font-semibold text-sm">{{ s.title }}</div>
          <div class="text-xs text-muted-foreground mt-0.5">{{ s.detail }}</div>
        </li>
      </ul>
    </Alert>

    <Card>
      <CardHeader>
        <div class="flex items-center gap-2">
          <AlertTriangle class="h-5 w-5 text-warning" />
          <CardTitle>龍坡邦注意事項</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul class="space-y-1.5 text-sm">
          <li v-for="s in LPQ_SAFETY" :key="s" class="flex gap-2 items-start">
            <span class="text-warning">·</span>
            <span>{{ s }}</span>
          </li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>通用安全提醒</CardTitle>
      </CardHeader>
      <CardContent>
        <ul class="space-y-1.5 text-sm">
          <li v-for="s in GENERAL" :key="s" class="flex gap-2 items-start">
            <span class="text-info">·</span>
            <span>{{ s }}</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  </div>
</template>
