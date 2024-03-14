import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { sentryVitePlugin } from '@sentry/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: 'medexams',
      project: 'medexams',
    }),
  ],

  resolve: {
    alias: {
      '@/': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/api': path.resolve(__dirname, 'src/api'),
      '@/utils': path.resolve(__dirname, 'src/lib/utils'),
      '@/context': path.resolve(__dirname, 'src/context'),
      '@/layouts': path.resolve(__dirname, 'src/layouts'),
    },
  },

  build: {
    sourcemap: true,
  },
});
