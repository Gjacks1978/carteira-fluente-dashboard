
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, MoveVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { toast } from "sonner";

// Tipos
interface Asset {
  id: string;
  name: string;
  ticker: string;
  quantity: number;
  price: number;
  value: number;
  change: number;
  sector?: string;
  custodian?: string;
}

interface TableColumn {
  id: string;
  title: string;
  visible: boolean;
  order: number;
}

// Dados iniciais
const initialStocksUS: Asset[] = [
  { id: "us1", name: "Apple Inc.", ticker: "AAPL", quantity: 25, price: 173.89, value: 4347.25, change: -0.32, sector: "Tecnologia", custodian: "IBKR" },
  { id: "us2", name: "Microsoft", ticker: "MSFT", quantity: 15, price: 382.75, value: 5741.25, change: 1.25, sector: "Tecnologia", custodian: "IBKR" },
  { id: "us3", name: "Amazon", ticker: "AMZN", quantity: 10, price: 178.35, value: 1783.5, change: 0.87, sector: "Varejo", custodian: "IBKR" },
  { id: "us4", name: "Tesla", ticker: "TSLA", quantity: 8, price: 182.25, value: 1458, change: -2.34, sector: "Automóveis", custodian: "IBKR" },
];

const initialStocksBR: Asset[] = [
  { id: "br1", name: "Petrobras", ticker: "PETR4", quantity: 200, price: 38.45, value: 7690, change: -1.45, sector: "Petróleo", custodian: "XP" },
  { id: "br2", name: "Itau Unibanco", ticker: "ITUB4", quantity: 300, price: 32.78, value: 9834, change: 0.42, sector: "Financeiro", custodian: "XP" },
  { id: "br3", name: "Vale", ticker: "VALE3", quantity: 150, price: 67.25, value: 10087.5, change: 1.23, sector: "Mineração", custodian: "XP" },
  { id: "br4", name: "B3 S.A.", ticker: "B3SA3", quantity: 400, price: 12.35, value: 4940, change: -0.37, sector: "Financeiro", custodian: "XP" },
];

const initialFixedIncome: Asset[] = [
  { id: "fi1", name: "Treasury Bond 2026", ticker: "TBNDF26", quantity: 1, price: 10000, value: 10000, change: 0.12, sector: "Tesouro Direto", custodian: "Banco Central" },
  { id: "fi2", name: "CDB Banco XYZ", ticker: "CDB-XYZ", quantity: 1, price: 15000, value: 15000, change: 0.22, sector: "CDB", custodian: "Banco XYZ" },
  { id: "fi3", name: "LCI Banco ABC", ticker: "LCI-ABC", quantity: 1, price: 20000, value: 20000, change: 0.18, sector: "LCI", custodian: "Banco ABC" },
  { id: "fi4", name: "LCA Banco DEF", ticker: "LCA-DEF", quantity: 1, price: 25000, value: 25000, change: 0.15, sector: "LCA", custodian: "Banco DEF" },
];

const initialCash: Asset[] = [
  { id: "cash1", name: "Conta Corrente", ticker: "CC-ITAU", quantity: 1, price: 5000, value: 5000, change: 0, sector: "Conta Corrente", custodian: "Itaú" },
  { id: "cash2", name: "Poupança", ticker: "POUP-BB", quantity: 1, price: 15000, value: 15000, change: 0.1, sector: "Poupança", custodian: "Banco do Brasil" },
];

// Componente para cada aba de tipo de ativo
function AssetsTableAdvanced({ 
  assets, 
  columns, 
  setAssets,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  handleColumnDragStart,
  handleColumnDragOver,
  handleColumnDrop,
  addNewAsset,
  deleteAsset
}: { 
  assets: Asset[], 
  columns: TableColumn[],
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>,
  handleDragStart: (id: string) => void,
  handleDragOver: (e: React.DragEvent, id: string) => void,
  handleDragEnd: () => void,
  handleColumnDragStart: (e: React.DragEvent, id: string) => void,
  handleColumnDragOver: (e: React.DragEvent) => void,
  handleColumnDrop: (e: React.DragEvent, targetId: string) => void,
  addNewAsset: () => void,
  deleteAsset: (id: string) => void
}) {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);

  const handleChangeName = (id: string, newName: string) => {
    setAssets(assets.map(asset => 
      asset.id === id ? { ...asset, name: newName } : asset
    ));
  };

  const handleChangeTicker = (id: string, newTicker: string) => {
    setAssets(assets.map(asset => 
      asset.id === id ? { ...asset, ticker: newTicker } : asset
    ));
  };

  const handleChangeQuantity = (id: string, newQuantity: number) => {
    setAssets(assets.map(asset => {
      if (asset.id === id) {
        const newValue = newQuantity * asset.price;
        return {
          ...asset,
          quantity: newQuantity,
          value: parseFloat(newValue.toFixed(2))
        };
      }
      return asset;
    }));
  };

  const handleChangePrice = (id: string, newPrice: number) => {
    setAssets(assets.map(asset => {
      if (asset.id === id) {
        const newValue = asset.quantity * newPrice;
        return {
          ...asset,
          price: newPrice,
          value: parseFloat(newValue.toFixed(2))
        };
      }
      return asset;
    }));
  };

  const handleChangeSector = (id: string, newSector: string) => {
    setAssets(assets.map(asset => 
      asset.id === id ? { ...asset, sector: newSector } : asset
    ));
  };

  const handleChangeCustodian = (id: string, newCustodian: string) => {
    setAssets(assets.map(asset => 
      asset.id === id ? { ...asset, custodian: newCustodian } : asset
    ));
  };

  return (
    <div>
      <Button onClick={addNewAsset} className="mb-4">
        <Plus className="mr-2 h-4 w-4" /> Adicionar Ativo
      </Button>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {sortedColumns.map(column => 
                column.visible && (
                  <TableHead 
                    key={column.id}
                    draggable
                    onDragStart={(e) => handleColumnDragStart(e, column.id)}
                    onDragOver={handleColumnDragOver}
                    onDrop={(e) => handleColumnDrop(e, column.id)}
                    className="cursor-move relative"
                  >
                    <div className="flex items-center">
                      <MoveVertical className="h-3 w-3 mr-1 text-muted-foreground" />
                      {column.title}
                    </div>
                  </TableHead>
                )
              )}
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {assets.map((asset) => (
              <TableRow 
                key={asset.id}
                draggable
                onDragStart={() => handleDragStart(asset.id)}
                onDragOver={(e) => handleDragOver(e, asset.id)}
                onDragEnd={handleDragEnd}
                className="cursor-move"
              >
                {sortedColumns.map(column => 
                  column.visible && (
                    <TableCell key={column.id}>
                      {column.id === 'name' && (
                        <Input 
                          value={asset.name}
                          onChange={(e) => handleChangeName(asset.id, e.target.value)}
                          className="w-full"
                        />
                      )}
                      {column.id === 'ticker' && (
                        <Input 
                          value={asset.ticker}
                          onChange={(e) => handleChangeTicker(asset.id, e.target.value)}
                          className="w-full"
                        />
                      )}
                      {column.id === 'quantity' && (
                        <Input 
                          type="number"
                          value={asset.quantity}
                          onChange={(e) => handleChangeQuantity(asset.id, parseFloat(e.target.value))}
                          className="w-full"
                        />
                      )}
                      {column.id === 'price' && (
                        <Input 
                          type="number"
                          value={asset.price}
                          onChange={(e) => handleChangePrice(asset.id, parseFloat(e.target.value))}
                          className="w-full"
                        />
                      )}
                      {column.id === 'value' && (
                        <div className="text-right">
                          R$ {asset.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      )}
                      {column.id === 'change' && (
                        <div className={`text-right ${asset.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {asset.change > 0 ? '+' : ''}{asset.change}%
                        </div>
                      )}
                      {column.id === 'sector' && (
                        <Input 
                          value={asset.sector || ''}
                          onChange={(e) => handleChangeSector(asset.id, e.target.value)}
                          className="w-full"
                        />
                      )}
                      {column.id === 'custodian' && (
                        <Input 
                          value={asset.custodian || ''}
                          onChange={(e) => handleChangeCustodian(asset.id, e.target.value)}
                          className="w-full"
                        />
                      )}
                    </TableCell>
                  )
                )}
                <TableCell className="text-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteAsset(asset.id)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="font-medium bg-emerald-50">
                TOTAL
              </TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right font-medium">
                R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

export default function AssetsPage() {
  // Estados para cada tipo de ativo
  const [stocksUS, setStocksUS] = useState<Asset[]>(initialStocksUS);
  const [stocksBR, setStocksBR] = useState<Asset[]>(initialStocksBR);
  const [fixedIncome, setFixedIncome] = useState<Asset[]>(initialFixedIncome);
  const [cash, setCash] = useState<Asset[]>(initialCash);
  
  // Estado para colunas da tabela
  const [columns, setColumns] = useState<TableColumn[]>([
    { id: 'name', title: 'Nome', visible: true, order: 0 },
    { id: 'ticker', title: 'Ticker', visible: true, order: 1 },
    { id: 'sector', title: 'Setor', visible: true, order: 2 },
    { id: 'quantity', title: 'Quantidade', visible: true, order: 3 },
    { id: 'price', title: 'Preço (R$)', visible: true, order: 4 },
    { id: 'value', title: 'Valor Total (R$)', visible: true, order: 5 },
    { id: 'change', title: 'Variação 24h', visible: true, order: 6 },
    { id: 'custodian', title: 'Custodiante', visible: true, order: 7 },
  ]);
  
  // Estados para drag and drop
  const [draggedRowId, setDraggedRowId] = useState<string | null>(null);
  const [draggedColId, setDraggedColId] = useState<string | null>(null);

  // Função para adicionar novos ativos
  const addNewUSAsset = () => {
    const newId = `us${Date.now()}`;
    const newAsset: Asset = {
      id: newId,
      name: "Novo Ativo",
      ticker: "TICKER",
      quantity: 0,
      price: 0,
      value: 0,
      change: 0,
      sector: "Setor",
      custodian: "Custodiante"
    };
    setStocksUS([...stocksUS, newAsset]);
    toast.success("Novo ativo americano adicionado!");
  };

  const addNewBRAsset = () => {
    const newId = `br${Date.now()}`;
    const newAsset: Asset = {
      id: newId,
      name: "Novo Ativo",
      ticker: "TICKER",
      quantity: 0,
      price: 0,
      value: 0,
      change: 0,
      sector: "Setor",
      custodian: "Custodiante"
    };
    setStocksBR([...stocksBR, newAsset]);
    toast.success("Novo ativo brasileiro adicionado!");
  };

  const addNewFixedIncomeAsset = () => {
    const newId = `fi${Date.now()}`;
    const newAsset: Asset = {
      id: newId,
      name: "Novo Ativo",
      ticker: "TICKER",
      quantity: 1,
      price: 0,
      value: 0,
      change: 0,
      sector: "Tipo",
      custodian: "Instituição"
    };
    setFixedIncome([...fixedIncome, newAsset]);
    toast.success("Novo ativo de renda fixa adicionado!");
  };

  const addNewCashAsset = () => {
    const newId = `cash${Date.now()}`;
    const newAsset: Asset = {
      id: newId,
      name: "Nova Conta",
      ticker: "CONTA",
      quantity: 1,
      price: 0,
      value: 0,
      change: 0,
      sector: "Tipo de Conta",
      custodian: "Banco"
    };
    setCash([...cash, newAsset]);
    toast.success("Nova conta de caixa adicionada!");
  };

  // Funções para excluir ativos
  const deleteUSAsset = (id: string) => {
    setStocksUS(stocksUS.filter(asset => asset.id !== id));
    toast.success("Ativo excluído com sucesso!");
  };

  const deleteBRAsset = (id: string) => {
    setStocksBR(stocksBR.filter(asset => asset.id !== id));
    toast.success("Ativo excluído com sucesso!");
  };

  const deleteFixedIncomeAsset = (id: string) => {
    setFixedIncome(fixedIncome.filter(asset => asset.id !== id));
    toast.success("Ativo excluído com sucesso!");
  };

  const deleteCashAsset = (id: string) => {
    setCash(cash.filter(asset => asset.id !== id));
    toast.success("Conta excluída com sucesso!");
  };

  // Funções para arrastar linhas
  const handleUSAssetDragStart = (id: string) => {
    setDraggedRowId(id);
  };

  const handleUSAssetDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedRowId && draggedRowId !== id) {
      const draggedIndex = stocksUS.findIndex((asset) => asset.id === draggedRowId);
      const targetIndex = stocksUS.findIndex((asset) => asset.id === id);
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newAssets = [...stocksUS];
        const draggedItem = newAssets[draggedIndex];
        newAssets.splice(draggedIndex, 1);
        newAssets.splice(targetIndex, 0, draggedItem);
        setStocksUS(newAssets);
      }
    }
  };

  const handleBRAssetDragStart = (id: string) => {
    setDraggedRowId(id);
  };

  const handleBRAssetDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedRowId && draggedRowId !== id) {
      const draggedIndex = stocksBR.findIndex((asset) => asset.id === draggedRowId);
      const targetIndex = stocksBR.findIndex((asset) => asset.id === id);
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newAssets = [...stocksBR];
        const draggedItem = newAssets[draggedIndex];
        newAssets.splice(draggedIndex, 1);
        newAssets.splice(targetIndex, 0, draggedItem);
        setStocksBR(newAssets);
      }
    }
  };

  const handleFixedIncomeDragStart = (id: string) => {
    setDraggedRowId(id);
  };

  const handleFixedIncomeDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedRowId && draggedRowId !== id) {
      const draggedIndex = fixedIncome.findIndex((asset) => asset.id === draggedRowId);
      const targetIndex = fixedIncome.findIndex((asset) => asset.id === id);
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newAssets = [...fixedIncome];
        const draggedItem = newAssets[draggedIndex];
        newAssets.splice(draggedIndex, 1);
        newAssets.splice(targetIndex, 0, draggedItem);
        setFixedIncome(newAssets);
      }
    }
  };

  const handleCashDragStart = (id: string) => {
    setDraggedRowId(id);
  };

  const handleCashDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedRowId && draggedRowId !== id) {
      const draggedIndex = cash.findIndex((asset) => asset.id === draggedRowId);
      const targetIndex = cash.findIndex((asset) => asset.id === id);
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newAssets = [...cash];
        const draggedItem = newAssets[draggedIndex];
        newAssets.splice(draggedIndex, 1);
        newAssets.splice(targetIndex, 0, draggedItem);
        setCash(newAssets);
      }
    }
  };

  const handleDragEnd = () => {
    setDraggedRowId(null);
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
          // Trocar valores de ordem
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Ativos</h1>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Input className="w-[250px]" placeholder="Buscar ativos..." />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de Ativo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              <SelectItem value="stocks-us">Ações EUA</SelectItem>
              <SelectItem value="stocks-br">Ações Brasil</SelectItem>
              <SelectItem value="fixed">Renda Fixa</SelectItem>
              <SelectItem value="cash">Caixa</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="value-desc">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar Por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
              <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
              <SelectItem value="value-asc">Valor (Menor-Maior)</SelectItem>
              <SelectItem value="value-desc">Valor (Maior-Menor)</SelectItem>
              <SelectItem value="change-asc">Variação (Menor-Maior)</SelectItem>
              <SelectItem value="change-desc">Variação (Maior-Menor)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Carteira de Ativos</CardTitle>
          <CardDescription>
            Gerencie e acompanhe todos os seus investimentos em um só lugar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="stocks-us">
            <TabsList className="mb-4">
              <TabsTrigger value="stocks-us">Ações EUA</TabsTrigger>
              <TabsTrigger value="stocks-br">Ações Brasil</TabsTrigger>
              <TabsTrigger value="fixed-income">Renda Fixa</TabsTrigger>
              <TabsTrigger value="cash">Caixa</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stocks-us">
              <AssetsTableAdvanced 
                assets={stocksUS} 
                columns={columns}
                setAssets={setStocksUS}
                handleDragStart={handleUSAssetDragStart}
                handleDragOver={handleUSAssetDragOver}
                handleDragEnd={handleDragEnd}
                handleColumnDragStart={handleColumnDragStart}
                handleColumnDragOver={handleColumnDragOver}
                handleColumnDrop={handleColumnDrop}
                addNewAsset={addNewUSAsset}
                deleteAsset={deleteUSAsset}
              />
            </TabsContent>
            
            <TabsContent value="stocks-br">
              <AssetsTableAdvanced 
                assets={stocksBR} 
                columns={columns}
                setAssets={setStocksBR}
                handleDragStart={handleBRAssetDragStart}
                handleDragOver={handleBRAssetDragOver}
                handleDragEnd={handleDragEnd}
                handleColumnDragStart={handleColumnDragStart}
                handleColumnDragOver={handleColumnDragOver}
                handleColumnDrop={handleColumnDrop}
                addNewAsset={addNewBRAsset}
                deleteAsset={deleteBRAsset}
              />
            </TabsContent>
            
            <TabsContent value="fixed-income">
              <AssetsTableAdvanced 
                assets={fixedIncome} 
                columns={columns}
                setAssets={setFixedIncome}
                handleDragStart={handleFixedIncomeDragStart}
                handleDragOver={handleFixedIncomeDragOver}
                handleDragEnd={handleDragEnd}
                handleColumnDragStart={handleColumnDragStart}
                handleColumnDragOver={handleColumnDragOver}
                handleColumnDrop={handleColumnDrop}
                addNewAsset={addNewFixedIncomeAsset}
                deleteAsset={deleteFixedIncomeAsset}
              />
            </TabsContent>
            
            <TabsContent value="cash">
              <AssetsTableAdvanced 
                assets={cash} 
                columns={columns}
                setAssets={setCash}
                handleDragStart={handleCashDragStart}
                handleDragOver={handleCashDragOver}
                handleDragEnd={handleDragEnd}
                handleColumnDragStart={handleColumnDragStart}
                handleColumnDragOver={handleColumnDragOver}
                handleColumnDrop={handleColumnDrop}
                addNewAsset={addNewCashAsset}
                deleteAsset={deleteCashAsset}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
