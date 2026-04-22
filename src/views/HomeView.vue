<script setup lang="ts">
import { ref, computed } from 'vue';
import CountdownBanner from '@/components/trip/CountdownBanner.vue';
import QuickAccessGrid from '@/components/widgets/QuickAccessGrid.vue';
import CurrencyConverter from '@/components/widgets/CurrencyConverter.vue';
import Alert from '@/components/ui/Alert.vue';
import Card from '@/components/ui/Card.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import CardContent from '@/components/ui/CardContent.vue';
import Button from '@/components/ui/Button.vue';
import Dialog from '@/components/ui/Dialog.vue';
import EmergencyContactList from '@/components/widgets/EmergencyContactList.vue';
import { useCountdown } from '@/composables/useCountdown';
import { ITINERARY } from '@/data/itinerary';
import { ArrowRight } from 'lucide-vue-next';

const emergencyOpen = ref(false);

const { tripStatus, currentTripDay } = useCountdown();

const todayDay = computed(() => {
  if (tripStatus.value !== 'during' || currentTripDay.value == null) return null;
  return ITINERARY[currentTripDay.value - 1] ?? null;
});

const todayPreview = computed(() => todayDay.value?.items.slice(0, 3) ?? []);
</script>

<template>
  <div class="space-y-6 md:space-y-8">
    <section>
      <h1 class="sr-only">東南亞七日 · 總覽</h1>
      <CountdownBanner />
    </section>

    <Card v-if="todayDay">
      <CardHeader>
        <CardTitle>今日行程 · Day {{ todayDay.dayNumber }}</CardTitle>
        <p class="text-xs text-muted-foreground">{{ todayDay.theme }}</p>
      </CardHeader>
      <CardContent class="space-y-3">
        <ul class="space-y-2">
          <li
            v-for="item in todayPreview"
            :key="item.time + item.title"
            class="flex gap-3 text-sm"
          >
            <span class="font-mono tabular-nums text-xs text-muted-foreground shrink-0 w-[88px]">
              {{ item.time.split('–')[0] }}
            </span>
            <span class="truncate">{{ item.title }}</span>
          </li>
        </ul>
        <Button
          as="router-link"
          variant="outline"
          size="sm"
          :to="`/itinerary/day/${todayDay.id}`"
          class="w-full"
        >
          查看完整行程
          <ArrowRight class="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>

    <section>
      <h2 class="text-xl font-semibold tracking-tight mb-3">快速入口</h2>
      <QuickAccessGrid @emergency="emergencyOpen = true" />
    </section>

    <section>
      <h2 class="text-xl font-semibold tracking-tight mb-3">匯率換算</h2>
      <CurrencyConverter />
    </section>

    <Alert variant="warning" title="12 月初天氣提醒">
      龍坡邦清晨 10–15°C，記得帶薄外套；曼谷涼季 22–33°C，UV 仍強需防曬。
    </Alert>

    <Dialog
      v-model:open="emergencyOpen"
      title="緊急聯絡"
      description="點擊號碼可直接撥打"
    >
      <EmergencyContactList />
    </Dialog>
  </div>
</template>
