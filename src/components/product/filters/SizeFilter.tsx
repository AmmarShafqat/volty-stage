
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

interface SizeFilterProps {
  sizes: string[];
  selectedSizes: string[];
  category: string;
  onSizeChange: (size: string, checked: boolean) => void;
}

const SizeFilter: React.FC<SizeFilterProps> = ({
  sizes,
  selectedSizes,
  category,
  onSizeChange
}) => {
  const getSizeLabel = () => {
    if (category === "heat-pumps") return "Size/Capacity";
    if (category === "smart-battery") return "Size/Capacity";
    if (category === "solar-panels") return "Size/Capacity";
    return "Size/Capacity";
  };

  if (sizes.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between">
          {getSizeLabel()}
          {selectedSizes.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {selectedSizes.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select {getSizeLabel()}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sizes.map((size) => (
          <DropdownMenuCheckboxItem
            key={size}
            checked={selectedSizes.includes(size)}
            onCheckedChange={(checked) => onSizeChange(size, checked)}
          >
            {size}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SizeFilter;
