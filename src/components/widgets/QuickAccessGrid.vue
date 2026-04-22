<script setup lang="ts">
import { computed } from 'vue';
import {
  Plane,
  BedDouble,
  ArrowRightLeft,
  Phone,
  Sparkles,
  ClipboardCheck,
} from 'lucide-vue-next';
import Card from '@/components/ui/Card.vue';
import { useChecklist } from '@/composables/useChecklist';

const emit = defineEmits<{ emergency: [] }>();

const { progress } = useChecklist();

const items = computed(() => [
  { label: '航班資訊', icon: Plane, to: '/travel/flights', color: 'text-bangkok' },
  { label: '住宿', icon: BedDouble, to: '/travel/hotels', color: 'text-luangprabang' },
  {
    label: '匯率換算',
    icon: ArrowRightLeft,
    to: '/info/currency',
    color: 'text-info',
  },
  {
    label: '緊急聯絡',
    icon: Phone,
    action: 'emergency' as const,
    color: 'text-destructive',
  },
  {
    label: '文化禮儀',
    icon: Sparkles,
    to: '/info/etiquette',
    color: 'text-warning',
  },
  {
    label: `檢查清單 ${progress.value.percentage}%`,
    icon: ClipboardCheck,
    to: '/info/checklist',
    color: 'text-success',
  },
]);
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
    <template v-for="(item, i) in items" :key="i">
      <component
        :is="item.to ? 'router-link' : 'button'"
        v-bind="item.to ? { to: item.to } : { type: 'button', onClick: () => emit('emergency') }"
        class="block focus-visible:outline-none"
      >
        <Card
          interactive
          class="p-4 flex flex-col items-center gap-2 text-center h-full focus-within:ring-2 focus-within:ring-ring"
        >
          <component :is="item.icon" :class="['h-6 w-6', item.color]" />
          <span class="text-xs font-medium leading-tight">{{ item.label }}</span>
        </Card>
      </component>
    </template>
  </div>
</template>
