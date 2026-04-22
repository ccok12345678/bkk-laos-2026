<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import {
  Home,
  CalendarDays,
  Plane,
  BookOpen,
  Wallet,
} from 'lucide-vue-next';
import { cn } from '@/lib/utils';

defineProps<{ class?: string }>();

const route = useRoute();

const tabs = [
  { id: 'home', label: '總覽', icon: Home, to: '/' },
  { id: 'itinerary', label: '行程', icon: CalendarDays, to: '/itinerary' },
  { id: 'travel', label: '航班住宿', icon: Plane, to: '/travel' },
  { id: 'info', label: '實用資訊', icon: BookOpen, to: '/info' },
  { id: 'budget', label: '預算', icon: Wallet, to: '/budget' },
];

const currentTab = computed(() => route.meta.tab as string | undefined);
</script>

<template>
  <nav
    :class="
      cn(
        'fixed bottom-0 inset-x-0 z-30 bg-background/95 backdrop-blur border-t border-border safe-bottom lg:hidden',
        $props.class,
      )
    "
    aria-label="主要導航"
  >
    <div class="flex h-16 items-stretch justify-around max-w-screen-xl mx-auto">
      <router-link
        v-for="tab in tabs"
        :key="tab.id"
        :to="tab.to"
        :class="
          cn(
            'flex-1 flex flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium transition-colors',
            currentTab === tab.id
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground',
          )
        "
      >
        <component :is="tab.icon" class="h-6 w-6" />
        <span>{{ tab.label }}</span>
      </router-link>
    </div>
  </nav>
</template>
