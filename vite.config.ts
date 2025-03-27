import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),

      // fix loading all icon chunks in dev mode
      // https://github.com/tabler/tabler-icons/issues/1233
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
  server: {
    hmr: {
      overlay: true,  // Hiển thị lỗi trên overlay
      timeout: 5000,  // Tăng timeout cho kết nối HMR
    },
    watch: {
      usePolling: true,       // Sử dụng polling để phát hiện thay đổi (hữu ích trong môi trường Docker)
      interval: 1000,         // Kiểm tra thay đổi mỗi giây
      ignored: ['**/node_modules/**', '**/dist/**'],  // Bỏ qua các thư mục này
    }
  },
})
