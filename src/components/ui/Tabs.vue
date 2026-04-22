<script setup lang="ts">
import { provide, toRefs } from 'vue';

interface Props {
  modelValue: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const { modelValue } = toRefs(props);

provide('tabs-context', {
  value: modelValue,
  set: (v: string) => emit('update:modelValue', v),
});
</script>

<template>
  <div>
    <slot />
  </div>
</template>
