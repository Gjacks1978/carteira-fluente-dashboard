
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

interface CustodianDropdownProps {
  asset: {
    id: string;
    custodian: string;
  };
  custodians: string[];
  onAddCustodian: (newCustodian: string) => boolean;
  onDeleteCustodian: (custodian: string) => void;
  onChangeCustodian: (id: string, newCustodian: string) => void;
  open: string | null;
  setOpen: (id: string | null) => void;
}

const CustodianDropdown: React.FC<CustodianDropdownProps> = ({
  asset,
  custodians,
  onAddCustodian,
  onDeleteCustodian,
  onChangeCustodian,
  open,
  setOpen,
}) => {
  const [newCustodian, setNewCustodian] = React.useState("");

  const handleAddCustodian = () => {
    if (onAddCustodian(newCustodian)) {
      setNewCustodian("");
      setOpen(null);
    }
  };

  return (
    <DropdownMenu open={open === asset.id} onOpenChange={(isOpen) => setOpen(isOpen ? asset.id : null)}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between h-8">
          {asset.custodian}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {custodians.map((custodian) => (
          <DropdownMenuItem
            key={custodian}
            onClick={() => {
              onChangeCustodian(asset.id, custodian);
              setOpen(null);
            }}
            className="flex justify-between"
          >
            {custodian}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteCustodian(custodian);
              }}
              className="h-6 w-6 p-0"
            >
              <Trash className="h-3 w-3" />
            </Button>
          </DropdownMenuItem>
        ))}
        <div className="flex gap-2 p-2">
          <Input
            placeholder="Nova custódia"
            value={newCustodian}
            onChange={(e) => setNewCustodian(e.target.value)}
            className="h-8"
          />
          <Button onClick={handleAddCustodian} size="sm" className="h-8">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustodianDropdown;
