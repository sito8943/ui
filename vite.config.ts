import { defineConfig } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import dts from "vite-plugin-dts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcPath = resolve(__dirname, "src");
const external = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "react/jsx-dev-runtime",
];

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      components: resolve(srcPath, "components"),
    },
  },
  plugins: [react(), dts({ insertTypesEntry: true }), libInjectCss()],
  build: {
    copyPublicDir: false,
    target: "es2020",
    rollupOptions: {
      external,
    },
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "@sito/ui",
      fileName: "ui",
      formats: ["es", "cjs"],
    },
  },
});
