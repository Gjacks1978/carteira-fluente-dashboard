
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 24000 },
  { name: 'Feb', value: 26500 },
  { name: 'Mar', value: 25000 },
  { name: 'Apr', value: 27000 },
  { name: 'May', value: 28500 },
  { name: 'Jun', value: 30000 },
  { name: 'Jul', value: 29000 },
];

export function AssetPerformance() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Portfolio Performance</CardTitle>
        <CardDescription>6-month portfolio value</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              tickFormatter={(value) => `$${value.toLocaleString()}`} 
              tickLine={false} 
              axisLine={false}
              width={80}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
              labelFormatter={(label) => `${label}`}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2C5282"
              strokeWidth={2.5}
              activeDot={{ r: 6 }}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
