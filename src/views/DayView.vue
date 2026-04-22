<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useTripDay } from '@/composables/useTripDay';
import TimelineItem from '@/components/trip/TimelineItem.vue';
import CityBadge from '@/components/trip/CityBadge.vue';
import PriceTag from '@/components/trip/PriceTag.vue';
import Alert from '@/components/ui/Alert.vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import CardContent from '@/components/ui/CardContent.vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

const props = defineProps<{ dayId: string }>();
const { dayId } = toRefs(props);

const { day, prevDay, nextDay } = useTripDay(dayId);
const router = useRouter();

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];
const dateLabel = computed(() => {
  if (!day.value) return '';
  const d = new Date(day.value.date);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} · 週${WEEKDAYS[d.getDay()]}`;
});
</script>

<template>
  <div v-if="day" class="space-y-6">
    <nav class="flex items-center gap-1 text-xs text-muted-foreground">
      <router-link to="/" class="hover:text-foreground">首頁</router-link>
      <ChevronRight class="h-3 w-3" />
      <router-link to="/itinerary" class="hover:text-foreground">行程</router-link>
      <ChevronRight class="h-3 w-3" />
      <span class="text-foreground">Day {{ day.dayNumber }}</span>
    </nav>

    <header>
      <div class="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <span class="tabular-nums">{{ dateLabel }}</span>
        <CityBadge :city="day.city" />
      </div>
      <h1 class="text-2xl font-bold tracking-tight">
        Day {{ day.dayNumber }} · {{ day.theme }}
      </h1>
      <p v-if="day.subtitle" class="text-sm text-muted-foreground mt-1">
        {{ day.subtitle }}
      </p>
    </header>

    <div class="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        :disabled="!prevDay"
        @click="prevDay && router.push(`/itinerary/day/${prevDay.id}`)"
        class="flex-1"
      >
        <ChevronLeft class="h-4 w-4" />
        {{ prevDay ? `Day ${prevDay.dayNumber}` : '無上一日' }}
      </Button>
      <Button
        variant="outline"
        size="sm"
        :disabled="!nextDay"
        @click="nextDay && router.push(`/itinerary/day/${nextDay.id}`)"
        class="flex-1"
      >
        {{ nextDay ? `Day ${nextDay.dayNumber}` : '無下一日' }}
        <ChevronRight class="h-4 w-4" />
      </Button>
    </div>

    <section>
      <h2 class="sr-only">行程時間軸</h2>
      <div>
        <TimelineItem
          v-for="(item, i) in day.items"
          :key="item.time + item.title"
          :item="item"
          :is-last="i === day.items.length - 1"
        />
      </div>
    </section>

    <Alert v-if="day.tips && day.tips.length" variant="info" title="當日小提醒">
      <ul class="space-y-1 list-disc list-inside">
        <li v-for="tip in day.tips" :key="tip">{{ tip }}</li>
      </ul>
    </Alert>

    <Card v-if="day.dailyBudget">
      <CardHeader>
        <CardTitle>當日預算（不含機票）</CardTitle>
      </CardHeader>
      <CardContent>
        <PriceTag :price="day.dailyBudget" size="lg" />
        <p class="text-xs text-muted-foreground mt-2">
          以中價位每人估算，實際依人數與選擇變動。
        </p>
      </CardContent>
    </Card>
  </div>
  <div v-else class="py-12 text-center text-muted-foreground">找不到此行程。</div>
</template>
