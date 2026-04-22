<script setup lang="ts">
import { WEATHER_INFO, WEATHER_SUMMARY } from '@/data/weather';
import Card from '@/components/ui/Card.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import CardContent from '@/components/ui/CardContent.vue';
import Alert from '@/components/ui/Alert.vue';
import Badge from '@/components/ui/Badge.vue';
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl font-bold tracking-tight">氣候與穿著</h1>
      <p class="text-sm text-muted-foreground mt-1">
        {{ WEATHER_SUMMARY }}
      </p>
    </header>

    <div class="grid md:grid-cols-2 gap-4">
      <Card v-for="w in WEATHER_INFO" :key="w.city">
        <CardHeader>
          <div class="flex items-center gap-2">
            <Badge :variant="w.city">{{ w.name }}</Badge>
          </div>
          <CardTitle>{{ w.month }}</CardTitle>
        </CardHeader>
        <CardContent class="space-y-3">
          <dl class="grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt class="text-xs text-muted-foreground uppercase tracking-widest">白天</dt>
              <dd class="font-semibold text-base tabular-nums mt-0.5">
                {{ w.daytime }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-muted-foreground uppercase tracking-widest">夜晚</dt>
              <dd class="font-semibold text-base tabular-nums mt-0.5">
                {{ w.nighttime }}
              </dd>
            </div>
          </dl>
          <div>
            <h3 class="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
              注意
            </h3>
            <ul class="text-sm space-y-1">
              <li v-for="n in w.notes" :key="n" class="flex gap-2 items-start">
                <span class="text-warning">·</span>
                <span>{{ n }}</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
              穿著建議
            </h3>
            <ul class="text-sm space-y-1">
              <li v-for="p in w.packing" :key="p" class="flex gap-2 items-start">
                <span class="text-success">·</span>
                <span>{{ p }}</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>

    <Alert variant="warning" title="最關鍵提醒">
      龍坡邦清晨布施（05:30）與日出時段約 10–12°C，務必備薄羽絨或刷毛外套；光西瀑布岩石極滑，防滑鞋必備。
    </Alert>
  </div>
</template>
