import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 项目页部署在子路径 /family-food/ 下
  base: '/family-food/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    // 允许任意 Host 访问（局域网手机/平板通过 IP 打开）
    allowedHosts: true,
    hmr: {
      // HMR 走 IP，手机实时刷新也能收到
      host: '192.168.2.240',
      port: 5173,
      clientPort: 5173,
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true,
  },
})
