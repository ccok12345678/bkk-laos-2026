<script setup lang="ts">
import { VISA_INFO, TDAC_STEPS, LAOS_VOA_STEPS } from '@/data/visa';
import Card from '@/components/ui/Card.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import CardContent from '@/components/ui/CardContent.vue';
import Badge from '@/components/ui/Badge.vue';
import Alert from '@/components/ui/Alert.vue';
import PriceTag from '@/components/trip/PriceTag.vue';
import Button from '@/components/ui/Button.vue';
import { ExternalLink, Check } from 'lucide-vue-next';

const thailand = VISA_INFO.find((v) => v.country === 'thailand');
const laosOptions = VISA_INFO.filter((v) => v.country === 'laos');
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl font-bold tracking-tight">簽證</h1>
      <p class="text-sm text-muted-foreground mt-1">
        泰國免簽、寮國落地簽最推薦
      </p>
    </header>

    <Card v-if="thailand">
      <CardHeader>
        <div class="flex items-center gap-2">
          <Badge variant="bangkok">泰國</Badge>
          <Badge v-if="thailand.isRecommended" variant="success">推薦</Badge>
        </div>
        <CardTitle>{{ thailand.type }}</CardTitle>
        <p class="text-sm text-muted-foreground">停留：{{ thailand.duration }}</p>
      </CardHeader>
      <CardContent class="space-y-3">
        <ul class="space-y-1.5 text-sm">
          <li
            v-for="r in thailand.requirements"
            :key="r"
            class="flex gap-2 items-start"
          >
            <Check class="h-4 w-4 text-success mt-0.5 shrink-0" />
            <span>{{ r }}</span>
          </li>
        </ul>
        <ul v-if="thailand.notes.length" class="space-y-1 text-xs text-muted-foreground">
          <li v-for="n in thailand.notes" :key="n" class="flex gap-1.5">
            <span>·</span><span>{{ n }}</span>
          </li>
        </ul>
        <Button
          v-if="thailand.applicationUrl"
          as="a"
          variant="outline"
          size="sm"
          :href="thailand.applicationUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink class="h-4 w-4" />
          TDAC 官網
        </Button>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>TDAC 數位入境卡填寫步驟</CardTitle>
      </CardHeader>
      <CardContent>
        <ol class="space-y-2 text-sm list-decimal list-inside">
          <li v-for="s in TDAC_STEPS" :key="s">{{ s }}</li>
        </ol>
      </CardContent>
    </Card>

    <section>
      <h2 class="text-xl font-semibold mb-3">寮國簽證選項</h2>
      <div class="space-y-3">
        <Card
          v-for="l in laosOptions"
          :key="l.type"
          :class="l.isRecommended ? 'border-success/40 bg-success/5' : undefined"
        >
          <CardHeader>
            <div class="flex items-center gap-2">
              <Badge variant="luangprabang">寮國</Badge>
              <Badge v-if="l.isRecommended" variant="success">推薦</Badge>
            </div>
            <CardTitle>{{ l.type }}</CardTitle>
            <p class="text-sm text-muted-foreground">
              停留 {{ l.duration }}
              <span v-if="l.cost">
                · <PriceTag :price="l.cost" size="sm" class="inline" />
              </span>
            </p>
          </CardHeader>
          <CardContent class="space-y-3">
            <ul class="space-y-1.5 text-sm">
              <li
                v-for="r in l.requirements"
                :key="r"
                class="flex gap-2 items-start"
              >
                <Check class="h-4 w-4 text-success mt-0.5 shrink-0" />
                <span>{{ r }}</span>
              </li>
            </ul>
            <ul v-if="l.notes.length" class="space-y-1 text-xs text-muted-foreground">
              <li v-for="n in l.notes" :key="n" class="flex gap-1.5">
                <span>·</span><span>{{ n }}</span>
              </li>
            </ul>
            <Button
              v-if="l.applicationUrl"
              as="a"
              variant="outline"
              size="sm"
              :href="l.applicationUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink class="h-4 w-4" />
              官網
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>

    <Card>
      <CardHeader>
        <CardTitle>落地簽 VOA 流程</CardTitle>
      </CardHeader>
      <CardContent>
        <ol class="space-y-2 text-sm list-decimal list-inside">
          <li v-for="s in LAOS_VOA_STEPS" :key="s">{{ s }}</li>
        </ol>
      </CardContent>
    </Card>

    <Alert variant="warning">
      2026 年 2 月起泰國可能徵收 300 THB 入境費，出發前務必確認執行狀況。
    </Alert>
  </div>
</template>
