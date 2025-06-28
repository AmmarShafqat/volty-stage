
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Product } from "./ProductCard";

interface ProductImageProps {
  product: Product;
}

const ProductImage: React.FC<ProductImageProps> = ({ product }) => {
  // Properly handle image paths for all products
  const getImagePath = (imagePath: string) => {
    // If already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // For local assets that start with "public/", remove the "public/" prefix
    // as Vite will resolve correctly without it
    if (imagePath.startsWith('public/')) {
      return imagePath.substring(7);
    }
    
    return imagePath;
  };

  return (
    <div className="relative">
      <AspectRatio ratio={16 / 9}>
        {product.category === "insulation" || product.name.includes("Insulation") ? (
          <img 
            src={getImagePath("lovable-uploads/d2192e50-f7cc-4a5f-a701-440f5c06cb8b.png")} 
            alt={product.name} 
            className="w-full h-full object-contain p-3" 
            loading="lazy"
          />
        ) : (
          <img 
            src={getImagePath(product.image)} 
            alt={product.name} 
            className="w-full h-full object-contain p-3" 
            loading="lazy"
          />
        )}
      </AspectRatio>
    </div>
  );
};

export default ProductImage;
