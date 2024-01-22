import { defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';

export default defineConfig({
  plugins: [HstVue()],
  server: {
    port: process.env.HISTOIRE ? 6006 : 3000,
  },
  controls: {
    disable: true,
  },
  vite: {
    // Any Vite configuration
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/main.scss";`,
        },
      },
    },
  },
});
