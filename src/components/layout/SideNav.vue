<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import {
  Home,
  CalendarDays,
  Plane,
  BookOpen,
  Wallet,
  Sun,
  Moon,
  Monitor,
} from 'lucide-vue-next';
import { usePreferencesStore } from '@/stores/preferences';
import { cn } from '@/lib/utils';

defineProps<{ class?: string }>();

const route = useRoute();
const prefs = usePreferencesStore();

const tabs = [
  { id: 'home', label: '總覽', icon: Home, to: '/' },
  { id: 'itinerary', label: '行程', icon: CalendarDays, to: '/itinerary' },
  { id: 'travel', label: '航班與住宿', icon: Plane, to: '/travel' },
  { id: 'info', label: '實用資訊', icon: BookOpen, to: '/info' },
  { id: 'budget', label: '預算', icon: Wallet, to: '/budget' },
];

const infoSubTabs = [
  { to: '/info/visa', label: '簽證' },
  { to: '/info/currency', label: '匯率' },
  { to: '/info/weather', label: '氣候' },
  { to: '/info/etiquette', label: '文化禮儀' },
  { to: '/info/sim', label: 'SIM 卡' },
  { to: '/info/safety', label: '安全資訊' },
  { to: '/info/checklist', label: '行前檢查' },
];

const currentTab = computed(() => route.meta.tab as string | undefined);
const infoExpanded = computed(() => currentTab.value === 'info');

const ThemeIcon = computed(() => {
  if (prefs.theme === 'dark') return Moon;
  if (prefs.theme === 'light') return Sun;
  return Monitor;
});
</script>

<template>
  <aside
    :class="
      cn(
        'fixed inset-y-0 left-0 w-60 border-r border-border bg-card flex flex-col z-20',
        $props.class,
      )
    "
    aria-label="主要導航"
  >
    <div class="px-5 py-5 border-b border-border">
      <router-link to="/" class="block">
        <div class="text-xs text-muted-foreground font-medium">
          台北 → 曼谷 → 龍坡邦
        </div>
        <div class="font-bold text-base tracking-tight mt-0.5">
          七日知性慢旅
        </div>
      </router-link>
    </div>
    <nav class="flex-1 overflow-y-auto py-3">
      <ul class="space-y-0.5 px-2">
        <li v-for="tab in tabs" :key="tab.id">
          <router-link
            :to="tab.to"
            :class="
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                currentTab === tab.id
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )
            "
          >
            <component :is="tab.icon" class="h-4 w-4 shrink-0" />
            <span>{{ tab.label }}</span>
          </router-link>
          <ul v-if="tab.id === 'info' && infoExpanded" class="mt-1 space-y-0.5 pl-9">
            <li v-for="sub in infoSubTabs" :key="sub.to">
              <router-link
                :to="sub.to"
                :class="
                  cn(
                    'block rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                    $route.path === sub.to
                      ? 'text-foreground bg-accent/60'
                      : 'text-muted-foreground hover:text-foreground',
                  )
                "
              >
                {{ sub.label }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <div class="p-3 border-t border-border">
      <button
        type="button"
        @click="prefs.cycleTheme()"
        class="w-full flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
      >
        <component :is="ThemeIcon" class="h-4 w-4" />
        <span>主題：{{ prefs.theme }}</span>
      </button>
    </div>
  </aside>
</template>
