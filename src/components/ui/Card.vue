<script setup lang="ts">
import { cn } from '@/lib/utils';

interface Props {
  class?: string;
  interactive?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    :class="
      cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        interactive &&
          'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
