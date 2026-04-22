<script setup lang="ts">
import { computed } from 'vue';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
  AlertOctagon,
  AlertTriangle,
  Info as InfoIcon,
  CheckCircle2,
} from 'lucide-vue-next';

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm flex gap-3 items-start',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground border-border',
        info: 'bg-info/10 border-info/30 text-info-foreground [&>svg]:text-info dark:text-info',
        warning:
          'bg-warning/10 border-warning/40 text-warning-foreground [&>svg]:text-warning',
        destructive:
          'bg-destructive/10 border-destructive/40 text-destructive [&>svg]:text-destructive',
        success:
          'bg-success/10 border-success/30 text-success-foreground [&>svg]:text-success dark:text-success',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

type AlertVariants = VariantProps<typeof alertVariants>;

interface Props {
  variant?: AlertVariants['variant'];
  title?: string;
  class?: string;
  hideIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), { variant: 'default' });

const classes = computed(() =>
  cn(alertVariants({ variant: props.variant }), props.class),
);

const Icon = computed(() => {
  switch (props.variant) {
    case 'warning':
      return AlertTriangle;
    case 'destructive':
      return AlertOctagon;
    case 'success':
      return CheckCircle2;
    case 'info':
      return InfoIcon;
    default:
      return InfoIcon;
  }
});
</script>

<template>
  <div :class="classes" role="alert">
    <component v-if="!hideIcon" :is="Icon" class="h-5 w-5 mt-0.5 shrink-0" />
    <div class="flex-1 min-w-0">
      <div v-if="title" class="font-semibold mb-1">{{ title }}</div>
      <div class="leading-relaxed"><slot /></div>
    </div>
  </div>
</template>
