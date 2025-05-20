import { toast } from '@/components/ui/sonner';

const API_KEY = 'e341ff27-5e33-4c6d-a3f1-08646d086fec';
const BASE_URL = 'https://pro-api.coinmarketcap.com/v1';

// Armazenar a última vez que os preços foram atualizados
let lastUpdateTime = 0;

// Função para obter a última atualização
export const getLastUpdateTime = () => lastUpdateTime;

// Função para obter preços de criptomoedas
export const fetchCryptoPrices = async (symbols: string[]) => {
  try {
    if (!symbols || symbols.length === 0) {
      console.log("Nenhum símbolo de criptomoeda fornecido para atualização");
      return {
        prices: {},
        changes: {}
      };
    }

    console.log("Iniciando busca por preços para:", symbols.join(", "));

    // Cria URL com os símbolos das criptomoedas
    const url = `/api/coinmarketcap/v2/cryptocurrency/quotes/latest?symbol=${symbols.join(",")}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro na API CoinMarketCap: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Resposta da API:", data); // Debug

    if (data.status?.error_code && data.status.error_code !== 0) {
      throw new Error(`Erro da API: ${data.status.error_message}`);
    }

    // Extrair preços e variações
    const prices: { [key: string]: number } = {};
    const changes: { [key: string]: number } = {};

    for (const symbol of symbols) {
      if (data.data && data.data[symbol] && data.data[symbol].quote && data.data[symbol].quote.USD) {
        const quote = data.data[symbol].quote.USD;
        prices[symbol] = Number(quote.price);
        changes[symbol] = Number(quote.percent_change_24h);
        
        console.log(`Preço atualizado para ${symbol}:`, prices[symbol]); // Debug
        console.log(`Variação 24h para ${symbol}:`, changes[symbol]); // Debug
      } else {
        console.warn(`Dados ausentes ou inválidos para ${symbol}`);
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
export const updateCryptoPrices = async (assets, setAssets) => {
  try {
    // Extrair apenas os tickers BTC, ETH, SOL - aqueles com preços reais
    const symbols = assets
      .filter(asset => ["BTC", "ETH", "SOL"].includes(asset.ticker))
      .map(asset => asset.ticker);
    
    if (symbols.length === 0) {
      console.log("Nenhum símbolo de criptomoeda válido para atualizar");
      return false;
    }
    
    const { prices, changes } = await fetchCryptoPrices(symbols);
    console.log("Preços recebidos:", prices); // Debug
    console.log("Variações recebidas:", changes); // Debug
    
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
            }); // Debug
            
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

// Função para buscar detalhes de uma criptomoeda específica
export const fetchCryptoDetails = async (symbol: string) => {
  try {
    const url = `/api/coinmarketcap/v2/cryptocurrency/info?symbol=${symbol}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar detalhes da criptomoeda: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status?.error_code && data.status.error_code !== 0) {
      throw new Error(`Erro da API: ${data.status.error_message}`);
    }

    return data.data[symbol];
  } catch (error) {
    toast.error("Erro ao buscar detalhes da criptomoeda");
    console.error("Erro:", error);
    return null;
  }
};

// Função para buscar lista de criptomoedas
export const fetchCryptoList = async (limit: number = 100) => {
  try {
    const url = `/api/coinmarketcap/v2/cryptocurrency/listings/latest?limit=${limit}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar lista de criptomoedas: ${response.status}`);
    }

    const data = await response.json();

    if (data.status?.error_code && data.status.error_code !== 0) {
      throw new Error(`Erro da API: ${data.status.error_message}`);
    }

    return data.data.map(crypto => ({
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      price: crypto.quote.USD.price,
      change24h: crypto.quote.USD.percent_change_24h,
      marketCap: crypto.quote.USD.market_cap,
      volume24h: crypto.quote.USD.volume_24h
    }));
  } catch (error) {
    toast.error("Erro ao buscar lista de criptomoedas");
    console.error("Erro:", error);
    return [];
  }
};