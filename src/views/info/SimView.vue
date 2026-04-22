<script setup lang="ts">
import { SIM_OPTIONS, SIM_RECOMMENDATION } from '@/data/sim';
import Card from '@/components/ui/Card.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import CardContent from '@/components/ui/CardContent.vue';
import Badge from '@/components/ui/Badge.vue';
import Alert from '@/components/ui/Alert.vue';
import PriceTag from '@/components/trip/PriceTag.vue';
import Button from '@/components/ui/Button.vue';
import { Check, X, ExternalLink } from 'lucide-vue-next';

const TYPE_LABEL = {
  physical: '實體卡',
  esim: 'eSIM',
  regional: '區域漫遊',
} as const;
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl font-bold tracking-tight">通訊 SIM 卡</h1>
      <p class="text-sm text-muted-foreground mt-1">
        4 種選項比較 · 跨境方案 vs. 原生卡
      </p>
    </header>

    <Alert variant="info" title="推薦決策">
      {{ SIM_RECOMMENDATION }}
    </Alert>

    <div class="space-y-3">
      <Card
        v-for="sim in SIM_OPTIONS"
        :key="sim.id"
        :class="sim.isRecommended ? 'border-success/40 bg-success/5' : undefined"
      >
        <CardHeader>
          <div class="flex items-center gap-2 flex-wrap">
            <Badge variant="outline">{{ TYPE_LABEL[sim.type] }}</Badge>
            <Badge v-if="sim.isRecommended" variant="success">推薦</Badge>
          </div>
          <CardTitle>{{ sim.name }}</CardTitle>
          <p class="text-xs text-muted-foreground">
            {{ sim.coverage.join(' · ') }}
          </p>
        </CardHeader>
        <CardContent class="space-y-3">
          <dl class="grid grid-cols-3 gap-3 text-xs">
            <div>
              <dt class="text-muted-foreground uppercase tracking-widest">時長</dt>
              <dd class="font-medium mt-0.5">{{ sim.duration }}</dd>
            </div>
            <div>
              <dt class="text-muted-foreground uppercase tracking-widest">流量</dt>
              <dd class="font-medium mt-0.5">{{ sim.data }}</dd>
            </div>
            <div>
              <dt class="text-muted-foreground uppercase tracking-widest">價格</dt>
              <dd class="font-medium mt-0.5">
                <PriceTag :price="sim.price" size="sm" />
              </dd>
            </div>
          </dl>
          <div class="grid sm:grid-cols-2 gap-3">
            <div>
              <h4 class="text-xs font-semibold text-success uppercase tracking-widest mb-1">
                優點
              </h4>
              <ul class="space-y-1 text-sm">
                <li v-for="p in sim.pros" :key="p" class="flex gap-2 items-start">
                  <Check class="h-3.5 w-3.5 text-success mt-1 shrink-0" />
                  <span>{{ p }}</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="text-xs font-semibold text-destructive uppercase tracking-widest mb-1">
                限制
              </h4>
              <ul class="space-y-1 text-sm">
                <li v-for="c in sim.cons" :key="c" class="flex gap-2 items-start">
                  <X class="h-3.5 w-3.5 text-destructive mt-1 shrink-0" />
                  <span>{{ c }}</span>
                </li>
              </ul>
            </div>
          </div>
          <Button
            v-if="sim.purchaseUrl"
            as="a"
            variant="outline"
            size="sm"
            :href="sim.purchaseUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink class="h-4 w-4" />
            購買連結
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
