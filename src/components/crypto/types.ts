
export interface CriptoAsset {
  id: string;
  ticker: string;
  network: string;
  price: number;
  quantity: number;
  total: number;
  totalBRL: number;
  change: number;
  custodian: string;
  allocation: number;
  sector: string;
  lend: number;
  borrow: number;
}

export interface TableColumn {
  id: string;
  title: string;
  visible: boolean;
  order: number;
}
