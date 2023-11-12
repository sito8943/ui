import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import dts from "vite-plugin-dts";

const srcPath = resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      components: resolve(srcPath, "components"),
      providers: resolve(srcPath, "providers"),
    },
  },
  plugins: [react(), dts({ insertTypesEntry: true }), libInjectCss()],
  build: {
    copyPublicDir: false,
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
    },
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: '@sito/ui',
      fileName: 'ui',
      formats: ["es", "cjs"],
    },
  },
});
