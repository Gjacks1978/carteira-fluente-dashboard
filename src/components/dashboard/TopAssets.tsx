
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

interface AssetProps {
  name: string;
  ticker: string;
  price: number;
  change: number;
  type: string;
}

const assets: AssetProps[] = [
  { name: "Bitcoin", ticker: "BTC", price: 42561.23, change: 4.32, type: "Crypto" },
  { name: "Ethereum", ticker: "ETH", price: 2310.45, change: 2.78, type: "Crypto" },
  { name: "Apple Inc.", ticker: "AAPL", price: 173.89, change: -0.32, type: "US Stock" },
  { name: "Microsoft", ticker: "MSFT", price: 382.75, change: 1.25, type: "US Stock" },
  { name: "Petrobras", ticker: "PETR4", price: 38.45, change: -1.45, type: "BR Stock" },
];

export function TopAssets() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Top Assets</CardTitle>
        <CardDescription>Your best performing assets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assets.map((asset) => (
            <div
              key={asset.ticker}
              className="flex items-center justify-between border-b pb-2 last:border-0"
            >
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="font-medium">{asset.name}</span>
                  <Badge variant="outline" className="ml-2">
                    {asset.ticker}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">{asset.type}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-medium">
                  ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span
                  className={`flex items-center text-sm ${
                    asset.change >= 0 ? "text-finance-green" : "text-finance-red"
                  }`}
                >
                  {asset.change >= 0 ? (
                    <ArrowUp className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDown className="mr-1 h-3 w-3" />
                  )}
                  {Math.abs(asset.change)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
