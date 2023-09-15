import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
            @import "@/assets/_variables.scss";
            @import "@/assets/_mixins.scss";
          `
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
