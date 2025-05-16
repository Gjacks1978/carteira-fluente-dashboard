import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, ChevronDown, MoveVertical, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface CriptoAsset {
  id: string;
  ticker: string;
  network: string;
  price: number;
  quantity: number;
  total: number;
  totalBRL: number;
  change: number;
  custodian: string;
  allocation: number;
  sector: string;
  lend: number;
  borrow: number;
}

interface TableColumn {
  id: string;
  title: string;
  visible: boolean;
  order: number;
}

export default function CriptoPage() {
  const [assets, setAssets] = useState<CriptoAsset[]>([{
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
    borrow: 0
  }, {
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
    borrow: 0
  }, {
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
    borrow: 0
  }, {
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
    borrow: 0
  }, {
    id: "5",
    ticker: "POOL",
    network: "VÁRIOS",
    price: 0,
    quantity: 0,
    total: 11523.24,
    totalBRL: 64737.30,
    change: 0.03,
    custodian: "Vários",
    allocation: 12.28,
    sector: "DeFi",
    lend: 5.2,
    borrow: 2.1
  }]);
  const [sectors, setSectors] = useState<string[]>(["Store of Value", "Smart Contract", "DeFi", "Gaming", "Metaverse", "Altcoins", "Layer 2", "Infrastructure"]);
  const [custodians, setCustodians] = useState<string[]>(["Gate", "Meta/S1/Bravo", "Phantom/S1/KAM", "Vários", "Binance", "Coinbase"]);
  const [columns, setColumns] = useState<TableColumn[]>([{
    id: "ticker",
    title: "Ticker",
    visible: true,
    order: 0
  }, {
    id: "network",
    title: "Rede",
    visible: true,
    order: 1
  }, {
    id: "sector",
    title: "Setor",
    visible: true,
    order: 2
  }, {
    id: "price",
    title: "Preço (USD)",
    visible: true,
    order: 3
  }, {
    id: "quantity",
    title: "Quantidade",
    visible: true,
    order: 4
  }, {
    id: "total",
    title: "Total (USD)",
    visible: true,
    order: 5
  }, {
    id: "totalBRL",
    title: "Total (BRL)",
    visible: true,
    order: 6
  }, {
    id: "change",
    title: "Variação 24h",
    visible: true,
    order: 7
  }, {
    id: "custodian",
    title: "Custódia",
    visible: true,
    order: 8
  }, {
    id: "lend",
    title: "Lend",
    visible: true,
    order: 9
  }, {
    id: "borrow",
    title: "Borrow",
    visible: true,
    order: 10
  }, {
    id: "allocation",
    title: "% Carteira",
    visible: true,
    order: 11
  }]);
  const [newSector, setNewSector] = useState("");
  const [newCustodian, setNewCustodian] = useState("");
  const [draggedRowId, setDraggedRowId] = useState<string | null>(null);
  const [draggedColId, setDraggedColId] = useState<string | null>(null);
  const [openSector, setOpenSector] = useState<string | null>(null);
  const [openCustodian, setOpenCustodian] = useState<string | null>(null);
  const totalPortfolio = assets.reduce((sum, asset) => sum + asset.total, 0);
  const totalPortfolioBRL = assets.reduce((sum, asset) => sum + asset.totalBRL, 0);
  const totalLend = assets.reduce((sum, asset) => sum + asset.lend, 0);
  const totalBorrow = assets.reduce((sum, asset) => sum + asset.borrow, 0);
  
  const handleChangeQuantity = (id: string, newQuantity: number) => {
    setAssets(assets.map(asset => {
      if (asset.id === id) {
        const newTotal = newQuantity * asset.price;
        const newTotalBRL = newTotal * 5.62; // Taxa de câmbio fixa para exemplo
        return {
          ...asset,
          quantity: newQuantity,
          total: parseFloat(newTotal.toFixed(2)),
          totalBRL: parseFloat(newTotalBRL.toFixed(2))
        };
      }
      return asset;
    }));
  };
  
  const handleChangeTotal = (id: string, newTotal: number) => {
    setAssets(assets.map(asset => {
      if (asset.id === id) {
        const newQuantity = asset.price > 0 ? newTotal / asset.price : 0;
        const newTotalBRL = newTotal * 5.62; // Taxa de câmbio fixa para exemplo
        return {
          ...asset,
          quantity: parseFloat(newQuantity.toFixed(8)),
          total: newTotal,
          totalBRL: parseFloat(newTotalBRL.toFixed(2))
        };
      }
      return asset;
    }));
  };
  
  const handleChangeTicker = (id: string, newTicker: string) => {
    setAssets(assets.map(asset => {
      if (asset.id === id) {
        return {
          ...asset,
          ticker: newTicker
        };
      }
      return asset;
    }));
  };
  
  const handleChangeNetwork = (id: string, newNetwork: string) => {
    setAssets(assets.map(asset => {
      if (asset.id === id) {
        return {
          ...asset,
          network: newNetwork
        };
      }
      return asset;
    }));
  };
  
  const handleChangeCustodian = (id: string, newCustodian: string) => {
    setAssets(assets.map(asset => {
      if (asset.id === id) {
        return {
          ...asset,
          custodian: newCustodian
        };
      }
      return asset;
    }));
  };
  
  const handleChangeSector = (id: string, newSector: string) => {
    setAssets(assets.map(asset => {
      if (asset.id === id) {
        return {
          ...asset,
          sector: newSector
        };
      }
      return asset;
    }));
  };
  
  const handleChangeLend = (id: string, newLend: number) => {
    setAssets(assets.map(asset => {
      if (asset.id === id) {
        return {
          ...asset,
          lend: newLend
        };
      }
      return asset;
    }));
  };
  
  const handleChangeBorrow = (id: string, newBorrow: number) => {
    setAssets(assets.map(asset => {
      if (asset.id === id) {
        return {
          ...asset,
          borrow: newBorrow
        };
      }
      return asset;
    }));
  };
  
  const addNewSector = () => {
    if (newSector && !sectors.includes(newSector)) {
      setSectors([...sectors, newSector]);
      setNewSector("");
      toast.success("Novo setor adicionado com sucesso!");
    } else if (sectors.includes(newSector)) {
      toast.error("Este setor já existe!");
    }
  };
  
  const addNewCustodian = () => {
    if (newCustodian && !custodians.includes(newCustodian)) {
      setCustodians([...custodians, newCustodian]);
      setNewCustodian("");
      toast.success("Nova custódia adicionada com sucesso!");
    } else if (custodians.includes(newCustodian)) {
      toast.error("Esta custódia já existe!");
    }
  };
  
  const addNewAsset = () => {
    const newId = (Math.max(...assets.map(asset => parseInt(asset.id))) + 1).toString();
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
      borrow: 0
    };
    setAssets([...assets, newAsset]);
    toast.success("Nova criptomoeda adicionada com sucesso!");
  };
  
  const deleteAsset = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
    toast.success("Criptomoeda removida com sucesso!");
  };
  
  const deleteSector = (sectorToDelete: string) => {
    if (assets.some(asset => asset.sector === sectorToDelete)) {
      toast.error("Este setor está em uso e não pode ser excluído!");
      return;
    }
    setSectors(sectors.filter(sector => sector !== sectorToDelete));
    toast.success("Setor removido com sucesso!");
  };
  
  const deleteCustodian = (custodianToDelete: string) => {
    if (assets.some(asset => asset.custodian === custodianToDelete)) {
      toast.error("Esta custódia está em uso e não pode ser excluída!");
      return;
    }
    setCustodians(custodians.filter(custodian => custodian !== custodianToDelete));
    toast.success("Custódia removida com sucesso!");
  };

  // Recalcula as alocações percentuais baseado no total do portfólio
  const calculateAllocations = () => {
    if (totalPortfolio === 0) return;
    setAssets(assets.map(asset => ({
      ...asset,
      allocation: parseFloat((asset.total / totalPortfolio * 100).toFixed(2))
    })));
    toast.success("Alocações recalculadas!");
  };

  // Funções para arrastar linhas
  const handleDragStart = (id: string) => {
    setDraggedRowId(id);
  };
  
  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedRowId && draggedRowId !== id) {
      const draggedIndex = assets.findIndex(asset => asset.id === draggedRowId);
      const targetIndex = assets.findIndex(asset => asset.id === id);
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
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const handleColumnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleColumnDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (draggedColId && draggedColId !== targetId) {
      setColumns(prevColumns => {
        const newColumns = [...prevColumns];
        const draggedIndex = newColumns.findIndex(col => col.id === draggedColId);
        const targetIndex = newColumns.findIndex(col => col.id === targetId);
        if (draggedIndex !== -1 && targetIndex !== -1) {
          // Swap order values
          const draggedOrder = newColumns[draggedIndex].order;
          const targetOrder = newColumns[targetIndex].order;
          newColumns[draggedIndex] = {
            ...newColumns[draggedIndex],
            order: targetOrder
          };
          newColumns[targetIndex] = {
            ...newColumns[targetIndex],
            order: draggedOrder
          };
          return newColumns.sort((a, b) => a.order - b.order);
        }
        return prevColumns;
      });
    }
    setDraggedColId(null);
  };
  
  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);
  
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Carteira de Criptomoedas</h1>
        <Button onClick={addNewAsset} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Adicionar Criptomoeda
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumo da Carteira</CardTitle>
          <CardDescription>
            Valor total em USD: ${totalPortfolio.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
            <span className="ml-4">
              Valor total em BRL: R$ {totalPortfolioBRL.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
            </span>
            <div className="mt-2">
              <Button variant="outline" size="sm" onClick={calculateAllocations}>
                Recalcular Alocações
              </Button>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {sortedColumns.map(column => column.visible && <TableHead key={column.id} draggable onDragStart={e => handleColumnDragStart(e, column.id)} onDragOver={handleColumnDragOver} onDrop={e => handleColumnDrop(e, column.id)} className="cursor-move relative">
                        <div className="flex items-center">
                          <MoveVertical className="h-3 w-3 mr-1 text-muted-foreground" />
                          {column.title}
                        </div>
                      </TableHead>)}
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map(asset => <TableRow key={asset.id} draggable onDragStart={() => handleDragStart(asset.id)} onDragOver={e => handleDragOver(e, asset.id)} onDragEnd={handleDragEnd} className="cursor-move">
                    {sortedColumns.map(column => {
                  if (!column.visible) return null;
                  switch (column.id) {
                    case 'ticker':
                      return <TableCell key={column.id}>
                              <Input type="text" value={asset.ticker} onChange={e => handleChangeTicker(asset.id, e.target.value)} className="max-w-24 h-8" />
                            </TableCell>;
                    case 'network':
                      return <TableCell key={column.id}>
                              <Input type="text" value={asset.network} onChange={e => handleChangeNetwork(asset.id, e.target.value)} className="max-w-24 h-8" />
                            </TableCell>;
                    case 'sector':
                      return <TableCell key={column.id}>
                              <Popover open={openSector === asset.id} onOpenChange={open => setOpenSector(open ? asset.id : null)}>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" role="combobox" aria-expanded={openSector === asset.id} className="w-40 justify-between h-8">
                                    {asset.sector}
                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-52 p-0">
                                  <Command>
                                    <CommandInput placeholder="Buscar setor..." />
                                    <CommandEmpty>Nenhum setor encontrado.</CommandEmpty>
                                    <CommandGroup>
                                      {(sectors || []).map(sector => (
                                        <CommandItem
                                          key={sector}
                                          value={sector}
                                          onSelect={() => {
                                            handleChangeSector(asset.id, sector);
                                            setOpenSector(null);
                                          }}
                                          className="flex justify-between items-center"
                                        >
                                          <span>{sector}</span>
                                          <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-6 w-6"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              deleteSector(sector);
                                            }}
                                          >
                                            <Trash className="h-3 w-3" />
                                          </Button>
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                    <div className="border-t p-2 flex gap-2">
                                      <Input 
                                        placeholder="Novo setor" 
                                        value={newSector} 
                                        onChange={e => setNewSector(e.target.value)} 
                                        className="h-8"
                                      />
                                      <Button 
                                        type="button" 
                                        size="sm" 
                                        onClick={() => {
                                          addNewSector();
                                          if (newSector && !sectors.includes(newSector)) {
                                            handleChangeSector(asset.id, newSector);
                                            setOpenSector(null);
                                          }
                                        }}
                                      >
                                        <Plus className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                            </TableCell>;
                    case 'price':
                      return <TableCell key={column.id}>
                              ${asset.price.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                            </TableCell>;
                    case 'quantity':
                      return <TableCell key={column.id}>
                              <Input type="number" value={asset.quantity} onChange={e => handleChangeQuantity(asset.id, parseFloat(e.target.value) || 0)} className="max-w-24 h-8" step="0.00000001" />
                            </TableCell>;
                    case 'total':
                      return <TableCell key={column.id} className="text-right">
                              <Input type="number" value={asset.total} onChange={e => handleChangeTotal(asset.id, parseFloat(e.target.value) || 0)} className="max-w-28 h-8 text-right" step="0.01" />
                            </TableCell>;
                    case 'totalBRL':
                      return <TableCell key={column.id} className="text-right">
                              R$ {asset.totalBRL.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                            </TableCell>;
                    case 'change':
                      return <TableCell key={column.id} className="text-center">
                              <span className={`flex items-center justify-center ${asset.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {asset.change >= 0 ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                                {Math.abs(asset.change)}%
                              </span>
                            </TableCell>;
                    case 'custodian':
                      return <TableCell key={column.id}>
                              <Popover open={openCustodian === asset.id} onOpenChange={open => setOpenCustodian(open ? asset.id : null)}>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" role="combobox" aria-expanded={openCustodian === asset.id} className="w-40 justify-between h-8">
                                    {asset.custodian}
                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-52 p-0">
                                  <Command>
                                    <CommandInput placeholder="Buscar custódia..." />
                                    <CommandEmpty>Nenhuma custódia encontrada.</CommandEmpty>
                                    <CommandGroup>
                                      {(custodians || []).map(custodian => (
                                        <CommandItem
                                          key={custodian}
                                          value={custodian}
                                          onSelect={() => {
                                            handleChangeCustodian(asset.id, custodian);
                                            setOpenCustodian(null);
                                          }}
                                          className="flex justify-between items-center"
                                        >
                                          <span>{custodian}</span>
                                          <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-6 w-6"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              deleteCustodian(custodian);
                                            }}
                                          >
                                            <Trash className="h-3 w-3" />
                                          </Button>
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                    <div className="border-t p-2 flex gap-2">
                                      <Input 
                                        placeholder="Nova custódia" 
                                        value={newCustodian} 
                                        onChange={e => setNewCustodian(e.target.value)} 
                                        className="h-8"
                                      />
                                      <Button 
                                        type="button" 
                                        size="sm" 
                                        onClick={() => {
                                          addNewCustodian();
                                          if (newCustodian && !custodians.includes(newCustodian)) {
                                            handleChangeCustodian(asset.id, newCustodian);
                                            setOpenCustodian(null);
                                          }
                                        }}
                                      >
                                        <Plus className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                            </TableCell>;
                    case 'lend':
                      return <TableCell key={column.id} className="text-right">
                              <Input type="number" value={asset.lend} onChange={e => handleChangeLend(asset.id, parseFloat(e.target.value) || 0)} className="max-w-20 h-8 text-right" step="0.01" />
                            </TableCell>;
                    case 'borrow':
                      return <TableCell key={column.id} className="text-right">
                              <Input type="number" value={asset.borrow} onChange={e => handleChangeBorrow(asset.id, parseFloat(e.target.value) || 0)} className="max-w-20 h-8 text-right" step="0.01" />
                            </TableCell>;
                    case 'allocation':
                      return <TableCell key={column.id} className="text-right">{asset.allocation}%</TableCell>;
                    default:
                      return <TableCell key={column.id}></TableCell>;
                  }
                })}
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" onClick={() => deleteAsset(asset.id)} className="h-8 w-8 text-destructive hover:text-destructive/80">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="font-medium bg-emerald-50 bg-[finance-gray-light]">TOTAL</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-center font-medium">
                    ${totalPortfolio.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    R$ {totalPortfolioBRL.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-center font-medium">
                    {totalLend.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {totalBorrow.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                  </TableCell>
                  <TableCell className="text-right font-medium">100%</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>;
}
