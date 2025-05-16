
import { toast } from "sonner";

const API_KEY = "e341ff27-5e33-4c6d-a3f1-08646d086fec"; // Chave API fornecida
const BASE_URL = "https://pro-api.coinmarketcap.com/v1";

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

export const fetchCryptoPrices = async (symbols: string[]): Promise<Record<string, CoinMarketCapData> | null> => {
  try {
    if (!API_KEY) {
      toast.error("Chave da API do CoinMarketCap não encontrada.");
      return null;
    }

    const response = await fetch(`${BASE_URL}/cryptocurrency/quotes/latest?symbol=${symbols.join(",")}`, {
      headers: {
        "X-CMC_PRO_API_KEY": API_KEY,
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(`Erro na API: ${errorData.status?.error_message || "Erro desconhecido"}`);
      return null;
    }

    const data: CoinMarketCapResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error("Erro ao buscar preços das criptomoedas:", error);
    toast.error("Não foi possível atualizar os preços das criptomoedas. Tente novamente mais tarde.");
    return null;
  }
};

// Armazena a última vez que os preços foram atualizados
let lastUpdateTime: number = 0;

export const updateCryptoPrices = async (
  assets: any[],
  setAssets: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const symbols = assets.map((asset) => asset.ticker).filter((ticker) => ticker !== "NOVO");
  
  if (symbols.length === 0) return;
  
  // Atualiza o timestamp da última atualização
  lastUpdateTime = Date.now();
  
  const data = await fetchCryptoPrices(symbols);
  
  if (!data) return;
  
  setAssets((prevAssets) => {
    return prevAssets.map((asset) => {
      const cryptoData = data[asset.ticker];
      
      if (cryptoData) {
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
};

// Verifica se é necessária uma atualização automática
export const shouldAutoUpdate = (): boolean => {
  const now = Date.now();
  const twelveHoursInMs = 12 * 60 * 60 * 1000; // 12 horas em milissegundos
  
  // Retorna true se passaram 12 horas desde a última atualização
  return (now - lastUpdateTime) >= twelveHoursInMs;
};
