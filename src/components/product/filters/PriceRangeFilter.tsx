
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface PriceRangeFilterProps {
  priceOptions: string[];
  selectedPriceRanges: string[];
  onPriceChange: (price: string, checked: boolean) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  priceOptions,
  selectedPriceRanges,
  onPriceChange
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between">
          Price Range
          {selectedPriceRanges.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {selectedPriceRanges.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Price Range</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {priceOptions.map((price) => (
          <DropdownMenuCheckboxItem
            key={price}
            checked={selectedPriceRanges.includes(price)}
            onCheckedChange={(checked) => onPriceChange(price, checked)}
          >
            {price}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PriceRangeFilter;
