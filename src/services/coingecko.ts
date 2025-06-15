
import { toast } from "sonner";

const BASE_URL = 'https://api.coingecko.com/api/v3';

// Mapeamento de tickers para IDs do CoinGecko
const TICKER_TO_ID_MAP: { [key: string]: string } = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'SOL': 'solana',
  'ADA': 'cardano',
  'DOT': 'polkadot',
  'LINK': 'chainlink',
  'UNI': 'uniswap',
  'AVAX': 'avalanche-2',
  'MATIC': 'matic-network',
  'LTC': 'litecoin',
  'BCH': 'bitcoin-cash',
  'XRP': 'ripple',
  'DOGE': 'dogecoin',
  'SHIB': 'shiba-inu',
  'TRX': 'tron',
  'ATOM': 'cosmos',
  'NEAR': 'near',
  'FTM': 'fantom',
  'ALGO': 'algorand',
  'ICP': 'internet-computer'
};

// Armazenar a última vez que os preços foram atualizados
let lastUpdateTime = 0;

// Função para obter a última atualização
export const getLastUpdateTime = () => lastUpdateTime;

// Função para converter ticker para ID do CoinGecko
const getCoingeckoId = (ticker: string): string => {
  return TICKER_TO_ID_MAP[ticker.toUpperCase()] || ticker.toLowerCase();
};

// Função para obter preços de criptomoedas via CoinGecko
export const fetchCryptoPrices = async (tickers: string[]) => {
  try {
    if (!tickers || tickers.length === 0) {
      console.log("Nenhum ticker fornecido para atualização");
      return {
        prices: {},
        changes: {}
      };
    }

    console.log("Iniciando busca por preços para:", tickers.join(", "));

    // Converter tickers para IDs do CoinGecko
    const coingeckoIds = tickers.map(ticker => getCoingeckoId(ticker)).join(',');
    
    const url = `${BASE_URL}/simple/price?ids=${coingeckoIds}&vs_currencies=usd&include_24hr_change=true`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na API CoinGecko: ${response.status}`);
    }

    const data = await response.json();
    console.log("Resposta da API CoinGecko:", data);

    // Extrair preços e variações
    const prices: { [key: string]: number } = {};
    const changes: { [key: string]: number } = {};

    for (const ticker of tickers) {
      const coingeckoId = getCoingeckoId(ticker);
      
      if (data[coingeckoId]) {
        const coinData = data[coingeckoId];
        prices[ticker] = coinData.usd;
        changes[ticker] = coinData.usd_24h_change || 0;
        
        console.log(`Preço atualizado para ${ticker}:`, prices[ticker]);
        console.log(`Variação 24h para ${ticker}:`, changes[ticker]);
      } else {
        console.warn(`Dados ausentes para ${ticker} (ID: ${coingeckoId})`);
      }
    }

    // Atualizar timestamp da última atualização
    lastUpdateTime = Date.now();

    return {
      prices,
      changes
    };
  } catch (error) {
    console.error("Erro ao buscar preços de criptomoedas:", error);
    toast.error("Erro ao atualizar preços das criptomoedas");
    return {
      prices: {},
      changes: {}
    };
  }
};

// Função para atualizar os preços dos ativos
export const updateCryptoPrices = async (assets: any[], setAssets: (updater: (prev: any[]) => any[]) => void) => {
  try {
    // Extrair apenas os tickers válidos
    const tickers = assets
      .filter(asset => asset.ticker && asset.ticker !== "ALC" && asset.ticker !== "POOL")
      .map(asset => asset.ticker);
    
    if (tickers.length === 0) {
      console.log("Nenhum ticker válido para atualizar");
      return false;
    }
    
    const { prices, changes } = await fetchCryptoPrices(tickers);
    console.log("Preços recebidos:", prices);
    console.log("Variações recebidas:", changes);
    
    if (Object.keys(prices).length > 0) {
      setAssets(prev => 
        prev.map(asset => {
          if (prices[asset.ticker]) {
            const newPrice = prices[asset.ticker];
            const newChange = changes[asset.ticker];
            const newTotal = asset.quantity * newPrice;
            const newTotalBRL = newTotal * 5.62; // Taxa de câmbio fixa para exemplo
            
            console.log(`Atualizando ${asset.ticker}:`, {
              preço: newPrice,
              variação: newChange,
              total: newTotal,
              totalBRL: newTotalBRL
            });
            
            return {
              ...asset,
              price: newPrice,
              change: parseFloat(newChange.toFixed(2)),
              total: parseFloat(newTotal.toFixed(2)),
              totalBRL: parseFloat(newTotalBRL.toFixed(2)),
            };
          }
          return asset;
        })
      );
      
      toast.success("Preços atualizados com sucesso!");
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Erro ao atualizar preços dos ativos:", error);
    toast.error("Falha ao atualizar preços");
    return false;
  }
};

// Verifica se é necessária uma atualização automática
export const shouldAutoUpdate = (): boolean => {
  const now = Date.now();
  const twelveHoursInMs = 12 * 60 * 60 * 1000; // 12 horas em milissegundos
  return (now - getLastUpdateTime()) > twelveHoursInMs;
};
