import { defineConfig } from "vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
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
  plugins: [],
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
  server: {
    port: 5173,
    host: true,
    hmr: {
      overlay: true,
      clientPort: 5173,
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
      "zustand",
      "axios",
      "react",
      "react-dom",
      "@tanstack/react-query",
    ],
    force: true,
  },
});
