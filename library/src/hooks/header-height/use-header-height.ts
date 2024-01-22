import { useHeaderHeightStore } from './header-height-store.ts';
import { storeToRefs } from 'pinia';
import { computed, readonly } from 'vue';

export const useHeaderHeight = () => {
  const headerHeightStore = useHeaderHeightStore();
  const { height } = storeToRefs(headerHeightStore);
  const heightPx = computed(() => `${height.value}px`);

  return {
    headerHeight: readonly(height),
    headerHeightPx: heightPx,
  };
};
