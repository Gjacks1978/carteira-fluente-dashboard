import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoveVertical } from "lucide-react";
import AssetTableRow from "./AssetTableRow";
import { TableColumn } from "./types";

interface AssetTableProps {
  assets: any[];
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
  addNewSector: (newSector: string) => boolean;
  deleteSector: (sector: string) => void;
  addNewCustodian: (newCustodian: string) => boolean;
  deleteCustodian: (custodian: string) => void;
  deleteAsset: (id: string) => void;
  handleDragStart: (id: string) => void;
  handleDragOver: (e: React.DragEvent, id: string) => void;
  handleDragEnd: () => void;
  handleColumnDragStart: (e: React.DragEvent, id: string) => void;
  handleColumnDragOver: (e: React.DragEvent) => void;
  handleColumnDrop: (e: React.DragEvent, targetId: string) => void;
  totalPortfolio: number;
  totalPortfolioBRL: number;
  totalLend: number;
  totalBorrow: number;
}

const AssetTable: React.FC<AssetTableProps> = ({
  assets,
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
  handleColumnDragStart,
  handleColumnDragOver,
  handleColumnDrop,
  totalPortfolio,
  totalPortfolioBRL,
  totalLend,
  totalBorrow,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {sortedColumns.map(
            (column) =>
              column.visible && (
                <TableHead
                  key={column.id}
                  draggable
                  onDragStart={(e) => handleColumnDragStart(e, column.id)}
                  onDragOver={handleColumnDragOver}
                  onDrop={(e) => handleColumnDrop(e, column.id)}
                  className="cursor-move relative"
                >
                  <div className="flex items-center">
                    <MoveVertical className="h-3 w-3 mr-1 text-muted-foreground" />
                    {column.title}
                  </div>
                </TableHead>
              )
          )}
          <TableHead className="text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assets.map((asset) => (
          <AssetTableRow
            key={asset.id}
            asset={asset}
            sortedColumns={sortedColumns}
            sectors={sectors}
            custodians={custodians}
            openSector={openSector}
            setOpenSector={setOpenSector}
            openCustodian={openCustodian}
            setOpenCustodian={setOpenCustodian}
            handleChangeTicker={handleChangeTicker}
            handleChangeNetwork={handleChangeNetwork}
            handleChangeSector={handleChangeSector}
            handleChangeCustodian={handleChangeCustodian}
            handleChangeQuantity={handleChangeQuantity}
            handleChangeTotal={handleChangeTotal}
            handleChangeLend={handleChangeLend}
            handleChangeBorrow={handleChangeBorrow}
            addNewSector={addNewSector}
            deleteSector={deleteSector}
            addNewCustodian={addNewCustodian}
            deleteCustodian={deleteCustodian}
            deleteAsset={deleteAsset}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDragEnd={handleDragEnd}
          />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4} className="font-medium bg-emerald-50 bg-[finance-gray-light]">
            TOTAL
          </TableCell>
          <TableCell></TableCell>
          <TableCell className="text-center font-medium">
            $
            {totalPortfolio.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </TableCell>
          <TableCell className="text-right font-medium">
            R${" "}
            {totalPortfolioBRL.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell className="text-center font-medium">
            {totalLend.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </TableCell>
          <TableCell className="text-center font-medium">
            {totalBorrow.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </TableCell>
          <TableCell className="text-right font-medium">100%</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default AssetTable;
