
import React, { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, BadgePercent } from "lucide-react";
import { Product } from "@/components/product/ProductCard";
import { productCategories } from "@/data/productCategories";

interface RecommendedProductsProps {
  currentProducts: Product[];
  onAddProduct: (product: Product) => void;
  category?: string;
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({
  currentProducts,
  onAddProduct,
  category
}) => {
  // Get recommendations based on the current products and category
  const recommendations = useMemo(() => {
    // Get products IDs already in the cart
    const currentProductIds = currentProducts.map(p => p.id);
    
    // Start with products from the same category if specified
    let recommendedProducts: Product[] = [];
    
    if (category) {
      // Get more products from the same category
      const categoryProducts = productCategories[category]?.products || [];
      recommendedProducts = categoryProducts.filter(p => !currentProductIds.includes(p.id));
    }
    
    // If we don't have enough recommendations, add some from other categories
    if (recommendedProducts.length < 2) {
      // Get products from all categories
      const allProducts = Object.values(productCategories)
        .flatMap(cat => cat.products)
        .filter(p => !currentProductIds.includes(p.id));
        
      // Prioritize products with financing options
      const financedProducts = allProducts.filter(p => p.monthlyPayment && p.monthlyPayment > 0);
      
      // Add some financed products first
      recommendedProducts = [
        ...recommendedProducts,
        ...financedProducts.slice(0, 2)
      ];
      
      // If still not enough, add some regular products
      if (recommendedProducts.length < 2) {
        recommendedProducts = [
          ...recommendedProducts,
          ...allProducts.filter(p => !recommendedProducts.includes(p)).slice(0, 2)
        ];
      }
    }
    
    // Return max 2 recommendations
    return recommendedProducts.slice(0, 2);
  }, [currentProducts, category]);

  if (recommendations.length === 0) {
    return null;
  }

  // Function to handle image paths
  const getImagePath = (imagePath: string) => {
    // If already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // For local assets that start with "public/", remove the "public/" prefix
    if (imagePath.startsWith('public/')) {
      return imagePath.substring(7);
    }
    
    return imagePath;
  };

  return (
    <div className="flex flex-col space-y-3">
      {recommendations.map((product) => (
        <Card key={product.id} className="overflow-hidden bg-black border border-gray-800">
          <div className="p-4 flex items-center gap-3">
            <div className="w-16 h-16 bg-black rounded flex-shrink-0 relative">
              {/* Rebate Badge */}
              {product.rebate && (
                <div className="absolute -top-2 -left-2 bg-red-600 text-white rounded-full p-0.5 z-10">
                  <BadgePercent className="h-4 w-4" />
                </div>
              )}
              
              {product.category === "insulation" || product.name.includes("Insulation") ? (
                <img
                  src={getImagePath("lovable-uploads/d2192e50-f7cc-4a5f-a701-440f5c06cb8b.png")}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              ) : (
                <img
                  src={getImagePath(product.image)}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              )}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-white">{product.name}</h4>
              <div className="flex flex-col">
                <span className="text-voltly-green font-bold">
                  ${product.price.toLocaleString()}
                </span>
                {product.monthlyPayment && (
                  <span className="text-voltly-purple text-sm">
                    ${product.monthlyPayment}/mo
                  </span>
                )}
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => onAddProduct(product)}
              className="bg-voltly-purple hover:bg-voltly-purple/90 text-white"
            >
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RecommendedProducts;
