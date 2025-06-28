
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";
import { ProductFilters as ProductFiltersType } from "@/hooks/useProductFilters";
import PriceSortFilter from "./filters/PriceSortFilter";
import BrandFilter from "./filters/BrandFilter";
import SizeFilter from "./filters/SizeFilter";
import HomeSizeFilter from "./filters/HomeSizeFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import FeaturesFilter from "./filters/FeaturesFilter";

interface ProductFiltersProps {
  filters: ProductFiltersType;
  onFiltersChange: (filters: ProductFiltersType) => void;
  onClearAll: () => void;
  activeFilterCount: number;
  filterOptions: {
    brands: string[];
    sizes: string[];
    sqftOptions: string[];
    priceOptions: string[];
    featureOptions: string[];
    sortOptions: { value: string; label: string }[];
  };
  category: string;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearAll,
  activeFilterCount,
  filterOptions,
  category
}) => {
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

  const handleSortChange = (sortValue: string) => {
    onFiltersChange({ ...filters, priceSort: sortValue as 'none' | 'low-to-high' | 'high-to-low' });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Products
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
          <PriceSortFilter
            priceSort={filters.priceSort}
            sortOptions={filterOptions.sortOptions}
            onSortChange={handleSortChange}
          />

          <BrandFilter
            brands={filterOptions.brands}
            selectedBrands={filters.brands}
            onBrandChange={handleBrandChange}
          />

          <SizeFilter
            sizes={filterOptions.sizes}
            selectedSizes={filters.sizes}
            category={category}
            onSizeChange={handleSizeChange}
          />

          <HomeSizeFilter
            sqftOptions={filterOptions.sqftOptions}
            selectedSqftRanges={filters.sqftRanges}
            onSqftChange={handleSqftChange}
          />

          <PriceRangeFilter
            priceOptions={filterOptions.priceOptions}
            selectedPriceRanges={filters.priceRanges}
            onPriceChange={handlePriceChange}
          />

          <FeaturesFilter
            featureOptions={filterOptions.featureOptions}
            selectedFeatures={filters.features}
            onFeatureChange={handleFeatureChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;
