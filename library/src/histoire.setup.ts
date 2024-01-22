import { createPinia } from 'pinia';
import { defineSetupVue3 } from '@histoire/plugin-vue';
import ElementPlus from 'element-plus';

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(ElementPlus);
  const pinia = createPinia();
  app.use(pinia);
});
