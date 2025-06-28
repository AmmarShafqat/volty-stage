
import { useState, useMemo } from "react";
import { Product } from "@/components/product/ProductCard";

export interface HeatPumpFilters {
  brands: string[];
  sizes: string[];
  sqftRanges: string[];
  priceRanges: string[];
  features: string[];
}

const initialFilters: HeatPumpFilters = {
  brands: [],
  sizes: [],
  sqftRanges: [],
  priceRanges: [],
  features: []
};

export const useHeatPumpFilters = (products: Product[]) => {
  const [filters, setFilters] = useState<HeatPumpFilters>(initialFilters);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand || '')) {
        return false;
      }

      // Size filter
      if (filters.sizes.length > 0) {
        const productSize = getProductSize(product.name);
        if (!filters.sizes.some(size => productSize.includes(size))) {
          return false;
        }
      }

      // Square footage filter
      if (filters.sqftRanges.length > 0) {
        const productSqft = getProductSqftRange(product.name);
        if (!filters.sqftRanges.some(range => matchesSqftRange(productSqft, range))) {
          return false;
        }
      }

      // Price filter
      if (filters.priceRanges.length > 0) {
        if (!filters.priceRanges.some(range => matchesPriceRange(product.price, range))) {
          return false;
        }
      }

      // Features filter
      if (filters.features.length > 0) {
        if (!filters.features.every(feature => hasFeature(product, feature))) {
          return false;
        }
      }

      return true;
    });
  }, [products, filters]);

  const activeFilterCount = useMemo(() => {
    return filters.brands.length + 
           filters.sizes.length + 
           filters.sqftRanges.length + 
           filters.priceRanges.length + 
           filters.features.length;
  }, [filters]);

  const clearAllFilters = () => {
    setFilters(initialFilters);
  };

  return {
    filters,
    setFilters,
    filteredProducts,
    activeFilterCount,
    clearAllFilters
  };
};

// Helper functions
function getProductSize(productName: string): string {
  if (productName.includes("2-3 ton")) return "2-3 ton";
  if (productName.includes("2 ton")) return "2 ton";
  if (productName.includes("3 ton")) return "3 ton";
  if (productName.includes("4 ton")) return "4 ton";
  return "";
}

function getProductSqftRange(productName: string): string {
  if (productName.includes("2-3 ton")) return "1,000-2,000";
  if (productName.includes("2 ton")) return "1,000-1,400";
  if (productName.includes("3 ton")) return "1,400-2,000";
  if (productName.includes("4 ton")) return "2,000-2,800";
  return "";
}

function matchesSqftRange(productSqft: string, filterRange: string): boolean {
  const sqftMapping: Record<string, string[]> = {
    "< 1,000 sq ft": ["1,000-1,400"],
    "1,000 - 1,500 sq ft": ["1,000-1,400", "1,000-2,000"],
    "1,500 - 2,000 sq ft": ["1,400-2,000", "1,000-2,000"],
    "2,000 - 2,500 sq ft": ["2,000-2,800"],
    "2,500+ sq ft": ["2,000-2,800"]
  };
  
  return sqftMapping[filterRange]?.some(range => productSqft.includes(range)) || false;
}

function matchesPriceRange(price: number, range: string): boolean {
  switch (range) {
    case "< $4,000":
      return price < 4000;
    case "$4,000 - $6,000":
      return price >= 4000 && price <= 6000;
    case "$6,000 - $8,000":
      return price >= 6000 && price <= 8000;
    case "$8,000+":
      return price > 8000;
    default:
      return true;
  }
}

function hasFeature(product: Product, feature: string): boolean {
  switch (feature) {
    case "Rebate Eligible":
      return product.rebate;
    case "Variable Speed":
      return product.variableSpeed || product.features.some(f => f.toLowerCase().includes("variable"));
    case "Wi-Fi Compatible":
      return product.wifiCompatible || product.features.some(f => f.toLowerCase().includes("wifi") || f.toLowerCase().includes("smart"));
    case "Energy Star":
      return product.energyStar || product.features.some(f => f.toLowerCase().includes("energy star"));
    default:
      return true;
  }
}
