<script setup lang="ts">
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-vue-next';

interface Option {
  value: string;
  label: string;
}

interface Props {
  modelValue: string;
  options: Option[];
  id?: string;
  class?: string;
  disabled?: boolean;
}

const props = defineProps<Props>();
defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<template>
  <div class="relative">
    <select
      :value="modelValue"
      :id="id"
      :disabled="disabled"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      :class="
        cn(
          'flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-9 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          props.class,
        )
      "
    >
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
    <ChevronDown
      class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
    />
  </div>
</template>
