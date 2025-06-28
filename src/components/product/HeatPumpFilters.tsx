
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export interface HeatPumpFilters {
  brands: string[];
  sizes: string[];
  sqftRanges: string[];
  priceRanges: string[];
  features: string[];
}

interface HeatPumpFiltersProps {
  filters: HeatPumpFilters;
  onFiltersChange: (filters: HeatPumpFilters) => void;
  onClearAll: () => void;
  activeFilterCount: number;
}

const HeatPumpFilters: React.FC<HeatPumpFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearAll,
  activeFilterCount
}) => {
  const brandOptions = ["Kepler", "Tosot"];
  const sizeOptions = ["2 ton", "2-3 ton", "3 ton", "4 ton"];
  const sqftOptions = [
    "< 1,000 sq ft",
    "1,000 - 1,500 sq ft", 
    "1,500 - 2,000 sq ft",
    "2,000 - 2,500 sq ft",
    "2,500+ sq ft"
  ];
  const priceOptions = [
    "< $4,000",
    "$4,000 - $6,000", 
    "$6,000 - $8,000",
    "$8,000+"
  ];
  const featureOptions = [
    "Rebate Eligible",
    "Variable Speed",
    "Wi-Fi Compatible",
    "Energy Star"
  ];

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked 
      ? [...filters.brands, brand]
      : filters.brands.filter(b => b !== brand);
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked 
      ? [...filters.sizes, size]
      : filters.sizes.filter(s => s !== size);
    onFiltersChange({ ...filters, sizes: newSizes });
  };

  const handleSqftChange = (sqft: string, checked: boolean) => {
    const newSqftRanges = checked 
      ? [...filters.sqftRanges, sqft]
      : filters.sqftRanges.filter(s => s !== sqft);
    onFiltersChange({ ...filters, sqftRanges: newSqftRanges });
  };

  const handlePriceChange = (price: string, checked: boolean) => {
    const newPriceRanges = checked 
      ? [...filters.priceRanges, price]
      : filters.priceRanges.filter(p => p !== price);
    onFiltersChange({ ...filters, priceRanges: newPriceRanges });
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    const newFeatures = checked 
      ? [...filters.features, feature]
      : filters.features.filter(f => f !== feature);
    onFiltersChange({ ...filters, features: newFeatures });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Heat Pumps
            {activeFilterCount > 0 && (
              <Badge variant="secondary">{activeFilterCount}</Badge>
            )}
          </CardTitle>
          {activeFilterCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onClearAll}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          
          {/* Brand Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between">
                Brand
                {filters.brands.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {filters.brands.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select Brands</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {brandOptions.map((brand) => (
                <DropdownMenuCheckboxItem
                  key={brand}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked)}
                >
                  {brand}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Size Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between">
                Size/Capacity
                {filters.sizes.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {filters.sizes.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select Sizes</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sizeOptions.map((size) => (
                <DropdownMenuCheckboxItem
                  key={size}
                  checked={filters.sizes.includes(size)}
                  onCheckedChange={(checked) => handleSizeChange(size, checked)}
                >
                  {size}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Square Footage Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between">
                Home Size
                {filters.sqftRanges.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {filters.sqftRanges.length}
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
                  checked={filters.sqftRanges.includes(sqft)}
                  onCheckedChange={(checked) => handleSqftChange(sqft, checked)}
                >
                  {sqft}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Price Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between">
                Price Range
                {filters.priceRanges.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {filters.priceRanges.length}
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
                  checked={filters.priceRanges.includes(price)}
                  onCheckedChange={(checked) => handlePriceChange(price, checked)}
                >
                  {price}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Features Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between">
                Features
                {filters.features.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {filters.features.length}
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
                  checked={filters.features.includes(feature)}
                  onCheckedChange={(checked) => handleFeatureChange(feature, checked)}
                >
                  {feature}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </CardContent>
    </Card>
  );
};

export default HeatPumpFilters;
