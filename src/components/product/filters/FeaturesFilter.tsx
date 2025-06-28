
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

interface FeaturesFilterProps {
  featureOptions: string[];
  selectedFeatures: string[];
  onFeatureChange: (feature: string, checked: boolean) => void;
}

const FeaturesFilter: React.FC<FeaturesFilterProps> = ({
  featureOptions,
  selectedFeatures,
  onFeatureChange
}) => {
  if (featureOptions.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between">
          Features
          {selectedFeatures.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {selectedFeatures.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Features</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {featureOptions.map((feature) => (
          <DropdownMenuCheckboxItem
            key={feature}
            checked={selectedFeatures.includes(feature)}
            onCheckedChange={(checked) => onFeatureChange(feature, checked)}
          >
            {feature}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FeaturesFilter;
