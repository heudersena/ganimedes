import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    include: "**/*.vue",
    reactivityTransform: true
  })],
  cacheDir: false,
  server: {
    port: 4200,
    host: true
  },
  preview: {
    https: true,
    port: 9000,
    host: true,
    cors: ["*"]
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})



