<template>
  <div class="name-form">
    <ElFormItem :label="withLabel ? t('message.firstNameLabel') : ''">
      <ElInput
        class="name-form__first-name"
        :model-value="modelValue.firstName"
        :size="size"
        :placeholder="withLabel ? '' : t('message.firstNameLabel')"
        @update:model-value="onChangeFirstName"
      />
    </ElFormItem>
    <ElFormItem :label="withLabel ? t('message.lastNameLabel') : ''">
      <ElInput
        class="name-form__last-name"
        clearable
        :model-value="modelValue.lastName"
        :size="size"
        :placeholder="withLabel ? '' : t('message.lastNameLabel')"
        @update:model-value="onChangeLastName"
      />
    </ElFormItem>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import translate from './NameForm.i18n';
import { Size } from './NameForm.enums.ts';
import { ElInput, ElFormItem } from 'element-plus';

export interface INameFormModel {
  firstName: string;
  lastName: string;
}
export interface IProps {
  modelValue: INameFormModel;
  withLabel?: boolean;
  size?: Size;
  textColor?: string;
  bgColor?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  withLabel: false,
  size: Size.default,
  textColor: '#000',
  bgColor: '#fff',
});

const { t } = useI18n({
  inheritLocale: false,
  useScope: 'global',
  messages: translate,
});

export interface IEmit {
  (e: 'update:modelValue', val: INameFormModel): void;
}

const emit = defineEmits<IEmit>();

const onChangeFirstName = (event: string): void => {
  emit('update:modelValue', {
    firstName: event,
    lastName: props.modelValue.lastName,
  });
};

const onChangeLastName = (event: string): void => {
  emit('update:modelValue', {
    firstName: props.modelValue.firstName,
    lastName: event,
  });
};
</script>

<style scoped lang="scss">
:deep(.el-input) {
  --el-input-bg-color: v-bind(bgColor);
  --el-input-text-color: v-bind(textColor);
  --el-input-border-radius: 4px;
  --el-input-height: 32px;
}

:deep(.el-input--large) {
  --el-input-height: 36px;
}

:deep(.el-input--small) {
  --el-input-height: 24px;
}

:deep(.el-input__wrapper) {
  border: 1px solid var(--additional-transparent-white-12);
}

.name-form {
  width: 100%;
  text-align: start;
}
</style>
