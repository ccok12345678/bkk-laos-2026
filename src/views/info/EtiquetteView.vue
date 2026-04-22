<script setup lang="ts">
import { computed } from 'vue';
import { ETIQUETTE_RULES } from '@/data/etiquette';
import Alert from '@/components/ui/Alert.vue';
import Card from '@/components/ui/Card.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import CardContent from '@/components/ui/CardContent.vue';
import Badge from '@/components/ui/Badge.vue';
import { Check, X } from 'lucide-vue-next';

const CATEGORY_LABELS = {
  'temple-dress': '寺廟著裝',
  'alms-giving': '清晨布施',
  'thai-royal': '泰國皇室',
  general: '一般禮儀',
} as const;

const critical = computed(() =>
  ETIQUETTE_RULES.filter((r) => r.severity === 'critical'),
);
const important = computed(() =>
  ETIQUETTE_RULES.filter((r) => r.severity === 'important'),
);
const tips = computed(() =>
  ETIQUETTE_RULES.filter((r) => r.severity === 'tip'),
);
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl font-bold tracking-tight">文化禮儀</h1>
      <p class="text-sm text-muted-foreground mt-1">
        最重要的三件事：寺廟著裝、清晨布施、泰國皇室尊嚴
      </p>
    </header>

    <Alert variant="destructive" title="在進行以下行程前務必熟讀">
      違反禮儀可能導致被拒入、罰款甚至觸犯法律（泰國皇室尊嚴可判 3–15 年）。
    </Alert>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold tracking-tight">⚠️ 關鍵守則</h2>
      <Card v-for="rule in critical" :key="rule.id" class="border-destructive/40">
        <CardHeader>
          <div class="flex items-center gap-2 flex-wrap">
            <Badge variant="destructive">關鍵</Badge>
            <Badge variant="outline">{{ CATEGORY_LABELS[rule.category] }}</Badge>
          </div>
          <CardTitle>{{ rule.title }}</CardTitle>
          <p class="text-sm text-muted-foreground">{{ rule.description }}</p>
        </CardHeader>
        <CardContent>
          <div class="grid sm:grid-cols-2 gap-4">
            <div v-if="rule.dos">
              <h4 class="text-xs font-semibold text-success uppercase tracking-widest mb-2">
                應做 ✓
              </h4>
              <ul class="space-y-1.5 text-sm">
                <li v-for="d in rule.dos" :key="d" class="flex gap-2 items-start">
                  <Check class="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span>{{ d }}</span>
                </li>
              </ul>
            </div>
            <div v-if="rule.donts">
              <h4 class="text-xs font-semibold text-destructive uppercase tracking-widest mb-2">
                避免 ✗
              </h4>
              <ul class="space-y-1.5 text-sm">
                <li v-for="d in rule.donts" :key="d" class="flex gap-2 items-start">
                  <X class="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                  <span>{{ d }}</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>

    <section v-if="important.length" class="space-y-4">
      <h2 class="text-xl font-semibold tracking-tight">重要禮儀</h2>
      <Card v-for="rule in important" :key="rule.id">
        <CardHeader>
          <Badge variant="warning">重要</Badge>
          <CardTitle>{{ rule.title }}</CardTitle>
          <p class="text-sm text-muted-foreground">{{ rule.description }}</p>
        </CardHeader>
        <CardContent>
          <div class="grid sm:grid-cols-2 gap-4">
            <div v-if="rule.dos">
              <ul class="space-y-1.5 text-sm">
                <li v-for="d in rule.dos" :key="d" class="flex gap-2 items-start">
                  <Check class="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span>{{ d }}</span>
                </li>
              </ul>
            </div>
            <div v-if="rule.donts">
              <ul class="space-y-1.5 text-sm">
                <li v-for="d in rule.donts" :key="d" class="flex gap-2 items-start">
                  <X class="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                  <span>{{ d }}</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>

    <section v-if="tips.length" class="space-y-4">
      <h2 class="text-xl font-semibold tracking-tight">補充提醒</h2>
      <Card v-for="rule in tips" :key="rule.id">
        <CardHeader>
          <Badge variant="info">提示</Badge>
          <CardTitle>{{ rule.title }}</CardTitle>
          <p class="text-sm text-muted-foreground">{{ rule.description }}</p>
        </CardHeader>
        <CardContent>
          <ul class="space-y-1.5 text-sm">
            <li v-for="d in rule.dos ?? []" :key="d" class="flex gap-2 items-start">
              <span class="text-info">·</span>
              <span>{{ d }}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  </div>
</template>
