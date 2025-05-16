
import { toast } from "sonner";

// Usar a sintaxe correta do Vite para variáveis de ambiente
const API_KEY = "e341ff27-5e33-4c6d-a3f1-08646d086fec";
const BASE_URL = "https://pro-api.coinmarketcap.com/v1";
const PROXY_URL = "/api/coinmarketcap"; // Opcional: para contornar CORS se necessário

export interface CoinMarketCapQuote {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  last_updated: string;
}

export interface CoinMarketCapData {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  last_updated: string;
  date_added: string;
  tags: string[];
  quote: {
    USD: CoinMarketCapQuote;
  };
}

export interface CoinMarketCapResponse {
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
    notice: string | null;
  };
  data: Record<string, CoinMarketCapData>;
}

// Armazena a última vez que os preços foram atualizados
let lastUpdateTime: number = 0;

// Função para buscar preços de criptomoedas
export const fetchCryptoPrices = async (symbols: string[]): Promise<Record<string, CoinMarketCapData> | null> => {
  try {
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
      console.error("Erro na resposta da API:", errorText);
      toast.error(`Erro na API: ${response.status} ${response.statusText}`);
      return null;
    }

    const data: CoinMarketCapResponse = await response.json();
    console.log("Dados recebidos da API:", data);
    
    if (data.status && data.status.error_code !== 0) {
      toast.error(`Erro na API: ${data.status.error_message || "Erro desconhecido"}`);
      return null;
    }

    return data.data;
  } catch (error) {
    console.error("Erro ao buscar preços das criptomoedas:", error);
    toast.error("Não foi possível atualizar os preços das criptomoedas: " + (error instanceof Error ? error.message : String(error)));
    return null;
  }
};

// Função para atualizar preços no estado da aplicação
export const updateCryptoPrices = async (
  assets: any[],
  setAssets: React.Dispatch<React.SetStateAction<any[]>>
) => {
  try {
    const symbols = assets.map((asset) => asset.ticker).filter((ticker) => ticker !== "NOVO");
    
    if (symbols.length === 0) {
      toast.info("Nenhuma criptomoeda para atualizar");
      return;
    }
    
    console.log("Atualizando preços para:", symbols);
    
    // Atualiza o timestamp da última atualização
    lastUpdateTime = Date.now();
    
    toast.loading("Buscando preços atualizados...");
    
    const data = await fetchCryptoPrices(symbols);
    
    if (!data) {
      toast.error("Falha ao buscar preços atualizados");
      return;
    }
    
    // Registra quais símbolos foram encontrados
    const foundSymbols = Object.keys(data);
    console.log("Símbolos encontrados:", foundSymbols);
    
    // Símbolos não encontrados
    const missingSymbols = symbols.filter(symbol => !foundSymbols.includes(symbol));
    if (missingSymbols.length > 0) {
      console.warn("Símbolos não encontrados:", missingSymbols);
      toast.warning(`Alguns símbolos não encontrados: ${missingSymbols.join(", ")}`);
    }
    
    setAssets((prevAssets) => {
      return prevAssets.map((asset) => {
        const cryptoData = data[asset.ticker];
        
        if (cryptoData && cryptoData.quote && cryptoData.quote.USD) {
          const newPrice = cryptoData.quote.USD.price;
          const newChange = cryptoData.quote.USD.percent_change_24h;
          const newTotal = asset.quantity * newPrice;
          const newTotalBRL = newTotal * 5.62; // Taxa de câmbio fixa para exemplo
          
          return {
            ...asset,
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat(newChange.toFixed(2)),
            total: parseFloat(newTotal.toFixed(2)),
            totalBRL: parseFloat(newTotalBRL.toFixed(2)),
          };
        }
        
        return asset;
      });
    });
    
    toast.success("Preços das criptomoedas atualizados com sucesso!");
  } catch (error) {
    console.error("Erro durante atualização de preços:", error);
    toast.error("Erro ao atualizar preços: " + (error instanceof Error ? error.message : String(error)));
  }
};

// Verifica se é necessária uma atualização automática
export const shouldAutoUpdate = (): boolean => {
  const now = Date.now();
  const twelveHoursInMs = 12 * 60 * 60 * 1000; // 12 horas em milissegundos
  
  // Retorna true se passaram 12 horas desde a última atualização
  return (now - getLastUpdateTime()) > twelveHoursInMs;rn (now - lastUpdateTime) >= twelveHoursInMs;
};
