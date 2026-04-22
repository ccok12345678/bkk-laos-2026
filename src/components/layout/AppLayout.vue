<script setup lang="ts">
import TopBar from './TopBar.vue';
import SideNav from './SideNav.vue';
import BottomTabBar from './BottomTabBar.vue';
import EmergencyFab from './EmergencyFab.vue';
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <SideNav class="hidden lg:block" />
    <div class="lg:pl-60">
      <TopBar class="lg:hidden" />
      <main
        class="mx-auto max-w-screen-xl px-4 pt-4 md:pt-6 pb-20 md:pb-8 lg:pb-10"
      >
        <router-view v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </router-view>
      </main>
      <BottomTabBar class="lg:hidden" />
    </div>
    <EmergencyFab />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
