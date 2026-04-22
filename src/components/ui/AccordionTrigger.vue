<script setup lang="ts">
import { inject, type ComputedRef } from 'vue';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-vue-next';

const props = defineProps<{ class?: string }>();

const ctx = inject<{
  value: string;
  open: ComputedRef<boolean>;
  toggle: () => void;
}>('accordion-item-context');
</script>

<template>
  <button
    type="button"
    @click="ctx?.toggle()"
    :aria-expanded="ctx?.open.value ?? false"
    :class="
      cn(
        'flex flex-1 w-full items-center justify-between gap-3 py-4 text-sm font-medium text-left transition-all hover:underline',
        props.class,
      )
    "
  >
    <span class="flex-1 min-w-0"><slot /></span>
    <ChevronDown
      class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
      :class="{ 'rotate-180': ctx?.open.value }"
    />
  </button>
</template>
