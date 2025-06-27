import path from 'path.ts';
import { defineConfig } from 'vite.ts';
// @ts-ignore;
import react from '@vitejs/plugin-react.ts';
// @ts-ignore;
import { backendPlugin } from './vite-backend-plugin.ts';

// https://vite.dev/config/
export default defineConfig({
  esbuild: {
    // Ignore TypeScript errors during build;
    logLevel: 'error',
  },
  resolve: {
    alias: {
      "@stores": path.resolve(__dirname, "src/stores"),
      "@/hooks": path.resolve(__dirname, "src/hooks"),
      "@/components": path.resolve(__dirname, "src/components"),
      "@/lib": path.resolve(__dirname, "src/lib"),
      "@/types": path.resolve(__dirname, "src/types"),
      "@/utils": path.resolve(__dirname, "src/utils"),
      "@/services": path.resolve(__dirname, "src/services"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [react(), backendPlugin()],
  server: {
    port: 5173,
    host: true,
    hmr: {
      overlay: false, // Disable overlay to prevent WebSocket errors;
      clientPort: 5173,
      port: 24678, // Use different port for HMR WebSocket;
    },
    strictPort: false, // Allow fallback ports;
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
        ws: false,
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            // console statement removed
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            // console statement removed
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            // console statement removed
          });
        },
      },
      "/health": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            // console statement removed
          });
        },
      },
      "/ws": {
        target: "ws://localhost:8000",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress certain warnings;
        if (warning.code === "UNRESOLVED_IMPORT") return;
        warn(warning);
      },
    },
  },
  optimizeDeps: {
    include: [
      "@radix-ui/react-tabs",
      "@radix-ui/react-slot",
      "@radix-ui/react-label",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
  },
});
