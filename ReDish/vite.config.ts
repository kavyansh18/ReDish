import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/manifest.json', // Copy manifest.json from src to dist
          dest: '', // Root of dist folder
        },
        {
          src: 'src/background.js', // Copy background.js from src to dist
          dest: '', // Root of dist folder
        },
      ],
    }),
  ],
});
