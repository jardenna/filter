import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint2';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    checker({
      typescript: {
        tsconfigPath: './tsconfig.app.json',
      },
    }),
    eslint({
      emitWarning: true,
    }),
  ],

  server: {
    port: 3000,
    host: true,
  },
  css: {
    devSourcemap: true,
  },
  build: {
    sourcemap: true,
  },
});
