<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

interface Props {
  modelValue: number;
  min?: number;
  max?: number;
  step?: number;
  id?: string;
  variant?: 'default' | 'bangkok' | 'luangprabang';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  variant: 'default',
});

defineEmits<{ 'update:modelValue': [value: number] }>();

const accentClass = computed(() => {
  switch (props.variant) {
    case 'bangkok':
      return 'accent-bangkok';
    case 'luangprabang':
      return 'accent-luangprabang';
    default:
      return 'accent-primary';
  }
});
</script>

<template>
  <input
    type="range"
    :min="min"
    :max="max"
    :step="step"
    :value="modelValue"
    :id="id"
    @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
    :class="cn('h-2 w-full cursor-pointer', accentClass, props.class)"
  />
</template>
