<script setup lang="ts">
import ProgressBar from './ProgressBar.vue';
import { ProgressBarSize } from './ProgressBar.enums';
import { i18n } from '../../../plugins/i18n.ts';

const sizes = Object.values(ProgressBarSize);
const setupApp = ({ app }) => {
  app.use(i18n);
};

const initState = () => ({
  percentage: 40,
  indeterminate: false,
  size: ProgressBarSize.default,
  color: '#6490E2',
});
</script>

<template>
  <Story title="Atoms/ProgressBar" :setup-app="setupApp">
    <Variant :init-state="initState">
      <template #default="{ state }">
        <ProgressBar
          :percentage="state.percentage"
          :indeterminate="state.indeterminate"
          :size="state.size"
          :color="state.color"
        />
      </template>
      <template #controls="{ state }">
        <HstNumber v-model="state.percentage" title="percentage" />
        <HstCheckbox v-model="state.indeterminate" title="indeterminate" />
        <HstSelect v-model="state.size" :options="sizes" title="size" />
        <HstColorSelect v-model="state.color" title="color" />
      </template>
    </Variant>
  </Story>
</template>

<style lang="scss">
@import 'element-plus/theme-chalk/src/progress';
</style>

<docs lang="md">
## ProgressBar Component

`ProgressBar` - это компонент Vue, предназначенный для сбора имени пользователя. Он включает в себя текстовое поле для
ввода имени и кнопку для отправки формы.

### Пример использования

```vue
<div class="wrapper">
  <ProgressBar :percentage="50" indeterminate />
</div>

<script>
import ProgressBar from '@/components/ProgressBar.vue';

export default {
  components: {
    ProgressBar,
  },
};
</script>
```

### Пропсы

| Название         | Тип             | Описание | По умолчанию                            |
| ---------------- | --------------- | -------- | --------------------------------------- |
| `percentage`     | Number          | Процент  | `50`                                    |
| `indeterminate`  | Boolean         | Загрузка | `false`                                 |
| `size         `  | ProgressBarSize | Размер   | `ProgressBarSize.default`               |
| `color         ` | String          | Цвет     | `var(--brand-background-compound-rest)` |

## Стилизация

Компонент использует следующие CSS классы для стилизации:

- `.progress-bar`: класс корневого элемента формы.

Пример кастомизации стилей:

```css
.progress-bar {
  width: 50%;
}
```
</docs>
