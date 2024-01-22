<script setup lang="ts">
import NameForm from './NameForm.vue';
import { i18n } from '../../../plugins/i18n.ts';
import { Size } from './NameForm.enums.ts';
const sizes = Object.values(Size);
const setupApp = ({ app }) => {
  app.use(i18n);
};

const initState = () => ({
  value: {
    firstName: '',
    lastName: '',
  },
  withLabel: false,
  size: Size.default,
  textColor: '#000',
  bgColor: '#fff',
});
</script>

<template>
  <Story title="Example/NameForm" :setup-app="setupApp">
    <Variant :init-state="initState">
      <template #default="{ state }">
        <NameForm
          v-model="state.value"
          :with-label="state.withLabel"
          :size="state.size"
          :bg-color="state.bgColor"
          :text-color="state.textColor"
        />
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.value.firstName" title="Имя" />
        <HstText v-model="state.value.lastName" title="Фамилия" />
        <HstColorSelect v-model="state.textColor" title="Цвет текста" />
        <HstColorSelect v-model="state.bgColor" title="Цвет фона" />
        <HstCheckbox v-model="state.withLabel" title="Лейблы" />
        <HstSelect v-model="state.size" :options="sizes" title="Размер" />
      </template>
    </Variant>
  </Story>
</template>

<docs lang="md">
## NameForm Component

`NameForm` - это компонент Vue, предназначенный для сбора имени пользователя. Он включает в себя текстовое поле для
ввода имени и кнопку для отправки формы.

### Пример использования

```vue
<template>
  <NameForm @submit="handleSubmit" />
</template>

<script>
import NameForm from '@/components/NameForm.vue';

export default {
  components: {
    NameForm,
  },
  methods: {
    handleSubmit(name) {
      console.log('Submitted name:', name);
    },
  },
};
</script>
```

### Пропсы

| Название | Тип    | Описание          | По умолчанию |
| -------- | ------ | ----------------- | ------------ |
| `value`  | String | Имя пользователя. | `''`         |

## Слоты

- **`default`**: Пользовательский слот для добавления дополнительного содержимого в форму.

## Стилизация

Компонент использует следующие CSS классы для стилизации:

- `.name-form`: класс корневого элемента формы.
- `.name-form-input`: класс текстового поля для ввода имени.
- `.name-form-button`: класс кнопки отправки формы.

Пример кастомизации стилей:

```css
.name-form {
  background-color: #f0f0f0;
}

.name-form-input {
  border: 1px solid #ccc;
}

.name-form-button {
  background-color: blue;
  color: white;
}
```
</docs>

<style lang="scss">
// @import "../../../styles/main";
</style>
