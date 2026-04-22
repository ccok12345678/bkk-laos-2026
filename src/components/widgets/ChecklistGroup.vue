<script setup lang="ts">
import type { ChecklistGroup as ChecklistGroupType, ChecklistItem } from '@/types';
import { CHECKLIST_GROUP_LABELS } from '@/data/checklist';
import Checkbox from '@/components/ui/Checkbox.vue';
import Progress from '@/components/ui/Progress.vue';
import { AlertCircle } from 'lucide-vue-next';
import { useChecklist } from '@/composables/useChecklist';
import { computed } from 'vue';

interface Props {
  group: ChecklistGroupType;
  items: ChecklistItem[];
}

const props = defineProps<Props>();
const { state, toggle, progressByGroup } = useChecklist();

const progress = computed(() => progressByGroup.value[props.group]);

function fmtDate(iso?: string) {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
</script>

<template>
  <section class="space-y-2">
    <div class="flex items-baseline gap-2 flex-wrap">
      <h3 class="text-base font-semibold">{{ CHECKLIST_GROUP_LABELS[group] }}</h3>
      <span class="text-xs text-muted-foreground tabular-nums">
        {{ progress.done }} / {{ progress.total }}
      </span>
    </div>
    <Progress :value="progress.percentage" class="mb-2" />
    <ul class="space-y-1">
      <li
        v-for="item in items"
        :key="item.id"
        class="flex items-start gap-3 rounded-md p-3 hover:bg-accent/50 transition-colors"
      >
        <Checkbox
          :id="`chk-${item.id}`"
          :model-value="!!state[item.id]"
          @update:model-value="toggle(item.id)"
          class="mt-0.5"
        />
        <label :for="`chk-${item.id}`" class="flex-1 min-w-0 cursor-pointer">
          <div class="flex items-center gap-2 flex-wrap text-sm">
            <span :class="state[item.id] && 'line-through text-muted-foreground'">
              {{ item.text }}
            </span>
            <AlertCircle
              v-if="item.important"
              class="h-3.5 w-3.5 text-warning shrink-0"
            />
          </div>
          <div v-if="item.dueDate || item.details" class="text-xs text-muted-foreground mt-0.5">
            <span v-if="item.dueDate" class="tabular-nums">建議 {{ fmtDate(item.dueDate) }} 前</span>
            <span v-if="item.dueDate && item.details"> · </span>
            <span v-if="item.details">{{ item.details }}</span>
          </div>
        </label>
      </li>
    </ul>
  </section>
</template>
