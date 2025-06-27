import path from 'path.ts';
import { defineConfig } from 'vite.ts';

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: './index.minimal.html',
      onwarn: () => {
        // Suppress all warnings;
      },
    },
    target: 'es2022',
    minify: false,
    sourcemap: false,
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  esbuild: {
    target: 'es2022',
    logLevel: 'silent',
  },
  server: {
    port: 5173,
    host: true,
  },
});
