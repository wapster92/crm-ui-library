import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
// https://vitejs.dev/config/

console.log(resolve(__dirname, '..', 'library', 'src'))
export default defineConfig({
  plugins: [vue(), vueJsx(), svgLoader()],
  resolve: {
    alias: {
      '@': `${resolve(__dirname, './src')}`,
      '@wapster/crm-ui-library': resolve(__dirname, '..', 'library', 'src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'src', 'app', 'index.ts'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '@wapster/crm-ui-library/styles/abstracts/_variables.scss';
          @import '@wapster/crm-ui-library/styles/abstracts/_mixins.scss';
          @import '@wapster/crm-ui-library/styles/abstracts/_functions.scss';
        `,
      },
    },
  },
});
