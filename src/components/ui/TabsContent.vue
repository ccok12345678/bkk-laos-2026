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

const visible = computed(() => ctx?.value.value === props.value);
</script>

<template>
  <div
    v-if="visible"
    role="tabpanel"
    :class="
      cn(
        'mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
