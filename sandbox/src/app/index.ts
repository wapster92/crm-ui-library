import '@/app/styles/main.scss';
import { createApp } from 'vue';
import { router } from '@/app/providers/router';
import App from '@/app/App.vue';
import { i18n } from '@/app/providers/i18n';
import { createVfm } from 'vue-final-modal';
const vfm = createVfm();
import { store } from '@/app/providers/store';

import 'vue-final-modal/style.css';
const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(vfm);
app.use(store);
app.mount('#app');
