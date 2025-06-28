
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Product } from "./ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, CreditCard, CircleDollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductBundleProps {
  primaryProduct: Product;
  complementaryProducts: Product[];
  monthlySavings?: number;
}

const ProductBundle: React.FC<ProductBundleProps> = ({ 
  primaryProduct, 
  complementaryProducts,
  monthlySavings = 0 
}) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState<number[]>([primaryProduct.id]);

  // Interest rate and term for financing calculations
  const interestRate = 0.0799; // 7.99%
  const financeTerm = 36; // 36 months
  const financingFee = 0.075; // 7.5% added to total

  // Calculate total bundle price
  const bundleTotal = (): number => {
    const allProducts = [primaryProduct, ...complementaryProducts];
    return allProducts
      .filter(product => selectedProducts.includes(product.id))
      .reduce((sum, product) => sum + product.price, 0);
  };

  // Get monthly payments for selected products from their monthlyPayment property
  const calculatedMonthlyPayment = (): number => {
    const allProducts = [primaryProduct, ...complementaryProducts];
    return allProducts
      .filter(product => selectedProducts.includes(product.id))
      .reduce((sum, product) => sum + (product.monthlyPayment || 0), 0);
  };

  // Use the pre-calculated monthly payment values directly
  const monthlyPayment = calculatedMonthlyPayment();

  // Toggle product selection
  const toggleProduct = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId && id !== primaryProduct.id) // Don't allow removing primary product
        : [...prev, productId]
    );
  };

  // Calculate savings compared to individual purchases (simplified)
  const bundleSavings = (): number => {
    const totalItems = selectedProducts.length;
    if (totalItems <= 1) return 0;
    
    // Simple discount calculation based on bundle size
    const discountRate = Math.min((totalItems - 1) * 0.05, 0.15); // Max 15% discount
    return Math.round(bundleTotal() * discountRate);
  };

  // Net monthly cost after estimated energy savings
  const netMonthlyCost = Math.max(0, monthlyPayment - monthlySavings);
  
  // Final bundle price after savings
  const finalBundlePrice = bundleTotal() - bundleSavings();

  // Add all selected products to cart
  const addBundleToCart = () => {
    const allProducts = [primaryProduct, ...complementaryProducts];
    const selectedProductsData = allProducts.filter(product => 
      selectedProducts.includes(product.id)
    );
    
    selectedProductsData.forEach(product => {
      addItem(product);
    });
    
    toast({
      title: "Bundle added to cart",
      description: `${selectedProductsData.length} products added to your cart.`,
    });
  };

  // Handle finance now button
  const handleFinanceNow = () => {
    const allProducts = [primaryProduct, ...complementaryProducts];
    const selectedProductsData = allProducts.filter(product => 
      selectedProducts.includes(product.id)
    );
    
    navigate("/finance-checkout", { 
      state: { 
        products: selectedProductsData,
        bundleTotal: finalBundlePrice,
        monthlyPayment,
        netMonthlyCost,
        monthlySavings
      }
    });
  };

  return (
    <div className="bg-black/90 border-2 border-voltly-purple/30 rounded-lg p-6 shadow-lg mb-12">
      <h3 className="text-2xl md:text-3xl font-bold text-voltly-purple mb-6">Build Your Energy Solution Bundle</h3>
      
      {/* Primary product - always selected */}
      <div className="mb-8 border-b border-gray-800 pb-6">
        <div className="flex items-center mb-4">
          <Checkbox 
            checked={true}
            disabled={true}
            className="h-5 w-5 rounded-sm data-[state=checked]:bg-voltly-green"
          />
          <div className="ml-3">
            <h4 className="text-xl font-semibold text-white flex items-center">
              {primaryProduct.name}
              <Badge variant="outline" className="ml-3 bg-voltly-green/20 text-voltly-green border-voltly-green">
                Primary Recommendation
              </Badge>
            </h4>
            <p className="text-2xl font-bold text-voltly-green mt-2">
              ${primaryProduct.price.toLocaleString()}
              <span className="text-sm text-gray-400 ml-1">+ HST</span>
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Monthly payment: ${primaryProduct.monthlyPayment} with financing
            </p>
          </div>
        </div>
        <p className="text-gray-300">
          Primary recommendation for maximum energy efficiency and savings.
        </p>
      </div>
      
      {/* Complementary products - can be selected */}
      <div className="mb-8">
        <h4 className="text-lg font-medium text-white mb-4">Add Complementary Products:</h4>
        
        <div className="space-y-6">
          {complementaryProducts.map(product => (
            <div key={product.id} className="flex items-start">
              <Checkbox 
                id={`product-${product.id}`}
                checked={selectedProducts.includes(product.id)}
                onCheckedChange={() => toggleProduct(product.id)}
                className="h-5 w-5 rounded-sm mt-1 data-[state=checked]:bg-voltly-green"
              />
              <div className="ml-3">
                <label 
                  htmlFor={`product-${product.id}`} 
                  className="text-lg font-medium text-white cursor-pointer"
                >
                  {product.name}
                </label>
                <p className="text-xl font-bold text-voltly-green mt-1">
                  ${product.price.toLocaleString()}
                  <span className="text-sm text-gray-400 ml-1">+ HST</span>
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {product.monthlyPayment 
                    ? `Monthly payment: $${product.monthlyPayment} with financing` 
                    : product.isPerSqft 
                      ? `$${product.price}/sq ft installed` 
                      : "One-time purchase"}
                </p>
                <p className="text-gray-300 text-sm mt-2">
                  {product.features.join(" • ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bundle summary card */}
      <Card className="bg-black border-voltly-green/30 mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Package className="h-6 w-6 text-voltly-green mr-2" />
              <h4 className="text-xl font-bold text-white">Bundle Summary</h4>
            </div>
            <Badge variant="outline" className="bg-voltly-green/10 text-voltly-green border-voltly-green">
              {selectedProducts.length} Items Selected
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Bundle Total:</span>
              <span className="text-white font-bold">${bundleTotal().toLocaleString()}</span>
            </div>
            
            {bundleSavings() > 0 && (
              <div className="flex justify-between text-voltly-green">
                <span>Bundle Savings:</span>
                <span className="font-bold">-${bundleSavings().toLocaleString()}</span>
              </div>
            )}
            
            <div className="border-t border-gray-700 pt-3 flex justify-between">
              <span className="text-white">Final Bundle Price:</span>
              <span className="text-2xl font-bold text-voltly-green">
                ${(bundleTotal() - bundleSavings()).toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Financing options */}
      <div className="bg-voltly-purple/20 border border-voltly-purple rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <CreditCard className="h-6 w-6 text-voltly-purple mr-2" />
          <h4 className="text-xl font-bold text-white">Financing Options</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-black/40 p-4 rounded-lg">
            <p className="text-gray-300 text-sm">Monthly Payment</p>
            <p className="text-2xl font-bold text-voltly-purple">${monthlyPayment}</p>
            <p className="text-xs text-gray-400">7.99% interest, 36 months</p>
          </div>
          
          {monthlySavings > 0 && (
            <>
              <div className="bg-black/40 p-4 rounded-lg">
                <p className="text-gray-300 text-sm">Monthly Savings</p>
                <p className="text-2xl font-bold text-voltly-green">${monthlySavings}</p>
                <p className="text-xs text-gray-400">Estimated energy savings</p>
              </div>
              
              <div className="bg-black/40 p-4 rounded-lg">
                <p className="text-gray-300 text-sm">Net Monthly Cost</p>
                <p className="text-2xl font-bold text-white">${netMonthlyCost}</p>
                <p className="text-xs text-gray-400">After energy savings</p>
              </div>
            </>
          )}
        </div>
        
        <p className="text-sm text-gray-300 mb-4">
          By financing your energy solution bundle, your estimated monthly savings of 
          <span className="text-voltly-green font-bold"> ${monthlySavings} </span> 
          can offset most or all of your monthly payment.
        </p>
      </div>
      
      {/* Action buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          className="bg-voltly-green hover:bg-voltly-green/90 text-black font-bold text-lg py-6"
          onClick={addBundleToCart}
        >
          <Package className="mr-2 h-5 w-5" /> Add Bundle to Cart
        </Button>
        
        <Button 
          variant="outline" 
          className="bg-voltly-purple hover:bg-voltly-purple/90 text-white border-voltly-purple font-bold text-lg py-6"
          onClick={handleFinanceNow}
        >
          <CircleDollarSign className="mr-2 h-5 w-5" /> Finance Now
        </Button>
      </div>
    </div>
  );
};

export default ProductBundle;

