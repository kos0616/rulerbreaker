import { fileURLToPath, URL } from 'node:url';
import loadVersion from 'vite-plugin-package-version';
import { VitePWA } from 'vite-plugin-pwa';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    loadVersion(),
    VitePWA({
      manifest: false
    })
  ],
  server: { host: '0.0.0.0' },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: { __Admin_VERSION__: JSON.stringify(process.env.npm_package_version) },
  base: mode === 'production' ? '/NFCAT/' : '/',
  // build: {
  //   outDir: 'docs'
  // }
}));
