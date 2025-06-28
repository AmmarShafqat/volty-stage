
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

interface PriceSortFilterProps {
  priceSort: 'none' | 'low-to-high' | 'high-to-low';
  sortOptions: { value: string; label: string }[];
  onSortChange: (sortValue: string) => void;
}

const PriceSortFilter: React.FC<PriceSortFilterProps> = ({
  priceSort,
  sortOptions,
  onSortChange
}) => {
  const getCurrentSortLabel = () => {
    const sortOption = sortOptions.find(option => option.value === priceSort);
    return sortOption ? sortOption.label : 'Sort by Price';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between">
          {getCurrentSortLabel()}
          {priceSort !== 'none' && (
            <Badge variant="secondary" className="ml-2">
              1
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort by Price</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={priceSort} onValueChange={onSortChange}>
          {sortOptions.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PriceSortFilter;
