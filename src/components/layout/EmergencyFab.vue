<script setup lang="ts">
import { ref } from 'vue';
import { Phone } from 'lucide-vue-next';
import Dialog from '@/components/ui/Dialog.vue';
import EmergencyContactList from '@/components/widgets/EmergencyContactList.vue';

const open = ref(false);
</script>

<template>
  <button
    type="button"
    @click="open = true"
    class="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-40 h-14 w-14 rounded-full bg-destructive text-destructive-foreground shadow-lg hover:bg-destructive/90 active:scale-95 transition-all flex items-center justify-center"
    aria-label="緊急聯絡"
  >
    <Phone class="h-6 w-6" />
  </button>
  <Dialog
    v-model:open="open"
    title="緊急聯絡"
    description="點擊號碼可直接撥打"
  >
    <EmergencyContactList />
  </Dialog>
</template>
