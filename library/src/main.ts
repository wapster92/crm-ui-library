import { App } from 'vue';
import * as components from './components';
// import NameForm from './stories/example/name-form/NameForm.vue';

const library = {
  install(Vue: App): void {
    Object.entries(components).forEach(([name, component]) => {
      Vue.component(name, component);
    });
    // Vue.component('NameForm', NameForm);
  },
};

export * from './components';
export * from './enums';
export * from './types';
export * from './hooks';
export * from './utils';

export default library;
