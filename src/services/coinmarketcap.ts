
import { toast } from '@/components/ui/sonner';

const API_KEY = 'e341ff27-5e33-4c6d-a3f1-08646d086fec';
const BASE_URL = 'https://pro-api.coinmarketcap.com/v1';

// Armazenar a última vez que os preços foram atualizados
let lastUpdateTime = 0;

// Função para obter a última atualização
export const getLastUpdateTime = () => lastUpdateTime;

// Função para atualizar preços de criptomoedas
export const fetchCryptoPrices = async (symbols: string[]) => {
  try {
    if (!symbols || symbols.length === 0) {
      console.log("Nenhum símbolo de criptomoeda fornecido para atualização");
      return {};
    }

    // Uso direto da API key que já definimos no início do arquivo
    console.log("Iniciando busca por preços para:", symbols.join(", "));

    // Cria URL com os símbolos das criptomoedas usando o proxy configurado no vite.config.ts
    const url = `/api/coinmarketcap/cryptocurrency/quotes/latest?symbol=${symbols.join(",")}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro na API CoinMarketCap: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (data.status?.error_code && data.status.error_code !== 0) {
      throw new Error(`Erro da API: ${data.status.error_message}`);
    }

    // Extrair preços
    const prices: { [key: string]: number } = {};

    for (const symbol of symbols) {
      if (data.data && data.data[symbol]) {
        prices[symbol] = data.data[symbol].quote.USD.price;
      }
    }

    // Atualizar timestamp da última atualização
    lastUpdateTime = Date.now();

    console.log("Preços atualizados com sucesso:", prices);
    return prices;
  } catch (error) {
    toast.error("Erro ao atualizar preços das criptomoedas");
    console.error("Erro ao buscar preços de criptomoedas:", error instanceof Error ? error.message : String(error));
    return {};
  }
};

// Função para atualizar os preços dos ativos
export const updateCryptoPrices = async (assets, setAssets) => {
  try {
    // Extrair apenas os tickers BTC, ETH, SOL - aqueles com preços reais
    const symbols = assets
      .filter(asset => ["BTC", "ETH", "SOL"].includes(asset.ticker))
      .map(asset => asset.ticker);
    
    if (symbols.length === 0) {
      console.log("Nenhum símbolo de criptomoeda válido para atualizar");
      return;
    }
    
    const prices = await fetchCryptoPrices(symbols);
    
    // Atualizar os ativos com os novos preços
    if (Object.keys(prices).length > 0) {
      setAssets(prev => 
        prev.map(asset => {
          if (prices[asset.ticker]) {
            const newPrice = prices[asset.ticker];
            const newTotal = asset.quantity * newPrice;
            const newTotalBRL = newTotal * 5.62; // Taxa de câmbio fixa para exemplo
            
            return {
              ...asset,
              price: newPrice,
              total: parseFloat(newTotal.toFixed(2)),
              totalBRL: parseFloat(newTotalBRL.toFixed(2)),
            };
          }
          return asset;
        })
      );
      
      console.log("Ativos atualizados com sucesso!");
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Erro ao atualizar preços dos ativos:", error);
    return false;
  }
};

// Verifica se é necessária uma atualização automática
export const shouldAutoUpdate = (): boolean => {
  const now = Date.now();
  const twelveHoursInMs = 12 * 60 * 60 * 1000; // 12 horas em milissegundos
  
  // Retorna true se passaram 12 horas desde a última atualização
  return (now - getLastUpdateTime()) > twelveHoursInMs;
};
