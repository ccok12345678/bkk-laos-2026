<script setup lang="ts">
import { provide, inject, computed } from 'vue';

interface Props {
  value: string;
}

const props = defineProps<Props>();

const ctx = inject<{
  toggle: (v: string) => void;
  isOpen: (v: string) => boolean;
}>('accordion-context');

const open = computed(() => ctx?.isOpen(props.value) ?? false);

provide('accordion-item-context', {
  value: props.value,
  open,
  toggle: () => ctx?.toggle(props.value),
});
</script>

<template>
  <div class="border-b last:border-b-0">
    <slot />
  </div>
</template>
