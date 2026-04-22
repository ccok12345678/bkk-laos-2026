<script setup lang="ts">
import { computed } from 'vue';
import { Check } from 'lucide-vue-next';
import { cn } from '@/lib/utils';

interface Props {
  modelValue?: boolean;
  id?: string;
  disabled?: boolean;
  class?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();

const checked = computed({
  get: () => props.modelValue ?? false,
  set: (v: boolean) => emit('update:modelValue', v),
});

function toggle() {
  if (!props.disabled) checked.value = !checked.value;
}
</script>

<template>
  <button
    type="button"
    role="checkbox"
    :aria-checked="checked"
    :disabled="disabled"
    :id="id"
    @click="toggle"
    :class="
      cn(
        'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-input bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        checked && 'bg-primary border-primary text-primary-foreground',
        props.class,
      )
    "
  >
    <Check v-if="checked" class="h-3.5 w-3.5" />
  </button>
</template>
