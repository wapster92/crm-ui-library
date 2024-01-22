<template>
  <ElConfigProvider :locale="localeComputed">
    <slot />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import en from 'element-plus/dist/locale/en.mjs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ru from 'element-plus/dist/locale/ru.mjs';
import { ConfigLocale } from './ConfigProvider.enums';
import { computed } from 'vue';
interface IProps {
  locale?: ConfigLocale;
}

const props = withDefaults(defineProps<IProps>(), {
  locale: ConfigLocale.ru,
});

const localeComputed = computed(() => {
  return props.locale === ConfigLocale.ru ? ru : en;
});
</script>
