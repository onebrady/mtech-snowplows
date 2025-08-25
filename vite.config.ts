import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";

const outDir = process.env.OUT_DIR || "dist";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
  },
  build: {
    outDir,
    assetsDir: ".",
    cssCodeSplit: false,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: "knowledge-hub.js",
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || "";
          if (name.endsWith(".css") || name === "style.css")
            return "knowledge-hub.css";
          return "assets/[name][extname]";
        },
      },
    },
  },
});
