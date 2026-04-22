<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';
import { buttonVariants, type ButtonVariants } from './button';

interface Props {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  as?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  as: 'button',
  type: 'button',
});

const classes = computed(() =>
  cn(buttonVariants({ variant: props.variant, size: props.size }), props.class),
);
</script>

<template>
  <component
    :is="as"
    :type="as === 'button' ? type : undefined"
    :disabled="as === 'button' ? disabled : undefined"
    :class="classes"
  >
    <slot />
  </component>
</template>
