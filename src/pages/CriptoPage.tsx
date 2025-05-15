
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp } from "lucide-react";

interface CriptoAsset {
  id: string;
  name: string;
  ticker: string;
  network: string;
  price: number;
  quantity: number;
  total: number;
  totalBRL: number;
  change: number;
  custodian: string;
  allocation: number;
}

export default function CriptoPage() {
  const [assets, setAssets] = useState<CriptoAsset[]>([
    { id: "1", name: "Bitcoin", ticker: "BTC", network: "BTC", price: 103027.99, quantity: 0.6, total: 61810.14, totalBRL: 347247.08, change: 1.77, custodian: "Gate", allocation: 65.89 },
    { id: "2", name: "Ethereum", ticker: "ETH", network: "ETH", price: 2527.67, quantity: 6.18, total: 15610.36, totalBRL: 87698.63, change: 0.72, custodian: "Meta/S1/Bravo", allocation: 16.64 },
    { id: "3", name: "Solana", ticker: "SOL", network: "SOL", price: 169.26, quantity: 22.33, total: 3779.48, totalBRL: 21233.05, change: 1.84, custodian: "Phantom/S1/KAM", allocation: 4.03 },
    { id: "4", name: "Altcoins", ticker: "ALC", network: "VÁRIOS", price: 0, quantity: 0, total: 4929.19, totalBRL: 27692.42, change: 0.07, custodian: "Vários", allocation: 5.25 },
    { id: "5", name: "Pools", ticker: "POOL", network: "VÁRIOS", price: 0, quantity: 0, total: 11523.24, totalBRL: 64737.30, change: 0.03, custodian: "Vários", allocation: 12.28 },
  ]);

  const totalPortfolio = assets.reduce((sum, asset) => sum + asset.total, 0);
  const totalPortfolioBRL = assets.reduce((sum, asset) => sum + asset.totalBRL, 0);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Carteira de Criptomoedas</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumo da Carteira</CardTitle>
          <CardDescription>
            Valor total em USD: ${totalPortfolio.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="ml-4">
              Valor total em BRL: R$ {totalPortfolioBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Ticker</TableHead>
                <TableHead>Rede</TableHead>
                <TableHead>Preço (USD)</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead className="text-right">Total (USD)</TableHead>
                <TableHead className="text-right">Total (BRL)</TableHead>
                <TableHead className="text-center">Variação 24h</TableHead>
                <TableHead>Custódia</TableHead>
                <TableHead className="text-right">Alocação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.name}</TableCell>
                  <TableCell>{asset.ticker}</TableCell>
                  <TableCell>{asset.network}</TableCell>
                  <TableCell>
                    ${asset.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={asset.quantity}
                      onChange={(e) => handleChangeQuantity(asset.id, parseFloat(e.target.value) || 0)}
                      className="max-w-24 h-8"
                      step="0.00000001"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      value={asset.total}
                      onChange={(e) => handleChangeTotal(asset.id, parseFloat(e.target.value) || 0)}
                      className="max-w-28 h-8 text-right"
                      step="0.01"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    R$ {asset.totalBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`flex items-center justify-center ${asset.change >= 0 ? "text-finance-green" : "text-finance-red"}`}>
                      {asset.change >= 0 ? (
                        <ArrowUp className="mr-1 h-3 w-3" />
                      ) : (
                        <ArrowDown className="mr-1 h-3 w-3" />
                      )}
                      {Math.abs(asset.change)}%
                    </span>
                  </TableCell>
                  <TableCell>{asset.custodian}</TableCell>
                  <TableCell className="text-right">{asset.allocation}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
