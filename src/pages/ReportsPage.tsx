
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, Printer, Share2 } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const monthlyPerformance = [
  { name: 'Jan', return: 3.2 },
  { name: 'Feb', return: -1.4 },
  { name: 'Mar', return: 2.8 },
  { name: 'Apr', return: 0.9 },
  { name: 'May', return: 1.5 },
  { name: 'Jun', return: -0.8 },
  { name: 'Jul', return: 4.2 },
  { name: 'Aug', return: 2.3 },
  { name: 'Sep', return: -2.1 },
  { name: 'Oct', return: 1.7 },
  { name: 'Nov', return: 3.5 },
  { name: 'Dec', return: 2.6 },
];

const assetAllocation = [
  { name: 'Crypto', value: 30, color: '#38B2AC' },
  { name: 'US Stocks', value: 25, color: '#4299E1' },
  { name: 'BR Stocks', value: 15, color: '#48BB78' },
  { name: 'Fixed Income', value: 20, color: '#F6AD55' },
  { name: 'Cash', value: 10, color: '#CBD5E0' },
];

const assetPerformance = [
  { name: 'BTC', return: 15.4 },
  { name: 'ETH', return: 8.2 },
  { name: 'AAPL', return: 5.7 },
  { name: 'MSFT', return: 7.3 },
  { name: 'AMZN', return: -2.1 },
  { name: 'PETR4', return: -3.5 },
  { name: 'VALE3', return: 6.8 },
  { name: 'ITUB4', return: 1.2 },
];

const portfolioGrowth = [
  { month: 'Jan 2024', value: 100000 },
  { month: 'Feb 2024', value: 105000 },
  { month: 'Mar 2024', value: 108000 },
  { month: 'Apr 2024', value: 115000 },
  { month: 'May 2024', value: 112000 },
  { month: 'Jun 2024', value: 120000 },
  { month: 'Jul 2024', value: 125000 },
  { month: 'Aug 2024', value: 130000 },
  { month: 'Sep 2024', value: 127000 },
  { month: 'Oct 2024', value: 135000 },
  { month: 'Nov 2024', value: 142000 },
  { month: 'Dec 2024', value: 150000 },
];

export default function ReportsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-[240px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Select defaultValue="1m">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" size="sm">
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Growth</CardTitle>
                <CardDescription>Total portfolio value over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={portfolioGrowth}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']} />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#2C5282" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Monthly Returns</CardTitle>
                <CardDescription>Performance by month</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Return']} />
                    <Legend />
                    <Bar dataKey="return" fill="#4299E1" radius={[4, 4, 0, 0]}>
                      {monthlyPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.return >= 0 ? '#48BB78' : '#E53E3E'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Current distribution of assets</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetAllocation}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {assetAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Asset Performance</CardTitle>
                <CardDescription>Individual asset returns</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={assetPerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                    <YAxis type="category" dataKey="name" width={60} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Return']} />
                    <Legend />
                    <Bar dataKey="return" radius={[0, 4, 4, 0]}>
                      {assetPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.return >= 0 ? '#48BB78' : '#E53E3E'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analysis</CardTitle>
              <CardDescription>Detailed performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-20">
                Performance analysis report will be displayed here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="allocation">
          <Card>
            <CardHeader>
              <CardTitle>Allocation Analysis</CardTitle>
              <CardDescription>Asset allocation details and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-20">
                Asset allocation analysis will be displayed here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="income">
          <Card>
            <CardHeader>
              <CardTitle>Income Report</CardTitle>
              <CardDescription>Dividends, interest, and other income sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-20">
                Income details will be displayed here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
