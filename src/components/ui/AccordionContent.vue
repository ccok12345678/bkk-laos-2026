<script setup lang="ts">
import { inject, type ComputedRef } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{ class?: string }>();

const ctx = inject<{
  value: string;
  open: ComputedRef<boolean>;
  toggle: () => void;
}>('accordion-item-context');
</script>

<template>
  <div v-if="ctx?.open.value" :class="cn('pb-4 text-sm', props.class)">
    <slot />
  </div>
</template>
