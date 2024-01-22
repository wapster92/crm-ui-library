import MainPage from '@/pages/MainPage.vue';
import EvgenyTest from '@/pages/EvgenyTest.vue';
import ErlanTest from '@/pages/ErlanTest.vue';
import WapSter from '@/pages/WapSter.vue';

import { type RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainPage,
    meta: {
      title: 'Главная',
    },
  },
];
