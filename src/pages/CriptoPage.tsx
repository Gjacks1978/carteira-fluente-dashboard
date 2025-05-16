import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, RefreshCw } from "lucide-react";
import { CriptoAsset, TableColumn } from "@/components/crypto/types";
import { CryptoSummaryCards } from "@/components/crypto/CryptoSummaryCards";
import AssetTable from "@/components/crypto/AssetTable";
import PortfolioSummaryCard from "@/components/crypto/PortfolioSummaryCard";
import { updateCryptoPrices } from "@/services/coinmarketcap";

export default function CriptoPage() {
  const [assets, setAssets] = useState<CriptoAsset[]>([
    {
      id: "1",
      ticker: "BTC",
      network: "BTC",
      price: 103027.99,
      quantity: 0.6,
      total: 61810.14,
      totalBRL: 347247.08,
      change: 1.77,
      custodian: "Gate",
      allocation: 65.89,
      sector: "Store of Value",
      lend: 0.2,
      borrow: 0,
    },
    {
      id: "2",
      ticker: "ETH",
      network: "ETH",
      price: 2527.67,
      quantity: 6.18,
      total: 15610.36,
      totalBRL: 87698.63,
      change: 0.72,
      custodian: "Meta/S1/Bravo",
      allocation: 16.64,
      sector: "Smart Contract",
      lend: 1.5,
      borrow: 0,
    },
    {
      id: "3",
      ticker: "SOL",
      network: "SOL",
      price: 169.26,
      quantity: 22.33,
      total: 3779.48,
      totalBRL: 21233.05,
      change: 1.84,
      custodian: "Phantom/S1/KAM",
      allocation: 4.03,
      sector: "Smart Contract",
      lend: 0,
      borrow: 0,
    },
    {
      id: "4",
      ticker: "ALC",
      network: "VÁRIOS",
      price: 0,
      quantity: 0,
      total: 4929.19,
      totalBRL: 27692.42,
      change: 0.07,
      custodian: "Vários",
      allocation: 5.25,
      sector: "Altcoins",
      lend: 0,
      borrow: 0,
    },
    {
      id: "5",
      ticker: "POOL",
      network: "VÁRIOS",
      price: 0,
      quantity: 0,
      total: 11523.24,
      totalBRL: 64737.3,
      change: 0.03,
      custodian: "Vários",
      allocation: 12.28,
      sector: "DeFi",
      lend: 5.2,
      borrow: 2.1,
    },
  ]);
  const [sectors, setSectors] = useState<string[]>([
    "Store of Value",
    "Smart Contract",
    "DeFi",
    "Gaming",
    "Metaverse",
    "Altcoins",
    "Layer 2",
    "Infrastructure",
  ]);
  const [custodians, setCustodians] = useState<string[]>([
    "Gate",
    "Meta/S1/Bravo",
    "Phantom/S1/KAM",
    "Vários",
    "Binance",
    "Coinbase",
  ]);
  const [columns, setColumns] = useState<TableColumn[]>([
    {
      id: "ticker",
      title: "Ticker",
      visible: true,
      order: 0,
    },
    {
      id: "network",
      title: "Rede",
      visible: true,
      order: 1,
    },
    {
      id: "sector",
      title: "Setor",
      visible: true,
      order: 2,
    },
    {
      id: "price",
      title: "Preço (USD)",
      visible: true,
      order: 3,
    },
    {
      id: "quantity",
      title: "Quantidade",
      visible: true,
      order: 4,
    },
    {
      id: "total",
      title: "Total (USD)",
      visible: true,
      order: 5,
    },
    {
      id: "totalBRL",
      title: "Total (BRL)",
      visible: true,
      order: 6,
    },
    {
      id: "change",
      title: "Variação 24h",
      visible: true,
      order: 7,
    },
    {
      id: "custodian",
      title: "Custódia",
      visible: true,
      order: 8,
    },
    {
      id: "lend",
      title: "Lend",
      visible: true,
      order: 9,
    },
    {
      id: "borrow",
      title: "Borrow",
      visible: true,
      order: 10,
    },
    {
      id: "allocation",
      title: "% Carteira",
      visible: true,
      order: 11,
    },
  ]);
  const [draggedRowId, setDraggedRowId] = useState<string | null>(null);
  const [draggedColId, setDraggedColId] = useState<string | null>(null);
  const [openSector, setOpenSector] = useState<string | null>(null);
  const [openCustodian, setOpenCustodian] = useState<string | null>(null);

  const totalPortfolio = assets.reduce((sum, asset) => sum + asset.total, 0);
  const totalPortfolioBRL = assets.reduce((sum, asset) => sum + asset.totalBRL, 0);
  const totalLend = assets.reduce((sum, asset) => sum + asset.lend, 0);
  const totalBorrow = assets.reduce((sum, asset) => sum + asset.borrow, 0);

  // Handler functions
  const handleChangeQuantity = (id: string, newQuantity: number) => {
    setAssets(
      assets.map((asset) => {
        if (asset.id === id) {
          const newTotal = newQuantity * asset.price;
          const newTotalBRL = newTotal * 5.62; // Taxa de câmbio fixa para exemplo
          return {
            ...asset,
            quantity: newQuantity,
            total: parseFloat(newTotal.toFixed(2)),
            totalBRL: parseFloat(newTotalBRL.toFixed(2)),
          };
        }
        return asset;
      })
    );
  };

  const handleChangeTotal = (id: string, newTotal: number) => {
    setAssets(
      assets.map((asset) => {
        if (asset.id === id) {
          const newQuantity = asset.price > 0 ? newTotal / asset.price : 0;
          const newTotalBRL = newTotal * 5.62; // Taxa de câmbio fixa para exemplo
          return {
            ...asset,
            quantity: parseFloat(newQuantity.toFixed(8)),
            total: newTotal,
            totalBRL: parseFloat(newTotalBRL.toFixed(2)),
          };
        }
        return asset;
      })
    );
  };

  const handleChangeTicker = (id: string, newTicker: string) => {
    setAssets(
      assets.map((asset) => {
        if (asset.id === id) {
          return {
            ...asset,
            ticker: newTicker,
          };
        }
        return asset;
      })
    );
  };

  const handleChangeNetwork = (id: string, newNetwork: string) => {
    setAssets(
      assets.map((asset) => {
        if (asset.id === id) {
          return {
            ...asset,
            network: newNetwork,
          };
        }
        return asset;
      })
    );
  };

  const handleChangeCustodian = (id: string, newCustodian: string) => {
    setAssets(
      assets.map((asset) => {
        if (asset.id === id) {
          return {
            ...asset,
            custodian: newCustodian,
          };
        }
        return asset;
      })
    );
  };

  const handleChangeSector = (id: string, newSector: string) => {
    setAssets(
      assets.map((asset) => {
        if (asset.id === id) {
          return {
            ...asset,
            sector: newSector,
          };
        }
        return asset;
      })
    );
  };

  const handleChangeLend = (id: string, newLend: number) => {
    setAssets(
      assets.map((asset) => {
        if (asset.id === id) {
          return {
            ...asset,
            lend: newLend,
          };
        }
        return asset;
      })
    );
  };

  const handleChangeBorrow = (id: string, newBorrow: number) => {
    setAssets(
      assets.map((asset) => {
        if (asset.id === id) {
          return {
            ...asset,
            borrow: newBorrow,
          };
        }
        return asset;
      })
    );
  };

  const addNewSector = (newSector: string) => {
    if (newSector && !sectors.includes(newSector)) {
      setSectors([...sectors, newSector]);
      toast.success("Novo setor adicionado com sucesso!");
      return true;
    } else if (sectors.includes(newSector)) {
      toast.error("Este setor já existe!");
      return false;
    }
    return false;
  };

  const addNewCustodian = (newCustodian: string) => {
    if (newCustodian && !custodians.includes(newCustodian)) {
      setCustodians([...custodians, newCustodian]);
      toast.success("Nova custódia adicionada com sucesso!");
      return true;
    } else if (custodians.includes(newCustodian)) {
      toast.error("Esta custódia já existe!");
      return false;
    }
    return false;
  };

  const addNewAsset = () => {
    const newId = (Math.max(...assets.map((asset) => parseInt(asset.id))) + 1).toString();
    const newAsset: CriptoAsset = {
      id: newId,
      ticker: "NOVO",
      network: "REDE",
      price: 0,
      quantity: 0,
      total: 0,
      totalBRL: 0,
      change: 0,
      custodian: custodians[0] || "Nova Custódia",
      allocation: 0,
      sector: sectors[0] || "Novo Setor",
      lend: 0,
      borrow: 0,
    };
    setAssets([...assets, newAsset]);
    toast.success("Nova criptomoeda adicionada com sucesso!");
  };

  const deleteAsset = (id: string) => {
    setAssets(assets.filter((asset) => asset.id !== id));
    toast.success("Criptomoeda removida com sucesso!");
  };

  const deleteSector = (sectorToDelete: string) => {
    if (assets.some((asset) => asset.sector === sectorToDelete)) {
      toast.error("Este setor está em uso e não pode ser excluído!");
      return;
    }
    setSectors(sectors.filter((sector) => sector !== sectorToDelete));
    toast.success("Setor removido com sucesso!");
  };

  const deleteCustodian = (custodianToDelete: string) => {
    if (assets.some((asset) => asset.custodian === custodianToDelete)) {
      toast.error("Esta custódia está em uso e não pode ser excluída!");
      return;
    }
    setCustodians(custodians.filter((custodian) => custodian !== custodianToDelete));
    toast.success("Custódia removida com sucesso!");
  };

  // Recalcula as alocações percentuais baseado no total do portfólio
  const calculateAllocations = () => {
    if (totalPortfolio === 0) return;
    setAssets(
      assets.map((asset) => ({
        ...asset,
        allocation: parseFloat(((asset.total / totalPortfolio) * 100).toFixed(2)),
      }))
    );
    toast.success("Alocações recalculadas!");
  };

  // Funções para arrastar linhas
  const handleDragStart = (id: string) => {
    setDraggedRowId(id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedRowId && draggedRowId !== id) {
      const draggedIndex = assets.findIndex((asset) => asset.id === draggedRowId);
      const targetIndex = assets.findIndex((asset) => asset.id === id);
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newAssets = [...assets];
        const draggedItem = newAssets[draggedIndex];

        // Remove o item arrastado
        newAssets.splice(draggedIndex, 1);
        // Insere o item na posição de destino
        newAssets.splice(targetIndex, 0, draggedItem);
        setAssets(newAssets);
      }
    }
  };

  const handleDragEnd = () => {
    setDraggedRowId(null);
    calculateAllocations();
  };

  // Funções para reordenar colunas
  const handleColumnDragStart = (e: React.DragEvent, id: string) => {
    setDraggedColId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleColumnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleColumnDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (draggedColId && draggedColId !== targetId) {
      setColumns((prevColumns) => {
        const newColumns = [...prevColumns];
        const draggedIndex = newColumns.findIndex((col) => col.id === draggedColId);
        const targetIndex = newColumns.findIndex((col) => col.id === targetId);
        if (draggedIndex !== -1 && targetIndex !== -1) {
          // Swap order values
          const draggedOrder = newColumns[draggedIndex].order;
          const targetOrder = newColumns[targetIndex].order;
          newColumns[draggedIndex] = {
            ...newColumns[draggedIndex],
            order: targetOrder,
          };
          newColumns[targetIndex] = {
            ...newColumns[targetIndex],
            order: draggedOrder,
          };
          return newColumns.sort((a, b) => a.order - b.order);
        }
        return prevColumns;
      });
    }
    setDraggedColId(null);
  };

  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);

  // Estado para controlar o carregamento
  const [isLoading, setIsLoading] = useState(false);
  
  // Função para atualizar preços de criptomoedas
  const refreshCryptoPrices = async () => {
    try {
      setIsLoading(true);
      toast.info("Iniciando atualização de preços...");
      
      await updateCryptoPrices(assets, setAssets);
      calculateAllocations();
      
      toast.success("Atualização de preços concluída com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar preços:", error);
      toast.error("Falha ao atualizar preços: " + (error instanceof Error ? error.message : "Erro desconhecido"));
    } finally {
      setIsLoading(false);
    }
  };

  // Atualizar preços quando a página carrega e verificar a cada hora se é necessário atualizar (a cada 12h)
  useEffect(() => {
    // Atualizar preços ao carregar a página
    refreshCryptoPrices();
    
    // Verificar a cada hora se precisa atualizar (12 horas desde a última atualização)
    const interval = setInterval(() => {
      // Importar diretamente a função shouldAutoUpdate
      import("@/services/coinmarketcap").then(({ shouldAutoUpdate }) => {
        if (shouldAutoUpdate()) {
          refreshCryptoPrices();
          toast.info("Atualização automática de preços realizada (12h)");
        }
      });
    }, 60 * 60 * 1000); // Verifica a cada hora se é necessário atualizar
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Carteira de Criptomoedas</h1>
        <div className="flex gap-2">
          <Button 
            onClick={refreshCryptoPrices} 
            variant="outline" 
            className="flex items-center gap-2"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Atualizando...' : 'Atualizar Preços Manualmente'}
          </Button>
          <Button onClick={addNewAsset} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Adicionar Criptomoeda
          </Button>
        </div>
      </div>

      <CryptoSummaryCards assets={assets} />

      <PortfolioSummaryCard
        totalPortfolio={totalPortfolio}
        totalPortfolioBRL={totalPortfolioBRL}
        calculateAllocations={calculateAllocations}
      />

      <div className="overflow-x-auto">
        <AssetTable
          assets={assets}
          sortedColumns={sortedColumns}
          sectors={sectors}
          custodians={custodians}
          openSector={openSector}
          setOpenSector={setOpenSector}
          openCustodian={openCustodian}
          setOpenCustodian={setOpenCustodian}
          handleChangeTicker={handleChangeTicker}
          handleChangeNetwork={handleChangeNetwork}
          handleChangeSector={handleChangeSector}
          handleChangeCustodian={handleChangeCustodian}
          handleChangeQuantity={handleChangeQuantity}
          handleChangeTotal={handleChangeTotal}
          handleChangeLend={handleChangeLend}
          handleChangeBorrow={handleChangeBorrow}
          addNewSector={addNewSector}
          deleteSector={deleteSector}
          addNewCustodian={addNewCustodian}
          deleteCustodian={deleteCustodian}
          deleteAsset={deleteAsset}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDragEnd={handleDragEnd}
          handleColumnDragStart={handleColumnDragStart}
          handleColumnDragOver={handleColumnDragOver}
          handleColumnDrop={handleColumnDrop}
          totalPortfolio={totalPortfolio}
          totalPortfolioBRL={totalPortfolioBRL}
          totalLend={totalLend}
          totalBorrow={totalBorrow}
        />
      </div>
    </div>
  );
}