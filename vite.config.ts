import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carregar variáveis de ambiente
  const env = loadEnv(mode, process.cwd(), 'REPLIT_');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: true,
      port: 8080,
    },
    define: {
      'import.meta.env.REPLIT_COINMARKETCAP_API_KEY': JSON.stringify(env.REPLIT_COINMARKETCAP_API_KEY || ''),
    }
  }
})