import { defineConfig } from "vite";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcPath = resolve(__dirname, "src");
const distPath = resolve(__dirname, "dist");
const themeStylePath = resolve(srcPath, "styles/theme.css");
const stylesPath = resolve(srcPath, "styles/styles.css");
const external = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "react/jsx-dev-runtime",
];

const readCssWithImports = (filePath: string, seen = new Set<string>()) => {
  if (seen.has(filePath)) return "";
  seen.add(filePath);

  const css = readFileSync(filePath, "utf8");
  return css.replace(
    /@import\s+["'](.+)["'];/g,
    (statement, importPath: string) => {
      if (!importPath.startsWith(".")) return statement;

      const importedPath = resolve(dirname(filePath), importPath);
      return readCssWithImports(importedPath, seen);
    }
  );
};

const styleEntrypoints = () => ({
  name: "sito-ui-style-entrypoints",
  apply: "build" as const,
  writeBundle() {
    mkdirSync(distPath, { recursive: true });
    writeFileSync(resolve(distPath, "theme.css"), readFileSync(themeStylePath));
    writeFileSync(
      resolve(distPath, "styles.css"),
      readCssWithImports(stylesPath)
    );
  },
});

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      components: resolve(srcPath, "components"),
    },
  },
  plugins: [react(), dts({ insertTypesEntry: true }), styleEntrypoints()],
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
