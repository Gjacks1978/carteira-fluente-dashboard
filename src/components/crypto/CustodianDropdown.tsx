
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { ChevronDown, Plus, Trash } from "lucide-react";
import { toast } from "sonner";

interface CustodianDropdownProps {
  asset: {
    id: string;
    custodian: string;
  };
  custodians: string[];
  onAddCustodian: (newCustodian: string) => void;
  onDeleteCustodian: (custodian: string) => void;
  onChangeCustodian: (id: string, newCustodian: string) => void;
  open: string | null;
  setOpen: (id: string | null) => void;
}

const CustodianDropdown = ({
  asset,
  custodians,
  onAddCustodian,
  onDeleteCustodian,
  onChangeCustodian,
  open,
  setOpen,
}: CustodianDropdownProps) => {
  const [newCustodian, setNewCustodian] = useState("");

  const handleAddCustodian = () => {
    if (newCustodian && !custodians.includes(newCustodian)) {
      onAddCustodian(newCustodian);
      onChangeCustodian(asset.id, newCustodian);
      setOpen(null);
      setNewCustodian("");
    } else if (custodians.includes(newCustodian)) {
      toast.error("Esta custódia já existe!");
    }
  };

  return (
    <Popover open={open === asset.id} onOpenChange={(isOpen) => setOpen(isOpen ? asset.id : null)}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open === asset.id} className="w-40 justify-between h-8">
          {asset.custodian}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          <CommandInput placeholder="Buscar custódia..." />
          <CommandEmpty>Nenhuma custódia encontrada.</CommandEmpty>
          <CommandGroup>
            {(custodians || []).map((custodian) => (
              <CommandItem
                key={custodian}
                value={custodian}
                onSelect={() => {
                  onChangeCustodian(asset.id, custodian);
                  setOpen(null);
                }}
                className="flex justify-between items-center"
              >
                <span>{custodian}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCustodian(custodian);
                  }}
                >
                  <Trash className="h-3 w-3" />
                </Button>
              </CommandItem>
            ))}
          </CommandGroup>
          <div className="border-t p-2 flex gap-2">
            <Input
              placeholder="Nova custódia"
              value={newCustodian}
              onChange={(e) => setNewCustodian(e.target.value)}
              className="h-8"
            />
            <Button type="button" size="sm" onClick={handleAddCustodian}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CustodianDropdown;
