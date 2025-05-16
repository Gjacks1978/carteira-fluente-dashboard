import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CustodianDropdown() {
  const [value, setValue] = React.useState("")

  const custodians = [
    "Binance",
    "Coinbase",
    "MetaMask",
    "Ledger",
    "Trezor",
    "Phantom",
    "Trust Wallet"
  ]

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Custodiante" />
      </SelectTrigger>
      <SelectContent>
        {custodians.map((custodian) => (
          <SelectItem key={custodian} value={custodian}>
            {custodian}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}