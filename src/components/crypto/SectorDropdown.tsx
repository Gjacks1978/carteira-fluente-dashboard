import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SectorDropdown() {
  const [value, setValue] = React.useState("")

  const sectors = [
    "Store of Value",
    "Smart Contract",
    "DeFi",
    "NFTs",
    "Gaming",
    "Layer 2",
    "Privacy",
    "Oracle",
    "Exchange",
    "Stablecoin"
  ]

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Setor" />
      </SelectTrigger>
      <SelectContent>
        {sectors.map((sector) => (
          <SelectItem key={sector} value={sector}>
            {sector}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}