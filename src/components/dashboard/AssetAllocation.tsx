
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface AssetAllocationItemProps {
  name: string;
  value: number;
  percentage: number;
  change: number;
  color: string;
}

function AssetAllocationItem({ name, value, percentage, change, color }: AssetAllocationItemProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="font-medium">{name}</span>
        <span>${value.toLocaleString()}</span>
      </div>
      <Progress value={percentage} className="h-2" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
        <div 
          className="h-full rounded-full" 
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </Progress>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{percentage}%</span>
        <span className={change >= 0 ? 'text-finance-green' : 'text-finance-red'}>
          {change > 0 ? '+' : ''}{change}%
        </span>
      </div>
    </div>
  );
}

const assets = [
  { name: 'Crypto', value: 120000, percentage: 30, change: 5.4, color: '#38B2AC' },
  { name: 'US Stocks', value: 100000, percentage: 25, change: 2.1, color: '#4299E1' },
  { name: 'BR Stocks', value: 60000, percentage: 15, change: -1.2, color: '#48BB78' },
  { name: 'Fixed Income', value: 80000, percentage: 20, change: 0.5, color: '#F6AD55' },
  { name: 'Cash', value: 40000, percentage: 10, change: 0, color: '#CBD5E0' },
];

export function AssetAllocation() {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Asset Allocation</CardTitle>
        <CardDescription>
          Total portfolio value: ${totalValue.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {assets.map((asset) => (
          <AssetAllocationItem 
            key={asset.name} 
            name={asset.name} 
            value={asset.value} 
            percentage={asset.percentage}
            change={asset.change}
            color={asset.color}
          />
        ))}
      </CardContent>
    </Card>
  );
}
