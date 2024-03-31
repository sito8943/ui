// vite.config.ts
import { defineConfig } from "file:///C:/Users/Sito/Documents/Code/Code/SiUi/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import react from "file:///C:/Users/Sito/Documents/Code/Code/SiUi/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { libInjectCss } from "file:///C:/Users/Sito/Documents/Code/Code/SiUi/node_modules/vite-plugin-lib-inject-css/dist/index.mjs";
import dts from "file:///C:/Users/Sito/Documents/Code/Code/SiUi/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\Sito\\Documents\\Code\\Code\\SiUi";
var srcPath = resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      components: resolve(srcPath, "components"),
      providers: resolve(srcPath, "providers")
    }
  },
  plugins: [react(), dts({ insertTypesEntry: true }), libInjectCss()],
  build: {
    copyPublicDir: false,
    rollupOptions: {
      external: ["react", "react/jsx-runtime"]
    },
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/main.ts"),
      name: "@sito/ui",
      fileName: "ui",
      formats: ["es", "cjs"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxTaXRvXFxcXERvY3VtZW50c1xcXFxDb2RlXFxcXENvZGVcXFxcU2lVaVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcU2l0b1xcXFxEb2N1bWVudHNcXFxcQ29kZVxcXFxDb2RlXFxcXFNpVWlcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1NpdG8vRG9jdW1lbnRzL0NvZGUvQ29kZS9TaVVpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcclxuaW1wb3J0IHsgbGliSW5qZWN0Q3NzIH0gZnJvbSBcInZpdGUtcGx1Z2luLWxpYi1pbmplY3QtY3NzXCI7XHJcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xyXG5cclxuY29uc3Qgc3JjUGF0aCA9IHJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKTtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgY29tcG9uZW50czogcmVzb2x2ZShzcmNQYXRoLCBcImNvbXBvbmVudHNcIiksXHJcbiAgICAgIHByb3ZpZGVyczogcmVzb2x2ZShzcmNQYXRoLCBcInByb3ZpZGVyc1wiKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbcmVhY3QoKSwgZHRzKHsgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSB9KSwgbGliSW5qZWN0Q3NzKCldLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBjb3B5UHVibGljRGlyOiBmYWxzZSxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgZXh0ZXJuYWw6IFtcInJlYWN0XCIsIFwicmVhY3QvanN4LXJ1bnRpbWVcIl0sXHJcbiAgICB9LFxyXG4gICAgbGliOiB7XHJcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvbWFpbi50c1wiKSxcclxuICAgICAgbmFtZTogJ0BzaXRvL3VpJyxcclxuICAgICAgZmlsZU5hbWU6ICd1aScsXHJcbiAgICAgIGZvcm1hdHM6IFtcImVzXCIsIFwiY2pzXCJdLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrVCxTQUFTLG9CQUFvQjtBQUMvVSxTQUFTLGVBQWU7QUFDeEIsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUpoQixJQUFNLG1DQUFtQztBQU16QyxJQUFNLFVBQVUsUUFBUSxrQ0FBVyxLQUFLO0FBR3hDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLFlBQVksUUFBUSxTQUFTLFlBQVk7QUFBQSxNQUN6QyxXQUFXLFFBQVEsU0FBUyxXQUFXO0FBQUEsSUFDekM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksRUFBRSxrQkFBa0IsS0FBSyxDQUFDLEdBQUcsYUFBYSxDQUFDO0FBQUEsRUFDbEUsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLElBQ2YsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFNBQVMsbUJBQW1CO0FBQUEsSUFDekM7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDdkMsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLElBQ3ZCO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
