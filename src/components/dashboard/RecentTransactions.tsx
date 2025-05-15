
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: number;
  type: "buy" | "sell";
  asset: string;
  ticker: string;
  amount: number;
  price: number;
  date: string;
}

const transactions: Transaction[] = [
  {
    id: 1,
    type: "buy",
    asset: "Bitcoin",
    ticker: "BTC",
    amount: 0.25,
    price: 42561.23,
    date: "2025-05-11",
  },
  {
    id: 2,
    type: "sell",
    asset: "Apple Inc.",
    ticker: "AAPL",
    amount: 5,
    price: 173.89,
    date: "2025-05-10",
  },
  {
    id: 3,
    type: "buy",
    asset: "Microsoft",
    ticker: "MSFT",
    amount: 2,
    price: 382.75,
    date: "2025-05-09",
  },
  {
    id: 4,
    type: "buy",
    asset: "Petrobras",
    ticker: "PETR4",
    amount: 10,
    price: 38.45,
    date: "2025-05-08",
  },
];

export function RecentTransactions() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between border-b pb-2 last:border-0"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    transaction.type === "buy"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {transaction.type === "buy" ? (
                    <ArrowDownRight className="h-4 w-4 text-finance-green" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-finance-red" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">
                    {transaction.type === "buy" ? "Bought" : "Sold"}{" "}
                    {transaction.asset}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {transaction.amount} {transaction.ticker} @ $
                    {transaction.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <Badge
                  variant={transaction.type === "buy" ? "outline" : "secondary"}
                  className={
                    transaction.type === "buy"
                      ? "border-finance-green text-finance-green"
                      : "bg-red-50 text-finance-red border-finance-red"
                  }
                >
                  {transaction.type === "buy" ? "Buy" : "Sell"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {transaction.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
