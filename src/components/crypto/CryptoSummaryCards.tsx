import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CriptoAsset } from "./types";

interface CryptoSummaryCardsProps {
  assets: CriptoAsset[];
}

export function CryptoSummaryCards({ assets }: CryptoSummaryCardsProps) {
  const [investedAmount, setInvestedAmount] = useState<number>(0);

  // Cálculo por setor
  const sectorTotals = assets.reduce((acc, asset) => {
    acc[asset.sector] = (acc[asset.sector] || 0) + asset.total;
    return acc;
  }, {} as Record<string, number>);

  const totalPortfolio = assets.reduce((sum, asset) => sum + asset.total, 0);

  // Cálculo de stablecoins (assumindo que são ativos com variação próxima a 0)
  const stablecoinsTotal = assets
    .filter(asset => Math.abs(asset.change) <= 0.1)
    .reduce((sum, asset) => sum + asset.total, 0);

  // Cálculo de lucro/prejuízo
  const currentValue = totalPortfolio;
  const profitLoss = currentValue - investedAmount;
  const profitLossPercentage = investedAmount > 0 
    ? ((profitLoss / investedAmount) * 100)
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Alocação por Setor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(sectorTotals).map(([sector, total]) => (
              <div key={sector} className="flex justify-between">
                <span>{sector}</span>
                <span className="font-medium">
                  {((total / totalPortfolio) * 100).toFixed(1)}% (R${total.toLocaleString()})
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Disponível em Caixa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R${stablecoinsTotal.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {((stablecoinsTotal / totalPortfolio) * 100).toFixed(1)}% do portfólio
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Lucro/Prejuízo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Valor investido"
                value={investedAmount || ''}
                onChange={(e) => setInvestedAmount(Number(e.target.value))}
                className="max-w-[200px]"
              />
            </div>
            <div className="text-2xl font-bold" style={{ color: profitLoss >= 0 ? '#22c55e' : '#ef4444' }}>
              R${profitLoss.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {profitLossPercentage.toFixed(1)}% do investimento
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}