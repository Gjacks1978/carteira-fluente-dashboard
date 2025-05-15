
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, FileText, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ImportPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Import Data</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Import Assets</CardTitle>
          <CardDescription>
            Import your assets from external sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="csv">
            <TabsList className="mb-4">
              <TabsTrigger value="csv">CSV Upload</TabsTrigger>
              <TabsTrigger value="exchange">Exchange API</TabsTrigger>
              <TabsTrigger value="broker">Broker Import</TabsTrigger>
            </TabsList>
            
            <TabsContent value="csv">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="asset-type">Asset Type</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select asset type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      <SelectItem value="stocks-us">US Stocks</SelectItem>
                      <SelectItem value="stocks-br">BR Stocks</SelectItem>
                      <SelectItem value="fixed-income">Fixed Income</SelectItem>
                      <SelectItem value="cash">Cash & Currency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="csv-file">CSV File</Label>
                  <div className="flex w-full items-center gap-2">
                    <Input id="csv-file" type="file" accept=".csv" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Upload a CSV file with your asset data
                  </p>
                </div>
                
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>CSV Format</AlertTitle>
                  <AlertDescription>
                    Your CSV file should have the following columns: asset_name, ticker, quantity, purchase_price, purchase_date
                  </AlertDescription>
                </Alert>
                
                <div className="flex gap-2">
                  <Button>
                    <Upload className="mr-2 h-4 w-4" /> Upload and Import
                  </Button>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" /> Download Template
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="exchange">
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>API Access</AlertTitle>
                <AlertDescription>
                  You'll need to generate API keys from your exchange. These are read-only keys that allow us to import your balances.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="exchange">Exchange</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select exchange" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="binance">Binance</SelectItem>
                      <SelectItem value="coinbase">Coinbase</SelectItem>
                      <SelectItem value="ftx">FTX</SelectItem>
                      <SelectItem value="kraken">Kraken</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="api-key">API Key</Label>
                  <Input id="api-key" type="text" placeholder="Enter your API key" />
                </div>
                
                <div>
                  <Label htmlFor="api-secret">API Secret</Label>
                  <Input id="api-secret" type="password" placeholder="Enter your API secret" />
                </div>
                
                <Button>Connect Exchange</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="broker">
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Broker Integration</AlertTitle>
                <AlertDescription>
                  Connect to your brokerage account to automatically import your stocks and investments.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="broker">Broker</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select broker" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="avenue">Avenue</SelectItem>
                      <SelectItem value="nuinvest">NuInvest</SelectItem>
                      <SelectItem value="xp">XP Investimentos</SelectItem>
                      <SelectItem value="rico">Rico</SelectItem>
                      <SelectItem value="clear">Clear</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Button>Connect to Broker</Button>
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  You'll be redirected to your broker's website to authenticate and authorize access.
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Import History</CardTitle>
          <CardDescription>
            Previous data imports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            No import history yet. Import data to see it here.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
