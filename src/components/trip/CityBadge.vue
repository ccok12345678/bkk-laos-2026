<script setup lang="ts">
import { computed } from 'vue';
import type { CityId } from '@/types';
import Badge from '@/components/ui/Badge.vue';

interface Props {
  city: CityId;
}

const props = defineProps<Props>();

const label = computed(() => {
  switch (props.city) {
    case 'bangkok':
      return '曼谷';
    case 'luangprabang':
      return '龍坡邦';
    case 'in-transit':
      return '轉機中';
  }
});

const variant = computed(() => {
  switch (props.city) {
    case 'bangkok':
      return 'bangkok';
    case 'luangprabang':
      return 'luangprabang';
    case 'in-transit':
      return 'transit';
  }
});
</script>

<template>
  <Badge :variant="variant">{{ label }}</Badge>
</template>
