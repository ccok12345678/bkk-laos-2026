<script setup lang="ts">
import { onMounted, watch } from 'vue';
import AppLayout from '@/components/layout/AppLayout.vue';
import { usePreferencesStore } from '@/stores/preferences';

const prefs = usePreferencesStore();

onMounted(() => {
  prefs.applyTheme();
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const listener = () => {
    if (prefs.theme === 'system') prefs.applyTheme();
  };
  mql.addEventListener('change', listener);
});

watch(
  () => prefs.theme,
  () => prefs.applyTheme(),
);
</script>

<template>
  <AppLayout />
</template>
