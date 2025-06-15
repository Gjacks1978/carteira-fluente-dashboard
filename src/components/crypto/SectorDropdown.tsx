
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus, Trash } from "lucide-react";

interface SectorDropdownProps {
  asset: {
    id: string;
    sector: string;
  };
  sectors: string[];
  onAddSector: (newSector: string) => boolean;
  onDeleteSector: (sector: string) => void;
  onChangeSector: (id: string, newSector: string) => void;
  open: string | null;
  setOpen: (id: string | null) => void;
}

const SectorDropdown: React.FC<SectorDropdownProps> = ({
  asset,
  sectors,
  onAddSector,
  onDeleteSector,
  onChangeSector,
  open,
  setOpen,
}) => {
  const [newSector, setNewSector] = React.useState("");

  const handleAddSector = () => {
    if (onAddSector(newSector)) {
      setNewSector("");
      setOpen(null);
    }
  };

  return (
    <DropdownMenu open={open === asset.id} onOpenChange={(isOpen) => setOpen(isOpen ? asset.id : null)}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between h-8">
          {asset.sector}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {sectors.map((sector) => (
          <DropdownMenuItem
            key={sector}
            onClick={() => {
              onChangeSector(asset.id, sector);
              setOpen(null);
            }}
            className="flex justify-between"
          >
            {sector}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteSector(sector);
              }}
              className="h-6 w-6 p-0"
            >
              <Trash className="h-3 w-3" />
            </Button>
          </DropdownMenuItem>
        ))}
        <div className="flex gap-2 p-2">
          <Input
            placeholder="Novo setor"
            value={newSector}
            onChange={(e) => setNewSector(e.target.value)}
            className="h-8"
          />
          <Button onClick={handleAddSector} size="sm" className="h-8">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SectorDropdown;
