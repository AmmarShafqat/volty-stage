import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import ProductImage from "./ProductImage";
import ProductPricing from "./ProductPricing";
import ProductSpecs from "./ProductSpecs";
import ProductActions from "./ProductActions";
import { getDefaultTechnicalDetails, getDefaultSpecifications, getSizingInfo, getSizingBadgeText } from "./helpers/productDetailHelpers";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";
import { Home, Wrench } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  price: number;
  monthlyPayment?: number;
  image: string;
  features: string[];
  rebate: boolean;
  isPerSqft?: boolean;
  category?: string;
  technicalDetails?: { name: string; value: string | number }[];
  specifications?: string[];
  brand?: string;
  model?: string;
  seerRating?: number;
  btuRating?: number;
  recommendedSqft?: string;
  energyStar?: boolean;
  wifiCompatible?: boolean;
  variableSpeed?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = () => {
    addItem(product);
  };
  
  const handleCardClick = () => {
    navigate(`/product/${product.category}/${product.id}`);
  };
  
  // Default technical details based on product category if not provided
  const technicalDetails = product.technicalDetails || getDefaultTechnicalDetails(product);
  const specifications = product.specifications || getDefaultSpecifications(product);
  
  // Get sizing information for this product
  const sizingInfo = getSizingInfo(product);
  const sizingBadgeText = getSizingBadgeText(product);
  
  console.log('Product:', product.name, 'Category:', product.category, 'Sizing Badge Text:', sizingBadgeText);
  
  return (
    <Card 
      className="overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 hover:border-voltly-green/50 transition-all duration-300 shadow-lg group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Product Image with hover effect */}
      <div className="relative overflow-hidden">
        <div className="transition-transform duration-500 ease-in-out group-hover:scale-105">
          <ProductImage product={product} />
        </div>
        
        {/* Badges Container - Only sizing badge now */}
        <div className="absolute top-3 left-3 right-3 flex justify-end items-start">
          {sizingBadgeText && (
            <Badge className="bg-blue-600 text-white font-medium flex items-center gap-1">
              <Home className="h-3 w-3" />
              {sizingBadgeText}
            </Badge>
          )}
        </div>

        {/* Installation Included Banner */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-voltly-green to-green-400 text-black py-2 px-3">
          <div className="flex items-center justify-center gap-2">
            <Wrench className="h-4 w-4" />
            <span className="font-bold text-sm">Installation Included</span>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-white">
            {product.name}
          </h3>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {/* Show model number as first feature for Tosot and Novair */}
          {product.model && (product.brand === "Tosot" || product.brand === "Novair") && (
            <Badge variant="outline" className="text-xs bg-gray-800 text-gray-300 border-gray-700">
              Model: {product.model}
            </Badge>
          )}
          {product.features.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-gray-800 text-gray-300 border-gray-700">
              {feature}
            </Badge>
          ))}
        </div>

        {/* Price Section */}
        <ProductPricing 
          price={product.price} 
          monthlyPayment={product.monthlyPayment} 
          isPerSqft={product.isPerSqft}
        />
        
        {/* Technical Details */}
        <ProductSpecs 
          technicalDetails={technicalDetails} 
          specifications={specifications}
          sizingInfo={sizingInfo}
        />
        
        {/* Action Buttons with animation */}
        <div className={`transition-all duration-300 ${isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-90'}`}>
          <ProductActions 
            isPerSqft={product.isPerSqft}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
