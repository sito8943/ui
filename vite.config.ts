import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
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
    },
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
      readCssWithImports(stylesPath),
    );
  },
});

const sourceExists = (path: string) =>
  [".ts", ".tsx", ".d.ts"].some((ext) => existsSync(`${path}${ext}`));

// Resolve a relative .d.ts specifier against src/ and add the extension
// required by moduleResolution node16/nodenext.
const withJsExtension = (filePath: string, specifier: string) => {
  const sourceDir = resolve(srcPath, relative(distPath, dirname(filePath)));
  const target = resolve(sourceDir, specifier);
  if (sourceExists(target)) return `${specifier}.js`;
  if (sourceExists(resolve(target, "index"))) return `${specifier}/index.js`;
  return specifier;
};

const addDtsExtensions = (filePath: string, content: string) =>
  content.replace(
    /(\bfrom\s*|\bimport\s*\(\s*)(["'])(\.{1,2}\/[^"']+?)\2/g,
    (match, prefix: string, quote: string, specifier: string) =>
      /\.(c|m)?js$/.test(specifier)
        ? match
        : `${prefix}${quote}${withJsExtension(filePath, specifier)}${quote}`,
  );

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": srcPath,
    },
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      beforeWriteFile: (filePath, content) => ({
        filePath,
        content: addDtsExtensions(filePath, content),
      }),
    }),
    styleEntrypoints(),
  ],
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
