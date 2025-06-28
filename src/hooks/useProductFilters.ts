
import { useState, useMemo } from "react";
import { Product } from "@/components/product/ProductCard";

export interface ProductFilters {
  brands: string[];
  sizes: string[];
  sqftRanges: string[];
  priceRanges: string[];
  features: string[];
  categories: string[];
  priceSort: 'none' | 'low-to-high' | 'high-to-low';
}

const initialFilters: ProductFilters = {
  brands: [],
  sizes: [],
  sqftRanges: [],
  priceRanges: [],
  features: [],
  categories: [],
  priceSort: 'none'
};

export const useProductFilters = (products: Product[], category: string) => {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  // Get available filter options based on the products
  const filterOptions = useMemo(() => {
    const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
    const sizes = getAvailableSizes(products, category);
    const sqftOptions = getSqftOptions(category);
    const priceOptions = getPriceOptions();
    const featureOptions = getFeatureOptions(category);
    const sortOptions = [
      { value: 'none', label: 'Default' },
      { value: 'low-to-high', label: 'Price: Low to High' },
      { value: 'high-to-low', label: 'Price: High to Low' }
    ];
    
    return {
      brands,
      sizes,
      sqftOptions,
      priceOptions,
      featureOptions,
      sortOptions
    };
  }, [products, category]);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand || '')) {
        return false;
      }

      // Size filter (category-specific)
      if (filters.sizes.length > 0) {
        const productSize = getProductSize(product, category);
        if (!filters.sizes.some(size => productSize.includes(size))) {
          return false;
        }
      }

      // Square footage filter
      if (filters.sqftRanges.length > 0) {
        const productSqft = getProductSqftRange(product, category);
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
        if (!filters.features.every(feature => hasFeature(product, feature, category))) {
          return false;
        }
      }

      return true;
    });

    // Apply price sorting
    if (filters.priceSort === 'low-to-high') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (filters.priceSort === 'high-to-low') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, filters, category]);

  const activeFilterCount = useMemo(() => {
    return filters.brands.length + 
           filters.sizes.length + 
           filters.sqftRanges.length + 
           filters.priceRanges.length + 
           filters.features.length +
           (filters.priceSort !== 'none' ? 1 : 0);
  }, [filters]);

  const clearAllFilters = () => {
    setFilters(initialFilters);
  };

  return {
    filters,
    setFilters,
    filteredProducts,
    activeFilterCount,
    clearAllFilters,
    filterOptions
  };
};

// Helper functions
function getAvailableSizes(products: Product[], category: string): string[] {
  if (category === "heat-pumps") {
    return ["2 ton", "2-3 ton", "3 ton", "4 ton"];
  } else if (category === "smart-battery") {
    return ["5kWh", "10kWh", "15kWh", "20kWh"];
  } else if (category === "solar-panels") {
    return ["300W", "400W", "500W"];
  } else if (category === "air-conditioners") {
    return ["2 ton", "2.5 ton", "3 ton", "3.5 ton"];
  } else if (category === "furnaces") {
    return ["45K BTU", "70K BTU", "90K BTU"];
  } else if (category === "tankless") {
    return ["160K BTU", "199K BTU", "199K NP"];
  }
  return [];
}

function getSqftOptions(category: string): string[] {
  if (category === "heat-pumps") {
    return [
      "< 1,000 sq ft",
      "1,000 - 1,500 sq ft", 
      "1,500 - 2,000 sq ft",
      "2,000 - 2,500 sq ft",
      "2,500+ sq ft"
    ];
  } else if (category === "smart-battery") {
    return [
      "< 1,500 sq ft",
      "1,500 - 2,500 sq ft",
      "2,500 - 3,500 sq ft",
      "3,500+ sq ft"
    ];
  } else if (category === "air-conditioners") {
    return [
      "< 1,500 sq ft",
      "1,500 - 2,000 sq ft",
      "2,000 - 2,500 sq ft",
      "2,500 - 3,000 sq ft",
      "3,000+ sq ft"
    ];
  } else if (category === "furnaces") {
    return [
      "< 1,200 sq ft",
      "1,200 - 1,800 sq ft",
      "1,800 - 2,400 sq ft",
      "2,400+ sq ft"
    ];
  } else if (category === "tankless") {
    return [
      "< 2,000 sq ft",
      "2,000 - 3,000 sq ft",
      "3,000 - 4,000 sq ft",
      "4,000+ sq ft"
    ];
  }
  return [];
}

function getPriceOptions(): string[] {
  return [
    "< $4,000",
    "$4,000 - $6,000", 
    "$6,000 - $8,000",
    "$8,000+"
  ];
}

function getFeatureOptions(category: string): string[] {
  if (category === "heat-pumps") {
    return [
      "Rebate Eligible",
      "Variable Speed",
      "Wi-Fi Compatible",
      "Energy Star"
    ];
  } else if (category === "smart-battery") {
    return [
      "Rebate Eligible",
      "App Control",
      "Grid Tie",
      "Backup Power"
    ];
  } else if (category === "solar-panels") {
    return [
      "Rebate Eligible",
      "High Efficiency",
      "Weather Resistant",
      "Warranty 25+ Years"
    ];
  } else if (category === "air-conditioners") {
    return [
      "Rebate Eligible",
      "Energy Efficient",
      "Quiet Operation",
      "Smart Home Compatible"
    ];
  } else if (category === "furnaces") {
    return [
      "Rebate Eligible",
      "High Efficiency",
      "Variable Speed",
      "Smart Thermostat Compatible"
    ];
  } else if (category === "tankless") {
    return [
      "Rebate Eligible",
      "Endless Hot Water",
      "Space Saving",
      "Energy Efficient"
    ];
  }
  return ["Rebate Eligible"];
}

function getProductSize(product: Product, category: string): string {
  if (category === "heat-pumps") {
    if (product.name.includes("2-3 ton")) return "2-3 ton";
    if (product.name.includes("2 ton")) return "2 ton";
    if (product.name.includes("3 ton")) return "3 ton";
    if (product.name.includes("4 ton")) return "4 ton";
  } else if (category === "smart-battery") {
    if (product.name.includes("5kWh")) return "5kWh";
    if (product.name.includes("10kWh")) return "10kWh";
    if (product.name.includes("15kWh")) return "15kWh";
    if (product.name.includes("20kWh")) return "20kWh";
  } else if (category === "solar-panels") {
    if (product.name.includes("300W")) return "300W";
    if (product.name.includes("400W")) return "400W";
    if (product.name.includes("500W")) return "500W";
  } else if (category === "air-conditioners") {
    if (product.name.includes("3.5 ton")) return "3.5 ton";
    if (product.name.includes("2.5 ton")) return "2.5 ton";
    if (product.name.includes("2 ton")) return "2 ton";
    if (product.name.includes("3 ton")) return "3 ton";
  } else if (category === "furnaces") {
    if (product.name.includes("045")) return "45K BTU";
    if (product.name.includes("070")) return "70K BTU";
    if (product.name.includes("090")) return "90K BTU";
  } else if (category === "tankless") {
    if (product.name.includes("160")) return "160K BTU";
    if (product.name.includes("199") && product.name.includes("NP")) return "199K NP";
    if (product.name.includes("199")) return "199K BTU";
  }
  return "";
}

function getProductSqftRange(product: Product, category: string): string {
  if (category === "heat-pumps") {
    if (product.name.includes("2-3 ton")) return "1,000-2,000";
    if (product.name.includes("2 ton")) return "1,000-1,400";
    if (product.name.includes("3 ton")) return "1,400-2,000";
    if (product.name.includes("4 ton")) return "2,000-2,800";
  } else if (category === "smart-battery") {
    if (product.name.includes("5kWh")) return "1,000-1,500";
    if (product.name.includes("10kWh")) return "1,500-2,500";
    if (product.name.includes("15kWh")) return "2,500-3,500";
    if (product.name.includes("20kWh")) return "3,500+";
  } else if (category === "air-conditioners") {
    if (product.name.includes("2 ton")) return "1,500-2,000";
    if (product.name.includes("2.5 ton")) return "2,000-2,500";
    if (product.name.includes("3 ton")) return "2,500-3,000";
    if (product.name.includes("3.5 ton")) return "3,000+";
  } else if (category === "furnaces") {
    if (product.name.includes("045")) return "1,200-1,800";
    if (product.name.includes("070")) return "1,800-2,400";
    if (product.name.includes("090")) return "2,400+";
  } else if (category === "tankless") {
    if (product.name.includes("160")) return "2,000-3,000";
    if (product.name.includes("199")) return "3,000-4,000";
  }
  return "";
}

function matchesSqftRange(productSqft: string, filterRange: string): boolean {
  const sqftMapping: Record<string, string[]> = {
    "< 1,000 sq ft": ["1,000-1,400"],
    "1,000 - 1,500 sq ft": ["1,000-1,400", "1,000-2,000", "1,000-1,500"],
    "1,500 - 2,000 sq ft": ["1,400-2,000", "1,000-2,000", "1,500-2,500", "1,500-2,000"],
    "2,000 - 2,500 sq ft": ["2,000-2,800", "1,500-2,500", "2,000-2,500"],
    "2,500+ sq ft": ["2,000-2,800", "2,500-3,500", "3,500+", "2,500-3,000", "3,000+"],
    "< 1,500 sq ft": ["1,000-1,500"],
    "1,500 - 2,500 sq ft": ["1,500-2,500"],
    "2,500 - 3,500 sq ft": ["2,500-3,500"],
    "3,500+ sq ft": ["3,500+"],
    "2,500 - 3,000 sq ft": ["2,500-3,000"],
    "3,000+ sq ft": ["3,000-4,000", "2,500-3,000", "3,000+"],
    "< 1,200 sq ft": ["1,200-1,800"],
    "1,200 - 1,800 sq ft": ["1,200-1,800"],
    "1,800 - 2,400 sq ft": ["1,800-2,400"],
    "2,400+ sq ft": ["2,400+"],
    "< 2,000 sq ft": ["2,000-3,000"],
    "2,000 - 3,000 sq ft": ["2,000-3,000"],
    "3,000 - 4,000 sq ft": ["3,000-4,000"],
    "4,000+ sq ft": ["3,000-4,000"]
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

function hasFeature(product: Product, feature: string, category: string): boolean {
  switch (feature) {
    case "Rebate Eligible":
      return product.rebate;
    case "Variable Speed":
      return product.variableSpeed || product.features.some(f => f.toLowerCase().includes("variable"));
    case "Wi-Fi Compatible":
    case "App Control":
      return product.wifiCompatible || product.features.some(f => f.toLowerCase().includes("wifi") || f.toLowerCase().includes("smart") || f.toLowerCase().includes("app"));
    case "Energy Star":
      return product.energyStar || product.features.some(f => f.toLowerCase().includes("energy star"));
    case "Grid Tie":
      return product.features.some(f => f.toLowerCase().includes("grid"));
    case "Backup Power":
      return product.features.some(f => f.toLowerCase().includes("backup"));
    case "High Efficiency":
      return product.features.some(f => f.toLowerCase().includes("efficiency"));
    case "Weather Resistant":
      return product.features.some(f => f.toLowerCase().includes("weather") || f.toLowerCase().includes("resistant"));
    case "Warranty 25+ Years":
      return product.features.some(f => f.toLowerCase().includes("warranty") || f.toLowerCase().includes("25"));
    case "Energy Efficient":
      return product.features.some(f => f.toLowerCase().includes("energy efficient"));
    case "Quiet Operation":
      return product.features.some(f => f.toLowerCase().includes("quiet"));
    case "Smart Home Compatible":
      return product.features.some(f => f.toLowerCase().includes("smart home"));
    case "Smart Thermostat Compatible":
      return product.features.some(f => f.toLowerCase().includes("smart thermostat"));
    case "Endless Hot Water":
      return product.features.some(f => f.toLowerCase().includes("endless"));
    case "Space Saving":
      return product.features.some(f => f.toLowerCase().includes("space"));
    default:
      return true;
  }
}
