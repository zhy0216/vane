import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/vane/',
  root: '.',
  publicDir: 'static',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    port: 3001,
  },
});
