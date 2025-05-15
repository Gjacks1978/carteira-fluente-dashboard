
import { PortfolioOverview } from "@/components/dashboard/PortfolioOverview";
import { AssetPerformance } from "@/components/dashboard/AssetPerformance";
import { AssetAllocation } from "@/components/dashboard/AssetAllocation";
import { TopAssets } from "@/components/dashboard/TopAssets";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react";

const Index = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$400,000</div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Return</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.8%</div>
            <p className="text-xs text-muted-foreground">
              +0.3% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Performer</CardTitle>
            <TrendingUp className="h-4 w-4 text-finance-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">BTC</div>
            <p className="text-xs text-finance-green">+5.4% this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Worst Performer</CardTitle>
            <TrendingDown className="h-4 w-4 text-finance-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">PETR4</div>
            <p className="text-xs text-finance-red">-1.2% this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AssetPerformance />
        <PortfolioOverview />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AssetAllocation />
        <TopAssets />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Index;
