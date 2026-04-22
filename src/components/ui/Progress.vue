<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

interface Props {
  value?: number;
  max?: number;
  variant?: 'default' | 'bangkok' | 'luangprabang' | 'success';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  max: 100,
  variant: 'default',
});

const percentage = computed(() =>
  Math.min(100, Math.max(0, (props.value / props.max) * 100)),
);

const fillClass = computed(() => {
  switch (props.variant) {
    case 'bangkok':
      return 'bg-bangkok';
    case 'luangprabang':
      return 'bg-luangprabang';
    case 'success':
      return 'bg-success';
    default:
      return 'bg-primary';
  }
});
</script>

<template>
  <div
    :class="
      cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-secondary',
        props.class,
      )
    "
    role="progressbar"
    :aria-valuenow="value"
    :aria-valuemin="0"
    :aria-valuemax="max"
  >
    <div
      :class="cn('h-full transition-all duration-300', fillClass)"
      :style="{ width: percentage + '%' }"
    />
  </div>
</template>
