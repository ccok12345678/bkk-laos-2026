<script setup lang="ts">
import { provide, toRefs, ref } from 'vue';

interface Props {
  modelValue?: string | string[];
  type?: 'single' | 'multiple';
  collapsible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'single',
  collapsible: true,
});

const emit = defineEmits<{ 'update:modelValue': [value: string | string[]] }>();

const { modelValue } = toRefs(props);
const internal = ref<string | string[]>(
  modelValue.value ?? (props.type === 'multiple' ? [] : ''),
);

function toggle(value: string) {
  if (props.type === 'multiple') {
    const current = Array.isArray(internal.value) ? [...internal.value] : [];
    const idx = current.indexOf(value);
    if (idx >= 0) current.splice(idx, 1);
    else current.push(value);
    internal.value = current;
    emit('update:modelValue', current);
  } else {
    const next = internal.value === value ? (props.collapsible ? '' : value) : value;
    internal.value = next;
    emit('update:modelValue', next);
  }
}

function isOpen(value: string): boolean {
  if (Array.isArray(internal.value)) return internal.value.includes(value);
  return internal.value === value;
}

provide('accordion-context', { toggle, isOpen });
</script>

<template>
  <div class="w-full">
    <slot />
  </div>
</template>
