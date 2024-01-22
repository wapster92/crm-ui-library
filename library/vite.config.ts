/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgLoader from 'vite-svg-loader';
// import typescript from '@rollup/plugin-typescript';



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['./src/**/*.ts', './src/**/*.vue'],
      cleanVueFileName: false,
      outputDir: './dist/types',
      insertTypesEntry: true,
      copyDtsFiles: false,
      staticImport: true,
      skipDiagnostics: false,
      exclude: ['**/*.spec.ts', '**/*.story.vue', 'node_modules', 'vuetify',],
    }),
    viteStaticCopy({
      targets: [
        {
          src: './src/styles/**/*.scss',
          dest: './styles',
          rename: (fileName, fileExtension, fullPath): string => {
            return fullPath.replace(/.*src\/styles\//, '');
          },
        },
      ],
    }),
    svgLoader(),
  ],
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src', 'main.ts'),
      name: 'library',
      formats: ['es'],
      fileName: (format: string) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'vue-i18n', 'lodash', 'pinia', 'ajv', 'js-cookie', 'vue-final-modal', 'mitt'],
      plugins: [
        {
          name: 'ignore-test-and-story-files',
          resolveId(source) {
            if (source.endsWith('.spec.ts') || source.endsWith('.story.vue')) {
              return this.resolve(source, { skipSelf: true }).then(resolved => {
                if (resolved) {
                  return { id: resolved.id, external: true };
                }
                return null;
              });
            }
            return null;
          }
        }
      ]
    },
    assetsInlineLimit: 0,
  },
  resolve: {
    alias: [
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/main.scss";`,
      },
    },
  },
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom'
  }
});
