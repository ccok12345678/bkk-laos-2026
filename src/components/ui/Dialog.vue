<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue';
import { cn } from '@/lib/utils';
import { X } from 'lucide-vue-next';

interface Props {
  open: boolean;
  title?: string;
  description?: string;
  class?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ 'update:open': [value: boolean] }>();

function close() {
  emit('update:open', false);
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.open) close();
}

watch(
  () => props.open,
  (v) => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = v ? 'hidden' : '';
    }
  },
);

onMounted(() => {
  window.addEventListener('keydown', onKey);
});
onUnmounted(() => {
  window.removeEventListener('keydown', onKey);
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="absolute inset-0 bg-background/80 backdrop-blur-sm"
          @click="close"
        />
        <div
          :class="
            cn(
              'relative z-10 w-full sm:max-w-lg max-h-[90vh] overflow-y-auto bg-card text-card-foreground border shadow-lg rounded-t-xl sm:rounded-xl animate-in',
              props.class,
            )
          "
        >
          <div v-if="title || description" class="p-4 border-b">
            <div class="flex items-start justify-between gap-3">
              <div class="flex-1 min-w-0">
                <h2 v-if="title" class="text-lg font-semibold">{{ title }}</h2>
                <p v-if="description" class="text-sm text-muted-foreground mt-1">
                  {{ description }}
                </p>
              </div>
              <button
                type="button"
                @click="close"
                class="rounded-md p-1 hover:bg-accent transition-colors"
                aria-label="關閉"
              >
                <X class="h-5 w-5" />
              </button>
            </div>
          </div>
          <div class="p-4">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
