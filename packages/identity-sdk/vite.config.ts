import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';

import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react(), svgr(), dts({ rollupTypes: true })],
  resolve: {
    alias: [
      { find: '@sdk', replacement: resolve(__dirname, 'src') },
    ],
  },
  // @ts-expect-error vitest 2.x bundles vite 5 types, project uses vite 6
  test: {
    environment: 'jsdom',
    css: { modules: { classNameStrategy: 'non-scoped' } },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `identity-sdk.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    cssCodeSplit: false,
  },
});
