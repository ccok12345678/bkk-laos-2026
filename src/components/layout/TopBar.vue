<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ChevronLeft, Sun, Moon, Monitor } from 'lucide-vue-next';
import { usePreferencesStore } from '@/stores/preferences';
import { cn } from '@/lib/utils';

defineProps<{ class?: string }>();

const route = useRoute();
const router = useRouter();
const prefs = usePreferencesStore();

const title = computed(() => (route.meta.title as string) ?? '東南亞七日');
const isRoot = computed(() =>
  ['/', '/itinerary', '/travel', '/info', '/budget'].includes(route.path),
);

const ThemeIcon = computed(() => {
  if (prefs.theme === 'dark') return Moon;
  if (prefs.theme === 'light') return Sun;
  return Monitor;
});
</script>

<template>
  <header
    :class="
      cn(
        'sticky top-0 z-30 bg-background/85 backdrop-blur border-b border-border safe-top',
        $props.class,
      )
    "
  >
    <div class="flex items-center justify-between h-12 px-3 max-w-screen-xl mx-auto">
      <button
        v-if="!isRoot"
        type="button"
        @click="router.back()"
        class="rounded-md p-2 hover:bg-accent transition-colors -ml-2"
        aria-label="返回"
      >
        <ChevronLeft class="h-5 w-5" />
      </button>
      <div v-else class="w-9" />
      <h1 class="font-semibold text-sm tracking-tight truncate">{{ title }}</h1>
      <button
        type="button"
        @click="prefs.cycleTheme()"
        class="rounded-md p-2 hover:bg-accent transition-colors -mr-2"
        :aria-label="`切換主題（目前：${prefs.theme}）`"
      >
        <component :is="ThemeIcon" class="h-5 w-5" />
      </button>
    </div>
  </header>
</template>
