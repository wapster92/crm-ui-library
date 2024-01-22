<script setup lang="ts">
import { ElButton } from 'element-plus';
import { useI18n } from 'vue-i18n';
import translate from './SubmitForm.i18n.ts';

const { t } = useI18n({
  inheritLocale: false,
  useScope: 'global',
  messages: translate,
});
</script>

<template>
  <ElButton class="submit-form">{{ t('send') }}</ElButton>
</template>

<style scoped lang="scss"></style>
