import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Configurar variáveis de ambiente do Replit
if (import.meta.env.REPLIT_COINMARKETCAP_API_KEY) {
  process.env.COINMARKETCAP_API_KEY = import.meta.env.REPLIT_COINMARKETCAP_API_KEY;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)