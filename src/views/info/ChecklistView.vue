<script setup lang="ts">
import { computed, ref } from 'vue';
import { CHECKLIST } from '@/data/checklist';
import type { ChecklistGroup as ChecklistGroupType } from '@/types';
import { useChecklist } from '@/composables/useChecklist';
import ChecklistGroup from '@/components/widgets/ChecklistGroup.vue';
import Card from '@/components/ui/Card.vue';
import CardContent from '@/components/ui/CardContent.vue';
import Progress from '@/components/ui/Progress.vue';
import Button from '@/components/ui/Button.vue';
import Dialog from '@/components/ui/Dialog.vue';

const { progress, reset } = useChecklist();
const confirmOpen = ref(false);

const GROUPS: ChecklistGroupType[] = [
  'documents',
  'booking',
  'packing',
  'apps',
  'insurance',
];

const byGroup = computed(() =>
  GROUPS.map((g) => ({
    group: g,
    items: CHECKLIST.filter((i) => i.group === g),
  })),
);

function confirmReset() {
  reset();
  confirmOpen.value = false;
}
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl font-bold tracking-tight">行前檢查清單</h1>
      <p class="text-sm text-muted-foreground mt-1">
        進度會自動儲存於此裝置
      </p>
    </header>

    <Card>
      <CardContent class="py-4">
        <div class="flex items-baseline gap-2 mb-2 flex-wrap">
          <span class="text-3xl font-bold tabular-nums">{{ progress.percentage }}%</span>
          <span class="text-xs text-muted-foreground">
            {{ progress.done }} / {{ progress.total }} 項完成
          </span>
        </div>
        <Progress :value="progress.percentage" variant="luangprabang" />
      </CardContent>
    </Card>

    <div class="space-y-8">
      <ChecklistGroup
        v-for="g in byGroup"
        :key="g.group"
        :group="g.group"
        :items="g.items"
      />
    </div>

    <div class="pt-4 border-t border-border flex justify-end">
      <Button variant="destructive" size="sm" @click="confirmOpen = true">
        重置所有勾選
      </Button>
    </div>

    <Dialog
      v-model:open="confirmOpen"
      title="確定要重置？"
      description="所有已勾選的項目將被清除，不可還原。"
    >
      <div class="flex gap-2 justify-end">
        <Button variant="outline" @click="confirmOpen = false">取消</Button>
        <Button variant="destructive" @click="confirmReset">確定重置</Button>
      </div>
    </Dialog>
  </div>
</template>
