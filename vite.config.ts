import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Your alias goes here
      assets: path.resolve(__dirname, "./src/assets"),
      Components: path.resolve(__dirname, "./src/Components"),
      functions: path.resolve(__dirname, "./src/functions"),
    },
  },
  server: { port: 3000 },
});
