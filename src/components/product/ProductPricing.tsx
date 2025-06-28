
import React from "react";
import { Info } from "lucide-react";

interface ProductPricingProps {
  price: number;
  monthlyPayment?: number;
  isPerSqft?: boolean;
}

const ProductPricing: React.FC<ProductPricingProps> = ({ 
  price, 
  monthlyPayment, 
  isPerSqft 
}) => {
  return (
    <div className="mt-3 mb-3">
      {/* Buy Now Column */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">Buy Now</p>
          <p className="text-xl font-bold text-voltly-green">
            ${isPerSqft ? `${price.toFixed(2)}/sq ft` : price.toLocaleString()}
            <span className="text-xs font-normal text-gray-400 ml-1">
              {isPerSqft ? "" : "+ HST"}
            </span>
          </p>
          <p className="text-xs text-gray-400">
            <span className="font-bold">Installed</span>
          </p>
        </div>
        
        {monthlyPayment && !isPerSqft && (
          <div className="text-right">
            <p className="text-sm text-gray-400">Finance</p>
            <p className="text-xl font-bold text-voltly-purple">
              ${monthlyPayment}
              <span className="text-xs font-normal text-gray-400 ml-1">/mo</span>
            </p>
          </div>
        )}
      </div>
      
      {/* Finance Details - Always Visible */}
      {monthlyPayment && !isPerSqft && (
        <div className="mt-3 pt-3 border-t border-gray-800">
          <div className="flex items-center gap-1 mb-2">
            <Info className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-300 font-medium">Finance Details</span>
          </div>
          <div className="text-xs text-gray-400 space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-300">Term:</span>
              <span>36 months</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Interest Rate:</span>
              <span>7.99% APR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Financing Fee:</span>
              <span>7.5% added to total</span>
            </div>
            <p className="text-gray-500 italic mt-2 text-[10px]">
              *Take up to 15 years to pay off. Subject to approved credit at 7.99% APR. O.A.C.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPricing;
