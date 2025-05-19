import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api/coinmarketcap': {
        target: 'https://pro-api.coinmarketcap.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/coinmarketcap/, ''),
        headers: {
          'X-CMC_PRO_API_KEY': 'e341ff27-5e33-4c6d-a3f1-08646d086fec'
        }
      }
    }
  }
})