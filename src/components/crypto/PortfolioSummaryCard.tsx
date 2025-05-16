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
        <CardTitle>Resumo do Portfólio</CardTitle>
        <CardDescription>Visão geral do seu portfólio de criptomoedas</CardDescription>
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