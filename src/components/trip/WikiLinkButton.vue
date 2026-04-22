<script setup lang="ts">
import { BookText } from 'lucide-vue-next';
import Button from '@/components/ui/Button.vue';

interface Props {
  url: string;
  label?: string;
  size?: 'sm' | 'default';
}

withDefaults(defineProps<Props>(), { label: '維基', size: 'sm' });
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
    <BookText class="h-4 w-4" />
    {{ label }}
  </Button>
</template>
