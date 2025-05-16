
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDown, ArrowUp, Trash } from "lucide-react";
import SectorDropdown from "./SectorDropdown";
import CustodianDropdown from "./CustodianDropdown";
import { TableColumn } from "./types";

interface AssetTableRowProps {
  asset: {
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
  };
  sortedColumns: TableColumn[];
  sectors: string[];
  custodians: string[];
  openSector: string | null;
  setOpenSector: (id: string | null) => void;
  openCustodian: string | null;
  setOpenCustodian: (id: string | null) => void;
  handleChangeTicker: (id: string, newTicker: string) => void;
  handleChangeNetwork: (id: string, newNetwork: string) => void;
  handleChangeSector: (id: string, newSector: string) => void;
  handleChangeCustodian: (id: string, newCustodian: string) => void;
  handleChangeQuantity: (id: string, newQuantity: number) => void;
  handleChangeTotal: (id: string, newTotal: number) => void;
  handleChangeLend: (id: string, newLend: number) => void;
  handleChangeBorrow: (id: string, newBorrow: number) => void;
  addNewSector: (newSector: string) => void;
  deleteSector: (sector: string) => void;
  addNewCustodian: (newCustodian: string) => void;
  deleteCustodian: (custodian: string) => void;
  deleteAsset: (id: string) => void;
  handleDragStart: (id: string) => void;
  handleDragOver: (e: React.DragEvent, id: string) => void;
  handleDragEnd: () => void;
}

const AssetTableRow: React.FC<AssetTableRowProps> = ({
  asset,
  sortedColumns,
  sectors,
  custodians,
  openSector,
  setOpenSector,
  openCustodian,
  setOpenCustodian,
  handleChangeTicker,
  handleChangeNetwork,
  handleChangeSector,
  handleChangeCustodian,
  handleChangeQuantity,
  handleChangeTotal,
  handleChangeLend,
  handleChangeBorrow,
  addNewSector,
  deleteSector,
  addNewCustodian,
  deleteCustodian,
  deleteAsset,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
}) => {
  return (
    <TableRow
      key={asset.id}
      draggable
      onDragStart={() => handleDragStart(asset.id)}
      onDragOver={(e) => handleDragOver(e, asset.id)}
      onDragEnd={handleDragEnd}
      className="cursor-move"
    >
      {sortedColumns.map((column) => {
        if (!column.visible) return null;
        switch (column.id) {
          case "ticker":
            return (
              <TableCell key={column.id}>
                <Input
                  type="text"
                  value={asset.ticker}
                  onChange={(e) => handleChangeTicker(asset.id, e.target.value)}
                  className="max-w-24 h-8"
                />
              </TableCell>
            );
          case "network":
            return (
              <TableCell key={column.id}>
                <Input
                  type="text"
                  value={asset.network}
                  onChange={(e) => handleChangeNetwork(asset.id, e.target.value)}
                  className="max-w-24 h-8"
                />
              </TableCell>
            );
          case "sector":
            return (
              <TableCell key={column.id}>
                <SectorDropdown
                  asset={asset}
                  sectors={sectors}
                  onAddSector={addNewSector}
                  onDeleteSector={deleteSector}
                  onChangeSector={handleChangeSector}
                  open={openSector}
                  setOpen={setOpenSector}
                />
              </TableCell>
            );
          case "price":
            return (
              <TableCell key={column.id}>
                ${asset.price.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
            );
          case "quantity":
            return (
              <TableCell key={column.id}>
                <Input
                  type="number"
                  value={asset.quantity}
                  onChange={(e) => handleChangeQuantity(asset.id, parseFloat(e.target.value) || 0)}
                  className="max-w-24 h-8"
                  step="0.00000001"
                />
              </TableCell>
            );
          case "total":
            return (
              <TableCell key={column.id} className="text-right">
                <Input
                  type="number"
                  value={asset.total}
                  onChange={(e) => handleChangeTotal(asset.id, parseFloat(e.target.value) || 0)}
                  className="max-w-28 h-8 text-right"
                  step="0.01"
                />
              </TableCell>
            );
          case "totalBRL":
            return (
              <TableCell key={column.id} className="text-right">
                R${" "}
                {asset.totalBRL.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
            );
          case "change":
            return (
              <TableCell key={column.id} className="text-center">
                <span className={`flex items-center justify-center ${asset.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {asset.change >= 0 ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                  {Math.abs(asset.change)}%
                </span>
              </TableCell>
            );
          case "custodian":
            return (
              <TableCell key={column.id}>
                <CustodianDropdown
                  asset={asset}
                  custodians={custodians}
                  onAddCustodian={addNewCustodian}
                  onDeleteCustodian={deleteCustodian}
                  onChangeCustodian={handleChangeCustodian}
                  open={openCustodian}
                  setOpen={setOpenCustodian}
                />
              </TableCell>
            );
          case "lend":
            return (
              <TableCell key={column.id} className="text-right">
                <Input
                  type="number"
                  value={asset.lend}
                  onChange={(e) => handleChangeLend(asset.id, parseFloat(e.target.value) || 0)}
                  className="max-w-20 h-8 text-right"
                  step="0.01"
                />
              </TableCell>
            );
          case "borrow":
            return (
              <TableCell key={column.id} className="text-right">
                <Input
                  type="number"
                  value={asset.borrow}
                  onChange={(e) => handleChangeBorrow(asset.id, parseFloat(e.target.value) || 0)}
                  className="max-w-20 h-8 text-right"
                  step="0.01"
                />
              </TableCell>
            );
          case "allocation":
            return (
              <TableCell key={column.id} className="text-right">
                {asset.allocation}%
              </TableCell>
            );
          default:
            return <TableCell key={column.id}></TableCell>;
        }
      })}
      <TableCell className="text-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteAsset(asset.id)}
          className="h-8 w-8 text-destructive hover:text-destructive/80"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AssetTableRow;
