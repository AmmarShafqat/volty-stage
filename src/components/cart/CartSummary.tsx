
import React from "react";
import { useCart } from "@/contexts/CartContext";
import { Separator } from "@/components/ui/separator";
import { Package, ShieldCheck } from "lucide-react";
import { calculateFinancingFee } from "@/utils/taxUtils";
import { Badge } from "@/components/ui/badge";

const CartSummary: React.FC = () => {
  const { 
    totalPrice, 
    extendedWarrantyPrice, 
    hasFinanceOption, 
    totalMonthlyPayment
  } = useCart();

  // Calculate tax amount (13%)
  const taxAmount = (totalPrice + extendedWarrantyPrice) * 0.13;
  
  // Calculate financing fee (7.5%) if finance option is available
  const financingFee = hasFinanceOption ? calculateFinancingFee(totalPrice + extendedWarrantyPrice) : 0;
  
  // Calculate final total with tax
  const finalTotal = totalPrice + extendedWarrantyPrice + taxAmount;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <p className="text-gray-600">Subtotal</p>
        <p className="font-medium">${totalPrice.toLocaleString()}</p>
      </div>
      
      {extendedWarrantyPrice > 0 && (
        <div className="flex justify-between">
          <p className="text-gray-600">Extended Warranty</p>
          <p className="font-medium">${extendedWarrantyPrice.toLocaleString()}</p>
        </div>
      )}
      
      <div className="flex justify-between">
        <p className="text-gray-600">HST (13%)</p>
        <p className="font-medium">${taxAmount.toLocaleString()}</p>
      </div>

      {/* Value Inclusions */}
      <div className="bg-gray-50 p-2 rounded-md my-2">
        <div className="flex items-center gap-1 mb-1">
          <Package className="h-3 w-3 text-voltly-purple" />
          <p className="text-xs font-medium text-voltly-purple">Included in Your Purchase:</p>
        </div>
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs bg-white">Free Delivery</Badge>
          <Badge variant="outline" className="text-xs bg-white">Professional Installation</Badge>
          <Badge variant="outline" className="text-xs bg-white">Rebate Assistance</Badge>
        </div>
      </div>
      
      <Separator className="my-2" />
      <div className="flex justify-between">
        <p className="font-bold">Total</p>
        <p className="font-bold">${finalTotal.toLocaleString()}</p>
      </div>
      
      {hasFinanceOption && (
        <>
          <div className="flex justify-between text-voltly-purple">
            <p className="font-medium">Monthly Payment</p>
            <p className="font-medium">${totalMonthlyPayment.toLocaleString()}/mo</p>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <p>Financing Fee (7.5%)</p>
            <p>${financingFee.toLocaleString()}</p>
          </div>
        </>
      )}
      
      {/* Trust Badge */}
      <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
        <ShieldCheck className="h-3 w-3 mr-1" />
        <span>30 Day Money Back Guarantee</span>
      </div>
    </div>
  );
};

export default CartSummary;
