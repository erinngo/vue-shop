import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    // 별칭 --> @로 저 경로를 불러온다
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@views": path.resolve(__dirname, "./src/views"),
    },
  },
  plugins: [vue()],
  //프록시 설정
  server: {
    proxy: {
      "/proxy": {
        target: "https://fakestoreapi.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, ""),
      },
    },
  },
});
