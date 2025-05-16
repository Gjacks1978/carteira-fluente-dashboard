
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PortfolioSummaryCardProps {
  totalPortfolio: number;
  totalPortfolioBRL: number;
  calculateAllocations: () => void;
}

const PortfolioSummaryCard: React.FC<PortfolioSummaryCardProps> = ({
  totalPortfolio,
  totalPortfolioBRL,
  calculateAllocations,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo da Carteira</CardTitle>
        <CardDescription>
          Valor total em USD: $
          {totalPortfolio.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          <span className="ml-4">
            Valor total em BRL: R${" "}
            {totalPortfolioBRL.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
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
          {/* Table will be rendered as a child */}
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummaryCard;
