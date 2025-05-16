
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { ChevronDown, Plus, Trash } from "lucide-react";
import { toast } from "sonner";

interface SectorDropdownProps {
  asset: {
    id: string;
    sector: string;
  };
  sectors: string[];
  onAddSector: (newSector: string) => void;
  onDeleteSector: (sector: string) => void;
  onChangeSector: (id: string, newSector: string) => void;
  open: string | null;
  setOpen: (id: string | null) => void;
}

const SectorDropdown = ({
  asset,
  sectors,
  onAddSector,
  onDeleteSector,
  onChangeSector,
  open,
  setOpen,
}: SectorDropdownProps) => {
  const [newSector, setNewSector] = useState("");

  const handleAddSector = () => {
    if (newSector && !sectors.includes(newSector)) {
      onAddSector(newSector);
      onChangeSector(asset.id, newSector);
      setOpen(null);
      setNewSector("");
    } else if (sectors.includes(newSector)) {
      toast.error("Este setor já existe!");
    }
  };

  return (
    <Popover open={open === asset.id} onOpenChange={(isOpen) => setOpen(isOpen ? asset.id : null)}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open === asset.id} className="w-40 justify-between h-8">
          {asset.sector}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          <CommandInput placeholder="Buscar setor..." />
          <CommandEmpty>Nenhum setor encontrado.</CommandEmpty>
          <CommandGroup>
            {(sectors || []).map((sector) => (
              <CommandItem
                key={sector}
                value={sector}
                onSelect={() => {
                  onChangeSector(asset.id, sector);
                  setOpen(null);
                }}
                className="flex justify-between items-center"
              >
                <span>{sector}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSector(sector);
                  }}
                >
                  <Trash className="h-3 w-3" />
                </Button>
              </CommandItem>
            ))}
          </CommandGroup>
          <div className="border-t p-2 flex gap-2">
            <Input
              placeholder="Novo setor"
              value={newSector}
              onChange={(e) => setNewSector(e.target.value)}
              className="h-8"
            />
            <Button type="button" size="sm" onClick={handleAddSector}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SectorDropdown;
