<script setup lang="ts">
import { computed } from 'vue';
import type { Price } from '@/types';
import { useCurrency } from '@/composables/useCurrency';
import { cn } from '@/lib/utils';

interface Props {
  price: Price;
  size?: 'sm' | 'md' | 'lg';
  compact?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), { size: 'md', compact: false });

const { formatPrice, formatPriceCompact } = useCurrency();

const display = computed(() =>
  props.compact ? formatPriceCompact(props.price) : formatPrice(props.price),
);

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-xs';
    case 'lg':
      return 'text-base';
    default:
      return 'text-sm';
  }
});
</script>

<template>
  <span
    :class="
      cn(
        'inline-flex items-center font-medium tabular-nums text-foreground',
        sizeClass,
        props.class,
      )
    "
  >
    {{ display }}
  </span>
</template>
