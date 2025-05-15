
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownRight, ArrowUpRight, Plus, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

interface Transaction {
  id: number;
  type: "buy" | "sell" | "dividend" | "deposit" | "withdrawal" | "interest";
  asset: string;
  ticker: string;
  amount: number | string;
  price: number;
  value: number;
  date: string;
  category: "crypto" | "stocks" | "fixed-income" | "cash";
}

const transactions: Transaction[] = [
  {
    id: 1,
    type: "buy",
    asset: "Bitcoin",
    ticker: "BTC",
    amount: 0.25,
    price: 42561.23,
    value: 10640.31,
    date: "2025-05-10",
    category: "crypto",
  },
  {
    id: 2,
    type: "sell",
    asset: "Apple Inc.",
    ticker: "AAPL",
    amount: 5,
    price: 173.89,
    value: 869.45,
    date: "2025-05-09",
    category: "stocks",
  },
  {
    id: 3,
    type: "buy",
    asset: "Microsoft",
    ticker: "MSFT",
    amount: 2,
    price: 382.75,
    value: 765.50,
    date: "2025-05-08",
    category: "stocks",
  },
  {
    id: 4,
    type: "deposit",
    asset: "Cash",
    ticker: "USD",
    amount: "$5,000",
    price: 1,
    value: 5000,
    date: "2025-05-07",
    category: "cash",
  },
  {
    id: 5,
    type: "buy",
    asset: "Ethereum",
    ticker: "ETH",
    amount: 3,
    price: 2310.45,
    value: 6931.35,
    date: "2025-05-06",
    category: "crypto",
  },
  {
    id: 6,
    type: "dividend",
    asset: "Petrobras",
    ticker: "PETR4",
    amount: 200,
    price: 0.25,
    value: 50,
    date: "2025-05-05",
    category: "stocks",
  },
  {
    id: 7,
    type: "interest",
    asset: "Treasury Bond",
    ticker: "TBNDF26",
    amount: "-",
    price: 0,
    value: 120.50,
    date: "2025-05-04",
    category: "fixed-income",
  },
  {
    id: 8,
    type: "withdrawal",
    asset: "Cash",
    ticker: "USD",
    amount: "$1,000",
    price: 1,
    value: 1000,
    date: "2025-05-03",
    category: "cash",
  },
];

function TransactionRow({ transaction }: { transaction: Transaction }) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              transaction.type === "buy" || transaction.type === "deposit" || transaction.type === "dividend" || transaction.type === "interest"
                ? "bg-green-100"
                : "bg-red-100"
            }`}
          >
            {transaction.type === "buy" || transaction.type === "deposit" || transaction.type === "dividend" || transaction.type === "interest" ? (
              <ArrowDownRight className="h-4 w-4 text-finance-green" />
            ) : (
              <ArrowUpRight className="h-4 w-4 text-finance-red" />
            )}
          </div>
          {transaction.date}
        </div>
      </TableCell>
      <TableCell>{transaction.asset}</TableCell>
      <TableCell>{transaction.ticker}</TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={
            transaction.type === "buy" || transaction.type === "deposit" || transaction.type === "dividend" || transaction.type === "interest"
              ? "border-finance-green text-finance-green"
              : "border-finance-red text-finance-red"
          }
        >
          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
        </Badge>
      </TableCell>
      <TableCell>{transaction.amount}</TableCell>
      <TableCell>
        {transaction.type !== "deposit" && transaction.type !== "withdrawal"
          ? `$${transaction.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`
          : "-"}
      </TableCell>
      <TableCell className="text-right font-medium">
        ${transaction.value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </TableCell>
    </TableRow>
  );
}

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
              <DialogDescription>
                Enter the details of your transaction
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="transaction-type">Transaction Type</Label>
                  <Select>
                    <SelectTrigger id="transaction-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buy">Buy</SelectItem>
                      <SelectItem value="sell">Sell</SelectItem>
                      <SelectItem value="dividend">Dividend</SelectItem>
                      <SelectItem value="interest">Interest</SelectItem>
                      <SelectItem value="deposit">Deposit</SelectItem>
                      <SelectItem value="withdrawal">Withdrawal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="asset-category">Asset Category</Label>
                  <Select>
                    <SelectTrigger id="asset-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crypto">Crypto</SelectItem>
                      <SelectItem value="stocks">Stocks</SelectItem>
                      <SelectItem value="fixed-income">Fixed Income</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="asset-name">Asset Name</Label>
                  <Input id="asset-name" placeholder="e.g. Bitcoin" />
                </div>
                <div>
                  <Label htmlFor="ticker">Ticker/Symbol</Label>
                  <Input id="ticker" placeholder="e.g. BTC" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" step="0.0001" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="price">Price per Unit</Label>
                  <Input id="price" type="number" step="0.01" placeholder="0.00" />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input id="notes" placeholder="Additional information" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Add Transaction</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Input className="w-[250px]" placeholder="Search transactions..." />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="buy">Buy</SelectItem>
              <SelectItem value="sell">Sell</SelectItem>
              <SelectItem value="dividend">Dividend</SelectItem>
              <SelectItem value="interest">Interest</SelectItem>
              <SelectItem value="deposit">Deposit</SelectItem>
              <SelectItem value="withdrawal">Withdrawal</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="crypto">Cryptocurrency</SelectItem>
              <SelectItem value="stocks">Stocks</SelectItem>
              <SelectItem value="fixed-income">Fixed Income</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            View and manage all your transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="buys">Buys</TabsTrigger>
              <TabsTrigger value="sells">Sells</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="cash">Cash Flow</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Ticker</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TransactionRow key={transaction.id} transaction={transaction} />
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="buys">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Ticker</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions
                    .filter((transaction) => transaction.type === "buy")
                    .map((transaction) => (
                      <TransactionRow key={transaction.id} transaction={transaction} />
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="sells">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Ticker</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions
                    .filter((transaction) => transaction.type === "sell")
                    .map((transaction) => (
                      <TransactionRow key={transaction.id} transaction={transaction} />
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="income">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Ticker</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions
                    .filter((transaction) => transaction.type === "dividend" || transaction.type === "interest")
                    .map((transaction) => (
                      <TransactionRow key={transaction.id} transaction={transaction} />
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="cash">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Ticker</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions
                    .filter((transaction) => transaction.type === "deposit" || transaction.type === "withdrawal")
                    .map((transaction) => (
                      <TransactionRow key={transaction.id} transaction={transaction} />
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
