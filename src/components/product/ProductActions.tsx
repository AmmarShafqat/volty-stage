
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, FileText } from "lucide-react";

interface ProductActionsProps {
  isPerSqft?: boolean;
  handleAddToCart: () => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  isPerSqft,
  handleAddToCart
}) => {
  return (
    <div className="space-y-3 mt-4">
      <Button 
        className="w-full bg-voltly-green hover:bg-voltly-green/90 text-black font-bold py-3 group transition-all duration-300" 
        onClick={handleAddToCart}
      >
        <ShoppingCart className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" /> 
        Add to Cart
      </Button>
      
      {isPerSqft && (
        <Button 
          variant="outline" 
          className="w-full mt-2 border-voltly-purple text-voltly-purple hover:bg-voltly-purple/10 transition-all duration-300"
        >
          <FileText className="mr-2 h-4 w-4" />
          Get Custom Quote
        </Button>
      )}
    </div>
  );
};

export default ProductActions;
