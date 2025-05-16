
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

// Default data using state hook for future editability
const defaultData = [
  { name: "Crypto", value: 30, color: "#38B2AC" },
  { name: "US Stocks", value: 25, color: "#4299E1" },
  { name: "BR Stocks", value: 15, color: "#48BB78" },
  { name: "Fixed Income", value: 20, color: "#F6AD55" },
  { name: "Cash", value: 10, color: "#CBD5E0" },
];

export function PortfolioOverview() {
  const [data, setData] = useState(defaultData);
  
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Portfolio Allocation</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid w-full grid-cols-2 gap-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="text-sm">
                {item.name}: {item.value}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
