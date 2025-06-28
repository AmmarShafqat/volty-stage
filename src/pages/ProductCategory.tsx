
import React from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import CategoryHeader from "@/components/product/CategoryHeader";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryNotFound from "@/components/product/CategoryNotFound";
import ProductFilters from "@/components/product/ProductFilters";
import { productCategories } from "@/data/productCategories";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useProductFilters } from "@/hooks/useProductFilters";

const ProductCategory = () => {
  const { category } = useParams<{ category: string }>();
  
  // Fallback if category doesn't exist
  if (!category || !productCategories[category]) {
    return (
      <Layout>
        <CategoryNotFound />
      </Layout>
    );
  }

  const categoryData = productCategories[category];
  
  // Use the generic product filters hook
  const {
    filters,
    setFilters,
    filteredProducts,
    activeFilterCount,
    clearAllFilters,
    filterOptions
  } = useProductFilters(categoryData.products, category);

  return (
    <Layout>
      <div className="pt-20 pb-12 bg-white">
        <div className="container mx-auto px-4">
          <CategoryHeader 
            title={categoryData.title} 
            description={categoryData.description}
            category={category}
          />
          
          {/* Product Filters */}
          <ProductFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClearAll={clearAllFilters}
            activeFilterCount={activeFilterCount}
            filterOptions={filterOptions}
            category={category}
          />
          
          <TooltipProvider>
            <ProductGrid products={filteredProducts} />
          </TooltipProvider>
          
          {/* Show no results message if filtered results are empty */}
          {filteredProducts.length === 0 && activeFilterCount > 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products match your current filters.</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your filters to see more options.</p>
            </div>
          )}
          
          {/* Trust Banner moved to bottom of page after product listings */}
          <div className="my-6 bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="bg-[#00FF7F]/10 border-b border-[#00FF7F]/20 px-4 py-3">
              <h3 className="text-lg font-medium text-center">Shop With Confidence</h3>
            </div>
            <div className="grid grid-cols-3 gap-2 p-4 text-center">
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#00FF7F]/10 p-2 rounded-full mb-2">
                  <svg className="w-5 h-5 text-[#00FF7F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium">Safe & Secure</h4>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#00FF7F]/10 p-2 rounded-full mb-2">
                  <svg className="w-5 h-5 text-[#00FF7F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium">Trusted Pros</h4>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-[#00FF7F]/10 p-2 rounded-full mb-2">
                  <svg className="w-5 h-5 text-[#00FF7F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium">Easy Process</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductCategory;
