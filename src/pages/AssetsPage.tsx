
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
import { Plus, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const cryptoAssets = [
  { name: "Bitcoin", ticker: "BTC", quantity: 1.25, price: 42561.23, value: 53201.54, change: 4.32 },
  { name: "Ethereum", ticker: "ETH", quantity: 15, price: 2310.45, value: 34656.75, change: 2.78 },
  { name: "Cardano", ticker: "ADA", quantity: 5000, price: 0.43, value: 2150, change: -1.25 },
  { name: "Solana", ticker: "SOL", quantity: 80, price: 142.65, value: 11412, change: 6.54 },
];

const stocksUS = [
  { name: "Apple Inc.", ticker: "AAPL", quantity: 25, price: 173.89, value: 4347.25, change: -0.32 },
  { name: "Microsoft", ticker: "MSFT", quantity: 15, price: 382.75, value: 5741.25, change: 1.25 },
  { name: "Amazon", ticker: "AMZN", quantity: 10, price: 178.35, value: 1783.5, change: 0.87 },
  { name: "Tesla", ticker: "TSLA", quantity: 8, price: 182.25, value: 1458, change: -2.34 },
];

const stocksBR = [
  { name: "Petrobras", ticker: "PETR4", quantity: 200, price: 38.45, value: 7690, change: -1.45 },
  { name: "Itau Unibanco", ticker: "ITUB4", quantity: 300, price: 32.78, value: 9834, change: 0.42 },
  { name: "Vale", ticker: "VALE3", quantity: 150, price: 67.25, value: 10087.5, change: 1.23 },
  { name: "B3 S.A.", ticker: "B3SA3", quantity: 400, price: 12.35, value: 4940, change: -0.37 },
];

const fixedIncome = [
  { name: "Treasury Bond 2026", ticker: "TBNDF26", quantity: 1, price: 10000, value: 10000, change: 0.12 },
  { name: "CDB Banco XYZ", ticker: "CDB-XYZ", quantity: 1, price: 15000, value: 15000, change: 0.22 },
  { name: "LCI Banco ABC", ticker: "LCI-ABC", quantity: 1, price: 20000, value: 20000, change: 0.18 },
  { name: "LCA Banco DEF", ticker: "LCA-DEF", quantity: 1, price: 25000, value: 25000, change: 0.15 },
];

function AssetsTable({ assets }: { assets: any[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Ticker</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Total Value</TableHead>
          <TableHead className="text-right">Change (24h)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assets.map((asset) => (
          <TableRow key={asset.ticker}>
            <TableCell className="font-medium">{asset.name}</TableCell>
            <TableCell>{asset.ticker}</TableCell>
            <TableCell>{asset.quantity}</TableCell>
            <TableCell>${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
            <TableCell className="text-right">${asset.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
            <TableCell className={`text-right ${asset.change >= 0 ? 'text-finance-green' : 'text-finance-red'}`}>
              {asset.change > 0 ? '+' : ''}{asset.change}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function AssetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Assets</h1>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Asset
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Input className="w-[250px]" placeholder="Search assets..." />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Asset Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="crypto">Cryptocurrency</SelectItem>
              <SelectItem value="stocks-us">US Stocks</SelectItem>
              <SelectItem value="stocks-br">BR Stocks</SelectItem>
              <SelectItem value="fixed">Fixed Income</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="value-desc">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="value-asc">Value (Low-High)</SelectItem>
              <SelectItem value="value-desc">Value (High-Low)</SelectItem>
              <SelectItem value="change-asc">Change (Low-High)</SelectItem>
              <SelectItem value="change-desc">Change (High-Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Asset Portfolio</CardTitle>
          <CardDescription>
            Manage and track all your investments in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="crypto">
            <TabsList className="mb-4">
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
              <TabsTrigger value="stocks-us">US Stocks</TabsTrigger>
              <TabsTrigger value="stocks-br">BR Stocks</TabsTrigger>
              <TabsTrigger value="fixed-income">Fixed Income</TabsTrigger>
              <TabsTrigger value="cash">Cash</TabsTrigger>
            </TabsList>
            <TabsContent value="crypto">
              <AssetsTable assets={cryptoAssets} />
            </TabsContent>
            <TabsContent value="stocks-us">
              <AssetsTable assets={stocksUS} />
            </TabsContent>
            <TabsContent value="stocks-br">
              <AssetsTable assets={stocksBR} />
            </TabsContent>
            <TabsContent value="fixed-income">
              <AssetsTable assets={fixedIncome} />
            </TabsContent>
            <TabsContent value="cash">
              <div className="p-4 text-center text-muted-foreground">
                No cash accounts added yet. Click "Add Asset" to add a cash account.
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
