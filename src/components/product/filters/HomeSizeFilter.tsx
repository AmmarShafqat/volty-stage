
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

interface HomeSizeFilterProps {
  sqftOptions: string[];
  selectedSqftRanges: string[];
  onSqftChange: (sqft: string, checked: boolean) => void;
}

const HomeSizeFilter: React.FC<HomeSizeFilterProps> = ({
  sqftOptions,
  selectedSqftRanges,
  onSqftChange
}) => {
  if (sqftOptions.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between">
          Home Size
          {selectedSqftRanges.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {selectedSqftRanges.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Home Size</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sqftOptions.map((sqft) => (
          <DropdownMenuCheckboxItem
            key={sqft}
            checked={selectedSqftRanges.includes(sqft)}
            onCheckedChange={(checked) => onSqftChange(sqft, checked)}
          >
            {sqft}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HomeSizeFilter;
