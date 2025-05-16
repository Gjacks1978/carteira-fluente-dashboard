import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // Configuração de proxy para a API do CoinMarketCap para evitar problemas de CORS
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