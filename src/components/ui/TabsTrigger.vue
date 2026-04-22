<script setup lang="ts">
import { inject, computed, type Ref } from 'vue';
import { cn } from '@/lib/utils';

interface Props {
  value: string;
  class?: string;
}

const props = defineProps<Props>();

const ctx = inject<{ value: Ref<string>; set: (v: string) => void }>(
  'tabs-context',
);

const active = computed(() => ctx?.value.value === props.value);
</script>

<template>
  <button
    type="button"
    role="tab"
    :aria-selected="active"
    @click="ctx?.set(value)"
    :class="
      cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        active
          ? 'bg-background text-foreground shadow-sm'
          : 'hover:text-foreground',
        props.class,
      )
    "
  >
    <slot />
  </button>
</template>
