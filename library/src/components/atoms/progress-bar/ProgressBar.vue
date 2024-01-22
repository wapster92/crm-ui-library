<script setup lang="ts">
import { ElProgress } from 'element-plus';
import { ProgressBarSize } from './ProgressBar.enums';

interface IProps {
  percentage?: number;
  indeterminate?: boolean;
  size?: ProgressBarSize;
  color?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  percentage: 50,
  indeterminate: false,
  size: ProgressBarSize.default,
  color: 'var(--brand-background-compound-rest)',
});

const strokeWidthMap = {
  [ProgressBarSize.default]: 2,
  [ProgressBarSize.thick]: 4,
};
</script>

<template>
  <div class="progress-bar">
    <ElProgress
      :percentage="props.percentage"
      :indeterminate="props.indeterminate"
      :strokeWidth="strokeWidthMap[props.size]"
    />
  </div>
</template>

<style scoped lang="scss">
.progress-bar {
  --el-border-color-lighter: var(--neutral-background-6-rest);
}

:deep(.el-progress-bar__inner) {
  background: v-bind(color);
}

:deep(.el-progress__text) {
  display: none;
}
</style>
