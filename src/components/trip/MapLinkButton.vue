<script setup lang="ts">
import { MapPin } from 'lucide-vue-next';
import Button from '@/components/ui/Button.vue';

interface Props {
  url: string;
  label?: string;
  size?: 'sm' | 'default';
}

withDefaults(defineProps<Props>(), { label: '地圖', size: 'sm' });
</script>

<template>
  <Button
    as="a"
    variant="outline"
    :size="size"
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
  >
    <MapPin class="h-4 w-4" />
    {{ label }}
  </Button>
</template>
