
import React from "react";
import { Info } from "lucide-react";

interface TechnicalDetail {
  name: string;
  value: string | number;
}

interface SizingInfo {
  title: string;
  description: string;
}

interface ProductSpecsProps {
  technicalDetails: TechnicalDetail[];
  specifications?: string[];
  sizingInfo?: SizingInfo;
}

const ProductSpecs: React.FC<ProductSpecsProps> = ({
  technicalDetails,
  specifications,
  sizingInfo
}) => {
  return (
    <div className="mt-3 mb-3 pt-3 border-t border-gray-800">
      <div className="flex items-center gap-1 mb-3">
        <Info className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-300 font-medium">Product Specifications</span>
      </div>
      
      {sizingInfo && (
        <div className="mb-3 pb-2 border-b border-gray-800">
          <p className="font-medium text-gray-300 text-sm">{sizingInfo.title}</p>
          <p className="text-xs text-gray-400">{sizingInfo.description}</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {technicalDetails.slice(0, 6).map((detail, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-xs text-gray-500">{detail.name}</span>
            <span className="text-xs text-gray-300 font-medium">{detail.value}</span>
          </div>
        ))}
      </div>
      
      {specifications && specifications.length > 0 && (
        <div className="mt-3 pt-2 border-t border-gray-800">
          <p className="text-xs text-gray-300 font-medium mb-1">Features</p>
          <div className="flex flex-wrap gap-1">
            {specifications.slice(0, 3).map((spec, index) => (
              <span key={index} className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                {spec}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSpecs;
